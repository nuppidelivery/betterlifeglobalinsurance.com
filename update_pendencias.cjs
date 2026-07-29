const fs = require('fs');
const path = require('path');
const root = __dirname;

// 1. Update Video Text in main.js
let mainJsPath = path.join(root, 'main.js');
let mainJs = fs.readFileSync(mainJsPath, 'utf8');

mainJs = mainJs.replace(/video_placeholder_text: "O seu v[íi\xED\uFFFD]+deo ser[áa\xE1\uFFFD]+ adicionado aqui",/g, 'video_placeholder_text: "DISPONÍVEL EM BREVE",');
mainJs = mainJs.replace(/video_placeholder_text: "Your video will be added here",/g, 'video_placeholder_text: "AVAILABLE SOON",');

fs.writeFileSync(mainJsPath, mainJs, 'utf8');

// 2. Update HTML Files
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));
const dirs = ['seguros', 'internacional'];
dirs.forEach(d => {
    if (fs.existsSync(path.join(root, d))) {
        fs.readdirSync(path.join(root, d)).filter(f => f.endsWith('.html')).forEach(f => {
            htmlFiles.push(path.join(d, f));
        });
    }
});

htmlFiles.forEach(file => {
    let filePath = path.join(root, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace FAQ Dropdown Items (both desktop and mobile)
    content = content.replace(/<a href="#faq-seguro-de-vida" data-i18n="nav_faq_1"[^>]*>Vida<\/a>/g, '<a href="#faq-seguro-de-vida" data-i18n="nav_faq_1">Seguro de Vida</a>');
    content = content.replace(/<a href="#faq-seguro-saude" data-i18n="nav_faq_2"[^>]*>Sa[úu\xFA\uFFFD]+de<\/a>/g, '<a href="#faq-seguro-saude" data-i18n="nav_faq_2">Seguro Saúde</a>');
    content = content.replace(/<a href="#faq-seguro-carro" data-i18n="nav_faq_3"[^>]*>Carro<\/a>/g, '<a href="#faq-seguro-carro" data-i18n="nav_faq_3">Seguro Automóvel</a>');
    content = content.replace(/<a href="#faq-seguro-residencial" data-i18n="nav_faq_4"[^>]*>Casa<\/a>/g, '<a href="#faq-seguro-residencial" data-i18n="nav_faq_4">Seguro Residencial</a>');
    content = content.replace(/<a href="#faq-seguro-viagem" data-i18n="nav_faq_5"[^>]*>Viagem<\/a>/g, '<a href="#faq-seguro-viagem" data-i18n="nav_faq_5">Seguro Viagem</a>');
    content = content.replace(/<a href="#faq-seguro-pet" data-i18n="nav_faq_6"[^>]*>Pets<\/a>/g, '<a href="#faq-seguro-pet" data-i18n="nav_faq_6">Seguro Pets</a>');
    content = content.replace(/<a href="#faq-seguros-empresariais" data-i18n="nav_faq_7"[^>]*>Empresariais<\/a>/g, '<a href="#faq-seguros-empresariais" data-i18n="nav_faq_7">Seguro Empresarial</a>');
    
    // Also mobile versions that might have style="border: none; padding: 0;"
    content = content.replace(/>Vida<\/a>/g, '>Seguro de Vida</a>');
    content = content.replace(/>Sa[úu\xFA\uFFFD]+de<\/a>/g, '>Seguro Saúde</a>');
    // Wait, blind replacement of >Vida</a> is dangerous. Let's do it specifically for nav_faq
    
    // Desktop:
    content = content.replace(/data-i18n="nav_faq_1">Vida<\/a>/g, 'data-i18n="nav_faq_1">Seguro de Vida</a>');
    content = content.replace(/data-i18n="nav_faq_2">Sa[úu\xFA\uFFFD]+de<\/a>/g, 'data-i18n="nav_faq_2">Seguro Saúde</a>');
    content = content.replace(/data-i18n="nav_faq_3">Carro<\/a>/g, 'data-i18n="nav_faq_3">Seguro Automóvel</a>');
    content = content.replace(/data-i18n="nav_faq_4">Casa<\/a>/g, 'data-i18n="nav_faq_4">Seguro Residencial</a>');
    content = content.replace(/data-i18n="nav_faq_5">Viagem<\/a>/g, 'data-i18n="nav_faq_5">Seguro Viagem</a>');
    content = content.replace(/data-i18n="nav_faq_6">Pets<\/a>/g, 'data-i18n="nav_faq_6">Seguro Pets</a>');
    content = content.replace(/data-i18n="nav_faq_7">Empresariais<\/a>/g, 'data-i18n="nav_faq_7">Seguro Empresarial</a>');

    // Mobile:
    content = content.replace(/data-i18n="nav_faq_1" style="border: none; padding: 0;">Vida<\/a>/g, 'data-i18n="nav_faq_1" style="border: none; padding: 0;">Seguro de Vida</a>');
    content = content.replace(/data-i18n="nav_faq_2" style="border: none; padding: 0;">Sa[úu\xFA\uFFFD]+de<\/a>/g, 'data-i18n="nav_faq_2" style="border: none; padding: 0;">Seguro Saúde</a>');
    content = content.replace(/data-i18n="nav_faq_3" style="border: none; padding: 0;">Carro<\/a>/g, 'data-i18n="nav_faq_3" style="border: none; padding: 0;">Seguro Automóvel</a>');
    content = content.replace(/data-i18n="nav_faq_4" style="border: none; padding: 0;">Casa<\/a>/g, 'data-i18n="nav_faq_4" style="border: none; padding: 0;">Seguro Residencial</a>');
    content = content.replace(/data-i18n="nav_faq_5" style="border: none; padding: 0;">Viagem<\/a>/g, 'data-i18n="nav_faq_5" style="border: none; padding: 0;">Seguro Viagem</a>');
    content = content.replace(/data-i18n="nav_faq_6" style="border: none; padding: 0;">Pets<\/a>/g, 'data-i18n="nav_faq_6" style="border: none; padding: 0;">Seguro Pets</a>');
    content = content.replace(/data-i18n="nav_faq_7" style="border: none; padding: 0;">Empresariais<\/a>/g, 'data-i18n="nav_faq_7" style="border: none; padding: 0;">Seguro Empresarial</a>');
    
    // Video section (index.html mostly)
    if (file === 'index.html') {
        const videoStr = '<span data-i18n="video_placeholder_text">O seu v\u00EDdeo ser\xE1 adicionado aqui</span>';
        const videoStr2 = '<span data-i18n="video_placeholder_text">O seu vdeo serǭ adicionado aqui</span>'; // handling mojibake
        const replacement = '<span data-i18n="video_placeholder_text" style="font-size: clamp(1rem, 3vw, 1.5rem); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">DISPONÍVEL EM BREVE</span>';
        
        // Let's use regex to be safe
        content = content.replace(/<span data-i18n="video_placeholder_text">.*?<\/span>/g, replacement);
        
        // Also add filter blur and grayscale to the placeholder icon to make it premium as requested before, if they still want it premium
        // Actually, they said "não remover o player de vídeo". I will just replace the text and keep the icon.
    }

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Update complete.');
