const fs = require('fs');
let file = fs.readFileSync('src/app/blog/opengraph-image.tsx', 'utf8');

const updated = file.replace(/gap: "24px", alignItems: "center", zIndex: 1/, 'alignItems: "center", zIndex: 1').replace(/lineHeight: 1.1, maxWidth: "1000px", color: "white"/, 'lineHeight: 1.1, maxWidth: "1000px", color: "white", marginBottom: "24px"');

fs.writeFileSync('src/app/blog/opengraph-image.tsx', updated);
console.log('Fixed generic OG image layout.');
