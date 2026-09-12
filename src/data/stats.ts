/**
 * LAMOR in Zahlen. Werte der bestehenden Website.
 * `value` ist die Zahl für die Count-up-Animation, `suffix`/`prefix` das Drumherum.
 */
export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Erklärender Halbsatz unter dem Label. */
  note?: string;
  /** Zahl mit Tausenderpunkt ausgeben. */
  grouped?: boolean;
}

export const stats: Stat[] = [
  { value: 500, suffix: '+ Mio.', label: 'Aufrufe', note: 'auf Arbeiten aus unserem Studio' },
  { value: 1000, suffix: '+', label: 'Projekte', note: 'seit dem ersten Dreh', grouped: true },
  { value: 400, suffix: '+', label: 'Künstler & Unternehmen', note: 'von Gastro bis Major Label' },
  { value: 11, suffix: '+', label: 'Jahre Erfahrung', note: 'hinter der Kamera und am Schnittplatz' },
  { value: 95, suffix: ' %', label: 'Kundenzufriedenheit', note: 'die meisten bleiben länger' },
];
