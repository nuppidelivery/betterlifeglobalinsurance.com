const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the exact sentence if it somehow exists
    const sentenceOld = "Seguro de vida, saúde, carro, casa, negócios e soluções internacionais para a comunidade brasileira.";
    const sentenceNew = "Seguro de vida, saúde, carro, casa, negócios e soluções internacionais para a comunidade brasileira.";
    content = content.replace(new RegExp(sentenceOld, 'gi'), sentenceNew);
    
    // Also replace standalone occurrences
    content = content.replace(/Soluções Internacionais/g, "Soluções Internacionais");
    
    fs.writeFileSync(filePath, content, 'utf8');
}

function processFolder(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        const filePath = path.join(folder, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
                processFolder(filePath);
            }
        } else if (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.cjs') || filePath.endsWith('.json')) {
            replaceInFile(filePath);
        }
    }
}

processFolder('.');
console.log('Global replacement finished.');
