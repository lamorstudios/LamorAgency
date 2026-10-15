/**
 * ============================================================================
 * DAUERSCHLEIFEN-VIDEOS
 * ============================================================================
 *
 * Gemeinsame Logik fuer alle Videos, die von selbst laufen sollen und die
 * niemand starten muss: der Cinematic-Film und das Video im Smartphone-Mockup.
 *
 * WICHTIG: Diese Datei ist reine Zugabe. Die Videos laufen auch ohne sie –
 * autoplay, muted, loop und playsinline stehen im HTML. Wer JavaScript
 * abschaltet, sieht trotzdem den laufenden Film.
 *
 * Was hier passiert:
 *
 *   1. play() nachfassen. Einige Browser lehnen den ersten Versuch ab
 *      (iOS im Stromsparmodus, restriktive Einstellungen). Gelingt es nicht,
 *      bleibt das Posterbild stehen – kein Fehler, nur kein Film.
 *
 *   2. Ausserhalb des Sichtfelds pausieren. Videos, die im Hintergrund
 *      weiterlaufen, kosten Akku und Datenvolumen ohne jeden Nutzen. Sobald
 *      sie wieder sichtbar sind, laufen sie weiter – ohne Zutun, es gibt
 *      bewusst kein Bedienelement.
 *
 * Kein Sonderfall fuer "Bewegung reduzieren": die Filme sind hier der Inhalt,
 * nicht eine Animation ueber dem Inhalt. Ein angehaltenes Video ohne
 * Bedienelemente waere eine Sackgasse – der Besucher kaeme nicht weiter.
 */

/** Markierung im HTML: <video data-loop-video> */
const SELEKTOR = '[data-loop-video]';

export function initLoopVideos() {
  document.querySelectorAll<HTMLVideoElement>(SELEKTOR).forEach((video) => {
    if ((video as any).__loopInit) return;
    (video as any).__loopInit = true;

    const spielen = () => video.play?.().catch(() => { /* Poster bleibt stehen. */ });
    spielen();

    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) spielen(); else video.pause(); },
      { threshold: 0.01 },
    );
    io.observe(video);
  });
}

/**
 * Einmal jetzt und nach jedem Seitenwechsel (View Transitions).
 *
 * Beide Komponenten rufen das auf. Das Modul wird nur einmal gebuendelt,
 * deshalb genuegt dieser Schalter, damit der Listener nicht doppelt haengt.
 */
let beobachtet = false;

export function watchLoopVideos() {
  initLoopVideos();
  if (beobachtet) return;
  beobachtet = true;
  document.addEventListener('astro:page-load', initLoopVideos);
}
