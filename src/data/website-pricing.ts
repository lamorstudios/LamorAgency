/**
 * ============================================================================
 * LAMOR – WEBSITE-PRODUKT: ZENTRALE PREIS- UND INHALTSKONFIGURATION
 * ----------------------------------------------------------------------------
 * Grundlage der Landingpage /webdesign-muenchen/ und des Website-Teasers auf
 * der Startseite. Preise stehen NUR hier – eine Änderung wirkt überall.
 *
 * Preislogik (wichtig für die Darstellung):
 *   price        = EINMALIGE Erstellungskosten. Das ist die eigentliche Website.
 *   monthlyPrice = OPTIONALE Betreuung (Hosting, Wartung, Backups, Monitoring).
 *                  Der monatliche Betrag finanziert NICHT die Website.
 *                  `null` = keine Standard-Betreuung ausgewiesen.
 *
 * Alle Beträge netto zzgl. gesetzlicher Umsatzsteuer.
 * ============================================================================
 */

export interface MonthlyRange {
  /** Untergrenze in Euro (netto). */
  min: number;
  /** Obergrenze in Euro (netto). Gleich `min`, wenn es keine Spanne gibt. */
  max: number;
}


/**
 * Betreuungsstufen.
 * Die EINZIGE Quelle für monatliche Preise. Die Spannen an den Paketen
 * (`monthlyPrice`) werden daraus berechnet – nichts doppelt pflegen.
 *
 * Leistungsumfang bewusst nah an dem, was zugesagt ist: Hosting, technische
 * Wartung, Backups, Monitoring, kleinere Änderungen. Höhere Stufen ergänzen,
 * sie ersetzen nichts.
 */
export type CareId = 'none' | 'basic' | 'business' | 'premium';

export interface CarePlan {
  id: CareId;
  name: string;
  /** Preis pro Monat in Euro (netto). 0 = keine Betreuung. */
  price: number;
  note: string;
  includes: string[];
}

export const carePlans: CarePlan[] = [
  {
    id: 'none',
    name: 'Keine',
    price: 0,
    note: 'Du kümmerst dich selbst um Hosting und Pflege.',
    includes: ['Website gehört dir', 'Jederzeit später dazubuchbar'],
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 39,
    note: 'Die Seite bleibt online, aktuell und gesichert.',
    includes: ['Hosting', 'Backups', 'Monitoring', 'Technische Wartung'],
  },
  {
    id: 'business',
    name: 'Business',
    price: 69,
    note: 'Dazu kleinere Änderungen, ohne dass du nachfragen musst.',
    includes: ['Alles aus Basic', 'Kleinere Textänderungen', 'SSL & Updates', 'Ansprechpartner per Mail'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 119,
    note: 'Für Seiten, die laufend mitwachsen sollen.',
    includes: ['Alles aus Business', 'Laufende Optimierung', 'Monatliche Inhaltspflege', 'Priorisierte Bearbeitung'],
  },
];

export const getCarePlan = (id: CareId) => carePlans.find((c) => c.id === id) ?? carePlans[0];

/** Monatsspanne aus den Stufen ableiten, die zu einem Paket passen. */
const rangeFromTiers = (tiers: CareId[]): MonthlyRange | null => {
  const prices = tiers.map((t) => getCarePlan(t).price).filter((n) => n > 0);
  if (!prices.length) return null;
  return { min: Math.min(...prices), max: Math.max(...prices) };
};

export interface WebsitePackage {
  id: string;
  name: string;
  /** Kurze Auszeichnung über dem Namen. */
  label: string;
  /** Einmalige Erstellungskosten in Euro (netto). `null` = nach Aufwand. */
  price: number | null;
  /** "ab" vor dem Preis anzeigen. */
  priceFrom: boolean;
  /** Zusatz, wenn kein fester Preis genannt wird. */
  priceNote?: string;
  /** Betreuungsstufen, die zu diesem Paket passen (Quelle der Monatspreise). */
  careTiers: CareId[];
  /** Abgeleitet aus `careTiers` – nicht von Hand pflegen. */
  monthlyPrice: MonthlyRange | null;
  /** Ein Satz: worum es in diesem Paket geht. */
  description: string;
  /** Für wen das Paket gedacht ist. */
  for: string[];
  features: string[];
  /** Als Empfehlung hervorheben – genau ein Paket auf true setzen. */
  highlighted: boolean;
  cta: { label: string; href: string };
}

type RawPackage = Omit<WebsitePackage, 'monthlyPrice'>;

const rawPackages: RawPackage[] = [
  {
    id: 'onepage',
    name: 'LAMOR ONEPAGE',
    label: 'Landing Page',
    price: 1490,
    priceFrom: true,
    careTiers: ['basic', 'business'],
    description: 'Eine starke Seite, die alles Wichtige zeigt und zur Anfrage führt.',
    for: ['Selbstständige', 'Restaurants', 'Lokale Unternehmen', 'Dienstleister', 'Einzelne Angebote', 'Kampagnen / Meta Ads'],
    features: [
      'Individuelle Onepage',
      'Modernes Responsive Design',
      'Hero-Bereich',
      'Leistungen',
      'Über-uns-Bereich',
      'Referenzen',
      'Kontaktbereich',
      'Anfrageformular',
      'WhatsApp / Telefon CTA',
      'Mobile Optimierung',
      'Basis SEO',
      'Meta Title & Description',
      'DSGVO-Basisintegration',
      'Impressum / Datenschutz eingebunden',
      'Performance Optimierung',
      'Deployment',
    ],
    highlighted: false,
    cta: { label: 'Onepage anfragen', href: '/webdesign-muenchen/#anfrage' },
  },
  {
    id: 'business',
    name: 'LAMOR BUSINESS',
    label: 'Meistgewählt',
    price: 2490,
    priceFrom: true,
    careTiers: ['basic', 'business', 'premium'],
    description: 'Der vollständige Auftritt für kleinere und mittlere Unternehmen.',
    for: ['Kleine und mittlere Unternehmen', 'Mehrere Leistungen', 'Lokale Sichtbarkeit'],
    features: [
      'Bis ca. 5 Seiten',
      'Startseite',
      'Leistungen',
      'Über uns',
      'Referenzen / Projekte',
      'Kontakt',
      'Individuelles UX/UI Design',
      'Vollständig responsive',
      'Anfrageformulare',
      'WhatsApp / Telefon Integration',
      'Basis SEO',
      'Local SEO Grundlagen',
      'Google Maps Integration',
      'Analytics / Tracking vorbereitet',
      'Performance Optimierung',
      'Rechtliche Seiten eingebunden',
      'Deployment und technische Einrichtung',
    ],
    highlighted: true,
    cta: { label: 'Business anfragen', href: '/webdesign-muenchen/#anfrage' },
  },
  {
    id: 'premium',
    name: 'LAMOR PREMIUM',
    label: 'Markenauftritt',
    price: 3990,
    priceFrom: true,
    careTiers: ['business', 'premium'],
    description: 'Für Unternehmen, die digital deutlich stärker auftreten wollen.',
    for: ['Wachsende Unternehmen', 'Marken mit Anspruch', 'Mehr Inhalte und Struktur'],
    features: [
      'Individuelle Website, ca. 5–10 Seiten',
      'Creative-Direction-Konzept',
      'Hochwertiges UX/UI Design',
      'Motion Design',
      'Scroll-Animationen',
      'Hochwertige Interaktionen',
      'Conversion-Optimierung',
      'Referenz- / Portfolio-System',
      'Umfangreichere Kontakt- und Lead-Struktur',
      'Blog oder News-Bereich möglich',
      'SEO-Struktur',
      'Technische Onpage-Optimierung',
      'Tracking Integration',
      'Responsive Design',
      'Performance Optimierung',
      'Individuelle Animationen',
      'Deployment',
    ],
    highlighted: false,
    cta: { label: 'Premium anfragen', href: '/webdesign-muenchen/#anfrage' },
  },
  {
    id: 'custom',
    name: 'CUSTOM DIGITAL EXPERIENCE',
    label: 'Individual / High-End',
    price: 5900,
    priceFrom: true,
    priceNote: 'Endpreis nach Aufwand',
    careTiers: ['business', 'premium'],
    description: 'Wenn Standard nicht reicht: komplexe Websites und eigene technische Lösungen.',
    for: ['Größere Unternehmen', 'Hochwertige Marken', 'Mehrere Standorte'],
    features: [
      'Komplexe Websites',
      'Umfangreiche Animationen',
      'Individuelle Funktionen',
      'Besondere Buchungssysteme',
      'Komplexere Formulare',
      'Dynamische Inhalte',
      'Kampagnen-Landingpages',
      'Individuelle technische Lösungen',
    ],
    highlighted: false,
    cta: { label: 'Projekt besprechen', href: '/webdesign-muenchen/#anfrage' },
  },
];

/** Pakete mit abgeleiteter Monatsspanne – das ist der Export für die Seite. */
export const websitePricing: WebsitePackage[] = rawPackages.map((p) => ({
  ...p,
  monthlyPrice: rangeFromTiers(p.careTiers),
}));

/**
 * Bundles / Upsells.
 * Es werden keine Leistungen versprochen, die nicht kalkulierbar sind:
 * Wo kein belastbarer Preis existiert, steht bewusst "individuell kalkuliert".
 */
export interface Bundle {
  id: string;
  name: string;
  headline: string;
  description: string;
  price: number | null;
  priceFrom: boolean;
  priceNote?: string;
  includes: string[];
  cta: { label: string; href: string };
}

export const websiteBundles: Bundle[] = [
  {
    id: 'website-branding',
    name: 'WEBSITE + BRANDING',
    headline: 'Noch kein Markenauftritt? Dann bauen wir beides zusammen.',
    description:
      'Wenn Logo, Farben und Typografie noch fehlen, entsteht die Website nicht im luftleeren Raum – sondern zusammen mit der Marke.',
    price: 3490,
    priceFrom: true,
    priceNote: 'Umfang wird individuell kalkuliert',
    includes: ['Website', 'Logo Design', 'Farbwelt', 'Typografie', 'Brand Guidelines'],
    cta: { label: 'Bundle anfragen', href: '/webdesign-muenchen/#anfrage' },
  },
  {
    id: 'website-content',
    name: 'WEBSITE + CONTENT PRODUCTION',
    headline: 'Deine Website. Deine Bilder. Deine Videos. Aus einer Hand.',
    description:
      'Die meisten Websites scheitern nicht am Design, sondern am fehlenden Material. Wir bauen nicht nur die Seite – wir produzieren auch, was darauf zu sehen ist.',
    price: null,
    priceFrom: false,
    priceNote: 'Individuell kalkuliert – abhängig von Drehtagen und Umfang',
    includes: ['Website', 'Professionelle Fotos', 'Videos', 'Social Media Assets'],
    cta: { label: 'Website + Content anfragen', href: '/webdesign-muenchen/#anfrage' },
  },
];

/** Der Ablauf eines Website-Projekts. */
export const websiteProcess = [
  { index: '01', title: 'Strategie', text: 'Wir verstehen dein Unternehmen, deine Ziele und deine Zielgruppe.' },
  { index: '02', title: 'Konzept', text: 'Struktur und Nutzerführung: Was steht wo und wohin führt es.' },
  { index: '03', title: 'Design', text: 'Ein individuelles visuelles Konzept – kein Template von der Stange.' },
  { index: '04', title: 'Entwicklung', text: 'Responsive Umsetzung, sauber gebaut und schnell auf jedem Gerät.' },
  { index: '05', title: 'Launch', text: 'Testing, SEO-Basics und Veröffentlichung – inklusive technischer Einrichtung.' },
  { index: '06', title: 'Betreuung', text: 'Optional: Updates, Hosting, Monitoring und laufende Optimierung.', optional: true },
];

/** Typische Probleme bestehender Websites – die Problem-Section der Landingpage. */
export const websiteProblems = [
  'Auf dem Handy schlecht lesbar',
  'Lädt zu langsam',
  'Wirkt nicht professionell',
  'Keine klare Nutzerführung',
  'Bringt keine Anfragen',
  'Veraltetes Design',
  'Keine erkennbare Marke',
  'Homepage-Baukasten-Look',
];

/** Was der Kunde stattdessen bekommt. */
export const websiteSolutions = [
  'Auf dem Handy zuerst gebaut',
  'Schnelle Ladezeiten',
  'Auftritt, der zur Leistung passt',
  'Klarer Weg zur Anfrage',
  'Sichtbare Kontaktwege',
  'Individuelles Design',
  'Konsistente Bildsprache',
  'Technisch sauber umgesetzt',
];

/** Günstigster Einstiegspreis – für Teaser, Hero und Meta-Beschreibung. */
export const websiteEntryPrice = Math.min(
  ...websitePricing.filter((p) => p.price !== null).map((p) => p.price as number),
);

/** Günstigste monatliche Betreuung. */
export const websiteEntryMonthly = Math.min(
  ...websitePricing.filter((p) => p.monthlyPrice).map((p) => (p.monthlyPrice as MonthlyRange).min),
);

const nf = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

/** Einmalpreis formatiert, z. B. "ab 1.490 €". */
export const websitePriceLine = (p: WebsitePackage): string =>
  p.price === null ? 'Auf Anfrage' : `${p.priceFrom ? 'ab ' : ''}${nf.format(p.price)}`;

/** Betreuung formatiert, z. B. "39 – 59 € / Monat". */
export const monthlyLine = (m: MonthlyRange | null): string | null => {
  if (!m) return null;
  return m.min === m.max ? `${nf.format(m.min)} / Monat` : `${nf.format(m.min)} – ${nf.format(m.max)} / Monat`;
};

export const euro = (n: number) => nf.format(n);

/**
 * Vergleich nach Kategorien: wie es üblicherweise läuft – und wie bei LAMOR.
 *
 * REGEL: keine erfundenen Marktpreise und keine Wertung über Dritte. Die
 * linke Spalte beschreibt ausschliesslich die STRUKTUR des üblichen Weges
 * ("separat", "zusätzlich", "je nach Anbieter"), nie deren Qualität oder
 * Preis. Nachprüfbar ist nur, was rechts steht – das ist unser Angebot.
 */
export interface ComparisonRow {
  category: string;
  /** Wie es üblicherweise aufgeteilt ist – rein strukturell. */
  others: string;
  /** Was bei LAMOR dazugehört. */
  lamor: string[];
  /** Einschränkung, wo sie sachlich nötig ist. */
  note?: string;
}

export const websiteComparison: ComparisonRow[] = [
  {
    category: 'Website-Erstellung',
    others: 'Separat beauftragt, je nach Anbieter unterschiedliche Kostenmodelle',
    lamor: ['Komplette Website-Erstellung', 'Klar definierter Paketpreis'],
  },
  {
    category: 'Einrichtung & Start',
    others: 'Setup- oder Projektkosten können zusätzlich anfallen',
    lamor: ['Keine versteckten Setup-Kosten', 'Was im Paket steht, ist der Preis'],
  },
  {
    category: 'Betreuung',
    others: 'Separate Ansprechpartner je Gewerk',
    lamor: ['Website', 'Hosting', 'Wartung', 'Änderungen', 'Persönlicher Ansprechpartner'],
    note: 'Umfang je nach gebuchter Betreuungsstufe',
  },
  {
    category: 'Weitere Leistungen',
    others: 'Webdesign, Content, Foto/Video und Branding werden getrennt koordiniert',
    lamor: ['Webdesign', 'Branding', 'Foto', 'Video', 'Social Media'],
    note: 'Alles aus einer Agentur verfügbar',
  },
];
