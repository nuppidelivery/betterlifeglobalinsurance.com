const fs = require('fs');

function fixHtml(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix the typo "normalémente" in HTML by replacing it with "normalmente" and adding i18n
    content = content.replace(/>Depende\. Os planos do Marketplace normalémente/g, ' data-i18n="faq_a1">Depende. Os planos do Marketplace normalmente');
    content = content.replace(/>Depende da apólice\. Na Flórida, muitas coberturas incluem danos causados pelo vento, mas normalémente/g, ' data-i18n="faq_a9">Depende da apólice. Na Flórida, muitas coberturas incluem danos causados pelo vento, mas normalmente');
    content = content.replace(/>Na maioria dos casos, não\. Danos causados por enchentes normalémente/g, ' data-i18n="faq_a10">Na maioria dos casos, não. Danos causados por enchentes normalmente');
    
    // Fix form success desc
    content = content.replace(/<p>Em breve um de nossos especialistas te apresentará a melhor cotação e estará ao seu lado, acompanhando todas as etapas\.<\/p>/g, '<p data-i18n="form_success_desc">Em breve um de nossos especialistas te apresentará a melhor cotação e estará ao seu lado, acompanhando todas as etapas.</p>');
    
    // Fix slogan h5 in footer
    content = content.replace(/<h5>Você vive\. Nós resolvemos\.<\/h5>/g, '<h5 data-i18n="slogan_global">Você vive. Nós resolvemos.</h5>');

    fs.writeFileSync(file, content, 'utf8');
}

fixHtml('index.html');
// Let's also check if they are in interna.html
fixHtml('interna.html');

console.log('Final missing strings attached.');
