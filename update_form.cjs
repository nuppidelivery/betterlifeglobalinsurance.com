const fs = require('fs');
const path = require('path');

const mainJsPath = path.join(__dirname, 'main.js');
let mainJs = fs.readFileSync(mainJsPath, 'utf8');

// Replace the contactForm event listener logic
const formRegex = /const contactForm = document\.getElementById\('contactForm'\);\s*if \(contactForm\) \{\s*contactForm\.addEventListener\('submit', \(e\) => \{\s*e\.preventDefault\(\);[\s\S]*?contactForm\.reset\(\);\s*\}\);\s*\}/;

const newFormLogic = `const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const interestEl = document.getElementById('interest');
      const interestText = interestEl.options[interestEl.selectedIndex].text;
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      
      let message = \`Olá! Gostaria de solicitar uma cotação para \${interestText}.\\n\\n\`;
      if (name) message += \`Nome: \${name}\\n\`;
      if (phone) message += \`Telefone: \${phone}\\n\`;
      if (email) message += \`E-mail: \${email}\\n\`;
      
      const encodedMessage = encodeURIComponent(message);
      window.open(\`https://wa.me/16892980422?text=\${encodedMessage}\`, '_blank');
      
      contactForm.reset();
    });
  }`;

if (formRegex.test(mainJs)) {
    mainJs = mainJs.replace(formRegex, newFormLogic);
    fs.writeFileSync(mainJsPath, mainJs, 'utf8');
    console.log('main.js updated with WhatsApp form logic.');
} else {
    console.log('Regex did not match main.js form logic.');
}
