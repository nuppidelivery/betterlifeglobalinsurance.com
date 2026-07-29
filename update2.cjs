const fs = require('fs');
const path = require('path');
const root = __dirname;

let content = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// 1. Remove faq_title and eyebrow
content = content.replace(/<span class="eyebrow[^>]*data-i18n="eyebrow_faq"[^>]*>.*?<\/span>/, '');
content = content.replace(/<h2 data-i18n="faq_title">.*?<\/h2>/, '');

// 2. Format FAQ categories
// Current format: <h4 class="faq-category-title text-gradient-gold" id="faq-..." style="...">...</h4>
// New format: centralizada, CAIXA ALTA, destaque visual, fonte maior, etc.
const newStyle = 'margin-top: 3rem; margin-bottom: 2rem; display: flex; align-items: center; justify-content: center; gap: 0.8rem; text-transform: uppercase; font-size: 1.8rem; letter-spacing: 1px; text-align: center; border-bottom: 2px solid var(--gold-dark); padding-bottom: 1rem; width: fit-content; margin-left: auto; margin-right: auto;';

content = content.replace(/<h4 class="faq-category-title text-gradient-gold"(.*?)style="[^"]*"(.*?)>/g, `<h4 class="faq-category-title text-gradient-gold"$1style="${newStyle}"$2>`);

fs.writeFileSync(path.join(root, 'index.html'), content, 'utf8');
console.log('Task 11 applied to index.html');
