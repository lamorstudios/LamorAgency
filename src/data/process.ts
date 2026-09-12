/**
 * Der LAMOR-Prozess – der eigentliche USP: alles läuft über ein Studio.
 * Strategie → Konzept → Model/Talent → Produktion → Foto → Video → Edit →
 * Design → Social Media → Website.
 */
export interface ProcessStep {
  index: string;
  title: string;
  text: string;
  /** Gruppierung für die visuelle Kette. */
  phase: 'Denken' | 'Produzieren' | 'Ausspielen';
}

export const processSteps: ProcessStep[] = [
  { index: '01', phase: 'Denken', title: 'Strategie', text: 'Wir klären, wofür die Marke steht, wer sie sehen soll und woran man sie erkennt.' },
  { index: '02', phase: 'Denken', title: 'Konzept', text: 'Look, Tonalität und Formate werden festgelegt, bevor die erste Kamera läuft.' },
  { index: '03', phase: 'Produzieren', title: 'Model & Talent', text: 'Passende Gesichter kommen direkt aus unserem eigenen Talent-Pool.' },
  { index: '04', phase: 'Produzieren', title: 'Produktion', text: 'Planung, Location, Licht, Team – ein Drehtag, an dem alles vorbereitet ist.' },
  { index: '05', phase: 'Produzieren', title: 'Foto', text: 'Bildstrecken für Website, Social und Print – aus demselben Setup.' },
  { index: '06', phase: 'Produzieren', title: 'Video', text: 'Vom Spot bis zum Reel: gedreht für das Format, in dem es später läuft.' },
  { index: '07', phase: 'Produzieren', title: 'Edit', text: 'Schnitt, Sounddesign und Color Grading geben dem Material die Handschrift.' },
  { index: '08', phase: 'Ausspielen', title: 'Design', text: 'Typografie, Artworks und Layouts halten alles im selben System zusammen.' },
  { index: '09', phase: 'Ausspielen', title: 'Social Media', text: 'Planung, Ausspielung und Betreuung der Kanäle – mit Blick auf die Zahlen.' },
  { index: '10', phase: 'Ausspielen', title: 'Website', text: 'Am Ende steht der Ort, an dem aus Aufmerksamkeit eine Anfrage wird.' },
];

/** Kurzform für die Kette im Hero-/Prozessbereich. */
export const processChain = processSteps.map((s) => s.title);
