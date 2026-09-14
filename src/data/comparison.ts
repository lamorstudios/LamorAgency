/**
 * Problem → Lösung als direkte Gegenüberstellung.
 *
 * Aufbau: jede Zeile ist ein PAAR. Links der Ist-Zustand, rechts das
 * Gegenstück – gleiche Reihenfolge, gleiche Höhe, damit der Vergleich auch
 * auf dem Telefon nebeneinander lesbar bleibt.
 *
 * `short` ist die Fassung für schmale Displays: dieselbe Aussage in zwei bis
 * drei Wörtern. Nicht zusätzlicher Text, sondern derselbe Inhalt kürzer.
 */
export interface ComparePair {
  /** Icon-Name aus components/Icon.astro */
  iconBad: string;
  iconGood: string;
  bad: string;
  badShort: string;
  good: string;
  goodShort: string;
  /** Ein Wort, das den Gewinn benennt – steht als Pill in der dunklen Card. */
  gain: string;
}

export const comparison = {
  headline: 'Aus einzelnen Maßnahmen wird',
  headlineAccent: 'eine Marke.',
  lead: 'Viele Unternehmen produzieren nicht zu wenig. Sie produzieren zu viel Verschiedenes.',
  badLabel: 'Ohne klare Brand',
  goodLabel: 'Mit LAMOR AGENCY',
  badClosing: 'Viel Aufwand. Wenig Wirkung.',
  goodClosing: 'Weniger Abstimmung. Mehr Wirkung.',
  pairs: [
    {
      iconBad: 'image', iconGood: 'cube',
      bad: 'Content wirkt jedes Mal anders', badShort: 'Uneinheitlich',
      good: 'Einheitlicher visueller Auftritt', goodShort: 'Einheitlich',
      gain: 'Konsistent',
    },
    {
      iconBad: 'unlink', iconGood: 'bolt',
      bad: 'Website & Socials wirken getrennt', badShort: 'Getrennt',
      good: 'Content, Website & Social aus einer Hand', goodShort: 'Aus einer Hand',
      gain: 'Effizient',
    },
    {
      iconBad: 'head', iconGood: 'heart',
      bad: 'Die Marke bleibt nicht im Kopf', badShort: 'Vergessen',
      good: 'Wiedererkennbare Marke', goodShort: 'Wiedererkennbar',
      gain: 'Stark',
    },
    {
      iconBad: 'bars', iconGood: 'trend',
      bad: 'Gute Leistung wirkt online durchschnittlich', badShort: 'Mittelmaß',
      good: 'Hochwertiger Auftritt auf allen Kanälen', goodShort: 'Hochwertig',
      gain: 'Mehr Anfragen',
    },
  ] satisfies ComparePair[],
} as const;

/**
 * Warum LAMOR – der Strukturvergleich.
 *
 * REGEL: Die linke Spalte beschreibt nur, wie ein Projekt ueblicherweise
 * ORGANISIERT ist ("mehrere", "je Gewerk", "getrennt"). Nie eine Zahl, nie
 * Preis oder Qualitaet Dritter – das waere nicht belegbar. Die Zahl steht
 * rechts, denn "1" ist eine Tatsache ueber LAMOR.
 */
export interface StructureRow {
  topic: string;
  usual: string;
  value: string;
  lamor: string;
}

export const structure = {
  eyebrow: 'Warum LAMOR',
  headline: 'Ein Studio statt',
  headlineAccent: 'fünf Schnittstellen.',
  usualLabel: 'Einzeln organisiert',
  lamorLabel: 'Bei LAMOR',
  rows: [
    { topic: 'Ansprache', usual: 'Mehrere Ansprechpartner', value: '1', lamor: 'Ansprechpartner' },
    { topic: 'Briefing', usual: 'Briefing je Gewerk', value: '1', lamor: 'Briefing für alles' },
    { topic: 'Look', usual: 'Getrennt entwickelt', value: '1', lamor: 'System über alle Kanäle' },
    { topic: 'Ablauf', usual: 'Abstimmung zwischen Dienstleistern', value: '0', lamor: 'Übergaben dazwischen' },
  ] satisfies StructureRow[],
} as const;
