export interface NavItem { label: string; href: string; index: string; desc?: string }

/**
 * Hauptnavigation.
 *
 * FUENF PUNKTE, DEUTSCH. Vorher waren es sechs mit englischen Labels auf
 * einer durchgehend deutschen Seite – "Work / Services / Agency / Pricing"
 * las sich wie eine Vorlage, nicht wie diese Agentur. Preise sind jetzt im
 * Footer: Die Leistungen werden einzeln kalkuliert, eine eigene Preisseite
 * im Hauptmenue bremst den Weg zur Anfrage mehr, als sie hilft. Die Seite
 * selbst bleibt erreichbar und unveraendert.
 */
export const mainNav: NavItem[] = [
  { index: '01', label: 'Arbeiten', href: '/work/', desc: 'Ausgewählte Projekte' },
  { index: '02', label: 'Leistungen', href: '/services/', desc: 'Film, Motion, Branding, Web' },
  { index: '03', label: 'Agentur', href: '/agency/', desc: 'Studio, Team, Haltung' },
  { index: '04', label: 'Models', href: '/models/', desc: 'Models & Talents' },
  { index: '05', label: 'Kontakt', href: '/contact/', desc: 'Projekt anfragen' },
];

/** Primärer CTA im Header und im Mobile-Overlay. */
export const navCta = { label: 'Projekt anfragen', href: '/contact/' };

export const footerNav: NavItem[] = [
  ...mainNav,
  { index: '06', label: 'Preise', href: '/pricing/' },
  { index: '07', label: 'Webdesign', href: '/webdesign-muenchen/' },
  { index: '08', label: 'Blog', href: '/blog/' },
];

export const legalNav: NavItem[] = [
  { index: '', label: 'Impressum', href: '/impressum/' },
  { index: '', label: 'Datenschutz', href: '/datenschutz/' },
];
