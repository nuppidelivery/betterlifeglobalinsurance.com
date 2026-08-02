const fs = require('fs');
let content = fs.readFileSync('main.js', 'utf8');

// The block has a closing bracket right after legal_terms: "Terms of Use"
// But there are dangling keys appended.
content = content.replace(/legal_terms:\s*"Terms of Use"\s*\n\s*}\s*\n/, 'legal_terms: "Terms of Use",\n');

// Now we need to find where the dangling keys end. They end right before:
//   }
// });
// Or maybe they just end without a closing bracket.
// Let's replace the ending sequence.
content = content.replace(/workers_comp_help:\s*"We evaluate your payroll and operations to ensure your company meets state requirements[^\"]*"\s*\n\s*}\s*\n\s*\n\s*\}\);\s*\n/g, 'workers_comp_help: "We evaluate your payroll and operations to ensure your company meets state requirements and remains protected against lawsuits from injured employees."\n    }\n  }\n});\n');

// Since we are not sure the exact end, let's just do a string replacement for the `});` part
content = content.replace(/workers_comp_help:\s*"We evaluate your payroll and operations to ensure your company meets state requirements and remains protected against lawsuits from injured employees\."\s*\}\);\s*/g, 'workers_comp_help: "We evaluate your payroll and operations to ensure your company meets state requirements and remains protected against lawsuits from injured employees."\n    }\n  }\n});\n');

fs.writeFileSync('main.js', content, 'utf8');
console.log('Fixed syntax error in main.js');
