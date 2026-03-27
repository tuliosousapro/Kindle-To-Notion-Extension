const fs = require('fs');
const path = require('path');

// Configuration
const SOURCE_DIR = path.join(__dirname, '../docs');
const EXTENSION_DIRS = [
  path.join(__dirname, '../source/chrome'),
  path.join(__dirname, '../source/edge'),
  path.join(__dirname, '../source/mozilla')
];

// Files to sync (relative to docs root)
const FILES_TO_SYNC = [
  'onboarding.html',
  'onboarding.css',
  'onboarding.js',
  'onboarding-check.js' // This might be in source/chrome originally, need to check
];

// Ensure target directories exist
EXTENSION_DIRS.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.warn(`Warning: Target directory ${dir} does not exist. Skipping.`);
  }
});

/**
 * Copy a file from source to destination
 * @param {string} srcPath - Absolute path to source file
 * @param {string} destPath - Absolute path to destination file
 */
function copyFile(srcPath, destPath) {
  try {
    if (!fs.existsSync(srcPath)) {
      console.error(`Error: Source file ${srcPath} not found.`);
      return;
    }
    const content = fs.readFileSync(srcPath, 'utf8');
    fs.writeFileSync(destPath, content);
    console.log(`Copied ${path.basename(srcPath)} to ${destPath}`);
  } catch (err) {
    console.error(`Error copying ${srcPath}: ${err.message}`);
  }
}

// Main execution
console.log('Starting page synchronization...');

EXTENSION_DIRS.forEach(extDir => {
  if (!fs.existsSync(extDir)) return;

  console.log(`\nSyncing to ${path.basename(extDir)}...`);
  
  FILES_TO_SYNC.forEach(file => {
    // Special handling if files are in different locations in docs vs source
    // For now assuming flat structure in docs matches flat structure in source root
    
    // Check if file exists in docs
    const docPath = path.join(SOURCE_DIR, file);
    
    // If not in docs, check if it's meant to be a source-only file that we are managing?
    // Actually, the plan is to move them TO docs. 
    // So successful execution implies they are ALREADY in docs.
    
    if (fs.existsSync(docPath)) {
       copyFile(docPath, path.join(extDir, file));
    } else {
        console.warn(`File ${file} not found in docs/ folder. Please ensure it has been moved there.`);
    }
  });
});

console.log('\nSynchronization complete.');
