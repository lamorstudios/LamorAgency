/**
 * Zentrale Site-Daten. Alle Kontakt- und Markenangaben an einer Stelle.
 * HINWEIS: Adresse und Telefonnummer stammen aus öffentlichen Suchergebnissen
 * zur bestehenden Website – bitte vor Go-Live prüfen (TODO_VERIFY).
 */
export const site = {
  name: 'LAMOR AGENCY',
  shortName: 'LAMOR',
  legalName: 'LAMOR AGENCY', // TODO_VERIFY: Rechtsform lt. Impressum
  url: 'https://www.lamoragency.de',
  claim: 'Feel the brand, not the ad.',
  claimLines: ['Feel the brand,', 'not the ad.'],
  description:
    'LAMOR AGENCY – Creative Studio aus München für Social Media, Content Creation, Film, Fotografie, Branding, Grafikdesign und Webdesign.',
  locale: 'de_DE',
  lang: 'de',
  email: 'info@lamoragency.de', // TODO_VERIFY
  phone: '+49 178 5624699', // TODO_VERIFY
  phoneHref: 'tel:+491785624699',
  address: {
    street: 'Kunreuthstr. 53', // TODO_VERIFY
    zip: '81249',
    city: 'München',
    region: 'Bayern',
    country: 'DE',
  },
  geoArea: 'München',
  foundingLocation: 'München',
  ogImage: '/og-default.jpg',
} as const;

export const social = [
  { label: 'Instagram', href: 'https://www.instagram.com/lamoragency/', handle: '@lamoragency' },
  // Weitere Kanäle bei Bedarf ergänzen (nur existierende Profile eintragen):
  // { label: 'TikTok', href: 'https://www.tiktok.com/@…', handle: '@…' },
  // { label: 'LinkedIn', href: 'https://www.linkedin.com/company/…', handle: '' },
  // { label: 'YouTube', href: 'https://www.youtube.com/@…', handle: '' },
] as const;
