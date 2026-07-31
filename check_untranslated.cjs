const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM(html);
const document = dom.window.document;

const untranslated = [];
const elements = document.querySelectorAll('body *:not(script):not(style)');

for (const el of elements) {
    if (el.children.length === 0 && el.textContent.trim().length > 0) {
        if (!el.hasAttribute('data-i18n')) {
            // Also check if any ancestor has data-i18n that might cover it? 
            // Usually data-i18n replaces textContent. So if it doesn't have data-i18n, it might be untranslated.
            let text = el.textContent.trim();
            // Skip icons or empty things or just numbers
            if (text.match(/^[0-9\W]+$/)) continue; // ignore pure numbers/symbols
            untranslated.push(text);
        }
    }
    
    // also check placeholders
    if (el.hasAttribute('placeholder') && !el.hasAttribute('data-i18n-placeholder')) {
        untranslated.push('PLACEHOLDER: ' + el.getAttribute('placeholder'));
    }
}

console.log(Array.from(new Set(untranslated)).join('\n'));
