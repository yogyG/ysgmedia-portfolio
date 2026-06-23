import fs from 'fs';
import path from 'path';

const servicesDir = 'd:\\ysgmedia-portfolio\\services';
const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(servicesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Reduce Hero padding
    content = content.replace(/padding: 120px 20px 80px 20px;/g, 'padding: 80px 20px 40px 20px;');
    
    // Reduce section vertical padding
    content = content.replace(/padding: var\(--spacing-xl\) var\(--spacing-md\);/g, 'padding: var(--spacing-lg) var(--spacing-md);');
    
    // Reduce massive bottom margins on section headers
    content = content.replace(/margin-bottom: var\(--spacing-xl\);/g, 'margin-bottom: var(--spacing-lg);');
    
    // Reduce gap if it uses xl
    content = content.replace(/gap: var\(--spacing-xl\);/g, 'gap: var(--spacing-lg);');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated spacing in ${file}`);
});
