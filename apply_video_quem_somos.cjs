const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// 1) Replace Video File Name
indexHtml = indexHtml.replace(/src="IMG_8164\.MOV"/, 'src="BETTER_LIFE_APRESENTAÇÃO.mp4"');

// The player already has: style="... aspect-ratio: 9/16; max-width: 400px; margin: 0 auto; background: #000; ..."
// and object-fit: cover on the video. This perfectly meets "não esticar, manter proporção nativa, eliminar barras".
// Just double checking if object-fit: cover is there. It should be from the previous step.

// 2) Reposition "Quem Somos" section to sit immediately after "video-boas-vindas"
const qsStart = indexHtml.indexOf('<section id="quem-somos"');
const qsEnd = indexHtml.indexOf('</section>', qsStart) + 10;
if (qsStart !== -1 && qsEnd > qsStart) {
    const qsSection = indexHtml.substring(qsStart, qsEnd);
    
    // Remove "Quem Somos" from its current location
    indexHtml = indexHtml.substring(0, qsStart) + indexHtml.substring(qsEnd);
    
    // Find the end of "video-boas-vindas"
    const vidStart = indexHtml.indexOf('<section id="video-boas-vindas"');
    const vidEnd = indexHtml.indexOf('</section>', vidStart) + 10;
    
    if (vidStart !== -1 && vidEnd > vidStart) {
        // Insert "Quem Somos" right after "video-boas-vindas"
        indexHtml = indexHtml.substring(0, vidEnd) + '\n\n    <!-- Reposicionado: Quem Somos -->\n    ' + qsSection + indexHtml.substring(vidEnd);
    }
}

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Update Complete!');
