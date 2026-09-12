/**
 * Zentrale Site-Daten. Alle Kontakt- und Markenangaben an einer Stelle.
 * HINWEIS: Adresse stammt aus öffentlichen Suchergebnissen zur bestehenden
 * Website – bitte vor Go-Live prüfen (TODO_VERIFY).
 */
export const site = {
  name: 'LAMOR AGENCY',
  shortName: 'LAMOR',
  legalName: 'LAMOR AGENCY', // TODO_VERIFY: Rechtsform lt. bestehendem Impressum
  url: 'https://www.lamoragency.de',

  /** Claim in Markenschreibweise (klein, ohne Satzzeichen). */
  claim: 'feel the brand not the ad',
  /** Claim als Aussage – für Headlines und Meta-Texte. */
  claimDisplay: 'Feel the brand. Not the ad.',
  claimLines: ['feel the brand', 'not the ad'],

  description:
    'LAMOR AGENCY ist ein Creative Studio aus München für Video, Fotografie, Social Media, Branding, Webdesign und Models – Markenauftritte, die gesehen, verstanden und erinnert werden.',
  locale: 'de_DE',
  lang: 'de',

  email: 'info@lamoragency.de',
  phone: '+49 178 5624699',
  phoneHref: 'tel:+491785624699',
  /** WhatsApp nutzt dieselbe Nummer in internationaler Schreibweise ohne Zeichen. */
  whatsapp: 'https://wa.me/491785624699',

  address: {
    street: 'Kunreuthstr. 53', // TODO_VERIFY: gegen bestehendes Impressum prüfen
    zip: '81249',
    city: 'München',
    region: 'Bayern',
    country: 'DE',
  },
  geoArea: 'München',
  foundingLocation: 'München',

  /** Reichweiten-Beleg, prominent im Hero. */
  reachClaim: 'Über 500 Mio. Aufrufe auf unsere Arbeit',

  ogImage: '/og-default.jpg',
} as const;

export const social = [
  { label: 'Instagram', href: 'https://www.instagram.com/lamoragency/', handle: '@lamoragency' },
  // Weitere Kanäle nur eintragen, wenn das Profil wirklich existiert:
  // { label: 'TikTok', href: 'https://www.tiktok.com/@…', handle: '@…' },
  // { label: 'LinkedIn', href: 'https://www.linkedin.com/company/…', handle: '' },
  // { label: 'YouTube', href: 'https://www.youtube.com/@…', handle: '' },
] as const;
