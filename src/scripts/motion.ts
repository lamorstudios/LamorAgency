/**
 * LAMOR Motion System – KERN (ohne GSAP)
 *
 * GRUNDREGEL: Motion ist Zugabe, nie Voraussetzung. Kein Inhalt darf dauerhaft
 * unsichtbar sein, wenn eine Animation nicht startet. Drei Ebenen sichern das:
 *   1. CSS versteckt nur unter `html.js` (Klasse kommt aus dem Inline-Script).
 *   2. Das Inline-Script nimmt `.js` nach 2.5s zurück, falls dieses Modul nie
 *      `data-motion="ready"` setzt (Bundle fehlt, JS-Fehler, altes Gerät).
 *   3. `safetyNet()` deckt ab, dass das Modul läuft, der IntersectionObserver
 *      aber nicht auslöst – der klassische Mobile-Bug.
 *
 * PERFORMANCE: Diese Datei kommt ohne Bibliothek aus. GSAP/ScrollTrigger
 * (~117 KB) wird in `scroll-fx.ts` ausgelagert und NUR nachgeladen, wenn ein
 * Gerät die Effekte überhaupt bekommt: feiner Zeiger, kein Reduced Motion,
 * nicht Mobile – und nur, wenn es auf der Seite passende Elemente gibt.
 * Mobile Besucher laden davon nichts.
 */

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;
const isMobile = () => matchMedia('(max-width: 767px)').matches;

let cleanups: Array<() => void> = [];
export const onCleanup = (fn: () => void) => cleanups.push(fn);

const REVEAL_SELECTOR = '[data-reveal], .words, .rule, .media--reveal';

function reveal() {
  const targets = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);

  // Läuft die Brand-Intro, starten Hero-Reveals erst danach.
  if (document.documentElement.hasAttribute('data-intro')) {
    document.querySelectorAll<HTMLElement>('[data-hero] [data-reveal], [data-hero] .words').forEach((t) => {
      const base = parseFloat(t.style.getPropertyValue('--reveal-delay')) || 0;
      t.style.setProperty('--reveal-delay', `${base + 950}ms`);
    });
  }

  if (reduced() || !('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('is-inview'));
    return;
  }

  // clip-path-geclippte Elemente (.media--reveal) melden keine Intersection
  // → stattdessen das Elternelement beobachten.
  const proxies = new Map<Element, HTMLElement[]>();
  targets.forEach((t) => {
    const key = t.classList.contains('media--reveal') && t.parentElement ? t.parentElement : t;
    proxies.set(key, [...(proxies.get(key) ?? []), t]);
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        proxies.get(e.target)?.forEach((t) => t.classList.add('is-inview'));
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );
  proxies.forEach((_, key) => io.observe(key));
  cleanups.push(() => io.disconnect());
}

/**
 * Sicherheitsnetz gegen den Mobile-Klassiker: der Observer feuert nicht
 * (falsche Viewport-Höhe durch die Adressleiste, Layout-Shift, Bounce-Scroll).
 */
function safetyNet() {
  if (reduced()) return;
  const inViewport = (el: Element) => {
    const r = el.getBoundingClientRect();
    return r.top < innerHeight * 1.1 && r.bottom > 0;
  };
  const sweep = (all: boolean) => {
    document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
      if (el.classList.contains('is-inview')) return;
      if (all || inViewport(el)) el.classList.add('is-inview');
    });
  };
  const t1 = setTimeout(() => sweep(false), 1400);
  const t2 = setTimeout(() => sweep(true), 8000); // letzte Instanz
  cleanups.push(() => { clearTimeout(t1); clearTimeout(t2); });
}

function header() {
  const el = document.querySelector<HTMLElement>('[data-header]');
  if (!el) return;
  let last = window.scrollY;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    el.classList.toggle('is-scrolled', y > 24);
    el.classList.toggle('is-hidden', y > 320 && y > last && !document.body.classList.contains('nav-open'));
    last = y;
    ticking = false;
  };
  const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  cleanups.push(() => window.removeEventListener('scroll', onScroll));
}

/** Zähler-Animation. Der Endwert steht im Markup – das hier ist reine Zugabe. */
function counters() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!els.length || reduced() || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        io.unobserve(el);
        const target = Number(el.dataset.count);
        if (!Number.isFinite(target)) continue;
        const grouped = el.hasAttribute('data-grouped');
        const fmt = new Intl.NumberFormat('de-DE');
        const out = (n: number) => (grouped ? fmt.format(n) : String(n));
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p); // easeOutExpo
          el.textContent = out(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = out(target); // Endwert exakt
        };
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.4 },
  );
  els.forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());
}

function videos() {
  const vids = document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]');
  if (!vids.length) return;
  const saveData = (navigator as any).connection?.saveData;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting && !saveData && !reduced()) v.play().catch(() => {});
        else v.pause();
      }
    },
    { rootMargin: '10% 0px', threshold: 0.2 },
  );
  vids.forEach((v) => io.observe(v));
  cleanups.push(() => io.disconnect());
}

function hoverVideos() {
  if (!finePointer() || reduced()) return;
  document.querySelectorAll<HTMLElement>('[data-hover-video]').forEach((el) => {
    const v = el.querySelector<HTMLVideoElement>('video');
    if (!v) return;
    const enter = () => { v.play().catch(() => {}); };
    const leave = () => { v.pause(); };
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    cleanups.push(() => { el.removeEventListener('pointerenter', enter); el.removeEventListener('pointerleave', leave); });
  });
}

const BG: Record<string, string> = { dark: '#0a0a0a', light: '#f3f2ee', accent: '#3157ff' };
/**
 * Sections malen ihren Grund selbst. Der Body übernimmt nur die Farbe der
 * Fläche, die gerade oben steht – damit Overscroll und Adressleiste nicht aus
 * dem Bild fallen. Bewusst ohne ScrollTrigger: ein Observer reicht völlig.
 */
function sectionTransitions() {
  document.body.style.removeProperty('background-color');
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-bg]'));
  const first = sections[0];
  // Nur Seiten, die direkt oben mit einer eigenen Fläche beginnen, färben mit.
  if (!first || first.getBoundingClientRect().top + window.scrollY > 4) return;
  if (!('IntersectionObserver' in window)) return;

  const set = (key: string) => { document.body.style.backgroundColor = BG[key] ?? BG.dark; };
  set(first.dataset.bg!);

  // Ein schmaler Streifen auf halber Höhe: Welche Section ihn schneidet,
  // bestimmt die Hintergrundfarbe.
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) set((e.target as HTMLElement).dataset.bg!);
    },
    { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
  );
  sections.forEach((s) => io.observe(s));
  cleanups.push(() => { io.disconnect(); document.body.style.removeProperty('background-color'); });
}

function anchors() {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    const href = a.getAttribute('href')!;
    if (href.length < 2) return;
    a.addEventListener('click', (e) => {
      const target = document.getElementById(href.slice(1));
      if (!target) return; // kein Ziel → Browser macht sein Standardverhalten
      e.preventDefault();
      target.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
      history.pushState(null, '', href);
    });
  });
}

/**
 * GSAP-Effekte nachladen – aber nur, wenn sie auch jemand zu sehen bekommt.
 * Mobile, Reduced Motion und Touch-Geräte laden die Bibliothek gar nicht erst.
 */
const FX_SELECTOR = '[data-parallax], [data-takeover], [data-drift], [data-hero], [data-magnetic], [data-statement], [data-featured]';
let destroyFx: (() => void) | null = null;

async function loadScrollFx() {
  if (reduced() || isMobile() || !finePointer()) return;
  if (!document.querySelector(FX_SELECTOR)) return;
  try {
    const fx = await import('./scroll-fx');
    destroyFx = fx.initScrollFx();
  } catch {
    // Bibliothek nicht ladbar: die Seite funktioniert unverändert weiter,
    // nur ohne Parallax und Magnetic.
  }
}

export function init() {
  // Signal an den Watchdog im <head>: das Motion-System läuft.
  document.documentElement.setAttribute('data-motion', 'ready');

  reveal();
  safetyNet();
  header();
  counters();
  videos();
  hoverVideos();
  sectionTransitions();
  anchors();

  // Nach dem ersten Rendern, damit die Effekte nichts blockieren.
  if ('requestIdleCallback' in window) (window as any).requestIdleCallback(loadScrollFx, { timeout: 1200 });
  else setTimeout(loadScrollFx, 200);
}

export function destroy() {
  cleanups.forEach((fn) => fn());
  cleanups = [];
  destroyFx?.();
  destroyFx = null;
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
