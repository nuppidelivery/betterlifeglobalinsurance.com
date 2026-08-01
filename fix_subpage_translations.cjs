const fs = require('fs');
const path = require('path');

function processHtml(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        if (!file.endsWith('.html')) continue;
        const filePath = path.join(folder, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;

        const replacements = [
            // Mobile Menu
            ['>Quem Somos<', ' data-i18n="quem_somos_link">Quem Somos<'],
            ['>Perguntas Frequentes<', ' data-i18n="nav_faq">Perguntas Frequentes<'],
            ['>FAQ<', ' data-i18n="nav_faq">FAQ<'],
            ['>Nossas Soluções<', ' data-i18n="services_title">Nossas Soluções<'],
            ['>Início<', ' data-i18n="nav_home">Início<'],
            ['<span style="color: rgba(255,255,255,0.6);">Seguro de Vida Internacional</span>', '<span style="color: rgba(255,255,255,0.6);" data-i18n="srv_i_title">Seguro de Vida Internacional</span>'],
            ['<span style="font-weight: 600;">Estratégias Patrimoniais em Dólar</span>', '<span style="font-weight: 600;" data-i18n="estrategias_name">Estratégias Patrimoniais em Dólar</span>'],
            ['<span style="font-weight: 600;">Proteção Patrimonial</span>', '<span style="font-weight: 600;" data-i18n="protecao_name">Proteção Patrimonial</span>'],
            ['<span style="font-weight: 600;">Planejamento Sucessório</span>', '<span style="font-weight: 600;" data-i18n="sucessao_name">Planejamento Sucessório</span>'],
            ['<span style="font-weight: 600;">Seguro de Vida Internacional</span>', '<span style="font-weight: 600;" data-i18n="vida_int_name">Seguro de Vida Internacional</span>']
        ];

        for (const [oldStr, newStr] of replacements) {
            if (content.includes(oldStr)) {
                // Ensure we don't duplicate data-i18n
                if (!content.includes(newStr) && !oldStr.includes('data-i18n')) {
                    content = content.replaceAll(oldStr, newStr);
                    changed = true;
                }
            }
        }

        // Also fix the duplicate data-i18n in index.html just in case
        if (content.includes('data-i18n="eyebrow_about" data-i18n="quem_somos_link"')) {
            content = content.replaceAll('data-i18n="eyebrow_about" data-i18n="quem_somos_link"', 'data-i18n="eyebrow_about"');
            changed = true;
        }
        if (content.includes('data-i18n="foot_nav_2" class="text-gradient-gold" data-i18n="quem_somos_link"')) {
            content = content.replaceAll('data-i18n="foot_nav_2" class="text-gradient-gold" data-i18n="quem_somos_link"', 'data-i18n="foot_nav_2" class="text-gradient-gold"');
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated', filePath);
        }
    }
}

processHtml('.');
processHtml('seguros');
processHtml('internacional');

let mainjs = fs.readFileSync('main.js', 'utf8');
if (!mainjs.includes('estrategias_name:')) {
    mainjs = mainjs.replace(/(pt:\s*{[\s\S]*?)(};|\s*en:)/, (match, p1, p2) => p1 + `
        estrategias_name: "Estratégias Patrimoniais em Dólar",
        protecao_name: "Proteção Patrimonial",
        sucessao_name: "Planejamento Sucessório",
        vida_int_name: "Seguro de Vida Internacional",
        nav_home: "Início",
` + p2);
    mainjs = mainjs.replace(/(en:\s*{[\s\S]*?)(};)/, (match, p1, p2) => p1 + `
        estrategias_name: "Dollar Wealth Strategies",
        protecao_name: "Asset Protection",
        sucessao_name: "Succession Planning",
        vida_int_name: "International Life Insurance",
        nav_home: "Home",
` + p2);
    fs.writeFileSync('main.js', mainjs, 'utf8');
    console.log('Updated main.js with breadcrumb keys');
}
