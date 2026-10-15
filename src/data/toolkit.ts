/**
 * ============================================================================
 * WERKZEUG UND TECHNIK
 * ============================================================================
 *
 * Die Programme und das Equipment, mit denen tatsaechlich gearbeitet wird.
 * Auf der bestehenden Website stand das unter "Unsere Anbieter".
 *
 * WARUM DAS AUF DIE STARTSEITE GEHOERT
 * Es ist der einzige Abschnitt, der fachliche Kompetenz belegt, statt sie zu
 * behaupten. Wer Sony, Neumann und DJI kennt, weiss sofort, woran er ist.
 * Wer sie nicht kennt, liest die kurze Einordnung daneben und versteht, wofuer
 * das jeweilige Werkzeug da ist.
 *
 * LOGOS NACHTRAGEN
 *   1. monochromes SVG (bevorzugt) oder PNG nach src/assets/brand/toolkit/
 *      legen, Dateiname = `file` aus diesem Eintrag
 *   2. fertig – die Startseite findet es beim Build von allein
 *
 * Solange kein Logo vorliegt, wird der Name typografisch gesetzt. Das ist
 * bewusst als hochwertiger Zwischenstand gestaltet und kein kaputter Zustand.
 *
 * REGEL: Hier stehen nur Marken, mit denen wirklich gearbeitet wird. Es wird
 * keine Marke ergaenzt, um die Reihe voller aussehen zu lassen, und es wird
 * kein Logo nachgebaut oder generiert.
 */

export interface Tool {
  /** Markenname, exakte Schreibweise. */
  name: string;
  /** Dateiname ohne Endung in src/assets/brand/toolkit/ */
  file: string;
  /** Wofuer das Werkzeug steht – eine Zeile, auch fuer Laien verstaendlich. */
  use: string;
  /** Gruppierung fuer die Anzeige. */
  kind: 'Software' | 'Kamera & Optik' | 'Ton' | 'Luft';
}

export const toolkit: Tool[] = [
  {
    name: 'Adobe Creative Cloud',
    file: 'adobe',
    use: 'Schnitt, Color Grading, Motion Design und Layout',
    kind: 'Software',
  },
  {
    name: 'Sony',
    file: 'sony',
    use: 'Kameras und Objektive für Film und Foto',
    kind: 'Kamera & Optik',
  },
  {
    name: 'Neumann',
    file: 'neumann',
    use: 'Studiomonitore – hier wird der Ton abgehört',
    kind: 'Ton',
  },
  {
    name: 'Cubase Pro',
    file: 'cubase',
    use: 'Vertonung, Sounddesign und Mischung',
    kind: 'Ton',
  },
  {
    name: 'DJI',
    file: 'dji',
    use: 'Drohnen und Gimbals für bewegte Kamera',
    kind: 'Luft',
  },
  {
    name: 'Procreate',
    file: 'procreate',
    use: 'Illustration und Artworks von Hand',
    kind: 'Software',
  },
];

/** Einleitung über der Reihe. Eine Aussage, kein Werbetext. */
export const toolkitLead =
  'Womit wir arbeiten, steht hier offen – nicht als Zierde, sondern damit du '
  + 'einschätzen kannst, was dich erwartet.';
