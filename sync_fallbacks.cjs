const fs = require('fs');

// Read main.js and extract the translations object
const mainJs = fs.readFileSync('main.js', 'utf8');

// We can evaluate the translations object by extracting it.
// It's defined as: const translations = { pt: { ... }, en: { ... } };
const match = mainJs.match(/const translations = (\{[\s\S]*?\});/);
if (!match) {
  console.error("Could not find translations in main.js");
  process.exit(1);
}

let translations;
try {
  // It's not strict JSON, it's a JS object literal.
  // We can evaluate it safely since we wrote it.
  translations = eval('(' + match[1] + ')');
} catch (e) {
  console.error("Failed to eval translations:", e);
  process.exit(1);
}

const pt = translations.pt;

let html = fs.readFileSync('index.html', 'utf8');

// Replace innerHTML of tags with data-i18n="key"
for (const [key, text] of Object.entries(pt)) {
  // Regex to match <tag ... data-i18n="key" ...>...</tag>
  // Note: this handles self-closing or multi-line tags if we are careful, but let's just do a simple replacement for contents
  const regex = new RegExp(`(<[^>]*?data-i18n="${key}"[^>]*>)[\\s\\S]*?(</(?:span|h1|h2|h3|h4|h5|p|a|button|option|div|li)>)`, 'g');
  
  html = html.replace(regex, (m, p1, p2) => {
    return p1 + text + p2;
  });
}

// Special case for hero title because it has a complex tag
const heroTitleRegex = /(<h1[^>]*data-i18n="hero_title"[^>]*>)[\s\S]*?(<\/h1>)/;
html = html.replace(heroTitleRegex, `$1${pt.hero_title}$2`);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Updated index.html fallbacks successfully!");
