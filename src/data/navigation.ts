export interface NavItem { label: string; href: string; index: string; desc?: string }

/** Hauptnavigation – Reihenfolge folgt der Conversion-Logik der Startseite. */
export const mainNav: NavItem[] = [
  { index: '01', label: 'Work', href: '/work/', desc: 'Ausgewählte Projekte' },
  { index: '02', label: 'Services', href: '/services/', desc: 'Video, Foto, Social, Web, Branding' },
  { index: '03', label: 'Agency', href: '/agency/', desc: 'Studio, Team, Haltung' },
  { index: '04', label: 'Pricing', href: '/pricing/', desc: 'Pakete & Einzelleistungen' },
  { index: '05', label: 'Models', href: '/models/', desc: 'Models & Talents' },
  { index: '06', label: 'Contact', href: '/contact/', desc: 'Projekt anfragen' },
];

/** Primärer CTA im Header und im Mobile-Overlay. */
export const navCta = { label: 'Start a Project', href: '/contact/' };

export const footerNav: NavItem[] = [
  ...mainNav,
  { index: '07', label: 'Blog', href: '/blog/' },
];

export const legalNav: NavItem[] = [
  { index: '', label: 'Impressum', href: '/impressum/' },
  { index: '', label: 'Datenschutz', href: '/datenschutz/' },
];
