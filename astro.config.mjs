// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync, writeFileSync, rmSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/* ---------------------------------------------------------------------------
   TEMPORAERER STANDALONE-MODUS
   Erklaerung, Zweck und Rueckbau stehen vollstaendig in src/lib/standalone.ts.
   Kurzfassung: `LAMOR_STANDALONE=1` baut aus DERSELBEN Quelle nur die
   Webdesign-Landingpage. Kein Fork, keine zweite Seite, keine Kopie.
   Ohne das Flag verhaelt sich der Build exakt wie vorher.
--------------------------------------------------------------------------- */
const STANDALONE = process.env.LAMOR_STANDALONE === '1' || process.env.LAMOR_STANDALONE === 'true';
const STANDALONE_ORIGIN = 'https://webdesign.lamoragency.de';
const STANDALONE_PAGE = 'webdesign-muenchen';
/** Impressum und Datenschutz bleiben: Pflicht fuer eine deutsche Landingpage. */
const STANDALONE_KEEP = [STANDALONE_PAGE, 'impressum', 'datenschutz'];
/** Dateien und Ordner, die technisch gebraucht werden. */
const STANDALONE_KEEP_ASSETS = ['_astro', 'fonts', 'media', '404.html', 'favicon.svg', 'apple-touch-icon.png', 'og-default.jpg', 'blocked.html', '.nojekyll'];

/**
 * Raeumt nach dem Build auf, damit im Standalone-Modus wirklich nur die
 * Landingpage erreichbar ist. Ein Besucher soll ueber keinen Link, keine
 * URL und keine Sitemap auf eine unfertige Relaunch-Seite kommen.
 * Laeuft ausschliesslich, wenn das Flag gesetzt ist.
 *
 * @returns {import('astro').AstroIntegration}
 */
function standaloneBuild() {
  return {
    name: 'lamor-standalone-build',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        if (!STANDALONE) return;
        const root = fileURLToPath(dir);

        // 1. Alles entfernen, was nicht zur Landingpage gehoert.
        const keep = new Set([...STANDALONE_KEEP, ...STANDALONE_KEEP_ASSETS]);
        let removed = 0;
        for (const name of readdirSync(root)) {
          if (keep.has(name)) continue;
          rmSync(join(root, name), { recursive: true, force: true });
          removed++;
        }

        // 2. Die Landingpage auf "/" legen. Sie bleibt zusaetzlich unter
        //    ihrem regulaeren Pfad erreichbar, damit bestehende Links und
        //    Sprungmarken (/webdesign-muenchen/#anfrage) weiter funktionieren.
        const pageFile = join(root, STANDALONE_PAGE, 'index.html');
        if (!existsSync(pageFile)) {
          logger.warn(`Standalone: ${STANDALONE_PAGE}/index.html nicht gefunden – dist/ bleibt ohne Startseite.`);
          return;
        }
        writeFileSync(join(root, 'index.html'), readFileSync(pageFile, 'utf8'));

        // 3. Adressen umschreiben: die Landingpage lebt jetzt unter der
        //    Subdomain. Canonical, og:url und JSON-LD zeigen dorthin, damit
        //    Google die Seite nicht als Dublette der Hauptdomain liest.
        /** @param {string} d */
        const walk = (d) => {
          for (const name of readdirSync(d)) {
            const p = join(d, name);
            if (statSync(p).isDirectory()) { walk(p); continue; }
            if (!p.endsWith('.html')) continue;
            let s = readFileSync(p, 'utf8');
            const before = s;
            s = s.replaceAll(`https://www.lamoragency.de/${STANDALONE_PAGE}/`, `${STANDALONE_ORIGIN}/`);
            s = s.replaceAll('https://www.lamoragency.de/', `${STANDALONE_ORIGIN}/`);
            // Die Landingpage liegt hier auf "/". Links und das Ziel des
            // Formulars sollen dorthin zeigen, nicht auf den alten Unterpfad.
            s = s.replaceAll(`href="/${STANDALONE_PAGE}/`, 'href="/');
            s = s.replaceAll(`action="/${STANDALONE_PAGE}/`, 'action="/');
            if (s !== before) writeFileSync(p, s);
          }
        };
        walk(root);

        // 4. Eigene robots.txt und Sitemap fuer die Subdomain. Die Version
        //    aus /public listet die Hauptdomain und passt hier nicht.
        writeFileSync(join(root, 'robots.txt'),
          '# LAMOR AGENCY – temporaere Webdesign-Landingpage\n'
          + 'User-agent: *\nAllow: /\nDisallow: /404\n\n'
          + `Sitemap: ${STANDALONE_ORIGIN}/sitemap.xml\n`);
        const urls = ['/', ...STANDALONE_KEEP.filter((p) => p !== STANDALONE_PAGE).map((p) => `/${p}/`)];
        writeFileSync(join(root, 'sitemap.xml'),
          '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
          + urls.map((u) => `  <url><loc>${STANDALONE_ORIGIN}${u}</loc></url>`).join('\n')
          + '\n</urlset>\n');

        logger.info(`Standalone-Build: ${removed} Eintraege entfernt, Landingpage liegt auf "/".`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  // Im Standalone-Modus ist die Subdomain die kanonische Adresse.
  site: STANDALONE ? STANDALONE_ORIGIN : 'https://www.lamoragency.de',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  integrations: [
    sitemap({
      // Placeholder-Einträge (Projekte/Artikel ohne echte Inhalte) bleiben aus der Sitemap.
      filter: (page) => !page.includes('/placeholder-') && !page.endsWith('/404'),
      changefreq: 'weekly',
      priority: 0.7,
    }),
    standaloneBuild(),
  ],
  image: {
    // Sharp ist installiert: AVIF/WebP werden beim Build generiert.
    responsiveStyles: true,
  },
  vite: { build: { cssMinify: 'lightningcss' } },
});
