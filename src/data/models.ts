/**
 * Models & Talents – der USP-Bereich.
 * Es werden KEINE Models erfunden. `talents` bleibt leer, bis echte Profile
 * (Name, Foto, Kategorie) aus dem bestehenden Models-Bereich übernommen sind.
 * Die Seite funktioniert auch ohne Profile: sie erklärt dann das Angebot und
 * führt zur Anfrage.
 */
export interface Talent {
  name: string;
  categories: string[];
  image?: string;
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

/** TODO: echte Profile aus dem bestehenden Models-Bereich übernehmen. */
export const talents: Talent[] = [];

export const publishedTalents = talents.filter((t) => t.published);
