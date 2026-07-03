// main.js - Initialization
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
     4. Number Counter Animation (Once)
     ========================================== */
  const counters = document.querySelectorAll('.count');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = 0;
        
        const timer = setInterval(() => {
          current += Math.ceil(target / 100);
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          entry.target.innerText = current;
        }, stepTime);
        
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
        // Toggle the clicked item
        item.classList.toggle('active');
        // Close others (optional, keeps UI clean)
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
      nav_solutions: "Soluções",
      nav_philosophy: "Metodologia",
      nav_faq: "FAQ",
      nav_contact: "Contato",
      nav_cta: "Atendimento Exclusivo",
      
      hero_title: "A arquitetura completa da sua proteção nos Estados Unidos.",
      hero_subtitle: "Blindagem patrimonial, saúde familiar e continuidade de negócios estruturada por especialistas para brasileiros na América.",
      hero_cta_1: "Falar com Especialista Agora",
      hero_cta_2: "Conhecer o Método",
      
      eyebrow_philosophy: "Nossa Filosofia",
      philosophy_title: "A proteção não é um produto. É uma arquitetura de longo prazo.",
      philosophy_text_1: "Compreendemos que a sua trajetória nos Estados Unidos envolveu renúncias e construções significativas. Nosso papel não é comercializar apólices soltas, mas atuar como arquitetos da sua segurança patrimonial e familiar, com profundo entendimento das leis americanas.",
      philosophy_text_2: "Trabalhamos com o rigor de um <em>Family Office</em>, alinhando saúde, vida, responsabilidade civil e estruturação internacional de forma coesa e blindada.",
      
      counter_1: "Anos de Expertise Global",
      counter_2: "Famílias Protegidas",
      counter_3: "Atendimento Confidencial",
      
      eyebrow_method: "Metodologia",
      method_title: "A Jornada da Estruturação",
      step_1_title: "1. Diagnóstico",
      step_1_desc: "Conhecemos profundamente a sua estrutura familiar e patrimonial atual, identificando pontos de exposição.",
      step_2_title: "2. Estratégia",
      step_2_desc: "Desenhamos um plano coeso, cruzando necessidades de saúde, responsabilidade civil e vida.",
      step_3_title: "3. Curadoria",
      step_3_desc: "Selecionamos as melhores seguradoras e instrumentos financeiros do mercado americano.",
      step_4_title: "4. Acompanhamento",
      step_4_desc: "Mantemos revisões periódicas para garantir que o plano permaneça eficiente ao longo dos anos.",
      
      eyebrow_protect: "Áreas de Atuação",
      protect_title: "O que nós protegemos",
      protect_subtitle: "Eixos fundamentais para garantir a preservação do que você construiu.",
      
      sol_family_title: "Família & Indivíduo",
      sol_family_desc: "Estruturação de planos de saúde privados (ACA, Medicare, Suplementares) e Seguros de Vida focados em preservação de padrão e sucessão.",
      sol_wealth_title: "Patrimônio",
      sol_wealth_desc: "Blindagem de ativos através de apólices residenciais de alto padrão, seguros automotivos premium e responsabilidade civil pessoal (Umbrella).",
      sol_corp_title: "Empresas & Negócios",
      sol_corp_desc: "Gestão de riscos para operações comerciais, cobrindo responsabilidade civil corporativa (General Liability), propriedades e sucessão de sócios.",
      sol_intl_title: "Soluções Internacionais",
      sol_intl_desc: "Seguros de viagem abrangentes, proteção para estudantes no exterior e estratégias globais para residentes multinacionais.",
      
      eyebrow_stories: "Relatos de Sucesso",
      stories_title: "A proteção na prática",
      story_1_text: "Tínhamos muitas dúvidas sobre a real proteção do patrimônio. A Better Life uniu o seguro da empresa à proteção familiar perfeitamente.",
      story_1_author: "— Carlos e Marina Souza, Flórida",
      story_2_text: "A estruturação do seguro de vida e civil teve uma sofisticação de grandes bancos. Entender as duas culturas fez toda a diferença.",
      story_2_author: "— Dr. Fernando Almeida, Nova York",
      story_3_text: "Explicaram cada detalhe do Medicare com um domínio e agilidade incríveis, me dando a certeza de estar no caminho certo.",
      story_3_author: "— Camila Rodrigues, Texas",
      story_4_text: "Como investidor imobiliário, precisava de blindagem robusta (Umbrella). O atendimento foi impecável e muito prático pelo WhatsApp.",
      story_4_author: "— Roberto Vilela, Orlando",
      story_5_text: "Ter alguém que gerencia meu plano ACA e meu seguro automotivo com a mesma excelência economizou um tempo que eu não tinha.",
      story_5_author: "— Luciana Mendes, Califórnia",

      eyebrow_faq: "Perguntas Frequentes",
      faq_title: "Clareza para suas decisões",
      faq_1_q: "Preciso ter Green Card para contratar um seguro nos EUA?",
      faq_1_a: "Não necessariamente. Existem diversas opções de seguros de saúde e vida formatadas para residentes temporários, estudantes e profissionais com vistos de trabalho.",
      faq_2_q: "Como funciona o atendimento pelo WhatsApp?",
      faq_2_a: "De forma rápida e prática. Nossa equipe está pronta para entender sua necessidade em poucos minutos e lhe guiar exatamente para a solução e cotação adequadas, sem perda de tempo.",
      faq_3_q: "Vocês cobram honorários pela consultoria?",
      faq_3_a: "Na imensa maioria dos seguros (como saúde e vida), não cobramos honorários diretos do cliente, pois somos remunerados pelas próprias instituições financeiras e seguradoras.",
      faq_4_q: "O que difere a Better Life da seguradora direta?",
      faq_4_a: "Comprando direto, você se adapta ao produto daquela empresa. Nós acessamos todo o mercado, selecionando imparcialmente a apólice que melhor blinda o seu perfil específico.",
      faq_5_q: "Como funcionam as renovações e sinistros?",
      faq_5_a: "Nós assumimos o suporte contínuo. Lidamos com os processos burocráticos e auditorias em seu nome, permitindo que você foque apenas no seu negócio e família.",
      
      cta_title: "Um diálogo direto e objetivo.",
      cta_subtitle: "Envie uma mensagem e nossa equipe lhe responderá prontamente com a direção exata para a sua proteção.",
      cta_btn: "Falar com Especialista Agora",
      
      footer_desc: "Consultoria patrimonial e proteção internacional de excelência.",
      foot_nav_1: "Navegação",
      foot_nav_3: "Contato Direto",
      copyright_text: "Todos os direitos reservados."
    },
    en: {
      nav_solutions: "Solutions",
      nav_philosophy: "Methodology",
      nav_faq: "FAQ",
      nav_contact: "Contact",
      nav_cta: "Exclusive Service",
      
      hero_title: "The complete architecture of your protection in the US.",
      hero_subtitle: "Wealth shielding, family health, and business continuity structured by experts for internationals in America.",
      hero_cta_1: "Speak with an Expert Now",
      hero_cta_2: "Discover the Method",
      
      eyebrow_philosophy: "Our Philosophy",
      philosophy_title: "Protection is not a product. It's a long-term architecture.",
      philosophy_text_1: "We understand that your journey in the US involved significant sacrifices and achievements. Our role is not to sell loose policies, but to act as architects of your wealth and family security, with a deep understanding of US laws.",
      philosophy_text_2: "We operate with the rigor of a <em>Family Office</em>, cohesively aligning health, life, liability, and international structuring into a bulletproof plan.",
      
      counter_1: "Years of Global Expertise",
      counter_2: "Families Protected",
      counter_3: "Confidential Service",
      
      eyebrow_method: "Methodology",
      method_title: "The Structuring Journey",
      step_1_title: "1. Diagnosis",
      step_1_desc: "We deeply understand your current family and wealth structure, identifying exposure points.",
      step_2_title: "2. Strategy",
      step_2_desc: "We design a cohesive shielding plan, intersecting health needs, civil liability, and life.",
      step_3_title: "3. Curation",
      step_3_desc: "We select the best carriers and financial instruments from the US market.",
      step_4_title: "4. Monitoring",
      step_4_desc: "We hold periodic reviews to ensure the plan remains efficient over the years.",
      
      eyebrow_protect: "Areas of Expertise",
      protect_title: "What we protect",
      protect_subtitle: "Fundamental pillars to ensure the preservation of what you've built.",
      
      sol_family_title: "Family & Individual",
      sol_family_desc: "Structuring private health plans (ACA, Medicare, Supplemental) and Life Insurance focused on lifestyle preservation and succession.",
      sol_wealth_title: "Wealth",
      sol_wealth_desc: "Asset shielding through high-end residential policies, premium auto insurance, and personal liability (Umbrella).",
      sol_corp_title: "Corporate & Business",
      sol_corp_desc: "Risk management for commercial operations, covering corporate civil liability (General Liability), property, and partner succession.",
      sol_intl_title: "International Solutions",
      sol_intl_desc: "Comprehensive travel insurance, protection for students abroad, and global strategies for multinational residents.",
      
      eyebrow_stories: "Success Stories",
      stories_title: "Protection in practice",
      story_1_text: "We had many doubts about the real protection of our assets. Better Life united company insurance with family protection perfectly.",
      story_1_author: "— Carlos and Marina Souza, Florida",
      story_2_text: "The structuring of life and liability insurance had the sophistication of major banks. Understanding both cultures made all the difference.",
      story_2_author: "— Dr. Fernando Almeida, New York",
      story_3_text: "They explained every detail of Medicare with incredible mastery and agility, giving me the certainty of being on the right path.",
      story_3_author: "— Camila Rodrigues, Texas",
      story_4_text: "As a real estate investor, I needed robust shielding (Umbrella). The service was impeccable and very practical via WhatsApp.",
      story_4_author: "— Roberto Vilela, Orlando",
      story_5_text: "Having someone manage my ACA plan and auto insurance with the same excellence saved me time I didn't have.",
      story_5_author: "— Luciana Mendes, California",

      eyebrow_faq: "Frequently Asked Questions",
      faq_title: "Clarity for your decisions",
      faq_1_q: "Do I need a Green Card to purchase insurance in the US?",
      faq_1_a: "Not necessarily. There are several health and life insurance options formatted for temporary residents, students, and professionals on work visas.",
      faq_2_q: "How does the WhatsApp service work?",
      faq_2_a: "Fast and practical. Our team is ready to understand your needs in a few minutes and guide you exactly to the appropriate solution and quote, without wasting time.",
      faq_3_q: "Do you charge fees for consulting?",
      faq_3_a: "For the vast majority of insurances (like health and life), we do not charge direct fees from the client, as we are compensated by the financial institutions and carriers themselves.",
      faq_4_q: "What differentiates Better Life from a direct carrier?",
      faq_4_a: "Buying directly, you adapt to that company's product. We access the entire market, impartially selecting the policy that best shields your specific profile.",
      faq_5_q: "How do renewals and claims work?",
      faq_5_a: "We take over continuous support. We deal with bureaucratic processes and audits on your behalf, allowing you to focus only on your business and family.",
      
      cta_title: "A direct and objective dialogue.",
      cta_subtitle: "Send a message and our team will promptly respond with the exact direction for your protection.",
      cta_btn: "Speak with an Expert Now",
      
      footer_desc: "Wealth consulting and international protection of excellence.",
      foot_nav_1: "Navigation",
      foot_nav_3: "Direct Contact",
      copyright_text: "All rights reserved."
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
