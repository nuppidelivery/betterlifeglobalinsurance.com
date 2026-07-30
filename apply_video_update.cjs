const fs = require('fs');

// Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// Remove the subtitle paragraph
html = html.replace(/<p[^>]*data-i18n="video_subtitle"[^>]*>[\s\S]*?<\/p>/, '');

// Update video source
html = html.replace(/src="BETTER_LIFE_APRESENTAÇÃO\.mp4"/, 'src="IMG_8275.MP4"');
// Also handle encoded version just in case
html = html.replace(/src="BETTER_LIFE_APRESENTA%C3%87%C3%83O\.mp4"/, 'src="IMG_8275.MP4"');
// Handle possible previous state
html = html.replace(/src="IMG_8164\.MOV"/, 'src="IMG_8275.MP4"');

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully.');

// Update main.js
let mainJs = fs.readFileSync('main.js', 'utf8');
mainJs = mainJs.replace(/video_subtitle:\s*".*?",\n?/g, '');
mainJs = mainJs.replace(/"video_subtitle":\s*".*?",\n?/g, '');
fs.writeFileSync('main.js', mainJs, 'utf8');
console.log('main.js updated successfully.');
