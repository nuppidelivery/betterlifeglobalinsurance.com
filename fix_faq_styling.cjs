const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');
index = index.replace(
    '<h2 class="section-title text-gradient-gold" style="text-transform: uppercase;" data-i18n="faq_title">PERGUNTAS FREQUENTES</h2>',
    '<h2 class="faq-title text-gradient-gold" data-i18n="faq_title">PERGUNTAS FREQUENTES</h2>'
);
fs.writeFileSync('index.html', index);

let css = fs.readFileSync('style.css', 'utf8');
if (!css.includes('.faq-title {')) {
    css += '\n.faq-title { text-transform: uppercase; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; line-height: 1.2; font-family: var(--font-heading); letter-spacing: -0.02em; margin-bottom: 2rem; }\n';
    fs.writeFileSync('style.css', css);
}
console.log('Fixed faq_title in index.html and style.css');
