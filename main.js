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
     4. FAQ Accordion Logic
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
     5. Bilingual Implementation (PT / EN)
     ========================================== */
  const translations = {
    pt: {
      nav_services: "Seguros",
      nav_about: "Sobre Nós",
      nav_diff: "Por Que a BLGI?",
      nav_video: "Bem-vindo",
      nav_faq: "FAQ",
      nav_cta: "Agendar Consulta",
      nav_blog: "Blog (Em Breve)",
      
      hero_eyebrow: "One Agency. Every Protection.",
      hero_title: "Uma Agência. Todas as Proteções da Sua Família.",
      hero_subtitle: "Seguro de Vida, Saúde, Auto, Residência, Empresas e Soluções Internacionais para a comunidade brasileira nos Estados Unidos.",
      hero_cta_1: "Solicitar Cotação",
      hero_cta_2: "Falar no WhatsApp",
      hero_cta_3: "Agendar Consulta",
      
      pillar_1_title: "Famílias",
      pillar_1_desc: "Vida • Saúde • Auto • Residência. Proteção completa para todas as etapas.",
      pillar_2_title: "Empresas",
      pillar_2_desc: "Business Insurance. Proteção para empresas, patrimônio e colaboradores.",
      pillar_3_title: "Soluções Internacionais",
      pillar_3_desc: "Planejamento patrimonial em dólar e proteção para famílias globais.",
      
      partners_title: "Trabalhamos com as Maiores Seguradoras dos EUA",
      
      eyebrow_about: "Quem Somos",
      about_title: "Especialistas em proteger brasileiros na América.",
      about_desc: "A Better Life Global Insurance (BLGI) não é apenas mais uma agência de seguros. Somos uma agência independente focada em garantir que famílias e empresas brasileiras nos Estados Unidos protejam tudo o que construíram com esforço. Nosso atendimento é personalizado, humano e bilíngue.",
      about_bullet_1: "Agência Independente de Alta Performance",
      about_bullet_2: "Atendimento Especializado em Português e Inglês",
      about_bullet_3: "Soluções Completas para Pessoas Físicas e Empresas",
      btn_talk: "Conhecer a Agência",
      
      eyebrow_video: "Uma mensagem para você",
      video_title: "Bem-vindo à Better Life",
      video_subtitle: "Descubra como podemos transformar a maneira como você protege seu patrimônio nos Estados Unidos.",
      video_placeholder_text: "O seu vídeo será adicionado aqui",
      
      eyebrow_services: "Nossas Soluções",
      services_title: "Proteção em Todas as Esferas",
      services_subtitle: "A BLGI oferece um portfólio completo, desenhado estrategicamente para suprir todas as necessidades de proteção da vida e dos negócios.",
      
      srv_life_title: "Seguro de Vida",
      srv_life_desc: "Term Life e Indexed Universal Life (IUL). Proteja quem você ama e acumule capital de forma inteligente.",
      srv_health_title: "Seguro Saúde",
      srv_health_desc: "Planos individuais, familiares, ACA (Marketplace), e Medicare. Acesso aos melhores hospitais americanos.",
      srv_auto_title: "Seguro Auto",
      srv_auto_desc: "Proteção abrangente e Liability para seu veículo e terceiros nas estradas americanas. Dirija sem preocupações.",
      srv_home_title: "Seguro Residencial",
      srv_home_desc: "Homeowners, Condo, Renters e Flood Insurance. A blindagem completa para o seu maior patrimônio.",
      srv_business_title: "Business Insurance",
      srv_business_desc: "General Liability, Workers Compensation, Commercial Auto e mais. Cresça sua empresa de forma segura e protegida.",
      srv_intl_title: "International Solutions",
      srv_intl_desc: "Proteção patrimonial, seguro de vida internacional e acumulação de capital em dólar para famílias globais.",
      btn_more: "Saiba Mais &rarr;",
      
      eyebrow_why: "Vantagem Exclusiva",
      why_title: "Por que escolher a BLGI?",
      why_1_title: "Atendimento em Português",
      why_1_desc: "Compreenda as regras americanas sem barreiras de idioma.",
      why_2_title: "Atendimento Local na Flórida",
      why_2_desc: "Estamos perto de você, entendendo o ecossistema e as leis do estado.",
      why_3_title: "Diversas Seguradoras Parceiras",
      why_3_desc: "Buscamos o melhor preço e cobertura em um portfólio enorme.",
      why_4_title: "Suporte Antes e Depois",
      why_4_desc: "Consultoria humanizada e suporte vitalício, inclusive na hora do sinistro.",
      
      eyebrow_stories: "O que dizem sobre nós",
      stories_title: "A voz de quem confia na Better Life",
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
      
      cta_title: "Vamos construir seu plano de proteção?",
      cta_subtitle: "Nossos especialistas estão prontos para garantir a tranquilidade e a segurança patrimonial da sua família nos EUA.",
      cta_btn_1: "Falar no WhatsApp",
      cta_btn_2: "Agendar Reunião",
      
      footer_desc: "One Agency. Every Protection. A agência que ajuda famílias e empresas brasileiras nos Estados Unidos a proteger tudo o que construíram.",
      foot_nav_1: "Soluções Completas",
      foot_nav_2: "A Agência",
      foot_nav_3: "Contato",
      copyright_text: "Todos os direitos reservados.",
      legal_privacy: "Política de Privacidade",
      legal_terms: "Termos de Uso"
    },
    en: {
      nav_services: "Insurance",
      nav_about: "About Us",
      nav_diff: "Why BLGI?",
      nav_video: "Welcome",
      nav_faq: "FAQ",
      nav_cta: "Schedule Consultation",
      nav_blog: "Blog (Coming Soon)",
      
      hero_eyebrow: "One Agency. Every Protection.",
      hero_title: "One Agency. Every Protection for Your Family.",
      hero_subtitle: "Life, Health, Auto, Home, Business, and International Solutions for the Brazilian community in the United States.",
      hero_cta_1: "Request a Quote",
      hero_cta_2: "Talk on WhatsApp",
      hero_cta_3: "Schedule Consultation",
      
      pillar_1_title: "Families",
      pillar_1_desc: "Life • Health • Auto • Home. Complete protection for every stage of life.",
      pillar_2_title: "Businesses",
      pillar_2_desc: "Business Insurance. Protection for your company, assets, and employees.",
      pillar_3_title: "International Solutions",
      pillar_3_desc: "Wealth management in USD and protection for global families.",
      
      partners_title: "We Work With Top US Carriers",
      
      eyebrow_about: "About Us",
      about_title: "Experts in protecting Brazilians in America.",
      about_desc: "Better Life Global Insurance (BLGI) is not just another insurance agency. We are an independent agency focused on ensuring Brazilian families and businesses in the US protect everything they've built. Our service is personalized, human, and bilingual.",
      about_bullet_1: "High-Performance Independent Agency",
      about_bullet_2: "Specialized Bilingual Support (PT/EN)",
      about_bullet_3: "Comprehensive Solutions for Individuals and Businesses",
      btn_talk: "Get to Know the Agency",
      
      eyebrow_video: "A message for you",
      video_title: "Welcome to Better Life",
      video_subtitle: "Discover how we can transform the way you protect your assets in the United States.",
      video_placeholder_text: "Your video will be added here",
      
      eyebrow_services: "Our Solutions",
      services_title: "Protection in Every Sphere",
      services_subtitle: "BLGI offers a complete portfolio, strategically designed to meet all your life and business protection needs.",
      
      srv_life_title: "Life Insurance",
      srv_life_desc: "Term Life and Indexed Universal Life (IUL). Protect those you love and accumulate wealth smartly.",
      srv_health_title: "Health Insurance",
      srv_health_desc: "Individual, family, ACA (Marketplace), and Medicare plans. Access to the best US hospitals.",
      srv_auto_title: "Auto Insurance",
      srv_auto_desc: "Comprehensive and Liability protection for your vehicle and others on US roads. Drive worry-free.",
      srv_home_title: "Home Insurance",
      srv_home_desc: "Homeowners, Condo, Renters, and Flood Insurance. Complete shielding for your biggest asset.",
      srv_business_title: "Business Insurance",
      srv_business_desc: "General Liability, Workers Comp, Commercial Auto, and more. Grow your business safely.",
      srv_intl_title: "International Solutions",
      srv_intl_desc: "Asset protection, international life insurance, and USD wealth accumulation for global families.",
      btn_more: "Learn More &rarr;",
      
      eyebrow_why: "Exclusive Advantage",
      why_title: "Why choose BLGI?",
      why_1_title: "Support in Portuguese",
      why_1_desc: "Understand US rules without language barriers.",
      why_2_title: "Local Support in Florida",
      why_2_desc: "We are close to you, understanding the local ecosystem and laws.",
      why_3_title: "Multiple Carrier Partners",
      why_3_desc: "We find the best price and coverage in a vast portfolio.",
      why_4_title: "Before and After Support",
      why_4_desc: "Humanized consulting and lifetime support, even during claims.",
      
      eyebrow_stories: "What they say about us",
      stories_title: "The voice of those who trust Better Life",
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
      
      cta_title: "Shall we build your protection plan?",
      cta_subtitle: "Our experts are ready to ensure your family's peace of mind and asset security in the US.",
      cta_btn_1: "Talk on WhatsApp",
      cta_btn_2: "Schedule Meeting",
      
      footer_desc: "One Agency. Every Protection. The agency helping Brazilian families and businesses in the US protect everything they've built.",
      foot_nav_1: "Complete Solutions",
      foot_nav_2: "The Agency",
      foot_nav_3: "Contact",
      copyright_text: "All rights reserved.",
      legal_privacy: "Privacy Policy",
      legal_terms: "Terms of Use"
    }
  };

  const langButtons = document.querySelectorAll('.lang-btn');
  const i18nElements = document.querySelectorAll('[data-i18n]');

  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      langButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      const lang = e.target.getAttribute('data-lang');
      
      i18nElements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
          el.innerHTML = translations[lang][key];
        }
      });
    });
  });
});
