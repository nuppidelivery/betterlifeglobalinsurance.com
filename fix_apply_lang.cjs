const fs = require('fs');

let mainjs = fs.readFileSync('main.js', 'utf8');

const applyLanguageOld = /function applyLanguage\(lang\) \{[\s\S]*?\}\s*if \(savedLang === 'en'\) \{/m;
const newApplyLanguage = `function applyLanguage(lang) {
      i18nElements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
          el.innerHTML = translations[lang][key];
        }
      });
    }
  
    if (savedLang === 'en') {`;

mainjs = mainjs.replace(applyLanguageOld, newApplyLanguage);

const eventListenerOld = /langCheckbox\.addEventListener\('change', \(e\) => \{[\s\S]*?\}\);/m;
const newEventListener = `langCheckbox.addEventListener('change', (e) => {
        const lang = e.target.checked ? 'en' : 'pt';
        localStorage.setItem('lang', lang);
        applyLanguage(lang);
      });`;

mainjs = mainjs.replace(eventListenerOld, newEventListener);

fs.writeFileSync('main.js', mainjs, 'utf8');
console.log('Fixed applyLanguage and event listener in main.js');
