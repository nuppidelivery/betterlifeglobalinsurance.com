const fs = require('fs');
const path = require('path');

const htmlFiles = [
    'index.html',
    'interna.html',
    'seguros/vida.html',
    'seguros/saude.html',
    'seguros/carro.html',
    'seguros/residencial.html',
    'seguros/viagem.html',
    'seguros/pets.html',
    'seguros/umbrella.html',
    'seguros/bop.html',
    'seguros/general-liability.html',
    'seguros/workers-comp.html',
    'seguros/commercial-auto.html',
    'seguros/commercial-property.html',
    'seguros/professional-liability.html',
    'seguros/cyber-liability.html',
    'seguros/surety-bonds.html',
    'internacional/vida-internacional.html',
    'internacional/protecao-patrimonial.html',
    'internacional/sucessao.html',
    'internacional/estrategias-patrimoniais.html'
];

htmlFiles.forEach(file => {
    let filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Desktop nav
    // From: <div class="nav-dropdown">\s*<a href="#quem-somos" class="dropdown-toggle">Quem Somos <i class="ph-bold ph-caret-down"></i></a>\s*<div class="dropdown-content glass-panel">\s*<a href="#quem-somos">Quem Somos</a>\s*<a href="#nosso-metodo"[^>]*>Nosso M[é]todo</a>\s*<a href="#faq">Perguntas Frequentes</a>\s*</div>\s*</div>
    // To: <a href="#quem-somos" class="nav-link">Quem Somos</a>
    // For interna/seguros pages it might be <a href="/#quem-somos"
    const desktopRegex = /<div class="nav-dropdown">\s*<a href="([^"]*#quem-somos)" class="dropdown-toggle">Quem Somos <i class="ph-bold ph-caret-down"><\/i><\/a>\s*<div class="dropdown-content[^>]*>\s*<a href="[^"]*#quem-somos">Quem Somos<\/a>\s*<a href="[^"]*#nosso-metodo"[^>]*>Nosso M[é]todo<\/a>\s*<a href="[^"]*#faq">Perguntas Frequentes<\/a>\s*<\/div>\s*<\/div>/g;
    
    // Some instances might have different inner links or missing #nosso-metodo if we removed it earlier? Let's check regex carefully.
    const desktopGeneralRegex = /<div class="nav-dropdown">\s*<a href="([^"]*#quem-somos)" class="dropdown-toggle">Quem Somos <i class="ph-bold ph-caret-down"><\/i><\/a>[\s\S]*?<\/div>\s*<\/div>/g;
    content = content.replace(desktopGeneralRegex, '<a href="$1" class="nav-link">Quem Somos</a>');

    // Mobile nav
    const mobileGeneralRegex = /<div style="width: 100%; border-bottom: 1px solid rgba\(255,255,255,0\.1\); padding-bottom: 0\.5rem; text-align: center;">\s*<span style="color: var\(--gold-light\); font-weight: 600; font-size: 0\.9rem; text-transform: uppercase;">Quem Somos<\/span>[\s\S]*?<\/div>\s*<\/div>/g;
    content = content.replace(mobileGeneralRegex, '<a href="/#quem-somos" style="display: block; width: 100%; padding: 0.8rem 0; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: center; color: var(--white); text-decoration: none;">Quem Somos</a>');
    
    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Quem somos updated.');
