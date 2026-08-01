const fs = require('fs');
const path = require('path');

let mainjs = fs.readFileSync('main.js', 'utf8');

// Fix in PT
mainjs = mainjs.replace(
    'footer_desc: "Resolvemos tudo o que envolve seguros',
    'footer_desc: "Tudo o que envolve seguros'
);
// Fix in EN
mainjs = mainjs.replace(
    'footer_desc: "We solve everything involving insurance',
    'footer_desc: "Everything involving insurance'
);

fs.writeFileSync('main.js', mainjs, 'utf8');

function processHtml(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        if (!file.endsWith('.html')) continue;
        const filePath = path.join(folder, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        if (content.includes('Resolvemos tudo o que envolve seguros para fam')) {
            content = content.replace(
                'Resolvemos tudo o que envolve seguros para fam',
                'Tudo o que envolve seguros para fam'
            );
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated HTML:', filePath);
        }
    }
}

processHtml('.');
processHtml('seguros');
processHtml('internacional');

console.log('Fixed footer text duplication.');
