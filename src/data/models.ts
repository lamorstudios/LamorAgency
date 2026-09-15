/**
 * Models & Talents – der USP-Bereich.
 *
 * ES WIRD KEIN PROFIL ERFUNDEN. Hier stehen ausschliesslich Angaben, die vom
 * Auftraggeber kommen. Fehlt ein Foto, rendert die Seite die Medienflaeche als
 * klar gekennzeichneten Slot – das Profil bleibt trotzdem vollstaendig
 * (Name, Groesse, Kategorien, Anfrage).
 *
 * NEUES TALENT ERGAENZEN:
 *   1. Bilder unter src/assets/talents/<slug>/ ablegen
 *   2. hier einen Eintrag mit `published: true` anlegen
 *   3. `images` mit '/src/assets/talents/<slug>/<datei>.jpg' fuellen
 * Reihenfolge auf der Seite = Reihenfolge in diesem Array.
 */
export interface Talent {
  /** Kleingeschrieben, ohne Umlaute – dient als Anker und als Formularwert. */
  slug: string;
  name: string;
  /** Koerpergroesse in cm. Weglassen, wenn nicht freigegeben. */
  heightCm?: number;
  /** Einsatzbereiche – werden als Chips gezeigt, nicht als Liste. */
  categories: string[];
  /** Erste Datei ist das Hauptbild. Leer = Slot-Darstellung. */
  images?: string[];
  /** Nur echte, freigegebene Profile auf true setzen. */
  published?: boolean;
}

/** Buchbare Einsatzbereiche. */
export const talentCategories = [
  'Commercials',
  'Social Content',
  'UGC',
  'Musikvideos',
  'Fashion',
  'Fitness',
  'Beauty',
  'Lifestyle',
];

/** So läuft eine Buchung. */
export const bookingSteps = [
  { index: '01', title: 'Briefing', text: 'Du sagst uns, welche Kampagne ansteht, welcher Typ passt und wann gedreht wird.' },
  { index: '02', title: 'Auswahl', text: 'Wir schlagen passende Models und Talents aus unserem Pool vor.' },
  { index: '03', title: 'Booking', text: 'Termine, Konditionen und Nutzungsrechte klären wir für dich – in einem Vertrag.' },
  { index: '04', title: 'Produktion', text: 'Gedreht wird direkt mit unserem Team: Kamera, Licht, Regie und Schnitt inklusive.' },
];

/**
 * Freigegebene Profile.
 * TODO_CONTENT: Die weiteren Talents aus dem bestehenden Models-Bereich
 * ergänzen – Name, Größe und Kategorien liegen dort bereits vor.
 */
export const talents: Talent[] = [
  {
    slug: 'dominique',
    name: 'Dominique',
    heightCm: 173,
    categories: ['Ads & Commercials', 'Fashion & Beauty', 'Sport & Fitness', 'Musikvideos', 'UGC & Social Content'],
    images: [],
    published: true,
  },
];

export const publishedTalents = talents.filter((t) => t.published);
