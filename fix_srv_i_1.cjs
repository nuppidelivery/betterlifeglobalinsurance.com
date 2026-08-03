const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // For index.html card
    const regex1 = /<h4[^>]*data-i18n="srv_i_1"[^>]*>.*?<\/h4>/g;
    if (regex1.test(content)) {
        content = content.replace(regex1, '<h4 data-i18n="srv_i_1">Seguro de vida internacional</h4>');
        changed = true;
    }

    // For dropdowns in all files
    const regex2 = /<a[^>]*data-i18n="srv_i_1"[^>]*>.*?<\/a>/g;
    if (regex2.test(content)) {
        content = content.replace(/<a([^>]*)data-i18n="srv_i_1"([^>]*)>.*?<\/a>/g, '<a$1data-i18n="srv_i_1"$2>Seguro de vida internacional</a>');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

function processFolder(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        const filePath = path.join(folder, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
                processFolder(filePath);
            }
        } else if (filePath.endsWith('.html')) {
            replaceInFile(filePath);
        }
    }
}

processFolder('.');

// Now update main.js for PT and EN
let mainJs = fs.readFileSync('main.js', 'utf8');
mainJs = mainJs.replace(/srv_i_1:\s*"Seguro de Vida Internacional"/g, 'srv_i_1: "Seguro de vida internacional"');
// Ensure EN is correct
mainJs = mainJs.replace(/srv_i_1:\s*"International Life Insurance"/g, 'srv_i_1: "International Life Insurance"');
fs.writeFileSync('main.js', mainJs, 'utf8');

console.log('Fixed srv_i_1 in all HTML files and main.js');
