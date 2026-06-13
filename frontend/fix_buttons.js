import fs from 'fs';
import path from 'path';

function fixButtonClasses() {
  const filesToFix = [
    'src/components/Navbar.tsx',
    'src/components/HeroSection.tsx',
    'src/components/CtaSection.tsx'
  ];

  filesToFix.forEach(relativePath => {
    const filePath = path.resolve(__dirname, relativePath);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the specific botched button classes
    content = content.replace(/bg-gray-800 dark:bg-gray-200 text-black/g, 'bg-gray-900 dark:bg-white text-white dark:text-gray-900');
    // Fix the hover state which was also botched
    content = content.replace(/hover:bg-gray-800 dark:bg-gray-200/g, 'hover:bg-gray-800 dark:hover:bg-gray-200');

    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${relativePath}`);
  });
}

fixButtonClasses();
