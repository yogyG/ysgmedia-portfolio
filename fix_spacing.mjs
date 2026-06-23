import fs from 'fs';
import path from 'path';

const files = ['services.html', 'industries.html', 'case-studies.html', 'blog.html', 'about.html', 'contact.html'];

for (const file of files) {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace padding: var(--spacing-xl) var(--spacing-lg); with padding: var(--spacing-lg) var(--spacing-md);
    content = content.replace(/padding:\s*var\(--spacing-xl\)\s*var\(--spacing-lg\)/g, 'padding: var(--spacing-lg) var(--spacing-md)');
    
    // For the second sections, we want to ensure the top padding is even smaller since the first section already has bottom padding.
    // Actually, setting both to var(--spacing-lg) var(--spacing-md) reduces top/bottom from 8rem (128px) to 4rem (64px). 
    // 64px is a very reasonable spacing.
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated spacing in ${file}`);
  }
}
