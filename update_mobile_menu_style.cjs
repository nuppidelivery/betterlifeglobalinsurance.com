const fs = require('fs');
const path = require('path');
const root = __dirname;

const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));
const dirs = ['seguros', 'internacional'];
dirs.forEach(d => {
    if (fs.existsSync(path.join(root, d))) {
        fs.readdirSync(path.join(root, d)).filter(f => f.endsWith('.html')).forEach(f => {
            htmlFiles.push(path.join(d, f));
        });
    }
});

htmlFiles.forEach(file => {
    let filePath = path.join(root, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // The mobile menu starts with <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
    // We can just find all nav_faq_1 to 7 that DON'T have the style attribute, but are right before nav_faq_8 which DOES have it.
    // Actually, simpler: just regex replace the specific tags in the mobile menu block.
    
    // The mobile menu block for FAQ looks like:
    // <span style="color: var(--gold-light); font-weight: 600; font-size: 0.9rem; text-transform: uppercase;">FAQ</span>
    // <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
    //   <a href="#faq-seguro-de-vida" data-i18n="nav_faq_1">Seguro de Vida</a>
    // ...
    //   <a href="#faq-solucoes-internacionais" data-i18n="nav_faq_8" style="border: none; padding: 0;">Soluções Internacionais</a>
    // </div>
    
    const blockStart = content.indexOf('<span style="color: var(--gold-light); font-weight: 600; font-size: 0.9rem; text-transform: uppercase;">FAQ</span>');
    if (blockStart !== -1) {
        const blockEnd = content.indexOf('</div>', blockStart);
        let block = content.substring(blockStart, blockEnd);
        
        block = block.replace(/data-i18n="nav_faq_1">/g, 'data-i18n="nav_faq_1" style="border: none; padding: 0;">');
        block = block.replace(/data-i18n="nav_faq_2">/g, 'data-i18n="nav_faq_2" style="border: none; padding: 0;">');
        block = block.replace(/data-i18n="nav_faq_3">/g, 'data-i18n="nav_faq_3" style="border: none; padding: 0;">');
        block = block.replace(/data-i18n="nav_faq_4">/g, 'data-i18n="nav_faq_4" style="border: none; padding: 0;">');
        block = block.replace(/data-i18n="nav_faq_5">/g, 'data-i18n="nav_faq_5" style="border: none; padding: 0;">');
        block = block.replace(/data-i18n="nav_faq_6">/g, 'data-i18n="nav_faq_6" style="border: none; padding: 0;">');
        block = block.replace(/data-i18n="nav_faq_7">/g, 'data-i18n="nav_faq_7" style="border: none; padding: 0;">');
        
        content = content.substring(0, blockStart) + block + content.substring(blockEnd);
        fs.writeFileSync(filePath, content, 'utf8');
    }
});

console.log('Mobile menu styles restored.');
