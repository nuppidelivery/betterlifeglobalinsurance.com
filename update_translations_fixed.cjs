const fs = require('fs');
let indexHtml = fs.readFileSync('index.html', 'utf8');
let mainJs = fs.readFileSync('main.js', 'utf8');

const keysToAdd = {
    // Stats
    stat_1_desc: { pt: "Acidentes de trânsito anuais nos EUA", en: "Annual traffic accidents in the US" },
    stat_2_desc: { pt: "Falências ligadas a dívidas médicas (Forbes)", en: "Bankruptcies linked to medical debt (Forbes)" },
    stat_3_desc: { pt: "Em danos por desastres climáticos em 2024 (NOAA)", en: "In climate disaster damages in 2024 (NOAA)" },
    stat_4_desc: { pt: "Acidentes de trabalho graves/ano (NSC)", en: "Severe workplace accidents/year (NSC)" },
    
    // Global
    download_pdf: { pt: "Baixar PDF", en: "Download PDF" },
    quem_somos_link: { pt: "Quem Somos", en: "About Us" },
    form_success_title: { pt: "Recebemos as suas informações, obrigado pelo seu interesse!", en: "We received your information, thank you for your interest!" },
    form_success_desc: { pt: "Em breve um de nossos especialistas te apresentará a melhor cotação e estará ao seu lado, acompanhando todas as etapas.", en: "Soon one of our experts will present the best quote and will be by your side, guiding you through all steps." },
    close_btn: { pt: "Fechar", en: "Close" },
    slogan_global: { pt: "Você vive. Nós resolvemos.", en: "You live. We handle it." },
    
    // FAQ
    faq_q1: { pt: "Posso contratar seguro saúde em qualquer época do ano?", en: "Can I buy health insurance at any time of the year?" },
    faq_a1: { pt: "Depende. Os planos do Marketplace normalmente podem ser contratados durante o Open Enrollment. Fora desse período, algumas situações, como casamento, nascimento de um filho ou perda de cobertura, podem permitir uma inscrição especial. Nossa equipe analisa seu caso e orienta sobre as opções disponíveis.", en: "It depends. Marketplace plans can normally be purchased during Open Enrollment. Outside this period, certain life events, like marriage, birth of a child, or loss of coverage, may qualify for a Special Enrollment Period. Our team will analyze your case and guide you through the available options." },
    faq_q2: { pt: "Como escolher o plano de saúde ideal para minha família?", en: "How do I choose the ideal health plan for my family?" },
    faq_a2: { pt: "A escolha depende da sua renda, da composição familiar, dos médicos que você utiliza, dos hospitais da sua região e do seu orçamento. A BLGI compara as opções e ajuda você a encontrar o plano mais adequado para sua realidade.", en: "The choice depends on your income, family composition, the doctors you use, the hospitals in your area, and your budget. BLGI compares options and helps you find the plan best suited to your reality." },
    faq_q3: { pt: "Posso continuar usando meu médico atual?", en: "Can I keep using my current doctor?" },
    faq_a3: { pt: "Depende da rede de atendimento do plano escolhido. Antes da contratação, verificamos se seus médicos, hospitais e laboratórios fazem parte da rede credenciada para que você tome sua decisão com segurança.", en: "It depends on the provider network of the chosen plan. Before purchasing, we verify if your doctors, hospitals, and labs are part of the in-network providers so you can make an informed decision." },
    faq_q4: { pt: "O seguro de vida serve apenas para pagar uma indenização quando a pessoa falece?", en: "Does life insurance only pay out when someone passes away?" },
    faq_a4: { pt: "Não. Alguns seguros permanentes também oferecem benefícios em vida, como acesso ao valor acumulado (cash value), além de estratégias de proteção patrimonial e planejamento financeiro, dependendo da modalidade contratada.", en: "No. Some permanent life insurance policies also offer living benefits, such as access to accumulated cash value, as well as asset protection and financial planning strategies, depending on the policy type." },
    faq_q5: { pt: "Quanto de seguro de vida eu preciso?", en: "How much life insurance do I need?" },
    faq_a5: { pt: "Cada família possui uma necessidade diferente. Consideramos renda, patrimônio, dívidas, filhos e objetivos futuros para recomendar uma proteção adequada à sua realidade.", en: "Every family has different needs. We consider income, assets, debts, children, and future goals to recommend a protection amount suitable for your reality." },
    faq_q6: { pt: "O seguro de carro mais barato é sempre a melhor opção?", en: "Is the cheapest car insurance always the best option?" },
    faq_a6: { pt: "Nem sempre. Um preço menor pode significar limites de cobertura reduzidos ou ausência de proteções importantes. O melhor seguro é aquele que protege adequadamente você, sua família e seu patrimônio.", en: "Not always. A lower price might mean reduced coverage limits or the lack of important protections. The best insurance is the one that adequately protects you, your family, and your assets." },
    faq_q7: { pt: "O que devo fazer se sofrer um acidente?", en: "What should I do if I get into an accident?" },
    faq_a7: { pt: "Priorize a segurança das pessoas, acione as autoridades quando necessário e comunique a seguradora o mais rápido possível. A Better Life também orienta você durante todo o processo.", en: "Prioritize the safety of all individuals, contact authorities if necessary, and report to the insurance company as soon as possible. Better Life will also guide you throughout the entire process." },
    faq_q8: { pt: "Quando preciso contratar um seguro Commercial Auto?", en: "When do I need to buy Commercial Auto insurance?" },
    faq_a8: { pt: "Quando o veículo é utilizado para atividades da empresa, como transporte de mercadorias, atendimento a clientes, prestação de serviços ou operações comerciais. Dependendo da utilização, um seguro pessoal pode não oferecer a cobertura adequada.", en: "When the vehicle is used for business activities, such as transporting goods, visiting clients, providing services, or commercial operations. Depending on the usage, a personal auto policy might not provide adequate coverage." },
    faq_q9: { pt: "O seguro residencial cobre furacões e tempestades?", en: "Does home insurance cover hurricanes and storms?" },
    faq_a9: { pt: "Depende da apólice. Na Flórida, muitas coberturas incluem danos causados pelo vento, mas normalmente existe um dedutível específico para furacões. Explicamos exatamente quais riscos estão cobertos antes da contratação.", en: "It depends on the policy. In Florida, many coverages include windstorm damages, but there is usually a specific hurricane deductible. We explain exactly which risks are covered before you purchase." },
    faq_q10: { pt: "O seguro residencial cobre alagamentos?", en: "Does home insurance cover floods?" },
    faq_a10: { pt: "Na maioria dos casos, não. Danos causados por enchentes normalmente exigem uma cobertura específica de Flood Insurance, mesmo para imóveis localizados fora de áreas de alto risco.", en: "In most cases, no. Flood damage typically requires a separate Flood Insurance policy, even for properties located outside high-risk areas." },
    faq_q11: { pt: "Vale a pena contratar um seguro para meu pet?", en: "Is it worth buying insurance for my pet?" },
    faq_a11: { pt: "Se o seu animal faz parte da família, um seguro pode ajudar a reduzir despesas inesperadas com consultas, exames, cirurgias e outros tratamentos, dependendo da cobertura contratada.", en: "If your pet is part of the family, insurance can help reduce unexpected expenses for consultations, exams, surgeries, and other treatments, depending on the coverage." },
    faq_q12: { pt: "Minha empresa realmente precisa de seguro?", en: "Does my business really need insurance?" },
    faq_a12: { pt: "Toda empresa está exposta a riscos. O tipo de proteção ideal depende da atividade, da quantidade de funcionários, dos contratos e da forma como o negócio opera.", en: "Every business is exposed to risks. The ideal type of protection depends on the industry, number of employees, contracts, and how the business operates." },
    faq_q13: { pt: "O que é uma Business Owner's Policy (BOP)?", en: "What is a Business Owner's Policy (BOP)?" },
    faq_a13: { pt: "A BOP reúne, em uma única apólice, algumas das principais coberturas para pequenas e médias empresas, como responsabilidade civil e proteção do patrimônio empresarial.", en: "A BOP combines some of the primary coverages for small and medium-sized businesses into a single policy, such as general liability and commercial property protection." },
    faq_q14: { pt: "O que é o General Liability?", en: "What is General Liability?" },
    faq_a14: { pt: "É o seguro que protege a empresa contra reclamações de terceiros relacionadas a danos materiais, lesões corporais e outros prejuízos pelos quais o negócio possa ser responsabilizado. É uma das coberturas mais importantes para empresas nos Estados Unidos.", en: "It is the insurance that protects the company against third-party claims for property damage, bodily injury, and other losses the business might be held liable for. It is one of the most important coverages for businesses in the US." },
    faq_q15: { pt: "Quando o Workers' Compensation é obrigatório?", en: "When is Workers' Compensation mandatory?" },
    faq_a15: { pt: "Na Flórida, a obrigatoriedade depende do tipo de atividade e da quantidade de funcionários. Nossa equipe ajuda a identificar quando essa cobertura é exigida e qual solução faz mais sentido para o seu negócio.", en: "In Florida, the requirement depends on the industry and the number of employees. Our team helps identify when this coverage is required and which solution makes the most sense for your business." },
    faq_q16: { pt: "O que são as Soluções Internacionais da Better Life?", en: "What are Better Life's International Solutions?" },
    faq_a16: { pt: "São estratégias voltadas para famílias que desejam proteger patrimônio, organizar o planejamento sucessório ou construir patrimônio em dólar por meio de soluções internacionais de seguros.", en: "They are strategies aimed at families wishing to protect assets, organize succession planning, or build wealth in US dollars through international insurance solutions." },
    faq_q17: { pt: "Quem mora no Brasil pode contratar essas soluções?", en: "Can someone living in Brazil purchase these solutions?" },
    faq_a17: { pt: "Sim. Trabalhamos com seguradora americana especializada no cliente soluções internacionais, atendendo quem mora no Brasil, conhecendo sua realidade e suas necessidades. O processo de contratação e acesso é simples e seguro.", en: "Yes. We work with an American carrier specialized in international solutions, serving those living in Brazil by understanding their reality and needs. The application and access process is simple and secure." },
    faq_q18: { pt: "A Better Life trabalha com apenas uma seguradora?", en: "Does Better Life only work with one insurance company?" },
    faq_a18: { pt: "Não. Somos uma agência independente e analisamos diferentes seguradoras para encontrar a solução mais adequada para cada cliente.", en: "No. We are an independent agency and we analyze different carriers to find the most suitable solution for each client." },
    faq_q19: { pt: "Posso concentrar todos os meus seguros na Better Life?", en: "Can I consolidate all my insurance policies with Better Life?" },
    faq_a19: { pt: "Sim. Nosso objetivo é resolver todas as necessidades de seguros da sua família e da sua empresa, reunindo diferentes soluções em um único relacionamento.", en: "Yes. Our goal is to solve all the insurance needs for your family and business, bringing together different solutions into a single relationship." },
    faq_q20: { pt: "O que diferencia a Better Life de outras agências de seguros?", en: "What makes Better Life different from other insurance agencies?" },
    faq_a20: { pt: "Na Better Life, você não precisa entender de seguros sozinho. Nós simplificamos um mercado complexo, ajudamos você a tomar decisões com segurança e permanecemos ao seu lado sempre que sua vida mudar. Porque nosso compromisso não é apenas vender um seguro, mas resolver tudo o que envolve a proteção da sua família, do seu patrimônio e do seu negócio.", en: "At Better Life, you don't have to figure out insurance on your own. We simplify a complex market, help you make confident decisions, and stand by your side whenever your life changes. Because our commitment isn't just selling an insurance policy, but resolving everything involving the protection of your family, your assets, and your business." }
};

// 1. Update index.html replacements
Object.keys(keysToAdd).forEach(key => {
    // special handling for title, since JS language switcher updates DOM elements with [data-i18n]
    if (key === 'slogan_global') {
        // Find <h5>Você vive. Nós resolvemos.</h5>
        indexHtml = indexHtml.replace(/<h5>Você vive\. Nós resolvemos\.<\/h5>/g, '<h5 data-i18n="slogan_global">Você vive. Nós resolvemos.</h5>');
        // Find title
        indexHtml = indexHtml.replace(/<title>Better Life Global Insurance \| Você vive\. Nós resolvemos\.<\/title>/, '<title data-i18n="site_title">Better Life Global Insurance | Você vive. Nós resolvemos.</title>');
        keysToAdd['site_title'] = { pt: "Better Life Global Insurance | Você vive. Nós resolvemos.", en: "Better Life Global Insurance | You live. We handle it." };
    }
});

indexHtml = indexHtml.replace(/>Acidentes de trânsito anuais nos EUA</g, ' data-i18n="stat_1_desc">Acidentes de trânsito anuais nos EUA<');
indexHtml = indexHtml.replace(/>Falências ligadas a dívidas médicas \(Forbes\)</g, ' data-i18n="stat_2_desc">Falências ligadas a dívidas médicas (Forbes)<');
indexHtml = indexHtml.replace(/>Em danos por desastres climáticos em 2024 \(NOAA\)</g, ' data-i18n="stat_3_desc">Em danos por desastres climáticos em 2024 (NOAA)<');
indexHtml = indexHtml.replace(/>Acidentes de trabalho graves\/ano \(NSC\)</g, ' data-i18n="stat_4_desc">Acidentes de trabalho graves/ano (NSC)<');

indexHtml = indexHtml.replace(/>Baixar PDF</g, ' data-i18n="download_pdf">Baixar PDF<');
indexHtml = indexHtml.replace(/>Quem Somos</g, ' data-i18n="quem_somos_link">Quem Somos<');
indexHtml = indexHtml.replace(/>Recebemos as suas informações, obrigado pelo seu interesse!</g, ' data-i18n="form_success_title">Recebemos as suas informações, obrigado pelo seu interesse!<');
indexHtml = indexHtml.replace(/>Em breve um de nossos especialistas te apresentará a melhor cotação e estará ao seu lado, acompanhando todas as etapas.</g, ' data-i18n="form_success_desc">Em breve um de nossos especialistas te apresentará a melhor cotação e estará ao seu lado, acompanhando todas as etapas.<');
indexHtml = indexHtml.replace(/>Fechar</g, ' data-i18n="close_btn">Fechar<');

// Replace FAQ texts directly
for (let i = 1; i <= 20; i++) {
    const qKey = "faq_q" + i;
    const aKey = "faq_a" + i;
    if (keysToAdd[qKey]) {
        const qEscaped = keysToAdd[qKey].pt.replace(/[.*+?^$\/{}()|[\]\\]/g, '\\$&');
        indexHtml = indexHtml.replace(new RegExp(">(?:\\s*)" + qEscaped + "(?:\\s*)<", "g"), ' data-i18n="' + qKey + '">' + keysToAdd[qKey].pt + '<');
        
        const aEscaped = keysToAdd[aKey].pt.replace(/[.*+?^$\/{}()|[\]\\]/g, '\\$&');
        indexHtml = indexHtml.replace(new RegExp(">(?:\\s*)" + aEscaped + "(?:\\s*)<", "g"), ' data-i18n="' + aKey + '">' + keysToAdd[aKey].pt + '<');
    }
}

// 2. Update main.js
let ptTranslationsStr = "";
let enTranslationsStr = "";

Object.keys(keysToAdd).forEach(key => {
    // Escape quotes
    const ptClean = keysToAdd[key].pt.replace(/"/g, '\\"');
    const enClean = keysToAdd[key].en.replace(/"/g, '\\"');
    ptTranslationsStr += `          ${key}: "${ptClean}",\n`;
    enTranslationsStr += `          ${key}: "${enClean}",\n`;
});

// Avoid duplicate injection
if (!mainJs.includes('stat_1_desc:')) {
    mainJs = mainJs.replace(/pt: {/, "pt: {\n" + ptTranslationsStr);
    mainJs = mainJs.replace(/en: {/, "en: {\n" + enTranslationsStr);
}

// Update the translation function
if (mainJs.includes("function updateText()")) {
    mainJs = mainJs.replace(
        "document.querySelectorAll('[data-i18n]').forEach(el => {",
        "document.querySelectorAll('[data-i18n]').forEach(el => {\n            if (el.tagName === 'TITLE') {\n                document.title = translations[currentLang][el.getAttribute('data-i18n')] || el.innerText;\n                return;\n            }"
    );
}

fs.writeFileSync('index.html', indexHtml, 'utf8');
fs.writeFileSync('main.js', mainJs, 'utf8');

console.log('Translations added successfully');
