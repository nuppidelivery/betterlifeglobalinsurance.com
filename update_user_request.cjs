const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/<span class="eyebrow text-gradient-gold" data-i18n="eyebrow_faq">Tire suas d[úu]vidas<\/span>\s*<h2 data-i18n="faq_title">PERGUNTAS FREQUENTES<\/h2>/, '<h2 class="text-gradient-gold" data-i18n="faq_title">PERGUNTAS FREQUENTES</h2>');

// Also removing eyebrow_faq in main.js to be safe.
// badge_secure to "Você vive." and badge_expert to "Nós resolvemos!"
let mainJs = fs.readFileSync('main.js', 'utf8');
mainJs = mainJs.replace(/badge_secure:\s*"Proteção Total"/g, 'badge_secure: "Você vive."');
mainJs = mainJs.replace(/badge_expert:\s*"Consultoria VIP"/g, 'badge_expert: "Nós resolvemos!"');

// For English:
mainJs = mainJs.replace(/badge_secure:\s*"Total Protection"/g, 'badge_secure: "You live."');
mainJs = mainJs.replace(/badge_expert:\s*"VIP Consulting"/g, 'badge_expert: "We handle it!"');

fs.writeFileSync('index.html', indexHtml, 'utf8');
fs.writeFileSync('main.js', mainJs, 'utf8');

console.log('Update applied');
