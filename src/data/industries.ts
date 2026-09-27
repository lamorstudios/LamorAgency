/**
 * Branchen, für die LAMOR produziert. Erscheint als horizontaler Slider
 * ("WHO WE CREATE FOR"). Reihenfolge = Reihenfolge auf der Seite.
 */
export interface Industry {
  label: string;
  /** Deutsche Klarstellung unter dem Label. */
  title: string;
  /** Was LAMOR für diese Branche typischerweise macht. */
  text: string;
}

export const industries: Industry[] = [
  { label: 'Gastro', title: 'Gastronomie', text: 'Food-Content, der Appetit macht – Reels, Foto und Auftritt für Restaurants, Bars und Food Halls.' },
  { label: 'Real Estate', title: 'Immobilien', text: 'Objektfilme und Fotostrecken, die eine Immobilie verkaufen, bevor jemand die Tür öffnet.' },
  { label: 'Music', title: 'Musik & Label', text: 'Musikvideos, Cover-Artworks und Kampagnen für Artists, Labels und Releases.' },
  { label: 'Fitness', title: 'Fitness & Sport', text: 'Studio-Content, Trainer-Branding und Shortform, das Mitglieder bringt.' },
  { label: 'Beauty', title: 'Beauty & Care', text: 'Produktfotografie, UGC und Kampagnen-Content für Beauty-Marken.' },
  { label: 'Events', title: 'Events', text: 'Aftermovies, Recaps und Livecontent – vom Clubabend bis zur Firmenfeier.' },
  { label: 'Startups', title: 'Startups', text: 'Erster Markenauftritt, Website und Content-Basis – alles in einem Look.' },
  { label: 'Local', title: 'Lokale Unternehmen', text: 'Sichtbarkeit in München und Umgebung – Website, Social und Bildwelt.' },
  { label: 'Creators', title: 'Creator & Talents', text: 'Personal Branding, Shortform-Produktion und ein Auftritt, der trägt.' },
];
