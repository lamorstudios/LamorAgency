/**
 * Problem → Lösung. Der Vorher/Nachher-Block.
 * Bewusst kurz gehalten: der Kontrast trägt, nicht die Textmenge.
 */
export const comparison = {
  headline: 'Aus einzelnen Maßnahmen wird eine Marke.',
  lead: 'Die meisten Unternehmen produzieren nicht zu wenig. Sie produzieren zu viel Verschiedenes.',
  before: {
    label: 'Ohne klare Brand',
    items: [
      'Content sieht jedes Mal anders aus',
      'Website, Socials und Werbung wirken getrennt',
      'Die Marke bleibt nicht im Kopf',
      'Hochwertige Leistung wirkt online durchschnittlich',
    ],
  },
  after: {
    label: 'Mit LAMOR',
    items: [
      'Ein durchgängiger visueller Auftritt',
      'Professioneller Content statt Zufallsbilder',
      'Konsistentes Branding über alle Kanäle',
      'Website und Social Media greifen ineinander',
      'Bessere Wahrnehmung und Wiedererkennung',
    ],
  },
} as const;
