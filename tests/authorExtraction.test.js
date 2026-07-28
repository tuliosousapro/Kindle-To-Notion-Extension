/**
 * Test case for author extraction bug in contentScript.js
 */

describe('Author Extraction from Kindle Notebook', () => {
  beforeEach(() => {
    // Set up the document body to simulate Kindle notebook page
    document.body.innerHTML = `
      <div id="kp-notebook">
        <h3 class="kp-notebook-metadata">The Great Gatsby</h3>
        <p class="a-spacing-none a-spacing-top-micro a-size-base a-color-secondary kp-notebook-selectable kp-notebook-metadata">Your Kindle Notes For:</p>
        <p class="a-spacing-none a-spacing-top-micro a-size-base a-color-secondary kp-notebook-selectable kp-notebook-metadata">F. Scott Fitzgerald</p>
      </div>
    `;
  });

  it('should correctly extract the author instead of the notes prefix', () => {
    // Current (buggy) implementation logic from contentScript.js
    const buggyAuthor = document.querySelector('p.a-spacing-none.a-spacing-top-micro.a-size-base.a-color-secondary.kp-notebook-selectable.kp-notebook-metadata')?.textContent.trim() ||
                  document.querySelector('.kp-notebook-author')?.textContent.trim() ||
                  'Unknown Author';

    // We expect the buggy version to fail by capturing "Your Kindle Notes For:"
    expect(buggyAuthor).toBe('Your Kindle Notes For:');

    // Proposed fix implementation logic
    const authorEls = document.querySelectorAll('p.kp-notebook-metadata');
    let fixedAuthor = 'Unknown Author';
    if (authorEls.length >= 2) {
      fixedAuthor = authorEls[1].textContent.trim();
    } else {
      fixedAuthor = document.querySelector('p.a-spacing-none.a-spacing-top-micro.a-size-base.a-color-secondary.kp-notebook-selectable.kp-notebook-metadata')?.textContent.trim() ||
                    document.querySelector('.kp-notebook-author')?.textContent.trim() ||
                    'Unknown Author';
    }

    // We expect the fixed version to correctly capture the author's name
    expect(fixedAuthor).toBe('F. Scott Fitzgerald');
  });
});
