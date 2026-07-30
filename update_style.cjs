const fs = require('fs');
let style = fs.readFileSync('style.css', 'utf8');

const addition = `
  /* 2. Botão Idiomas Mobile */
  .lang-toggle-container {
    transform: scale(0.9);
    margin: 0.5rem 1rem;
  }

  /* 4. Quem Somos Mobile Order */
  #quem-somos .two-col-layout {
    display: flex;
    flex-direction: column;
  }
  #quem-somos .text-col {
    display: contents;
  }
  #quem-somos .eyebrow { order: 1; text-align: center; margin-left: auto; margin-right: auto; }
  #quem-somos h2 { order: 2; text-align: center; margin-bottom: 2rem; }
  #quem-somos .about-image-wrapper { order: 3; margin: 1rem 0 2rem 0; width: 100%; display: flex; justify-content: center; }
  #quem-somos p { order: 4; text-align: center; }
  #quem-somos .list-col-small { order: 5; margin-top: 1rem; }
  #quem-somos .btn { order: 6; margin-left: auto; margin-right: auto; margin-top: 1rem; }
`;

const newStyle = style + '\n@media (max-width: 992px) {\n' + addition + '\n}\n';

fs.writeFileSync('style.css', newStyle, 'utf8');
console.log('style.css updated with mobile adjustments');
