const fs = require('fs');
const path = require('path');
const root = __dirname;

let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// 1. Remove grayscale
html = html.replace('style="opacity: 0.5; filter: grayscale(100%); pointer-events: none;"', '');

// 2. Remove the "Disponível em breve" overlay
html = html.replace(/<div style="position: absolute; top: 50%; left: 50%; transform: translate\(-50%, -50%\); background: rgba\(1, 23, 55, 0\.9\)[^>]*>\s*<h3[^>]*>Dispon[í]vel em breve<\/h3>\s*<\/div>/, '');

// 3. Update the 3 cards
// Card 1
html = html.replace(
    /<h4 data-i18n="lib_1_title"[^>]*>.*?<\/h4>\s*<p data-i18n="lib_1_desc">.*?<\/p>\s*<button class="btn btn-outline" style="background:#ccc; color:#666; border:none; cursor:not-allowed;">.*?<\/button>/,
    `<h4 data-i18n="lib_1_title" style="color:var(--navy-1); margin-top:1rem;">ARTIGO SITE 1 pronto</h4>
            <p data-i18n="lib_1_desc">Acesse o conteúdo completo em PDF.</p>
            <a href="docs/artigo1.pdf" target="_blank" class="btn btn-outline" style="margin-top: 1rem;">Baixar PDF</a>`
);

// Card 2
html = html.replace(
    /<h4 data-i18n="lib_2_title"[^>]*>.*?<\/h4>\s*<p data-i18n="lib_2_desc">.*?<\/p>\s*<button class="btn btn-outline" style="background:#ccc; color:#666; border:none; cursor:not-allowed;">.*?<\/button>/,
    `<h4 data-i18n="lib_2_title" style="color:var(--navy-1); margin-top:1rem;">ARTIGO 2 PRONTO</h4>
            <p data-i18n="lib_2_desc">Acesse o conteúdo completo em PDF.</p>
            <a href="docs/artigo2.pdf" target="_blank" class="btn btn-outline" style="margin-top: 1rem;">Baixar PDF</a>`
);

// Card 3
html = html.replace(
    /<h4 data-i18n="lib_3_title"[^>]*>.*?<\/h4>\s*<p data-i18n="lib_3_desc">.*?<\/p>\s*<button class="btn btn-outline" style="background:#ccc; color:#666; border:none; cursor:not-allowed;">.*?<\/button>/,
    `<h4 data-i18n="lib_3_title" style="color:var(--navy-1); margin-top:1rem;">artigo 3</h4>
            <p data-i18n="lib_3_desc">Acesse o conteúdo completo em PDF.</p>
            <a href="docs/artigo3.pdf" target="_blank" class="btn btn-outline" style="margin-top: 1rem;">Baixar PDF</a>`
);

fs.writeFileSync(path.join(root, 'index.html'), html, 'utf8');
console.log('Library updated.');
