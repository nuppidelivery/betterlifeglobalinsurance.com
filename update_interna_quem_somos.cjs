const fs = require('fs');
const path = require('path');

function processHtml(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        if (file !== 'interna.html') continue;
        const filePath = path.join(folder, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;
        
        // Update Header Desktop Menu for Quem Somos
        const desktopRegex = /<a href="([^"]*#quem-somos)" class="nav-link"[^>]*>Quem Somos<\/a>/;
        if (desktopRegex.test(content)) {
            const match = desktopRegex.exec(content);
            const hrefQuem = match[1];
            const hrefVideo = hrefQuem.includes('index.html') ? 'index.html#video-boas-vindas' : '#video-boas-vindas';
            
            const newDesktop = `<div class="nav-dropdown">
              <a href="${hrefQuem}" class="dropdown-toggle"><span data-i18n="quem_somos_link">Quem Somos</span> <i class="ph-bold ph-caret-down"></i></a>
              <div class="dropdown-content glass-panel">
                <a href="${hrefQuem}" data-i18n="quem_somos_link">Quem Somos</a>
                <a href="${hrefVideo}" data-i18n="welcome_link">Bem-vindo</a>
              </div>
            </div>`;
            
            content = content.replace(desktopRegex, newDesktop);
            changed = true;
        }

        // Update Header Mobile Menu
        const mobileTargetRegex = /<a href="([^"]*#quem-somos)" style="border: none; padding: 0;"[^>]*>Quem Somos<\/a>/;
        if (mobileTargetRegex.test(content) && !content.includes('welcome_link')) {
            const match = mobileTargetRegex.exec(content);
            const hrefQuemMob = match[1];
            const hrefVideoMob = hrefQuemMob.includes('index.html') ? 'index.html#video-boas-vindas' : '#video-boas-vindas';
            
            const mobileTargetStr = match[0];
            const newMobile = `${mobileTargetStr}\n                <a href="${hrefVideoMob}" style="border: none; padding: 0;" data-i18n="welcome_link">Bem-vindo</a>`;
            content = content.replace(mobileTargetStr, newMobile);
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated', filePath);
        }
    }
}
processHtml('.');
