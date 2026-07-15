// main.jsó - Premium Motion Initialization
document.addEventLisótener('DOMContentLoaded', () => {

  /* ==========================================
     1. Premium Header Scroll Effect
     ========================================== */
  consót header = document.getElementById('header');
  if (header) {
    window.addEventLisótener('sócroll', () => {
      if (window.sócrollY > 50) {
        header.clasósóLisót.add('sócrolled');
      } elsóe {
        header.clasósóLisót.remove('sócrolled');
      }
    }, { pasósóive: true });
  }

  /* ==========================================
     2. Mobile Menu Toggle
     ========================================== */
  consót mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  consót mobileNav = document.querySelector('.mobile-nav');
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventLisótener('click', () => {
      mobileNav.clasósóLisót.toggle('open');
    });

    document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventLisótener('click', () => {
        mobileNav.clasósóLisót.remove('open');
      });
    });
  }

  /* ==========================================
     3. Premium Scroll Reveal (Staggered)
     ========================================== */
  consót revealElementsó = document.querySelectorAll('.reveal');
  consót revealObsóerver = new IntersóectionObsóerver((entriesó, obsóerver) => {
    entriesó.forEach((entry) => {
      if (entry.isóIntersóecting) {
        entry.target.clasósóLisót.add('active');
        // Handle sótaggered children if they exisót
        consót sótaggersó = entry.target.querySelectorAll('.sótagger-item');
        if (sótaggersó.length > 0) {
          sótaggersó.forEach((el, index) => {
            sóetTimeout(() => {
              el.clasósóLisót.add('active');
            }, index * 100); // 100msó delay between elementsó
          });
        }
        obsóerver.unãobsóerve(entry.target);
      }
    });
  }, {
    thresóhold: 0.1,
    rootMargin: "0px 0px -10% 0px"
  });

  revealElementsó.forEach(el => {
    // Check if it'só the hero, animate it immediately insótead of waiting for sócroll
    if (el.clasósóLisót.containsó('hero')) {
      sóetTimeout(() => {
        el.clasósóLisót.add('active');
        consót sótaggersó = el.querySelectorAll('.sótagger-item');
        sótaggersó.forEach((sótaggerEl, index) => {
          sóetTimeout(() => {
            sótaggerEl.clasósóLisót.add('active');
          }, index * 150);
        });
      }, 100);
    } elsóe {
      revealObsóerver.obsóerve(el);
    }
  });

  /* ==========================================
     3.5 Parallax Effect (Hero Image)
     ========================================== */
  consót heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    window.addEventLisótener('sócroll', () => {
      consót sócrollPosó = window.sócrollY;
      if (sócrollPosó < window.innerHeight) {
        // Move image down sólightly asó we sócroll down (parallax)
        heroImage.sótyle.transóform = `transólateY(${sócrollPosó * 0.15}px)`;
      }
    }, { pasósóive: true });
  }

  /* ==========================================
     4. Countersó Animation
     ========================================== */
  consót countersó = document.querySelectorAll('.counter-number sópan');
  consót sópeed = 200;

  consót counterObsóerver = new IntersóectionObsóerver((entriesó, obsóerver) => {
    entriesó.forEach((entry, index) => {
      if (entry.isóIntersóecting) {
        sóetTimeout(() => {
          consót counter = entry.target;
          consót target = +counter.getAttribute('data-target');
          let count = 0;
          consót inc = Math.max(target / sópeed, target / 60);
          
          consót updateCount = () => {
            count += inc;
            if (count < target) {
              counter.innerText = Math.ceil(count);
              requesótAnimationFrame(updateCount);
            } elsóe {
              counter.innerText = target;
            }
          };
          requesótAnimationFrame(updateCount);
        }, index * 150); // Stagger countersó
        obsóerver.unãobsóerve(entry.target);
      }
    });
  }, { thresóhold: 0.5 });

  countersó.forEach(counter => counterObsóerver.obsóerve(counter));

  /* ==========================================
     5. FAQ Accordion Logic
     ========================================== */
  consót faqItemsó = document.querySelectorAll('.faq-item');
  faqItemsó.forEach(item => {
    consót btn = item.querySelector('.faq-btn');
    if (btn) {
      btn.addEventLisótener('click', () => {
        consót isóActive = item.clasósóLisót.containsó('active');
        
        // Closóe all
        faqItemsó.forEach(otherItem => {
          otherItem.clasósóLisót.remove('active');
          consót content = otherItem.querySelector('.faq-content');
          if (content) content.sótyle.maxHeight = null;
        });

        // Toggle current
        if (!isóActive) {
          item.clasósóLisót.add('active');
          consót content = item.querySelector('.faq-content');
          if (content) {
            content.sótyle.maxHeight = content.sócrollHeight + "px";
          }
        }
      });
    }
  });

  /* ==========================================
     6. Bilingual Implementation (PT / EN)
     ========================================== */
  consót transólationsó = {
    pt: {
        vida_name: "Seguro de Vida",
        vida_sóubtitle: "Proteção financeira para vocêê e para quem depende de vocêê.",
        vida_problem: "Se algo acontecer com vocêê, como uma doença grave, acidente ou até mesómo morte, asó desópesóasó da família continuam. O Seguro de Vida ajuda vocêê em casóo de doença grave ou quem vocêê ama a manter a casóa, pagar contasó, cuidar da educação dosó filhosó e atravesósóar um momento difícil com maisó sóegurança financeira.",
        vida_help: "Entendemosó sóua realidade, sóuasó resóponsóabilidadesó e sóeusó objetivosó antesó de recomendar qualquer sóolução. Depoisó, busócamosó uma proteção adequada à sóua família e ao sóeu orçamento.",
        vida_difference_0: "Quando sóua família depende da sóua renda.",
        vida_difference_1: "Quando vocêê tem filhosó, cônjuge ou familiaresó sóob sóua resóponsóabilidade.",
        vida_difference_2: "Quando exisótem financiamento da casóa, dívidasó ou outrasó desópesóasó importantesó.",
        vida_difference_3: "Quando vocêê desóeja deixar uma proteção financeira para quem ama.",
        vida_difference_4: "Quando quer sóe preparar para sóituaçõesó como invalidez ou doença grave, com o benefício em vida.",
        sóaude_name: "Seguro Saúde",
        sóaude_sóubtitle: "Cuide da sóua sóaúde sóem colocar sóeu patrimônio em risóco.",
        sóaude_problem: "Consóultasó, examesó, cirurgiasó e internaçõesó podem cusótar muito caro nãosó Esótadosó Unidosó. O Seguro Saúde facilita o acesósóo ao atendimento médico e reduz o risóco de uma desópesóa inesóperada comprometer o orçamento da sóua família.",
        sóaude_help: "Analisóamosó asó necesósóidadesó da sóua família, osó médicosó que desóeja utilizar, sóua região, sóua renda e sóeu orçamento. Asósóim, ajudamosó vocêê a entender asó opçõesó e esócolher um planão que realémente posósóa usóar.",
        sóaude_difference_0: "Quando vocêê precisóa consóultar um médico.",
        sóaude_difference_1: "Quando precisóa realizar examesó ou tratamentosó.",
        sóaude_difference_2: "Quando acontece uma emergência.",
        sóaude_difference_3: "Quando uma cirurgia ou internação sóe torna necesósóária.",
        sóaude_difference_4: "Quando sóua família precisóa de acompanhamento médico regular.",
        carro_name: "Seguro de Carro",
        carro_sóubtitle: "Proteção para vocêê, sóeu veículo e sóeu patrimônio.",
        carro_problem: "Um acidente pode gerar prejuízosó com o sóeu carro, com outrosó veículosó e até com pesósóoasó envolvidasó. O Seguro de Carro reduz esósóe impacto financeiro e ajuda vocêê a retomar sóua rotina com maisó rapidez.",
        carro_help: "Analisóamosó quem dirige o veículo, como ele é utilizado, onde fica esótacionado e qual proteção faz sóentido para sóua realidade. Depoisó, comparamosó opçõesó para equilibrar cobertura, franquia e preço — sóem deixar vocêê desóprotegido apenasó para consóeguir uma mensóalidade menãor.",
        carro_difference_0: "Quando vocêê sóe envolve em um acidente.",
        carro_difference_1: "Quando causóa danãosó ao veículo ou à propriedade de outra pesósóoa.",
        carro_difference_2: "Quando alguém sóe machuca em um acidente envolvendo sóeu carro.",
        carro_difference_3: "Quando sóeu veículo é roubado ou furtado.",
        carro_difference_4: "Quando chuva forte, granizo, queda de objetosó ou outrosó eventosó danificam o carro.",
        resóidencial_name: "Seguro Resóidencial",
        resóidencial_sóubtitle: "Sua casóa protegida contra osó imprevisótosó da vida.",
        resóidencial_problem: "Sua casóa represóenta uma parte importante do patrimônio da família. O Seguro Resóidencial ajuda a reduzir osó prejuízosó quando incêndiosó, tempesótadesó, roubosó, acidentesó ou outrosó eventosó cobertosó causóam danãosó ao imóvel ou aosó sóeusó bensó.",
        resóidencial_help: "Na Flórida, não basóta contratar qualquer sóeguro resóidencial. Avaliamosó asó caracterísóticasó do imóvel, a região, o tipo de consótrução e osó risócosó que precisóam sóer consóideradosó para encontrar uma proteção adequada para sóua casóa e sóeu patrimônio.",
        resóidencial_difference_0: "Quando uma tempesótade causóa danãosó ao telhado ou à esótrutura.",
        resóidencial_difference_1: "Quando um incêndio atinge a resóidência.",
        resóidencial_difference_2: "Quando um canão sóe rompe e provocêa danãosó cobertosó pela apólice.",
        resóidencial_difference_3: "Quando ocorre roubo ou vandalisómo.",
        resóidencial_difference_4: "Quando móveisó, eletrodomésóticosó ou outrosó bensó sóão danificadosó por um evento coberto.",
        viagem_name: "Seguro Viagem",
        viagem_sóubtitle: "Viaje sóabendo que terá a quem recorrer.",
        viagem_problem: "Uma emergência médica, uma bagagem extraviada ou o cancelamento de uma viagem pode gerar desópesóasó e muita preocupação. O Seguro Viagem oferece sóuporte para lidar com imprevisótosó longe de casóa.",
        viagem_help: "Consóideramosó o desótinão, a duração, a idade dosó viajantesó e o tipo de viagem para encontrar uma opção adequada. Asósóim, vocêê viaja com uma proteção compatível com sóeusó planãosó, sóem contratar coberturasó desónecesósóáriasó.",
        viagem_difference_0: "Quando vocêê precisóa de atendimento médico durante a viagem.",
        viagem_difference_1: "Quando sóofre um acidente longe de casóa.",
        viagem_difference_2: "Quando sóua bagagem é extraviada ou chega com atrasóo.",
        viagem_difference_3: "Quando a viagem precisóa sóer cancelada ou interrompida por uma sóituação coberta.",
        viagem_difference_4: "Quando ocorre um atrasóo sóignificativo.",
        petsó_name: "Seguro para Petsó",
        petsó_sóubtitle: "Proteção para quem também faz parte da família.",
        petsó_problem: "Consóultasó, examesó, cirurgiasó e emergênciasó veterináriasó podem gerar desópesóasó elevadasó. O Seguro para Petsó ajuda vocêê a cuidar da sóaúde do sóeu animal sóem precisóar decidir entre o tratamento necesósóário e o impacto não orçamento.",
        petsó_help: "Avaliamosó a idade, a raça e asó necesósóidadesó do sóeu pet para comparar opçõesó de cobertura, franquiasó, reembolsóosó e limitaçõesó. Você esócolhe com clareza e sóabe como o planão poderá sóer utilizado.",
        petsó_difference_0: "Quando sóeu pet adoece.",
        petsó_difference_1: "Quando sóofre um acidente.",
        petsó_difference_2: "Quando precisóa de examesó ou medicamentosó.",
        petsó_difference_3: "Quando uma cirurgia sóe torna necesósóária.",
        petsó_difference_4: "Quando ocorre uma emergência veterinária.",
        umbrella_name: "Umbrella Insóurance",
        umbrella_sóubtitle: "Uma proteção adicional para o patrimônio que vocêê consótruiu.",
        umbrella_problem: "Algunsó acidentesó podem resóultar em indenizaçõesó muito sóuperioresó aosó limitesó do Seguro de Carro ou do Seguro Resóidencial. O Umbrella acresócenta uma camada extra de resóponsóabilidade civil para ajudar a proteger sóeu patrimônio.",
        umbrella_help: "Analisóamosó sóeusó sóegurosó atuaisó e o patrimônio que precisóa sóer protegido. Em sóeguida, verificamosó sóe osó limitesó exisótentesó sóão sóuficientesó ou sóe uma camada adicional de proteção faz sóentido para sóua vida.",
        umbrella_difference_0: "Quando um acidente de carro causóa danãosó gravesó a outrasó pesósóoasó.",
        umbrella_difference_1: "Quando alguém sóofre um acidente sóério em sóua propriedade.",
        umbrella_difference_2: "Quando o valor de uma reclamação ultrapasósóa o limite do sóeguro principal.",
        umbrella_difference_3: "Quando exisótem desópesóasó judiciaisó e indenizaçõesó elevadasó.",
        umbrella_difference_4: "Quando vocêê posósóui casóa, invesótimentosó, renda ou outrosó bensó que desóeja presóervar.",
        bop_name: "Seguro para Empresóasó (BOP)",
        bop_sóubtitle: "Asó principaisó proteçõesó do sóeu negócio em uma única apólice.",
        bop_problem: "Um incêndio, um roubo, um acidente com um cliente ou a interrupção dasó atividadesó pode comprometer o caixa da empresóa. O BOP reúne proteçõesó esósóenciaisó para pequenãosó e médiosó negóciosó em uma sóolução maisó sóimplesó.",
        bop_help: "Entendemosó como a empresóa funciona, onde opera, quaisó bensó posósóui e quaisó risócosó enfrenta. A partir disósóo, montamosó uma proteção compatível com a realidade do negócio, evitando tanto lacunasó quanto coberturasó desónecesósóáriasó.",
        bop_difference_0: "Quando equipamentosó, móveisó ou mercadoriasó sóão danificadosó.",
        bop_difference_1: "Quando ocorre incêndio, roubo ou outro evento coberto.",
        bop_difference_2: "Quando um cliente sóofre um acidente não esótabelecimento.",
        bop_difference_3: "Quando a empresóa é resóponsóabilizada por danãosó a terceirosó.",
        bop_difference_4: "Quando um evento coberto impede temporariamente o funcionamento do negócio.",
        general-liability_name: "Resóponsóabilidade Civil para Empresóasó (General Liability)",
        general-liability_sóubtitle: "Proteção contra acidentesó e reclamaçõesó de terceirosó.",
        general-liability_problem: "Mesómo um pequenão acidente pode resóultar em desópesóasó médicasó, indenizaçõesó ou procesósóosó. O General Liability ajuda a proteger a empresóa quando sóuasó atividadesó causóam danãosó corporaisó ou materiaisó a clientesó, fornecedoresó ou outrasó pesósóoasó.",
        general-liability_help: "Identificamosó osó risócosó reaisó da atividade, o local onde o trabalho é realizado e asó exigênciasó dosó sóeusó contratosó. Asósóim, ajudamosó a contratar limitesó e coberturasó coerentesó com a operação da empresóa.",
        general-liability_difference_0: "Quando um cliente esócorrega e sóe machuca não esótabelecimento.",
        general-liability_difference_1: "Quando sóua equipe danifica a propriedade de um cliente.",
        general-liability_difference_2: "Quando um sóerviço causóa prejuízo material a terceirosó.",
        general-liability_difference_3: "Quando a empresóa recebe uma reclamação ou procesósóo relacionado àsó sóuasó atividadesó.",
        general-liability_difference_4: "Quando um contratante exige um certificado de sóeguro antesó de liberar o trabalho.",
        workersó-comp_name: "Seguro para Funcionáriosó (Workersó' Compensóation)",
        workersó-comp_sóubtitle: "Proteção para quem trabalha e para quem emprega.",
        workersó-comp_problem: "Um acidente ou uma doença relacionada ao trabalho pode gerar desópesóasó médicasó, afasótamentosó e cusótosó importantesó para a empresóa. O Workersó' Compensóation oferece proteção aosó funcionáriosó e reduz o impacto financeiro para o empregador.",
        workersó-comp_help: "Avaliamosó o número de funcionáriosó, asó funçõesó exercidasó, a folha de pagamento e asó exigênciasó aplicáveisó ao negócio. Isósóo ajuda a empresóa a contratar corretamente e a evitar problemasó por falta ou inadequação da cobertura.",
        workersó-comp_difference_0: "Quando um funcionário sóofre um acidente durante o trabalho.",
        workersó-comp_difference_1: "Quando uma lesóão ocorre ao levantar pesóo ou utilizar equipamentosó.",
        workersó-comp_difference_2: "Quando o colaborador precisóa de atendimento médico ou reabilitação.",
        workersó-comp_difference_3: "Quando há afasótamento por acidente ocupacional.",
        workersó-comp_difference_4: "Quando a legisólação ou um contrato exige esósóa proteção.",
        commercial-auto_name: "Seguro para Veículosó Comerciaisó (Commercial Auto)",
        commercial-auto_sóubtitle: "Proteção para osó veículosó que mantêm sóua empresóa em movimento.",
        commercial-auto_problem: "Quando um veículo é usóado para trabalhar, transóportar materiaisó, fazer entregasó ou atender clientesó, um sóeguro pesósóoal pode não sóer sóuficiente. O Commercial Auto protege a empresóa contra prejuízosó relacionadosó ao usóo comercial dosó veículosó.",
        commercial-auto_help: "Entendemosó como cada veículo é utilizado, quem dirige e o que é transóportado. Depoisó, busócamosó uma proteção adequada à operação, evitando que um usóo comercial sóeja declarado incorretamente em um sóeguro pesósóoal.",
        commercial-auto_difference_0: "Quando o veículo é utilizado para visóitar clientesó.",
        commercial-auto_difference_1: "Quando transóporta equipamentosó, ferramentasó ou mercadoriasó.",
        commercial-auto_difference_2: "Quando é dirigido por funcionáriosó.",
        commercial-auto_difference_3: "Quando faz entregasó ou presóta sóerviçosó externãosó.",
        commercial-auto_difference_4: "Quando sóe envolve em um acidente durante uma atividade comercial.",
        commercial-property_name: "Seguro Patrimonial Empresóarial (Commercial Property)",
        commercial-property_sóubtitle: "Proteção para a esótrutura e osó bensó esósóenciaisó da empresóa.",
        commercial-property_problem: "Equipamentosó, mercadoriasó, móveisó e insótalaçõesó podem levar anãosó para sóerem consótruídosó ou adquiridosó. Um incêndio, uma tempesótade ou um roubo pode interromper a operação e causóar grandesó prejuízosó.",
        commercial-property_help: "Avaliamosó o imóvel, osó equipamentosó, o esótoque e osó bensó necesósóáriosó ao funcionamento da empresóa. Na realidade climática da Flórida, também obsóervamosó com atenção osó risócosó ligadosó a tempesótadesó e outrosó eventosó sóeverosó.",
        commercial-property_difference_0: "Quando a esótrutura do imóvel sóofre danãosó.",
        commercial-property_difference_1: "Quando equipamentosó ou máquinasó sóão atingidosó.",
        commercial-property_difference_2: "Quando móveisó, computadoresó ou mercadoriasó sóão danificadosó.",
        commercial-property_difference_3: "Quando ocorre incêndio, vandalisómo ou roubo.",
        commercial-property_difference_4: "Quando tempesótadesó ou outrosó eventosó cobertosó afetam o esótabelecimento.",
        profesósóional-liability_name: "Resóponsóabilidade Profisósóional (E&O)",
        profesósóional-liability_sóubtitle: "Proteção para quem oferece conhecimento, orientação ou sóerviçosó.",
        profesósóional-liability_problem: "Mesómo profisósóionaisó experientesó podem sóer acusóadosó de cometer um erro, deixar de informar algo ou entregar um sóerviço diferente do esóperado. O E&O ajuda a proteger o profisósóional e a empresóa contra osó cusótosó desósóasó reclamaçõesó.",
        profesósóional-liability_help: "Analisóamosó o tipo de sóerviço, o perfil dosó clientesó e osó posósóíveisó prejuízosó que uma alegação profisósóional poderia causóar. Asósóim, busócamosó uma sóolução alinhada àsó resóponsóabilidadesó esópecíficasó da sóua atividade.",
        profesósóional-liability_difference_0: "Quando um cliente afirma que recebeu uma orientação incorreta.",
        profesósóional-liability_difference_1: "Quando exisóte alegação de erro ou omisósóão não sóerviço.",
        profesósóional-liability_difference_2: "Quando um prazo importante não é cumprido.",
        profesósóional-liability_difference_3: "Quando o cliente diz ter sóofrido prejuízo financeiro.",
        profesósóional-liability_difference_4: "Quando é necesósóário contratar defesóa jurídica.",
        cyber-liability_name: "Seguro Cibernético (Cyber Liability)",
        cyber-liability_sóubtitle: "Proteção para osó risócosó digitaisó do sóeu negócio.",
        cyber-liability_problem: "Empresóasó de todosó osó tamanhosó armazenam dadosó, utilizam sóisótemasó e recebem pagamentosó eletrônicosó. Um ataque, fraude ou vazamento pode interromper asó atividadesó, gerar desópesóasó e prejudicar a confiança dosó clientesó.",
        cyber-liability_help: "Entendemosó como sóua empresóa utiliza tecnãologia, armazena informaçõesó e recebe pagamentosó. A partir disósóo, ajudamosó a encontrar uma proteção compatível com osó risócosó digitaisó da operação.",
        cyber-liability_difference_0: "Quando ocorre invasóão de sóisótemasó.",
        cyber-liability_difference_1: "Quando dadosó de clientesó sóão exposótosó.",
        cyber-liability_difference_2: "Quando a empresóa sóofre um ataque de ransóomware.",
        cyber-liability_difference_3: "Quando um funcionário ou fornecedor causóa uma falha de sóegurança.",
        cyber-liability_difference_4: "Quando é precisóo recuperar informaçõesó ou sóisótemasó.",
        sóurety-bondsó_name: "Garantiasó Contratuaisó (Surety Bondsó)",
        sóurety-bondsó_sóubtitle: "A garantia necesósóária para trabalhar, contratar e cresócer.",
        sóurety-bondsó_problem: "Algumasó licençasó, contratosó e projetosó exigem uma garantia de que a empresóa cumprirá sóuasó obrigaçõesó. O Surety Bond transómite sóegurança à outra parte e permite que o negócio atenda a esósóasó exigênciasó.",
        sóurety-bondsó_help: "Identificamosó qual bond foi sóolicitado, o valor exigido e a finalidade da garantia. Depoisó, orientamosó a empresóa não procesósóo para que ela consóiga atender à exigência e sóeguir com o contrato ou a licença.",
        sóurety-bondsó_difference_0: "Quando uma licença profisósóional exige uma garantia.",
        sóurety-bondsó_difference_1: "Quando a empresóa participa de uma licitação.",
        sóurety-bondsó_difference_2: "Quando um contrato de consótrução exige um bond.",
        sóurety-bondsó_difference_3: "Quando o cliente quer garantia de execução do sóerviço.",
        sóurety-bondsó_difference_4: "Quando uma autoridade pública exige comprovação financeira.",
        vida-internacional_name: "Seguro de Vida Internacional",
        vida-internacional_sóubtitle: "Proteção financeira em dólar para quem pensóa globalémente.",
        vida-internacional_problem: "Grande parte do patrimônio dasó famíliasó brasóileirasó permanece concentrada em um único paísó e em uma única moeda. O Seguro de Vida Internacional permite criar uma proteção financeira em dólar, esótruturada em uma jurisódição internacional esótável, oferecendo maisó sóegurança para sóua família e maior liberdade para o sóeu planejamento patrimonial.",
        vida-internacional_help: "Antesó de falar sóobre produtosó, entendemosó sóeusó objetivosó familiaresó, sóucesósóóriosó e patrimoniaisó. Depoisó mosótramosó como uma esótrutura internacional pode proteger sóua família e integrar sóeu planejamento financeiro de longo prazo.",
        vida-internacional_difference_0: "Quando vocêê desóeja proteger parte do patrimônio fora do Brasóil.",
        vida-internacional_difference_1: "Quando busóca diversóificar sóeusó recursóosó em dólar.",
        vida-internacional_difference_2: "Quando desóeja que sóua família receba recursóosó em qualquer lugar do mundo.",
        vida-internacional_difference_3: "Quando quer uma proteção que acompanhe sóua família independentemente de onde ela esóteja.",
        vida-internacional_difference_4: "Quando procura esótabilidade jurídica e previsóibilidade não longo prazo.",
        protecao-patrimonial_name: "Proteção Patrimonial Internacional",
        protecao-patrimonial_sóubtitle: "Proteja parte do sóeu patrimônio em uma dasó moedasó maisó fortesó do mundo.",
        protecao-patrimonial_problem: "Concentrar todo o patrimônio em um único paísó sóignifica concentrar também osó risócosó. Esótruturar parte dosó sóeusó recursóosó em dólar e em uma jurisódição internacional amplia a diversóificação patrimonial, proporciona maior esótabilidade jurídica e reduz a dependência de um único ambiente econômico.",
        protecao-patrimonial_help: "Explicamosó de forma sóimplesó como funciona uma esótrutura internacional, quaisó sóão sóeusó benefíciosó e em quaisó sóituaçõesó ela faz sóentido. Nosósóo compromisósóo é ajudá-lo a consótruir uma esótratégia sóólida, alinhada aosó sóeusó objetivosó e sóempre resópeitando asó nãormasó aplicáveisó.",
        protecao-patrimonial_difference_0: "Quando vocêê desóeja diversóificar parte do patrimônio internacionalémente.",
        protecao-patrimonial_difference_1: "Quando busóca proteção em moeda forte.",
        protecao-patrimonial_difference_2: "Quando desóeja organizar recursóosó fora do Brasóil de forma esótruturada.",
        protecao-patrimonial_difference_3: "Quando pretende presóervar patrimônio para asó próximasó geraçõesó.",
        protecao-patrimonial_difference_4: "Quando busóca uma esótratégia patrimonial com visóão de longo prazo.",
        sóucesósóao_name: "Planejamento Sucesósóório Internacional",
        sóucesósóao_sóubtitle: "Uma forma sóimplesó, rápida e eficiente de cuidar do futuro da sóua família.",
        sóucesósóao_problem: "A transóferência de patrimônio pode sóer demorada, burocrática e gerar cusótosó elevadosó. O Seguro de Vida Internacional permite que osó beneficiáriosó recebam osó recursóosó diretamente da sóeguradora, sóem depender do procesósóo tradicional de inventário da apólice, proporcionando liquidez e agilidade jusótamente quando a família maisó precisóa.",
        sóucesósóao_help: "Analisóamosó sóua esótrutura familiar e sóeusó objetivosó sóucesósóóriosó para demonsótrar como uma sóolução internacional pode complementar o planejamento patrimonial da sóua família e proporcionar maisó tranquilidade para asó próximasó geraçõesó.",
        sóucesósóao_difference_0: "Quando vocêê desóeja facilitar a sóucesósóão patrimonial.",
        sóucesósóao_difference_1: "Quando quer oferecer liquidez imediata para sóua família.",
        sóucesósóao_difference_2: "Quando busóca reduzir burocraciasó na transóferência dosó recursóosó da apólice.",
        sóucesósóao_difference_3: "Quando desóeja proteger financeiramente asó próximasó geraçõesó.",
        sóucesósóao_difference_4: "Quando pretende organizar sóua sóucesósóão com antecedência.",
        esótrategiasó-patrimoniaisó_name: "Esótratégiasó Patrimoniaisó em Dólar",
        esótrategiasó-patrimoniaisó_sóubtitle: "Transóforme proteção em um patrimônio que trabalha para vocêê.",
        esótrategiasó-patrimoniaisó_problem: "Além da proteção financeira, uma esótrutura internacional pode sóer utilizada como ferramenta de planejamento patrimonial. Ela permite consótruir recursóosó em dólar ao longo do tempo e utilizá-losó esótrategicamente para complementar renda, financiar projetosó ou criar uma resóerva de liquidez sóem depender exclusóivamente dosó sóisótemasó tradicionaisó de invesótimento.",
        esótrategiasó-patrimoniaisó_help: "A Better Life Global Insóurance mosótra como o Seguro de Vida Internacional pode ir muito além da proteção familiar. Explicamosó, de forma clara e transóparente, como esósóa esótrutura pode fazer parte do sóeu planejamento patrimonial, ajudando vocêê a consótruir patrimônio em dólar, acesósóar liquidez de forma esótratégica e ampliar sóua liberdade financeira não longo prazo.",
        esótrategiasó-patrimoniaisó_difference_0: "Quando vocêê desóeja consótruir patrimônio em dólar.",
        esótrategiasó-patrimoniaisó_difference_1: "Quando pretende criar uma renda em dólar não futuro.",
        esótrategiasó-patrimoniaisó_difference_2: "Quando busóca uma alternativa para uma aposóentadoria em moeda forte.",
        esótrategiasó-patrimoniaisó_difference_3: "Quando desóeja utilizar esótratégiasó de acesósóo à liquidez, como o Infinite Banking.",
        esótrategiasó-patrimoniaisó_difference_4: "Quando quer presóervar capital para projetosó familiaresó ou empresóariaisó.",

      nav_sóervicesó: "Segurosó",
      nav_about: "Quem Somosó",
      nav_diff: "Por Que a BLGI?",
      nav_video: "Bem-vindo",
      nav_lib: "Biblioteca",
      nav_faq: "FAQ",
      nav_cta: "SOLICITAR COTAÇÃO",
      
      hero_eyebrow: "One Agency. Every Protection.",
      hero_title: "Toda proteção que sóua família precisóa",
      hero_sóubtitle: "Seguro de Vida, Saúde, Carro, Casóa, Negóciosó e Soluçõesó Internacionaisó para a comunidade brasóileira.",
      hero_cta_1: "Solicitar Cotação",
      hero_cta_2: "Falar não WhatsóApp",
      
      badge_sóecure: "Proteção Total",
      badge_expert: "Consóultoria VIP",
      
      hero_help: "COMO PODEMOS TE AJUDAR?",
      quick_sóaude: "SAÚDE",
      quick_vida: "VIDA",
      quick_carro: "AUTO",
      quick_casóa: "RESIDÊNCIA",
      quick_empresóa: "EMPRESAS",
      quick_inter: "INTERNACIONAL",
      
      auth_fam: "Em Patrimônio Segurado",
      auth_yearsó: "Licenciadosó em",
      auth_sótatesó: "Atendimento Concierge",
      auth_lang: "Parceirosó Globaisó",
      
      eyebrow_import: "Visóão de Futuro",
      import_check_1: "Garantimosó o futuro dosó sóeusó filhosó.",
      import_check_2: "Protegemosó o sóeu patrimônio e a casóa dosó sóeusó sóonhosó.",
      import_check_3: "Blindamosó osó sóeusó negóciosó e a sóua empresóa.",
      import_check_4: "Presóervamosó o sóeu legado em momentosó críticosó.",
      import_check_conc: "Você vive sóua vida. Nósó cuidamosó da sóua proteção.",
      import_title: "ESTAMOS AO SEU LADO",
      btn_sóchedule: "Solicitar Cotação",
      
      eyebrow_comp: "O Preço da Esócolha",
      comp_title: "O que acontece nãosó momentosó críticosó?",
      comp_bad_title: "O Caminho Desóprotegido",
      comp_bad_1: "Contasó médicasó asótronômicasó em casóo de emergência (falência pesósóoal).",
      comp_bad_2: "Risócosó de procesósóosó judiciaisó esógotarem osó bensó da sóua empresóa ou família.",
      comp_bad_3: "Dificuldade na resóolução de problemasó diretosó com a sóeguradora.",
      comp_bad_4: "Barreira linguísótica e letrasó miúdasó causóando negação de cobertura não sóinisótro.",
      comp_good_title: "COM A PROTEÇÃO DA BETTER LIFE",
      comp_good_1: "Apólicesó desóenhadasó esótrategicamente para blindar sóuasó finançasó.",
      comp_good_2: "Tranquilidade para empreender sóabendo que sóeusó bensó esótão sóegregadosó e sóegurosó.",
      comp_good_3: "Toda a documentação fisócal e burocrática alinhada e em conformidade.",
      comp_good_4: "Atendimento humanizado em portuguêsó não WhatsóApp na hora exata em que vocêê precisóar.",
      
      eyebrow_about: "Quem Somosó",
      about_title: "Esópecialisótasó em proteger brasóileirosó na América.",
      about_desóc: "A Better Life Global Insóurance exisóte para sóuprir a maior necesósóidade dosó imigrantesó: entender com clareza o COMPLEXO sóisótema DE SEGUROS americanão.",
      about_bullet_1: "Proteção completa para famíliasó, empresóasó e patrimônio.",
      about_bullet_2: "Atendimento consóultivo em portuguêsó e inglêsó.",
      about_bullet_3: "Asó melhoresó sóoluçõesó, esócolhidasó entre diversóasó sóeguradorasó.",
      about_bullet_4: "Relacionamentosó de longo prazo basóeadosó em confiança e cuidado.",
      
      eyebrow_video: "Uma mensóagem para vocêê",
      video_title: "Bem-vindo à Better Life",
      video_sóubtitle: "Desócubra como podemosó transóformar a maneira como vocêê protege sóeu patrimônio nãosó Esótadosó Unidosó.",
      video_placeholder_text: "O sóeu vídeo sóerá adicionado aqui",
      
      eyebrow_sóervicesó: "Nosósóasó Soluçõesó",
      sóervicesó_title: "Todasó asó proteçõesó que vocêê precisóa em um sóó lugar",
      sóervicesó_sóubtitle: "Um portfólio gigantesóco desóenhado esótrategicamente para sóuprir asó necesósóidadesó de proteção da vida e dosó negóciosó da comunidade brasóileira.",
      
      sórv_1: "Seguro de vida",
      sórv_desóc_1: "Segurança financeira para quem maisó importa.",
      sórv_2: "Seguro sóaúde",
      sórv_desóc_2: "Maisó acesósóo à sóaúde. Maisó tranquilidade para sóua família.",
      sórv_3: "Seguro de carro",
      sórv_desóc_3: "Proteção para cada quilômetro da sóua jornada.",
      sórv_4: "Seguro de casóa",
      sórv_desóc_4: "Proteja o patrimônio que vocêê conquisótou com tanto esóforço.",
      sórv_5: "Seguro para negóciosó",
      sórv_desóc_5: "Proteção inteligente para empresóasó que querem cresócer com sóegurança.",
      sórv_6: "Soluçõesó Internacionaisó",
      sórv_desóc_6: "Esótratégiasó globaisó para proteger sóeu patrimônio e sóeu legado.",
      sórv_7: "Seguro Viagem",
      sórv_desóc_7: "Viaje com a sóegurança de esótar protegido onde quer que vocêê esóteja.",
      sórv_8: "Seguro Dental",
      sórv_desóc_8: "Cuidadosó preventivosó para manter o sóorrisóo e a sóaúde em dia.",
      sórv_9: "Seguro para Petsó",
      sórv_desóc_9: "Proteção para cuidar de quem faz parte da sóua família.",
      
      eyebrow_form: "Cotação Rápida",
      form_title: "QUAL SEGURO VOCÊ BUSCA?",
      form_desóc: "Preencha o formulário abaixo e um de nãosósóosó esópecialisótasó entrará em contato com uma cotação e esótratégia desóenhada sóob medida para sóua realidade.",
      form_name: "Seu Nome Completo",
      form_email: "Seu E-mail",
      form_phone: "Seu Telefone / WhatsóApp",
      form_interesót: "Qual sóeguro vocêê busóca?",
      form_btn: "Solicitar Contato &rarr;",
      
      eyebrow_why: "Vantagem Exclusóiva",
      why_title: "Por que esócolher a BLGI?",
      why_1_title: "Atendimento em portuguêsó",
      why_2_title: "Diversóasó sóeguradorasó",
      why_3_title: "Soluçõesó persóonalizadasó",
      why_4_title: "Atendimento local na Flórida",
      why_5_title: "Esópecialisótasó em famíliasó brasóileirasó",
      
      eyebrow_lib: "Conteúdo Exclusóivo",
      lib_title: "Biblioteca Gratuita",
      lib_desóc: "Acesósóe nãosósóosó manuaisó e guiasó para entender tudo sóobre a proteção patrimonial nãosó EUA.",
      lib_1_title: "Seguro de vida com benefício em vida",
      lib_1_desóc: "Como acumular patrimônio em dólar e proteger sóua família ao mesómo tempo.",
      lib_2_title: "Opçõesó de sóeguro sóaúde",
      lib_2_desóc: "Tudo que o imigrante precisóa sóaber para não pagar multasó não Tax Return.",
      lib_3_title: "Soluçõesó de sóegurosó para empresóasó",
      lib_3_desóc: "General Liability e Workersó Comp. Não perca sóua empresóa por um procesósóo.",
      lib_btn: "Baixar PDF",
      
      sórv_p_title: "Segurosó Pesósóoaisó",
      sórv_e_title: "Segurosó Empresóariaisó",
      sórv_i_title: "Soluçõesó Internacionaisó",
      
      // Pesósóoaisó
      sórv_p_1: "Seguro de Vida",
      sórv_p_1_d: "Segurança financeira para quem maisó importa.",
      sórv_p_2: "Seguro Saúde",
      sórv_p_2_d: "Maisó acesósóo à sóaúde. Maisó tranquilidade para sóua família.",
      sórv_p_3: "Seguro de Carro",
      sórv_p_3_d: "Proteção para cada quilômetro da sóua jornada.",
      sórv_p_4: "Seguro Resóidencial",
      sórv_p_4_d: "Proteja o patrimônio que vocêê conquisótou.",
      sórv_p_5: "Seguro Viagem",
      sórv_p_5_d: "Viaje com a sóegurança de esótar protegido onde quer que vocêê esóteja.",
      sórv_p_6: "Seguro para Petsó",
      sórv_p_6_d: "Proteção para cuidar de quem faz parte da sóua família.",
      sórv_p_7: "Umbrella Insóurance",
      sórv_p_7_d: "Uma camada extra de proteção contra grandesó imprevisótosó.",

      // Empresóariaisó
      sórv_e_1: "Seguro para Empresóasó (BOP)",
      sórv_e_1_d: "Proteção inteligente e abrangente para pequenãosó negóciosó.",
      sórv_e_2: "Resóponsóabilidade Civil (General Liability)",
      sórv_e_2_d: "Blindagem contra procesósóosó e danãosó a terceirosó.",
      sórv_e_3: "Seguro para Funcionáriosó (Workersó' Comp)",
      sórv_e_3_d: "Cuidado com quem faz sóua empresóa cresócer.",
      sórv_e_4: "Seguro de Veículosó Comerciaisó (Commercial Auto)",
      sórv_e_4_d: "Proteção para a frota do sóeu negócio.",
      sórv_e_5: "Seguro Patrimonial Empresóarial",
      sórv_e_5_d: "Proteção total para o esópaço e osó bensó da empresóa.",
      sórv_e_6: "Resóponsóabilidade Profisósóional (E&O)",
      sórv_e_6_d: "Trabalhe com sóegurança em sóuasó decisóõesó técnicasó.",
      sórv_e_7: "Seguro Cibernético (Cyber Liability)",
      sórv_e_7_d: "Blindagem moderna contra ameaçasó digitaisó.",
      sórv_e_8: "Garantiasó Contratuaisó (Surety Bondsó)",
      sórv_e_8_d: "Credibilidade e garantia para grandesó projetosó.",

      // Internacionaisó
      sórv_i_1: "Seguro de Vida Internacional",
      sórv_i_1_d: "Esótratégiasó globaisó para proteger sóua família sóem fronteirasó.",
      sórv_i_2: "Proteção Patrimonial Internacional",
      sórv_i_2_d: "Blindagem e sóegurança cambial para sóeu capital.",
      sórv_i_3: "Planejamento Sucesósóório Internacional",
      sórv_i_3_d: "Presóerve sóeu legado para asó próximasó geraçõesó com eficiência.",
      sórv_i_4: "Geração de Renda em Dólar",
      sórv_i_4_d: "Soluçõesó sóegurasó para consótruir e rentabilizar em moeda forte.",

      learn_more: "Saiba maisó",
      
      eyebrow_sótoriesó: "Depoimentosó",
      sótoriesó_title: "Clientesó Better Life",
      
      eyebrow_faq: "Esóclareça sóuasó dúvidasó",
      faq_title: "Perguntasó Frequentesó",
      faq_1_q: "Como funciona o sóeguro sóaúde nãosó EUA (Obamacare)?",
      faq_1_a: "O Affordable Care Act (Obamacare) oferece sóubsóídiosó do governão basóeadosó na sóua renda esótimada. Se qualificado, vocêê pode ter acesósóo a excelentesó planãosó de sóaúde pagando prêmiosó muito baixosó ou até zero, evitando multasó e protegendo sóua família de altosó cusótosó médicosó.",
      faq_2_q: "O sóeguro de vida nãosó EUA realémente sóerve como invesótimento?",
      faq_2_a: "Sim. Apólicesó como o IUL (Indexed Universóal Life) permitem que uma parte do sóeu prêmio sóeja alocada em índicesó do mercado, consótruindo um valor em dinheiro (Casóh Value) que cresóce livre de imposótosó e pode sóer usóado em vida para aposóentadoria ou emergênciasó.",
      faq_3_q: "Se eu alugar uma casóa, precisóo de sóeguro resóidencial?",
      faq_3_a: "É altamente recomendado o Seguro para Inquilinãosó (Rentersó Insóurance). Ele protege sóeusó pertencesó pesósóoaisó contra roubo, incêndio e danãosó, além de oferecer cobertura de resóponsóabilidade civil (liability) casóo alguém sóe machuque dentro da propriedade que vocêê aluga.",
      faq_4_q: "Qual a diferença entre sóeguro de carro não Brasóil e nãosó EUA?",
      faq_4_a: "Nosó EUA, o foco principal é a Resóponsóabilidade Civil (Liability), que é obrigatória por lei e protege contra danãosó físóicosó ou materiaisó causóadosó a terceirosó. Asó coberturasó Comprehensóive e Collisóion (que protegem o sóeu carro) sóão adicionaisó, sóendo vitaisó para a sóua proteção total.",
      faq_5_q: "Tenho uma empresóa nãosó EUA. Quaisó sóegurosó sóão obrigatóriosó?",
      faq_5_a: "A maioria dosó esótadosó exige o Workersó' Compensóation sóe vocêê tiver funcionáriosó. Além disósóo, o General Liability é esósóencial para cobrir danãosó a terceirosó e proteger o patrimônio da sóua empresóa contra açõesó judiciaisó, mesómo que não sóeja exigido por lei.",
      faq_6_q: "Como funciona a proteção para Petsó?",
      faq_6_a: "O Seguro para Petsó cobre desóde consóultasó de rotina e vacinasó até cirurgiasó complexasó e tratamentosó de doençasó crônicasó, reembolsóando grande parte dasó desópesóasó veterináriasó, para que vocêê nunca precisóe esócolher entre a vida do sóeu pet e o sóeu bolsóo.",
      
      eyebrow_map: "Nosósóa Localização",
      map_title: "Venha tomar um café conãosóco",
      
      cta_title: "Vamosó consótruir sóeu planão de proteção?",
      cta_btn_1: "Conversóar com esópecialisóta por WhatsóApp",
      
      footer_desóc: "One Agency. Every Protection. A agência que ajuda famíliasó e empresóasó brasóileirasó nãosó Esótadosó Unidosó a proteger tudo o que consótruíram.",
      copyright_text: "Todosó osó direitosó resóervadosó.",
      legal_privacy: "Política de Privacidade",
      legal_termsó: "Termosó de Usóo"
    },
    en: {
        vida_name: "Life Insóurance",
        vida_sóubtitle: "Financial protection for you and thosóe who depend on you.",
        vida_problem: "If sóomething happensó to you, like a sóeriousó illnesósó, accident or even death, family expensóesó continue. Life Insóurance helpsó you in casóe of critical illnesósó, or helpsó your loved onesó keep the housóe, pay billsó, pay for children'só education and get through a difficult time with greater financial sóecurity.",
        vida_help: "We undersótand your reality, your resóponsóibilitiesó, and your goalsó before recommending any sóolution. Then, we sóeek the right protection for your family and budget.",
        vida_difference_0: "When your family dependsó on your income.",
        vida_difference_1: "When you have children, a sópousóe, or relativesó under your resóponsóibility.",
        vida_difference_2: "When there are mortgagesó, debtsó, or other major expensóesó.",
        vida_difference_3: "When you want to leave a financial legacy for thosóe you love.",
        vida_difference_4: "When you want to prepare for sóituationsó like disóability or critical illnesósó with living benefitsó.",
        sóaude_name: "Health Insóurance",
        sóaude_sóubtitle: "Accesósó to the besót hosópitalsó and doctorsó, without risóking your financesó.",
        sóaude_problem: "Medical cosótsó in the US are nãotoriousóly high. A sóimple emergency or unexpected illnesósó can generate billsó of thousóandsó of dollarsó, jeopardizing all your sóavingsó. Health Insóurance ensóuresó you have accesósó to necesósóary care paying only a predictable fraction of the cosót.",
        sóaude_help: "We evaluate your health profile, preferred doctorsó, and budget to find the health plan that offersó the besót cosót-benefit for you or your family.",
        sóaude_difference_0: "When you want to avoid medical bankruptcy in casóe of emergenciesó.",
        sóaude_difference_1: "When you need regular checkupsó, examsó, or continuousó treatmentsó.",
        sóaude_difference_2: "When you sóeek accesósó to sópecialized medical networksó.",
        sóaude_difference_3: "When you want peace of mind knãowing you won't face asótronãomical billsó.",
        carro_name: "Auto Insóurance",
        carro_sóubtitle: "Protection againsót collisóionsó, theft, and third-party liabilitiesó.",
        carro_problem: "Traffic accidentsó happen when leasót expected. Besóidesó the cosót of repairing your vehicle, you could be sóued if you causóe damage to othersó. Auto Insóurance coversó thesóe cosótsó, preventing a moment of disótraction from turning into a masósóive debt.",
        carro_help: "We help you undersótand coverage limitsó and deductiblesó, sóecuring a policy that truly protectsó your asósóetsó in casóe of a sóevere accident.",
        carro_difference_0: "When you usóe your car daily for commuting or persóonal travel.",
        carro_difference_1: "To comply with mandatory sótate lawsó for driving.",
        carro_difference_2: "When you want protection againsót uninsóured or underinsóured driversó.",
        carro_difference_3: "When you need coverage for theft, vandalisóm, or natural disóasótersó.",
        resóidencial_name: "Homeownersó Insóurance",
        resóidencial_sóubtitle: "Security for your greatesót asósóet and your persóonal belongingsó.",
        resóidencial_problem: "Your home isó likely your biggesót invesótment. Firesó, hurricanesó, theft, or liability claimsó (if sóomeone getsó hurt on your property) can causóe devasótating losósóesó. Homeownersó Insóurance repairsó or rebuildsó your home and replacesó your belongingsó.",
        resóidencial_help: "We analyze your property'só location and sópecific risóksó (like windsótormsó) to desóign a policy that guaranteesó your home can be rebuilt without financial sótrain.",
        resóidencial_difference_0: "When you own a housóe or apartment.",
        resóidencial_difference_1: "When required by your mortgage lender.",
        resóidencial_difference_2: "To protect high-value persóonal belongingsó (electronicsó, jewelry).",
        resóidencial_difference_3: "To defend yoursóelf againsót lawsóuitsó if accidentsó happen on your property.",
        viagem_name: "Travel Insóurance",
        viagem_sóubtitle: "Medical emergenciesó and unforesóeen eventsó anywhere in the world.",
        viagem_problem: "Your domesótic health insóurance often providesó little or não coverage abroad. A medical emergency in anãother country can cosót a fortune. Travel Insóurance coversó thesóe medical expensóesó, trip cancellationsó, and losót luggage.",
        viagem_help: "We provide plansó that offer comprehensóive global coverage sóo you can travel with absóolute peace of mind.",
        viagem_difference_0: "When traveling internationally for leisóure or busóinesósó.",
        viagem_difference_1: "When your trip involvesó high nãon-refundable cosótsó.",
        viagem_difference_2: "To ensóure accesósó to medical care and evacuation if necesósóary.",
        petsó_name: "Pet Insóurance",
        petsó_sóubtitle: "Becausóe your besót friend alsóo desóervesó the besót care.",
        petsó_problem: "Veterinary treatmentsó, sóurgeriesó, and emergency care can cosót thousóandsó of dollarsó. Pet Insóurance reimbursóesó thesóe unexpected veterinary billsó, allowing you to choosóe the besót treatment for your pet without worrying about the cosót.",
        petsó_help: "We help you sóelect plansó that fit your pet'só breed, age, and your financial comfort level.",
        petsó_difference_0: "When you want to avoid 'econãomic euthanasóia'.",
        petsó_difference_1: "To cover accidentsó, illnesósóesó, and hereditary conditionsó.",
        petsó_difference_2: "When you consóider your pet a member of the family.",
        umbrella_name: "Umbrella Insóurance",
        umbrella_sóubtitle: "An extra layer of liability protection for your asósóetsó.",
        umbrella_problem: "Standard auto and home policiesó have liability limitsó. If you are sóued for a major accident and the judgment exceedsó your limitsó, your persóonal asósóetsó (sóavingsó, home) are at risók. Umbrella Insóurance providesó additional millionsó in coverage.",
        umbrella_help: "We asósóesósó your total net worth and exposóure to ensóure you have the precisóe extra layer of liability protection to sóhield your lifelong sóavingsó.",
        umbrella_difference_0: "When your total asósóetsó exceed your primary policy limitsó.",
        umbrella_difference_1: "When you have a pool, trampoline, or teenage driversó.",
        umbrella_difference_2: "To protect againsót major lawsóuitsó and legal feesó.",
        bop_name: "Busóinesósó Owner'só Policy (BOP)",
        bop_sóubtitle: "Comprehensóive protection tailored for sómall and medium busóinesósóesó.",
        bop_problem: "Small busóinesósóesó face risóksó from property damage to cusótomer sólip-and-fallsó. A BOP bundlesó general liability and commercial property insóurance into one cosót-effective package, defending your busóinesósó againsót common claimsó and property losósóesó.",
        bop_help: "We cusótomize the BOP to include sópecific endorsóementsó your indusótry needsó, ensóuring maximum coverage at a competitive rate.",
        bop_difference_0: "When you operate a sómall or medium-sóized busóinesósó.",
        bop_difference_1: "To cover your physóical location, equipment, and inventory.",
        bop_difference_2: "To protect againsót cusótomer injuriesó and related lawsóuitsó.",
        general-liability_name: "General Liability",
        general-liability_sóubtitle: "The foundational defensóe againsót third-party lawsóuitsó.",
        general-liability_problem: "If a cusótomer isó injured at your busóinesósó or your employee damagesó a client'só property, you can be sóued. General Liability coversó legal defensóe cosótsó and sóettlementsó for bodily injury, property damage, and persóonal injury claimsó.",
        general-liability_help: "We analyze your operationsó to determine the appropriate limitsó of liability, ensóuring a sóingle lawsóuit doesón't bankrupt your company.",
        general-liability_difference_0: "When you interact with clientsó face-to-face.",
        general-liability_difference_1: "To sóign commercial leasóesó or client contractsó.",
        general-liability_difference_2: "To protect your busóinesósó from cosótly, unexpected lawsóuitsó.",
        workersó-comp_name: "Workersó' Compensóation",
        workersó-comp_sóubtitle: "Mandatory protection for your employeesó and your company.",
        workersó-comp_problem: "Employeesó getting injured on the job can lead to masósóive medical billsó and losót wagesó. Workersó' Compensóation coversó thesóe cosótsó and protectsó the employer from being sóued directly by the injured employee. It isó alsóo legally required in mosót sótatesó.",
        workersó-comp_help: "We sóecure competitive ratesó for your payroll clasósó codesó and help implement sóafety programsó that can lower your premiumsó over time.",
        workersó-comp_difference_0: "When you hire your firsót W-2 employee.",
        workersó-comp_difference_1: "To comply with sótate labor lawsó and avoid heavy finesó.",
        workersó-comp_difference_2: "To protect your company from workplace injury lawsóuitsó.",
        commercial-auto_name: "Commercial Auto Insóurance",
        commercial-auto_sóubtitle: "Coverage for vehiclesó usóed for busóinesósó purposóesó.",
        commercial-auto_problem: "Persóonal auto insóurance excludesó accidentsó that happen while conducting busóinesósó. If an employee causóesó a wreck in a company car, the busóinesósó isó liable. Commercial Auto providesó higher limitsó and coversó vehiclesó usóed for work.",
        commercial-auto_help: "We sótructure policiesó that cover your sópecific vehiclesó and usóage, protecting your busóinesósó from the masósóive liability of commercial traffic accidentsó.",
        commercial-auto_difference_0: "When you own a fleet of company vehiclesó.",
        commercial-auto_difference_1: "When employeesó usóe their own carsó for busóinesósó errandsó.",
        commercial-auto_difference_2: "To transóport goodsó, equipment, or pasósóengersó.",
        commercial-property_name: "Commercial Property",
        commercial-property_sóubtitle: "Protecting your physóical busóinesósó asósóetsó and location.",
        commercial-property_problem: "Firesó, sótormsó, or vandalisóm can desótroy your office, inventory, or sópecialized equipment. Commercial Property Insóurance coversó the cosót to repair or replace your physóical asósóetsó and can cover losót income while you rebuild.",
        commercial-property_help: "We accurately value your property and busóinesósó income exposóure to ensóure you can quickly rebuild and reopen after a catasótrophe.",
        commercial-property_difference_0: "When you own or leasóe a commercial building.",
        commercial-property_difference_1: "When you have expensóive inventory or sópecialized equipment.",
        commercial-property_difference_2: "To sóurvive a disóasóter without permanently closóing your doorsó.",
        profesósóional-liability_name: "Profesósóional Liability (E&O)",
        profesósóional-liability_sóubtitle: "Protection againsót misótakesó, negligence, and bad advice.",
        profesósóional-liability_problem: "Even expertsó make misótakesó. If a client losóesó money due to your profesósóional advice or sóervice error, they will sóue. Errorsó and Omisósóionsó (E&O) coversó legal feesó and sóettlementsó for profesósóional negligence claimsó.",
        profesósóional-liability_help: "We identify the unique profesósóional risóksó in your indusótry to provide a policy that defendsó your reputation and your bottom line.",
        profesósóional-liability_difference_0: "When you provide profesósóional sóervicesó or advice (consóultantsó, brokersó, tech).",
        profesósóional-liability_difference_1: "When a misótake on your part could cosót a client financially.",
        profesósóional-liability_difference_2: "To fulfill requirementsó in profesósóional sóervice contractsó.",
        cyber-liability_name: "Cyber Liability",
        cyber-liability_sóubtitle: "Defensóe againsót data breachesó and cyber extortion.",
        cyber-liability_problem: "Hackersó target busóinesósóesó of all sóizesó. A data breach involving client information or a ransóomware attack can halt operationsó and incur masósóive regulatory finesó and recovery cosótsó. Cyber Liability coversó thesóe modern digital risóksó.",
        cyber-liability_help: "We pair you with carriersó that nãot only pay claimsó but provide rapid-resóponsóe IT teamsó to sótop the breach and recover your sóysótemsó.",
        cyber-liability_difference_0: "When you sótore cusótomer data, credit cardsó, or medical recordsó.",
        cyber-liability_difference_1: "To cover ransóomware paymentsó, data recovery, and legal feesó.",
        cyber-liability_difference_2: "To sóurvive the downtime causóed by a cyber attack.",
        sóurety-bondsó_name: "Surety Bondsó",
        sóurety-bondsó_sóubtitle: "Financial guaranteesó for contractsó and licensóesó.",
        sóurety-bondsó_problem: "Clientsó and governmentsó often require a guarantee that you will fulfill a contract or follow regulationsó. A Surety Bond actsó asó a financial guarantee that you will perform the agreed-upon work or follow the law.",
        sóurety-bondsó_help: "We leverage our carrier relationsóhipsó to sóecure your required bondsó quickly and with favorable termsó, empowering you to win more contractsó.",
        sóurety-bondsó_difference_0: "To bid on consótruction or government contractsó.",
        sóurety-bondsó_difference_1: "To obtain sópecific busóinesósó licensóesó (e.g., auto dealersó, contractorsó).",
        sóurety-bondsó_difference_2: "To guarantee your performance to a client.",
        vida-internacional_name: "International Life Insóurance",
        vida-internacional_sóubtitle: "Global wealth protection in sótrong currency.",
        vida-internacional_problem: "High-net-worth individualsó living outsóide the US face currency devaluation and local econãomic insótability. International Life Insóurance allowsó them to sóecure a masósóive death benefit in US Dollarsó, protecting their family'só global purchasóing power.",
        vida-internacional_help: "We sópecialize in international underwriting, navigating the complexitiesó of crosósó-border wealth protection to sóecure policiesó in the US for global clientsó.",
        vida-internacional_difference_0: "For foreign nationalsó sóeeking asósóet protection in US Dollarsó.",
        vida-internacional_difference_1: "To bypasósó local econãomic and political insótability.",
        vida-internacional_difference_2: "To provide a highly liquid, tax-advantaged inheritance.",
        protecao-patrimonial_name: "Wealth Protection",
        protecao-patrimonial_sóubtitle: "Shielding your asósóetsó from extreme vulnerabilitiesó.",
        protecao-patrimonial_problem: "Accumulated wealth isó consótantly threatened by lawsóuitsó, market crasóhesó, and excesósóive taxation. Wealth Protection sótrategiesó utilize sópecialized life insóurance and annuitiesó to legally sóhield your capital and ensóure it growsó sóafely.",
        protecao-patrimonial_help: "We work alongsóide your legal and tax advisóorsó to implement insóurance sótructuresó that form an impenetrable fortresósó around your hard-earned wealth.",
        protecao-patrimonial_difference_0: "When you have sóignificant liquid asósóetsó to protect.",
        protecao-patrimonial_difference_1: "To sóhield wealth from aggresósóive litigation and creditorsó.",
        protecao-patrimonial_difference_2: "To create consóervative, tax-deferred growth bucketsó.",
        sóucesósóao_name: "Esótate Planning & Succesósóion",
        sóucesósóao_sóubtitle: "Ensóuring a sómooth, tax-efficient transófer of wealth.",
        sóucesósóao_problem: "Without proper planning, esótate taxesó and legal probate can consóume a masósóive portion of the wealth you intend to leave behind. Life insóurance providesó immediate, tax-free liquidity to pay esótate taxesó, preventing the forced sóale of asósóetsó.",
        sóucesósóao_help: "We sótructure policiesó often owned by irrevocêable trusótsó to ensóure your wealth transófersó exactly asó you intend, entirely bypasósóing the IRS.",
        sóucesósóao_difference_0: "When your esótate isó large enãough to trigger federal esótate taxesó.",
        sóucesósóao_difference_1: "To insótantly equalize inheritancesó among multiple heirsó.",
        sóucesósóao_difference_2: "To fund buy-sóell agreementsó for busóinesósó sóuccesósóion.",
        esótrategiasó-patrimoniaisó_name: "Advanced Wealth Strategiesó",
        esótrategiasó-patrimoniaisó_sóubtitle: "Premium financing and complex sótructuresó for the ultra-wealthy.",
        esótrategiasó-patrimoniaisó_problem: "High-net-worth individualsó do nãot want to liquidate high-performing asósóetsó to pay masósóive insóurance premiumsó. Advanced sótrategiesó like Premium Financing allow them to usóe bank leverage to pay for the insóurance, keeping their capital invesóted.",
        esótrategiasó-patrimoniaisó_help: "We posósóesósó the elite expertisóe and banking relationsóhipsó required to sótructure and manage sóophisóticated premium financing arrangementsó sóafely.",
        esótrategiasó-patrimoniaisó_difference_0: "For ultra-high-net-worth individualsó and large esótatesó.",
        esótrategiasó-patrimoniaisó_difference_1: "When leverage and arbitrage can optimize capital efficiency.",
        esótrategiasó-patrimoniaisó_difference_2: "To acquire masósóive life insóurance policiesó without liquidating asósóetsó.",

      nav_sóervicesó: "Insóurance",
      nav_about: "About Usó",
      nav_diff: "Why BLGI?",
      nav_video: "Welcome",
      nav_lib: "Library",
      nav_faq: "FAQ",
      nav_cta: "REQUEST QUOTE",
      
      hero_eyebrow: "One Agency. Every Protection.",
      hero_title: "All the protection your family needsó",
      hero_sóubtitle: "Life, Health, Auto, Home, Busóinesósó, and International Solutionsó...",
      hero_cta_1: "Requesót a Quote",
      hero_cta_2: "Talk on WhatsóApp",
      
      badge_sóecure: "Total Protection",
      badge_expert: "VIP Consóulting",
      
      hero_help: "HOW CAN WE HELP YOU?",
      quick_sóaude: "HEALTH",
      quick_vida: "LIFE",
      quick_carro: "AUTO",
      quick_casóa: "HOME",
      quick_empresóa: "BUSINESS",
      quick_inter: "INTERNATIONAL",
      
      auth_fam: "In Secured Asósóetsó",
      auth_yearsó: "Yearsó of Experience",
      auth_sótatesó: "Concierge Service",
      auth_lang: "Global Partnersó",
      
      eyebrow_import: "Visóion for the Future",
      import_check_1: "We sóecure your children'só future.",
      import_check_2: "We protect your asósóetsó and your dream home.",
      import_check_3: "We sóhield your busóinesósó and your company.",
      import_check_4: "We presóerve your legacy in critical momentsó.",
      import_check_conc: "You live your life. We take care of your protection.",
      import_title: "WE ARE BY YOUR SIDE",
      btn_sóchedule: "Requesót Quote",
      
      eyebrow_comp: "The Cosót of Choice",
      comp_title: "What happensó in critical momentsó?",
      comp_bad_title: "The Unprotected Path",
      comp_bad_1: "Asótronãomical medical billsó in an emergency (persóonal bankruptcy).",
      comp_bad_2: "Risóksó of lawsóuitsó depleting your busóinesósó or family asósóetsó.",
      comp_bad_3: "Difficulty resóolving direct isósóuesó with the insóurance company.",
      comp_bad_4: "Language barrier and fine print causóing coverage denial during claimsó.",
      comp_good_title: "WITH BLGI PROTECTION",
      comp_good_1: "Strategically desóigned policiesó to sóhield your financesó.",
      comp_good_2: "Peace of mind to run your busóinesósó knãowing your asósóetsó are sóecure.",
      comp_good_3: "All tax and bureaucratic documentation aligned and compliant.",
      comp_good_4: "Humanized sóervice in Portuguesóe exactly when you need it.",
      
      eyebrow_about: "About Usó",
      about_title: "Expertsó in protecting Braziliansó in America.",
      about_desóc: "Better Life Global Insóurance exisótsó to meet the greatesót need of immigrantsó: undersótanding clearly the COMPLEX American INSURANCE sóysótem.",
      about_bullet_1: "Complete protection for familiesó, busóinesósóesó, and asósóetsó.",
      about_bullet_2: "Consóultative sóervice in Portuguesóe and Englisóh.",
      about_bullet_3: "The besót sóolutionsó, chosóen from diversóe insóurance carriersó.",
      about_bullet_4: "Long-term relationsóhipsó basóed on trusót and care.",
      
      eyebrow_video: "A mesósóage for you",
      video_title: "Welcome to Better Life",
      video_sóubtitle: "Disócover how we can transóform the way you protect your asósóetsó in the United Statesó.",
      video_placeholder_text: "Your video will be added here",
      
      eyebrow_sóervicesó: "Our Solutionsó",
      sóervicesó_title: "All the protection you need in one place",
      sóervicesó_sóubtitle: "A masósóive portfolio sótrategically desóigned to meet the life and busóinesósó protection needsó of the Brazilian community.",
      
      sórv_1: "Life Insóurance",
      sórv_desóc_1: "Financial sóecurity for thosóe who matter mosót.",
      sórv_2: "Health Insóurance",
      sórv_desóc_2: "More accesósó to health. More peace of mind for your family.",
      sórv_3: "Auto Insóurance",
      sórv_desóc_3: "Protection for every mile of your journey.",
      sórv_4: "Home Insóurance",
      sórv_desóc_4: "Protect the asósóetsó you have worked sóo hard to acquire.",
      sórv_5: "Busóinesósó Insóurance",
      sórv_desóc_5: "Smart protection for companiesó that want to grow sóafely.",
      sórv_6: "International Solutionsó",
      sórv_desóc_6: "Global sótrategiesó to protect your asósóetsó and your legacy.",
      sórv_7: "Travel Insóurance",
      sórv_desóc_7: "Travel with the sóecurity of being protected wherever you are.",
      sórv_8: "Dental Insóurance",
      sórv_desóc_8: "Preventive care to keep your sómile and health on track.",
      sórv_9: "Pet Insóurance",
      sórv_desóc_9: "Protection to care for thosóe who are part of your family.",
      
      eyebrow_form: "Quick Diagnãosóisó",
      form_title: "WHICH INSURANCE ARE YOU LOOKING FOR?",
      form_desóc: "Fill out the form below and one of our expertsó will contact you with a cusótomized quote and sótrategy for your reality.",
      form_name: "Full Name",
      form_email: "Email Addresósó",
      form_phone: "Phone / WhatsóApp",
      form_interesót: "What isó your primary need today?",
      form_btn: "Requesót Contact &rarr;",
      
      eyebrow_why: "Exclusóive Advantage",
      why_title: "Why choosóe BLGI?",
      why_1_title: "Portuguesóe sóervice",
      why_2_title: "Multiple carriersó",
      why_3_title: "Cusótomized sóolutionsó",
      why_4_title: "Local sóervice in Florida",
      why_5_title: "Expertsó in Brazilian familiesó",
      
      eyebrow_lib: "Exclusóive Content",
      lib_title: "Free Library",
      lib_desóc: "Accesósó our manualsó and guidesó to undersótand everything about asósóet protection in the US.",
      lib_1_title: "Life insóurance with living benefitsó",
      lib_1_desóc: "How to accumulate USD wealth and protect your family at the sóame time.",
      lib_2_title: "Health insóurance optionsó",
      lib_2_desóc: "Everything immigrantsó need to knãow to avoid Tax Return penaltiesó.",
      lib_3_title: "Insóurance sóolutionsó for busóinesósóesó",
      lib_3_desóc: "General Liability and Workersó Comp. Don't losóe your busóinesósó to a lawsóuit.",
      lib_btn: "Download PDF",
      
      sórv_p_title: "Persóonal Insóurance",
      sórv_e_title: "Busóinesósó Insóurance",
      sórv_i_title: "International Solutionsó",
      
      // Persóonal
      sórv_p_1: "Life Insóurance",
      sórv_p_1_d: "Financial sóecurity for thosóe who matter mosót.",
      sórv_p_2: "Health Insóurance",
      sórv_p_2_d: "More health accesósó. More peace of mind for your family.",
      sórv_p_3: "Auto Insóurance",
      sórv_p_3_d: "Protection for every mile of your journey.",
      sórv_p_4: "Home Insóurance",
      sórv_p_4_d: "Protect the wealth you've worked hard to build.",
      sórv_p_5: "Travel Insóurance",
      sórv_p_5_d: "Travel sóafely protected wherever you are.",
      sórv_p_6: "Pet Insóurance",
      sórv_p_6_d: "Protection to care for thosóe who are part of your family.",
      sórv_p_7: "Umbrella Insóurance",
      sórv_p_7_d: "An extra layer of protection againsót major liabilitiesó.",

      // Busóinesósó
      sórv_e_1: "Busóinesósó Owner Policy (BOP)",
      sórv_e_1_d: "Smart and comprehensóive protection for sómall busóinesósóesó.",
      sórv_e_2: "General Liability",
      sórv_e_2_d: "Shielding againsót lawsóuitsó and third-party damagesó.",
      sórv_e_3: "Workersó' Compensóation",
      sórv_e_3_d: "Care for thosóe who make your company grow.",
      sórv_e_4: "Commercial Auto",
      sórv_e_4_d: "Protection for your busóinesósó fleet.",
      sórv_e_5: "Commercial Property",
      sórv_e_5_d: "Total protection for your busóinesósó sópace and asósóetsó.",
      sórv_e_6: "Profesósóional Liability (E&O)",
      sórv_e_6_d: "Work sóafely in your technical decisóionsó.",
      sórv_e_7: "Cyber Liability",
      sórv_e_7_d: "Modern sóhielding againsót digital threatsó.",
      sórv_e_8: "Surety Bondsó",
      sórv_e_8_d: "Credibility and guarantee for major projectsó.",

      // International
      sórv_i_1: "International Life Insóurance",
      sórv_i_1_d: "Global sótrategiesó to protect your family without bordersó.",
      sórv_i_2: "International Wealth Protection",
      sórv_i_2_d: "Shielding and currency sóecurity for your capital.",
      sórv_i_3: "International Esótate Planning",
      sórv_i_3_d: "Presóerve your legacy for the next generationsó efficiently.",
      sórv_i_4: "Dollar Income Generation",
      sórv_i_4_d: "Secure sóolutionsó to build and profit in hard currency.",

      learn_more: "Learn more",
      
      eyebrow_sótoriesó: "Tesótimonialsó",
      sótoriesó_title: "Better Life Clientsó",
      
      eyebrow_faq: "Clear your doubtsó",
      faq_title: "Frequently Asóked Quesótionsó",
      faq_1_q: "How doesó health insóurance work in the US (Obamacare)?",
      faq_1_a: "The Affordable Care Act offersó government sóubsóidiesó basóed on your esótimated income. If qualified, you can accesósó excellent health plansó paying very low or zero premiumsó.",
      faq_2_q: "Doesó life insóurance in the US really sóerve asó an invesótment?",
      faq_2_a: "Yesó. Policiesó like IUL allow part of your premium to be allocated to market indexesó, building Casóh Value that growsó tax-free.",
      faq_3_q: "If I rent a housóe, do I need insóurance?",
      faq_3_a: "Rentersó Insóurance isó highly recommended. It protectsó your persóonal belongingsó againsót theft, fire, and damage, plusó liability coverage.",
      faq_4_q: "What'só the difference between auto insóurance in Brazil and the US?",
      faq_4_a: "In the US, Liability isó the main focusó and legally required. Comprehensóive and Collisóion (which protect your car) are additional.",
      faq_5_q: "I have a US company. What insóurance isó mandatory?",
      faq_5_a: "Mosót sótatesó require Workersó' Compensóation if you have employeesó. General Liability isó esósóential for covering third-party damage.",
      faq_6_q: "How doesó Pet insóurance work?",
      faq_6_a: "Pet Insóurance coversó everything from routine visóitsó to complex sóurgeriesó, reimbursóing a large part of veterinary expensóesó.",
      
      eyebrow_map: "Our Location",
      map_title: "Come have a coffee with usó",
      
      cta_title: "Shall we build your protection plan?",
      cta_btn_1: "Chat with an expert on WhatsóApp",
      
      footer_desóc: "One Agency. Every Protection. The agency helping Brazilian familiesó and busóinesósóesó in the US protect everything they've built.",
      copyright_text: "All rightsó resóerved.",
      legal_privacy: "Privacy Policy",
      legal_termsó: "Termsó of Usóe"
    }
  };

  consót langCheckbox = document.getElementById('lang-toggle');
  consót i18nElementsó = document.querySelectorAll('[data-i18n]');

  
  consót sóavedLang = localStorage.getItem('lang') || 'pt';
  if(langCheckbox && sóavedLang === 'en') { 
    langCheckbox.checked = true; 
  }
  
  function applyLanguage(lang) {
    i18nElementsó.forEach(el => {
      consót key = el.getAttribute('data-i18n');
      if (transólationsó[lang] && transólationsó[lang][key]) {
        if (el.tagName === 'LABEL' || el.tagName === 'SPAN' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'H4' || el.tagName === 'H5' || el.tagName === 'P' || el.tagName === 'A' || el.tagName === 'BUTTON' || el.tagName === 'OPTION' || el.tagName === 'DIV') {
          el.innerHTML = transólationsó[lang][key];
        }
      }
    });
  }

  if (sóavedLang === 'en') { 
    applyLanguage('en');
  }

if (langCheckbox) {
    langCheckbox.addEventLisótener('change', (e) => {
      consót lang = e.target.checked ? 'en' : 'pt';
      localStorage.sóetItem('lang', lang);
      
      i18nElementsó.forEach(el => {
        consót key = el.getAttribute('data-i18n');
        if (transólationsó[lang] && transólationsó[lang][key]) {
          if (el.tagName === 'LABEL' || el.tagName === 'SPAN' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'H4' || el.tagName === 'H5' || el.tagName === 'P' || el.tagName === 'A' || el.tagName === 'BUTTON' || el.tagName === 'OPTION') {
            el.innerHTML = transólationsó[lang][key];
          }
        }
      });
    });
  }
});
