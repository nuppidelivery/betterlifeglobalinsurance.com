const fs = require('fs');
let content = fs.readFileSync('main.js', 'utf8');

// Replace the extra `});`
const targetStr = `
if (langCheckbox) {
    langCheckbox.addEventListener('change', (e) => {
        const lang = e.target.checked ? 'en' : 'pt';
        localStorage.setItem('lang', lang);
        applyLanguage(lang);
      });
    });
  }
});`;
const replaceStr = `
if (langCheckbox) {
    langCheckbox.addEventListener('change', (e) => {
        const lang = e.target.checked ? 'en' : 'pt';
        localStorage.setItem('lang', lang);
        applyLanguage(lang);
    });
  }
});`;

// In case whitespace is different, let's use replace_file_content or a robust regex.
content = content.replace(/applyLanguage\(lang\);\s*\}\);\s*\}\);\s*\}/g, 'applyLanguage(lang);\n    });\n  }');

fs.writeFileSync('main.js', content, 'utf8');
console.log('Fixed extra listener closing');
