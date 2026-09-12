/**
 * LAMOR Motion – GSAP-EFFEKTE (nachgeladen)
 *
 * Wird ausschließlich von motion.ts per dynamischem Import geholt, und zwar
 * nur auf Geräten mit feinem Zeiger, ohne Reduced Motion und oberhalb der
 * Mobile-Breite. Dadurch landet GSAP nicht im Haupt-Bundle.
 *
 * Alle Tweens, die Inhalt ausblenden, laufen mit `immediateRender: false`:
 * Feuert der Trigger nie, bleibt der Inhalt sichtbar statt auf opacity 0.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollFx(): () => void {
  const local: Array<() => void> = [];

  /* Dezente Parallax-Bewegung in Medien */
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((wrap) => {
    const inner = wrap.querySelector<HTMLElement>('img, picture, video, .ph, .placeholder');
    if (!inner) return;
    gsap.fromTo(
      inner,
      { yPercent: -8 },
      { yPercent: 8, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: 0.6 } },
    );
  });

  /* Medium öffnet sich beim Scrollen auf die volle Breite (Film-Reveal) */
  document.querySelectorAll<HTMLElement>('[data-takeover]').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(4svh 12vw)' },
      { clipPath: 'inset(0svh 0vw)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 85%', end: 'center 58%', scrub: 0.7 } },
    );
  });

  /* Zeilen, die sich beim Scrollen gegeneinander schieben */
  document.querySelectorAll<HTMLElement>('[data-drift]').forEach((el) => {
    const amount = parseFloat(el.dataset.drift || '0');
    if (!amount) return;
    gsap.fromTo(el, { xPercent: -amount }, { xPercent: amount, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
  });

  /* Statement-Zeilen (scrub) */
  document.querySelectorAll<HTMLElement>('[data-statement]').forEach((el) => {
    const lines = el.querySelectorAll<HTMLElement>('[data-statement-line]');
    const wash = el.querySelector<HTMLElement>('[data-statement-wash]');
    if (!lines.length) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.6 } });
    tl.fromTo(lines, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'power2.out', stagger: 0.18, duration: 0.5, immediateRender: false }, 0);
    if (wash) tl.fromTo(wash, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', ease: 'power2.inOut', duration: 0.45, immediateRender: false }, 0.55);
    tl.to({}, { duration: 0.1 });
  });

  /* Kapitel-Sektion mit mitlaufendem Medium */
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
      gsap.fromTo(
        ch.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: 'power3.out', immediateRender: false, scrollTrigger: { trigger: ch, start: 'top 75%', toggleActions: 'play none none none' } },
      );
    });
  });

  /* Hero schiebt sich beim Verlassen weg */
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) {
    const title = hero.querySelector<HTMLElement>('[data-hero-title]');
    const media = hero.querySelector<HTMLElement>('[data-hero-media]');
    if (title) gsap.to(title, { yPercent: -14, opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 } });
    if (media) gsap.to(media, { scale: 1.08, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 } });
  }

  /* Buttons, die dem Cursor leicht entgegenkommen */
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = 8;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.4, ease: 'power3.out' });
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    local.push(() => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); });
  });

  requestAnimationFrame(() => ScrollTrigger.refresh());
  const onLoad = () => ScrollTrigger.refresh();
  window.addEventListener('load', onLoad);
  local.push(() => window.removeEventListener('load', onLoad));

  return () => {
    local.forEach((fn) => fn());
    ScrollTrigger.getAll().forEach((st) => st.kill());
    gsap.globalTimeline.clear();
  };
}
