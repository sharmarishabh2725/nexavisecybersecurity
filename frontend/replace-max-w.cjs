const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('max-w-7xl')) {
        content = content.replace(/max-w-7xl/g, 'max-w-[1440px]');
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}
replaceInDir('./src');
