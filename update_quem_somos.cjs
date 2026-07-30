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
        
        // 1. Update Image (only relevant for index.html but we can apply everywhere just in case)
        if (content.includes('src="EQUIPE_BL.png"')) {
            content = content.replace(/src="EQUIPE_BL\.png"/g, 'src="EQUIPE_BL_02.png"');
            changed = true;
        }

        // 2. Update Header Desktop Menu for Quem Somos
        // We look for: <a href="#quem-somos" class="nav-link" data-i18n="quem_somos_link">Quem Somos</a>
        // Or variations in subpages: <a href="../index.html#quem-somos" class="nav-link" data-i18n="quem_somos_link">Quem Somos</a>
        const desktopRegex = /<a href="([^"]*#quem-somos)" class="nav-link" data-i18n="quem_somos_link">Quem Somos<\/a>/;
        if (desktopRegex.test(content)) {
            const match = desktopRegex.exec(content);
            const hrefQuem = match[1];
            const hrefVideo = isRoot ? '#video-boas-vindas' : '../index.html#video-boas-vindas';
            
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
        // Look for:
        // <div style="width: 100%; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; text-align: center;">
        //      <span style="color: var(--gold-light); font-weight: 600; font-size: 0.9rem; text-transform: uppercase;" data-i18n="quem_somos_link">Quem Somos</span>
        //      <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
        //        <a href="#quem-somos" style="border: none; padding: 0;" data-i18n="quem_somos_link">Quem Somos</a>
        //      </div>
        //  </div>
        // Let's use a targeted replace for the inner anchor tag if it doesn't already have welcome_link
        const hrefQuemMob = isRoot ? '#quem-somos' : '../index.html#quem-somos';
        const hrefVideoMob = isRoot ? '#video-boas-vindas' : '../index.html#video-boas-vindas';
        
        const mobileTarget = `<a href="${hrefQuemMob}" style="border: none; padding: 0;" data-i18n="quem_somos_link">Quem Somos</a>`;
        if (content.includes(mobileTarget) && !content.includes('welcome_link')) {
            const newMobile = `${mobileTarget}\n                <a href="${hrefVideoMob}" style="border: none; padding: 0;" data-i18n="welcome_link">Bem-vindo</a>`;
            content = content.replace(mobileTarget, newMobile);
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated', filePath);
        }
    }
}

processHtml('.');
processHtml('seguros');
processHtml('internacional');

// Also update main.js translation keys
let mainJs = fs.readFileSync('main.js', 'utf8');
if (!mainJs.includes('welcome_link:')) {
    mainJs = mainJs.replace(/pt: {/, 'pt: {\n          welcome_link: "Bem-vindo",\n');
    mainJs = mainJs.replace(/en: {/, 'en: {\n          welcome_link: "Welcome",\n');
    fs.writeFileSync('main.js', mainJs, 'utf8');
    console.log('Updated main.js with welcome_link');
}
