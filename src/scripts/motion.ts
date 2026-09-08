/**
 * LAMOR Motion System
 * - Reveal-Observer (CSS-getrieben, JS setzt .is-inview)
 * - Header Scroll-State
 * - Video-Autoplay bei Sichtbarkeit (spart Bandbreite)
 * - GSAP/ScrollTrigger nur für: Parallax, Statement-Scale, Magnetic CTA
 * Alles respektiert prefers-reduced-motion und wird bei View Transitions sauber neu initialisiert.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;
let cleanups: Array<() => void> = [];

function reveal() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], .words, .rule, .media--reveal');
  // Läuft die Brand-Intro, starten Hero-Reveals erst danach.
  if (document.documentElement.hasAttribute('data-intro')) {
    document.querySelectorAll<HTMLElement>('[data-hero] [data-reveal], [data-hero] .words').forEach((t) => {
      const base = parseFloat(t.style.getPropertyValue('--reveal-delay')) || 0;
      t.style.setProperty('--reveal-delay', `${base + 950}ms`);
    });
  }
  if (reduced() || !('IntersectionObserver' in window)) { targets.forEach((t) => t.classList.add('is-inview')); return; }
  // clip-path-geclippte Elemente (.media--reveal) melden keine Intersection → Elternelement beobachten.
  const proxies = new Map<Element, HTMLElement[]>();
  targets.forEach((t) => {
    const key = t.classList.contains('media--reveal') && t.parentElement ? t.parentElement : t;
    proxies.set(key, [...(proxies.get(key) ?? []), t]);
  });
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { proxies.get(e.target)?.forEach((t) => t.classList.add('is-inview')); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
  proxies.forEach((_, key) => io.observe(key));
  cleanups.push(() => io.disconnect());
}

function header() {
  const el = document.querySelector<HTMLElement>('[data-header]');
  if (!el) return;
  let last = window.scrollY, ticking = false;
  const update = () => {
    const y = window.scrollY;
    el.classList.toggle('is-scrolled', y > 24);
    el.classList.toggle('is-hidden', y > 320 && y > last && !document.body.classList.contains('nav-open'));
    last = y; ticking = false;
  };
  const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  cleanups.push(() => window.removeEventListener('scroll', onScroll));
}

function videos() {
  const vids = document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]');
  if (!vids.length) return;
  const saveData = (navigator as any).connection?.saveData;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting && !saveData && !reduced()) { v.play().catch(() => {}); }
      else v.pause();
    }
  }, { rootMargin: '10% 0px', threshold: 0.2 });
  vids.forEach((v) => io.observe(v));
  cleanups.push(() => io.disconnect());
}

function parallax() {
  if (reduced()) return;
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((wrap) => {
    const inner = wrap.querySelector<HTMLElement>('img, picture, video, .placeholder');
    if (!inner) return;
    gsap.fromTo(inner, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
  });
}

function statement() {
  if (reduced()) return;
  document.querySelectorAll<HTMLElement>('[data-statement]').forEach((el) => {
    const lines = el.querySelectorAll<HTMLElement>('[data-statement-line]');
    const wash = el.querySelector<HTMLElement>('[data-statement-wash]');
    if (!lines.length) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.6 } });
    tl.fromTo(lines, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'power2.out', stagger: 0.18, duration: 0.5 }, 0);
    if (wash) tl.fromTo(wash, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', ease: 'power2.inOut', duration: 0.45 }, 0.55);
    tl.to({}, { duration: 0.1 });
  });
}

const BG: Record<string, string> = { dark: '#0a0a0a', light: '#f3f2ee', accent: '#3157ff' };
/* Sections malen ihren Grund selbst. Der Body übernimmt nur die Farbe der Fläche,
   die gerade oben steht – damit Overscroll und Adressleiste nicht aus dem Bild fallen. */
function sectionTransitions() {
  const sections = document.querySelectorAll<HTMLElement>('[data-bg]');
  if (!sections.length) { document.body.style.removeProperty('background-color'); return; }
  const set = (key: string) => { document.body.style.backgroundColor = BG[key] ?? BG.dark; };
  set(sections[0].dataset.bg!);
  sections.forEach((sec) => {
    ScrollTrigger.create({ trigger: sec, start: 'top 50%', end: 'bottom 50%', onEnter: () => set(sec.dataset.bg!), onEnterBack: () => set(sec.dataset.bg!) });
  });
  cleanups.push(() => document.body.style.removeProperty('background-color'));
}

/* Medium öffnet sich beim Scrollen bis über die volle Breite (Film-Reveal) */
function takeover() {
  document.querySelectorAll<HTMLElement>('[data-takeover]').forEach((el) => {
    if (reduced()) { el.style.clipPath = 'inset(0 0)'; return; }
    const wide = matchMedia('(min-width: 900px)').matches;
    const from = wide ? 'inset(4svh 12vw)' : 'inset(0 8vw)';
    gsap.fromTo(el, { clipPath: from }, {
      clipPath: 'inset(0svh 0vw)', ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 85%', end: 'center 58%', scrub: 0.7 },
    });
  });
}

/* Zeilen bewegen sich beim Scrollen gegeneinander – Typo schiebt sich hinter Medien */
function drift() {
  if (reduced()) return;
  document.querySelectorAll<HTMLElement>('[data-drift]').forEach((el) => {
    const amount = parseFloat(el.dataset.drift || '0');
    if (!amount) return;
    gsap.fromTo(el, { xPercent: -amount }, {
      xPercent: amount, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
    });
  });
}

function featured() {
  document.querySelectorAll<HTMLElement>('[data-featured]').forEach((root) => {
    const chapters = root.querySelectorAll<HTMLElement>('[data-feat-chapter]');
    const medias = root.querySelectorAll<HTMLElement>('[data-feat-media]');
    const steps = root.querySelectorAll<HTMLElement>('[data-feat-step]');
    const set = (i: number) => {
      medias.forEach((m) => m.classList.toggle('is-active', m.dataset.featMedia === String(i)));
      steps.forEach((st) => st.classList.toggle('is-active', st.dataset.featStep === String(i)));
    };
    chapters.forEach((ch, i) => {
      ScrollTrigger.create({ trigger: ch, start: 'top 55%', end: 'bottom 55%', onEnter: () => set(i), onEnterBack: () => set(i) });
      if (!reduced()) gsap.fromTo(ch.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ch, start: 'top 75%', toggleActions: 'play none none reverse' } });
    });
  });
}

function heroScroll() {
  if (reduced()) return;
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const title = hero.querySelector<HTMLElement>('[data-hero-title]');
  const media = hero.querySelector<HTMLElement>('[data-hero-media]');
  if (title) gsap.to(title, { yPercent: -14, opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 } });
  if (media) gsap.to(media, { scale: 1.14, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 } });
}

function magnetic() {
  if (reduced() || !finePointer()) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = 8;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.4, ease: 'power3.out' });
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    el.addEventListener('mousemove', move); el.addEventListener('mouseleave', leave);
    cleanups.push(() => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); });
  });
}

function hoverVideos() {
  if (!finePointer() || reduced()) return;
  document.querySelectorAll<HTMLElement>('[data-hover-video]').forEach((el) => {
    const v = el.querySelector<HTMLVideoElement>('video');
    if (!v) return;
    const enter = () => { v.play().catch(() => {}); };
    const leave = () => { v.pause(); };
    el.addEventListener('pointerenter', enter); el.addEventListener('pointerleave', leave);
    cleanups.push(() => { el.removeEventListener('pointerenter', enter); el.removeEventListener('pointerleave', leave); });
  });
}

function anchors() {
  // Sanftes Scrollen zu Ankern mit Header-Offset (nativ, keine Verzögerung der Navigation)
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    const h = () => {
      const id = a.getAttribute('href')!.slice(1);
      const t = id && document.getElementById(id);
      if (!t) return;
      t.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
    };
    a.addEventListener('click', (e) => { e.preventDefault(); h(); history.pushState(null, '', a.getAttribute('href')); });
  });
}

export function init() {
  reveal(); header(); videos(); hoverVideos(); parallax(); sectionTransitions(); statement(); featured(); takeover(); drift(); heroScroll(); magnetic(); anchors();
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

export function destroy() {
  cleanups.forEach((fn) => fn()); cleanups = [];
  ScrollTrigger.getAll().forEach((st) => st.kill());
  gsap.globalTimeline.clear();
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
window.addEventListener('load', () => ScrollTrigger.refresh());
