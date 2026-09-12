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

/**
 * FAQ speziell für die Website-Landingpage /webdesign-muenchen/.
 * Beantwortet die Einwände, die bei bezahltem Traffic wirklich kommen.
 * Preise werden über {{WEB_PREIS}} und {{WEB_MONAT}} aus
 * src/data/website-pricing.ts eingesetzt – nicht hier pflegen.
 */
export const websiteFaqs: FaqItem[] = [
  {
    q: 'Was kostet eine Website bei LAMOR?',
    a: 'Websites starten bei {{WEB_PREIS}} einmalig. Was dein Projekt konkret kostet, hängt vom Umfang ab – eine Onepage ist etwas anderes als ein Auftritt mit zehn Seiten. Nach einem kurzen Gespräch bekommst du einen festen Preis, bevor du dich entscheidest.',
    schema: true,
  },
  {
    q: 'Ist die monatliche Betreuung Pflicht?',
    a: 'Nein. Die Website-Erstellung ist ein einmaliges Projekt und gehört danach dir. Die Betreuung ab {{WEB_MONAT}} ist optional und deckt Hosting, technische Wartung, Backups, Monitoring und kleinere Textänderungen ab. Du kannst sie auch später dazunehmen.',
    schema: true,
  },
  {
    q: 'Bekomme ich ein Template?',
    a: 'Nein. Jede Website wird individuell auf deine Marke gestaltet – Layout, Typografie und Bildsprache entstehen für dein Unternehmen und nicht aus einem Baukasten.',
    schema: true,
  },
  {
    q: 'Wie lange dauert eine Website?',
    a: 'Eine Onepage ist in der Regel in wenigen Wochen live, größere Auftritte brauchen länger. Der häufigste Grund für Verzögerung sind fehlende Texte und Bilder – deshalb klären wir zu Beginn, was von dir kommt und was wir produzieren.',
    schema: true,
  },
  {
    q: 'Ich habe keine guten Fotos und Videos. Ist das ein Problem?',
    a: 'Im Gegenteil – das ist genau unser Fall. Wir sind zuerst eine Produktionsagentur: Fotos, Videos und Social-Assets entstehen bei uns im Haus und fließen direkt in die Website. Du musst dafür keinen zweiten Dienstleister suchen.',
    schema: true,
  },
  {
    q: 'Kann ich Inhalte später selbst ändern?',
    a: 'Kleinere Text- und Bildänderungen übernehmen wir im Rahmen der Betreuung. Wenn du Inhalte grundsätzlich selbst pflegen möchtest, sag das vor Projektstart – das beeinflusst die technische Umsetzung und halten wir im Angebot fest.',
    schema: true,
  },
  {
    q: 'Was passiert mit meiner bestehenden Domain?',
    a: 'Die behältst du. Wir richten die neue Website so ein, dass deine Domain darauf zeigt, und kümmern uns um die technische Umstellung zum Launch – inklusive Weiterleitungen der alten Adressen, damit nichts ins Leere läuft.',
    schema: true,
  },
  {
    q: 'Wird meine Website bei Google gefunden?',
    a: 'Die technischen Grundlagen sind enthalten: saubere Struktur, Ladezeit, Meta-Angaben, mobile Darstellung und Local-SEO-Basics. Ranking-Garantien geben wir nicht – seriös kann das niemand versprechen. Wenn Sichtbarkeit dein Hauptziel ist, planen wir das als eigenen Schritt.',
    schema: true,
  },
  {
    q: 'Arbeitet ihr nur in München?',
    a: 'Unser Studio sitzt in München und viele Kunden kommen aus der Region. Eine Website bauen wir aber ortsunabhängig – Abstimmung läuft per Call. Nur für Foto- und Videoproduktion kommen wir zu dir.',
    schema: true,
  },
];
