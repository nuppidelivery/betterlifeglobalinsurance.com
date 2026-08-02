const fs = require('fs');
const path = require('path');
const root = __dirname;

const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

// 1. Global replacements (Seguro carro -> Seguro de carro, etc)
const allFiles = walkSync(root);
const exts = ['.html', '.js', '.json'];

allFiles.forEach(file => {
    if (!exts.some(ext => file.endsWith(ext))) return;
    if (file.includes('update_') || file.includes('surgical_fixes.cjs') || file.includes('apply_prompt.cjs')) return;

    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(/Seguro Carro/g, 'Seguro de Carro');
    content = content.replace(/Seguro carro/g, 'Seguro de carro');
    content = content.replace(/Seguro Casa/g, 'Seguro de Casa');
    content = content.replace(/Seguro casa/g, 'Seguro de casa');
    content = content.replace(/Seguro Empresarial/g, 'Seguros Empresariais');
    content = content.replace(/Soluções Internacionais/g, 'Soluções Internacionais');
    content = content.replace(/Solu[çc][õo][\xAA\xBA\x8E\uFFFD]+es Internacionais/g, 'Soluções Internacionais');
    content = content.replace(/Solu[çc][õo]es Internacionais/g, 'Soluções Internacionais');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file} (Global Text)`);
    }
});

// 2. Nova Copy Institucional in main.js and index.html
let mainJs = fs.readFileSync('main.js', 'utf8');
const newSubtitle = '"services_subtitle": "Oferecemos soluções estratégicas de proteção para famílias, profissionais e empresas da comunidade brasileira, com atendimento personalizado e foco naquilo que realmente importa: sua segurança e tranquilidade."';
// Regex that matches any existing services_subtitle line
mainJs = mainJs.replace(/"services_subtitle":\s*".*?"/, newSubtitle);
fs.writeFileSync('main.js', mainJs, 'utf8');

let indexHtml = fs.readFileSync('index.html', 'utf8');
const oldHtmlSubtitleRegex = /<p[^>]*data-i18n="services_subtitle">.*?<\/p>/;
const newHtmlSubtitle = '<p style="color:rgba(255,255,255,0.7);" data-i18n="services_subtitle">Oferecemos soluções estratégicas de proteção para famílias, profissionais e empresas da comunidade brasileira, com atendimento personalizado e foco naquilo que realmente importa: sua segurança e tranquilidade.</p>';
indexHtml = indexHtml.replace(oldHtmlSubtitleRegex, newHtmlSubtitle);


// 3. Seção de Vídeo (Priority) & 4. Reposicionamento
const videoStartToken = '<section id="video-boas-vindas"';
const videoEndToken = '</section>';

const videoSectionStart = indexHtml.indexOf(videoStartToken);
let videoSectionEndIndex = indexHtml.indexOf(videoEndToken, videoSectionStart);
if (videoSectionEndIndex !== -1) {
    videoSectionEndIndex += videoEndToken.length;
}

if (videoSectionStart !== -1 && videoSectionEndIndex !== -1) {
    let videoSection = indexHtml.substring(videoSectionStart, videoSectionEndIndex);
    
    // Remove the video section from current position
    indexHtml = indexHtml.substring(0, videoSectionStart) + indexHtml.substring(videoSectionEndIndex);
    
    // Transform the video wrapper
    const wrapperStart = videoSection.indexOf('<div class="video-wrapper"');
    const wrapperEndToken = '</div>\n        </div>';
    let wrapperEnd = videoSection.indexOf(wrapperEndToken, wrapperStart);
    if(wrapperEnd === -1) {
        // Fallback for slightly different indentation
        wrapperEnd = videoSection.indexOf('</div>\n      </div>', wrapperStart);
    }
    
    // Replace the entire wrapper with the video implementation
    const newWrapper = `
        <div class="video-wrapper" style="border: 2px solid var(--gold-primary); border-radius: 12px; overflow: hidden; display: flex; justify-content: center; aspect-ratio: 9/16; max-width: 400px; margin: 0 auto; background: #000; position: relative;">
          <video src="IMG_8164.MOV" controls playsinline preload="metadata" style="width: 100%; height: 100%; object-fit: cover;"></video>
        </div>`;
        
    // We will use regex to replace everything from <div class="video-wrapper" down to its closing </div>
    // Because regex dotall might be tricky in JS without s flag, we use [\s\S]
    videoSection = videoSection.replace(/<div class="video-wrapper"[\s\S]*?<\/div>\s*<\/div>/, newWrapper + '\n      </div>');

    // Insert right after Hero Section
    const heroEndToken = '</section>';
    const heroStart = indexHtml.indexOf('<section class="hero reveal"');
    const heroEnd = indexHtml.indexOf(heroEndToken, heroStart) + heroEndToken.length;
    
    indexHtml = indexHtml.substring(0, heroEnd) + '\n\n    <!-- 6. Seção de Vídeo Boas-Vindas (Reposicionada) -->\n    ' + videoSection + indexHtml.substring(heroEnd);
}

// 5. Seção "Quem Somos" Image and crop
indexHtml = indexHtml.replace(/src="about\.png"/g, 'src="EQUIPE_BL.png"');
indexHtml = indexHtml.replace(/aspect-ratio:\s*3\/4/g, 'aspect-ratio: 1/1');

fs.writeFileSync('index.html', indexHtml, 'utf8');

console.log('Update Complete!');
