/**
 * Spaced Repetition System (SRS) Engine — Kindle2Notion
 *
 * Manages a local vault of exported highlights and implements daily review
 * using an SM-2-inspired scheduling algorithm. Runs entirely client-side
 * via chrome.storage.local + chrome.alarms. Zero server dependencies.
 *
 * Storage schema (chrome.storage.local):
 * {
 *   srs_vault: {
 *     highlights: { [id]: HighlightEntry },
 *     stats: { totalReviews, currentStreak, lastReviewDate, longestStreak },
 *     settings: { dailyCount, notificationsEnabled },
 *     todayQueue: [id, ...],
 *     todayDate: "YYYY-MM-DD"
 *   }
 * }
 */

// ========================================
// Constants
// ========================================

const STORAGE_KEY = 'srs_vault';
const ALARM_NAME = 'k2n-daily-review';
const DEFAULT_DAILY_COUNT = 5;
const MAX_INTERVAL_DAYS = 90;
const DAY_MS = 86_400_000;

// ========================================
// Storage Helpers
// ========================================

function createDefaultVault() {
    return {
        highlights: {},
        stats: {
            totalReviews: 0,
            currentStreak: 0,
            lastReviewDate: null,
            longestStreak: 0
        },
        settings: {
            dailyCount: DEFAULT_DAILY_COUNT,
            notificationsEnabled: true
        },
        todayQueue: [],
        todayDate: null
    };
}

async function loadVault() {
    const result = await chrome.storage.local.get(STORAGE_KEY);
    return result[STORAGE_KEY] || createDefaultVault();
}

async function saveVault(vault) {
    await chrome.storage.local.set({ [STORAGE_KEY]: vault });
}

// ========================================
// ID Generation (content-based dedup)
// ========================================

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return Math.abs(hash).toString(36);
}

function generateId(bookTitle, text) {
    return hashString(bookTitle + '::' + text.substring(0, 100));
}

// ========================================
// Selection Algorithm
// ========================================

/**
 * Weighted selection favoring due and unreviewed highlights.
 * Priority: due items > never-reviewed > recently-reviewed
 *
 * @param {Array} highlights  All highlights from vault
 * @param {number} count      How many to select
 * @returns {Array}           Selected highlights
 */
function selectReviewHighlights(highlights, count) {
    const now = Date.now();

    const scored = highlights.map(h => {
        let score;

        if (h.reviewCount === 0) {
            // Never reviewed — highest priority
            score = 0;
        } else {
            const dueAt = h.lastReviewedAt + (h.interval * DAY_MS);
            if (now >= dueAt) {
                // Overdue — high priority
                score = 1;
            } else {
                // Not yet due — lower priority, scaled by distance
                score = 10 + ((dueAt - now) / DAY_MS);
            }
        }

        // Random jitter prevents same selection every day
        score += Math.random() * 0.5;

        return { highlight: h, score };
    });

    scored.sort((a, b) => a.score - b.score);
    return scored.slice(0, count).map(s => s.highlight);
}

// ========================================
// Streak Calculation
// ========================================

function updateStreak(stats, today) {
    if (stats.lastReviewDate === today) return; // Already counted today

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (stats.lastReviewDate === yesterdayStr) {
        stats.currentStreak++;
    } else {
        stats.currentStreak = 1;
    }

    stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
    stats.lastReviewDate = today;
}

// ========================================
// Public API
// ========================================

/**
 * Initialize the SRS alarm. Call on extension install/startup.
 */
export async function initSRS() {
    const existing = await chrome.alarms.get(ALARM_NAME);
    if (!existing) {
        chrome.alarms.create(ALARM_NAME, {
            periodInMinutes: 1440,
            delayInMinutes: 60
        });
        console.log('[SRS] Daily review alarm registered.');
    }
}

/**
 * Cache highlights from a successful Notion export into the local vault.
 * Deduplicates by content hash — safe to call on repeat exports.
 *
 * @param {Object} bookData
 * @param {string} bookData.title
 * @param {string} bookData.author
 * @param {Array}  bookData.highlights
 * @param {string} [bookData.notionPageId]
 * @returns {number} Count of newly added highlights
 */
export async function cacheHighlights({ title, author, highlights, notionPageId }) {
    const vault = await loadVault();
    let newCount = 0;

    for (const h of highlights) {
        if (!h.text || h.text.trim().length === 0) continue;

        const id = generateId(title, h.text);

        if (!vault.highlights[id]) {
            vault.highlights[id] = {
                id,
                bookTitle: title,
                author,
                text: h.text,
                note: h.note || '',
                chapter: h.chapter || '',
                color: h.color || 'default',
                location: h.location || '',
                notionPageId: notionPageId || '',
                addedAt: Date.now(),
                reviewCount: 0,
                lastReviewedAt: null,
                interval: 1,
                starred: false
            };
            newCount++;
        }
    }

    await saveVault(vault);
    console.log(`[SRS] Cached ${newCount} new highlights from "${title}" (${Object.keys(vault.highlights).length} total in vault)`);
    return newCount;
}

/**
 * Get today's review queue. Generates a new queue when the date rolls over.
 *
 * @param {number} [count] Override for daily count setting
 * @returns {Array} Highlight entries for today's review
 */
export async function getDailyReview(count) {
    const vault = await loadVault();
    const today = new Date().toISOString().split('T')[0];
    const dailyCount = count || vault.settings.dailyCount;
    const allHighlights = Object.values(vault.highlights);

    if (allHighlights.length === 0) return [];

    // Return cached queue if same day and still has items
    if (vault.todayDate === today && vault.todayQueue.length > 0) {
        return vault.todayQueue
            .map(id => vault.highlights[id])
            .filter(Boolean);
    }

    // Generate fresh queue
    const selected = selectReviewHighlights(allHighlights, dailyCount);

    vault.todayQueue = selected.map(h => h.id);
    vault.todayDate = today;
    await saveVault(vault);

    return selected;
}

/**
 * Mark a highlight as reviewed and update its SRS interval.
 *
 * @param {string} highlightId
 * @param {'dismiss'|'star'|'forgot'} action
 *   - dismiss: moderate retention, interval *= 1.5
 *   - star: strong retention, interval *= 2.5, mark as starred
 *   - forgot: reset interval to 1 day
 * @returns {Object|null} Updated highlight entry
 */
export async function markReviewed(highlightId, action = 'dismiss') {
    const vault = await loadVault();
    const highlight = vault.highlights[highlightId];
    if (!highlight) return null;

    const today = new Date().toISOString().split('T')[0];

    highlight.lastReviewedAt = Date.now();
    highlight.reviewCount++;

    switch (action) {
        case 'star':
            highlight.starred = true;
            highlight.interval = Math.ceil(highlight.interval * 2.5);
            break;
        case 'forgot':
            highlight.interval = 1;
            break;
        default: // dismiss
            highlight.interval = Math.ceil(highlight.interval * 1.5);
    }

    highlight.interval = Math.min(highlight.interval, MAX_INTERVAL_DAYS);

    // Remove from today's queue
    vault.todayQueue = vault.todayQueue.filter(id => id !== highlightId);

    // Update streak
    vault.stats.totalReviews++;
    updateStreak(vault.stats, today);

    await saveVault(vault);
    return highlight;
}

/**
 * Handle the daily alarm. Shows a browser notification with a teaser highlight.
 */
export async function handleReviewAlarm(alarmName) {
    if (alarmName !== ALARM_NAME) return;

    const vault = await loadVault();
    if (!vault.settings.notificationsEnabled) return;

    const allHighlights = Object.values(vault.highlights);
    if (allHighlights.length === 0) return;

    const review = await getDailyReview(1);
    if (review.length === 0) return;

    const teaser = review[0];
    const preview = teaser.text.length > 80
        ? teaser.text.substring(0, 80) + '...'
        : teaser.text;

    chrome.notifications.create('k2n-daily-review', {
        type: 'basic',
        iconUrl: 'icons/icon96.png',
        title: 'Kindle2Notion — Daily Review',
        message: `"${preview}" — ${teaser.bookTitle}`,
        priority: 1
    });
}

/**
 * Return vault statistics.
 */
export async function getStats() {
    const vault = await loadVault();
    const highlights = Object.values(vault.highlights);

    return {
        totalHighlights: highlights.length,
        totalBooks: new Set(highlights.map(h => h.bookTitle)).size,
        starredCount: highlights.filter(h => h.starred).length,
        reviewedCount: highlights.filter(h => h.reviewCount > 0).length,
        ...vault.stats
    };
}

/**
 * Return all starred highlights.
 */
export async function getStarred() {
    const vault = await loadVault();
    return Object.values(vault.highlights).filter(h => h.starred);
}

/**
 * Update SRS settings (dailyCount, notificationsEnabled).
 */
export async function updateSettings(newSettings) {
    const vault = await loadVault();
    vault.settings = { ...vault.settings, ...newSettings };
    await saveVault(vault);
}

/**
 * Clear the entire vault. Use for debugging or user-initiated reset.
 */
export async function clearVault() {
    await chrome.storage.local.remove(STORAGE_KEY);
    console.log('[SRS] Vault cleared.');
}

/**
 * Export the alarm name constant for use in background.js listener.
 */
export const SRS_ALARM = ALARM_NAME;
