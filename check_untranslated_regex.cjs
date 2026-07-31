const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// match tags that contain text but no child tags, and no data-i18n attribute
const regex = /<([a-zA-Z0-9]+)[^>]*(?<!data-i18n(?:-[a-z]+)?="[^"]*")[^>]*>([^<]+)<\/\1>/gi;

let match;
const untranslated = new Set();
while ((match = regex.exec(html)) !== null) {
    const text = match[2].trim();
    if (text.length > 0 && !text.match(/^[0-9\W]+$/)) {
        untranslated.add(text);
    }
}
console.log(Array.from(untranslated).join('\n'));
