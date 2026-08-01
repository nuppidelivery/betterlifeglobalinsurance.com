const fs = require('fs');
const path = require('path');
const content = fs.readFileSync('main.js', 'utf8');

const ptMatch = content.match(/pt:\s*{([\s\S]*?)}(?:;|\s*en:)/);
function getKeys(objStr) {
    const keys = new Set();
    const regex = /^\s*([a-zA-Z0-9_]+)\s*:/gm;
    let match;
    while ((match = regex.exec(objStr)) !== null) {
        keys.add(match[1]);
    }
    return keys;
}
const ptKeys = getKeys(ptMatch[1]);

function checkHtml(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        const filePath = path.join(folder, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist') checkHtml(filePath);
        } else if (filePath.endsWith('.html')) {
            const html = fs.readFileSync(filePath, 'utf8');
            const regex = /data-i18n(-placeholder)?="([a-zA-Z0-9_]+)"/g;
            let match;
            while ((match = regex.exec(html)) !== null) {
                const key = match[2];
                if (!ptKeys.has(key)) {
                    console.log('Missing key in JS for HTML usage:', key, 'in file', filePath);
                }
            }
        }
    }
}
checkHtml('.');
console.log('Validation finished.');
