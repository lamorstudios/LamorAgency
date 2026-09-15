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
  { index: '01', phase: 'Denken', title: 'Strategie', text: 'Positionierung und Zielgruppe' },
  { index: '02', phase: 'Denken', title: 'Konzept', text: 'Look, Tonalität, Formate' },
  { index: '03', phase: 'Produzieren', title: 'Model & Talent', text: 'Gesichter aus eigenem Pool' },
  { index: '04', phase: 'Produzieren', title: 'Produktion', text: 'Ein Drehtag, alles vorbereitet' },
  { index: '05', phase: 'Produzieren', title: 'Foto', text: 'Bildstrecken aus demselben Setup' },
  { index: '06', phase: 'Produzieren', title: 'Video', text: 'Gedreht fürs jeweilige Format' },
  { index: '07', phase: 'Produzieren', title: 'Edit', text: 'Schnitt, Sound, Color Grading' },
  { index: '08', phase: 'Ausspielen', title: 'Design', text: 'Typografie, Artworks, Layouts' },
  { index: '09', phase: 'Ausspielen', title: 'Social Media', text: 'Planung, Ausspielung, Zahlen' },
  { index: '10', phase: 'Ausspielen', title: 'Website', text: 'Der Ort für die Anfrage' },
];

/** Kurzform für die Kette im Hero-/Prozessbereich. */
export const processChain = processSteps.map((s) => s.title);
