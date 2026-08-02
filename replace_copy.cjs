const fs = require('fs');
const path = require('path');

const targetStr = "Seguro de vida, saúde, carro, casa, negócios e soluções internacionais para a comunidade brasileira.";
const newStr = "Seguro de vida, saúde, carro, casa, negócios e soluções internacionais para a comunidade brasileira.";

function replaceInFolder(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        const filePath = path.join(folder, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
                replaceInFolder(filePath);
            }
        } else if (file.endsWith('.html') || file.endsWith('.js')) {
            let content = fs.readFileSync(filePath, 'utf8');
            if (content.includes(targetStr)) {
                content = content.replace(new RegExp(targetStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newStr);
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Updated', filePath);
            }
        }
    }
}

replaceInFolder('.');
