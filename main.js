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
        // Toggle current item
        item.classList.toggle('active');
        
        // Close other items
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
      nav_services: "Serviços",
      nav_diff: "Diferenciais",
      nav_how: "Como Funciona",
      nav_faq: "FAQ",
      nav_cta: "Solicitar Cotação",
      
      hero_title: "A Segurança que Sua Família e Patrimônio Merecem nos Estados Unidos",
      hero_subtitle: "Especialistas em seguros para brasileiros. Soluções completas em saúde, vida, residência e negócios com atendimento 100% em português.",
      hero_cta_1: "Quero uma Cotação Gratuita",
      hero_cta_2: "Falar no WhatsApp",
      
      cred_1: "Atendimento em Português",
      cred_2: "Cotação Gratuita e Rápida",
      cred_3: "Consultoria Especializada",
      cred_4: "Processo Sem Burocracia",
      cred_5: "Contratação 100% Online",
      
      eyebrow_services: "Nossas Soluções",
      services_title: "Proteção Completa para Cada Etapa da Sua Vida",
      srv_1_title: "Seguro Saúde (ACA & Medicare)",
      srv_1_desc: "Acesso aos melhores hospitais americanos sem surpresas financeiras. Desenhamos o plano ideal para o seu perfil e status imigratório.",
      srv_2_title: "Seguro Automotivo",
      srv_2_desc: "Cobertura abrangente para proteger você, seu veículo e terceiros no trânsito americano, garantindo paz de espírito ao volante.",
      srv_3_title: "Seguro Residencial",
      srv_3_desc: "Blindagem contra desastres naturais, roubos e acidentes domésticos. Proteja seu maior investimento nos EUA com coberturas robustas.",
      srv_4_title: "Seguro de Vida",
      srv_4_desc: "Garantia de estabilidade financeira para quem você mais ama. Planejamento sucessório inteligente e capital protegido contra imprevistos.",
      srv_5_title: "Seguro Empresarial",
      srv_5_desc: "Proteção de responsabilidade civil corporativa e bens comerciais. Foque no crescimento da sua empresa enquanto gerenciamos os riscos.",
      srv_6_title: "Previdência Privada",
      srv_6_desc: "Estruture um futuro tranquilo com rentabilidade segura no mercado americano. Soluções personalizadas para a construção de longo prazo.",
      btn_quote: "Cotar Seguro &rarr;",
      
      eyebrow_diff: "Por que nos escolher",
      diff_title: "Elevamos o Padrão do Mercado de Seguros",
      diff_desc: "Não somos apenas corretores; somos seus consultores de confiança nos Estados Unidos, garantindo clareza total em contratos americanos complexos.",
      diff_1_title: "Independência Real",
      diff_1_desc: "Avaliamos mais de 50 seguradoras para encontrar a apólice que beneficia você, não a instituição financeira.",
      diff_2_title: "Tradução Cultural",
      diff_2_desc: "Descomplicamos o jargão americano. Você assina entendendo 100% de cada cláusula e cobertura na sua língua nativa.",
      diff_3_title: "Gestão Contínua",
      diff_3_desc: "Em caso de sinistros, acidentes ou dúvidas, nossa equipe é a sua ponte direta, resolvendo burocracias em seu nome.",
      
      eyebrow_how: "O Processo",
      how_title: "Contratação Simples em 4 Passos",
      how_1_title: "Solicite sua cotação",
      how_1_desc: "Entre em contato via WhatsApp de forma rápida e nos conte o que você deseja proteger.",
      how_2_title: "Análise de Necessidades",
      how_2_desc: "Nossa equipe entende sua realidade, riscos e orçamento em uma conversa amigável.",
      how_3_title: "Curadoria de Opções",
      how_3_desc: "Apresentamos de forma clara as melhores opções de coberturas do mercado, sem letras miúdas.",
      how_4_title: "Contrate com Segurança",
      how_4_desc: "Você assina a apólice online e passa a contar com nossa proteção e suporte permanente.",
      
      ben_1_title: "Tranquilidade Absoluta",
      ben_1_desc: "Durma sabendo que um imprevisto médico ou acidente não irá consumir as economias de uma vida inteira.",
      ben_2_title: "Economia de Tempo",
      ben_2_desc: "Não perca horas pesquisando regras americanas. Nós fazemos o trabalho pesado e entregamos a solução pronta.",
      ben_3_title: "Eficiência Financeira",
      ben_3_desc: "Evite multas fiscais (ACA penalties) e prêmios abusivos, contratando exatamente o que você precisa.",
      
      eyebrow_stories: "Depoimentos Reais",
      stories_title: "A Voz de Quem Confia na Better Life",
      story_1_text: "\"O sistema de saúde aqui sempre me assustou. A equipe da Better Life encontrou um plano perfeito para minha família, explicando tudo em português. Confiança total!\"",
      story_1_author: "— Mariana Silva, Orlando - FL",
      story_2_text: "\"Contratei o seguro do meu carro e da minha casa. A agilidade deles pelo WhatsApp e a clareza nas opções de cobertura são impressionantes. Recomendo de olhos fechados.\"",
      story_2_author: "— Ricardo Mendes, Boca Raton - FL",
      story_3_text: "\"Como dono de negócio, precisava de um General Liability rápido. Eles resolveram minha apólice no mesmo dia. Um alívio saber que tenho esse suporte.\"",
      story_3_author: "— Thiago Costa, Miami - FL",
      story_4_text: "\"Fazer um seguro de vida nos EUA parecia muito complexo. A consultoria deles traduziu as regras e hoje durmo tranquilo sabendo que meu legado está protegido.\"",
      story_4_author: "— Felipe Oliveira, Nova York - NY",
      
      eyebrow_faq: "Dúvidas Comuns",
      faq_title: "Perguntas Frequentes",
      faq_1_q: "É necessário ter Green Card para contratar seguros?",
      faq_1_a: "Não. Trabalhamos com diversas seguradoras que aceitam passaporte estrangeiro, ITIN e diversos tipos de vistos, oferecendo total proteção para imigrantes.",
      faq_2_q: "Quanto custa fazer uma cotação com vocês?",
      faq_2_a: "Absolutamente nada. A nossa consultoria e cotação são gratuitas. Nós somos remunerados diretamente pelas seguradoras quando você adquire uma apólice.",
      faq_3_q: "Como o atendimento pelo WhatsApp funciona?",
      faq_3_a: "É muito simples. Ao clicar no botão, você falará com um consultor humano em português. Ele entenderá suas necessidades e enviará as cotações diretamente por lá.",
      faq_4_q: "Se eu bater o carro, vocês me ajudam?",
      faq_4_a: "Sim! Nossa assistência de pós-venda auxilia você na abertura do sinistro, comunicação com a seguradora e orientações em português no momento que você mais precisa.",
      
      cta_title: "Não deixe o seu patrimônio desprotegido.",
      cta_subtitle: "Fale com nossa equipe agora mesmo, receba sua cotação gratuita e viva com segurança e tranquilidade nos EUA.",
      cta_btn_1: "Solicitar Cotação Gratuita",
      cta_btn_2: "Tirar Dúvida no WhatsApp",
      
      footer_desc: "A agência de seguros parceira do brasileiro nos Estados Unidos. Proteção confiável, atendimento excepcional e 100% em português.",
      foot_nav_1: "Nossos Serviços",
      foot_nav_2: "A Empresa",
      foot_nav_3: "Fale Conosco",
      copyright_text: "Todos os direitos reservados.",
      legal_privacy: "Política de Privacidade",
      legal_terms: "Termos de Uso"
    },
    en: {
      nav_services: "Services",
      nav_diff: "Differentiators",
      nav_how: "How it Works",
      nav_faq: "FAQ",
      nav_cta: "Get a Quote",
      
      hero_title: "The Security Your Family and Assets Deserve in the US",
      hero_subtitle: "Insurance experts for internationals. Comprehensive solutions in health, life, home, and business.",
      hero_cta_1: "Get a Free Quote Now",
      hero_cta_2: "Contact via WhatsApp",
      
      cred_1: "Multilingual Support",
      cred_2: "Fast & Free Quotes",
      cred_3: "Expert Consulting",
      cred_4: "Hassle-free Process",
      cred_5: "100% Online Contracting",
      
      eyebrow_services: "Our Solutions",
      services_title: "Complete Protection for Every Stage of Your Life",
      srv_1_title: "Health Insurance (ACA & Medicare)",
      srv_1_desc: "Access the best American hospitals with no financial surprises. We design the ideal plan for your profile and immigration status.",
      srv_2_title: "Auto Insurance",
      srv_2_desc: "Comprehensive coverage to protect you, your vehicle, and third parties in US traffic, ensuring peace of mind behind the wheel.",
      srv_3_title: "Home Insurance",
      srv_3_desc: "Shield against natural disasters, theft, and domestic accidents. Protect your biggest investment in the US.",
      srv_4_title: "Life Insurance",
      srv_4_desc: "Financial stability guarantee for those you love most. Smart succession planning and capital protected against the unforeseen.",
      srv_5_title: "Business Insurance",
      srv_5_desc: "Corporate liability and commercial property protection. Focus on growing your company while we manage the risks.",
      srv_6_title: "Private Retirement",
      srv_6_desc: "Structure a peaceful future with secure profitability in the American market. Customized solutions for long-term building.",
      btn_quote: "Get a Quote &rarr;",
      
      eyebrow_diff: "Why choose us",
      diff_title: "We Raise the Bar in the Insurance Market",
      diff_desc: "We aren't just brokers; we are your trusted advisors in the United States, ensuring total clarity in complex American contracts.",
      diff_1_title: "True Independence",
      diff_1_desc: "We evaluate over 50 carriers to find the policy that benefits you, not the financial institution.",
      diff_2_title: "Cultural Translation",
      diff_2_desc: "We simplify the American jargon. You sign understanding 100% of every clause and coverage.",
      diff_3_title: "Continuous Management",
      diff_3_desc: "In case of claims, accidents, or doubts, our team is your direct bridge, handling bureaucracy on your behalf.",
      
      eyebrow_how: "The Process",
      how_title: "Simple Contracting in 4 Steps",
      how_1_title: "Request a Quote",
      how_1_desc: "Contact us via WhatsApp quickly and tell us what you want to protect.",
      how_2_title: "Needs Analysis",
      how_2_desc: "Our team understands your reality, risks, and budget in a friendly conversation.",
      how_3_title: "Curated Options",
      how_3_desc: "We clearly present the best coverage options in the market, with no fine print.",
      how_4_title: "Contract Securely",
      how_4_desc: "You sign the policy online and begin to rely on our permanent protection and support.",
      
      ben_1_title: "Absolute Peace of Mind",
      ben_1_desc: "Sleep knowing that a medical unforeseen event or accident will not consume your life savings.",
      ben_2_title: "Time Savings",
      ben_2_desc: "Don't waste hours researching American rules. We do the heavy lifting and deliver the ready solution.",
      ben_3_title: "Financial Efficiency",
      ben_3_desc: "Avoid tax penalties (ACA) and abusive premiums by contracting exactly what you need.",
      
      eyebrow_stories: "Real Testimonials",
      stories_title: "The Voice of Those Who Trust Better Life",
      story_1_text: "\"The healthcare system here always scared me. The Better Life team found a perfect plan for my family. Total trust!\"",
      story_1_author: "— Mariana Silva, Orlando - FL",
      story_2_text: "\"I got my car and home insurance. Their agility via WhatsApp and clarity in coverage options are impressive. Highly recommend.\"",
      story_2_author: "— Ricardo Mendes, Boca Raton - FL",
      story_3_text: "\"As a business owner, I needed General Liability fast. They sorted my policy out the same day. A relief to have this support.\"",
      story_3_author: "— Thiago Costa, Miami - FL",
      story_4_text: "\"Getting life insurance in the US seemed too complex. Their consulting translated the rules and today I sleep peacefully knowing my legacy is protected.\"",
      story_4_author: "— Felipe Oliveira, New York - NY",
      
      eyebrow_faq: "Common Doubts",
      faq_title: "Frequently Asked Questions",
      faq_1_q: "Is a Green Card necessary to purchase insurance?",
      faq_1_a: "No. We work with several carriers that accept foreign passports, ITINs, and various types of visas, offering full protection for immigrants.",
      faq_2_q: "How much does a quote with you cost?",
      faq_2_a: "Absolutely nothing. Our consulting and quoting are free. We are compensated directly by the carriers when you purchase a policy.",
      faq_3_q: "How does the WhatsApp service work?",
      faq_3_a: "It's very simple. By clicking the button, you will speak with a human consultant. They will understand your needs and send quotes directly there.",
      faq_4_q: "If I crash my car, do you help me?",
      faq_4_a: "Yes! Our after-sales assistance helps you open the claim, communicate with the carrier, and provides guidance when you need it most.",
      
      cta_title: "Don't leave your assets unprotected.",
      cta_subtitle: "Speak with our team right now, get your free quote, and live with security and peace of mind in the US.",
      cta_btn_1: "Request a Free Quote",
      cta_btn_2: "Ask a Question on WhatsApp",
      
      footer_desc: "The trusted insurance agency in the United States. Reliable protection and exceptional service.",
      foot_nav_1: "Our Services",
      foot_nav_2: "Company",
      foot_nav_3: "Contact Us",
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
