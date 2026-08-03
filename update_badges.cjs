const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/<span data-i18n="badge_secure">Proteção Total<\/span>/, '<span data-i18n="badge_secure">Você vive.</span>');
indexHtml = indexHtml.replace(/<span data-i18n="badge_expert">Consultoria VIP<\/span>/, '<span data-i18n="badge_expert">Nós resolvemos!</span>');
fs.writeFileSync('index.html', indexHtml, 'utf8');

let mainJs = fs.readFileSync('main.js', 'utf8');
// For PT:
mainJs = mainJs.replace(/badge_secure:\s*"Proteção Total"/g, 'badge_secure: "Você vive."');
mainJs = mainJs.replace(/badge_expert:\s*"Consultoria VIP"/g, 'badge_expert: "Nós resolvemos!"');

// For EN:
mainJs = mainJs.replace(/badge_secure:\s*"Total Protection"/g, 'badge_secure: "You live."');
mainJs = mainJs.replace(/badge_expert:\s*"VIP Consulting"/g, 'badge_expert: "We handle it!"');
fs.writeFileSync('main.js', mainJs, 'utf8');

console.log('Update applied properly via script.');
