const fs = require('fs');
let content = fs.readFileSync('main.js', 'utf8');
content = content.replace(
    '"hero_subtitle": "Life, Health, Auto, Home, Business, and International Solutions...",',
    '"hero_subtitle": "Life, health, auto, home, business, and international solutions for the Brazilian community.",'
);
fs.writeFileSync('main.js', content);
console.log('Fixed EN hero_subtitle');
