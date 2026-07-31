const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

const targetHeader = '<h2 data-i18n="faq_title" style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; background: linear-gradient(135deg, var(--gold-light) 0%, #fff 50%, var(--gold-primary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-transform: uppercase;">PERGUNTAS FREQUENTES</h2>';
const newHeader = '<h2 class="section-title text-gradient-gold" style="text-transform: uppercase;" data-i18n="faq_title">PERGUNTAS FREQUENTES</h2>';

index = index.replace(targetHeader, newHeader);

fs.writeFileSync('index.html', index, 'utf8');
console.log('Fixed faq_title inline styles in index.html');
