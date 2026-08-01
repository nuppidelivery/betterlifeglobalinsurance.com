const fs = require('fs');

let mainjs = fs.readFileSync('main.js', 'utf8');

const applyLanguageOld = /function applyLanguage\(lang\) \{[\s\S]*?\}\s*if \(savedLang === 'en'\) \{/m;
const newApplyLanguage = `function applyLanguage(lang) {
      i18nElements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
          if (el.tagName === 'META') {
              el.setAttribute('content', translations[lang][key]);
          } else {
              el.innerHTML = translations[lang][key];
          }
        }
      });
      // Also update placeholders for inputs/textareas
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.setAttribute('placeholder', translations[lang][key]);
        }
      });
    }
  
    if (savedLang === 'en') {`;

mainjs = mainjs.replace(applyLanguageOld, newApplyLanguage);

fs.writeFileSync('main.js', mainjs, 'utf8');
console.log('Fixed applyLanguage to handle META content and placeholders');
