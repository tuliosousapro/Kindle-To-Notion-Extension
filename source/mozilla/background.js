const colorMap = {
  'blue': 'blue_background',
  'yellow': 'yellow_background',
  'green': 'green_background',
  'red': 'red_background',
  'default': 'gray_background',
  'pink': 'pink_background',
  'orange': 'orange_background'
};

async function fetchHighResCover(amazonLink) {
  try {
    if (!amazonLink || !amazonLink.includes('amazon.com') || !amazonLink.includes('/dp/')) {
      console.warn('Invalid Amazon link:', amazonLink);
      return '';
    }

    const response = await fetch(amazonLink, { method: 'GET', credentials: 'omit' });
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

        let { title, author, amazonLink, highlights, highlightCount, noteCount } = message.data;
        console.log('Extracted data:', { title, highlightCount, noteCount, highlightsLength: highlights?.length, amazonLink });

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
              const text = allBlocks[i].quote.rich_text[0].text.content;
              let note = '';
              if (allBlocks[i + 1]?.type === 'callout' && allBlocks[i + 1].callout?.rich_text?.length >= 3) {
                // Extract the actual note content from the third rich_text element
                note = allBlocks[i + 1].callout.rich_text[2].text.content.trim();
              }
              existingHighlights.push({ text: text.trim(), note: note || '' });
              i += note ? 1 : 0;
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
          const newBlocksToAppend = newHighlights.map(({ text, color, note }, index) => {
            const notionColor = colorMap[color.toLowerCase()] || 'gray_background';
            const blocks = [{
              type: 'quote',
              quote: {
                rich_text: [{ text: { content: text } }],
                color: notionColor
              }
            }];
            if (note) {
              console.log(`Adding note as callout block for highlight ${index + 1}:`, note);
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
          }).flat();

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
        const allChildren = highlights.map(({ text, color, note }, index) => {
          const notionColor = colorMap[color.toLowerCase()] || 'gray_background';
          const blocks = [{
            type: 'quote',
            quote: {
              rich_text: [{ text: { content: text } }],
              color: notionColor
            }
          }];
          if (note) {
            console.log(`Adding note as callout block for highlight ${index + 1}:`, note);
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
        }).flat();

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