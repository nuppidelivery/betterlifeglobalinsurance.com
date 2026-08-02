const fs = require('fs');
const path = require('path');

function replaceInFolder(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        if (!file.endsWith('.html')) continue;
        const filePath = path.join(folder, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;

        if (content.includes('One Agency. Every Protection.')) {
            content = content.replace(/One Agency\. Every Protection\./g, 'Você vive. Nós resolvemos.');
            changed = true;
        }

        const footerRegex = /<h5 data-i18n="eyebrow_services"[^>]*>Nossas Soluções<\/h5>\s*<ul class="footer-links">[\s\S]*?<\/ul>/;
        
        const newFooter = `<h5 data-i18n="eyebrow_services" class="text-gradient-gold">Nossas Soluções</h5>
            <ul class="footer-links">
              <!-- Seguros Pessoais -->
              <li style="color: var(--white); font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;" data-i18n="srv_p_title">Seguros Pessoais</li>
              <li><a href="../seguros/vida.html" data-i18n="srv_p_1">Seguro de Vida</a></li>
              <li><a href="../seguros/saude.html" data-i18n="srv_p_2">Seguro Saúde</a></li>
              <li><a href="../seguros/carro.html" data-i18n="srv_p_3">Seguro de Carro</a></li>
              <li><a href="../seguros/residencial.html" data-i18n="srv_p_4">Seguro de Casa</a></li>
              <li><a href="../seguros/viagem.html" data-i18n="srv_p_5">Seguro Viagem</a></li>
              <li><a href="../seguros/pets.html" data-i18n="srv_p_6">Seguro para Pets</a></li>
              <li><a href="../seguros/umbrella.html" data-i18n="srv_p_7">Umbrella Insurance</a></li>

              <!-- Seguros Empresariais -->
              <li style="color: var(--white); font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;" data-i18n="srv_e_title">Seguros Empresariais</li>
              <li><a href="../seguros/bop.html" data-i18n="srv_e_1">BOP (Business Owner's Policy)</a></li>
              <li><a href="../seguros/workers-comp.html" data-i18n="srv_e_2">Worker's Compensation</a></li>
              <li><a href="../seguros/commercial-auto.html" data-i18n="srv_e_3">Commercial Auto</a></li>
              <li><a href="../seguros/commercial-property.html" data-i18n="srv_e_4">Commercial Property</a></li>
              <li><a href="../seguros/general-liability.html" data-i18n="srv_e_5">General Liability</a></li>
              <li><a href="../seguros/professional-liability.html" data-i18n="srv_e_6">Professional Liability</a></li>
              <li><a href="../seguros/cyber-liability.html" data-i18n="srv_e_7">Cyber Liability</a></li>
              <li><a href="../seguros/surety-bonds.html" data-i18n="srv_e_8">Surety Bonds</a></li>

              <!-- Soluções Internacionais -->
              <li style="color: var(--white); font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;" data-i18n="srv_i_title">Soluções Internacionais</li>
              <li><a href="../internacional/vida-internacional.html" data-i18n="srv_i_1">Soluções Internacionais</a></li>
              <li><a href="../internacional/protecao-patrimonial.html" data-i18n="srv_i_2">Proteção Patrimonial</a></li>
              <li><a href="../internacional/sucessao.html" data-i18n="srv_i_3">Planejamento Sucessório</a></li>
              <li><a href="../internacional/estrategias-patrimoniais.html" data-i18n="srv_i_4">Geração de Renda em Dólar</a></li>
            </ul>`;
        
        if (footerRegex.test(content)) {
            content = content.replace(footerRegex, newFooter);
            changed = true;
        }
        
        // Let's also fix the <h5>Você vive. Nós resolvemos.</h5>
        if (content.includes('<h5>One Agency. Every Protection.</h5>')) {
             content = content.replace(/<h5>One Agency\. Every Protection\.<\/h5>/g, '<h5 data-i18n="slogan_global">Você vive. Nós resolvemos.</h5>');
             changed = true;
        }
        
        // Since my first regex didn't catch <h5>Você vive. Nós resolvemos.</h5> in subpages yet, I should check if it has it in Portuguese already
        if (content.includes('<h5>Você vive. Nós resolvemos.</h5>')) {
            content = content.replace(/<h5>Você vive\. Nós resolvemos\.<\/h5>/g, '<h5 data-i18n="slogan_global">Você vive. Nós resolvemos.</h5>');
            changed = true;
        }
        
        // Also fix <title> in subpages if needed, although subpages have their own title logic.

        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated ' + filePath);
        }
    }
}

replaceInFolder('seguros');
replaceInFolder('internacional');
console.log('Done replacing in subfolders');
