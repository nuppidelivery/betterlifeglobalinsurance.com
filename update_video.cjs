const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/src="IMG_8275\.MP4"/, 'src="0725_2.mp4"');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Video src updated successfully');
