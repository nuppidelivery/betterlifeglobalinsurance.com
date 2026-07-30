const fs = require('fs');
let mainJs = fs.readFileSync('main.js', 'utf8');

mainJs = mainJs.replace(/nav_faq_8: "Soluções Internacionais",/g, 'nav_faq_8: "Soluções Internacionais",\n        news_title: "Notícias e Conteúdos",');
mainJs = mainJs.replace(/nav_faq_8: "International Solutions",/g, 'nav_faq_8: "International Solutions",\n        news_title: "News & Insights",');

fs.writeFileSync('main.js', mainJs, 'utf8');
console.log('main.js updated with news_title translation');
