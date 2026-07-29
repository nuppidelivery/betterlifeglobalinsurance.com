const fs = require('fs');
const path = require('path');
const root = __dirname;

let indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// 1. Restore Language Separator
if (!indexHtml.includes('<span style="color: rgba(255,255,255,0.4); z-index:1; font-weight: bold; font-size: 0.8rem;">|</span>')) {
    indexHtml = indexHtml.replace(
        /<span class="lang-en" style="display:flex; align-items:center; gap:6px; z-index:1;">/g,
        '<span style="color: rgba(255,255,255,0.4); z-index:1; font-weight: bold; font-size: 0.8rem;">|</span>\n                <span class="lang-en" style="display:flex; align-items:center; gap:6px; z-index:1;">'
    );
}

// 2. Library Titles
indexHtml = indexHtml.replace(/<h4 data-i18n="lib_1_title"[^>]*>.*?<\/h4>/, '<h4 data-i18n="lib_1_title" style="color:var(--navy-1); margin-top:1rem;">Seguro de Vida com Benefício em Vida (Living Benefits)</h4>');
indexHtml = indexHtml.replace(/<h4 data-i18n="lib_2_title"[^>]*>.*?<\/h4>/, '<h4 data-i18n="lib_2_title" style="color:var(--navy-1); margin-top:1rem;">Opções de Seguro Saúde nos Estados Unidos</h4>');
indexHtml = indexHtml.replace(/<h4 data-i18n="lib_3_title"[^>]*>.*?<\/h4>/, '<h4 data-i18n="lib_3_title" style="color:var(--navy-1); margin-top:1rem;">O que é o General Liability Insurance?</h4>');

// 3. Video Overlay
// We know there's a mojibake for border-radius:50%. So let's match with a more relaxed regex or by index.
const videoSectionStart = indexHtml.indexOf('<section id="video-boas-vindas"');
if (videoSectionStart !== -1) {
    const videoWrapperStart = indexHtml.indexOf('<div class="video-wrapper"', videoSectionStart);
    const videoWrapperEnd = indexHtml.indexOf('</div>\n      </div>\n    </div>\n  </section>', videoWrapperStart);
    
    if (videoWrapperStart !== -1 && videoWrapperEnd !== -1) {
        const replacement = `<div class="video-wrapper" style="border: 2px solid var(--gold-primary); position: relative;">
        <div class="video-placeholder" style="filter: blur(4px) grayscale(50%); pointer-events: none;">
          <i class="ph-light ph-play-circle text-gradient-gold" style="animation: pulseGlow 2s infinite; border-radius:50%;"></i>
          <span data-i18n="video_placeholder_text">O seu vídeo será adicionado aqui</span>
        </div>
        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(1, 23, 55, 0.4); z-index: 10;">
             <span style="background: rgba(1, 23, 55, 0.9); border: 2px solid var(--gold-primary); color: var(--white); padding: 1rem 2.5rem; font-size: clamp(1rem, 2.5vw, 1.5rem); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; border-radius: 50px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">Disponível em breve</span>
        </div>`;
        indexHtml = indexHtml.substring(0, videoWrapperStart) + replacement + indexHtml.substring(videoWrapperEnd);
    }
}

fs.writeFileSync(path.join(root, 'index.html'), indexHtml, 'utf8');
console.log('index.html restored and updated properly.');
