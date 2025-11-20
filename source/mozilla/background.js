const colorMap = {
  'blue': 'blue_background',
  'yellow': 'yellow_background',
  'green': 'green_background',
  'red': 'red_background',
  'default': 'gray_background',
  'pink': 'pink_background',
  'orange': 'orange_background'
};

// Helper function to group highlights by chapter
function groupHighlightsByChapter(highlights) {
  const groups = new Map();
  const noChapter = [];

  highlights.forEach(highlight => {
    if (highlight.chapter) {
      if (!groups.has(highlight.chapter)) {
        groups.set(highlight.chapter, []);
      }
      groups.get(highlight.chapter).push(highlight);
    } else {
      noChapter.push(highlight);
    }
  });

  return { groups, noChapter };
}

// Helper function to create a highlight block with location
function createHighlightBlock(highlight) {
  const { text, color, note, location } = highlight;
  const notionColor = colorMap[color?.toLowerCase()] || 'gray_background';

  const blocks = [];

  // Create quote block with location info
  const richText = [{ text: { content: text } }];

  // Add location info to the quote if available
  if (location) {
    richText.push(
      { text: { content: '\n' } },
      {
        text: { content: '📍 ' + location },
        annotations: { color: 'gray', italic: true }
      }
    );
  }

  blocks.push({
    type: 'quote',
    quote: {
      rich_text: richText,
      color: notionColor
    }
  });

  // Add note callout if exists
  if (note) {
    blocks.push({
      type: 'callout',
      callout: {
        rich_text: [
          {
            text: { content: 'Note:' },
            annotations: { bold: true, color: 'red' }
          },
          { text: { content: ' ' } },
          {
            text: { content: note },
            annotations: { italic: true }
          }
        ],
        icon: {
          type: 'emoji',
          emoji: '🔖'
        }
      }
    });
  }

  return blocks;
}

// Helper function to create bookmark block
function createBookmarkBlock(bookmark) {
  const { location, chapter } = bookmark;

  let content = 'Bookmark';
  if (location) {
    content += ' • ' + location;
  }

  return {
    type: 'callout',
    callout: {
      rich_text: [
        {
          text: { content: content },
          annotations: { bold: true }
        }
      ],
      icon: {
        type: 'emoji',
        emoji: '📌'
      },
      color: 'gray_background'
    }
  };
}

// Helper function to create chapter heading block
function createChapterHeading(chapterName) {
  return {
    type: 'heading_2',
    heading_2: {
      rich_text: [{
        text: { content: chapterName }
      }],
      color: 'default'
    }
  };
}

// Helper function to generate all blocks with chapter grouping
function generateBlocksWithChapterGrouping(highlights, bookmarks = []) {
  const allBlocks = [];
  const { groups, noChapter } = groupHighlightsByChapter(highlights);

  // Add highlights grouped by chapter
  groups.forEach((chapterHighlights, chapterName) => {
    // Add chapter heading
    allBlocks.push(createChapterHeading(chapterName));

    // Add highlights for this chapter
    chapterHighlights.forEach(highlight => {
      allBlocks.push(...createHighlightBlock(highlight));
    });

    // Add bookmarks for this chapter
    bookmarks.filter(b => b.chapter === chapterName).forEach(bookmark => {
      allBlocks.push(createBookmarkBlock(bookmark));
    });
  });

  // Add highlights without chapter
  if (noChapter.length > 0) {
    if (groups.size > 0) {
      // Add separator heading for ungrouped highlights
      allBlocks.push(createChapterHeading('Other Highlights'));
    }

    noChapter.forEach(highlight => {
      allBlocks.push(...createHighlightBlock(highlight));
    });

    // Add bookmarks without chapter
    bookmarks.filter(b => !b.chapter).forEach(bookmark => {
      allBlocks.push(createBookmarkBlock(bookmark));
    });
  }

  return allBlocks;
}

// Open welcome page on install
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({
      url: chrome.runtime.getURL('welcome.html')
    });
  }
});

async function fetchHighResCover(amazonLink) {
  try {
    if (!amazonLink || !amazonLink.includes('amazon') || !amazonLink.includes('/dp/')) {
      console.warn('Invalid Amazon link:', amazonLink);
      return '';
    }

    // Normalize URL to use www subdomain to match host_permissions
    // Handle regional domains properly (amazon.com, amazon.com.br, amazon.co.uk, etc.)
    let normalizedUrl = amazonLink;

    // Replace "amazon." with "www.amazon." but preserve the full domain
    // This handles: amazon.com → www.amazon.com, amazon.com.br → www.amazon.com.br, etc.
    if (amazonLink.match(/https?:\/\/amazon\./)) {
      normalizedUrl = amazonLink.replace(/https?:\/\/amazon\./, (match) => {
        return match.replace('amazon.', 'www.amazon.');
      });
    }

    console.log('Fetching cover from:', normalizedUrl, '(original:', amazonLink, ')');

    const response = await fetch(normalizedUrl, { method: 'GET', credentials: 'omit' });
    if (!response.ok) {
      console.warn('Failed to fetch Amazon page:', response.status, response.statusText);
      return '';
    }

    const text = await response.text();
    const patterns = [
      /data-old-hires="([^"]*_SL1500_\.jpg)"/,
      /"hiRes":"([^"]*_SL1500_\.jpg)"/,
      /src="([^"]*_SL1500_\.jpg)"/,
      /"large":"([^"]*_SL1500_\.jpg)"/
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const coverUrl = match[1];
        console.log('Fetched high-res cover:', coverUrl);
        return coverUrl;
      }
    }

    console.warn('High-res cover image not found for:', amazonLink);
    return '';
  } catch (error) {
    console.error('Error fetching high-res cover for:', amazonLink, error);
    return '';
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);
  if (message.action === 'sendToNotion') {
    (async () => {
      try {
        console.log('Processing sendToNotion with data:', message.data);
        const { token, databaseId, titleProperty, authorProperty } = await chrome.storage.local.get(['token', 'databaseId', 'titleProperty', 'authorProperty']);
        if (!token || !databaseId) {
          console.error('Missing token or databaseId:', { token, databaseId });
          sendResponse({ status: 'Error: Missing Notion token or database ID' });
          return;
        }
        if (!titleProperty || !authorProperty) {
          console.error('Missing title or author property names:', { titleProperty, authorProperty });
          sendResponse({ status: 'Error: Missing title or author property names' });
          return;
        }

        let { title, author, amazonLink, highlights, bookmarks, highlightCount, noteCount } = message.data;
        console.log('Extracted data:', { title, highlightCount, noteCount, highlightsLength: highlights?.length, bookmarksLength: bookmarks?.length, amazonLink });

        if (!highlights || highlights.length === 0) {
          console.warn('No highlights data received');
          sendResponse({ status: 'Error: No highlights data to process' });
          return;
        }

        // Fetch high-res cover if amazonLink is provided
        let coverUrl = '';
        if (amazonLink) {
          chrome.runtime.sendMessage({ action: 'progress', status: 'Fetching book cover...' });
          coverUrl = await fetchHighResCover(amazonLink);
        }

        chrome.runtime.sendMessage({ action: 'progress', status: 'Checking duplicates...' });
        console.log('Sent initial response, proceeding with duplicate check');

        let searchResponse;
        try {
          searchResponse = await fetch('https://api.notion.com/v1/databases/' + databaseId + '/query', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Notion-Version': '2022-06-28'
            },
            body: JSON.stringify({
              filter: {
                property: titleProperty,
                title: { equals: title }
              }
            }),
            timeout: 10000
          });
          if (!searchResponse.ok) throw new Error('Search failed: ' + await searchResponse.text());
        } catch (fetchError) {
          console.error('Search fetch failed:', fetchError);
          sendResponse({ status: 'Error: Failed to search existing pages - ' + fetchError.message });
          return;
        }
        const searchData = await searchResponse.json();
        console.log('Search results length:', searchData.results.length);

        if (searchData.results.length > 0) {
          const existingPage = searchData.results[0];
          const pageId = existingPage.id;
          chrome.runtime.sendMessage({ action: 'progress', status: 'Fetching existing highlights...' });
          let allBlocks = [];
          let startCursor = null;

          do {
            let blocksResponse;
            try {
              blocksResponse = await fetch('https://api.notion.com/v1/blocks/' + pageId + '/children?page_size=100' + (startCursor ? '&start_cursor=' + startCursor : ''), {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Notion-Version': '2022-06-28'
                },
                timeout: 10000
              });
              if (!blocksResponse.ok) throw new Error('Blocks fetch failed: ' + await blocksResponse.text());
            } catch (fetchError) {
              console.error('Blocks fetch failed:', fetchError);
              sendResponse({ status: 'Error: Failed to fetch existing blocks - ' + fetchError.message });
              return;
            }
            const blocksData = await blocksResponse.json();
            if (!blocksData.results) {
              console.warn('No results in blocks data, stopping pagination');
              break;
            }
            allBlocks = allBlocks.concat(blocksData.results);
            startCursor = blocksData.next_cursor;
          } while (startCursor);

          const existingHighlights = [];
          for (let i = 0; i < allBlocks.length; i++) {
            if (allBlocks[i]?.type === 'quote' && allBlocks[i].quote?.rich_text?.[0]?.text) {
              // Get the text content from the first rich_text element (the actual highlight text)
              let text = allBlocks[i].quote.rich_text[0].text.content;
              // Handle case where location info is embedded - strip it out for comparison
              // Location is added as additional rich_text elements, so we only use the first
              let note = '';
              if (allBlocks[i + 1]?.type === 'callout' && allBlocks[i + 1].callout?.rich_text?.length >= 3) {
                // Extract the actual note content from the third rich_text element
                note = allBlocks[i + 1].callout.rich_text[2].text.content.trim();
              }
              existingHighlights.push({ text: text.trim(), note: note || '' });
              i += note ? 1 : 0;
            } else if (allBlocks[i]?.type === 'heading_2') {
              // Skip chapter headings
              console.log('Skipping chapter heading at index:', i);
            } else if (allBlocks[i]?.type === 'callout' && allBlocks[i].callout?.icon?.emoji === '📌') {
              // Skip bookmark blocks
              console.log('Skipping bookmark at index:', i);
            } else {
              console.log('Skipping non-quote block or malformed data at index:', i, allBlocks[i]);
            }
          }
          console.log('Total existing highlights count:', existingHighlights.length);

          const newHighlights = highlights.filter(h => !existingHighlights.some(eh => eh.text === h.text.trim() && eh.note === (h.note?.trim() || '')));
          if (newHighlights.length === 0) {
            console.log('No new highlights to add');
            sendResponse({ status: 'Info: No new highlights to add' });
            return;
          }

          chrome.runtime.sendMessage({ action: 'progress', status: `Appending ${newHighlights.length} new highlights...` });

          // Use chapter grouping for new highlights
          const newBlocksToAppend = generateBlocksWithChapterGrouping(newHighlights, bookmarks || []);
          console.log(`Generated ${newBlocksToAppend.length} blocks for ${newHighlights.length} highlights`);

          for (let i = 0; i < newBlocksToAppend.length; i += 100) {
            const batch = newBlocksToAppend.slice(i, i + 100);
            console.log(`Appending batch ${Math.floor(i/100) + 1} of ${Math.ceil(newBlocksToAppend.length/100)} with ${batch.length} blocks`);
            let appendResponse;
            try {
              appendResponse = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
                method: 'PATCH',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  'Notion-Version': '2022-06-28'
                },
                body: JSON.stringify({ children: batch }),
                timeout: 10000
              });
              if (!appendResponse.ok) throw new Error('Append failed: ' + await appendResponse.text());
            } catch (appendError) {
              console.error('Append failed:', appendError);
              sendResponse({ status: 'Error: Failed to append blocks - ' + appendError.message });
              return;
            }
          }
          console.log('All append batches completed successfully');
          sendResponse({ status: `Updated existing book with ${newHighlights.length} new highlights (including ${newHighlights.filter(h => h.note).length} with notes)` });
          return;
        }

        chrome.runtime.sendMessage({ action: 'progress', status: 'Exporting...' });

        // Generate all blocks with chapter grouping
        const allChildren = generateBlocksWithChapterGrouping(highlights, bookmarks || []);
        console.log(`Generated ${allChildren.length} blocks for ${highlights.length} highlights`);

        const countBlock = {
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                text: { content: `${highlightCount} Destaque(s) | ${noteCount} Nota(s)` },
                annotations: { bold: true }
              }
            ]
          }
        };

        const batches = [];
        const firstBatch = [countBlock, ...allChildren.slice(0, 99)];
        batches.push(firstBatch);
        for (let i = 99; i < allChildren.length; i += 100) {
          batches.push(allChildren.slice(i, i + 100));
        }

        const createPayload = {
          parent: { database_id: databaseId },
          properties: {
            [titleProperty]: { title: [{ text: { content: title } }] },
            [authorProperty]: { rich_text: [{ text: { content: author } }] }
          },
          cover: coverUrl ? { type: 'external', external: { url: coverUrl } } : null,
          children: firstBatch
        };

        let createResponse;
        try {
          createResponse = await fetch('https://api.notion.com/v1/pages', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Notion-Version': '2022-06-28'
            },
            body: JSON.stringify(createPayload),
            timeout: 10000
          });
          if (!createResponse.ok) throw new Error('Create failed: ' + await createResponse.text());
        } catch (createError) {
          console.error('Create failed:', createError);
          sendResponse({ status: 'Error: Failed to create page - ' + createError.message });
          return;
        }
        const createData = await createResponse.json();
        if (createData.object !== 'page') {
          throw new Error('Failed to create page: ' + JSON.stringify(createData));
        }

        const pageId = createData.id;
        console.log('Page created, starting appends');
        for (let i = 1; i < batches.length; i++) {
          console.log(`Appending batch ${i + 1} of ${batches.length}`);
          let appendResponse;
          try {
            appendResponse = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
              method: 'PATCH',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28'
              },
              body: JSON.stringify({ children: batches[i] }),
              timeout: 10000
            });
            if (!appendResponse.ok) throw new Error('Append failed: ' + await appendResponse.text());
          } catch (appendError) {
            console.error('Append failed:', appendError);
            sendResponse({ status: 'Error: Failed to append blocks - ' + appendError.message });
            return;
          }
        }
        console.log('All appends completed successfully');
        sendResponse({ status: `Export successful! ${highlightCount} Destaque(s) | ${noteCount} Nota(s)` });
      } catch (error) {
        console.error('Overall error:', error);
        sendResponse({ status: 'Error: ' + error.message });
      }
    })();
    return true;
  }
});