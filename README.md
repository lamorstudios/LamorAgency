# LAMOR AGENCY – Website 2026

Eigenständiges Code-Projekt für [www.lamoragency.de](https://www.lamoragency.de). Ersetzt die bisherige Wix-Website.
Stack: **Astro 7** (statisch), CSS Design Tokens, **GSAP + ScrollTrigger** (nachgeladen, nur Desktop), Netlify.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/
npm run preview   # dist lokal prüfen
npm run check     # Typprüfung
```

---

## Seitenstruktur

| Seite | Zweck |
| --- | --- |
| `/` | Startseite mit voller Conversion-Dramaturgie |
| `/work/`, `/work/<slug>/` | Portfolio |
| `/services/` | Alle Leistungen im Detail |
| `/agency/` | Studio, Haltung, Zahlen, Prozess, Team |
| `/pricing/` | Pakete und Einzelleistungen |
| `/models/` | Models & Talents |
| **`/webdesign-muenchen/`** | **Eigenständige Sales-Landingpage für das Website-Produkt** |
| `/contact/` | Anfrage-Formular |
| `/blog/`, `/blog/<slug>/` | Blog |
| `/impressum/`, `/datenschutz/` | Rechtliches |

Die Startseite folgt dieser Abfolge:
Hero → Clients → Problem/Lösung → Leistungen → Webdesign-Teaser → Showreel →
Arbeiten → Prozess → Models → Branchen → Zahlen → Stimmen → Preise → FAQ → Kontakt.

---

## Inhalte ändern – alles an einer Stelle

Alle Texte, Preise und Listen liegen in `src/data/`. Im Code steht **kein einziger Preis**.

| Datei | Inhalt |
| --- | --- |
| `site.ts` | Name, Claim, E-Mail, Telefon, WhatsApp, Adresse, Social |
| `navigation.ts` | Haupt-, Footer- und Legal-Navigation, Header-CTA |
| `services.ts` | Sechs Disziplinen mit Einzelleistungen |
| `clients.ts` | Referenzmarken (+ optionale Logos) |
| **`pricing.ts`** | **Retainer-Pakete + Einzelleistungen** |
| **`website-pricing.ts`** | **Website-Pakete, Bundles, Prozess, Problem/Lösung** |
| `faq.ts` | Allgemeine FAQ (`faqs`) + Website-FAQ (`websiteFaqs`) |
| `stats.ts` | LAMOR in Zahlen (Count-up) |
| `industries.ts` | Branchen-Slider |
| `process.ts` | Strategie → … → Website |
| `team.ts` | Team (nur echte Personen) |
| `models.ts` | Talent-Kategorien, Buchungsablauf, Profile |
| `comparison.ts` | Vorher/Nachher |
| `testimonials.ts` | Kundenstimmen |

### Preise ändern

**Retainer** (`src/data/pricing.ts`):
```ts
monthly: { amount: 495, from: true, per: 'Monat' },   // monatlich
setup:   { amount: 1950, from: true, note: '…' },     // einmaliger Projektstart
```

**Website-Produkt** (`src/data/website-pricing.ts`):
```ts
price: 1490,                        // EINMALIGE Erstellungskosten
monthlyPrice: { min: 39, max: 59 }, // OPTIONALE Betreuung – finanziert NICHT die Website
highlighted: true,                  // genau ein Paket hervorheben
```
Eine Änderung wirkt gleichzeitig auf Landingpage, Startseiten-Teaser, FAQ-Text,
Meta-Description und Schema.org. `amount`/`price` auf `null` = „Auf Anfrage".

FAQ-Texte enthalten Platzhalter statt Zahlen – aufgelöst in `src/lib/faq.ts`:
`{{PREIS_START}}`, `{{WEB_PREIS}}`, `{{WEB_MONAT}}`.

---

## Motion: Progressive Enhancement (wichtig)

Frühere Reveal-Animationen ließen Inhalt auf Mobile unsichtbar. Das kann jetzt
strukturell nicht mehr passieren – **drei unabhängige Ebenen**:

1. **CSS versteckt nur unter `html.js`.** Ohne JavaScript ist alles sofort sichtbar.
2. **Watchdog im `<head>`** (`BaseLayout.astro`): Setzt `motion.ts` nicht innerhalb
   von 2,5 s `data-motion="ready"`, wird `.js` entfernt und alles wird sichtbar.
   Deckt JS-Fehler, blockierte Bundles und sehr langsame Geräte ab.
3. **`safetyNet()`** in `motion.ts`: Feuert der IntersectionObserver nicht
   (falsche Viewport-Höhe durch die Adressleiste, Layout-Shift), werden nach
   1,4 s sichtbare und nach 8 s alle verbliebenen Elemente freigeschaltet.

Zusätzlich: GSAP-Tweens, die etwas ausblenden, laufen mit `immediateRender: false`.
`prefers-reduced-motion` schaltet jede Animation ab.

Geprüft mit Playwright: JS aus, JS blockiert und Reduced Motion – jeweils
**0 unsichtbare Elemente** auf allen Hauptseiten.

### Performance-Aufteilung

- `src/scripts/motion.ts` – Kern **ohne Bibliothek** (~5,8 KB / 2,4 KB gzip):
  Reveal, Header, Zähler, Video-Autoplay, Section-Hintergründe, Anker.
- `src/scripts/scroll-fx.ts` – GSAP + ScrollTrigger (~113 KB), **dynamisch
  nachgeladen** und nur bei feinem Zeiger, ohne Reduced Motion und oberhalb 767 px.

Gemessen: Mobile lädt **16 KB** JavaScript, Desktop 135 KB, Reduced Motion 16 KB.

---

## Platzhalter ersetzen

Fehlende Medien werden als neutrale Media-Surfaces gerendert (`.ph`), im Markup
über `data-placeholder="…"` gekennzeichnet. Offene Stellen finden:

```bash
grep -rn "PLACEHOLDER\|TODO_VERIFY\|TODO_QUOTE\|TODO_CONTENT\|data-placeholder" src
```

### 1. Bilder und Videos
- Bilder nach `src/assets/…` → automatisch AVIF/WebP + srcset über `<Media>`.
- Videos nach `public/media/…` (H.264 MP4, stumm, ≤ 8–10 MB, mit Poster).
- Showreel: `src/components/sections/Hero.astro` und `Showreel.astro`, jeweils
  `showreel` / `reel` auf `{ type: 'video', src: '/media/showreel.mp4', poster: '…' }`.

### 2. Kundenlogos
Monochromes SVG nach `src/assets/brand/clients/` und in `clients.ts` eintragen:
`{ name: 'ZAM München', logo: '/src/assets/brand/clients/zam.svg' }`.
Ohne Logo wird der Name typografisch gesetzt – bewusst gestaltet, nicht kaputt.

### 3. Projekte
Je Projekt `src/content/projects/<slug>.md` (Felder siehe `src/content.config.ts`).
Angelegt sind die echten Referenzen aus dem bestehenden Portfolio; Texte und
Medien sind mit `TODO_CONTENT` markiert.

### 4. Kundenstimmen
`src/data/testimonials.ts`. **Es wird nichts erfunden:** Einträge mit
`verified: false` werden nicht ausgespielt. Originalwortlaut einsetzen und
`verified: true` setzen – dann erscheint die Section automatisch.

### 5. Team, Models, Fonts
- `team.ts` / `models.ts`: nur belegte Personen und freigegebene Profile.
- Hausschrift: `.woff2` nach `public/fonts/`, `@font-face` in `src/styles/fonts.css`,
  `--font-display` / `--font-body` in `src/styles/tokens.css` voranstellen.

### 6. Rechtliches
`src/pages/impressum.astro` und `datenschutz.astro`: bestehende Texte 1:1 einsetzen,
`TODO_VERIFY`-Stellen prüfen (Rechtsform, Hosting Wix → Netlify, Netlify Forms).

---

## Design-System

- Tokens: `src/styles/tokens.css` – Schwarz `--c-ink`, Off-White `--c-paper`,
  Akzent `--c-accent` (Electric Blue). Der Akzent wird an **einer** Stelle geändert.
- Typo: fluid via `clamp()`, Klassen `.t-hero .t-display .t-h1 … .t-label`.
- Flächen: `data-theme="dark|light|accent"` plus `data-bg` für den Body-Wechsel.
- Formulare: global in `global.css` (zwei Formulare teilen sich die Darstellung).

---

## Netlify

- Build `npm run build`, Publish `dist`, Node 22 (`netlify.toml`).
- **Zwei Formulare**: `contact` (Vollformular) und `website` (kurze Lead-Form).
  Nach dem ersten Deploy unter *Forms* Benachrichtigungen einrichten.
- **Bot-Schutz**: WordPress-Scanner-Pfade (`/wp-login.php`, `/xmlrpc.php`,
  `/wp-admin/*`, `/?page_id=` …) werden mit `410` auf `blocked.html` (~40 Bytes)
  geleitet, statt die vollständige 404-Seite auszuliefern.
- **robots.txt**: Suchmaschinen frei, aggressive SEO-Scraper geblockt
  (Ahrefs, Semrush, MJ12, Bytespider …). KI-Crawler bewusst erlaubt – die Zeilen
  zum Blocken stehen auskommentiert bereit.
- **Redirects**: `/about → /agency/`, `/models-talents → /models/`,
  `/webdesign → /webdesign-muenchen/`. Weitere alte Wix-URLs dort ergänzen.

---

## QA-Stand

Playwright, Chromium, Breiten 320 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1920:

- kein horizontales Scrollen auf keiner Seite
- keine Konsolen- oder Laufzeitfehler
- Mobile-Navigation (Fokusfalle, Scroll-Lock, Escape), FAQ-Accordion,
  Branchen-Slider, Formular-Validierung, Zähler – alle geprüft
- keine Touch-Fläche unter 40 px
- JS aus / JS blockiert / Reduced Motion: 0 unsichtbare Elemente
- SEO: ein `<h1>` je Seite, Canonical, OG, Twitter Cards, JSON-LD
  (Organization/ProfessionalService, WebSite, BreadcrumbList, OfferCatalog,
  Service, FAQPage – FAQPage bewusst nur auf `/pricing/` und `/webdesign-muenchen/`)
