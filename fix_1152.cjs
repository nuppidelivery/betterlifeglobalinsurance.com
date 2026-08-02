const fs = require('fs');
let content = fs.readFileSync('main.js', 'utf8');
content = content.replace(/legal_terms:\s*"Terms of Use"\r?\n\s*\}\r?\n/g, 'legal_terms: "Terms of Use",\n');
fs.writeFileSync('main.js', content, 'utf8');
console.log('Fixed line 1152');
