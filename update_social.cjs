const fs = require('fs');
const path = require('path');
const root = __dirname;

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

const targetBlock = `<div class="social-icons" style="margin-top: 1.5rem;">
              <a href="https://wa.me/16892980422" target="_blank" aria-label="WhatsApp"><i class="ph-light ph-whatsapp-logo"></i></a>
              <a href="https://www.instagram.com/betterlifeglobalinsurance/" target="_blank" aria-label="Instagram"><i class="ph-light ph-instagram-logo"></i></a>
              <a href="https://www.tiktok.com/@betterlifeglobalinsuranc" target="_blank" aria-label="TikTok"><i class="ph-light ph-tiktok-logo"></i></a>
              <a href="https://www.linkedin.com/in/better-life-global-insurance-091251421/" target="_blank" aria-label="LinkedIn"><i class="ph-light ph-linkedin-logo"></i></a>
              <a href="mailto:hello@betterlifeglobalinsurance.com" aria-label="Email"><i class="ph-light ph-envelope-simple"></i></a>
            </div>`;

const replacementBlock = `<div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
              <div style="width: 100%; max-width: 250px; text-align: center;">
                  <a href="https://wa.me/16892980422" target="_blank" style="color: var(--gold-primary); text-decoration: none; font-weight: 600; font-size: 1.05rem; transition: color 0.3s ease;">@betterlifeglobalinsurance</a>
              </div>
              <div class="social-icons" style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
                  <a href="https://wa.me/16892980422" target="_blank" aria-label="WhatsApp"><i class="ph-light ph-whatsapp-logo"></i></a>
                  <a href="https://www.instagram.com/betterlifeglobalinsurance/" target="_blank" aria-label="Instagram"><i class="ph-light ph-instagram-logo"></i></a>
                  <a href="https://www.facebook.com/profile.php?id=61578277778554&mibextid=wwXIfr&mibextid=wwXIfr" target="_blank" aria-label="Facebook"><i class="ph-light ph-facebook-logo"></i></a>
                  <a href="https://www.tiktok.com/@betterlifeglobalinsuranc" target="_blank" aria-label="TikTok"><i class="ph-light ph-tiktok-logo"></i></a>
                  <a href="https://www.linkedin.com/in/better-life-global-insurance-091251421/" target="_blank" aria-label="LinkedIn"><i class="ph-light ph-linkedin-logo"></i></a>
                  <a href="mailto:hello@betterlifeglobalinsurance.com" aria-label="Email"><i class="ph-light ph-envelope-simple"></i></a>
              </div>
            </div>`;

function normalizeSpaces(str) {
    return str.replace(/\\s+/g, ' ').trim();
}

htmlFiles.forEach(file => {
    const filePath = path.join(root, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Simpler replacement using regex to ignore spaces
        // We know the block starts with <div class="social-icons" style="margin-top: 1.5rem;">
        // and ends with </div> after mailto link.
        const regex = /<div class="social-icons" style="margin-top: 1\.5rem;">[\s\S]*?<a href="mailto:hello@betterlifeglobalinsurance\.com" aria-label="Email"><i class="ph-light ph-envelope-simple"><\/i><\/a>\s*<\/div>/g;
        
        if (regex.test(content)) {
            content = content.replace(regex, replacementBlock);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated', file);
        }
    }
});
