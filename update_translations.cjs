const fs = require('fs');
const path = require('path');

// 1. Update main.js
let mainjs = fs.readFileSync('main.js', 'utf8');

const ptAdditions = `
        story_1_author: "Mariana Silva",
        story_1_city: "Orlando, FL",
        story_1_text: "\\"O sistema de saúde aqui sempre me assustou. A BLGI encontrou o plano perfeito para minha família, explicando tudo em português. Confiança total!\\"",
        story_2_author: "Ricardo Mendes",
        story_2_city: "Boca Raton, FL",
        story_2_text: "\\"Contratei o seguro do meu carro e da minha casa. A agilidade deles e a clareza nas opções de cobertura são impressionantes. Recomendo de olhos fechados.\\"",
        story_3_author: "Thiago Costa",
        story_3_city: "Miami, FL",
        story_3_text: "\\"Como dono de negócio, precisava de um General Liability. Eles resolveram minha apólice no mesmo dia. Um alívio saber que tenho esse suporte.\\"",
        foot_nav_2: "Quem Somos",
        foot_nav_3: "Nossas Soluções",
        footer_desc_title: "Você vive. Nós resolvemos.",
        footer_desc: "Resolvemos tudo o que envolve seguros para famílias e empresas brasileiras nos Estados Unidos, oferecendo orientação clara, soluções personalizadas e acompanhamento em cada etapa da vida.",
`;

const enAdditions = `
        story_1_author: "Mariana Silva",
        story_1_city: "Orlando, FL",
        story_1_text: "\\"The healthcare system here always scared me. BLGI found the perfect plan for my family, explaining everything clearly. Total trust!\\"",
        story_2_author: "Ricardo Mendes",
        story_2_city: "Boca Raton, FL",
        story_2_text: "\\"I got my home and auto insurance with them. Their agility and clarity on coverage options are impressive. Highly recommend.\\"",
        story_3_author: "Thiago Costa",
        story_3_city: "Miami, FL",
        story_3_text: "\\"As a business owner, I needed General Liability. They got my policy sorted the same day. Such a relief to have this support.\\"",
        foot_nav_2: "About Us",
        foot_nav_3: "Our Solutions",
        news_title: "News and Content",
        footer_desc_title: "You live. We handle it.",
        footer_desc: "We solve everything involving insurance for Brazilian families and businesses in the United States, offering clear guidance, personalized solutions, and support at every stage of life.",
`;

// Insert into pt object
mainjs = mainjs.replace(/(pt:\s*{[\s\S]*?)(};|\s*en:)/, (match, p1, p2) => {
    // wait, we need to insert before the end of the PT object. 
    // Usually it ends right before `en:`
    return p1 + ptAdditions + p2;
});

// Insert into en object
mainjs = mainjs.replace(/(en:\s*{[\s\S]*?)(};)/, (match, p1, p2) => {
    return p1 + enAdditions + p2;
});

// Fix existing footer_desc in main.js (remove it since we replaced it)
// It was: footer_desc: "Você vive. Nós resolvemos. A agência que ajuda famílias e empresas brasileiras nos Estados Unidos a proteger tudo o que construíram.",
mainjs = mainjs.replace(/footer_desc:\s*".*?",/g, ''); // we will add it via the additions above

fs.writeFileSync('main.js', mainjs, 'utf8');

// 2. Fix HTML files for footer_desc
function processHtml(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        if (!file.endsWith('.html')) continue;
        const filePath = path.join(folder, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;

        // Fix footer description
        const targetFooter = '<p class="footer-desc" data-i18n="footer_desc" style="margin-top: 1.5rem;"><h5 style="color: var(--white); margin-bottom: 0.5rem; font-size: 1.2rem;">Você vive. Nós resolvemos.</h5>Resolvemos tudo o que envolve seguros para famílias e empresas brasileiras nos Estados Unidos, oferecendo orientação clara, soluções personalizadas e acompanhamento em cada etapa da vida.</p>';
        const newFooter = '<h5 style="color: var(--white); margin-bottom: 0.5rem; font-size: 1.2rem; margin-top: 1.5rem;" data-i18n="footer_desc_title">Você vive. Nós resolvemos.</h5>\n          <p class="footer-desc" data-i18n="footer_desc">Resolvemos tudo o que envolve seguros para famílias e empresas brasileiras nos Estados Unidos, oferecendo orientação clara, soluções personalizadas e acompanhamento em cada etapa da vida.</p>';
        
        if (content.includes(targetFooter)) {
            content = content.replace(targetFooter, newFooter);
            changed = true;
        } else if (content.includes('Você vive. Nós resolvemos.</h5>')) {
            // Regex fallback if spaces differ
            content = content.replace(/<p class="footer-desc" data-i18n="footer_desc" style="margin-top: 1.5rem;">\s*<h5 style="color: var\(--white\); margin-bottom: 0.5rem; font-size: 1.2rem;">Você vive. Nós resolvemos.<\/h5>[\s\S]*?<\/p>/, newFooter);
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

console.log('Done updating main.js and HTML files.');
