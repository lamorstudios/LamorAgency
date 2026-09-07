# LAMOR AGENCY – Website 2026

Eigenständiges Code-Projekt für [www.lamoragency.de](https://www.lamoragency.de). Ersetzt die bisherige Wix-Website.
Stack: **Astro 7** (statisch), **GSAP + ScrollTrigger** (nur für Parallax, Statement, Hero-Scroll, Magnetic CTA), CSS Design Tokens, Netlify.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/
npm run preview   # dist lokal prüfen
npm run check     # Typprüfung
```

## Struktur

```
src/
  data/            zentrale Inhalte: site.ts (Kontakt, Claim), navigation.ts, services.ts, clients.ts
  content/         Collections: projects/*.md (Portfolio), posts/*.md (Blog)
  content.config.ts  Schemas der Collections
  styles/          tokens.css (Farben, Typo, Spacing, Motion), fonts.css (@font-face), global.css
  layouts/         BaseLayout (Head, SEO, JSON-LD, Header, Footer, Intro, Cursor), LegalLayout
  components/      Media, Words (Text-Reveal), ProjectCard, WorkGrid, ServicesList, Clients, ContactForm …
  pages/           /, /work/, /work/[slug]/, /about/, /services/, /blog/, /blog/[slug]/, /contact/, /impressum/, /datenschutz/, 404
  scripts/motion.ts  Reveal-Observer, Header-State, Video-Autoplay, Parallax, Magnetic
  assets/          optimierte Bilder (AVIF/WebP via astro:assets): work/, brand/, about/, blog/
public/
  fonts/           LAMOR-Fonts (woff2)
  media/           Videos (mp4/webm) + Poster
```

## Platzhalter ersetzen

Alle Platzhalter sind sichtbar markiert: `[PROJECT VIDEO]`, `[PROJECT IMAGE]`, `[CLIENT LOGO]`, `[EXISTING TEXT]`, `[TEAM MEMBER]`, `[SHOWREEL / HERO VIDEO]`.
`grep -rn "\[EXISTING TEXT\]\|TODO_VERIFY" src` listet alle offenen Stellen.

### 1. Fonts (bestehende LAMOR-Fonts)
1. `.woff2`-Dateien nach `public/fonts/` legen.
2. `src/styles/fonts.css`: `@font-face`-Blöcke aktivieren, Dateinamen anpassen.
3. `src/styles/tokens.css`: `--font-display` / `--font-body` auf die Font-Namen setzen (System-Fallback bleibt).

### 2. Farben
`src/styles/tokens.css` → `--c-ink`, `--c-paper`, `--c-accent` usw. Alle Komponenten nutzen ausschließlich diese Tokens.

### 3. Showreel / Hero-Video
`src/components/home/Hero.astro` → `showreel` auf `{ type: 'video', src: '/media/showreel.mp4', poster: '/src/assets/brand/showreel-poster.jpg', alt: '…' }` setzen.
Videos: H.264 MP4 (+ optional WebM), stumm, ≤ 8–10 MB, Mobile-Version idealerweise ≤ 1080p.

### 4. Portfolio-Projekte
Je Projekt eine Datei `src/content/projects/<slug>.md` (Slug = URL). Felder siehe `src/content.config.ts`:
```yaml
title, client, category, services[], year, summary
hero:     { type: image|video, src: '/src/assets/work/<slug>/hero.jpg', alt: '…', ratio: wide|cinema|square|portrait }
preview:  { type: video, src: '/media/work/<slug>/preview.mp4' }   # Hover-Video (Desktop)
gallery:  [ { type: image, src: '…', ratio: portrait, caption: '…' }, … ]
size:     full|large|medium|small   # Größe im Editorial Grid
order, featured (Startseite), placeholder: false
```
Bilder unter `src/assets/work/<slug>/` ablegen → automatisch AVIF/WebP + srcset. Videos unter `public/media/`.
Die 6 Placeholder-Projekte (`placeholder-0x.md`) danach löschen. `placeholder: true` bewirkt `noindex` und Ausschluss aus der Sitemap.

### 5. Leistungen, Kunden, Team
- `src/data/services.ts`: Texte (`short`), Tags, `media` (Bild/Video für Hover-Vorschau).
- `src/data/clients.ts`: `{ name, logo: '/src/assets/brand/clients/<name>.svg' }` – monochrome Logos bevorzugt.
- `src/pages/about.astro`: `team`-Array (Name, Rolle, Foto) und `[EXISTING TEXT]`-Absätze.

### 6. Blog
Je Artikel `src/content/posts/<slug>.md` mit `title, description, date, category, cover, updated`. Bestehende Wix-Artikel 1:1 übernehmen (Slug idealerweise wie bisher, sonst Redirect). Placeholder-Artikel danach löschen.

### 7. Impressum / Datenschutz
`src/pages/impressum.astro`, `src/pages/datenschutz.astro`: bestehende Texte 1:1 einsetzen. Markierte `TODO_VERIFY`-Stellen prüfen (Rechtsform, Hosting Wix → Netlify, Netlify Forms).

### 8. Kontaktdaten
`src/data/site.ts` (E-Mail, Telefon, Adresse, Social). Adresse/Telefon stammen aus öffentlichen Quellen zur bisherigen Website → `TODO_VERIFY`.

## Netlify

- Build: `npm run build`, Publish: `dist` (siehe `netlify.toml`, Node 22).
- Formular: Netlify Forms (`name="contact"`, Honeypot). Nach dem ersten Deploy im Netlify-Dashboard unter *Forms* aktivieren/Benachrichtigung setzen.
- Redirects alter Wix-URLs: in `netlify.toml` unter `[[redirects]]` ergänzen (Beispiel `/contact-1 → /contact/` ist angelegt). Alle URLs enden mit Trailing Slash.
- Sitemap: `/sitemap-index.xml`, robots: `public/robots.txt`.

## Design-System (Kurzfassung)

- Typo: fluid via `clamp()` (`--fs-hero` … `--fs-label`), Klassen `.t-hero .t-display .t-h1 … .t-label`.
- Spacing: `--space-1 … --space-10`, Section-Padding `--section-y`, Gutter `--gutter`, 12-Spalten-Grid `.grid`.
- Motion: `--dur-*`, `--ease-*`; Reveal über `data-reveal`, `<Words>` (Text-Mask), `.media--reveal` (Clip). Alles respektiert `prefers-reduced-motion`.
- Themes: `data-theme="dark|light"` auf Sections/Seiten schaltet die semantischen Tokens.

## QA-Stand

Getestet (Chromium): 320 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1920 – kein horizontales Scrollen, keine Console-Fehler, Mobile-Navigation (Fokus, Scroll-Lock, Escape), Formular-Validierung, Reduced Motion, SEO-Head (Canonical, OG, JSON-LD: Organization/ProfessionalService, WebSite, BreadcrumbList; BlogPosting/CreativeWork sobald `placeholder: false`).
