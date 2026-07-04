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
      nav_diff: "Sobre Nós",
      nav_how: "Como Funciona",
      nav_faq: "FAQ",
      nav_cta: "Fale Conosco",
      
      hero_title: "A Proteção Exata que Sua Vida nos Estados Unidos Exige",
      hero_subtitle: "Planos de Saúde (Obamacare/Medicare), Seguro Auto, Casa, Vida, Previdência e Soluções Empresariais. Atendimento 100% em português.",
      hero_cta_1: "Fazer Cotação Gratuita",
      hero_cta_2: "Atendimento no WhatsApp",
      
      cred_1: "Atendimento em Português",
      cred_2: "Cotação Gratuita",
      cred_3: "Consultoria Especializada",
      cred_4: "Processo Simplificado",
      cred_5: "Atendimento Online",
      
      eyebrow_services: "Nossos Seguros",
      services_title: "A Opção de Seguro Perfeita para Você",
      services_subtitle: "A Better Life Global Insurance é dedicada a proteger você e seu patrimônio. Oferecemos soluções personalizadas para garantir sua segurança em todas as fases da vida.",
      
      srv_1_title: "Seguro Saúde (Obamacare)",
      srv_1_desc: "Cobertura preventiva, emergencial e maternidade com subsídios do governo. Acesso à saúde de qualidade sem estourar o orçamento.",
      srv_2_title: "Medicare",
      srv_2_desc: "Planos de saúde estruturados para maiores de 65 anos ou elegíveis. Auxiliamos na escolha do plano complementar ideal para suas necessidades médicas.",
      srv_3_title: "Seguro Saúde (Short Term)",
      srv_3_desc: "Ideal para quem precisa de proteção rápida e temporária contra acidentes e doenças enquanto aguarda o período oficial de inscrições (Open Enrollment).",
      srv_4_title: "Seguro Automotivo",
      srv_4_desc: "Proteção abrangente para você, seu veículo e terceiros nas estradas americanas. Planos customizados para o seu perfil de motorista.",
      srv_5_title: "Seguro Residencial",
      srv_5_desc: "Proteja seu maior patrimônio físico contra roubos, incêndios, desastres naturais e garanta responsabilidade civil dentro da sua propriedade.",
      srv_6_title: "Seguro Comercial (Empresarial)",
      srv_6_desc: "General Liability, Workers Compensation e proteção para propriedades comerciais. Cresça seu negócio nos EUA sem medo de processos.",
      srv_7_title: "Seguro de Vida",
      srv_7_desc: "Muito mais que uma apólice por morte. Nossos seguros de vida podem possuir benefícios em vida para doenças graves e acúmulo de capital.",
      srv_8_title: "Seguro Viagem",
      srv_8_desc: "Viaje pelo mundo ou visite o Brasil com a garantia de assistência médica internacional, perda de bagagem e repatriação.",
      srv_9_title: "Seguro Dental",
      srv_9_desc: "Procedimentos odontológicos nos EUA são extremamente caros. Um bom seguro dental previne surpresas na cadeira do dentista.",
      srv_10_title: "Seguro de Visão",
      srv_10_desc: "Cobertura essencial para exames oftalmológicos anuais, compra de lentes de contato e óculos de grau com enorme economia.",
      srv_11_title: "Seguro para Estudantes",
      srv_11_desc: "Planos de saúde desenvolvidos especificamente para estudantes internacionais (F1, J1, M1), atendendo aos rigorosos requisitos das universidades americanas.",
      srv_12_title: "Aposentadoria Privada",
      srv_12_desc: "Invista no seu futuro através de anuidades e planos estratégicos. Garanta que seus anos dourados na América sejam prósperos e seguros.",
      btn_quote: "Cotar Seguro &rarr;",
      
      eyebrow_diff: "Sobre Nós",
      diff_title: "Há anos protegendo os sonhos de quem escolheu os EUA.",
      diff_desc: "A Better Life Global Insurance não é uma corretora comum. Nós agimos como parceiros do imigrante brasileiro na América, traduzindo as leis e indicando os caminhos mais seguros. Nosso compromisso é com a sua total compreensão do que está sendo contratado.",
      btn_talk: "Fale com a Equipe",
      
      diff_1_title: "Tradução e Transparência",
      diff_1_desc: "Entender as apólices em inglês técnico é difícil. Nós explicamos linha por linha no seu idioma nativo, com zero surpresas na hora de usar.",
      diff_2_title: "Personalização Real",
      diff_2_desc: "Não vendemos pacotes prontos. Nós desenhamos a apólice com as maiores seguradoras dos EUA, adequando-a ao seu bolso e necessidade exata.",
      diff_3_title: "Pós-venda Humanizado",
      diff_3_desc: "Nosso trabalho não acaba na assinatura. Te damos a mão caso precise acionar o seguro, com um pós-venda direto e prático no WhatsApp.",
      
      eyebrow_how: "Metodologia",
      how_title: "Como funciona para contratar?",
      how_1_title: "Solicite sua Cotação",
      how_1_desc: "Acesse nosso WhatsApp e informe qual seguro você precisa. É rápido e sem compromisso.",
      how_2_title: "Consultoria Personalizada",
      how_2_desc: "Um especialista vai entender sua realidade (visto, CEP, renda) para achar a melhor opção.",
      how_3_title: "Apresentação da Proposta",
      how_3_desc: "Mostramos as opções mais vantajosas de diversas seguradoras americanas em português.",
      how_4_title: "Fechamento Seguro",
      how_4_desc: "Emitimos sua apólice e enviamos os cartões e garantias. A partir daí, conte com nosso suporte 24h.",
      
      eyebrow_ben: "Vantagens",
      ben_title: "Por que você não deve contratar sozinho",
      ben_1_title: "Evite Coberturas Inadequadas",
      ben_1_desc: "Um plano muito barato pode não cobrir doenças graves. Nós equilibramos preço e proteção real.",
      ben_2_title: "Fuja de Multas Fiscais",
      ben_2_desc: "Errar no formulário do ACA pode gerar multas no Tax Return. Nós fazemos a documentação corretamente.",
      ben_3_title: "Poupar Tempo Precioso",
      ben_3_desc: "Ficar em linhas telefônicas americanas é exaustivo. Nós ligamos e resolvemos a burocracia por você.",
      
      eyebrow_stories: "Depoimentos",
      stories_title: "A voz de quem confia na Better Life",
      story_1_text: "\"O sistema de saúde aqui sempre me assustou. A equipe encontrou o Obamacare perfeito para minha família, explicando tudo em português. Confiança total!\"",
      story_1_author: "— Mariana S., Orlando - FL",
      story_2_text: "\"Contratei o seguro do meu carro e da minha casa. A agilidade deles pelo WhatsApp e a clareza nas opções de cobertura são impressionantes. Recomendo.\"",
      story_2_author: "— Ricardo M., Boca Raton - FL",
      story_3_text: "\"Como dono de negócio, precisava de um General Liability rápido. Eles resolveram minha apólice no mesmo dia. Um alívio saber que tenho esse suporte.\"",
      story_3_author: "— Thiago C., Miami - FL",
      story_4_text: "\"O atendimento deles é fantástico. Precisava de um seguro dental urgente para minha filha e em poucas horas o cartão digital já estava no meu e-mail.\"",
      story_4_author: "— Juliana O., Kissimmee - FL",
      
      eyebrow_faq: "Esclareça suas dúvidas",
      faq_title: "Perguntas Frequentes",
      faq_1_q: "A cotação tem algum custo?",
      faq_1_a: "Não! Nossa consultoria e cotação são gratuitas. Nós somos remunerados pelas seguradoras após a contratação. O preço do seguro será o mesmo que comprar diretamente, porém com toda a nossa assistência em português.",
      faq_2_q: "Posso fazer seguro saúde apenas com Passaporte?",
      faq_2_a: "Sim! Existem opções específicas no mercado (como planos Short Term ou planos para estudantes/vistos específicos) que não exigem Social Security nem Green Card.",
      faq_3_q: "Como funcionam as renovações?",
      faq_3_a: "A maioria das apólices (como Casa, Carro e ACA) se renovam anualmente. Nós entraremos em contato proativamente na época de renovação para checar se algo mudou na sua vida e buscar tarifas ainda melhores para o próximo ciclo.",
      faq_4_q: "Se eu bater o carro, vocês me ajudam?",
      faq_4_a: "Sim! Nossa assistência de pós-venda está à disposição para guiar você na abertura do sinistro e na comunicação com a seguradora, facilitando todo o processo.",
      
      cta_title: "Comece a proteger o que importa agora.",
      cta_subtitle: "Fale com nossa equipe, receba sua cotação gratuita e viva com segurança nos EUA.",
      cta_btn_1: "Solicitar Cotação no WhatsApp",
      
      footer_desc: "A agência de seguros parceira do brasileiro nos Estados Unidos. Segurança, clareza e atendimento excepcional.",
      foot_nav_1: "Principais Seguros",
      foot_nav_2: "Navegação",
      foot_nav_3: "Fale Conosco",
      copyright_text: "Todos os direitos reservados.",
      legal_privacy: "Política de Privacidade",
      legal_terms: "Termos de Uso"
    },
    en: {
      nav_services: "Insurance",
      nav_diff: "About Us",
      nav_how: "How it Works",
      nav_faq: "FAQ",
      nav_cta: "Contact Us",
      
      hero_title: "The Exact Protection Your Life in the US Requires",
      hero_subtitle: "Health Insurance (ACA/Medicare), Auto, Home, Life, Retirement, and Commercial Solutions. Multilingual support.",
      hero_cta_1: "Get a Free Quote",
      hero_cta_2: "Contact via WhatsApp",
      
      cred_1: "Multilingual Support",
      cred_2: "Free Quotes",
      cred_3: "Expert Consulting",
      cred_4: "Simplified Process",
      cred_5: "Online Assistance",
      
      eyebrow_services: "Our Insurance Plans",
      services_title: "The Perfect Insurance Option for You",
      services_subtitle: "Better Life Global Insurance is dedicated to protecting you and your assets. We offer personalized solutions to ensure your safety in all phases of life.",
      
      srv_1_title: "Health Insurance (Obamacare)",
      srv_1_desc: "Preventive, emergency, and maternity coverage with government subsidies. Quality healthcare access without breaking the budget.",
      srv_2_title: "Medicare",
      srv_2_desc: "Structured health plans for those 65+ or eligible. We assist in choosing the ideal supplemental plan for your medical needs.",
      srv_3_title: "Health Insurance (Short Term)",
      srv_3_desc: "Ideal for quick, temporary protection against accidents and illnesses while waiting for the official Open Enrollment period.",
      srv_4_title: "Auto Insurance",
      srv_4_desc: "Comprehensive protection for you, your vehicle, and third parties on American roads. Custom plans for your driver profile.",
      srv_5_title: "Home Insurance",
      srv_5_desc: "Protect your biggest physical asset against theft, fire, natural disasters, and ensure liability coverage on your property.",
      srv_6_title: "Commercial Insurance",
      srv_6_desc: "General Liability, Workers Compensation, and commercial property protection. Grow your business in the US without fear of lawsuits.",
      srv_7_title: "Life Insurance",
      srv_7_desc: "Much more than a death policy. Our life insurance can offer living benefits for critical illnesses and cash value accumulation.",
      srv_8_title: "Travel Insurance",
      srv_8_desc: "Travel the world or visit Brazil with the guarantee of international medical assistance, lost luggage coverage, and repatriation.",
      srv_9_title: "Dental Insurance",
      srv_9_desc: "Dental procedures in the US are extremely expensive. Good dental insurance prevents surprises in the dentist's chair.",
      srv_10_title: "Vision Insurance",
      srv_10_desc: "Essential coverage for annual eye exams, contact lenses, and prescription glasses with huge savings.",
      srv_11_title: "Student Insurance",
      srv_11_desc: "Health plans developed specifically for international students (F1, J1, M1), meeting strict American university requirements.",
      srv_12_title: "Retirement Planning",
      srv_12_desc: "Invest in your future through annuities and strategic plans. Ensure your golden years in America are prosperous and secure.",
      btn_quote: "Get a Quote &rarr;",
      
      eyebrow_diff: "About Us",
      diff_title: "Protecting the dreams of those who chose the US for years.",
      diff_desc: "Better Life Global Insurance is not an ordinary agency. We act as partners to immigrants in America, translating laws and pointing out the safest paths. Our commitment is your total understanding of what is being contracted.",
      btn_talk: "Talk to our Team",
      
      diff_1_title: "Translation and Transparency",
      diff_1_desc: "Understanding technical English policies is hard. We explain it line by line so there are zero surprises when you need to use it.",
      diff_2_title: "True Customization",
      diff_2_desc: "We don't sell generic packages. We design the policy with the largest US carriers, tailored exactly to your budget and needs.",
      diff_3_title: "Humanized After-Sales",
      diff_3_desc: "Our work doesn't end at signing. We hold your hand if you need to file a claim, with direct and practical support via WhatsApp.",
      
      eyebrow_how: "Methodology",
      how_title: "How does the contracting work?",
      how_1_title: "Request a Quote",
      how_1_desc: "Access our WhatsApp and tell us what insurance you need. It's fast and no obligation.",
      how_2_title: "Personalized Consulting",
      how_2_desc: "A specialist will understand your reality (visa, zip code, income) to find the best option.",
      how_3_title: "Proposal Presentation",
      how_3_desc: "We present the most advantageous options from various American carriers clearly.",
      how_4_title: "Secure Closing",
      how_4_desc: "We issue your policy and send cards and guarantees. From then on, count on our 24/7 support.",
      
      eyebrow_ben: "Advantages",
      ben_title: "Why you shouldn't buy alone",
      ben_1_title: "Avoid Inadequate Coverage",
      ben_1_desc: "A very cheap plan might not cover critical illnesses. We balance price and real protection.",
      ben_2_title: "Escape Tax Penalties",
      ben_2_desc: "Mistakes on ACA forms can generate penalties on Tax Returns. We handle documentation correctly.",
      ben_3_title: "Save Precious Time",
      ben_3_desc: "Being on hold with US carriers is exhausting. We call and handle the bureaucracy for you.",
      
      eyebrow_stories: "Testimonials",
      stories_title: "The voice of those who trust Better Life",
      story_1_text: "\"The healthcare system here always scared me. The team found the perfect ACA plan for my family. Total trust!\"",
      story_1_author: "— Mariana S., Orlando - FL",
      story_2_text: "\"I bought my auto and home insurance. Their speed on WhatsApp and clarity on coverage options is impressive.\"",
      story_2_author: "— Ricardo M., Boca Raton - FL",
      story_3_text: "\"As a business owner, I needed General Liability fast. They handled my policy the same day. What a relief.\"",
      story_3_author: "— Thiago C., Miami - FL",
      story_4_text: "\"Their service is fantastic. I needed urgent dental insurance for my daughter and in hours the digital card was in my email.\"",
      story_4_author: "— Juliana O., Kissimmee - FL",
      
      eyebrow_faq: "Clear your doubts",
      faq_title: "Frequently Asked Questions",
      faq_1_q: "Does the quote have any cost?",
      faq_1_a: "No! Our consulting and quoting are free. We are compensated by carriers after contracting. The price will be the same as buying directly, but with our full assistance.",
      faq_2_q: "Can I get health insurance with just a Passport?",
      faq_2_a: "Yes! There are specific market options (like Short Term or student plans) that don't require an SSN or Green Card.",
      faq_3_q: "How do renewals work?",
      faq_3_a: "Most policies (like Home, Auto, ACA) renew annually. We will contact you proactively at renewal time to check if anything changed and seek even better rates.",
      faq_4_q: "If I crash my car, do you help me?",
      faq_4_a: "Yes! Our after-sales assistance is available to guide you in opening the claim and communicating with the carrier.",
      
      cta_title: "Start protecting what matters now.",
      cta_subtitle: "Talk to our team, get your free quote and live safely in the US.",
      cta_btn_1: "Request Quote on WhatsApp",
      
      footer_desc: "The trusted insurance agency in the United States. Security, clarity, and exceptional service.",
      foot_nav_1: "Main Insurances",
      foot_nav_2: "Navigation",
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
