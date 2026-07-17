const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const REPORT_FILE = path.join(ROOT_DIR, 'Project_Report.md');
const OUTPUT_FILE = path.join(ROOT_DIR, 'Final_Submission.md');

// Directories to include
const DIRS_TO_SCAN = ['server', 'client'];

// Files and folders to ignore
const IGNORE_LIST = [
  'node_modules',
  'dist',
  '.git',
  '.db',
  '.db-journal',
  '.png',
  '.jpg',
  '.ico',
  '.svg',
  'package-lock.json',
  '.DS_Store'
];

function shouldIgnore(fileOrFolder) {
  for (const ignore of IGNORE_LIST) {
    if (fileOrFolder.includes(ignore)) return true;
  }
  return false;
}

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (shouldIgnore(filePath)) continue;
    
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function getExtension(filename) {
  const ext = path.extname(filename).toLowerCase().replace('.', '');
  if (ext === 'js' || ext === 'jsx') return 'javascript';
  if (ext === 'css') return 'css';
  if (ext === 'html') return 'html';
  if (ext === 'json') return 'json';
  if (ext === 'md') return 'markdown';
  if (ext === 'yml' || ext === 'yaml') return 'yaml';
  if (ext === 'prisma') return 'prisma';
  if (ext === 'conf') return 'nginx';
  if (filename.includes('Dockerfile')) return 'dockerfile';
  return '';
}

function generate() {
  console.log('Reading Project_Report.md...');
  let content = fs.readFileSync(REPORT_FILE, 'utf8');

  content += '\n\n<div style="page-break-after: always;"></div>\n\n';
  content += '# Appendix: Full Source Code\n\n';
  content += 'The following section contains the complete source code of the CampusFix application.\n\n';

  let allFiles = [];
  for (const dir of DIRS_TO_SCAN) {
    const fullPath = path.join(ROOT_DIR, dir);
    if (fs.existsSync(fullPath)) {
      allFiles = allFiles.concat(getFiles(fullPath));
    }
  }

  // Also include root level docker-compose
  const composePath = path.join(ROOT_DIR, 'docker-compose.yml');
  if (fs.existsSync(composePath)) allFiles.push(composePath);

  for (const filePath of allFiles) {
    try {
      const relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
      console.log(`Adding ${relativePath}...`);
      
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const ext = getExtension(filePath);

      content += `### File: \`${relativePath}\`\n\n`;
      content += `\`\`\`${ext}\n`;
      content += fileContent;
      content += `\n\`\`\`\n\n`;
    } catch (e) {
      console.error(`Failed to read ${filePath}`);
    }
  }

  fs.writeFileSync(OUTPUT_FILE, content);
  console.log('Successfully generated Final_Submission.md');
}

generate();
