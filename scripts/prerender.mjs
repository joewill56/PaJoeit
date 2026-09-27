import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TOOLS_CONFIG, GUIDES_DATA } from '../src/lib/seo/routes-data.ts';
import { SUPPORTED_LANGUAGES } from '../src/lib/i18n/languages.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_URL = 'https://pajoeit-convert.pages.dev';
const OG_IMAGE = `${BASE_URL}/pwa-512x512.png`;

// Static pages metadata
const STATIC_PAGES = {
  about: {
    title: 'About PAJOEIT CONVERT – Free In-Browser Image Workspace',
    description:
      'Learn about PAJOEIT CONVERT. Free, private, client-side image converter, compressor, and resizer running 100% in your browser without tracking or uploads.',
  },
  privacy: {
    title: 'Privacy Policy – PAJOEIT CONVERT',
    description:
      'Your privacy is our core promise. All image processing runs strictly in your browser using HTML5 Canvas. Your files are never uploaded to any server.',
  },
  terms: {
    title: 'Terms of Service – PAJOEIT CONVERT',
    description:
      'Terms and conditions for using PAJOEIT CONVERT free image processing and optimization tools.',
  },
  guides: {
    title: 'Image Optimization Guides & Tutorials – PAJOEIT CONVERT',
    description:
      'Master WebP conversion, lossless PNG compression, passport photo target sizing, and website speed optimization.',
  },
};

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderHtml(template, { lang, subPath, title, description }) {
  const cleanSubPath = subPath === '/' ? '' : subPath;
  const canonicalUrl =
    lang === 'en'
      ? `${BASE_URL}${cleanSubPath || '/'}`
      : `${BASE_URL}/${lang}${cleanSubPath}`;

  let html = template;

  // Replace <html lang="...">
  html = html.replace(/<html\s+lang="[^"]*"/i, `<html lang="${lang}"`);

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );

  // Replace canonical link
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace OpenGraph tags
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${OG_IMAGE}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`
  );

  // Generate alternate hreflang tags
  const hreflangTags = SUPPORTED_LANGUAGES.map((l) => {
    const href =
      l.code === 'en'
        ? `${BASE_URL}${cleanSubPath || '/'}`
        : `${BASE_URL}/${l.code}${cleanSubPath}`;
    return `    <link rel="alternate" hreflang="${l.code}" href="${href}" />`;
  });
  hreflangTags.push(
    `    <link rel="alternate" hreflang="x-default" href="${BASE_URL}${cleanSubPath || '/'}" />`
  );

  const hreflangBlock = `\n${hreflangTags.join('\n')}\n`;

  // Insert hreflang tags right before </head> if not already present
  if (!html.includes('hreflang="x-default"')) {
    html = html.replace('</head>', `${hreflangBlock}  </head>`);
  }

  return html;
}

function writePage(outPath, html) {
  const targetDir = path.dirname(outPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.writeFileSync(outPath, html, 'utf-8');
}

async function prerender() {
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html not found. Run "vite build" first.');
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(indexHtmlPath, 'utf-8');
  let count = 0;

  // Collect all route definitions
  const routes = [];

  // Root / Home
  routes.push({
    subPath: '/',
    title: TOOLS_CONFIG.root.title,
    description: TOOLS_CONFIG.root.metaDescription,
  });

  // Tools
  for (const [slug, config] of Object.entries(TOOLS_CONFIG)) {
    if (slug === 'root') continue;
    routes.push({
      subPath: `/${slug}`,
      title: config.title,
      description: config.metaDescription,
    });
  }

  // Guides
  for (const [slug, guide] of Object.entries(GUIDES_DATA)) {
    routes.push({
      subPath: `/guides/${slug}`,
      title: `${guide.title} – PAJOEIT CONVERT`,
      description: guide.metaDescription,
    });
  }

  // Static Pages
  for (const [slug, meta] of Object.entries(STATIC_PAGES)) {
    routes.push({
      subPath: `/${slug}`,
      title: meta.title,
      description: meta.description,
    });
  }

  // Prerender all routes for all supported languages
  for (const route of routes) {
    for (const lang of SUPPORTED_LANGUAGES) {
      const isDefault = lang.code === 'en';
      const cleanSub = route.subPath === '/' ? '' : route.subPath;
      const routeUrl = isDefault ? (cleanSub || '/') : `/${lang.code}${cleanSub}`;

      const renderedHtml = renderHtml(baseTemplate, {
        lang: lang.code,
        subPath: route.subPath,
        title: route.title,
        description: route.description,
      });

      let outFilePath;
      if (routeUrl === '/') {
        outFilePath = path.join(DIST_DIR, 'index.html');
      } else {
        const relativeFolder = routeUrl.replace(/^\//, '');
        outFilePath = path.join(DIST_DIR, relativeFolder, 'index.html');
      }

      writePage(outFilePath, renderedHtml);
      count++;
    }
  }

  console.log(`✓ Prerendered ${count} SEO pages successfully for ${BASE_URL}`);
}

prerender();
