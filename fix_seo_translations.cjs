const fs = require('fs');
const path = require('path');

let mainjs = fs.readFileSync('main.js', 'utf8');

const ptAdditions = [];
const enAdditions = [];

function processHtml(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        if (!file.endsWith('.html')) continue;
        const filePath = path.join(folder, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;
        
        const base = file.replace('.html', '').replace(/-/g, '_');
        const titleKey = 'seo_title_' + base;
        const descKey = 'seo_desc_' + base;

        const titleMatch = content.match(/<title>([^<]+)<\/title>/);
        if (titleMatch) {
            const titleText = titleMatch[1];
            ptAdditions.push('        ' + titleKey + ': "' + titleText.replace(/"/g, '\\\\"') + '",');
            enAdditions.push('        ' + titleKey + ': "' + titleText.replace(/"/g, '\\\\"') + ' - EN",');
            content = content.replace(titleMatch[0], '<title data-i18n="' + titleKey + '">' + titleText + '</title>');
            changed = true;
        }

        const descMatch = content.match(/<meta\\s+name="description"\\s+content="([^"]+)">/);
        if (descMatch) {
            const descText = descMatch[1];
            ptAdditions.push('        ' + descKey + ': "' + descText.replace(/"/g, '\\\\"') + '",');
            enAdditions.push('        ' + descKey + ': "' + descText.replace(/"/g, '\\\\"') + ' - EN",');
            content = content.replace(descMatch[0], '<meta name="description" content="' + descText + '" data-i18n="' + descKey + '">');
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated SEO in', filePath);
        }
    }
}

processHtml('seguros');
processHtml('internacional');

for (let i = 0; i < enAdditions.length; i++) {
    let text = enAdditions[i];
    text = text.replace(/ - EN",$/, '",');
    text = text.replace(/Soluções Internacionais/g, "International Life Insurance");
    text = text.replace(/Seguro de Vida/g, "Life Insurance");
    text = text.replace(/Seguro Sa[úu]de/g, "Health Insurance");
    text = text.replace(/Seguro de Carro/g, "Auto Insurance");
    text = text.replace(/Seguro de Casa/g, "Home Insurance");
    text = text.replace(/Seguro Residencial/g, "Home Insurance");
    text = text.replace(/Seguro Viagem/g, "Travel Insurance");
    text = text.replace(/Seguro para Pets/g, "Pet Insurance");
    text = text.replace(/Prote[çc][ãa]o Patrimonial/g, "Asset Protection");
    text = text.replace(/Planejamento Sucess[óo]rio/g, "Succession Planning");
    text = text.replace(/Seguro/g, "Insurance");
    text = text.replace(/ | Better Life Global Insurance/g, " | Better Life Global Insurance");
    enAdditions[i] = text;
}

if (!mainjs.includes('seo_title_bop:')) {
    mainjs = mainjs.replace(/(pt:\\s*{[\\s\\S]*?)(};|\\s*en:)/, (match, p1, p2) => p1 + '\\n' + ptAdditions.join('\\n') + '\\n' + p2);
    mainjs = mainjs.replace(/(en:\\s*{[\\s\\S]*?)(};)/, (match, p1, p2) => p1 + '\\n' + enAdditions.join('\\n') + '\\n' + p2);
    fs.writeFileSync('main.js', mainjs, 'utf8');
    console.log('Updated main.js with SEO keys');
}
