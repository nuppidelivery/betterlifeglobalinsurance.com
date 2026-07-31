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

        // 1. ADD POSTER TO VIDEO
        // Look for: <video controls playsinline preload="metadata" style="width: 100%; height: 100%; object-fit: cover;">
        // Or similar variations
        const videoRegex = /<video\s+([^>]*)>/g;
        content = content.replace(videoRegex, (match, attrs) => {
            if (!attrs.includes('poster=')) {
                changed = true;
                return `<video ${attrs} poster="${prefix}CAPA_VIDEO.png">`;
            }
            return match;
        });

        // 2. FOOTER DESKTOP VS MOBILE
        // For each of the three footer dropdowns, we add `desktop-footer-dropdown` class
        // and append the `mobile-footer-link` right before it.
        // E.g., Seguros Pessoais:
        if (content.includes('<div class="nav-dropdown" style="display: block;">')) {
            content = content.replace(
                /<div class="nav-dropdown" style="display: block;">\s*<div class="dropdown-toggle" style="color: var\(--white\); font-weight: 600; font-size: 1rem;"><span data-i18n="srv_p_title">Seguros Pessoais<\/span> <i class="ph-bold ph-caret-down"><\/i><\/div>/g,
                `<a href="${prefix}index.html#solucoes" class="mobile-footer-link" data-i18n="srv_p_title">Seguros Pessoais</a>\n              <div class="nav-dropdown desktop-footer-dropdown" style="display: block;">\n                <div class="dropdown-toggle" style="color: var(--white); font-weight: 600; font-size: 1rem;"><span data-i18n="srv_p_title">Seguros Pessoais</span> <i class="ph-bold ph-caret-down"></i></div>`
            );
            changed = true;
        }
        
        if (content.includes('<span data-i18n="srv_e_title">Seguros Empresariais</span>')) {
            content = content.replace(
                /<div class="nav-dropdown" style="display: block;">\s*<div class="dropdown-toggle" style="color: var\(--white\); font-weight: 600; font-size: 1rem;"><span data-i18n="srv_e_title">Seguros Empresariais<\/span> <i class="ph-bold ph-caret-down"><\/i><\/div>/g,
                `<a href="${prefix}index.html#solucoes" class="mobile-footer-link" data-i18n="srv_e_title">Seguros Empresariais</a>\n              <div class="nav-dropdown desktop-footer-dropdown" style="display: block;">\n                <div class="dropdown-toggle" style="color: var(--white); font-weight: 600; font-size: 1rem;"><span data-i18n="srv_e_title">Seguros Empresariais</span> <i class="ph-bold ph-caret-down"></i></div>`
            );
            changed = true;
        }

        if (content.includes('<span data-i18n="srv_i_title">Soluções Internacionais</span>')) {
            content = content.replace(
                /<div class="nav-dropdown" style="display: block;">\s*<div class="dropdown-toggle" style="color: var\(--white\); font-weight: 600; font-size: 1rem;"><span data-i18n="srv_i_title">Soluções Internacionais<\/span> <i class="ph-bold ph-caret-down"><\/i><\/div>/g,
                `<a href="${prefix}index.html#solucoes-internacionais" class="mobile-footer-link" data-i18n="srv_i_title">Soluções Internacionais</a>\n              <div class="nav-dropdown desktop-footer-dropdown" style="display: block;">\n                <div class="dropdown-toggle" style="color: var(--white); font-weight: 600; font-size: 1rem;"><span data-i18n="srv_i_title">Soluções Internacionais</span> <i class="ph-bold ph-caret-down"></i></div>`
            );
            changed = true;
        }

        // Just in case we didn't catch the exact regex for some reason due to spaces, let's fix any remaining <div class="nav-dropdown" style="display: block;"> that was already matched.
        // Note: The above regex only replaces if the toggle is right next to it. 

        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated', filePath);
        }
    }
}

processHtml('.');
processHtml('seguros');
processHtml('internacional');
