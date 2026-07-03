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
     5. Bilingual Implementation (PT / EN)
     ========================================== */
  const translations = {
    pt: {
      nav_solutions: "Soluções",
      nav_philosophy: "A Estratégia",
      nav_knowledge: "Conhecimento",
      nav_contact: "Contato",
      nav_cta: "Consultoria Privada",
      
      hero_title: "A sua vida nos Estados Unidos exige uma proteção à altura do seu esforço.",
      hero_subtitle: "Como brasileiros, entendemos o valor das suas conquistas na América. Estruturamos a blindagem exata para a sua família, patrimônio e negócios.",
      hero_cta_1: "Agendar Análise via WhatsApp",
      hero_cta_2: "Entender a Metodologia",
      
      eyebrow_philosophy: "Nossa Filosofia",
      philosophy_title: "A proteção não é um produto. É uma arquitetura de longo prazo.",
      philosophy_text_1: "Compreendemos que a sua trajetória nos Estados Unidos envolveu renúncias e construções significativas. Nosso papel não é comercializar apólices soltas, mas atuar como arquitetos da sua segurança patrimonial e familiar, com profundo entendimento das leis americanas.",
      philosophy_text_2: "Trabalhamos com o rigor de um <em>Family Office</em>, alinhando saúde, vida, responsabilidade civil e estruturação internacional de forma coesa e blindada.",
      
      counter_1: "Anos de Expertise Global",
      counter_2: "Famílias Protegidas",
      counter_3: "Atendimento Confidencial",
      
      eyebrow_method: "Metodologia",
      method_title: "A Jornada da Estruturação",
      step_1_title: "1. Diagnóstico e Realidade",
      step_1_desc: "Conhecemos profundamente a sua estrutura familiar, imigratória e patrimonial atual, identificando pontos de exposição e riscos não calculados.",
      step_2_title: "2. Arquitetura da Estratégia",
      step_2_desc: "Desenhamos um plano de blindagem coeso, cruzando necessidades de saúde, responsabilidade civil e planejamento de sucessão e vida.",
      step_3_title: "3. Curadoria de Soluções",
      step_3_desc: "Selecionamos as melhores seguradoras e instrumentos financeiros do mercado americano e internacional para executar o planejamento aprovado.",
      step_4_title: "4. Acompanhamento Contínuo",
      step_4_desc: "Sua vida muda e sua estratégia também deve evoluir. Mantemos revisões periódicas para garantir que o plano permaneça eficiente ao longo dos anos.",
      
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
      discover: "Descobrir Detalhes &rarr;",
      
      eyebrow_why: "Diferenciais",
      why_title: "A excelência na gestão de riscos",
      why_desc: "Nós elevamos o padrão de atendimento para brasileiros no exterior, entregando precisão técnica com profundo respeito à sua cultura e idioma.",
      diff_1_title: "Fluência Bicultural",
      diff_1_desc: "Aconselhamento integral em Português e Inglês, traduzindo complexidades jurídicas americanas para a sua clareza absoluta.",
      diff_2_title: "Independência Estratégica",
      diff_2_desc: "Não representamos uma única instituição. Acessamos o mercado de forma imparcial para selecionar o que é matematicamente melhor para você.",
      diff_3_title: "Serviço Concierge",
      diff_3_desc: "Nossa relação começa, não termina, após a assinatura. Cuidamos de sinistros, renovações e auditorias anuais em seu nome.",
      
      eyebrow_stories: "Estudos de Caso",
      stories_title: "O impacto de uma proteção bem estruturada",
      story_1_text: "Como imigrantes, tínhamos muitas dúvidas sobre a real proteção do nosso patrimônio nos EUA. A Better Life nos desenhou uma estratégia clara que uniu o seguro da empresa à proteção familiar. Primeira vez que sentimos verdadeira segurança.",
      story_1_author: "— Carlos e Marina Souza, Flórida",
      story_2_text: "A estruturação do seguro de vida e de responsabilidade civil foi conduzida com um nível de sofisticação que eu só via em grandes bancos. Ter especialistas que entendem as duas culturas fez toda a diferença.",
      story_2_author: "— Dr. Fernando Almeida, Nova York",
      story_3_text: "A transição do meu plano de saúde foi perfeita. Eles me explicaram cada termo técnico do Medicare e ACA com uma paciência e domínio que me deram total tranquilidade para tomar a decisão.",
      story_3_author: "— Camila Rodrigues, Texas",

      eyebrow_faq: "Perguntas Frequentes",
      faq_title: "Respostas para a sua tranquilidade",
      faq_1_q: "Preciso ter Green Card para contratar um seguro de vida ou saúde nos EUA?",
      faq_1_a: "Não necessariamente. Existem diversas opções de seguros de saúde e vida formatadas para residentes temporários, estudantes e profissionais com vistos de trabalho. Analisamos seu status imigratório para encontrar a solução adequada.",
      faq_2_q: "Como funciona a consulta inicial com a Better Life Global?",
      faq_2_a: "É um diálogo confidencial e sem compromisso. Entendemos a estrutura da sua família, seu momento financeiro e seus objetivos nos EUA. A partir daí, desenhamos a arquitetura de proteção ideal.",
      faq_3_q: "Vocês cobram honorários pela consultoria de seguros?",
      faq_3_a: "Na maioria dos casos, não cobramos honorários diretos do cliente para a estruturação e emissão das apólices, pois somos remunerados pelas próprias instituições financeiras e seguradoras parceiras.",
      faq_4_q: "Já tenho seguro pelo meu empregador. Preciso de um plano complementar?",
      faq_4_a: "Muitas vezes, os benefícios corporativos não cobrem sua família adequadamente ou deixam de existir se você sair da empresa. Um plano suplementar ou um seguro de vida independente garante que sua proteção nunca fique à mercê de um vínculo empregatício.",
      faq_5_q: "Qual é a diferença entre trabalhar com a BLGI e comprar direto da seguradora?",
      faq_5_a: "Comprando direto, você se adapta ao produto deles. Com a BLGI, nós representamos você perante dezenas de seguradoras, escolhendo a melhor opção e traduzindo os contratos de forma isenta, sempre com foco no seu interesse.",
      
      cta_title: "Um diálogo sobre o seu legado.",
      cta_subtitle: "Agende uma consulta privada via WhatsApp para avaliarmos a sua atual exposição a riscos e desenharmos o futuro da sua proteção.",
      cta_btn: "Iniciar Diálogo Confidencial",
      
      footer_desc: "Consultoria patrimonial e proteção internacional para famílias e empresas de excelência.",
      foot_nav_1: "A Instituição",
      foot_link_about: "Sobre a Instituição",
      foot_link_philosophy: "Nossa Filosofia",
      foot_link_clients: "Quem Atendemos",
      foot_link_aftersales: "Acompanhamento e Pós",
      foot_nav_2: "Eixos de Proteção",
      foot_nav_3: "Contato Privado",
      legal_terms: "Termos de Uso",
      legal_privacy: "Privacidade & Confidencialidade",
      copyright_text: "Todos os direitos reservados."
    },
    en: {
      nav_solutions: "Solutions",
      nav_philosophy: "The Strategy",
      nav_knowledge: "Insights",
      nav_contact: "Contact",
      nav_cta: "Private Consultation",
      
      hero_title: "Your life in the United States demands protection worthy of your effort.",
      hero_subtitle: "As Brazilians, we understand the value of your achievements in America. We structure the exact shield for your family, wealth, and business.",
      hero_cta_1: "Schedule Analysis via WhatsApp",
      hero_cta_2: "Understand Our Methodology",
      
      eyebrow_philosophy: "Our Philosophy",
      philosophy_title: "Protection is not a product. It's a long-term architecture.",
      philosophy_text_1: "We understand that your journey in the US involved significant sacrifices and achievements. Our role is not to sell loose policies, but to act as architects of your wealth and family security, with a deep understanding of US laws.",
      philosophy_text_2: "We operate with the rigor of a <em>Family Office</em>, cohesively aligning health, life, liability, and international structuring into a bulletproof plan.",
      
      counter_1: "Years of Global Expertise",
      counter_2: "Families Protected",
      counter_3: "Confidential Service",
      
      eyebrow_method: "Methodology",
      method_title: "The Structuring Journey",
      step_1_title: "1. Diagnosis & Reality",
      step_1_desc: "We deeply understand your current family, immigration, and wealth structure, identifying exposure points and uncalculated risks.",
      step_2_title: "2. Strategy Architecture",
      step_2_desc: "We design a cohesive shielding plan, intersecting health needs, civil liability, and life/succession planning.",
      step_3_title: "3. Solution Curation",
      step_3_desc: "We select the best carriers and financial instruments from the US and international markets to execute the approved plan.",
      step_4_title: "4. Continuous Monitoring",
      step_4_desc: "As your life changes, your strategy must evolve. We hold periodic reviews to ensure the plan remains efficient over the years.",
      
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
      discover: "Discover Details &rarr;",
      
      eyebrow_why: "Differentiators",
      why_title: "Excellence in risk management",
      why_desc: "We elevate the standard of care for internationals, delivering technical precision with deep respect for your culture and language.",
      diff_1_title: "Bicultural Fluency",
      diff_1_desc: "Comprehensive advice in Portuguese and English, translating complex US legalities into absolute clarity for you.",
      diff_2_title: "Strategic Independence",
      diff_2_desc: "We don't represent a single institution. We access the market impartially to select what is mathematically best for you.",
      diff_3_title: "Concierge Service",
      diff_3_desc: "Our relationship begins, not ends, after the signature. We handle claims, renewals, and annual audits on your behalf.",
      
      eyebrow_stories: "Case Studies",
      stories_title: "The impact of well-structured protection",
      story_1_text: "As immigrants, we had many doubts about the real protection of our assets in the US. Better Life designed a clear strategy that united company insurance with family protection. First time we felt true security.",
      story_1_author: "— Carlos and Marina Souza, Florida",
      story_2_text: "The structuring of life and liability insurance was conducted with a level of sophistication I had only seen in major banks. Having experts who understand both cultures made all the difference.",
      story_2_author: "— Dr. Fernando Almeida, New York",
      story_3_text: "The transition of my health plan was perfect. They explained every technical term of Medicare and ACA with patience and mastery that gave me total peace of mind to make the decision.",
      story_3_author: "— Camila Rodrigues, Texas",

      eyebrow_faq: "Frequently Asked Questions",
      faq_title: "Answers for your peace of mind",
      faq_1_q: "Do I need a Green Card to purchase life or health insurance in the US?",
      faq_1_a: "Not necessarily. There are several health and life insurance options formatted for temporary residents, students, and professionals on work visas. We analyze your immigration status to find the appropriate solution.",
      faq_2_q: "How does the initial consultation with Better Life Global work?",
      faq_2_a: "It's a confidential, no-obligation dialogue. We understand your family structure, your financial moment, and your goals in the US. From there, we design the ideal protection architecture.",
      faq_3_q: "Do you charge fees for insurance consulting?",
      faq_3_a: "In most cases, we do not charge direct fees from the client for structuring and issuing policies, as we are compensated by the partner financial institutions and insurance carriers themselves.",
      faq_4_q: "I already have insurance through my employer. Do I need a supplemental plan?",
      faq_4_a: "Often, corporate benefits do not adequately cover your family or cease to exist if you leave the company. A supplemental plan or independent life insurance ensures your protection is never at the mercy of an employment link.",
      faq_5_q: "What is the difference between working with BLGI and buying directly from the carrier?",
      faq_5_a: "Buying directly, you adapt to their product. With BLGI, we represent you before dozens of carriers, choosing the best option and translating the contracts impartially, always focusing on your best interest.",
      
      cta_title: "A dialogue about your legacy.",
      cta_subtitle: "Schedule a private consultation via WhatsApp to evaluate your current risk exposure and design the future of your protection.",
      cta_btn: "Start Confidential Dialogue",
      
      footer_desc: "Wealth consulting and international protection for families and businesses of excellence.",
      foot_nav_1: "The Institution",
      foot_link_about: "About the Institution",
      foot_link_philosophy: "Our Philosophy",
      foot_link_clients: "Who We Serve",
      foot_link_aftersales: "Monitoring & After-Sales",
      foot_nav_2: "Protection Pillars",
      foot_nav_3: "Private Contact",
      legal_terms: "Terms of Use",
      legal_privacy: "Privacy & Confidentiality",
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
