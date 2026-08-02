const fs = require('fs');
let content = fs.readFileSync('main.js', 'utf8');
content = content.replace(/faq_title:\s*"PERGUNTAS FREQUENTES",/, 'eyebrow_faq: "Tire suas dúvidas",\n        faq_title: "PERGUNTAS FREQUENTES",');
content = content.replace(/faq_title:\s*"FREQUENTLY ASKED QUESTIONS",/, 'eyebrow_faq: "Clear your doubts",\n        faq_title: "FREQUENTLY ASKED QUESTIONS",');
fs.writeFileSync('main.js', content, 'utf8');
