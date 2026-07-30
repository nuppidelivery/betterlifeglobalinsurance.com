const fs = require('fs');

// 1. Fix index.html Counter Item
let htmlContent = fs.readFileSync('index.html', 'utf8');
const targetP = '<p><a href="https://www.forbes.com/advisor/debt-relief/medical-bankruptcies/"';
const replacement = '<h3 class="counter-number text-gradient-gold"><span data-target="66">0</span>%</h3>\n            ' + targetP;

if (htmlContent.includes(targetP) && !htmlContent.includes('<span data-target="66">0</span>%')) {
    htmlContent = htmlContent.replace(targetP, replacement);
    fs.writeFileSync('index.html', htmlContent, 'utf8');
    console.log('index.html fixed counter item.');
}

// 2. Fix style.css for Mobile Header & Solucoes Headers
let cssContent = fs.readFileSync('style.css', 'utf8');

// The faulty margin in lang-toggle-container inside media query
// We can just regex replace it precisely
if (cssContent.includes('margin: 0.5rem 1rem;')) {
    cssContent = cssContent.replace('margin: 0.5rem 1rem;', 'margin: 0 0.25rem;');
    console.log('Fixed lang-toggle margin.');
}

// Ensure the mobile solucoes header is centered
const solucoesStyle = `
  /* 3. Títulos da Seção de Seguros Mobile */
  #solucoes h3 {
    text-align: center !important;
    display: flex;
    justify-content: center;
    width: fit-content;
    margin-left: auto !important;
    margin-right: auto !important;
  }
`;

// Insert it into the @media (max-width: 992px) block
// Since I appended it at the end of the file in the last script, let's just append again in a new media block to be surgically safe
cssContent += '\n@media (max-width: 992px) {\n' + solucoesStyle + '\n}\n';
fs.writeFileSync('style.css', cssContent, 'utf8');
console.log('style.css updated successfully.');
