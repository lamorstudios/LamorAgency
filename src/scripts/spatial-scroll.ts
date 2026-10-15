/**
 * ============================================================================
 * SPATIAL SCROLL – Scrollfortschritt als CSS-Variable
 * ============================================================================
 *
 * DAS PRINZIP
 * Dieses Modul animiert nichts. Es schreibt pro Gruppe eine einzige Zahl in
 * eine CSS-Variable:
 *
 *     --p   0  die Gruppe steht genau unter dem Sichtfeld, noch in der Tiefe
 *           1  die Gruppe sitzt mittig und vorn
 *           2  die Gruppe ist oben hinausgewandert, wieder in der Tiefe
 *
 * Die gesamte Gestaltung – Translate, Scale, Blur, Opacity – passiert in CSS
 * per calc() auf dieser Zahl. Das hat drei Vorteile:
 *
 *   1. UMKEHRBAR. Die Position haengt ausschliesslich am Scrollstand, nicht
 *      an einem einmal ausgeloesten Zustand. Rueckwaerts scrollen laeuft
 *      deshalb exakt rueckwaerts, ohne dass dafuer etwas programmiert waere.
 *   2. KONTINUIERLICH. Kein "einmal beim Eintritt", sondern jeder Frame.
 *   3. GUENSTIG. Pro Frame wird eine Zahl gesetzt. Die eigentliche Arbeit
 *      macht der Compositor an Transform und Opacity.
 *
 * WARUM NICHT animation-timeline: view()
 * Die native Variante waere eleganter und ganz ohne JavaScript – aber sie
 * fehlt in Firefox und in aelteren Safari-Versionen. Dort stuende die Seite
 * dann in einem Zwischenzustand. Diese Loesung laeuft ueberall gleich.
 *
 * KOSTENBREMSEN
 *   - Nur sichtbare Gruppen werden gerechnet (IntersectionObserver).
 *   - Hoechstens ein Update pro Frame (requestAnimationFrame).
 *   - Gleiche Zahl wie im letzten Frame -> kein Schreibzugriff.
 *   - Geometrie wird gecacht und nur bei resize neu gemessen.
 *
 * BEWEGUNG REDUZIEREN
 * Ist "prefers-reduced-motion: reduce" gesetzt, laeuft nichts davon. Jede
 * Gruppe bekommt dauerhaft --p: 1, also ihren Ruhezustand: vorn, scharf,
 * voll sichtbar. Der Inhalt ist damit vollstaendig da – nur eben ohne Reise.
 */

/** Markierung im HTML: <div data-spatial> */
const SELEKTOR = '[data-spatial]';

interface Gruppe {
  el: HTMLElement;
  /** Zuletzt geschriebener Wert – verhindert ueberfluessige Schreibzugriffe. */
  letzter: number;
  sichtbar: boolean;
}

let gruppen: Gruppe[] = [];
let laeuft = false;
let gebunden = false;

/** 0 unten ausserhalb, 1 mittig, 2 oben hinaus. */
function fortschritt(el: HTMLElement): number {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  /* Mittelpunkt der Gruppe, gemessen von der Unterkante des Fensters nach
     oben, normiert auf die Strecke "einmal komplett durchs Bild". */
  const mitte = r.top + r.height / 2;
  const weg = vh + r.height;
  const roh = 2 - ((mitte + r.height / 2) / weg) * 2;
  return Math.min(2, Math.max(0, roh));
}

function zeichnen() {
  laeuft = false;
  for (const g of gruppen) {
    if (!g.sichtbar) continue;
    const p = Math.round(fortschritt(g.el) * 1000) / 1000;
    if (p === g.letzter) continue;
    g.letzter = p;
    g.el.style.setProperty('--p', String(p));
  }
}

function anfordern() {
  if (laeuft) return;
  laeuft = true;
  requestAnimationFrame(zeichnen);
}

export function initSpatial() {
  const gefunden = Array.from(document.querySelectorAll<HTMLElement>(SELEKTOR));
  if (gefunden.length === 0) return;

  const ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (ruhig) {
    /* Ruhezustand: vorn, scharf, sichtbar. Keine Listener, keine Rechnerei. */
    gefunden.forEach((el) => el.style.setProperty('--p', '1'));
    return;
  }

  gruppen = gefunden.map((el) => ({ el, letzter: NaN, sichtbar: true }));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          const g = gruppen.find((x) => x.el === e.target);
          if (g) g.sichtbar = e.isIntersecting;
        }
        anfordern();
      },
      /* Grosszuegiger Rand: die Gruppe wird schon gerechnet, bevor sie
         sichtbar wird – sonst springt sie beim Eintritt. */
      { rootMargin: '25% 0px 25% 0px' },
    );
    gruppen.forEach((g) => io.observe(g.el));
  }

  if (!gebunden) {
    gebunden = true;
    addEventListener('scroll', anfordern, { passive: true });
    addEventListener('resize', anfordern);
    addEventListener('orientationchange', anfordern);
  }
  anfordern();
}

/** Einmal jetzt und nach jedem Seitenwechsel (View Transitions). */
export function watchSpatial() {
  initSpatial();
  document.addEventListener('astro:page-load', initSpatial);
}
