const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. Fix the hardcoded category titles back to "Soluções Internacionais"
// Find the footer category
indexHtml = indexHtml.replace(/<li style="color: var\(--white\); font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">Soluções Internacionais<\/li>/g, '<li style="color: var(--white); font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">Soluções Internacionais</li>');

// Find the FAQ category
indexHtml = indexHtml.replace(/<h4 class="faq-category-title text-gradient-gold" id="faq-solucoes-internacionais"[^>]*>.*?Soluções Internacionais<\/h4>/s, function(match) {
    return match.replace('Soluções Internacionais', 'Soluções Internacionais');
});

// The <h3> for Soluções Internacionais in the Services Section
indexHtml = indexHtml.replace(/<h3 id="solucoes-internacionais" data-i18n="srv_i_title"[^>]*>Soluções Internacionais<\/h3>/, function(match) {
    return match.replace('Soluções Internacionais', 'Soluções Internacionais');
});

// The menu dropdown toggle
indexHtml = indexHtml.replace(/<a href="#solucoes-internacionais" class="dropdown-toggle"><span data-i18n="srv_i_title">Soluções Internacionais<\/span>/g, '<a href="#solucoes-internacionais" class="dropdown-toggle"><span data-i18n="srv_i_title">Soluções Internacionais</span>');

// The mobile nav
indexHtml = indexHtml.replace(/<a href="#solucoes-internacionais" data-i18n="srv_i_title">Soluções Internacionais<\/a>/g, '<a href="#solucoes-internacionais" data-i18n="srv_i_title">Soluções Internacionais</a>');

// Now the first item: srv_i_1
indexHtml = indexHtml.replace(/<a href="internacional\/vida-internacional\.html" data-i18n="srv_i_1">Soluções de Vida Internacionais<\/a>/, '<a href="internacional/vida-internacional.html" data-i18n="srv_i_1">Soluções Internacionais</a>');
indexHtml = indexHtml.replace(/<h4 data-i18n="srv_i_1">Soluções de Vida Internacionais<\/h4>/, '<h4 data-i18n="srv_i_1">Soluções Internacionais</h4>');

// There's a typo in the footer link: "Planejamento Soluções Internacionais"
indexHtml = indexHtml.replace(/>Planejamento Soluções Internacionais<\/a><\/li>/, '>Planejamento Sucessório</a></li>');
indexHtml = indexHtml.replace(/<button class="faq-btn"><span>O que s[ãa]o as Soluções Internacionais da Better Life\?<\/span>/, '<button class="faq-btn"><span>O que são as Soluções Internacionais da Better Life?</span>');

fs.writeFileSync('index.html', indexHtml, 'utf8');

// Now update main.js
let mainJs = fs.readFileSync('main.js', 'utf8');
mainJs = mainJs.replace(/srv_i_title:\s*"Soluções Internacionais"/g, 'srv_i_title: "Soluções Internacionais"');
mainJs = mainJs.replace(/srv_i_1:\s*"Soluções de Vida Internacionais"/g, 'srv_i_1: "Soluções Internacionais"');
mainJs = mainJs.replace(/opt_internacional:\s*"Soluções Internacionais"/g, 'opt_internacional: "Soluções Internacionais"');
mainJs = mainJs.replace(/nav_faq_8:\s*"Soluções Internacionais"/g, 'nav_faq_8: "Soluções Internacionais"');
// Fix the typo in srv_i_3 introduced globally: "Planejamento Sucessório Soluções Internacionais"
mainJs = mainJs.replace(/"Planejamento Sucessório Soluções Internacionais"/g, '"Planejamento Sucessório"');
mainJs = mainJs.replace(/"Planejamento Sucessrio Soluções Internacionais"/g, '"Planejamento Sucessório"');
mainJs = mainJs.replace(/srv_i_3:\s*"Planejamento Sucessório Soluções Internacionais"/g, 'srv_i_3: "Planejamento Sucessório"');
mainJs = mainJs.replace(/srv_i_3:\s*"Planejamento Sucessrio Soluções Internacionais"/g, 'srv_i_3: "Planejamento Sucessório"');
fs.writeFileSync('main.js', mainJs, 'utf8');

console.log('Update Complete!');
