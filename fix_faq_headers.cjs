const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');
let mainjs = fs.readFileSync('main.js', 'utf8');

// 1. Add translations to main.js for missing categories
const ptAdditions = `
        opt_casa: "Seguro de Casa",
        faq_cat_about: "Sobre a Better Life",
        mobile_faq: "FAQ",
`;
const enAdditions = `
        opt_casa: "Home Insurance",
        faq_cat_about: "About Better Life",
        mobile_faq: "FAQ",
`;

mainjs = mainjs.replace(/(pt:\s*{[\s\S]*?)(};|\s*en:)/, (match, p1, p2) => p1 + ptAdditions + p2);
mainjs = mainjs.replace(/(en:\s*{[\s\S]*?)(};)/, (match, p1, p2) => p1 + enAdditions + p2);

fs.writeFileSync('main.js', mainjs, 'utf8');

// 2. Replace HTML tags with data-i18n
// Line 618
index = index.replace(
    /<h4 class="faq-category-title text-gradient-gold" id="faq-seguro-saude" (.*?)><i class="ph-bold ph-stethoscope"><\/i>\s*Seguro Saúde<\/h4>/,
    '<h4 class="faq-category-title text-gradient-gold" id="faq-seguro-saude" $1><i class="ph-bold ph-stethoscope"></i> <span data-i18n="opt_saude">Seguro Saúde</span></h4>'
);

// Line 632
index = index.replace(
    /<h4 class="faq-category-title text-gradient-gold" id="faq-seguro-de-vida" (.*?)><i class="ph-bold ph-heart"><\/i>\s*Seguro de Vida<\/h4>/,
    '<h4 class="faq-category-title text-gradient-gold" id="faq-seguro-de-vida" $1><i class="ph-bold ph-heart"></i> <span data-i18n="opt_vida">Seguro de Vida</span></h4>'
);

// Line 642
index = index.replace(
    /<h4 class="faq-category-title text-gradient-gold" id="faq-seguro-carro" (.*?)><i class="ph-bold ph-car"><\/i>\s*Seguro de Carro<\/h4>/,
    '<h4 class="faq-category-title text-gradient-gold" id="faq-seguro-carro" $1><i class="ph-bold ph-car"></i> <span data-i18n="opt_carro">Seguro de Carro</span></h4>'
);

// Line 656
index = index.replace(
    /<h4 class="faq-category-title text-gradient-gold" id="faq-seguro-residencial" (.*?)><i class="ph-bold ph-house"><\/i>\s*Seguro de Casa<\/h4>/,
    '<h4 class="faq-category-title text-gradient-gold" id="faq-seguro-residencial" $1><i class="ph-bold ph-house"></i> <span data-i18n="opt_casa">Seguro de Casa</span></h4>'
);

// Line 666
index = index.replace(
    /<h4 class="faq-category-title text-gradient-gold" id="faq-seguro-pet" (.*?)><i class="ph-bold ph-paw-print"><\/i>\s*Seguro Pets<\/h4>/,
    '<h4 class="faq-category-title text-gradient-gold" id="faq-seguro-pet" $1><i class="ph-bold ph-paw-print"></i> <span data-i18n="nav_faq_6">Seguro Pets</span></h4>'
);

// Line 672
index = index.replace(
    /<h4 class="faq-category-title text-gradient-gold" id="faq-seguros-empresariais" (.*?)><i class="ph-bold ph-buildings"><\/i>\s*Seguros Empresariais<\/h4>/,
    '<h4 class="faq-category-title text-gradient-gold" id="faq-seguros-empresariais" $1><i class="ph-bold ph-buildings"></i> <span data-i18n="nav_faq_7">Seguros Empresariais</span></h4>'
);

// Line 690
index = index.replace(
    /<h4 class="faq-category-title text-gradient-gold" id="faq-solucoes-internacionais" (.*?)><i class="ph-bold ph-globe"><\/i>\s*Soluções Internacionais<\/h4>/,
    '<h4 class="faq-category-title text-gradient-gold" id="faq-solucoes-internacionais" $1><i class="ph-bold ph-globe"></i> <span data-i18n="nav_faq_8">Soluções Internacionais</span></h4>'
);

// Line 700
index = index.replace(
    /<h4 class="faq-category-title text-gradient-gold" id="faq-sobre-a-better-life" (.*?)><i class="ph-bold ph-info"><\/i>\s*Sobre a Better Life<\/h4>/,
    '<h4 class="faq-category-title text-gradient-gold" id="faq-sobre-a-better-life" $1><i class="ph-bold ph-info"></i> <span data-i18n="faq_cat_about">Sobre a Better Life</span></h4>'
);

// Also fix the FAQ link in mobile menu
index = index.replace(
    /<a href="#faq" class="mobile-nav-link">FAQ<\/a>/g,
    '<a href="#faq" class="mobile-nav-link" data-i18n="mobile_faq">FAQ</a>'
);

fs.writeFileSync('index.html', index, 'utf8');
console.log('Fixed index.html FAQ headers and mobile FAQ link.');
