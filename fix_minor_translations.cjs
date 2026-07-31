const fs = require('fs');
const path = require('path');

let mainjs = fs.readFileSync('main.js', 'utf8');

const ptAdditions = `
        footer_location: "Orlando, Flórida",
        copyright_text: "Todos os direitos reservados.",
`;
const enAdditions = `
        footer_location: "Orlando, Florida",
        copyright_text: "All rights reserved.",
`;

// Only add if not already present
if (!mainjs.includes('footer_location:')) {
    mainjs = mainjs.replace(/(pt:\s*{[\s\S]*?)(};|\s*en:)/, (match, p1, p2) => p1 + ptAdditions + p2);
    mainjs = mainjs.replace(/(en:\s*{[\s\S]*?)(};)/, (match, p1, p2) => p1 + enAdditions + p2);
    fs.writeFileSync('main.js', mainjs, 'utf8');
}

function processHtml(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        if (!file.endsWith('.html')) continue;
        const filePath = path.join(folder, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;

        // Orlando location
        if (content.includes('<li><i class="ph-light ph-map-pin text-gradient-gold"></i> Orlando, Flórida</li>')) {
            content = content.replace(
                '<li><i class="ph-light ph-map-pin text-gradient-gold"></i> Orlando, Flórida</li>',
                '<li><i class="ph-light ph-map-pin text-gradient-gold"></i> <span data-i18n="footer_location">Orlando, Flórida</span></li>'
            );
            changed = true;
        }

        // Form success desc (only in index.html usually, but let's check)
        const oldDesc = '<p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.6; margin-bottom: 2rem;">\n        Em breve um de nossos especialistas te apresentará a melhor cotação e estará ao seu lado, acompanhando todas as etapas.\n      </p>';
        const newDesc = '<p data-i18n="form_success_desc" style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.6; margin-bottom: 2rem;">\n        Em breve um de nossos especialistas te apresentará a melhor cotação e estará ao seu lado, acompanhando todas as etapas.\n      </p>';
        
        if (content.includes(oldDesc)) {
            content = content.replace(oldDesc, newDesc);
            changed = true;
        } else if (content.includes('Em breve um de nossos especialistas te apresentará a melhor cotação e estará ao seu lado, acompanhando todas as etapas.')) {
            content = content.replace(
                /<p style="color: var\(--text-muted\); font-size: 1.05rem; line-height: 1.6; margin-bottom: 2rem;">\s*Em breve um de nossos especialistas te apresentará a melhor cotação e estará ao seu lado, acompanhando todas as etapas.\s*<\/p>/,
                newDesc
            );
            changed = true;
        }
        
        // Also fix copyright if needed (it already has data-i18n in index, let's make sure it does everywhere)
        if (content.includes('© 2026 Better Life Global Insurance. Todos os direitos reservados.</p>')) {
             content = content.replace(
                '© 2026 Better Life Global Insurance. Todos os direitos reservados.</p>',
                '© 2026 Better Life Global Insurance. <span data-i18n="copyright_text">Todos os direitos reservados.</span></p>'
             );
             changed = true;
        }

        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated HTML:', filePath);
        }
    }
}

processHtml('.');
processHtml('seguros');
processHtml('internacional');

console.log('Finished updating minor translations in HTML.');
