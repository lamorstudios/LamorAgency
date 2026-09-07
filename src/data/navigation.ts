export interface NavItem { label: string; href: string; index: string }

export const mainNav: NavItem[] = [
  { index: '01', label: 'Work', href: '/work/' },
  { index: '02', label: 'About', href: '/about/' },
  { index: '03', label: 'Services', href: '/services/' },
  { index: '04', label: 'Blog', href: '/blog/' },
  { index: '05', label: 'Contact', href: '/contact/' },
];

export const legalNav: NavItem[] = [
  { index: '', label: 'Impressum', href: '/impressum/' },
  { index: '', label: 'Datenschutz', href: '/datenschutz/' },
];
