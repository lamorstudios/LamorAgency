/**
 * ============================================================================
 * PAGES-DEPLOY VORBEREITEN – fuer die temporaere Webdesign-Landingpage
 * ============================================================================
 *
 * GitHub Pages liefert GENAU EINEN Branch an GENAU EINER Wurzel aus, und eine
 * Custom Domain gilt immer fuer die ganze Pages-Site – nie fuer einen
 * Unterordner. Damit `webdesign.lamoragency.de/` direkt die Landingpage
 * zeigt, muss der Standalone-Build also in der WURZEL von gh-pages liegen.
 *
 * Dieses Script nimmt das Ergebnis von `npm run build:standalone` und
 * bereitet es fuer den gewuenschten Zielort auf.
 *
 * Aufruf:
 *   node scripts/pages-prepare.mjs <zielordner> [--base=/praefix] [--noindex]
 *
 *   ohne --base    Auslieferung an der Domain-Wurzel (Custom Domain).
 *                  Pfade bleiben wie gebaut: /_astro/…, /fonts/…
 *   mit  --base    Auslieferung in einem Unterordner, z. B. auf
 *                  lamorstudios.github.io/LamorAgency/standalone/.
 *                  Root-absolute Pfade bekommen das Praefix – auch in CSS,
 *                  sonst laden die Webfonts nicht (404) und der Browser
 *                  faellt auf Systemschrift zurueck.
 *   --noindex      setzt auf jeder Seite <meta name="robots" content="noindex">.
 *                  Nur fuer Vorschau-Kopien, NIE fuer die Live-Auslieferung.
 *
 * Canonical und og:url zeigen unabhaengig davon auf die Ziel-Subdomain –
 * das setzt bereits der Standalone-Build (siehe astro.config.mjs).
 *
 * NICHT ANGEFASST wird die Datei CNAME: die legt GitHub an, sobald die
 * Custom Domain im Repository eingetragen ist. Beim Deploy muss sie
 * erhalten bleiben, sonst verliert die Pages-Site ihre Domain.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const root = args.find((a) => !a.startsWith('--'));
const baseArg = args.find((a) => a.startsWith('--base='));
const BASE = baseArg ? baseArg.slice(7).replace(/\/+$/, '') : '';
const NOINDEX = args.includes('--noindex');

if (!root) {
  console.error('Aufruf: node scripts/pages-prepare.mjs <zielordner> [--base=/praefix] [--noindex]');
  process.exit(1);
}

/** Praefix nur setzen, wenn es nicht schon dran haengt und der Pfad lokal ist. */
const prefixed = (rest) => `${BASE}/${rest}`;
const skip = BASE ? new RegExp(`^${BASE.replace(/\//g, '\\/')}\\/`) : null;

let dateien = 0;
let geaendert = 0;

function bearbeiten(pfad) {
  const istCss = pfad.endsWith('.css');
  const istSeite = pfad.endsWith('.html');
  if (!istSeite && !pfad.endsWith('.xml') && !istCss) return;
  dateien++;

  let s = readFileSync(pfad, 'utf8');
  const vorher = s;

  if (BASE) {
    if (istCss) {
      // url(/fonts/…) und andere root-absolute Pfade im gebuendelten CSS.
      s = s.replace(/url\((['"]?)\/(?!\/)([^)'"]*)\1\)/g, (m, q, rest) =>
        skip.test(`/${rest}`) ? m : `url(${q}${prefixed(rest)}${q})`);
    } else {
      s = s.replace(/(href|src|action|content)="\/(?!\/)([^"]*)"/g, (m, attr, rest) => {
        if (skip.test(`/${rest}`)) return m;
        // content="…" nur bei Bildpfaden praefixen, sonst trifft es Meta-Texte.
        if (attr === 'content' && !/\.(png|jpg|jpeg|webp|avif|svg|ico)$/.test(rest)) return m;
        return `${attr}="${prefixed(rest)}"`;
      });
      s = s.replace(/srcset="([^"]+)"/g, (m, v) =>
        `srcset="${v.replace(/(^|,\s*)\/(?!\/)/g, (mm, pre) => `${pre}${BASE}/`)}"`);
    }
  }

  if (NOINDEX && istSeite && !/name="robots"/.test(s)) {
    s = s.replace(/<head>/, '<head><meta name="robots" content="noindex, nofollow">');
  }

  if (s !== vorher) {
    writeFileSync(pfad, s);
    geaendert++;
  }
}

function lauf(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) lauf(p);
    else bearbeiten(p);
  }
}

lauf(root);
console.log(
  `Pages vorbereitet: ${geaendert}/${dateien} Dateien angepasst`
  + ` · Basis "${BASE || '/'}"`
  + ` · ${NOINDEX ? 'noindex gesetzt' : 'indexierbar'}`,
);
