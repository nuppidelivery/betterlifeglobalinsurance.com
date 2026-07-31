const fs = require('fs');

function findUntranslated(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    
    // We can just find all data-i18n attributes, then look for any visible text that doesn't belong to them?
    // Actually, let's just find the tags without data-i18n.
    
    let untranslated = [];
    
    const lines = html.split('\n');
    lines.forEach((line, i) => {
        // match something that looks like > text <
        let m;
        const re = />\s*([^<]+?)\s*</g;
        while ((m = re.exec(line)) !== null) {
            const text = m[1].trim();
            if (text.length > 0 && !text.match(/^[0-9\W]+$/)) {
                // Now check if the tag before this text has data-i18n
                const index = m.index;
                // substring up to the >
                const before = line.substring(0, index + 1);
                // find the last < before the >
                const lastOpen = before.lastIndexOf('<');
                if (lastOpen !== -1) {
                    const tag = before.substring(lastOpen);
                    if (!tag.includes('data-i18n')) {
                        // avoid script/style tags, although they are rare inline like this
                        if (!tag.startsWith('<script') && !tag.startsWith('<style')) {
                            untranslated.push({line: i+1, text: text, tag: tag});
                        }
                    }
                }
            }
        }
    });
    
    return untranslated;
}

const results = findUntranslated('index.html');
results.forEach(r => console.log(`Line ${r.line}: ${r.text}`));
