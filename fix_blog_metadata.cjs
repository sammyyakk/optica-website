const fs = require('fs');

let file = fs.readFileSync('src/app/blog/[slug]/page.tsx', 'utf8');

file = file.replace(/description: post.excerpt,\n      publishedTime: post.publishedAt,/, 'description: post.excerpt,\n      url: `/blog/${slug}`,\n      publishedTime: post.publishedAt,');

file = file.replace(/twitter: {\n      card: "summary_large_image",/, 'alternates: {\n      canonical: `/blog/${slug}`,\n    },\n    twitter: {\n      card: "summary_large_image",');

fs.writeFileSync('src/app/blog/[slug]/page.tsx', file);
