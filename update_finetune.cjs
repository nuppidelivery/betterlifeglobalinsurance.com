const fs = require('fs');
const path = require('path');
const root = __dirname;

// Task 1: Language Button Spacing
let stylePath = path.join(root, 'style.css');
let style = fs.readFileSync(stylePath, 'utf8');

// The width is 110px. Let's make it 118px.
style = style.replace(/width: 110px; height: 36px;/, 'width: 124px; height: 36px;');
// Slider width was 52px. Make it 56px.
style = style.replace(/width: 52px; left: 4px; bottom: 3px;/, 'width: 58px; left: 4px; bottom: 3px;');
// translateX was 50px. Make it 58px.
style = style.replace(/transform: translateX\(50px\);/, 'transform: translateX(58px);');
// Add slightly more padding to the label
style = style.replace(/padding: 0 8px; font-size: 0\.7rem;/, 'padding: 0 10px; font-size: 0.7rem;');

fs.writeFileSync(stylePath, style, 'utf8');
console.log('Task 1 completed.');

// Task 2: Library Titles
let mainJsPath = path.join(root, 'main.js');
let mainJs = fs.readFileSync(mainJsPath, 'utf8');

mainJs = mainJs.replace(/lib_1_title: ".*?",/g, 'lib_1_title: "Seguro de Vida com Benefício em Vida (Living Benefits)",');
mainJs = mainJs.replace(/lib_2_title: ".*?",/g, 'lib_2_title: "Opções de Seguro Saúde nos Estados Unidos",');
mainJs = mainJs.replace(/lib_3_title: ".*?",/g, 'lib_3_title: "O que é o General Liability Insurance?",');

fs.writeFileSync(mainJsPath, mainJs, 'utf8');

let indexPath = path.join(root, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

indexHtml = indexHtml.replace(/<h4 data-i18n="lib_1_title"[^>]*>.*?<\/h4>/, '<h4 data-i18n="lib_1_title" style="color:var(--navy-1); margin-top:1rem;">Seguro de Vida com Benefício em Vida (Living Benefits)</h4>');
indexHtml = indexHtml.replace(/<h4 data-i18n="lib_2_title"[^>]*>.*?<\/h4>/, '<h4 data-i18n="lib_2_title" style="color:var(--navy-1); margin-top:1rem;">Opções de Seguro Saúde nos Estados Unidos</h4>');
indexHtml = indexHtml.replace(/<h4 data-i18n="lib_3_title"[^>]*>.*?<\/h4>/, '<h4 data-i18n="lib_3_title" style="color:var(--navy-1); margin-top:1rem;">O que é o General Liability Insurance?</h4>');

console.log('Task 2 completed.');

// Task 3: Video Section Overlay
const videoSearchString = `<div class="video-wrapper" style="border: 2px solid var(--gold-primary);">
          <div class="video-placeholder">`;

const videoReplacementString = `<div class="video-wrapper" style="border: 2px solid var(--gold-primary); position: relative;">
          <div class="video-placeholder" style="filter: blur(4px) grayscale(50%); pointer-events: none;">
            <i class="ph-light ph-play-circle text-gradient-gold" style="animation: pulseGlow 2s infinite; border-radius:50%;"></i>
            <span data-i18n="video_placeholder_text">O seu vídeo será adicionado aqui</span>
          </div>
          <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(1, 23, 55, 0.4); z-index: 10;">
             <span style="background: rgba(1, 23, 55, 0.9); border: 2px solid var(--gold-primary); color: var(--white); padding: 1rem 2.5rem; font-size: clamp(1rem, 2.5vw, 1.5rem); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; border-radius: 50px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">Disponível em breve</span>
          </div>
        </div><!--`;

// Simple index-based replacement to avoid regex issues with spaces/newlines
const startIdx = indexHtml.indexOf(videoSearchString);
if (startIdx !== -1) {
    const endIdx = indexHtml.indexOf('</div>\n        </div>', startIdx) + '</div>\n        </div>'.length;
    indexHtml = indexHtml.substring(0, startIdx) + videoReplacementString + indexHtml.substring(endIdx);
    console.log('Task 3 completed.');
} else {
    console.log('Could not find video wrapper.');
}

fs.writeFileSync(indexPath, indexHtml, 'utf8');

