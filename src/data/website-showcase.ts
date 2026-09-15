/**
 * Echte Website-Referenzen fuer den Abschnitt "So sehen unsere Websites aus."
 *
 * INHALTLICHE REGELN
 *   1. Hier stehen ausschliesslich Projekte, die wir wirklich gebaut haben,
 *      mit dem echten Kundennamen und der echten Live-Adresse.
 *   2. KEINE Paketbezeichnungen (ONEPAGE/BUSINESS/PREMIUM) in der Beschriftung.
 *      Die gezeigten Projekte wurden nicht nach den heutigen Website-Paketen
 *      verkauft – das duerfen wir also auch nicht behaupten.
 *      Beschriftung ist immer: Kundenname + Branche · Leistung + Live-Link.
 *   3. Gezeigt werden ausschliesslich echte Screenshots der Live-Website.
 *      Keine nachgebauten Screens, keine generierten Inhalte, keine
 *      Laptop-/Smartphone-Mockups.
 *
 * BILDER
 * Die Screenshots liegen unter src/assets/work/<id>/ und werden von Astro
 * beim Build zu AVIF/WebP in mehreren Breiten optimiert. Fehlt eine Datei,
 * rendert die Komponente einen sichtbar gekennzeichneten Slot statt eines
 * erfundenen Bildes – sie erfindet nie ein Visual.
 */

export interface ShowcaseShot {
  /** Dateiname in src/assets/work/<case.id>/ – ohne Pfad. */
  file: string;
  /** Beschreibt, was auf dem Screenshot zu sehen ist. */
  alt: string;
  /** Kurzlabel fuer die Ansichts-Anzeige unter dem Frame. */
  view: string;
}

export interface ShowcaseCase {
  id: string;
  /** Kundenname, wie er auf der Website steht. */
  client: string;
  /** Branche · Leistung. Niemals ein Paketname. */
  meta: string;
  /** Live-Adresse, oeffnet in einem neuen Tab. */
  url: string;
  /** Anzeige in der reduzierten Browserzeile. */
  domain: string;
  /** Erster Shot = Basisbild. Es bestimmt die Hoehe des Frames. */
  shots: ShowcaseShot[];
}

export const showcaseCases: ShowcaseCase[] = [
  {
    id: 'kfz-chaves',
    client: 'KFZ Chaves',
    meta: 'KFZ-Werkstatt · Webdesign & Entwicklung',
    url: 'https://kfz-chaves.de/',
    domain: 'kfz-chaves.de',
    shots: [
      { file: 'hero.png', alt: 'Startseite von kfz-chaves.de auf dem Smartphone', view: 'Start' },
      { file: 'werkstatt.png', alt: 'Abschnitt „Mehr als eine Werkstatt" auf kfz-chaves.de', view: 'Werkstatt' },
      { file: 'terminbuchung.png', alt: 'Terminbuchung in fünf Schritten auf kfz-chaves.de', view: 'Terminbuchung' },
    ],
  },
  /*
   * TODO_CONTENT: Weitere echte Referenzen folgen einzeln.
   * Pro Projekt braucht es: Kundenname, Branche · Leistung, Live-URL und
   * echte Screenshots unter src/assets/work/<id>/. Erst eintragen, wenn
   * die Bilder vorliegen – nichts erfinden, nichts vorwegnehmen.
   */
];

/**
 * Wie viele noch unbesetzte Plaetze im Abschnitt sichtbar bleiben.
 * Sie zeigen einen neutralen Slot ohne Projektbehauptung – also nie ein
 * erfundenes Projekt und nie eine Paketbezeichnung.
 *
 * Steht bewusst auf 0: eine echte Referenz neben leeren Flaechen wirkt
 * unfertig. Sobald mehrere Projekte vorliegen, kommen sie als Eintrag in
 * showcaseCases dazu – dieser Wert bleibt dann einfach 0.
 */
export const showcaseOpenSlots = 0;
