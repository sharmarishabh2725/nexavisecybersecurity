import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Fix bloated text classes
    content = content.replace(/text-gray-900 dark:text-gray-200 dark:text-gray-900 dark:text-gray-200/g, 'text-gray-900 dark:text-white');
    content = content.replace(/dark:text-gray-900 dark:text-gray-200 dark:text-gray-900 dark:text-gray-200/g, 'dark:text-white');
    content = content.replace(/dark:text-gray-200 dark:text-gray-900 dark:text-gray-200/g, 'dark:text-white');
    content = content.replace(/dark:text-gray-900 dark:text-gray-200/g, 'dark:text-white');
    content = content.replace(/text-gray-900 dark:text-gray-200 dark:text-gray-900/g, 'text-gray-900 dark:text-white');
    
    // Fix bloated background classes
    content = content.replace(/bg-gray-800 dark:bg-gray-200 dark:bg-black\/5 dark:bg-white\/5/g, 'bg-gray-100 dark:bg-white/5');
    content = content.replace(/bg-gray-700 dark:bg-gray-300 dark:bg-black\/5 dark:bg-white\/5/g, 'bg-gray-100 dark:bg-white/5');
    content = content.replace(/bg-gray-600 dark:bg-gray-400 dark:bg-black\/5 dark:bg-white\/5/g, 'bg-gray-100 dark:bg-white/5');
    content = content.replace(/dark:bg-gray-200 dark:bg-black\/5 dark:bg-white\/5/g, 'dark:bg-white/5');
    
    // Fix bloated border classes
    content = content.replace(/border-gray-200 dark:border-gray-700 dark:border-black\/10 dark:border-white\/10/g, 'border-gray-200 dark:border-white/10');
    content = content.replace(/dark:border-gray-700 dark:border-black\/10 dark:border-white\/10/g, 'dark:border-white/10');
    
    // Specific text colors with slash
    content = content.replace(/dark:text-gray-200\/40 dark:text-gray-900 dark:text-gray-200\/20/g, 'dark:text-gray-400');
    
    // Some stray text colors
    content = content.replace(/text-gray-900 dark:text-gray-200 dark:text-gray-900/g, 'text-gray-900 dark:text-white');
    content = content.replace(/dark:text-gray-900 dark:text-white/g, 'dark:text-white');

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log('Fixed', file);
    }
});
