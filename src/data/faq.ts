/**
 * FAQ. Antworten kurz, konkret und ehrlich – keine Garantien, keine
 * Versprechen zu Ergebnissen. Preise werden NICHT hier gepflegt, sondern
 * kommen aus src/data/pricing.ts (siehe Platzhalter {{PREIS_START}} unten).
 */
export interface FaqItem {
  q: string;
  a: string;
  /** In den strukturierten Daten (FAQPage) ausgeben. */
  schema?: boolean;
}

export const faqs: FaqItem[] = [
  {
    q: 'Was kostet eine Zusammenarbeit mit LAMOR?',
    a: 'Unsere Pakete starten bei {{PREIS_START}} – dazu kommt ein einmaliger Projektstart. Was genau sinnvoll ist, hängt vom Umfang ab: eine Landingpage ist etwas anderes als ein laufendes Content-System. Im Erstgespräch sagen wir dir konkret, was dein Projekt kostet, bevor irgendetwas beauftragt wird.',
    schema: true,
  },
  {
    q: 'Kann ich auch nur ein einzelnes Video buchen?',
    a: 'Ja. Nicht jedes Projekt braucht einen Retainer. Einzelne Videos, Shootings, Websites oder Kampagnen kannst du jederzeit als einmaliges Projekt anfragen.',
    schema: true,
  },
  {
    q: 'Übernehmt ihr komplette Social-Media-Betreuung?',
    a: 'Ja. Von Strategie und Content-Produktion über Planung und Ausspielung bis zur laufenden Optimierung. Du kannst auch nur Teile davon buchen – zum Beispiel nur die Produktion, wenn ihr selbst postet.',
    schema: true,
  },
  {
    q: 'Produziert ihr deutschlandweit?',
    a: 'Unser Studio sitzt in München und der Großteil der Projekte entsteht hier. Für Drehs außerhalb kommen wir dorthin, wo das Projekt stattfindet – Anfahrt und Aufwand klären wir vorher transparent im Angebot.',
    schema: true,
  },
  {
    q: 'Kann LAMOR Models für meine Kampagne organisieren?',
    a: 'Ja. Wir haben einen eigenen Models- und Talent-Bereich. Du brauchst keine zweite Agentur: Casting, Booking und Produktion laufen über uns – für Commercials, Social Content, UGC, Musikvideos, Fashion, Fitness, Beauty und Lifestyle.',
    schema: true,
  },
  {
    q: 'Wie lange dauert eine Website?',
    a: 'Eine kompakte Landingpage ist in der Regel in wenigen Wochen live, eine vollständige Website braucht länger – vor allem, weil Texte, Bilder und Videos dazugehören. Den konkreten Zeitplan bekommst du zu Projektbeginn.',
    schema: true,
  },
  {
    q: 'Arbeitet ihr auch mit kleinen Unternehmen?',
    a: 'Ja. Ein Großteil unserer Arbeit entsteht mit lokalen Unternehmen, Selbstständigen und Startups. Entscheidend ist nicht die Größe, sondern ob die Zusammenarbeit für beide Seiten Sinn ergibt.',
    schema: true,
  },
  {
    q: 'Wie läuft ein Projekt ab?',
    a: 'Erstgespräch, Konzept, Produktion, Umsetzung, Übergabe. Du hast einen festen Ansprechpartner, weißt vorher, was passiert, und siehst Zwischenstände, bevor etwas final ist.',
    schema: true,
  },
  {
    q: 'Kann ich Foto, Video und Social Media kombinieren?',
    a: 'Genau dafür sind wir gebaut. Ein Drehtag liefert Material für Reels, Website, Print und Ads gleichzeitig – in einem Look, statt aus drei verschiedenen Quellen.',
    schema: true,
  },
];
