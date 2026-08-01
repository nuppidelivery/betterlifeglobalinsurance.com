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

const missingPt = {};

function checkHtml(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        const filePath = path.join(folder, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist') checkHtml(filePath);
        } else if (filePath.endsWith('.html')) {
            const html = fs.readFileSync(filePath, 'utf8');
            // Regex to capture the tag, the data-i18n key, and the innerHTML
            const regex = /data-i18n="([a-zA-Z0-9_]+)"(?:[^>]*)>([\s\S]*?)<\//g;
            let match;
            while ((match = regex.exec(html)) !== null) {
                const key = match[1];
                const text = match[2].trim().replace(/\s+/g, ' ').replace(/"/g, '\\"');
                if (!ptKeys.has(key)) {
                    missingPt[key] = text;
                }
            }
        }
    }
}
checkHtml('.');

fs.writeFileSync('missing_keys.json', JSON.stringify(missingPt, null, 2));
console.log('Found', Object.keys(missingPt).length, 'missing keys.');
