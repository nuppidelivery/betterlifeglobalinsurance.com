const fs = require('fs');

// --- UPDATE MAIN.JS ---
let mainJs = fs.readFileSync('main.js', 'utf8');

const ptTranslations = `
      nav_services: "Seguros",
      nav_about: "Quem Somos",
      nav_diff: "Por Que a BLGI?",
      nav_video: "Bem-vindo",
      nav_lib: "Biblioteca",
      nav_faq: "FAQ",
      nav_cta: "FALE CONOSCO",
      
      hero_eyebrow: "One Agency. Every Protection.",
      hero_title: "Toda proteÃ§Ã£o que sua famÃ­lia precisa",
      hero_subtitle: "Seguro de Vida, SaÃºde, Carro, Casa, NegÃ³cios e SoluÃ§Ãµes Internacionais para a comunidade brasileira.",
      hero_cta_1: "Solicitar CotaÃ§Ã£o",
      hero_cta_2: "Falar no WhatsApp",
      
      badge_secure: "ProteÃ§Ã£o Total",
      badge_expert: "Consultoria VIP",
      
      hero_help: "COMO PODEMOS TE AJUDAR?",
      quick_saude: "SAÃšDE",
      quick_vida: "VIDA",
      quick_carro: "AUTO",
      quick_casa: "RESIDÃŠNCIA",
      quick_empresa: "EMPRESAS",
      quick_inter: "INTERNACIONAL",
      
      auth_fam: "FamÃ­lias Protegidas",
      auth_years: "Anos de Mercado",
      auth_states: "Estados Atendidos",
      auth_lang: "Atendimento em PortuguÃªs",
      
      eyebrow_import: "VisÃ£o de Futuro",
      import_title: "ESTAMOS AO SEU LADO",
      import_desc_1: "Quando nasce um filho. Quando compra uma casa. Quando abre uma empresa. Quando cresce o patrimÃ´nio. VocÃª vive sua vida. NÃ³s cuidamos da sua proteÃ§Ã£o.",
      btn_schedule: "Agendar DiagnÃ³stico Gratuito",
      
      eyebrow_comp: "O PreÃ§o da Escolha",
      comp_title: "O que acontece nos momentos crÃ­ticos?",
      comp_bad_title: "O Caminho Desprotegido",
      comp_bad_1: "Contas mÃ©dicas astronÃ´micas em caso de emergÃªncia (falÃªncia pessoal).",
      comp_bad_2: "Riscos de processos judiciais esgotarem os bens da sua empresa ou famÃ­lia.",
      comp_bad_3: "Dificuldade na resoluÃ§Ã£o de problemas diretos com a seguradora.",
      comp_bad_4: "Barreira linguÃ­stica e letras miÃºdas causando negaÃ§Ã£o de cobertura no sinistro.",
      comp_good_title: "COM A PROTEÃ‡ÃƒO DA BETTER LIFE",
      comp_good_1: "ApÃ³lices desenhadas estrategicamente para blindar suas finanÃ§as.",
      comp_good_2: "Tranquilidade para empreender sabendo que seus bens estÃ£o segregados e seguros.",
      comp_good_3: "Toda a documentaÃ§Ã£o fiscal e burocrÃ¡tica alinhada e em conformidade.",
      comp_good_4: "Atendimento humanizado em portuguÃªs no WhatsApp na hora exata em que vocÃª precisar.",
      
      eyebrow_about: "Quem Somos",
      about_title: "Especialistas em proteger brasileiros na AmÃ©rica.",
      about_desc: "A Better Life Global Insurance existe para suprir a maior necessidade dos imigrantes: entender com clareza o COMPLEXO sistema DE SEGUROS americano.",
      about_bullet_1: "ProteÃ§Ã£o completa para famÃ­lias, empresas e patrimÃ´nio.",
      about_bullet_2: "Atendimento consultivo em portuguÃªs e inglÃªs.",
      about_bullet_3: "As melhores soluÃ§Ãµes, escolhidas entre diversas seguradoras.",
      about_bullet_4: "Relacionamentos de longo prazo baseados em confianÃ§a e cuidado.",
      
      eyebrow_video: "Uma mensagem para vocÃª",
      video_title: "Bem-vindo Ã  Better Life",
      video_subtitle: "Descubra como podemos transformar a maneira como vocÃª protege seu patrimÃ´nio nos Estados Unidos.",
      video_placeholder_text: "O seu vÃ­deo serÃ¡ adicionado aqui",
      
      eyebrow_services: "Nossas SoluÃ§Ãµes",
      services_title: "Todas as proteÃ§Ãµes que vocÃª precisa em um sÃ³ lugar",
      services_subtitle: "Um portfÃ³lio gigantesco desenhado estrategicamente para suprir as necessidades de proteÃ§Ã£o da vida e dos negÃ³cios da comunidade brasileira.",
      
      srv_1: "Seguro de vida",
      srv_desc_1: "SeguranÃ§a financeira para quem mais importa.",
      srv_2: "Seguro saÃºde",
      srv_desc_2: "Mais acesso Ã  saÃºde. Mais tranquilidade para sua famÃ­lia.",
      srv_3: "Seguro de carro",
      srv_desc_3: "ProteÃ§Ã£o para cada quilÃ´metro da sua jornada.",
      srv_4: "Seguro de casa",
      srv_desc_4: "Proteja o patrimÃ´nio que vocÃª conquistou com tanto esforÃ§o.",
      srv_5: "Seguro para negÃ³cios",
      srv_desc_5: "ProteÃ§Ã£o inteligente para empresas que querem crescer com seguranÃ§a.",
      srv_6: "SoluÃ§Ãµes Internacionais",
      srv_desc_6: "EstratÃ©gias globais para proteger seu patrimÃ´nio e seu legado.",
      srv_7: "Seguro Viagem",
      srv_desc_7: "Viaje com a seguranÃ§a de estar protegido onde quer que vocÃª esteja.",
      srv_8: "Seguro Dental",
      srv_desc_8: "Cuidados preventivos para manter o sorriso e a saÃºde em dia.",
      srv_9: "Seguro para Pets",
      srv_desc_9: "ProteÃ§Ã£o para cuidar de quem faz parte da sua famÃ­lia.",
      
      eyebrow_form: "DiagnÃ³stico RÃ¡pido",
      form_title: "Quer saber quanto custa proteger seu futuro?",
      form_desc: "Preencha o formulÃ¡rio abaixo e um de nossos especialistas entrarÃ¡ em contato com uma cotaÃ§Ã£o e estratÃ©gia desenhada sob medida para sua realidade.",
      form_name: "Seu Nome Completo",
      form_email: "Seu E-mail",
      form_phone: "Seu Telefone / WhatsApp",
      form_interest: "Qual sua principal necessidade hoje?",
      form_btn: "Solicitar Contato &rarr;",
      
      eyebrow_why: "Vantagem Exclusiva",
      why_title: "Por que escolher a BLGI?",
      why_1_title: "Atendimento em portuguÃªs",
      why_2_title: "Diversas seguradoras",
      why_3_title: "SoluÃ§Ãµes personalizadas",
      why_4_title: "Atendimento local na FlÃ³rida",
      why_5_title: "Especialistas em famÃ­lias brasileiras",
      
      eyebrow_lib: "ConteÃºdo Exclusivo",
      lib_title: "Biblioteca Gratuita",
      lib_desc: "Acesse nossos manuais e guias para entender tudo sobre a proteÃ§Ã£o patrimonial nos EUA.",
      lib_1_title: "Seguro de vida com benefÃ­cio em vida",
      lib_1_desc: "Como acumular patrimÃ´nio em dÃ³lar e proteger sua famÃ­lia ao mesmo tempo.",
      lib_2_title: "OpÃ§Ãµes de seguro saÃºde",
      lib_2_desc: "Tudo que o imigrante precisa saber para nÃ£o pagar multas no Tax Return.",
      lib_3_title: "SoluÃ§Ãµes de seguros para empresas",
      lib_3_desc: "General Liability e Workers Comp. NÃ£o perca sua empresa por um processo.",
      lib_btn: "Baixar PDF",
      learn_more: "Saiba mais",
      
      eyebrow_stories: "Depoimentos",
      stories_title: "Clientes Better Life",
      
      eyebrow_faq: "EsclareÃ§a suas dÃºvidas",
      faq_title: "Perguntas Frequentes",
      faq_1_q: "Como funciona o seguro saÃºde nos EUA (Obamacare)?",
      faq_1_a: "O Affordable Care Act (Obamacare) oferece subsÃ­dios do governo baseados na sua renda estimada. Se qualificado, vocÃª pode ter acesso a excelentes planos de saÃºde pagando prÃªmios muito baixos ou atÃ© zero, evitando multas e protegendo sua famÃ­lia de altos custos mÃ©dicos.",
      faq_2_q: "O seguro de vida nos EUA realmente serve como investimento?",
      faq_2_a: "Sim. ApÃ³lices como o IUL (Indexed Universal Life) permitem que uma parte do seu prÃªmio seja alocada em Ã­ndices do mercado, construindo um valor em dinheiro (Cash Value) que cresce livre de impostos e pode ser usado em vida para aposentadoria ou emergÃªncias.",
      faq_3_q: "Se eu alugar uma casa, preciso de seguro residencial?",
      faq_3_a: "Ã‰ altamente recomendado o Seguro para Inquilinos (Renters Insurance). Ele protege seus pertences pessoais contra roubo, incÃªndio e danos, alÃ©m de oferecer cobertura de responsabilidade civil (liability) caso alguÃ©m se machuque dentro da propriedade que vocÃª aluga.",
      faq_4_q: "Qual a diferenÃ§a entre seguro de carro no Brasil e nos EUA?",
      faq_4_a: "Nos EUA, o foco principal Ã© a Responsabilidade Civil (Liability), que Ã© obrigatÃ³ria por lei e protege contra danos fÃ­sicos ou materiais causados a terceiros. As coberturas Comprehensive e Collision (que protegem o seu carro) sÃ£o adicionais, sendo vitais para a sua proteÃ§Ã£o total.",
      faq_5_q: "Tenho uma empresa nos EUA. Quais seguros sÃ£o obrigatÃ³rios?",
      faq_5_a: "A maioria dos estados exige o Workers' Compensation se vocÃª tiver funcionÃ¡rios. AlÃ©m disso, o General Liability Ã© essencial para cobrir danos a terceiros e proteger o patrimÃ´nio da sua empresa contra aÃ§Ãµes judiciais, mesmo que nÃ£o seja exigido por lei.",
      faq_6_q: "Como funciona a proteÃ§Ã£o para Pets?",
      faq_6_a: "O Seguro para Pets cobre desde consultas de rotina e vacinas atÃ© cirurgias complexas e tratamentos de doenÃ§as crÃ´nicas, reembolsando grande parte das despesas veterinÃ¡rias, para que vocÃª nunca precise escolher entre a vida do seu pet e o seu bolso.",
      
      eyebrow_map: "Nossa LocalizaÃ§Ã£o",
      map_title: "Venha tomar um cafÃ© conosco",
      
      cta_title: "Vamos construir seu plano de proteÃ§Ã£o?",
      cta_btn_1: "Conversar com especialista por WhatsApp",
      
      footer_desc: "One Agency. Every Protection. A agÃªncia que ajuda famÃ­lias e empresas brasileiras nos Estados Unidos a proteger tudo o que construÃ­ram.",
      copyright_text: "Todos os direitos reservados.",
      legal_privacy: "PolÃ­tica de Privacidade",
      legal_terms: "Termos de Uso"`;

const enTranslations = `
      nav_services: "Insurance",
      nav_about: "About Us",
      nav_diff: "Why BLGI?",
      nav_video: "Welcome",
      nav_lib: "Library",
      nav_faq: "FAQ",
      nav_cta: "CONTACT US",
      
      hero_eyebrow: "One Agency. Every Protection.",
      hero_title: "Every protection your family needs",
      hero_subtitle: "Life, Health, Auto, Home, Business, and International Solutions for the Brazilian community.",
      hero_cta_1: "Request a Quote",
      hero_cta_2: "Talk on WhatsApp",
      
      badge_secure: "Total Protection",
      badge_expert: "VIP Consulting",
      
      hero_help: "HOW CAN WE HELP YOU?",
      quick_saude: "HEALTH",
      quick_vida: "LIFE",
      quick_carro: "AUTO",
      quick_casa: "HOME",
      quick_empresa: "BUSINESS",
      quick_inter: "INTERNATIONAL",
      
      auth_fam: "Families Protected",
      auth_years: "Years of Experience",
      auth_states: "States Served",
      auth_lang: "Portuguese Support",
      
      eyebrow_import: "Future Vision",
      import_title: "WE ARE BY YOUR SIDE",
      import_desc_1: "When a child is born. When you buy a house. When you open a business. When your assets grow. You live your life. We take care of your protection.",
      btn_schedule: "Schedule Free Diagnosis",
      
      eyebrow_comp: "The Cost of Choice",
      comp_title: "What happens in critical moments?",
      comp_bad_title: "The Unprotected Path",
      comp_bad_1: "Astronomical medical bills in an emergency (personal bankruptcy).",
      comp_bad_2: "Risks of lawsuits depleting your business or family assets.",
      comp_bad_3: "Difficulty resolving direct issues with the insurance company.",
      comp_bad_4: "Language barrier and fine print causing coverage denial during claims.",
      comp_good_title: "WITH BLGI PROTECTION",
      comp_good_1: "Strategically designed policies to shield your finances.",
      comp_good_2: "Peace of mind to run your business knowing your assets are secure.",
      comp_good_3: "All tax and bureaucratic documentation aligned and compliant.",
      comp_good_4: "Humanized service in Portuguese exactly when you need it.",
      
      eyebrow_about: "About Us",
      about_title: "Experts in protecting Brazilians in America.",
      about_desc: "Better Life Global Insurance exists to meet the greatest need of immigrants: understanding clearly the COMPLEX American INSURANCE system.",
      about_bullet_1: "Complete protection for families, businesses, and assets.",
      about_bullet_2: "Consultative service in Portuguese and English.",
      about_bullet_3: "The best solutions, chosen from diverse insurance carriers.",
      about_bullet_4: "Long-term relationships based on trust and care.",
      
      eyebrow_video: "A message for you",
      video_title: "Welcome to Better Life",
      video_subtitle: "Discover how we can transform the way you protect your assets in the United States.",
      video_placeholder_text: "Your video will be added here",
      
      eyebrow_services: "Our Solutions",
      services_title: "All the protection you need in one place",
      services_subtitle: "A massive portfolio strategically designed to meet the life and business protection needs of the Brazilian community.",
      
      srv_1: "Life Insurance",
      srv_desc_1: "Financial security for those who matter most.",
      srv_2: "Health Insurance",
      srv_desc_2: "More access to health. More peace of mind for your family.",
      srv_3: "Auto Insurance",
      srv_desc_3: "Protection for every mile of your journey.",
      srv_4: "Home Insurance",
      srv_desc_4: "Protect the assets you have worked so hard to acquire.",
      srv_5: "Business Insurance",
      srv_desc_5: "Smart protection for companies that want to grow safely.",
      srv_6: "International Solutions",
      srv_desc_6: "Global strategies to protect your assets and your legacy.",
      srv_7: "Travel Insurance",
      srv_desc_7: "Travel with the security of being protected wherever you are.",
      srv_8: "Dental Insurance",
      srv_desc_8: "Preventive care to keep your smile and health on track.",
      srv_9: "Pet Insurance",
      srv_desc_9: "Protection to care for those who are part of your family.",
      
      eyebrow_form: "Quick Diagnosis",
      form_title: "Want to know how much it costs to protect your future?",
      form_desc: "Fill out the form below and one of our experts will contact you with a customized quote and strategy for your reality.",
      form_name: "Full Name",
      form_email: "Email Address",
      form_phone: "Phone / WhatsApp",
      form_interest: "What is your primary need today?",
      form_btn: "Request Contact &rarr;",
      
      eyebrow_why: "Exclusive Advantage",
      why_title: "Why choose BLGI?",
      why_1_title: "Portuguese service",
      why_2_title: "Multiple carriers",
      why_3_title: "Customized solutions",
      why_4_title: "Local service in Florida",
      why_5_title: "Experts in Brazilian families",
      
      eyebrow_lib: "Exclusive Content",
      lib_title: "Free Library",
      lib_desc: "Access our manuals and guides to understand everything about asset protection in the US.",
      lib_1_title: "Life insurance with living benefits",
      lib_1_desc: "How to accumulate USD wealth and protect your family at the same time.",
      lib_2_title: "Health insurance options",
      lib_2_desc: "Everything immigrants need to know to avoid Tax Return penalties.",
      lib_3_title: "Insurance solutions for businesses",
      lib_3_desc: "General Liability and Workers Comp. Don't lose your business to a lawsuit.",
      lib_btn: "Download PDF",
      learn_more: "Learn more",
      
      eyebrow_stories: "Testimonials",
      stories_title: "Better Life Clients",
      
      eyebrow_faq: "Clear your doubts",
      faq_title: "Frequently Asked Questions",
      faq_1_q: "How does health insurance work in the US (Obamacare)?",
      faq_1_a: "The Affordable Care Act offers government subsidies based on your estimated income. If qualified, you can access excellent health plans paying very low or zero premiums.",
      faq_2_q: "Does life insurance in the US really serve as an investment?",
      faq_2_a: "Yes. Policies like IUL allow part of your premium to be allocated to market indexes, building Cash Value that grows tax-free.",
      faq_3_q: "If I rent a house, do I need insurance?",
      faq_3_a: "Renters Insurance is highly recommended. It protects your personal belongings against theft, fire, and damage, plus liability coverage.",
      faq_4_q: "What's the difference between auto insurance in Brazil and the US?",
      faq_4_a: "In the US, Liability is the main focus and legally required. Comprehensive and Collision (which protect your car) are additional.",
      faq_5_q: "I have a US company. What insurance is mandatory?",
      faq_5_a: "Most states require Workers' Compensation if you have employees. General Liability is essential for covering third-party damage.",
      faq_6_q: "How does Pet insurance work?",
      faq_6_a: "Pet Insurance covers everything from routine visits to complex surgeries, reimbursing a large part of veterinary expenses.",
      
      eyebrow_map: "Our Location",
      map_title: "Come have a coffee with us",
      
      cta_title: "Shall we build your protection plan?",
      cta_btn_1: "Chat with an expert on WhatsApp",
      
      footer_desc: "One Agency. Every Protection. The agency helping Brazilian families and businesses in the US protect everything they've built.",
      copyright_text: "All rights reserved.",
      legal_privacy: "Privacy Policy",
      legal_terms: "Terms of Use"`;

// Replace the translations object in main.js
const translationsRegex = /const translations = \{[\s\S]*?en: \{[\s\S]*?\}\s*\};/;
mainJs = mainJs.replace(translationsRegex, `const translations = {
    pt: {
\${ptTranslations}
    },
    en: {
\${enTranslations}
    }
  };`);

fs.writeFileSync('main.js', mainJs, 'utf8');


// --- UPDATE INDEX.HTML ---
let html = fs.readFileSync('index.html', 'utf8');

// 1. Move #solucoes section to be directly after .hero section
const heroRegex = /(<section class="hero reveal">[\s\S]*?<\/section>)/;
const solucoesRegex = /(<section id="solucoes" class="services reveal colorful-services">[\s\S]*?<\/section>)/;

const heroMatch = html.match(heroRegex);
const solucoesMatch = html.match(solucoesRegex);

if (heroMatch && solucoesMatch) {
  // Remove #solucoes from its original place
  html = html.replace(solucoesRegex, '');
  // Insert it after the hero
  html = html.replace(heroRegex, heroMatch[1] + '\\n\\n' + solucoesMatch[1]);
}

// 2. Hide hero quick links wrapper
html = html.replace(/class="hero-quick-links-wrapper"/g, 'class="hero-quick-links-wrapper" style="display: none;"');

// 3. Remove Agendar Consulta from hero-ctas
html = html.replace(/<a href="https:\/\/calendly.com\/" target="_blank" class="btn btn-outline-white" data-i18n="hero_cta_3">Agendar Consulta<\/a>/g, '');

// 4. Update Header Dropdown (Seguros) to 9 items and update flags and CTA
const headerDropdownNew = `
          <div class="dropdown-content glass-panel">
            <a href="#solucoes" data-i18n="srv_1">Seguro de vida</a>
            <a href="#solucoes" data-i18n="srv_2">Seguro saÃºde</a>
            <a href="#solucoes" data-i18n="srv_3">Seguro de carro</a>
            <a href="#solucoes" data-i18n="srv_4">Seguro de casa</a>
            <a href="#solucoes" data-i18n="srv_5">Seguro para negÃ³cios</a>
            <a href="#solucoes" data-i18n="srv_6">SoluÃ§Ãµes Internacionais</a>
            <a href="#solucoes" data-i18n="srv_7">Seguro Viagem</a>
            <a href="#solucoes" data-i18n="srv_8">Seguro Dental</a>
            <a href="#solucoes" data-i18n="srv_9">Seguro para Pets</a>
          </div>`;
html = html.replace(/<div class="dropdown-content glass-panel">[\s\S]*?<\/div>/, headerDropdownNew);

// Cut "Por que a BLGI" and "Biblioteca" from Desktop Nav
html = html.replace(/<a href="#diferenciais" data-i18n="nav_diff">Por Que a BLGI\?<\/a>/g, '');
html = html.replace(/<a href="#biblioteca" data-i18n="nav_lib">Biblioteca<\/a>/g, '');

// Add Flags and change Agendar Consulta to Fale Conosco
html = html.replace(/<span class="lang-en">EN<\/span>/, '<span class="lang-en">EN ðŸ‡ºðŸ‡¸</span>').replace(/<span class="lang-pt">PT<\/span>/, '<span class="lang-pt">ðŸ‡§ðŸ‡· PT</span>');
html = html.replace(/data-i18n="nav_cta" style="border-image: linear-gradient[^>]+>Agendar Consulta<\/a>/, 'data-i18n="nav_cta" href="https://wa.me/15616741194" style="border-image: linear-gradient(135deg, var(--gold-light), var(--gold-dark)) 1; color: var(--gold-light);">FALE CONOSCO</a>');

// 5. Update Solucoes cards (9 items with descriptions)
const newCards = `
      <div class="services-tech-grid">
        <div class="tech-card reveal">
          <i class="ph-light ph-shield-check"></i>
          <h4 data-i18n="srv_1">Seguro de vida</h4>
          <p data-i18n="srv_desc_1">SeguranÃ§a financeira para quem mais importa.</p>
          <a href="https://wa.me/15616741194" target="_blank" class="discover" data-i18n="learn_more">Saiba mais</a>
        </div>
        <div class="tech-card reveal">
          <i class="ph-light ph-heart"></i>
          <h4 data-i18n="srv_2">Seguro saÃºde</h4>
          <p data-i18n="srv_desc_2">Mais acesso Ã  saÃºde. Mais tranquilidade para sua famÃ­lia.</p>
          <a href="https://wa.me/15616741194" target="_blank" class="discover" data-i18n="learn_more">Saiba mais</a>
        </div>
        <div class="tech-card reveal">
          <i class="ph-light ph-car"></i>
          <h4 data-i18n="srv_3">Seguro de carro</h4>
          <p data-i18n="srv_desc_3">ProteÃ§Ã£o para cada quilÃ´metro da sua jornada.</p>
          <a href="https://wa.me/15616741194" target="_blank" class="discover" data-i18n="learn_more">Saiba mais</a>
        </div>
        <div class="tech-card reveal">
          <i class="ph-light ph-house"></i>
          <h4 data-i18n="srv_4">Seguro de casa</h4>
          <p data-i18n="srv_desc_4">Proteja o patrimÃ´nio que vocÃª conquistou com tanto esforÃ§o.</p>
          <a href="https://wa.me/15616741194" target="_blank" class="discover" data-i18n="learn_more">Saiba mais</a>
        </div>
        <div class="tech-card reveal">
          <i class="ph-light ph-buildings"></i>
          <h4 data-i18n="srv_5">Seguro para negÃ³cios</h4>
          <p data-i18n="srv_desc_5">ProteÃ§Ã£o inteligente para empresas que querem crescer com seguranÃ§a.</p>
          <a href="https://wa.me/15616741194" target="_blank" class="discover" data-i18n="learn_more">Saiba mais</a>
        </div>
        <div class="tech-card reveal">
          <i class="ph-light ph-globe"></i>
          <h4 data-i18n="srv_6">SoluÃ§Ãµes Internacionais</h4>
          <p data-i18n="srv_desc_6">EstratÃ©gias globais para proteger seu patrimÃ´nio e seu legado.</p>
          <a href="https://wa.me/15616741194" target="_blank" class="discover" data-i18n="learn_more">Saiba mais</a>
        </div>
        <div class="tech-card reveal">
          <i class="ph-light ph-airplane"></i>
          <h4 data-i18n="srv_7">Seguro Viagem</h4>
          <p data-i18n="srv_desc_7">Viaje com a seguranÃ§a de estar protegido onde quer que vocÃª esteja.</p>
          <a href="https://wa.me/15616741194" target="_blank" class="discover" data-i18n="learn_more">Saiba mais</a>
        </div>
        <div class="tech-card reveal">
          <i class="ph-light ph-tooth"></i>
          <h4 data-i18n="srv_8">Seguro Dental</h4>
          <p data-i18n="srv_desc_8">Cuidados preventivos para manter o sorriso e a saÃºde em dia.</p>
          <a href="https://wa.me/15616741194" target="_blank" class="discover" data-i18n="learn_more">Saiba mais</a>
        </div>
        <div class="tech-card reveal">
          <i class="ph-light ph-paw-print"></i>
          <h4 data-i18n="srv_9">Seguro para Pets</h4>
          <p data-i18n="srv_desc_9">ProteÃ§Ã£o para cuidar de quem faz parte da sua famÃ­lia.</p>
          <a href="https://wa.me/15616741194" target="_blank" class="discover" data-i18n="learn_more">Saiba mais</a>
        </div>
      </div>`;
html = html.replace(/<div class="services-tech-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, newCards + '\\n    </div>\\n  </section>');

// 6. Update Quem Somos section
html = html.replace(/foi fundada para suprir/g, 'existe para suprir');
html = html.replace(/o sistema americano/g, 'o COMPLEXO sistema DE SEGUROS americano');
html = html.replace(/<ul class="list-col-small">[\s\S]*?<\/ul>/, `<ul class="list-col-small">
            <li class="diff-item-small"><i class="ph-light ph-check-circle text-gradient-gold"></i> <span data-i18n="about_bullet_1">ProteÃ§Ã£o completa para famÃ­lias, empresas e patrimÃ´nio.</span></li>
            <li class="diff-item-small"><i class="ph-light ph-check-circle text-gradient-gold"></i> <span data-i18n="about_bullet_2">Atendimento consultivo em portuguÃªs e inglÃªs.</span></li>
            <li class="diff-item-small"><i class="ph-light ph-check-circle text-gradient-gold"></i> <span data-i18n="about_bullet_3">As melhores soluÃ§Ãµes, escolhidas entre diversas seguradoras.</span></li>
            <li class="diff-item-small"><i class="ph-light ph-check-circle text-gradient-gold"></i> <span data-i18n="about_bullet_4">Relacionamentos de longo prazo baseados em confianÃ§a e cuidado.</span></li>
          </ul>`);
          
// 7. Update Form select options
html = html.replace(/<select id="interest" required>[\s\S]*?<\/select>/, `<select id="interest" required>
                <option value="" disabled selected data-i18n="form_interest">Qual sua principal necessidade hoje?</option>
                <option value="vida" data-i18n="srv_1">Seguro de vida</option>
                <option value="saude" data-i18n="srv_2">Seguro saÃºde</option>
                <option value="carro" data-i18n="srv_3">Seguro de carro</option>
                <option value="casa" data-i18n="srv_4">Seguro de casa</option>
                <option value="negocios" data-i18n="srv_5">Seguro para negÃ³cios</option>
                <option value="internacional" data-i18n="srv_6">SoluÃ§Ãµes Internacionais</option>
                <option value="viagem" data-i18n="srv_7">Seguro Viagem</option>
                <option value="dental" data-i18n="srv_8">Seguro Dental</option>
                <option value="pets" data-i18n="srv_9">Seguro para Pets</option>
              </select>`);

// 8. Hide Vantagem Exclusiva and Mapa
html = html.replace(/<section id="diferenciais"/, '<section id="diferenciais" style="display: none;"');
html = html.replace(/<section class="location-map/, '<section class="location-map" style="display: none;"');

// 9. Update Final CTA (Remove second button)
html = html.replace(/<a href="https:\/\/calendly.com\/" target="_blank" class="btn btn-outline" data-i18n="cta_btn_2">Agendar reuniÃ£o<\/a>/, '');

// 10. Fix FAQ Structure for 6 items
const faqContainer = `<div class="faq-list">
        <div class="faq-item">
          <button class="faq-btn"><span data-i18n="faq_1_q">Como funciona o seguro saÃºde nos EUA (Obamacare)?</span> <i class="ph-light ph-caret-down"></i></button>
          <div class="faq-content"><p data-i18n="faq_1_a">O Affordable Care Act (Obamacare) oferece subsÃ­dios do governo baseados na sua renda estimada. Se qualificado, vocÃª pode ter acesso a excelentes planos de saÃºde pagando prÃªmios muito baixos ou atÃ© zero, evitando multas e protegendo sua famÃ­lia de altos custos mÃ©dicos.</p></div>
        </div>
        <div class="faq-item">
          <button class="faq-btn"><span data-i18n="faq_2_q">O seguro de vida nos EUA realmente serve como investimento?</span> <i class="ph-light ph-caret-down"></i></button>
          <div class="faq-content"><p data-i18n="faq_2_a">Sim. ApÃ³lices como o IUL (Indexed Universal Life) permitem que uma parte do seu prÃªmio seja alocada em Ã­ndices do mercado, construindo um valor em dinheiro (Cash Value) que cresce livre de impostos e pode ser usado em vida para aposentadoria ou emergÃªncias.</p></div>
        </div>
        <div class="faq-item">
          <button class="faq-btn"><span data-i18n="faq_3_q">Se eu alugar uma casa, preciso de seguro residencial?</span> <i class="ph-light ph-caret-down"></i></button>
          <div class="faq-content"><p data-i18n="faq_3_a">Ã‰ altamente recomendado o Seguro para Inquilinos (Renters Insurance). Ele protege seus pertences pessoais contra roubo, incÃªndio e danos, alÃ©m de oferecer cobertura de responsabilidade civil (liability) caso alguÃ©m se machuque dentro da propriedade que vocÃª aluga.</p></div>
        </div>
        <div class="faq-item">
          <button class="faq-btn"><span data-i18n="faq_4_q">Qual a diferenÃ§a entre seguro de carro no Brasil e nos EUA?</span> <i class="ph-light ph-caret-down"></i></button>
          <div class="faq-content"><p data-i18n="faq_4_a">Nos EUA, o foco principal Ã© a Responsabilidade Civil (Liability), que Ã© obrigatÃ³ria por lei e protege contra danos fÃ­sicos ou materiais causados a terceiros. As coberturas Comprehensive e Collision (que protegem o seu carro) sÃ£o adicionais, sendo vitais para a sua proteÃ§Ã£o total.</p></div>
        </div>
        <div class="faq-item">
          <button class="faq-btn"><span data-i18n="faq_5_q">Tenho uma empresa nos EUA. Quais seguros sÃ£o obrigatÃ³rios?</span> <i class="ph-light ph-caret-down"></i></button>
          <div class="faq-content"><p data-i18n="faq_5_a">A maioria dos estados exige o Workers' Compensation se vocÃª tiver funcionÃ¡rios. AlÃ©m disso, o General Liability Ã© essencial para cobrir danos a terceiros e proteger o patrimÃ´nio da sua empresa contra aÃ§Ãµes judiciais, mesmo que nÃ£o seja exigido por lei.</p></div>
        </div>
        <div class="faq-item">
          <button class="faq-btn"><span data-i18n="faq_6_q">Como funciona a proteÃ§Ã£o para Pets?</span> <i class="ph-light ph-caret-down"></i></button>
          <div class="faq-content"><p data-i18n="faq_6_a">O Seguro para Pets cobre desde consultas de rotina e vacinas atÃ© cirurgias complexas e tratamentos de doenÃ§as crÃ´nicas, reembolsando grande parte das despesas veterinÃ¡rias, para que vocÃª nunca precise escolher entre a vida do seu pet e o seu bolso.</p></div>
        </div>
      </div>`;
html = html.replace(/<div class="faq-list">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, faqContainer + '\\n    </div>\\n  </section>');

// 11. Footer Updates
// Replace Solutions list
html = html.replace(/<ul class="footer-links">[\s\S]*?<\/ul>/, `<ul class="footer-links">
            <li><a href="#solucoes" data-i18n="srv_1">Seguro de vida</a></li>
            <li><a href="#solucoes" data-i18n="srv_2">Seguro saÃºde</a></li>
            <li><a href="#solucoes" data-i18n="srv_3">Seguro de carro</a></li>
            <li><a href="#solucoes" data-i18n="srv_4">Seguro de casa</a></li>
            <li><a href="#solucoes" data-i18n="srv_5">Seguro para negÃ³cios</a></li>
            <li><a href="#solucoes" data-i18n="srv_6">SoluÃ§Ãµes Internacionais</a></li>
            <li><a href="#solucoes" data-i18n="srv_7">Seguro Viagem</a></li>
            <li><a href="#solucoes" data-i18n="srv_8">Seguro Dental</a></li>
            <li><a href="#solucoes" data-i18n="srv_9">Seguro para Pets</a></li>
          </ul>`);

// Remove "Por que a BLGI" from Company Links in footer
html = html.replace(/<li><a href="#diferenciais" data-i18n="nav_diff">Por Que a BLGI\?<\/a><\/li>/, '');

// Add second pin to address
html = html.replace(/<ul class="contact-info">[\s\S]*?<\/ul>/, `<ul class="contact-info">
            <li><i class="ph-light ph-map-pin"></i> <span>9825 Marina BLVD # 100, Boca Raton, FL 33428</span></li>
            <li><i class="ph-light ph-map-pin"></i> <span>Orlando, FlÃ³rida</span></li>
            <li><i class="ph-light ph-phone"></i> <span>+1 (561) 674-1194</span></li>
            <li><i class="ph-light ph-envelope"></i> <span>contato@betterlifeglobalinsurance.com</span></li>
          </ul>`);

// Minor fallback updates to fix visually
html = html.replace(/<h2 data-i18n="import_title" style="color:var\(--navy-1\);">Por que proteger seu futuro hoje\?<\/h2>/, '<h2 data-i18n="import_title" style="color:var(--navy-1);">ESTAMOS AO SEU LADO</h2>');
html = html.replace(/<p data-i18n="import_desc_2">A Better Life Global Insurance atua como seu Family Office de seguros.*<\/p>/, '');

// Third part replacement (Import_desc_1 -> fallback update)
html = html.replace(/<p data-i18n="import_desc_1">Mudar para os Estados Unidos.*<\/p>/, '<p data-i18n="import_desc_1">Quando nasce um filho. Quando compra uma casa. Quando abre uma empresa. Quando cresce o patrimÃ´nio. VocÃª vive sua vida. NÃ³s cuidamos da sua proteÃ§Ã£o.</p>');

// Comparison replace fallback
html = html.replace(/Multas no Tax Return por nÃ£o cumprimento das leis de saÃºde \(ACA\)\./, 'Dificuldade na resoluÃ§Ã£o de problemas diretos com a seguradora.');
html = html.replace(/Com a ProteÃ§Ã£o da BLGI/, 'COM A PROTEÃ‡ÃƒO DA BETTER LIFE');


fs.writeFileSync('index.html', html, 'utf8');
console.log("All updates applied perfectly!");
