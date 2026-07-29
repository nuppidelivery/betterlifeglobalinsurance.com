const fs = require('fs');
const path = require('path');
const root = __dirname;

let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// Task 5: Seção Uma Mensagem Para Você
const videoOriginal = /<div class="video-wrapper" style="border: 2px solid var\(--gold-primary\);">\s*<div class="video-placeholder">\s*<i class="ph-light ph-play-circle text-gradient-gold" style="animation: pulseGlow 2s infinite; border-radius:50%;">.*?<\/i>\s*<span data-i18n="video_placeholder_text">.*?<\/span>\s*<\/div>\s*<\/div>/;

const videoReplacement = `<div class="video-wrapper" style="border: 2px solid var(--gold-primary); position: relative;">
        <div class="video-placeholder" style="filter: blur(3px) grayscale(40%);">
          <i class="ph-light ph-play-circle text-gradient-gold" style="animation: pulseGlow 2s infinite; border-radius:50%;"></i>
          <span data-i18n="video_placeholder_text">O seu vídeo será adicionado aqui</span>
        </div>
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; background: rgba(1, 23, 55, 0.65); border-radius: 12px; z-index: 2;">
            <h3 style="color: var(--white); margin: 0; font-size: clamp(1.2rem, 3vw, 1.8rem); text-transform: uppercase; letter-spacing: 2px; padding: 1rem 2rem; border: 1px solid var(--gold-primary); border-radius: 50px; background: rgba(1,23,55,0.95); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">Disponível em breve</h3>
        </div>
      </div>`;

html = html.replace(videoOriginal, videoReplacement);
fs.writeFileSync(path.join(root, 'index.html'), html, 'utf8');

// Task 2: Seção Quem Somos (Visual Refinement)
// We will update style.css for `.two-col-layout`
let style = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
// Original: .two-col-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 4rem; align-items: center; }
// New: grid-template-columns: 0.9fr 1.1fr; gap: 5rem; align-items: stretch; (or keep center but tweak proportions).
// Actually, align-items: center is good, but let's change ratio to 1fr 1.1fr and gap 5rem.
style = style.replace(/\.two-col-layout \{ display: grid; grid-template-columns: 1fr 1\.2fr; gap: 4rem; align-items: center; \}/, '.two-col-layout { display: grid; grid-template-columns: 0.95fr 1.2fr; gap: 5rem; align-items: center; }');

// We also change the image slightly if needed:
// current html has: aspect-ratio: 3/4; object-fit: cover; width: 100%;
// We can just keep it. 0.95fr makes it slightly narrower so it doesn't look overwhelming.

fs.writeFileSync(path.join(root, 'style.css'), style, 'utf8');

console.log('Task 2 and 5 updated.');
