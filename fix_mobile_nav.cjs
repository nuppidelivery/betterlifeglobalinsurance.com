const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const mobileTargetRegex = /<a href="#quem-somos" style="border: none; padding: 0;" data-i18n="quem_somos_link">Quem Somos<\/a>/;

if (mobileTargetRegex.test(content) && !content.includes('data-i18n="welcome_link"')) {
    content = content.replace(
        mobileTargetRegex,
        '<a href="#quem-somos" style="border: none; padding: 0;" data-i18n="quem_somos_link">Quem Somos</a>\n                <a href="#video-boas-vindas" style="border: none; padding: 0;" data-i18n="welcome_link">Bem-vindo</a>'
    );
    fs.writeFileSync('index.html', content, 'utf8');
    console.log('Fixed mobile menu in index.html');
} else {
    console.log('Mobile menu not found or already fixed');
}
