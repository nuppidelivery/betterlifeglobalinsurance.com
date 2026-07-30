const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The original tag was: <video src="0725_2.mp4" controls playsinline preload="metadata" style="width: 100%; height: 100%; object-fit: cover;"></video>
html = html.replace(/<video src="[^"]+" controls playsinline preload="metadata" style="width: 100%; height: 100%; object-fit: cover;"><\/video>/, 
`<video controls playsinline preload="metadata" style="width: 100%; height: 100%; object-fit: cover;">
              <source src="0725_2.mp4" type="video/mp4">
            </video>`);

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated with <source> tag');
