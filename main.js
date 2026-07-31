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
          const inc = Math.max(target / speed, target / 60);
          
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
          welcome_link: "Bem-vindo",

          stat_1_desc: "Acidentes de trânsito anuais nos EUA",
          stat_2_desc: "Falências ligadas a dívidas médicas (Forbes)",
          stat_3_desc: "Em danos por desastres climáticos em 2024 (NOAA)",
          stat_4_desc: "Acidentes de trabalho graves/ano (NSC)",
          download_pdf: "Baixar PDF",
          quem_somos_link: "Quem Somos",
          form_success_title: "Recebemos as suas informações, obrigado pelo seu interesse!",
          form_success_desc: "Em breve um de nossos especialistas te apresentará a melhor cotação e estará ao seu lado, acompanhando todas as etapas.",
          close_btn: "Fechar",
          slogan_global: "Você vive. Nós resolvemos.",
          faq_q1: "Posso contratar seguro saúde em qualquer época do ano?",
          faq_a1: "Depende. Os planos do Marketplace normalmente podem ser contratados durante o Open Enrollment. Fora desse período, algumas situações, como casamento, nascimento de um filho ou perda de cobertura, podem permitir uma inscrição especial. Nossa equipe analisa seu caso e orienta sobre as opções disponíveis.",
          faq_q2: "Como escolher o plano de saúde ideal para minha família?",
          faq_a2: "A escolha depende da sua renda, da composição familiar, dos médicos que você utiliza, dos hospitais da sua região e do seu orçamento. A BLGI compara as opções e ajuda você a encontrar o plano mais adequado para sua realidade.",
          faq_q3: "Posso continuar usando meu médico atual?",
          faq_a3: "Depende da rede de atendimento do plano escolhido. Antes da contratação, verificamos se seus médicos, hospitais e laboratórios fazem parte da rede credenciada para que você tome sua decisão com segurança.",
          faq_q4: "O seguro de vida serve apenas para pagar uma indenização quando a pessoa falece?",
          faq_a4: "Não. Alguns seguros permanentes também oferecem benefícios em vida, como acesso ao valor acumulado (cash value), além de estratégias de proteção patrimonial e planejamento financeiro, dependendo da modalidade contratada.",
          faq_q5: "Quanto de seguro de vida eu preciso?",
          faq_a5: "Cada família possui uma necessidade diferente. Consideramos renda, patrimônio, dívidas, filhos e objetivos futuros para recomendar uma proteção adequada à sua realidade.",
          faq_q6: "O seguro de carro mais barato é sempre a melhor opção?",
          faq_a6: "Nem sempre. Um preço menor pode significar limites de cobertura reduzidos ou ausência de proteções importantes. O melhor seguro é aquele que protege adequadamente você, sua família e seu patrimônio.",
          faq_q7: "O que devo fazer se sofrer um acidente?",
          faq_a7: "Priorize a segurança das pessoas, acione as autoridades quando necessário e comunique a seguradora o mais rápido possível. A Better Life também orienta você durante todo o processo.",
          faq_q8: "Quando preciso contratar um seguro Commercial Auto?",
          faq_a8: "Quando o veículo é utilizado para atividades da empresa, como transporte de mercadorias, atendimento a clientes, prestação de serviços ou operações comerciais. Dependendo da utilização, um seguro pessoal pode não oferecer a cobertura adequada.",
          faq_q9: "O seguro residencial cobre furacões e tempestades?",
          faq_a9: "Depende da apólice. Na Flórida, muitas coberturas incluem danos causados pelo vento, mas normalmente existe um dedutível específico para furacões. Explicamos exatamente quais riscos estão cobertos antes da contratação.",
          faq_q10: "O seguro residencial cobre alagamentos?",
          faq_a10: "Na maioria dos casos, não. Danos causados por enchentes normalmente exigem uma cobertura específica de Flood Insurance, mesmo para imóveis localizados fora de áreas de alto risco.",
          faq_q11: "Vale a pena contratar um seguro para meu pet?",
          faq_a11: "Se o seu animal faz parte da família, um seguro pode ajudar a reduzir despesas inesperadas com consultas, exames, cirurgias e outros tratamentos, dependendo da cobertura contratada.",
          faq_q12: "Minha empresa realmente precisa de seguro?",
          faq_a12: "Toda empresa está exposta a riscos. O tipo de proteção ideal depende da atividade, da quantidade de funcionários, dos contratos e da forma como o negócio opera.",
          faq_q13: "O que é uma Business Owner's Policy (BOP)?",
          faq_a13: "A BOP reúne, em uma única apólice, algumas das principais coberturas para pequenas e médias empresas, como responsabilidade civil e proteção do patrimônio empresarial.",
          faq_q14: "O que é o General Liability?",
          faq_a14: "É o seguro que protege a empresa contra reclamações de terceiros relacionadas a danos materiais, lesões corporais e outros prejuízos pelos quais o negócio possa ser responsabilizado. É uma das coberturas mais importantes para empresas nos Estados Unidos.",
          faq_q15: "Quando o Workers' Compensation é obrigatório?",
          faq_a15: "Na Flórida, a obrigatoriedade depende do tipo de atividade e da quantidade de funcionários. Nossa equipe ajuda a identificar quando essa cobertura é exigida e qual solução faz mais sentido para o seu negócio.",
          faq_q16: "O que são as Soluções Internacionais da Better Life?",
          faq_a16: "São estratégias voltadas para famílias que desejam proteger patrimônio, organizar o planejamento sucessório ou construir patrimônio em dólar por meio de soluções internacionais de seguros.",
          faq_q17: "Quem mora no Brasil pode contratar essas soluções?",
          faq_a17: "Sim. Trabalhamos com seguradora americana especializada no cliente soluções internacionais, atendendo quem mora no Brasil, conhecendo sua realidade e suas necessidades. O processo de contratação e acesso é simples e seguro.",
          faq_q18: "A Better Life trabalha com apenas uma seguradora?",
          faq_a18: "Não. Somos uma agência independente e analisamos diferentes seguradoras para encontrar a solução mais adequada para cada cliente.",
          faq_q19: "Posso concentrar todos os meus seguros na Better Life?",
          faq_a19: "Sim. Nosso objetivo é resolver todas as necessidades de seguros da sua família e da sua empresa, reunindo diferentes soluções em um único relacionamento.",
          faq_q20: "O que diferencia a Better Life de outras agências de seguros?",
          faq_a20: "Na Better Life, você não precisa entender de seguros sozinho. Nós simplificamos um mercado complexo, ajudamos você a tomar decisões com segurança e permanecemos ao seu lado sempre que sua vida mudar. Porque nosso compromisso não é apenas vender um seguro, mas resolver tudo o que envolve a proteção da sua família, do seu patrimônio e do seu negócio.",
          site_title: "Better Life Global Insurance | Você vive. Nós resolvemos.",

        nav_faq_1: "Seguro de Vida",
        nav_faq_2: "Seguro Saúde",
        nav_faq_3: "Seguro de Carro",
        nav_faq_4: "Seguro de Casa",
        nav_faq_5: "Seguro Viagem",
        nav_faq_6: "Seguro Pets",
        nav_faq_7: "Seguros Empresariais",
        nav_faq_8: "Soluções Internacionais",
        news_title: "Notícias e Conteúdos",
        opt_vida: "Seguro de Vida",
        opt_saude: "Seguro Saúde",
        opt_carro: "Seguro de Carro",
        opt_casa: "Seguro de Casa",
        opt_viagem: "Seguro Viagem",
        opt_pets: "Seguro Pets",
        opt_empresariais: "Seguros Empresariais",
        opt_internacional: "Soluções Internacionais",
        footer_col3: "Contato",
        "problem_title": "Que problema esse seguro resolve?",
        "difference_title": "Quando ele faz diferença?",
        "help_title": "Como a Better Life pode ajudar?",
        "related_title": "Soluções Relacionadas",
        "vida_name": "Seguro de Vida",
        "vida_subtitle": "Proteção financeira para você e para quem depende de você.",
        "vida_problem": "Se algo acontecer com você, como uma doença grave, acidente ou até mesmo morte, as despesas da família continuam. O Seguro de Vida ajuda você em caso de doença grave ou quem você ama a manter a casa, pagar contas, cuidar da educação dos filhos e atravessar um momento difícil com mais segurança financeira.",
        "vida_help": "Entendemos sua realidade, suas responsabilidades e seus objetivos antes de recomendar qualquer solução. Depois, buscamos uma proteção adequada à sua família e ao seu orçamento.",
        "vida_difference_0": "Quando sua família depende da sua renda.",
        "vida_difference_1": "Quando você tem filhos, cônjuge ou familiares sob sua responsabilidade.",
        "vida_difference_2": "Quando existem financiamento da casa, dívidas ou outras despesas importantes.",
        "vida_difference_3": "Quando você deseja deixar uma proteção financeira para quem ama.",
        "vida_difference_4": "Quando quer se preparar para situações como invalidez ou doença grave, com o benefício em vida.",
        "saude_name": "Seguro Saúde",
        "saude_subtitle": "Cuide da sua saúde sem colocar seu patrimônio em risco.",
        "saude_problem": "Consultas, exames, cirurgias e internações podem custar muito caro nos Estados Unidos. O Seguro Saúde facilita o acesso ao atendimento médico e reduz o risco de uma despesa inesperada comprometer o orçamento da sua família.",
        "saude_help": "Analisamos as necessidades da sua família, os médicos que deseja utilizar, sua região, sua renda e seu orçamento. Assim, ajudamos você a entender as opções e escolher um plano que realmente possa usar.",
        "saude_difference_0": "Quando você precisa consultar um médico.",
        "saude_difference_1": "Quando precisa realizar exames ou tratamentos.",
        "saude_difference_2": "Quando acontece uma emergência.",
        "saude_difference_3": "Quando uma cirurgia ou internação se torna necessária.",
        "saude_difference_4": "Quando sua família precisa de acompanhamento médico regular.",
        "carro_name": "Seguro de Carro",
        "carro_subtitle": "Proteção para você, seu veículo e seu patrimônio.",
        "carro_problem": "Um acidente pode gerar prejuízos com o seu carro, com outros veículos e até com pessoas envolvidas. O Seguro de Carro reduz esse impacto financeiro e ajuda você a retomar sua rotina com mais rapidez.",
        "carro_help": "Analisamos quem dirige o veículo, como ele é utilizado, onde fica estacionado e qual proteção faz sentido para sua realidade. Depois, comparamos opções para equilibrar cobertura, franquia e preço — sem deixar você desprotegido apenas para conseguir uma mensalidade menor.",
        "carro_difference_0": "Quando você se envolve em um acidente.",
        "carro_difference_1": "Quando causa danos ao veículo ou à propriedade de outra pessoa.",
        "carro_difference_2": "Quando alguém se machuca em um acidente envolvendo seu carro.",
        "carro_difference_3": "Quando seu veículo é roubado ou furtado.",
        "carro_difference_4": "Quando chuva forte, granizo, queda de objetos ou outros eventos danificam o carro.",
        "residencial_name": "Seguro de Casa",
        "residencial_subtitle": "Sua casa protegida contra os imprevistos da vida.",
        "residencial_problem": "Sua casa representa uma parte importante do patrimônio da família. O Seguro de Casa ajuda a reduzir os prejuízos quando incêndios, tempestades, roubos, acidentes ou outros eventos cobertos causam danos ao imóvel ou aos seus bens.",
        "residencial_help": "Na Flórida, não basta contratar qualquer seguro residencial. Avaliamos as características do imóvel, a região, o tipo de construção e os riscos que precisam ser considerados para encontrar uma proteção adequada para sua casa e seu patrimônio.",
        "residencial_difference_0": "Quando uma tempestade causa danos ao telhado ou à estrutura.",
        "residencial_difference_1": "Quando um incêndio atinge a residência.",
        "residencial_difference_2": "Quando um cano se rompe e provoca danos cobertos pela apólice.",
        "residencial_difference_3": "Quando ocorre roubo ou vandalismo.",
        "residencial_difference_4": "Quando móveis, eletrodomésticos ou outros bens são danificados por um evento coberto.",
        "viagem_name": "Seguro Viagem",
        "viagem_subtitle": "Viaje sabendo que terá a quem recorrer.",
        "viagem_problem": "Uma emergência médica, uma bagagem extraviada ou o cancelamento de uma viagem pode gerar despesas e muita preocupação. O Seguro Viagem oferece suporte para lidar com imprevistos longe de casa.",
        "viagem_help": "Consideramos o destino, a duração, a idade dos viajantes e o tipo de viagem para encontrar uma opção adequada. Assim, você viaja com uma proteção compatível com seus planos, sem contratar coberturas desnecessárias.",
        "viagem_difference_0": "Quando você precisa de atendimento médico durante a viagem.",
        "viagem_difference_1": "Quando sofre um acidente longe de casa.",
        "viagem_difference_2": "Quando sua bagagem é extraviada ou chega com atraso.",
        "viagem_difference_3": "Quando a viagem precisa ser cancelada ou interrompida por uma situação coberta.",
        "viagem_difference_4": "Quando ocorre um atraso significativo.",
        "pets_name": "Seguro para Pets",
        "pets_subtitle": "Proteção para quem também faz parte da família.",
        "pets_problem": "Consultas, exames, cirurgias e emergências veterinárias podem gerar despesas elevadas. O Seguro para Pets ajuda você a cuidar da saúde do seu animal sem precisar decidir entre o tratamento necessário e o impacto no orçamento.",
        "pets_help": "Avaliamos a idade, a raça e as necessidades do seu pet para comparar opções de cobertura, franquias, reembolsos e limitações. Você escolhe com clareza e sabe como o plano poderá ser utilizado.",
        "pets_difference_0": "Quando seu pet adoece.",
        "pets_difference_1": "Quando sofre um acidente.",
        "pets_difference_2": "Quando precisa de exames ou medicamentos.",
        "pets_difference_3": "Quando uma cirurgia se torna necessária.",
        "pets_difference_4": "Quando ocorre uma emergência veterinária.",
        "umbrella_name": "Umbrella Insurance",
        "umbrella_subtitle": "Uma proteção adicional para o patrimônio que você construiu.",
        "umbrella_problem": "Alguns acidentes podem resultar em indenizações muito superiores aos limites do Seguro de Carro ou do Seguro de Casa. O Umbrella acrescenta uma camada extra de responsabilidade civil para ajudar a proteger seu patrimônio.",
        "umbrella_help": "Analisamos seus seguros atuais e o patrimônio que precisa ser protegido. Em seguida, verificamos se os limites existentes são suficientes ou se uma camada adicional de proteção faz sentido para sua vida.",
        "umbrella_difference_0": "Quando um acidente de carro causa danos graves a outras pessoas.",
        "umbrella_difference_1": "Quando alguém sofre um acidente sério em sua propriedade.",
        "umbrella_difference_2": "Quando o valor de uma reclamação ultrapassa o limite do seguro principal.",
        "umbrella_difference_3": "Quando existem despesas judiciais e indenizações elevadas.",
        "umbrella_difference_4": "Quando você possui casa, investimentos, renda ou outros bens que deseja preservar.",
        "bop_name": "Seguro para Empresas (BOP)",
        "bop_subtitle": "As principais proteções do seu negócio em uma única apólice.",
        "bop_problem": "Um incêndio, um roubo, um acidente com um cliente ou a interrupção das atividades pode comprometer o caixa da empresa. O BOP reúne proteções essenciais para pequenos e médios negócios em uma solução mais simples.",
        "bop_help": "Entendemos como a empresa funciona, onde opera, quais bens possui e quais riscos enfrenta. A partir disso, montamos uma proteção compatível com a realidade do negócio, evitando tanto lacunas quanto coberturas desnecessárias.",
        "bop_difference_0": "Quando equipamentos, móveis ou mercadorias são danificados.",
        "bop_difference_1": "Quando ocorre incêndio, roubo ou outro evento coberto.",
        "bop_difference_2": "Quando um cliente sofre um acidente no estabelecimento.",
        "bop_difference_3": "Quando a empresa é responsabilizada por danos a terceiros.",
        "bop_difference_4": "Quando um evento coberto impede temporariamente o funcionamento do negócio.",
        "general-liability_name": "Responsabilidade Civil para Empresas (General Liability)",
        "general-liability_subtitle": "Proteção contra acidentes e reclamações de terceiros.",
        "general-liability_problem": "Mesmo um pequeno acidente pode resultar em despesas médicas, indenizações ou processos. O General Liability ajuda a proteger a empresa quando suas atividades causam danos corporais ou materiais a clientes, fornecedores ou outras pessoas.",
        "general-liability_help": "Identificamos os riscos reais da atividade, o local onde o trabalho é realizado e as exigências dos seus contratos. Assim, ajudamos a contratar limites e coberturas coerentes com a operação da empresa.",
        "general-liability_difference_0": "Quando um cliente escorrega e se machuca no estabelecimento.",
        "general-liability_difference_1": "Quando sua equipe danifica a propriedade de um cliente.",
        "general-liability_difference_2": "Quando um serviço causa prejuízo material a terceiros.",
        "general-liability_difference_3": "Quando a empresa recebe uma reclamação ou processo relacionado às suas atividades.",
        "general-liability_difference_4": "Quando um contratante exige um certificado de seguro antes de liberar o trabalho.",
        "workers-comp_name": "Seguro para Funcionários (Workers' Compensation)",
        "workers-comp_subtitle": "Proteção para quem trabalha e para quem emprega.",
        "workers-comp_problem": "Um acidente ou uma doença relacionada ao trabalho pode gerar despesas médicas, afastamentos e custos importantes para a empresa. O Workers' Compensation oferece proteção aos funcionários e reduz o impacto financeiro para o empregador.",
        "workers-comp_help": "Avaliamos o número de funcionários, as funções exercidas, a folha de pagamento e as exigências aplicáveis ao negócio. Isso ajuda a empresa a contratar corretamente e a evitar problemas por falta ou inadequação da cobertura.",
        "workers-comp_difference_0": "Quando um funcionário sofre um acidente durante o trabalho.",
        "workers-comp_difference_1": "Quando uma lesão ocorre ao levantar peso ou utilizar equipamentos.",
        "workers-comp_difference_2": "Quando o colaborador precisa de atendimento médico ou reabilitação.",
        "workers-comp_difference_3": "Quando há afastamento por acidente ocupacional.",
        "workers-comp_difference_4": "Quando a legislação ou um contrato exige essa proteção.",
        "commercial-auto_name": "Seguro para Veículos Comerciais (Commercial Auto)",
        "commercial-auto_subtitle": "Proteção para os veículos que mantêm sua empresa em movimento.",
        "commercial-auto_problem": "Quando um veículo é usado para trabalhar, transportar materiais, fazer entregas ou atender clientes, um seguro pessoal pode não ser suficiente. O Commercial Auto protege a empresa contra prejuízos relacionados ao uso comercial dos veículos.",
        "commercial-auto_help": "Entendemos como cada veículo é utilizado, quem dirige e o que é transportado. Depois, buscamos uma proteção adequada à operação, evitando que um uso comercial seja declarado incorretamente em um seguro pessoal.",
        "commercial-auto_difference_0": "Quando o veículo é utilizado para visitar clientes.",
        "commercial-auto_difference_1": "Quando transporta equipamentos, ferramentas ou mercadorias.",
        "commercial-auto_difference_2": "Quando é dirigido por funcionários.",
        "commercial-auto_difference_3": "Quando faz entregas ou presta serviços externos.",
        "commercial-auto_difference_4": "Quando se envolve em um acidente durante uma atividade comercial.",
        "commercial-property_name": "Seguro Patrimonial Empresarial (Commercial Property)",
        "commercial-property_subtitle": "Proteção para a estrutura e os bens essenciais da empresa.",
        "commercial-property_problem": "Equipamentos, mercadorias, móveis e instalações podem levar anos para serem construídos ou adquiridos. Um incêndio, uma tempestade ou um roubo pode interromper a operação e causar grandes prejuízos.",
        "commercial-property_help": "Avaliamos o imóvel, os equipamentos, o estoque e os bens necessários ao funcionamento da empresa. Na realidade climática da Flórida, também observamos com atenção os riscos ligados a tempestades e outros eventos severos.",
        "commercial-property_difference_0": "Quando a estrutura do imóvel sofre danos.",
        "commercial-property_difference_1": "Quando equipamentos ou máquinas são atingidos.",
        "commercial-property_difference_2": "Quando móveis, computadores ou mercadorias são danificados.",
        "commercial-property_difference_3": "Quando ocorre incêndio, vandalismo ou roubo.",
        "commercial-property_difference_4": "Quando tempestades ou outros eventos cobertos afetam o estabelecimento.",
        "professional-liability_name": "Responsabilidade Profissional (E&O)",
        "professional-liability_subtitle": "Proteção para quem oferece conhecimento, orientação ou serviços.",
        "professional-liability_problem": "Mesmo profissionais experientes podem ser acusados de cometer um erro, deixar de informar algo ou entregar um serviço diferente do esperado. O E&O ajuda a proteger o profissional e a empresa contra os custos dessas reclamações.",
        "professional-liability_help": "Analisamos o tipo de serviço, o perfil dos clientes e os possíveis prejuízos que uma alegação profissional poderia causar. Assim, buscamos uma solução alinhada às responsabilidades específicas da sua atividade.",
        "professional-liability_difference_0": "Quando um cliente afirma que recebeu uma orientação incorreta.",
        "professional-liability_difference_1": "Quando existe alegação de erro ou omissão no serviço.",
        "professional-liability_difference_2": "Quando um prazo importante não é cumprido.",
        "professional-liability_difference_3": "Quando o cliente diz ter sofrido prejuízo financeiro.",
        "professional-liability_difference_4": "Quando é necessário contratar defesa jurídica.",
        "cyber-liability_name": "Seguro Cibernético (Cyber Liability)",
        "cyber-liability_subtitle": "Proteção para os riscos digitais do seu negócio.",
        "cyber-liability_problem": "Empresas de todos os tamanhos armazenam dados, utilizam sistemas e recebem pagamentos eletrônicos. Um ataque, fraude ou vazamento pode interromper as atividades, gerar despesas e prejudicar a confiança dos clientes.",
        "cyber-liability_help": "Entendemos como sua empresa utiliza tecnologia, armazena informações e recebe pagamentos. A partir disso, ajudamos a encontrar uma proteção compatível com os riscos digitais da operação.",
        "cyber-liability_difference_0": "Quando ocorre invasão de sistemas.",
        "cyber-liability_difference_1": "Quando dados de clientes são expostos.",
        "cyber-liability_difference_2": "Quando a empresa sofre um ataque de ransomware.",
        "cyber-liability_difference_3": "Quando um funcionário ou fornecedor causa uma falha de segurança.",
        "cyber-liability_difference_4": "Quando é preciso recuperar informações ou sistemas.",
        "surety-bonds_name": "Garantias Contratuais (Surety Bonds)",
        "surety-bonds_subtitle": "A garantia necessária para trabalhar, contratar e crescer.",
        "surety-bonds_problem": "Algumas licenças, contratos e projetos exigem uma garantia de que a empresa cumprirá suas obrigações. O Surety Bond transmite segurança à outra parte e permite que o negócio atenda a essas exigências.",
        "surety-bonds_help": "Identificamos qual bond foi solicitado, o valor exigido e a finalidade da garantia. Depois, orientamos a empresa no processo para que ela consiga atender à exigência e seguir com o contrato ou a licença.",
        "surety-bonds_difference_0": "Quando uma licença profissional exige uma garantia.",
        "surety-bonds_difference_1": "Quando a empresa participa de uma licitação.",
        "surety-bonds_difference_2": "Quando um contrato de construção exige um bond.",
        "surety-bonds_difference_3": "Quando o cliente quer garantia de execução do serviço.",
        "surety-bonds_difference_4": "Quando uma autoridade pública exige comprovação financeira.",
        "vida-soluções internacionais_name": "Soluções de Vida Internacionais",
        "vida-soluções internacionais_subtitle": "Proteção financeira em dólar para quem pensa globalémente.",
        "vida-soluções internacionais_problem": "Grande parte do patrimônio das famílias brasileiras permanece concentrada em um único país e em uma única moeda. O Soluções de Vida Internacionais permite criar uma proteção financeira em dólar, estruturada em uma jurisdição soluções internacionais estável, oferecendo mais segurança para sua família e maior liberdade para o seu planejamento patrimonial.",
        "vida-soluções internacionais_help": "Antes de falar sobre produtos, entendemos seus objetivos familiares, sucessórios e patrimoniais. Depois mostramos como uma estrutura soluções internacionais pode proteger sua família e integrar seu planejamento financeiro de longo prazo.",
        "vida-soluções internacionais_difference_0": "Quando você deseja proteger parte do patrimônio fora do Brasil.",
        "vida-soluções internacionais_difference_1": "Quando busca diversificar seus recursos em dólar.",
        "vida-soluções internacionais_difference_2": "Quando deseja que sua família receba recursos em qualquer lugar do mundo.",
        "vida-soluções internacionais_difference_3": "Quando quer uma proteção que acompanhe sua família independentemente de onde ela esteja.",
        "vida-soluções internacionais_difference_4": "Quando procura estabilidade jurídica e previsibilidade no longo prazo.",
        "protecao-patrimonial_name": "Proteção Patrimonial",
        "protecao-patrimonial_subtitle": "Proteja parte do seu patrimônio em uma das moedas mais fortes do mundo.",
        "protecao-patrimonial_problem": "Concentrar todo o patrimônio em um único país significa concentrar também os riscos. Estruturar parte dos seus recursos em dólar e em uma jurisdição soluções internacionais amplia a diversificação patrimonial, proporciona maior estabilidade jurídica e reduz a dependência de um único ambiente econômico.",
        "protecao-patrimonial_help": "Explicamos de forma simples como funciona uma estrutura soluções internacionais, quais são seus benefícios e em quais situações ela faz sentido. Nosso compromisso é ajudá-lo a construir uma estratégia sólida, alinhada aos seus objetivos e sempre respeitando as normas aplicáveis.",
        "protecao-patrimonial_difference_0": "Quando você deseja diversificar parte do patrimônio soluções internacionaisémente.",
        "protecao-patrimonial_difference_1": "Quando busca proteção em moeda forte.",
        "protecao-patrimonial_difference_2": "Quando deseja organizar recursos fora do Brasil de forma estruturada.",
        "protecao-patrimonial_difference_3": "Quando pretende preservar patrimônio para as próximas gerações.",
        "protecao-patrimonial_difference_4": "Quando busca uma estratégia patrimonial com visão de longo prazo.",
        "sucessao_name": "Planejamento Sucessório",
        "sucessao_subtitle": "Uma forma simples, rápida e eficiente de cuidar do futuro da sua família.",
        "sucessao_problem": "A transferência de patrimônio pode ser demorada, burocrática e gerar custos elevados. O Soluções de Vida Internacionais permite que os beneficiários recebam os recursos diretamente da seguradora, sem depender do processo tradicional de inventário da apólice, proporcionando liquidez e agilidade justamente quando a família mais precisa.",
        "sucessao_help": "Analisamos sua estrutura familiar e seus objetivos sucessórios para demonstrar como uma solução soluções internacionais pode complementar o planejamento patrimonial da sua família e proporcionar mais tranquilidade para as próximas gerações.",
        "sucessao_difference_0": "Quando você deseja facilitar a sucessão patrimonial.",
        "sucessao_difference_1": "Quando quer oferecer liquidez imediata para sua família.",
        "sucessao_difference_2": "Quando busca reduzir burocracias na transferência dos recursos da apólice.",
        "sucessao_difference_3": "Quando deseja proteger financeiramente as próximas gerações.",
        "sucessao_difference_4": "Quando pretende organizar sua sucessão com antecedência.",
        "estrategias-patrimoniais_name": "Estratégias Patrimoniais em Dólar",
        "estrategias-patrimoniais_subtitle": "Transforme proteção em um patrimônio que trabalha para você.",
        "estrategias-patrimoniais_problem": "Além da proteção financeira, uma estrutura soluções internacionais pode ser utilizada como ferramenta de planejamento patrimonial. Ela permite construir recursos em dólar ao longo do tempo e utilizá-los estrategicamente para complementar renda, financiar projetos ou criar uma reserva de liquidez sem depender exclusivamente dos sistemas tradicionais de investimento.",
        "estrategias-patrimoniais_help": "A Better Life Global Insurance mostra como o Soluções de Vida Internacionais pode ir muito além da proteção familiar. Explicamos, de forma clara e transparente, como essa estrutura pode fazer parte do seu planejamento patrimonial, ajudando você a construir patrimônio em dólar, acessar liquidez de forma estratégica e ampliar sua liberdade financeira no longo prazo.",
        "estrategias-patrimoniais_difference_0": "Quando você deseja construir patrimônio em dólar.",
        "estrategias-patrimoniais_difference_1": "Quando pretende criar uma renda em dólar no futuro.",
        "estrategias-patrimoniais_difference_2": "Quando busca uma alternativa para uma aposentadoria em moeda forte.",
        "estrategias-patrimoniais_difference_3": "Quando deseja utilizar estratégias de acesso à liquidez, como o Infinite Banking.",
        "estrategias-patrimoniais_difference_4": "Quando quer preservar capital para projetos familiares ou empresariais.",

      nav_services: "Seguros",
      nav_about: "Quem Somos",
      nav_diff: "Por Que a BLGI?",
      nav_video: "Bem-vindo",
      nav_lib: "Biblioteca",
      nav_faq: "FAQ",
      nav_cta: "SOLICITAR COTAÇÃO",
      
      hero_eyebrow: "Você vive. Nós resolvemos.",
      hero_title: "Toda proteção que sua família precisa",
      "hero_subtitle": "Seguro de vida, saúde, carro, casa, negócios e soluções internacionais para a comunidade brasileira.",
      hero_cta_1: "Solicitar Cotação",
      hero_cta_2: "Falar no WhatsApp",
      
      badge_secure: "Proteção Total",
      badge_expert: "Consultoria VIP",
      
      "hero_help": "COMO PODEMOS TE AJUDAR?",
      quick_saude: "SAÚDE",
      quick_vida: "VIDA",
      quick_carro: "AUTO",
      quick_casa: "RESIDÊNCIA",
      quick_empresa: "EMPRESAS",
      quick_inter: "INTERNACIONAL",
      
      auth_fam: "Em Patrimônio Segurado",
      auth_years: "Licenciados em",
      auth_states: "Atendimento Concierge",
      auth_lang: "Parceiros Globais",
      
      eyebrow_import: "Visão de Futuro",
      import_check_1: "Garantimos o futuro dos seus filhos.",
      import_check_2: "Escolhemos entre diversas seguradoras a opção que faz mais sentido para você.",
      import_check_3: "Cuidamos da contratação, das revisões e do relacionamento com as seguradoras.",
      import_check_4: "Acompanhamos você sempre que sua vida, sua família ou seu patrimônio mudarem.",
      import_check_conc: "Você vive sua vida. Nós permanecemos ao seu lado em cada etapa.",
      import_title: "ESTAMOS AO SEU LADO",
      btn_schedule: "Solicitar Cotação",
      
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
      
      video_placeholder_text: "DISPONÍVEL EM BREVE",
      
      eyebrow_services: "Nossas Soluções",
      services_title: "Todas as proteções que você precisa em um só lugar",
      "services_subtitle": "Oferecemos soluções estratégicas de proteção para famílias, profissionais e empresas da comunidade brasileira, com atendimento personalizado e foco naquilo que realmente importa: sua segurança e tranquilidade.",
      
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
      srv_6: "Seguro de Vida Internacional",
      srv_desc_6: "Estratégias globais para proteger seu patrimônio e seu legado.",
      srv_7: "Seguro Viagem",
      srv_desc_7: "Viaje com a segurança de estar protegido onde quer que você esteja.",
      srv_8: "Seguro Dental",
      srv_desc_8: "Cuidados preventivos para manter o sorriso e a saúde em dia.",
      srv_9: "Seguro para Pets",
      srv_desc_9: "Proteção para cuidar de quem faz parte da sua família.",
      
      eyebrow_form: "Cotação Rápida",
      form_title: "QUAL SEGURO VOCÊ BUSCA?",
      form_desc: "Preencha o formulário abaixo e um de nossos especialistas entrará em contato com uma cotação e estratégia desenhada sob medida para sua realidade.",
      "form_name": "Seu Nome Completo",
      form_email: "Seu E-mail",
      form_phone: "Seu Telefone / WhatsApp",
      form_interest: "Qual seguro você busca?",
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
      lib_1_title: "Seguro de Vida com Benefício em Vida (Living Benefits)",
      lib_1_desc: "Como acumular patrimônio em dólar e proteger sua família ao mesmo tempo.",
      lib_2_title: "Opções de Seguro Saúde nos Estados Unidos",
      lib_2_desc: "Tudo que o imigrante precisa saber para não pagar multas no Tax Return.",
      lib_3_title: "O que é o General Liability Insurance?",
      lib_3_desc: "General Liability e Workers Comp. Não perca sua empresa por um processo.",
      lib_btn: "Baixar PDF",
      
      srv_p_title: "Seguros Pessoais",
      srv_e_title: "Seguros Empresariais",
      srv_i_title: "Soluções Internacionais",
      
      // Pessoais
      srv_p_1: "Seguro de Vida",
      srv_p_1_d: "Segurança financeira para quem mais importa.",
      srv_p_2: "Seguro Saúde",
      srv_p_2_d: "Mais acesso à saúde. Mais tranquilidade para sua família.",
      srv_p_3: "Seguro de Carro",
      srv_p_3_d: "Proteção para cada quilômetro da sua jornada.",
      srv_p_4: "Seguro de Casa",
      srv_p_4_d: "Proteja o patrimônio que você conquistou.",
      srv_p_5: "Seguro Viagem",
      srv_p_5_d: "Viaje com a segurança de estar protegido onde quer que você esteja.",
      srv_p_6: "Seguro para Pets",
      srv_p_6_d: "Proteção para cuidar de quem faz parte da sua família.",
      srv_p_7: "Umbrella Insurance",
      srv_p_7_d: "Uma camada extra de proteção contra grandes imprevistos.",

      // Empresariais
      srv_e_1: "Seguro para Empresas (BOP)",
      srv_e_1_d: "Proteção inteligente e abrangente para pequenos negócios.",
      srv_e_2: "Responsabilidade Civil (General Liability)",
      srv_e_2_d: "Blindagem contra processos e danos a terceiros.",
      srv_e_3: "Seguro para Funcionários (Workers' Comp)",
      srv_e_3_d: "Cuidado com quem faz sua empresa crescer.",
      srv_e_4: "Seguro de Veículos Comerciais (Commercial Auto)",
      srv_e_4_d: "Proteção para a frota do seu negócio.",
      srv_e_5: "Seguro Patrimonial Empresarial",
      srv_e_5_d: "Proteção total para o espaço e os bens da empresa.",
      srv_e_6: "Responsabilidade Profissional (E&O)",
      srv_e_6_d: "Trabalhe com segurança em suas decisões técnicas.",
      srv_e_7: "Seguro Cibernético (Cyber Liability)",
      srv_e_7_d: "Blindagem moderna contra ameaças digitais.",
      srv_e_8: "Garantias Contratuais (Surety Bonds)",
      srv_e_8_d: "Credibilidade e garantia para grandes projetos.",

      // Internacionais
      srv_i_1: "Seguro de Vida Internacional",
      srv_i_1_d: "Estratégias globais para proteger sua família sem fronteiras.",
      srv_i_2: "Proteção Patrimonial",
      srv_i_2_d: "Blindagem e segurança cambial para seu capital.",
      srv_i_3: "Planejamento Sucessório",
      srv_i_3_d: "Preserve seu legado para as próximas gerações com eficiência.",
      srv_i_4: "Geração de Renda em Dólar",
      srv_i_4_d: "Soluções seguras para construir e rentabilizar em moeda forte.",

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
      
      
      copyright_text: "Todos os direitos reservados.",
      legal_privacy: "Política de Privacidade",
      legal_terms: "Termos de Uso"
    },
        story_1_author: "Mariana Silva",
        story_1_city: "Orlando, FL",
        story_1_text: "\"O sistema de saúde aqui sempre me assustou. A BLGI encontrou o plano perfeito para minha família, explicando tudo em português. Confiança total!\"",
        story_2_author: "Ricardo Mendes",
        story_2_city: "Boca Raton, FL",
        story_2_text: "\"Contratei o seguro do meu carro e da minha casa. A agilidade deles e a clareza nas opções de cobertura são impressionantes. Recomendo de olhos fechados.\"",
        story_3_author: "Thiago Costa",
        story_3_city: "Miami, FL",
        story_3_text: "\"Como dono de negócio, precisava de um General Liability. Eles resolveram minha apólice no mesmo dia. Um alívio saber que tenho esse suporte.\"",
        foot_nav_2: "Quem Somos",
        foot_nav_3: "Nossas Soluções",
        footer_desc_title: "Você vive. Nós resolvemos.",
        opt_casa: "Seguro de Casa",
        faq_cat_about: "Sobre a Better Life",
        mobile_faq: "FAQ",
        footer_location: "Orlando, Flórida",
        copyright_text: "Todos os direitos reservados.",


        

    en: {
          welcome_link: "Welcome",

          stat_1_desc: "Annual traffic accidents in the US",
          stat_2_desc: "Bankruptcies linked to medical debt (Forbes)",
          stat_3_desc: "In climate disaster damages in 2024 (NOAA)",
          stat_4_desc: "Severe workplace accidents/year (NSC)",
          download_pdf: "Download PDF",
          quem_somos_link: "About Us",
          form_success_title: "We received your information, thank you for your interest!",
          form_success_desc: "Soon one of our experts will present the best quote and will be by your side, guiding you through all steps.",
          close_btn: "Close",
          slogan_global: "You live. We handle it.",
          faq_q1: "Can I buy health insurance at any time of the year?",
          faq_a1: "It depends. Marketplace plans can normally be purchased during Open Enrollment. Outside this period, certain life events, like marriage, birth of a child, or loss of coverage, may qualify for a Special Enrollment Period. Our team will analyze your case and guide you through the available options.",
          faq_q2: "How do I choose the ideal health plan for my family?",
          faq_a2: "The choice depends on your income, family composition, the doctors you use, the hospitals in your area, and your budget. BLGI compares options and helps you find the plan best suited to your reality.",
          faq_q3: "Can I keep using my current doctor?",
          faq_a3: "It depends on the provider network of the chosen plan. Before purchasing, we verify if your doctors, hospitals, and labs are part of the in-network providers so you can make an informed decision.",
          faq_q4: "Does life insurance only pay out when someone passes away?",
          faq_a4: "No. Some permanent life insurance policies also offer living benefits, such as access to accumulated cash value, as well as asset protection and financial planning strategies, depending on the policy type.",
          faq_q5: "How much life insurance do I need?",
          faq_a5: "Every family has different needs. We consider income, assets, debts, children, and future goals to recommend a protection amount suitable for your reality.",
          faq_q6: "Is the cheapest car insurance always the best option?",
          faq_a6: "Not always. A lower price might mean reduced coverage limits or the lack of important protections. The best insurance is the one that adequately protects you, your family, and your assets.",
          faq_q7: "What should I do if I get into an accident?",
          faq_a7: "Prioritize the safety of all individuals, contact authorities if necessary, and report to the insurance company as soon as possible. Better Life will also guide you throughout the entire process.",
          faq_q8: "When do I need to buy Commercial Auto insurance?",
          faq_a8: "When the vehicle is used for business activities, such as transporting goods, visiting clients, providing services, or commercial operations. Depending on the usage, a personal auto policy might not provide adequate coverage.",
          faq_q9: "Does home insurance cover hurricanes and storms?",
          faq_a9: "It depends on the policy. In Florida, many coverages include windstorm damages, but there is usually a specific hurricane deductible. We explain exactly which risks are covered before you purchase.",
          faq_q10: "Does home insurance cover floods?",
          faq_a10: "In most cases, no. Flood damage typically requires a separate Flood Insurance policy, even for properties located outside high-risk areas.",
          faq_q11: "Is it worth buying insurance for my pet?",
          faq_a11: "If your pet is part of the family, insurance can help reduce unexpected expenses for consultations, exams, surgeries, and other treatments, depending on the coverage.",
          faq_q12: "Does my business really need insurance?",
          faq_a12: "Every business is exposed to risks. The ideal type of protection depends on the industry, number of employees, contracts, and how the business operates.",
          faq_q13: "What is a Business Owner's Policy (BOP)?",
          faq_a13: "A BOP combines some of the primary coverages for small and medium-sized businesses into a single policy, such as general liability and commercial property protection.",
          faq_q14: "What is General Liability?",
          faq_a14: "It is the insurance that protects the company against third-party claims for property damage, bodily injury, and other losses the business might be held liable for. It is one of the most important coverages for businesses in the US.",
          faq_q15: "When is Workers' Compensation mandatory?",
          faq_a15: "In Florida, the requirement depends on the industry and the number of employees. Our team helps identify when this coverage is required and which solution makes the most sense for your business.",
          faq_q16: "What are Better Life's International Solutions?",
          faq_a16: "They are strategies aimed at families wishing to protect assets, organize succession planning, or build wealth in US dollars through international insurance solutions.",
          faq_q17: "Can someone living in Brazil purchase these solutions?",
          faq_a17: "Yes. We work with an American carrier specialized in international solutions, serving those living in Brazil by understanding their reality and needs. The application and access process is simple and secure.",
          faq_q18: "Does Better Life only work with one insurance company?",
          faq_a18: "No. We are an independent agency and we analyze different carriers to find the most suitable solution for each client.",
          faq_q19: "Can I consolidate all my insurance policies with Better Life?",
          faq_a19: "Yes. Our goal is to solve all the insurance needs for your family and business, bringing together different solutions into a single relationship.",
          faq_q20: "What makes Better Life different from other insurance agencies?",
          faq_a20: "At Better Life, you don't have to figure out insurance on your own. We simplify a complex market, help you make confident decisions, and stand by your side whenever your life changes. Because our commitment isn't just selling an insurance policy, but resolving everything involving the protection of your family, your assets, and your business.",
          site_title: "Better Life Global Insurance | You live. We handle it.",

        nav_faq_1: "Life",
        nav_faq_2: "Health",
        nav_faq_3: "Auto",
        nav_faq_4: "Home",
        nav_faq_5: "Travel",
        nav_faq_6: "Seguro Pets",
        nav_faq_7: "Commercial",
        nav_faq_8: "International",
        opt_vida: "Life",
        opt_saude: "Health",
        opt_carro: "Auto",
        opt_casa: "Home",
        opt_viagem: "Travel",
        opt_pets: "Seguro Pets",
        opt_empresariais: "Commercial",
        opt_internacional: "International",
        footer_col3: "Contact",
        "problem_title": "What problem does this insurance solve?",
        "difference_title": "When does it make a difference?",
        "help_title": "How can Better Life help?",
        "related_title": "Related Solutions",
        "vida_name": "Life Insurance",
        "vida_subtitle": "Financial protection for you and those who depend on you.",
        "vida_problem": "If something happens to you, like a serious illness, accident or even death, family expenses continue. Life Insurance helps you in case of critical illness, or helps your loved ones keep the house, pay bills, pay for children's education and get through a difficult time with greater financial security.",
        "vida_help": "We understand your reality, your responsibilities, and your goals before recommending any solution. Then, we seek the right protection for your family and budget.",
        "vida_difference_0": "When your family depends on your income.",
        "vida_difference_1": "When you have children, a spouse, or relatives under your responsibility.",
        "vida_difference_2": "When there are mortgages, debts, or other major expenses.",
        "vida_difference_3": "When you want to leave a financial legacy for those you love.",
        "vida_difference_4": "When you want to prepare for situations like disability or critical illness with living benefits.",
        "saude_name": "Health Insurance",
        "saude_subtitle": "Access to the best hospitals and doctors, without risking your finances.",
        "saude_problem": "Medical costs in the US are notoriously high. A simple emergency or unexpected illness can generate bills of thousands of dollars, jeopardizing all your savings. Health Insurance ensures you have access to necessary care paying only a predictable fraction of the cost.",
        "saude_help": "We evaluate your health profile, preferred doctors, and budget to find the health plan that offers the best cost-benefit for you or your family.",
        "saude_difference_0": "When you want to avoid medical bankruptcy in case of emergencies.",
        "saude_difference_1": "When you need regular checkups, exams, or continuous treatments.",
        "saude_difference_2": "When you seek access to specialized medical networks.",
        "saude_difference_3": "When you want peace of mind knowing you won't face astronomical bills.",
        "carro_name": "Auto Insurance",
        "carro_subtitle": "Protection against collisions, theft, and third-party liabilities.",
        "carro_problem": "Traffic accidents happen when least expected. Besides the cost of repairing your vehicle, you could be sued if you cause damage to others. Auto Insurance covers these costs, preventing a moment of distraction from turning into a massive debt.",
        "carro_help": "We help you understand coverage limits and deductibles, securing a policy that truly protects your assets in case of a severe accident.",
        "carro_difference_0": "When you use your car daily for commuting or personal travel.",
        "carro_difference_1": "To comply with mandatory state laws for driving.",
        "carro_difference_2": "When you want protection against uninsured or underinsured drivers.",
        "carro_difference_3": "When you need coverage for theft, vandalism, or natural disasters.",
        "residencial_name": "Homeowners Insurance",
        "residencial_subtitle": "Security for your greatest asset and your personal belongings.",
        "residencial_problem": "Your home is likely your biggest investment. Fires, hurricanes, theft, or liability claims (if someone gets hurt on your property) can cause devastating losses. Homeowners Insurance repairs or rebuilds your home and replaces your belongings.",
        "residencial_help": "We analyze your property's location and specific risks (like windstorms) to design a policy that guarantees your home can be rebuilt without financial strain.",
        "residencial_difference_0": "When you own a house or apartment.",
        "residencial_difference_1": "When required by your mortgage lender.",
        "residencial_difference_2": "To protect high-value personal belongings (electronics, jewelry).",
        "residencial_difference_3": "To defend yourself against lawsuits if accidents happen on your property.",
        "viagem_name": "Travel Insurance",
        "viagem_subtitle": "Medical emergencies and unforeseen events anywhere in the world.",
        "viagem_problem": "Your domestic health insurance often provides little or no coverage abroad. A medical emergency in another country can cost a fortune. Travel Insurance covers these medical expenses, trip cancellations, and lost luggage.",
        "viagem_help": "We provide plans that offer comprehensive global coverage so you can travel with absolute peace of mind.",
        "viagem_difference_0": "When traveling internationally for leisure or business.",
        "viagem_difference_1": "When your trip involves high non-refundable costs.",
        "viagem_difference_2": "To ensure access to medical care and evacuation if necessary.",
        "pets_name": "Pet Insurance",
        "pets_subtitle": "Because your best friend also deserves the best care.",
        "pets_problem": "Veterinary treatments, surgeries, and emergency care can cost thousands of dollars. Pet Insurance reimburses these unexpected veterinary bills, allowing you to choose the best treatment for your pet without worrying about the cost.",
        "pets_help": "We help you select plans that fit your pet's breed, age, and your financial comfort level.",
        "pets_difference_0": "When you want to avoid 'economic euthanasia'.",
        "pets_difference_1": "To cover accidents, illnesses, and hereditary conditions.",
        "pets_difference_2": "When you consider your pet a member of the family.",
        "umbrella_name": "Umbrella Insurance",
        "umbrella_subtitle": "An extra layer of liability protection for your assets.",
        "umbrella_problem": "Standard auto and home policies have liability limits. If you are sued for a major accident and the judgment exceeds your limits, your personal assets (savings, home) are at risk. Umbrella Insurance provides additional millions in coverage.",
        "umbrella_help": "We assess your total net worth and exposure to ensure you have the precise extra layer of liability protection to shield your lifelong savings.",
        "umbrella_difference_0": "When your total assets exceed your primary policy limits.",
        "umbrella_difference_1": "When you have a pool, trampoline, or teenage drivers.",
        "umbrella_difference_2": "To protect against major lawsuits and legal fees.",
        "bop_name": "Business Owner's Policy (BOP)",
        "bop_subtitle": "Comprehensive protection tailored for small and medium businesses.",
        "bop_problem": "Small businesses face risks from property damage to customer slip-and-falls. A BOP bundles general liability and commercial property insurance into one cost-effective package, defending your business against common claims and property losses.",
        "bop_help": "We customize the BOP to include specific endorsements your industry needs, ensuring maximum coverage at a competitive rate.",
        "bop_difference_0": "When you operate a small or medium-sized business.",
        "bop_difference_1": "To cover your physical location, equipment, and inventory.",
        "bop_difference_2": "To protect against customer injuries and related lawsuits.",
        "general-liability_name": "General Liability",
        "general-liability_subtitle": "The foundational defense against third-party lawsuits.",
        "general-liability_problem": "If a customer is injured at your business or your employee damages a client's property, you can be sued. General Liability covers legal defense costs and settlements for bodily injury, property damage, and personal injury claims.",
        "general-liability_help": "We analyze your operations to determine the appropriate limits of liability, ensuring a single lawsuit doesn't bankrupt your company.",
        "general-liability_difference_0": "When you interact with clients face-to-face.",
        "general-liability_difference_1": "To sign commercial leases or client contracts.",
        "general-liability_difference_2": "To protect your business from costly, unexpected lawsuits.",
        "workers-comp_name": "Workers' Compensation",
        "workers-comp_subtitle": "Mandatory protection for your employees and your company.",
        "workers-comp_problem": "Employees getting injured on the job can lead to massive medical bills and lost wages. Workers' Compensation covers these costs and protects the employer from being sued directly by the injured employee. It is also legally required in most states.",
        "workers-comp_help": "We secure competitive rates for your payroll class codes and help implement safety programs that can lower your premiums over time.",
        "workers-comp_difference_0": "When you hire your first W-2 employee.",
        "workers-comp_difference_1": "To comply with state labor laws and avoid heavy fines.",
        "workers-comp_difference_2": "To protect your company from workplace injury lawsuits.",
        "commercial-auto_name": "Commercial Auto Insurance",
        "commercial-auto_subtitle": "Coverage for vehicles used for business purposes.",
        "commercial-auto_problem": "Personal auto insurance excludes accidents that happen while conducting business. If an employee causes a wreck in a company car, the business is liable. Commercial Auto provides higher limits and covers vehicles used for work.",
        "commercial-auto_help": "We structure policies that cover your specific vehicles and usage, protecting your business from the massive liability of commercial traffic accidents.",
        "commercial-auto_difference_0": "When you own a fleet of company vehicles.",
        "commercial-auto_difference_1": "When employees use their own cars for business errands.",
        "commercial-auto_difference_2": "To transport goods, equipment, or passengers.",
        "commercial-property_name": "Commercial Property",
        "commercial-property_subtitle": "Protecting your physical business assets and location.",
        "commercial-property_problem": "Fires, storms, or vandalism can destroy your office, inventory, or specialized equipment. Commercial Property Insurance covers the cost to repair or replace your physical assets and can cover lost income while you rebuild.",
        "commercial-property_help": "We accurately value your property and business income exposure to ensure you can quickly rebuild and reopen after a catastrophe.",
        "commercial-property_difference_0": "When you own or lease a commercial building.",
        "commercial-property_difference_1": "When you have expensive inventory or specialized equipment.",
        "commercial-property_difference_2": "To survive a disaster without permanently closing your doors.",
        "professional-liability_name": "Professional Liability (E&O)",
        "professional-liability_subtitle": "Protection against mistakes, negligence, and bad advice.",
        "professional-liability_problem": "Even experts make mistakes. If a client loses money due to your professional advice or service error, they will sue. Errors and Omissions (E&O) covers legal fees and settlements for professional negligence claims.",
        "professional-liability_help": "We identify the unique professional risks in your industry to provide a policy that defends your reputation and your bottom line.",
        "professional-liability_difference_0": "When you provide professional services or advice (consultants, brokers, tech).",
        "professional-liability_difference_1": "When a mistake on your part could cost a client financially.",
        "professional-liability_difference_2": "To fulfill requirements in professional service contracts.",
        "cyber-liability_name": "Cyber Liability",
        "cyber-liability_subtitle": "Defense against data breaches and cyber extortion.",
        "cyber-liability_problem": "Hackers target businesses of all sizes. A data breach involving client information or a ransomware attack can halt operations and incur massive regulatory fines and recovery costs. Cyber Liability covers these modern digital risks.",
        "cyber-liability_help": "We pair you with carriers that not only pay claims but provide rapid-response IT teams to stop the breach and recover your systems.",
        "cyber-liability_difference_0": "When you store customer data, credit cards, or medical records.",
        "cyber-liability_difference_1": "To cover ransomware payments, data recovery, and legal fees.",
        "cyber-liability_difference_2": "To survive the downtime caused by a cyber attack.",
        "surety-bonds_name": "Surety Bonds",
        "surety-bonds_subtitle": "Financial guarantees for contracts and licenses.",
        "surety-bonds_problem": "Clients and governments often require a guarantee that you will fulfill a contract or follow regulations. A Surety Bond acts as a financial guarantee that you will perform the agreed-upon work or follow the law.",
        "surety-bonds_help": "We leverage our carrier relationships to secure your required bonds quickly and with favorable terms, empowering you to win more contracts.",
        "surety-bonds_difference_0": "To bid on construction or government contracts.",
        "surety-bonds_difference_1": "To obtain specific business licenses (e.g., auto dealers, contractors).",
        "surety-bonds_difference_2": "To guarantee your performance to a client.",
        "vida-soluções internacionais_name": "International Life Insurance",
        "vida-soluções internacionais_subtitle": "Global wealth protection in strong currency.",
        "vida-soluções internacionais_problem": "High-net-worth individuals living outside the US face currency devaluation and local economic instability. International Life Insurance allows them to secure a massive death benefit in US Dollars, protecting their family's global purchasing power.",
        "vida-soluções internacionais_help": "We specialize in international underwriting, navigating the complexities of cross-border wealth protection to secure policies in the US for global clients.",
        "vida-soluções internacionais_difference_0": "For foreign nationals seeking asset protection in US Dollars.",
        "vida-soluções internacionais_difference_1": "To bypass local economic and political instability.",
        "vida-soluções internacionais_difference_2": "To provide a highly liquid, tax-advantaged inheritance.",
        "protecao-patrimonial_name": "Wealth Protection",
        "protecao-patrimonial_subtitle": "Shielding your assets from extreme vulnerabilities.",
        "protecao-patrimonial_problem": "Accumulated wealth is constantly threatened by lawsuits, market crashes, and excessive taxation. Wealth Protection strategies utilize specialized life insurance and annuities to legally shield your capital and ensure it grows safely.",
        "protecao-patrimonial_help": "We work alongside your legal and tax advisors to implement insurance structures that form an impenetrable fortress around your hard-earned wealth.",
        "protecao-patrimonial_difference_0": "When you have significant liquid assets to protect.",
        "protecao-patrimonial_difference_1": "To shield wealth from aggressive litigation and creditors.",
        "protecao-patrimonial_difference_2": "To create conservative, tax-deferred growth buckets.",
        "sucessao_name": "Estate Planning & Succession",
        "sucessao_subtitle": "Ensuring a smooth, tax-efficient transfer of wealth.",
        "sucessao_problem": "Without proper planning, estate taxes and legal probate can consume a massive portion of the wealth you intend to leave behind. Life insurance provides immediate, tax-free liquidity to pay estate taxes, preventing the forced sale of assets.",
        "sucessao_help": "We structure policies often owned by irrevocable trusts to ensure your wealth transfers exactly as you intend, entirely bypassing the IRS.",
        "sucessao_difference_0": "When your estate is large enough to trigger federal estate taxes.",
        "sucessao_difference_1": "To instantly equalize inheritances among multiple heirs.",
        "sucessao_difference_2": "To fund buy-sell agreements for business succession.",
        "estrategias-patrimoniais_name": "Advanced Wealth Strategies",
        "estrategias-patrimoniais_subtitle": "Premium financing and complex structures for the ultra-wealthy.",
        "estrategias-patrimoniais_problem": "High-net-worth individuals do not want to liquidate high-performing assets to pay massive insurance premiums. Advanced strategies like Premium Financing allow them to use bank leverage to pay for the insurance, keeping their capital invested.",
        "estrategias-patrimoniais_help": "We possess the elite expertise and banking relationships required to structure and manage sophisticated premium financing arrangements safely.",
        "estrategias-patrimoniais_difference_0": "For ultra-high-net-worth individuals and large estates.",
        "estrategias-patrimoniais_difference_1": "When leverage and arbitrage can optimize capital efficiency.",
        "estrategias-patrimoniais_difference_2": "To acquire massive life insurance policies without liquidating assets.",

      nav_services: "Insurance",
      nav_about: "About Us",
      nav_diff: "Why BLGI?",
      nav_video: "Welcome",
      nav_lib: "Library",
      nav_faq: "FAQ",
      nav_cta: "REQUEST QUOTE",
      
      hero_eyebrow: "You live. We handle it.",
      hero_title: "All the protection your family needs",
      "hero_subtitle": "Life, Health, Auto, Home, Business, and International Solutions...",
      hero_cta_1: "Request a Quote",
      hero_cta_2: "Talk on WhatsApp",
      
      badge_secure: "Total Protection",
      badge_expert: "VIP Consulting",
      
      "hero_help": "HOW CAN WE HELP YOU?",
      quick_saude: "HEALTH",
      quick_vida: "LIFE",
      quick_carro: "AUTO",
      quick_casa: "HOME",
      quick_empresa: "BUSINESS",
      quick_inter: "INTERNATIONAL",
      
      auth_fam: "In Secured Assets",
      auth_years: "Years of Experience",
      auth_states: "Concierge Service",
      auth_lang: "Global Partners",
      
      eyebrow_import: "Vision for the Future",
      import_check_1: "We secure your children's future.",
      import_check_2: "Escolhemos entre diversas seguradoras a opção que faz mais sentido para você.",
      import_check_3: "Cuidamos da contratação, das revisões e do relacionamento com as seguradoras.",
      import_check_4: "Acompanhamos você sempre que sua vida, sua família ou seu patrimônio mudarem.",
      import_check_conc: "Você vive sua vida. Nós permanecemos ao seu lado em cada etapa.",
      import_title: "WE ARE BY YOUR SIDE",
      btn_schedule: "Request Quote",
      
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
      
      video_placeholder_text: "AVAILABLE SOON",
      
      eyebrow_services: "Our Solutions",
      services_title: "All the protection you need in one place",
      "services_subtitle": "A massive portfolio strategically designed to meet the life and business protection needs of the Brazilian community.",
      
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
      form_title: "WHICH INSURANCE ARE YOU LOOKING FOR?",
      form_desc: "Fill out the form below and one of our experts will contact you with a customized quote and strategy for your reality.",
      "form_name": "Full Name",
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
      lib_1_title: "Seguro de Vida com Benefício em Vida (Living Benefits)",
      lib_1_desc: "How to accumulate USD wealth and protect your family at the same time.",
      lib_2_title: "Opções de Seguro Saúde nos Estados Unidos",
      lib_2_desc: "Everything immigrants need to know to avoid Tax Return penalties.",
      lib_3_title: "O que é o General Liability Insurance?",
      lib_3_desc: "General Liability and Workers Comp. Don't lose your business to a lawsuit.",
      lib_btn: "Download PDF",
      
      srv_p_title: "Personal Insurance",
      srv_e_title: "Business Insurance",
      srv_i_title: "International Solutions",
      
      // Personal
      srv_p_1: "Life Insurance",
      srv_p_1_d: "Financial security for those who matter most.",
      srv_p_2: "Health Insurance",
      srv_p_2_d: "More health access. More peace of mind for your family.",
      srv_p_3: "Auto Insurance",
      srv_p_3_d: "Protection for every mile of your journey.",
      srv_p_4: "Home Insurance",
      srv_p_4_d: "Protect the wealth you've worked hard to build.",
      srv_p_5: "Travel Insurance",
      srv_p_5_d: "Travel safely protected wherever you are.",
      srv_p_6: "Pet Insurance",
      srv_p_6_d: "Protection to care for those who are part of your family.",
      srv_p_7: "Umbrella Insurance",
      srv_p_7_d: "An extra layer of protection against major liabilities.",

      // Business
      srv_e_1: "Business Owner Policy (BOP)",
      srv_e_1_d: "Smart and comprehensive protection for small businesses.",
      srv_e_2: "General Liability",
      srv_e_2_d: "Shielding against lawsuits and third-party damages.",
      srv_e_3: "Workers' Compensation",
      srv_e_3_d: "Care for those who make your company grow.",
      srv_e_4: "Commercial Auto",
      srv_e_4_d: "Protection for your business fleet.",
      srv_e_5: "Commercial Property",
      srv_e_5_d: "Total protection for your business space and assets.",
      srv_e_6: "Professional Liability (E&O)",
      srv_e_6_d: "Work safely in your technical decisions.",
      srv_e_7: "Cyber Liability",
      srv_e_7_d: "Modern shielding against digital threats.",
      srv_e_8: "Surety Bonds",
      srv_e_8_d: "Credibility and guarantee for major projects.",

      // International
      srv_i_1: "International Life Insurance",
      srv_i_1_d: "Global strategies to protect your family without borders.",
      srv_i_2: "International Wealth Protection",
      srv_i_2_d: "Shielding and currency security for your capital.",
      srv_i_3: "International Estate Planning",
      srv_i_3_d: "Preserve your legacy for the next generations efficiently.",
      srv_i_4: "Dollar Income Generation",
      srv_i_4_d: "Secure solutions to build and profit in hard currency.",

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
      
      
      copyright_text: "All rights reserved.",
      legal_privacy: "Privacy Policy",
      legal_terms: "Terms of Use"
    }
  
        story_1_author: "Mariana Silva",
        story_1_city: "Orlando, FL",
        story_1_text: "\"The healthcare system here always scared me. BLGI found the perfect plan for my family, explaining everything clearly. Total trust!\"",
        story_2_author: "Ricardo Mendes",
        story_2_city: "Boca Raton, FL",
        story_2_text: "\"I got my home and auto insurance with them. Their agility and clarity on coverage options are impressive. Highly recommend.\"",
        story_3_author: "Thiago Costa",
        story_3_city: "Miami, FL",
        story_3_text: "\"As a business owner, I needed General Liability. They got my policy sorted the same day. Such a relief to have this support.\"",
        foot_nav_2: "About Us",
        foot_nav_3: "Our Solutions",
        news_title: "News and Content",
        footer_desc_title: "You live. We handle it.",
        

        opt_casa: "Home Insurance",
        faq_cat_about: "About Better Life",
        mobile_faq: "FAQ",

        footer_location: "Orlando, Florida",
        copyright_text: "All rights reserved.",
};

  const langCheckbox = document.getElementById('lang-toggle');
  const i18nElements = document.querySelectorAll('[data-i18n]');

  
  const savedLang = localStorage.getItem('lang') || 'pt';
  if(langCheckbox && savedLang === 'en') { 
    langCheckbox.checked = true; 
  }
  
  function applyLanguage(lang) {
      i18nElements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
          el.innerHTML = translations[lang][key];
        }
      });
    }
  
    if (savedLang === 'en') { 
    applyLanguage('en');
  }

if (langCheckbox) {
    langCheckbox.addEventListener('change', (e) => {
        const lang = e.target.checked ? 'en' : 'pt';
        localStorage.setItem('lang', lang);
        applyLanguage(lang);
      });
    });
  }
});


// Handle Contact Form Submission
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const interestEl = document.getElementById('interest');
      const interestText = interestEl.options[interestEl.selectedIndex].text;
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      
      let message = `Olá! Gostaria de solicitar uma cotação para ${interestText}.\n\n`;
      if (name) message += `Nome: ${name}\n`;
      if (phone) message += `Telefone: ${phone}\n`;
      if (email) message += `E-mail: ${email}\n`;
      
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/16892980422?text=${encodedMessage}`, '_blank');
      
      contactForm.reset();
    });
  }
});

