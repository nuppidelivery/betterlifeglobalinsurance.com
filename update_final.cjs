const fs = require('fs');
const path = require('path');
const root = __dirname;

// Task 1: Re-add the "|" in index.html and other html files for the lang-label
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

    // Add separator if it doesn't exist
    // Find: <span class="lang-en"
    // We want to make sure it has the separator before it.
    if (!content.includes('<span style="color: rgba(255,255,255,0.4); z-index:1; font-weight: bold; font-size: 0.8rem;">|</span>')) {
        content = content.replace(
            /<span class="lang-en" style="display:flex; align-items:center; gap:6px; z-index:1;">/g,
            '<span style="color: rgba(255,255,255,0.4); z-index:1; font-weight: bold; font-size: 0.8rem;">|</span>\n                <span class="lang-en" style="display:flex; align-items:center; gap:6px; z-index:1;">'
        );
        fs.writeFileSync(filePath, content, 'utf8');
    }
});
console.log('Language separator restored.');

// Task 2: Mobile headers alignment
let stylePath = path.join(root, 'style.css');
let style = fs.readFileSync(stylePath, 'utf8');

const mobileHeaderCSS = `
  .section-header { text-align: center !important; }
  .section-header.left { text-align: center !important; }
  .text-col h2, .text-col .eyebrow { text-align: center !important; margin-left: auto; margin-right: auto; }
  .text-col p { text-align: center !important; }
  .text-col { text-align: center !important; }
  .diff-item-small { justify-content: center; text-align: left; }
  .list-col-small { align-items: center; }
`;

// Insert into the main @media (max-width: 992px)
const mediaRegex = /@media \(max-width: 992px\) \{/;
if (mediaRegex.test(style)) {
    style = style.replace(mediaRegex, `@media (max-width: 992px) {${mobileHeaderCSS}`);
    fs.writeFileSync(stylePath, style, 'utf8');
    console.log('Mobile titles centered.');
}
