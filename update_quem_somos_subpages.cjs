const fs = require('fs');
const path = require('path');

function processHtml(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        if (!file.endsWith('.html')) continue;
        const filePath = path.join(folder, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;

        const isRoot = folder === '.';
        const prefix = isRoot ? '' : '../';
        
        // 2. Update Header Desktop Menu for Quem Somos
        // We look for: <a href="../index.html#quem-somos" class="nav-link">Quem Somos</a>
        const desktopRegex = /<a href="([^"]*#quem-somos)" class="nav-link"[^>]*>Quem Somos<\/a>/;
        if (desktopRegex.test(content)) {
            const match = desktopRegex.exec(content);
            const hrefQuem = match[1];
            // Infer if we are in root or subpage by the href
            const hrefVideo = hrefQuem.includes('index.html') ? '../index.html#video-boas-vindas' : '#video-boas-vindas';
            
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

        // 3. Update Header Mobile Menu for Quem Somos
        // We look for `<a href="../index.html#quem-somos" style="border: none; padding: 0;">Quem Somos</a>`
        const mobileTargetRegex = /<a href="([^"]*#quem-somos)" style="border: none; padding: 0;"[^>]*>Quem Somos<\/a>/;
        if (mobileTargetRegex.test(content) && !content.includes('welcome_link')) {
            const match = mobileTargetRegex.exec(content);
            const hrefQuemMob = match[1];
            const hrefVideoMob = hrefQuemMob.includes('index.html') ? '../index.html#video-boas-vindas' : '#video-boas-vindas';
            
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

processHtml('seguros');
processHtml('internacional');
