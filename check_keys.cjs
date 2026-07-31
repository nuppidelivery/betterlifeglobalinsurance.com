const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');
const mainjs = fs.readFileSync('main.js', 'utf8');

// Extract all data-i18n keys from index.html
const htmlKeys = new Set();
const htmlRegex = /data-i18n="([^"]+)"/g;
let m;
while ((m = htmlRegex.exec(index)) !== null) {
    htmlKeys.add(m[1]);
}
const htmlPlaceholdersRegex = /data-i18n-placeholder="([^"]+)"/g;
while ((m = htmlPlaceholdersRegex.exec(index)) !== null) {
    htmlKeys.add(m[1]);
}

// Extract all keys from main.js translations (roughly)
const ptObjRegex = /pt:\s*{([\s\S]*?)},\s*en:/;
const enObjRegex = /en:\s*{([\s\S]*?)}\s*};/;
const ptMatch = ptObjRegex.exec(mainjs);
const enMatch = enObjRegex.exec(mainjs);

if (!ptMatch || !enMatch) {
    console.log("Could not parse main.js translations.");
    process.exit(1);
}

const ptKeys = new Set();
const enKeys = new Set();

const keyRegex = /^\s*([a-zA-Z0-9_]+)\s*:/gm;

while ((m = keyRegex.exec(ptMatch[1])) !== null) {
    ptKeys.add(m[1]);
}
while ((m = keyRegex.exec(enMatch[1])) !== null) {
    enKeys.add(m[1]);
}

console.log("Keys in HTML but missing in PT main.js:");
htmlKeys.forEach(k => {
    if (!ptKeys.has(k)) console.log(k);
});

console.log("\nKeys in HTML but missing in EN main.js:");
htmlKeys.forEach(k => {
    if (!enKeys.has(k)) console.log(k);
});

console.log("\nKeys in PT but missing in EN:");
ptKeys.forEach(k => {
    if (!enKeys.has(k)) console.log(k);
});

console.log("\nKeys in EN but missing in PT:");
enKeys.forEach(k => {
    if (!ptKeys.has(k)) console.log(k);
});
