const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const map = {
  "Ã£":"ã",
  "Ã§":"ç",
  "Ã©":"é",
  "Ãª":"ê",
  "Ã­":"í",
  "Ã³":"ó",
  "Ãµ":"õ",
  "Ãº":"ú",
  "Ã¢":"â",
  "Ã¡":"á",
  "Ã€":"À",
  "Ã‰":"É",
  "Ãƒ":"Ã",
  "Ã‡":"Ç",
  "ÃŠ":"Ê",
  "Ã\x8d":"Í",
  "Ã”":"Ô",
  "Ã“":"Ó",
  "Ãš":"Ú",
  "Ã‚":"Â",
  "Ã\x81":"Á"
};

for (const [mojibake, correct] of Object.entries(map)) {
  html = html.split(mojibake).join(correct);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log("Mojibake fixed!");
