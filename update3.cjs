const fs = require('fs');
const path = require('path');
const root = __dirname;

let style = fs.readFileSync(path.join(root, 'style.css'), 'utf8');

// Fix the language toggle in style.css
// Widen the container slightly and adjust slider to match perfectly
style = style.replace(/width: 105px; height: 36px;/, 'width: 110px; height: 36px;');
style = style.replace(/width: 50px; left: 4px; bottom: 3px;/, 'width: 52px; left: 4px; bottom: 3px;');
style = style.replace(/transform: translateX\(45px\);/, 'transform: translateX(50px);');

fs.writeFileSync(path.join(root, 'style.css'), style, 'utf8');

let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
// Remove the | separator which can cause weird spacing
const sepRegex = /<span style="color: rgba\(255,255,255,0\.4\); z-index:1; margin: 0 4px; font-weight: bold;">\|<\/span>/g;
html = html.replace(sepRegex, '');

fs.writeFileSync(path.join(root, 'index.html'), html, 'utf8');

console.log('Language button fixed.');
