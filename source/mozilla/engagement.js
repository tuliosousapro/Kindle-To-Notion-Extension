// ========================================
// Engagement System — SRS-based Review & Share Prompts
// ========================================

const ENGAGEMENT_CONFIG = {
  initialIntervalDays: 3,    // First prompt after 3 days
  intervalMultiplier: 1.5,   // Grow interval by 1.5× after each prompt
  maxIntervalDays: 30,       // Cap at monthly
  snoozeDays: 3,             // "Remind me later" postpones 3 days
  cwsUrl: 'https://chromewebstore.google.com/detail/kindle-to-notion-export-h/camgnmkmolfidaefoidblkkloimnmalo',
  reviewUrl: 'https://chromewebstore.google.com/detail/kindle-to-notion-export-h/camgnmkmolfidaefoidblkkloimnmalo/reviews',
  feedbackUrl: 'https://github.com/tuliosousapro/Kindle-To-Notion-Extension/issues/new',
  shareText: 'Check out Kindle to Notion — export your Kindle highlights to Notion in one click! 📚'
};

const ENGAGEMENT_STORAGE_KEY = 'engagementSRS';
const DAY_MS = 86_400_000;

// ========================================
// Storage Helpers
// ========================================

function createDefaultEngagementState() {
  return {
    interval: ENGAGEMENT_CONFIG.initialIntervalDays,
    nextPromptAt: Date.now() + (ENGAGEMENT_CONFIG.initialIntervalDays * DAY_MS),
    promptCount: 0,
    dismissed: false
  };
}

async function loadEngagementState() {
  return new Promise((resolve) => {
    chrome.storage.local.get([ENGAGEMENT_STORAGE_KEY], (result) => {
      resolve(result[ENGAGEMENT_STORAGE_KEY] || null);
    });
  });
}

async function saveEngagementState(state) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [ENGAGEMENT_STORAGE_KEY]: state }, resolve);
  });
}

// ========================================
// SRS Logic
// ========================================

/**
 * Seed the engagement SRS on first export if it doesn't exist yet.
 */
async function seedEngagement() {
  const state = await loadEngagementState();
  if (!state) {
    await saveEngagementState(createDefaultEngagementState());
    console.log('[Engagement] SRS seeded — first prompt in', ENGAGEMENT_CONFIG.initialIntervalDays, 'days');
  }
}

/**
 * Check if an engagement prompt is due.
 * @returns {Promise<'rate'|'share'|null>} The type of prompt, or null.
 */
async function checkEngagement() {
  const state = await loadEngagementState();
  if (!state || state.dismissed) return null;
  if (Date.now() < state.nextPromptAt) return null;

  // Alternate between rate and share
  return state.promptCount % 2 === 0 ? 'rate' : 'share';
}

/**
 * Record that an engagement prompt was shown.
 * Advances the SRS interval for next time.
 */
async function recordEngagementShown() {
  const state = await loadEngagementState();
  if (!state) return;

  state.promptCount++;
  state.interval = Math.min(
    Math.ceil(state.interval * ENGAGEMENT_CONFIG.intervalMultiplier),
    ENGAGEMENT_CONFIG.maxIntervalDays
  );
  state.nextPromptAt = Date.now() + (state.interval * DAY_MS);

  await saveEngagementState(state);
  console.log(`[Engagement] Prompt shown (#${state.promptCount}). Next in ${state.interval} days.`);
}

/**
 * Snooze engagement prompts without advancing the interval.
 */
async function snoozeEngagement() {
  const state = await loadEngagementState();
  if (!state) return;

  state.nextPromptAt = Date.now() + (ENGAGEMENT_CONFIG.snoozeDays * DAY_MS);
  await saveEngagementState(state);
  console.log(`[Engagement] Snoozed for ${ENGAGEMENT_CONFIG.snoozeDays} days.`);
}

/**
 * Dismiss engagement prompts permanently.
 */
async function dismissEngagement() {
  const state = await loadEngagementState() || createDefaultEngagementState();
  state.dismissed = true;
  await saveEngagementState(state);
  console.log('[Engagement] Permanently dismissed.');
}

/**
 * Copy share link to clipboard.
 * @returns {Promise<boolean>} Success status.
 */
async function copyShareLink() {
  const text = `${ENGAGEMENT_CONFIG.shareText}\n${ENGAGEMENT_CONFIG.cwsUrl}`;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  }
}
