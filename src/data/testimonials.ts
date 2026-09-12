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
    // TODO_QUOTE: Originalwortlaut von der bestehenden Website einsetzen,
    // danach verified auf true setzen. Bis dahin wird dieser Eintrag
    // bewusst nicht ausgespielt.
    quote: '',
    name: 'Georg Tengelidis',
    role: 'CEO',
    company: 'Pitsburger München',
    verified: false,
  },
];

/** Nur belegte Zitate gehen live. */
export const publishedTestimonials = testimonials.filter((t) => t.verified && t.quote.trim().length > 0);
