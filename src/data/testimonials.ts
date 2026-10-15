/**
 * Kundenstimmen.
 *
 * REGEL: Hier stehen ausschließlich ECHTE Stimmen echter Kunden.
 * Es wird nichts erfunden und nichts sinngemäß "nachgebaut".
 *
 * `verified: false` bedeutet: Person und Funktion sind belegt, der Wortlaut
 * des Zitats liegt hier noch nicht im Original vor. Solche Einträge werden
 * auf der Website NICHT ausgespielt (siehe `publishedTestimonials`), sondern
 * warten darauf, dass der Originaltext von der bestehenden Seite eingesetzt
 * und `verified` auf true gestellt wird.
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** true = Wortlaut liegt im Original vor und darf veröffentlicht werden. */
  verified: boolean;
  /** Optionales Portrait: '/src/assets/about/<datei>.jpg' */
  image?: string;
  /** Verknüpftes Projekt (Slug aus src/content/projects/). */
  project?: string;
}

export const testimonials: Testimonial[] = [
  {
    /**
     * Wortlaut im Original von der bestehenden Website lamoragency.de
     * uebernommen (Stand Oktober 2026). Inhaltlich unveraendert; lediglich
     * zwei Leerzeichen vor Kommata wurden entfernt, die dort offensichtlich
     * Tippfehler sind. Keine Glaettung, keine Kuerzung, keine Umformulierung.
     */
    quote:
      'Ich muss sagen, es wird in allen Richtungen abgeliefert. Sei es Grafiken, '
      + 'Print Medien oder Strategy Planung, es wird einem immer geholfen. Habe bis '
      + 'jetzt nur positive Erfahrungen gemacht und wir haben mit Lamor Agency schon '
      + 'viele Lösungen für verschiedenste Probleme gefunden.',
    name: 'Georg Tengelidis',
    role: 'CEO',
    company: "Pit's Burger München",
    verified: true,
  },
];

/** Nur belegte Zitate gehen live. */
export const publishedTestimonials = testimonials.filter((t) => t.verified && t.quote.trim().length > 0);
