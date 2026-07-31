const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');
const mainjs = fs.readFileSync('main.js', 'utf8');

const htmlKeys = new Set();
const htmlRegex = /data-i18n(?:-placeholder)?="([^"]+)"/g;
let m;
while ((m = htmlRegex.exec(index)) !== null) {
    htmlKeys.add(m[1]);
}

const ptObjRegex = /pt:\s*{([\s\S]*?)},\s*en:/;
const enObjRegex = /en:\s*{([\s\S]*?)}\s*};/;
const ptMatch = ptObjRegex.exec(mainjs);
const enMatch = enObjRegex.exec(mainjs);

const ptKeys = new Set();
const enKeys = new Set();

// matches key: or "key": or 'key': 
const keyRegex = /^\s*(?:\"|\')?([a-zA-Z0-9_]+)(?:\"|\')?\s*:/gm;

while ((m = keyRegex.exec(ptMatch[1])) !== null) {
    ptKeys.add(m[1]);
}
while ((m = keyRegex.exec(enMatch[1])) !== null) {
    enKeys.add(m[1]);
}

console.log('Missing in PT:');
htmlKeys.forEach(k => { if (!ptKeys.has(k)) console.log(k); });
console.log('Missing in EN:');
htmlKeys.forEach(k => { if (!enKeys.has(k)) console.log(k); });
