/**
 * ============================================================================
 * LAMOR AGENCY – ZENTRALE PREIS-KONFIGURATION
 * ----------------------------------------------------------------------------
 * ALLE Preise der Website kommen aus dieser Datei. Preise werden nirgendwo
 * sonst im Code geschrieben – eine Änderung hier wirkt auf Startseite,
 * /pricing/ und die strukturierten Daten (Schema.org) zugleich.
 *
 * Ändern:
 *   monthly.amount  → monatlicher Betrag  (Zahl in Euro, netto)
 *   setup.amount    → einmaliger Projektstart (Zahl in Euro, netto)
 *   Preis unverbindlich/auf Anfrage: amount auf `null` setzen.
 *
 * WICHTIG: Alle Beträge sind NETTO zzgl. gesetzlicher USt. Der Hinweis dazu
 * steht in `priceNote` und wird automatisch mit ausgegeben.
 * ============================================================================
 */

export interface PriceValue {
  /** Betrag in Euro (netto). `null` = auf Anfrage. */
  amount: number | null;
  /** "ab" vor dem Betrag anzeigen. */
  from?: boolean;
  /** Zeiteinheit, z. B. 'Monat'. Leer = Einmalbetrag. */
  per?: string;
  /** Erklärender Zusatz unter dem Betrag. */
  note?: string;
}

export interface Package {
  id: string;
  name: string;
  /** Kurze englische Auszeichnung über dem Namen. */
  label: string;
  /** Für wen das Paket gedacht ist – ein Satz. */
  for: string;
  monthly: PriceValue;
  setup: PriceValue;
  features: string[];
  /** Als Hauptempfehlung hervorheben. */
  featured?: boolean;
  cta: { label: string; href: string };
}

/** Währung und Hinweis – zentral, damit Formatierung überall gleich ist. */
export const currency = 'EUR';
export const locale = 'de-DE';
export const priceNote = 'Alle Preise netto zzgl. gesetzlicher Umsatzsteuer.';

export const packages: Package[] = [
  {
    id: 'start',
    name: 'LAMOR START',
    label: 'Grundauftritt',
    for: 'Für Unternehmen, die einen hochwertigen digitalen Grundauftritt brauchen.',
    monthly: { amount: 495, from: true, per: 'Monat' },
    setup: { amount: 1950, from: true, note: 'einmaliger Projektstart' },
    features: [
      'Strategie Kickoff',
      'Landingpage / kompakte Website',
      'Branding-Check',
      'Klarer Anfrageweg',
      'Responsive Umsetzung',
      'Basis Tracking',
      'Technische Betreuung',
    ],
    cta: { label: 'Projekt anfragen', href: '/contact/?paket=start' },
  },
  {
    id: 'growth',
    name: 'LAMOR GROWTH',
    label: 'Meistgewählt',
    for: 'Für Marken, die Website, Content und Auftritt zusammen denken wollen.',
    monthly: { amount: 790, from: true, per: 'Monat' },
    setup: { amount: 4750, from: true, note: 'einmaliger Projektstart' },
    features: [
      'Komplette Website',
      'Brand Direction',
      'Content Strategie',
      'Foto- / Video-Konzept',
      'Social Media Struktur',
      'Conversion-Struktur',
      'Laufende Optimierung',
      'Strategie & Beratung',
    ],
    featured: true,
    cta: { label: 'Projekt anfragen', href: '/contact/?paket=growth' },
  },
  {
    id: 'content-system',
    name: 'CONTENT SYSTEM',
    label: 'Laufender Content',
    for: 'Für alle, die dauerhaft professionellen Content brauchen – Monat für Monat.',
    monthly: { amount: 690, from: true, per: 'Monat' },
    setup: { amount: 495, from: true, note: 'einmaliger Projektstart' },
    features: [
      'Monatliche Content-Produktion',
      'Reels / Shortform',
      'Professionelle Fotos',
      'Creative Direction',
      'Social-Media-Strategie',
      'Content Planning',
      'Reporting / Optimierung',
    ],
    cta: { label: 'Projekt anfragen', href: '/contact/?paket=content-system' },
  },
];

/**
 * Einzelleistungen ohne Retainer.
 * Bewusst OHNE Preise: es liegen keine belastbaren Einzelpreise vor.
 * Sobald echte Preise feststehen, hier `price: { amount: …, from: true }`
 * ergänzen – die Darstellung schaltet automatisch um.
 */
export interface SingleService {
  name: string;
  note: string;
  price?: PriceValue;
}

export const singleServices: SingleService[] = [
  { name: 'Videoproduktion', note: 'Spot, Imagefilm, Social Cut' },
  { name: 'Fotoproduktion', note: 'Produkt, Brand, Portrait' },
  { name: 'Website', note: 'Landingpage oder komplette Seite' },
  { name: 'Branding', note: 'Logo, Identity, Artwork' },
  { name: 'Social Kampagne', note: 'Konzept, Creatives, Rollout' },
  { name: 'Musikvideo', note: 'Konzept, Dreh, Postproduktion' },
  { name: 'Event', note: 'Aftermovie, Recap, Livecontent' },
  { name: 'Hochzeit', note: 'Film und Fotografie' },
  { name: 'Real Estate', note: 'Objektfilm und Fotostrecke' },
];

/** Preis-Formatierung – eine Stelle, überall gleich. */
export const formatPrice = (v: PriceValue): string => {
  if (v.amount === null) return 'Auf Anfrage';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(v.amount);
};

/** Vollständige Preiszeile inkl. "ab" und Einheit, z. B. "ab 495 € / Monat". */
export const priceLine = (v: PriceValue): string => {
  const base = `${v.from && v.amount !== null ? 'ab ' : ''}${formatPrice(v)}`;
  return v.per ? `${base} / ${v.per}` : base;
};
