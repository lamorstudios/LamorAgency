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
    if (!lines.length) return;
    gsap.fromTo(lines, { xPercent: (i) => (i % 2 ? 6 : -6), opacity: 0.35 }, { xPercent: 0, opacity: 1, ease: 'none', stagger: 0.05, scrollTrigger: { trigger: el, start: 'top 85%', end: 'center 45%', scrub: 0.8 } });
  });
}

function heroScroll() {
  if (reduced()) return;
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const title = hero.querySelector<HTMLElement>('[data-hero-title]');
  const media = hero.querySelector<HTMLElement>('[data-hero-media]');
  if (title) gsap.to(title, { yPercent: 18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 } });
  if (media) gsap.to(media, { scale: 1.08, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 } });
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
  reveal(); header(); videos(); hoverVideos(); parallax(); statement(); heroScroll(); magnetic(); anchors();
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
