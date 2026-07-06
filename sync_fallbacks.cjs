const fs = require('fs');

const mainJs = fs.readFileSync('main.js', 'utf8');
const match = mainJs.match(/const translations = (\{[\s\S]*?\});/);
if (!match) process.exit(1);

const translations = eval('(' + match[1] + ')');
const pt = translations.pt;
let html = fs.readFileSync('index.html', 'utf8');

for (const [key, text] of Object.entries(pt)) {
  // Regex strictly matches the opening tag, lazy matches the content, and strictly matches the EXACT SAME closing tag
  const regex = new RegExp(`(<([a-zA-Z0-9]+)[^>]*?data-i18n="${key}"[^>]*>)[\\s\\S]*?(</\\2>)`, 'g');
  html = html.replace(regex, (m, p1, p2, p3) => {
    return p1 + text + p3;
  });
}

const heroTitleRegex = /(<h1[^>]*data-i18n="hero_title"[^>]*>)[\s\S]*?(<\/h1>)/;
html = html.replace(heroTitleRegex, `$1${pt.hero_title}$2`);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Updated fallbacks safely!");
