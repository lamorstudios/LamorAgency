/**
 * ============================================================================
 * RECHTLICHE PFLICHTANGABEN
 * ============================================================================
 *
 * Diese Datei ist die EINZIGE Stelle, an der die impressumspflichtigen
 * Unternehmensdaten stehen. Impressum und Datenschutzerklaerung lesen von
 * hier – dadurch gibt es keine zweite, veraltete Fassung.
 *
 * REGEL: Hier wird NICHTS geraten und NICHTS erfunden. Ein falscher
 * Vertretungsberechtigter, eine falsche Rechtsform oder eine falsche
 * Umsatzsteuer-ID im Impressum ist ein echtes rechtliches Risiko, kein
 * Schoenheitsfehler. Felder, die nicht belegt sind, bleiben leer – die
 * Seite kennzeichnet sie dann sichtbar als noch einzutragen.
 *
 * AUSFUELLEN: Werte aus dem bestehenden Impressum von lamoragency.de
 * uebernehmen (https://www.lamoragency.de/general-5-1) und hier eintragen.
 * Danach `npm run build:standalone` – die Markierungen verschwinden von
 * selbst, sobald ein Feld gefuellt ist.
 */

export interface LegalField {
  /** Wert aus dem bestehenden Impressum. Leer = noch nicht belegt. */
  value: string;
  /** Was genau gebraucht wird – erscheint als Hinweis, solange value leer ist. */
  hint: string;
}

const feld = (value: string, hint: string): LegalField => ({ value, hint });

export const legal = {
  /**
   * Vollstaendige Firmierung MIT Rechtsform, genau wie im Handelsregister
   * bzw. im bestehenden Impressum. Beispiele fuer die Schreibweise:
   * "LAMOR AGENCY GmbH", "Vorname Nachname – LAMOR AGENCY" (Einzelunternehmen).
   */
  firm: feld('', 'Firmierung mit Rechtsform'),

  /** Vertretungsberechtigt – Geschaeftsfuehrung oder Inhaber. */
  represented: feld('', 'Name der vertretungsberechtigten Person'),

  /** Umsatzsteuer-Identifikationsnummer nach § 27a UStG, Format DE123456789. */
  vatId: feld('', 'Umsatzsteuer-ID (oder Hinweis auf Kleinunternehmerregelung)'),

  /** Registergericht und Nummer. Nur bei eingetragenen Gesellschaften. */
  register: feld('', 'Registergericht und Registernummer – entfaellt bei Einzelunternehmen'),

  /**
   * Verantwortlich fuer journalistisch-redaktionelle Inhalte nach
   * § 18 Abs. 2 MStV. Meist dieselbe Person wie die Vertretung,
   * mit vollstaendiger Anschrift.
   */
  contentResponsible: feld('', 'Name und Anschrift der verantwortlichen Person'),

  /** Berufshaftpflicht o. Ae. – nur, wenn im bestehenden Impressum genannt. */
  insurance: feld('', 'Nur eintragen, wenn im bestehenden Impressum vorhanden'),
} as const;

/** true, sobald das Feld einen belegten Wert hat. */
export const hat = (f: LegalField) => f.value.trim().length > 0;

/** Alle noch offenen Pflichtfelder – fuer die Pruefung im Build. */
export const offeneLegalFelder = () =>
  Object.entries(legal)
    .filter(([, f]) => !hat(f as LegalField))
    .map(([k]) => k);

/** Stand der rechtlichen Texte. Bei inhaltlicher Aenderung mitziehen. */
export const legalUpdated = 'September 2026';
