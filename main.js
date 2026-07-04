// main.js - Initialization
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. Header Scroll Effect
     ========================================== */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* ==========================================
     2. Mobile Menu Toggle
     ========================================== */
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ==========================================
     3. Scroll Reveal Animation
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================
     4. Counters Animation
     ========================================== */
  const counters = document.querySelectorAll('.counter-number span');
  const speed = 200;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const inc = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 15);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  /* ==========================================
     5. FAQ Accordion Logic
     ========================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        item.classList.toggle('active');
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
      });
    }
  });

  /* ==========================================
     6. Bilingual Implementation (PT / EN)
     ========================================== */
  const translations = {
    pt: {
      nav_services: "Seguros",
      nav_about: "Quem Somos",
      nav_diff: "Por Que a BLGI?",
      nav_video: "Bem-vindo",
      nav_lib: "Biblioteca",
      nav_faq: "FAQ",
      nav_cta: "Agendar Consulta",
      
      hero_eyebrow: "One Agency. Every Protection.",
      hero_title: "Uma Agência. Todas as Proteções da Sua Família.",
      hero_subtitle: "Seguro de Vida, Saúde, Auto, Residência, Negócios e Soluções Internacionais para a comunidade brasileira.",
      hero_cta_1: "Solicitar Cotação",
      hero_cta_2: "Falar no WhatsApp",
      hero_cta_3: "Agendar Consulta",
      
      badge_secure: "Proteção Total",
      badge_expert: "Consultoria VIP",
      
      hero_help: "COMO PODEMOS TE AJUDAR?",
      quick_saude: "SAÚDE",
      quick_vida: "VIDA",
      quick_carro: "CARRO",
      quick_casa: "CASA",
      quick_aposentar: "APOSENTAR",
      quick_mais: "E MAIS...",
      
      auth_fam: "Famílias Protegidas",
      auth_years: "Anos de Mercado",
      auth_states: "Estados Atendidos",
      auth_lang: "Atendimento em Português",
      
      eyebrow_import: "Visão de Futuro",
      import_title: "Por que construir sua blindagem patrimonial hoje?",
      import_desc_1: "Mudar para os Estados Unidos é a realização de um grande sonho, mas o sistema americano não perdoa desorganização financeira ou falta de proteção. Um único acidente ou emergência médica pode consumir décadas de trabalho árduo.",
      import_desc_2: "A Better Life Global Insurance atua como seu Family Office de seguros. Nossa missão é criar uma barreira intransponível ao redor do seu patrimônio, para que você possa focar no que realmente importa: crescer e viver com tranquilidade.",
      btn_schedule: "Agendar Diagnóstico Gratuito",
      
      eyebrow_comp: "O Preço da Escolha",
      comp_title: "O que acontece nos momentos críticos?",
      comp_bad_title: "O Caminho Desprotegido",
      comp_bad_1: "Contas médicas astronômicas em caso de emergência (falência pessoal).",
      comp_bad_2: "Riscos de processos judiciais esgotarem os bens da sua empresa ou família.",
      comp_bad_3: "Multas no Tax Return por não cumprimento das leis de saúde (ACA).",
      comp_bad_4: "Barreira linguística e letras miúdas causando negação de cobertura no sinistro.",
      comp_good_title: "Com a Proteção da BLGI",
      comp_good_1: "Apólices desenhadas estrategicamente para blindar suas finanças.",
      comp_good_2: "Tranquilidade para empreender sabendo que seus bens estão segregados e seguros.",
      comp_good_3: "Toda a documentação fiscal e burocrática alinhada e em conformidade.",
      comp_good_4: "Atendimento humanizado em português no WhatsApp na hora exata em que você precisar.",
      
      eyebrow_about: "Quem Somos",
      about_title: "Especialistas em proteger brasileiros na América.",
      about_desc: "A Better Life Global Insurance foi fundada para suprir a maior necessidade dos imigrantes: entender com clareza o sistema americano.",
      about_bullet_1: "Agência independente",
      about_bullet_2: "Atendimento em português e inglês",
      about_bullet_3: "Especializada na comunidade brasileira",
      about_bullet_4: "Soluções pessoais e empresariais",
      
      eyebrow_video: "Uma mensagem para você",
      video_title: "Bem-vindo à Better Life",
      video_subtitle: "Descubra como podemos transformar a maneira como você protege seu patrimônio nos Estados Unidos.",
      video_placeholder_text: "O seu vídeo será adicionado aqui",
      
      eyebrow_services: "Nossas Soluções",
      services_title: "Todas as proteções que você precisa em um só lugar",
      services_subtitle: "Um portfólio gigantesco desenhado estrategicamente para suprir as necessidades de proteção da vida e dos negócios da comunidade brasileira.",
      
      srv_1: "Aposentadoria privada",
      srv_2: "Seguro saúde/Obamacare",
      srv_3: "Seguro Saúde/Medicare",
      srv_4: "Seguro Saúde/Short Term",
      srv_5: "Seguro de casa",
      srv_6: "Seguro de carro",
      srv_7: "Seguro Comercial",
      srv_8: "Seguro de vida",
      srv_9: "Seguro Viagem",
      srv_10: "Seguro Dental",
      srv_11: "Seguro de Visão",
      srv_12: "Seguro para estudantes",
      
      eyebrow_form: "Diagnóstico Rápido",
      form_title: "Quer saber quanto custa proteger seu futuro?",
      form_desc: "Preencha o formulário abaixo e um de nossos especialistas entrará em contato com uma cotação e estratégia desenhada sob medida para sua realidade.",
      form_name: "Seu Nome Completo",
      form_email: "Seu E-mail",
      form_phone: "Seu Telefone / WhatsApp",
      form_interest: "Qual sua principal necessidade hoje?",
      form_btn: "Solicitar Contato &rarr;",
      
      eyebrow_why: "Vantagem Exclusiva",
      why_title: "Por que escolher a BLGI?",
      why_1_title: "Atendimento em português",
      why_2_title: "Diversas seguradoras",
      why_3_title: "Soluções personalizadas",
      why_4_title: "Atendimento local na Flórida",
      why_5_title: "Especialistas em famílias brasileiras",
      
      eyebrow_lib: "Conteúdo Exclusivo",
      lib_title: "Biblioteca Gratuita",
      lib_desc: "Acesse nossos manuais e guias para entender tudo sobre a proteção patrimonial nos EUA.",
      lib_1_title: "Guia Definitivo do Seguro de Vida (IUL)",
      lib_1_desc: "Como acumular patrimônio em dólar e proteger sua família ao mesmo tempo.",
      lib_2_title: "Manual do Obamacare 2026",
      lib_2_desc: "Tudo que o imigrante precisa saber para não pagar multas no Tax Return.",
      lib_3_title: "Blindagem Empresarial",
      lib_3_desc: "General Liability e Workers Comp. Não perca sua empresa por um processo.",
      lib_btn: "Baixar PDF",
      
      eyebrow_stories: "Depoimentos",
      stories_title: "Clientes Better Life",
      story_1_author: "Mariana Silva",
      story_1_city: "Orlando, FL",
      story_1_text: "\"O sistema de saúde aqui sempre me assustou. A BLGI encontrou o plano perfeito para minha família, explicando tudo em português. Confiança total!\"",
      story_2_author: "Ricardo Mendes",
      story_2_city: "Boca Raton, FL",
      story_2_text: "\"Contratei o seguro do meu carro e da minha casa. A agilidade deles e a clareza nas opções de cobertura são impressionantes. Recomendo de olhos fechados.\"",
      story_3_author: "Thiago Costa",
      story_3_city: "Miami, FL",
      story_3_text: "\"Como dono de negócio, precisava de um General Liability. Eles resolveram minha apólice no mesmo dia. Um alívio saber que tenho esse suporte.\"",
      
      eyebrow_faq: "Esclareça suas dúvidas",
      faq_title: "Perguntas Frequentes",
      faq_1_q: "Quais tipos de seguros a Better Life oferece?",
      faq_1_a: "Oferecemos proteção completa: Saúde (Obamacare, Medicare, Short Term), Vida (Term e IUL), Automóvel, Residencial, Empresarial (Liability, Workers Comp) e Soluções Internacionais (acumulação em dólar).",
      faq_2_q: "O atendimento e consultoria tem algum custo?",
      faq_2_a: "Não! Nossa consultoria e cotação são gratuitas. Nós somos remunerados diretamente pelas seguradoras após a contratação. O preço do seguro será o mesmo que comprar diretamente, porém com toda a nossa assistência e estratégia.",
      faq_3_q: "Vocês atendem apenas na Flórida?",
      faq_3_a: "Apesar da nossa sede estar na Flórida, possuímos licenças em diversos outros estados e trabalhamos com Soluções Internacionais para clientes ao redor do globo. Fale conosco para verificar a disponibilidade no seu estado.",
      
      eyebrow_map: "Nossa Localização",
      map_title: "Venha tomar um café conosco",
      
      cta_title: "Vamos construir seu plano de proteção?",
      cta_btn_1: "WhatsApp",
      cta_btn_2: "Agendar reunião",
      
      footer_desc: "One Agency. Every Protection. A agência que ajuda famílias e empresas brasileiras nos Estados Unidos a proteger tudo o que construíram.",
      copyright_text: "Todos os direitos reservados.",
      legal_privacy: "Política de Privacidade",
      legal_terms: "Termos de Uso"
    },
    en: {
      nav_services: "Insurance",
      nav_about: "About Us",
      nav_diff: "Why BLGI?",
      nav_video: "Welcome",
      nav_lib: "Library",
      nav_faq: "FAQ",
      nav_cta: "Schedule Consultation",
      
      hero_eyebrow: "One Agency. Every Protection.",
      hero_title: "One Agency. Every Protection for Your Family.",
      hero_subtitle: "Life, Health, Auto, Home, Business, and International Solutions for the Brazilian community.",
      hero_cta_1: "Request a Quote",
      hero_cta_2: "Talk on WhatsApp",
      hero_cta_3: "Schedule Consultation",
      
      badge_secure: "Total Protection",
      badge_expert: "VIP Consulting",
      
      hero_help: "HOW CAN WE HELP YOU?",
      quick_saude: "HEALTH",
      quick_vida: "LIFE",
      quick_carro: "AUTO",
      quick_casa: "HOME",
      quick_aposentar: "RETIRE",
      quick_mais: "MORE...",
      
      auth_fam: "Families Protected",
      auth_years: "Years of Experience",
      auth_states: "States Served",
      auth_lang: "Portuguese Support",
      
      eyebrow_import: "Future Vision",
      import_title: "Why build your asset shield today?",
      import_desc_1: "Moving to the US is a huge dream, but the American system does not forgive financial disorganization or lack of protection. A single accident or medical emergency can consume decades of hard work.",
      import_desc_2: "Better Life Global Insurance acts as your insurance Family Office. Our mission is to create an impenetrable barrier around your assets so you can focus on what really matters: growing and living with peace of mind.",
      btn_schedule: "Schedule Free Diagnosis",
      
      eyebrow_comp: "The Cost of Choice",
      comp_title: "What happens in critical moments?",
      comp_bad_title: "The Unprotected Path",
      comp_bad_1: "Astronomical medical bills in an emergency (personal bankruptcy).",
      comp_bad_2: "Risks of lawsuits depleting your business or family assets.",
      comp_bad_3: "Tax Return penalties for non-compliance with health laws (ACA).",
      comp_bad_4: "Language barrier and fine print causing coverage denial during claims.",
      comp_good_title: "With BLGI Protection",
      comp_good_1: "Strategically designed policies to shield your finances.",
      comp_good_2: "Peace of mind to run your business knowing your assets are secure.",
      comp_good_3: "All tax and bureaucratic documentation aligned and compliant.",
      comp_good_4: "Humanized service in Portuguese exactly when you need it.",
      
      eyebrow_about: "About Us",
      about_title: "Experts in protecting Brazilians in America.",
      about_desc: "Better Life Global Insurance was founded to meet the greatest need of immigrants: understanding the American system clearly.",
      about_bullet_1: "Independent Agency",
      about_bullet_2: "Service in Portuguese and English",
      about_bullet_3: "Specialized in the Brazilian community",
      about_bullet_4: "Personal and Business solutions",
      
      eyebrow_video: "A message for you",
      video_title: "Welcome to Better Life",
      video_subtitle: "Discover how we can transform the way you protect your assets in the United States.",
      video_placeholder_text: "Your video will be added here",
      
      eyebrow_services: "Our Solutions",
      services_title: "All the protection you need in one place",
      services_subtitle: "A massive portfolio strategically designed to meet the life and business protection needs of the Brazilian community.",
      
      srv_1: "Private Retirement",
      srv_2: "Health Insurance/Obamacare",
      srv_3: "Health Insurance/Medicare",
      srv_4: "Health Insurance/Short Term",
      srv_5: "Home Insurance",
      srv_6: "Auto Insurance",
      srv_7: "Commercial Insurance",
      srv_8: "Life Insurance",
      srv_9: "Travel Insurance",
      srv_10: "Dental Insurance",
      srv_11: "Vision Insurance",
      srv_12: "Student Insurance",
      
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
      lib_1_title: "Definitive Guide to Life Insurance (IUL)",
      lib_1_desc: "How to accumulate USD wealth and protect your family at the same time.",
      lib_2_title: "Obamacare 2026 Manual",
      lib_2_desc: "Everything immigrants need to know to avoid Tax Return penalties.",
      lib_3_title: "Business Shielding",
      lib_3_desc: "General Liability and Workers Comp. Don't lose your business to a lawsuit.",
      lib_btn: "Download PDF",
      
      eyebrow_stories: "Testimonials",
      stories_title: "Better Life Clients",
      story_1_author: "Mariana Silva",
      story_1_city: "Orlando, FL",
      story_1_text: "\"The healthcare system here always scared me. BLGI found the perfect plan for my family. Total trust!\"",
      story_2_author: "Ricardo Mendes",
      story_2_city: "Boca Raton, FL",
      story_2_text: "\"I bought my auto and home insurance. Their speed and clarity on coverage options is impressive. Highly recommend.\"",
      story_3_author: "Thiago Costa",
      story_3_city: "Miami, FL",
      story_3_text: "\"As a business owner, I needed General Liability. They handled my policy the same day. What a relief.\"",
      
      eyebrow_faq: "Clear your doubts",
      faq_title: "Frequently Asked Questions",
      faq_1_q: "What types of insurance does Better Life offer?",
      faq_1_a: "We offer complete protection: Health (ACA, Medicare, Short Term), Life (Term, IUL), Auto, Home, Business (Liability, Workers Comp), and International Solutions.",
      faq_2_q: "Is there a cost for the consulting?",
      faq_2_a: "No! Our consulting and quoting are free. We are compensated by carriers after contracting. The price is the same as buying directly, but with our strategic assistance.",
      faq_3_q: "Do you only serve Florida?",
      faq_3_a: "Although headquartered in Florida, we are licensed in several other states and work with International Solutions for global clients. Contact us to check availability in your state.",
      
      eyebrow_map: "Our Location",
      map_title: "Come have a coffee with us",
      
      cta_title: "Shall we build your protection plan?",
      cta_btn_1: "WhatsApp",
      cta_btn_2: "Schedule Meeting",
      
      footer_desc: "One Agency. Every Protection. The agency helping Brazilian families and businesses in the US protect everything they've built.",
      copyright_text: "All rights reserved.",
      legal_privacy: "Privacy Policy",
      legal_terms: "Terms of Use"
    }
  };

  const langCheckbox = document.getElementById('lang-toggle');
  const i18nElements = document.querySelectorAll('[data-i18n]');

  if (langCheckbox) {
    langCheckbox.addEventListener('change', (e) => {
      const lang = e.target.checked ? 'en' : 'pt';
      
      i18nElements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
          // Check if it's an input/select or standard element
          if (el.tagName === 'LABEL' || el.tagName === 'SPAN' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'H4' || el.tagName === 'H5' || el.tagName === 'P' || el.tagName === 'A' || el.tagName === 'BUTTON' || el.tagName === 'OPTION') {
            el.innerHTML = translations[lang][key];
          }
        }
      });
    });
  }
});
