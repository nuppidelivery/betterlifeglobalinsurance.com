const fs = require('fs');
const path = require('path');

const root = __dirname;

function replaceInFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (const [search, replace] of replacements) {
        content = content.split(search).join(replace);
    }
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

// 4 & 5. Internacional -> Soluções Internacionais
// Seguro de Vida Internacional -> Solução de Vida Internacional
const globalReplacements = [
    // Task 5
    ['Seguro de Vida Internacional', 'Solução de Vida Internacional'],
    ['Seguro de vida internacional', 'Solução de vida internacional'],
    // Task 4
    ['Internacional', 'Soluções Internacionais'],
    ['internacional', 'soluções internacionais'], // Lowercase versions
    // Restore exact keys/classes that might break
    ['soluções internacionais.html', 'internacional.html'],
    ['href="soluções internacionais/', 'href="internacional/'],
    ['class="soluções internacionais"', 'class="internacional"'],
    ['id="soluções internacionais"', 'id="internacional"'],
    ['opt_soluções internacionais', 'opt_internacional'],
    ['value="soluções internacionais"', 'value="internacional"'],
    ['/soluções internacionais/', '/internacional/']
];

const htmlFiles = [
    'index.html',
    'interna.html',
    'seguros/vida.html',
    'seguros/saude.html',
    'seguros/carro.html',
    'seguros/residencial.html',
    'seguros/viagem.html',
    'seguros/pets.html',
    'seguros/umbrella.html',
    'seguros/bop.html',
    'seguros/general-liability.html',
    'seguros/workers-comp.html',
    'seguros/commercial-auto.html',
    'seguros/commercial-property.html',
    'seguros/professional-liability.html',
    'seguros/cyber-liability.html',
    'seguros/surety-bonds.html',
    'internacional/vida-internacional.html',
    'internacional/protecao-patrimonial.html',
    'internacional/sucessao.html',
    'internacional/estrategias-patrimoniais.html'
];

htmlFiles.forEach(file => {
    replaceInFile(path.join(root, file), globalReplacements);
});

// Update main.js for Task 1 and others
replaceInFile(path.join(root, 'main.js'), [
    ...globalReplacements,
    // Task 1: FAQ and Form Options (pt)
    ['opt_vida: "Vida"', 'opt_vida: "Seguro de Vida"'],
    ['opt_saude: "Saúde"', 'opt_saude: "Seguro Saúde"'],
    ['opt_carro: "Carro"', 'opt_carro: "Seguro Automóvel"'],
    ['opt_casa: "Casa"', 'opt_casa: "Seguro Residencial"'],
    ['opt_viagem: "Viagem"', 'opt_viagem: "Seguro Viagem"'],
    ['opt_pets: "Pets"', 'opt_pets: "Seguro Pets"'],
    ['opt_empresariais: "Empresariais"', 'opt_empresariais: "Seguro Empresarial"'],
    
    ['nav_faq_1: "Vida"', 'nav_faq_1: "Seguro de Vida"'],
    ['nav_faq_2: "Saúde"', 'nav_faq_2: "Seguro Saúde"'],
    ['nav_faq_3: "Carro"', 'nav_faq_3: "Seguro Automóvel"'],
    ['nav_faq_4: "Casa"', 'nav_faq_4: "Seguro Residencial"'],
    ['nav_faq_5: "Viagem"', 'nav_faq_5: "Seguro Viagem"'],
    ['nav_faq_6: "Pets"', 'nav_faq_6: "Seguro Pets"'],
    ['nav_faq_7: "Empresariais"', 'nav_faq_7: "Seguro Empresarial"']
]);

// Update index.html hardcoded options for Task 1
replaceInFile(path.join(root, 'index.html'), [
    ['>Vida</option>', '>Seguro de Vida</option>'],
    ['>Saúde</option>', '>Seguro Saúde</option>'],
    ['>Carro</option>', '>Seguro Automóvel</option>'],
    ['>Casa</option>', '>Seguro Residencial</option>'],
    ['>Viagem</option>', '>Seguro Viagem</option>'],
    ['>Pets</option>', '>Seguro Pets</option>'],
    ['>Empresariais</option>', '>Seguro Empresarial</option>'],
    
    // FAQ titles (h4) - replace text
    ['Seguro Pet</h4>', 'Seguro Pets</h4>']
]);

console.log('Script completed.');
