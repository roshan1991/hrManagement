const fs = require('fs');
const path = require('path');

const frontendPagesDir = 'd:\\GIT\\HR system\\frontend\\src\\pages';
const files = fs.readdirSync(frontendPagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(frontendPagesDir, file);
  let code = fs.readFileSync(filePath, 'utf-8');
  let originalCode = code;

  // Replace useState() or useState( ) with useState([])
  code = code.replace(/useState\(\s*\)/g, 'useState([])');

  if (code !== originalCode) {
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`Updated useState: ${file}`);
  }
});

console.log('Finished updating useState across all pages!');
