/**
 * Kundenlogos. Bestehende Logos später als SVG/PNG nach /src/assets/brand/clients/ legen
 * und hier eintragen ({ name, logo: '/src/assets/brand/clients/name.svg' }).
 * Bis dahin: klar erkennbare Placeholder.
 */
export interface Client { name: string; logo?: string; href?: string }

export const clients: Client[] = Array.from({ length: 8 }, (_, i) => ({
  name: `Client ${String(i + 1).padStart(2, "0")}`, // PLACEHOLDER – echtes Logo + Name eintragen
}));
