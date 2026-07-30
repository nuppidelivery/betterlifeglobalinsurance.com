const fs = require('fs');
const path = require('path');
const root = __dirname;

const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

// 1) Global Text Replacements
const allFiles = walkSync(root);
const exts = ['.html', '.js', '.json'];

allFiles.forEach(file => {
    if (!exts.some(ext => file.endsWith(ext))) return;
    if (file.includes('update_')) return; // skip scripts

    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(/Seguro Automóvel/g, "Seguro Carro");
    content = content.replace(/Seguro Automvel/g, "Seguro Carro");
    content = content.replace(/Seguro Residencial/g, "Seguro Casa");

    if (file.endsWith('.html')) {
        content = content.replace(/<a href="#faq" style="border: none; padding: 0;">Perguntas Frequentes<\/a>/g, '');
        content = content.replace(/<a href="#faq">Perguntas Frequentes<\/a>/g, '');
    }

    if (file.endsWith('index.html')) {
        // Fix the 66É text block and rename the section
        // <span data-target="66">0</span>É
        // Wait, the user said "Remova completamente esse texto. Crie um título mais profissional e coerente para a seção de notícias."
        // They want to REMOVE "66É" (or maybe the whole counter item?) and create a title for "seção de notícias".
        // Wait, is there a news section that is MISSING a title?
        // Let's replace 66É with 66%. And look at the section header.
        // I will do this manually after script execution.
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});

console.log('Global replace done.');
