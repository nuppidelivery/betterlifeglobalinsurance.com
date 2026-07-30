const fs = require('fs');
const path = require('path');

function updateFooter(content) {
    // We need to replace the Nossas Soluções footer block.
    const footerRegex = /<h5 data-i18n="eyebrow_services"[^>]*>Nossas Soluções<\/h5>\s*<ul class="footer-links">[\s\S]*?<\/ul>/;
    
    // Convert categories to nav-dropdowns exactly like header
    // Wait, in footer, the ul has display:flex, flex-direction:column.
    // If we put <div class="nav-dropdown"> inside <li> or just as blocks, it will work.
    
    const newFooter = `<h5 data-i18n="eyebrow_services" class="text-gradient-gold">Nossas Soluções</h5>
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
              
              <!-- Seguros Pessoais -->
              <div class="nav-dropdown" style="display: block;">
                <div class="dropdown-toggle" style="color: var(--white); font-weight: 600; font-size: 1rem;"><span data-i18n="srv_p_title">Seguros Pessoais</span> <i class="ph-bold ph-caret-down"></i></div>
                <div class="dropdown-content glass-panel" style="top: auto; bottom: 100%; margin-bottom: 10px;">
                  <a href="../seguros/vida.html" data-i18n="srv_p_1">Seguro de Vida</a>
                  <a href="../seguros/saude.html" data-i18n="srv_p_2">Seguro Saúde</a>
                  <a href="../seguros/carro.html" data-i18n="srv_p_3">Seguro de Carro</a>
                  <a href="../seguros/residencial.html" data-i18n="srv_p_4">Seguro de Casa</a>
                  <a href="../seguros/viagem.html" data-i18n="srv_p_5">Seguro Viagem</a>
                  <a href="../seguros/pets.html" data-i18n="srv_p_6">Seguro para Pets</a>
                  <a href="../seguros/umbrella.html" data-i18n="srv_p_7">Umbrella Insurance</a>
                </div>
              </div>

              <!-- Seguros Empresariais -->
              <div class="nav-dropdown" style="display: block;">
                <div class="dropdown-toggle" style="color: var(--white); font-weight: 600; font-size: 1rem;"><span data-i18n="srv_e_title">Seguros Empresariais</span> <i class="ph-bold ph-caret-down"></i></div>
                <div class="dropdown-content glass-panel" style="top: auto; bottom: 100%; margin-bottom: 10px;">
                  <a href="../seguros/bop.html" data-i18n="srv_e_1">BOP (Business Owner's Policy)</a>
                  <a href="../seguros/workers-comp.html" data-i18n="srv_e_2">Worker's Compensation</a>
                  <a href="../seguros/commercial-auto.html" data-i18n="srv_e_3">Commercial Auto</a>
                  <a href="../seguros/commercial-property.html" data-i18n="srv_e_4">Commercial Property</a>
                  <a href="../seguros/general-liability.html" data-i18n="srv_e_5">General Liability</a>
                  <a href="../seguros/professional-liability.html" data-i18n="srv_e_6">Professional Liability</a>
                  <a href="../seguros/cyber-liability.html" data-i18n="srv_e_7">Cyber Liability</a>
                  <a href="../seguros/surety-bonds.html" data-i18n="srv_e_8">Surety Bonds</a>
                </div>
              </div>

              <!-- Soluções Internacionais -->
              <div class="nav-dropdown" style="display: block;">
                <div class="dropdown-toggle" style="color: var(--white); font-weight: 600; font-size: 1rem;"><span data-i18n="srv_i_title">Soluções Internacionais</span> <i class="ph-bold ph-caret-down"></i></div>
                <div class="dropdown-content glass-panel" style="top: auto; bottom: 100%; margin-bottom: 10px;">
                  <a href="../internacional/vida-internacional.html" data-i18n="srv_i_1">Seguro de Vida Internacional</a>
                  <a href="../internacional/protecao-patrimonial.html" data-i18n="srv_i_2">Proteção Patrimonial</a>
                  <a href="../internacional/sucessao.html" data-i18n="srv_i_3">Planejamento Sucessório</a>
                  <a href="../internacional/estrategias-patrimoniais.html" data-i18n="srv_i_4">Geração de Renda em Dólar</a>
                </div>
              </div>
            </div>`;

    if (footerRegex.test(content)) {
        content = content.replace(footerRegex, newFooter);
    }
    
    // Remove duplicated footer text:
    // It appears twice: 
    // <p style="color: rgba(255,255,255,0.7); line-height: 1.6; font-size: 0.95rem; margin-top: 1rem;" data-i18n="footer_desc">Você vive. Nós resolvemos. Resolvemos tudo o que envolve seguros para famílias e empresas brasileiras nos Estados Unidos, oferecendo orientação clara, soluções personalizadas e acompanhamento em cada etapa da vida.</p>
    // We only want ONE occurrence. Since there could be a few variations due to spaces, we can regex it.
    const duplicateRegex = /(<p[^>]*data-i18n="footer_desc"[^>]*>Você vive\. Nós resolvemos\. Resolvemos tudo o que envolve seguros para famílias e empresas brasileiras nos Estados Unidos, oferecendo orientação clara, soluções personalizadas e acompanhamento em cada etapa da vida\.<\/p>)([\s\S]*?)\1/g;
    content = content.replace(duplicateRegex, "$1$2");
    
    // In some pages, they might not have data-i18n="footer_desc" or slight differences. Let's do a more robust global replace if it appears multiple times.
    const pText = 'Você vive. Nós resolvemos. Resolvemos tudo o que envolve seguros para famílias e empresas brasileiras nos Estados Unidos, oferecendo orientação clara, soluções personalizadas e acompanhamento em cada etapa da vida.';
    
    let occurrences = 0;
    // Split the content by the text (or close to it)
    const exactRegex = /<p[^>]*>Você vive\. Nós resolvemos\. Resolvemos tudo o que envolve seguros para famílias e empresas brasileiras nos Estados Unidos, oferecendo orientação clara, soluções personalizadas e acompanhamento em cada etapa da vida\.<\/p>/g;
    content = content.replace(exactRegex, (match) => {
        occurrences++;
        if (occurrences > 1) {
            return ''; // Remove duplicates
        }
        return match;
    });

    return content;
}

function replaceInFolder(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        if (!file.endsWith('.html')) continue;
        const filePath = path.join(folder, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        let newContent = updateFooter(content);

        // Adjust link paths depending on folder
        if (folder === '.') {
            newContent = newContent.replace(/\.\.\/seguros\//g, 'seguros/');
            newContent = newContent.replace(/\.\.\/internacional\//g, 'internacional/');
        }

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log('Updated ' + filePath);
        }
    }
}

replaceInFolder('.');
replaceInFolder('seguros');
replaceInFolder('internacional');
console.log('Footer updated.');
