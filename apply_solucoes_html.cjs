const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix nav dropdown toggle
html = html.replace(/<span data-i18n="srv_i_title">[^<]+<\/span>/g, '<span data-i18n="srv_i_title">Soluções Internacionais</span>');

// Fix mobile nav toggle
html = html.replace(/<a href="#solucoes-internacionais" data-i18n="srv_i_title"[^>]*>[^<]+<\/a>/g, '<a href="#solucoes-internacionais" data-i18n="srv_i_title">Soluções Internacionais</a>');

// Fix services section title
html = html.replace(/<h3 id="solucoes-internacionais" data-i18n="srv_i_title"[^>]*>[^<]+<\/h3>/g, '<h3 id="solucoes-internacionais" data-i18n="srv_i_title" style="color:var(--white); margin: 3rem 0 1.5rem; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">Soluções Internacionais</h3>');

// Fix FAQ category
html = html.replace(/<h4 class="faq-category-title text-gradient-gold" id="faq-solucoes-internacionais"[^>]*>[^<]*<i class="ph-bold ph-globe"><\/i>[^<]+<\/h4>/g, '<h4 class="faq-category-title text-gradient-gold" id="faq-solucoes-internacionais" style="margin-top: 3rem; margin-bottom: 2rem; display: flex; align-items: center; justify-content: center; gap: 0.8rem; text-transform: uppercase; font-size: 1.8rem; letter-spacing: 1px; text-align: center; border-bottom: 2px solid var(--gold-dark); padding-bottom: 1rem; width: fit-content; margin-left: auto; margin-right: auto;"><i class="ph-bold ph-globe"></i> Soluções Internacionais</h4>');

// Fix footer category title (the one missing data-i18n)
html = html.replace(/<li style="color: var\(--white\); font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">[^<]+<\/li>/g, '<li style="color: var(--white); font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">Soluções Internacionais</li>');

// Fix the FAQ links in menu items to Soluções Internacionais
html = html.replace(/<a href="#faq-solucoes-internacionais" data-i18n="nav_faq_8"[^>]*>[^<]+<\/a>/g, '<a href="#faq-solucoes-internacionais" data-i18n="nav_faq_8" style="border: none; padding: 0;">Soluções Internacionais</a>');

// Wait, the dropdown has <a href="#faq-solucoes-internacionais" data-i18n="nav_faq_8">...</a> without style. 
// So the previous line replaced BOTH and added the style to both. That's fine or maybe bad for the dropdown?
// Let's do it precisely:
// Re-read html to undo if needed:
// Actually, let's just do a string replacement for the exact tags.
html = html.replace(/<a href="#faq-solucoes-internacionais" data-i18n="nav_faq_8" style="border: none; padding: 0;">[^<]+<\/a>/g, 'TEMPORARY_FAQ_8');
html = html.replace(/<a href="#faq-solucoes-internacionais" data-i18n="nav_faq_8">[^<]+<\/a>/g, '<a href="#faq-solucoes-internacionais" data-i18n="nav_faq_8">Soluções Internacionais</a>');
html = html.replace(/TEMPORARY_FAQ_8/g, '<a href="#faq-solucoes-internacionais" data-i18n="nav_faq_8" style="border: none; padding: 0;">Soluções Internacionais</a>');

// Also check <option> in select for opt_internacional
html = html.replace(/<option value="internacional" data-i18n="opt_internacional">[^<]+<\/option>/g, '<option value="internacional" data-i18n="opt_internacional">Soluções Internacionais</option>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed index.html properly');
