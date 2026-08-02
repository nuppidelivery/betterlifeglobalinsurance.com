const fs = require('fs');
let content = fs.readFileSync('main.js', 'utf8');

// The `en` object should be properly closed right after `seo_title_workers_comp: ...`
// In the current file it looks like this:
//         seo_title_workers_comp: "Workers' Compensation | Better Life Global Insurance",
//
// };

content = content.replace(/seo_title_workers_comp:\s*\"Workers' Compensation \| Better Life Global Insurance\",\r?\n\r?\n\};\r?\n/g, 'seo_title_workers_comp: "Workers\' Compensation | Better Life Global Insurance"\n    }\n  };\n');

fs.writeFileSync('main.js', content, 'utf8');
console.log('Fixed translations closing braces');
