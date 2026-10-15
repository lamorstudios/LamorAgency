/**
 * Kunden & Referenzen.
 * Namen stammen aus der bestehenden LAMOR-Website – es werden keine Marken erfunden.
 *
 * Logo ergänzen:
 *   1. monochromes SVG (bevorzugt) oder PNG nach /src/assets/brand/clients/ legen
 *   2. hier `logo: '/src/assets/brand/clients/<datei>.svg'` eintragen
 * Ohne `logo` wird der Markenname typografisch gesetzt – das ist bewusst als
 * hochwertiger Zwischenstand gestaltet und kein kaputter Zustand.
 */
export interface Client {
  name: string;
  /** Pfad in /src/assets/brand/clients/ – optional, solange kein Logo vorliegt. */
  logo?: string;
  /** Branche/Kontext, erscheint als feine Auszeichnung im Grid. */
  note?: string;
  href?: string;
}

export const clients: Client[] = [
  { name: 'Universal Music', note: 'Music' },
  { name: 'Sony Music', note: 'Music' },
  { name: 'Tipico', note: 'Entertainment' },
  { name: 'ZAM München', note: 'Gastro / Food Hall' },
  { name: 'Pitsburger', note: 'Gastro' },
  { name: 'Rap La Rue', note: 'Music / Media' },
  { name: 'Oscar Karem', note: 'Artist' },
  { name: 'Ardell', note: 'Beauty' },
  { name: 'Atlas Connect', note: 'Business' },
  { name: 'IRO Centre', note: 'Health' },
  { name: 'WSP Soft', note: 'Software' },
  { name: 'Netshake', note: 'Digital' },
  { name: 'BÄM Business', note: 'Business' },
  { name: 'Profi Automation', note: 'Industrie' },
  { name: 'Sonnenklar Solar', note: 'Energie' },
];
