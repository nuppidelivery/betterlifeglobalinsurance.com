// main.js - Premium Motion Initialization
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. Premium Header Scroll Effect
     ========================================== */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
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
     3. Premium Scroll Reveal (Staggered)
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Handle staggered children if they exist
        const staggers = entry.target.querySelectorAll('.stagger-item');
        if (staggers.length > 0) {
          staggers.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('active');
            }, index * 100); // 100ms delay between elements
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px"
  });

  revealElements.forEach(el => {
    // Check if it's the hero, animate it immediately instead of waiting for scroll
    if (el.classList.contains('hero')) {
      setTimeout(() => {
        el.classList.add('active');
        const staggers = el.querySelectorAll('.stagger-item');
        staggers.forEach((staggerEl, index) => {
          setTimeout(() => {
            staggerEl.classList.add('active');
          }, index * 150);
        });
      }, 100);
    } else {
      revealObserver.observe(el);
    }
  });

  /* ==========================================
     3.5 Parallax Effect (Hero Image)
     ========================================== */
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      if (scrollPos < window.innerHeight) {
        // Move image down slightly as we scroll down (parallax)
        heroImage.style.transform = `translateY(${scrollPos * 0.15}px)`;
      }
    }, { passive: true });
  }

  /* ==========================================
     4. Counters Animation
     ========================================== */
  const counters = document.querySelectorAll('.counter-number span');
  const speed = 200;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const inc = target / speed;
          
          const updateCount = () => {
            count += inc;
            if (count < target) {
              counter.innerText = Math.ceil(count);
              requestAnimationFrame(updateCount);
            } else {
              counter.innerText = target;
            }
          };
          requestAnimationFrame(updateCount);
        }, index * 150); // Stagger counters
        observer.unobserve(entry.target);
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
        const isActive = item.classList.contains('active');
        
        // Close all
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const content = otherItem.querySelector('.faq-content');
          if (content) content.style.maxHeight = null;
        });

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
          const content = item.querySelector('.faq-content');
          if (content) {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        }
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
      nav_cta: "FALE CONOSCO",
      
      hero_eyebrow: "One Agency. Every Protection.",
      hero_title: "Toda proteção que sua família precisa",
      hero_subtitle: "Seguro de Vida, Saúde, Carro, Casa, Negócios e Soluções Internacionais para a comunidade brasileira.",
      hero_cta_1: "Solicitar Cotação",
      hero_cta_2: "Falar no WhatsApp",
      
      badge_secure: "Proteção Total",
      badge_expert: "Consultoria VIP",
      
      hero_help: "COMO PODEMOS TE AJUDAR?",
      quick_saude: "SAÚDE",
      quick_vida: "VIDA",
      quick_carro: "AUTO",
      quick_casa: "RESIDÊNCIA",
      quick_empresa: "EMPRESAS",
      quick_inter: "INTERNACIONAL",
      
      auth_fam: "Famílias Protegidas",
      auth_years: "Anos de Mercado",
      auth_states: "Estados Atendidos",
      auth_lang: "Atendimento em Português",
      
      eyebrow_import: "Visão de Futuro",
      import_check_1: "Garantimos o futuro dos seus filhos.",
      import_check_2: "Protegemos o seu patrimônio e a casa dos seus sonhos.",
      import_check_3: "Blindamos os seus negócios e a sua empresa.",
      import_check_4: "Preservamos o seu legado em momentos críticos.",
      import_check_conc: "Você vive sua vida. Nós cuidamos da sua proteção.",
      import_title: "ESTAMOS AO SEU LADO",
      btn_schedule: "Agendar Diagnóstico Gratuito",
      
      eyebrow_comp: "O Preço da Escolha",
      comp_title: "O que acontece nos momentos críticos?",
      comp_bad_title: "O Caminho Desprotegido",
      comp_bad_1: "Contas médicas astronômicas em caso de emergência (falência pessoal).",
      comp_bad_2: "Riscos de processos judiciais esgotarem os bens da sua empresa ou família.",
      comp_bad_3: "Dificuldade na resolução de problemas diretos com a seguradora.",
      comp_bad_4: "Barreira linguística e letras miúdas causando negação de cobertura no sinistro.",
      comp_good_title: "COM A PROTEÇÃO DA BETTER LIFE",
      comp_good_1: "Apólices desenhadas estrategicamente para blindar suas finanças.",
      comp_good_2: "Tranquilidade para empreender sabendo que seus bens estão segregados e seguros.",
      comp_good_3: "Toda a documentação fiscal e burocrática alinhada e em conformidade.",
      comp_good_4: "Atendimento humanizado em português no WhatsApp na hora exata em que você precisar.",
      
      eyebrow_about: "Quem Somos",
      about_title: "Especialistas em proteger brasileiros na América.",
      about_desc: "A Better Life Global Insurance existe para suprir a maior necessidade dos imigrantes: entender com clareza o COMPLEXO sistema DE SEGUROS americano.",
      about_bullet_1: "Proteção completa para famílias, empresas e patrimônio.",
      about_bullet_2: "Atendimento consultivo em português e inglês.",
      about_bullet_3: "As melhores soluções, escolhidas entre diversas seguradoras.",
      about_bullet_4: "Relacionamentos de longo prazo baseados em confiança e cuidado.",
      
      eyebrow_video: "Uma mensagem para você",
      video_title: "Bem-vindo à Better Life",
      video_subtitle: "Descubra como podemos transformar a maneira como você protege seu patrimônio nos Estados Unidos.",
      video_placeholder_text: "O seu vídeo será adicionado aqui",
      
      eyebrow_services: "Nossas Soluções",
      services_title: "Todas as proteções que você precisa em um só lugar",
      services_subtitle: "Um portfólio gigantesco desenhado estrategicamente para suprir as necessidades de proteção da vida e dos negócios da comunidade brasileira.",
      
      srv_1: "Seguro de vida",
      srv_desc_1: "Segurança financeira para quem mais importa.",
      srv_2: "Seguro saúde",
      srv_desc_2: "Mais acesso à saúde. Mais tranquilidade para sua família.",
      srv_3: "Seguro de carro",
      srv_desc_3: "Proteção para cada quilômetro da sua jornada.",
      srv_4: "Seguro de casa",
      srv_desc_4: "Proteja o patrimônio que você conquistou com tanto esforço.",
      srv_5: "Seguro para negócios",
      srv_desc_5: "Proteção inteligente para empresas que querem crescer com segurança.",
      srv_6: "Soluções Internacionais",
      srv_desc_6: "Estratégias globais para proteger seu patrimônio e seu legado.",
      srv_7: "Seguro Viagem",
      srv_desc_7: "Viaje com a segurança de estar protegido onde quer que você esteja.",
      srv_8: "Seguro Dental",
      srv_desc_8: "Cuidados preventivos para manter o sorriso e a saúde em dia.",
      srv_9: "Seguro para Pets",
      srv_desc_9: "Proteção para cuidar de quem faz parte da sua família.",
      
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
      lib_1_title: "Seguro de vida com benefício em vida",
      lib_1_desc: "Como acumular patrimônio em dólar e proteger sua família ao mesmo tempo.",
      lib_2_title: "Opções de seguro saúde",
      lib_2_desc: "Tudo que o imigrante precisa saber para não pagar multas no Tax Return.",
      lib_3_title: "Soluções de seguros para empresas",
      lib_3_desc: "General Liability e Workers Comp. Não perca sua empresa por um processo.",
      lib_btn: "Baixar PDF",
      learn_more: "Saiba mais",
      
      eyebrow_stories: "Depoimentos",
      stories_title: "Clientes Better Life",
      
      eyebrow_faq: "Esclareça suas dúvidas",
      faq_title: "Perguntas Frequentes",
      faq_1_q: "Como funciona o seguro saúde nos EUA (Obamacare)?",
      faq_1_a: "O Affordable Care Act (Obamacare) oferece subsídios do governo baseados na sua renda estimada. Se qualificado, você pode ter acesso a excelentes planos de saúde pagando prêmios muito baixos ou até zero, evitando multas e protegendo sua família de altos custos médicos.",
      faq_2_q: "O seguro de vida nos EUA realmente serve como investimento?",
      faq_2_a: "Sim. Apólices como o IUL (Indexed Universal Life) permitem que uma parte do seu prêmio seja alocada em índices do mercado, construindo um valor em dinheiro (Cash Value) que cresce livre de impostos e pode ser usado em vida para aposentadoria ou emergências.",
      faq_3_q: "Se eu alugar uma casa, preciso de seguro residencial?",
      faq_3_a: "É altamente recomendado o Seguro para Inquilinos (Renters Insurance). Ele protege seus pertences pessoais contra roubo, incêndio e danos, além de oferecer cobertura de responsabilidade civil (liability) caso alguém se machuque dentro da propriedade que você aluga.",
      faq_4_q: "Qual a diferença entre seguro de carro no Brasil e nos EUA?",
      faq_4_a: "Nos EUA, o foco principal é a Responsabilidade Civil (Liability), que é obrigatória por lei e protege contra danos físicos ou materiais causados a terceiros. As coberturas Comprehensive e Collision (que protegem o seu carro) são adicionais, sendo vitais para a sua proteção total.",
      faq_5_q: "Tenho uma empresa nos EUA. Quais seguros são obrigatórios?",
      faq_5_a: "A maioria dos estados exige o Workers' Compensation se você tiver funcionários. Além disso, o General Liability é essencial para cobrir danos a terceiros e proteger o patrimônio da sua empresa contra ações judiciais, mesmo que não seja exigido por lei.",
      faq_6_q: "Como funciona a proteção para Pets?",
      faq_6_a: "O Seguro para Pets cobre desde consultas de rotina e vacinas até cirurgias complexas e tratamentos de doenças crônicas, reembolsando grande parte das despesas veterinárias, para que você nunca precise escolher entre a vida do seu pet e o seu bolso.",
      
      eyebrow_map: "Nossa Localização",
      map_title: "Venha tomar um café conosco",
      
      cta_title: "Vamos construir seu plano de proteção?",
      cta_btn_1: "Conversar com especialista por WhatsApp",
      
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
      nav_cta: "TALK TO US",
      
      hero_eyebrow: "One Agency. Every Protection.",
      hero_title: "All the protection your family needs",
      hero_subtitle: "Life, Health, Auto, Home, Business, and International Solutions...",
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
      
      eyebrow_import: "Vision for the Future",
      import_check_1: "We secure your children's future.",
      import_check_2: "We protect your assets and your dream home.",
      import_check_3: "We shield your business and your company.",
      import_check_4: "We preserve your legacy in critical moments.",
      import_check_conc: "You live your life. We take care of your protection.",
      import_title: "WE ARE BY YOUR SIDE",
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
          if (el.tagName === 'LABEL' || el.tagName === 'SPAN' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'H4' || el.tagName === 'H5' || el.tagName === 'P' || el.tagName === 'A' || el.tagName === 'BUTTON' || el.tagName === 'OPTION') {
            el.innerHTML = translations[lang][key];
          }
        }
      });
    });
  }
});
