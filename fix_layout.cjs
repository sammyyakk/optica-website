const fs = require('fs');

let file = fs.readFileSync('src/app/layout.tsx', 'utf8');

// Remove hardcoded canonical link in head
file = file.replace('<link rel="canonical" href="https://www.bvpoptica.com" />\n', '');
file = file.replace('<link rel="canonical" href="https://www.bvpoptica.com" />', '');

// Remove global canonical and og:url so they resolve properly per-page
file = file.replace(/url: siteUrl,\n/g, 'url: "/",\n');
file = file.replace(/canonical: siteUrl,\n/g, 'canonical: "/",\n');

fs.writeFileSync('src/app/layout.tsx', file);
