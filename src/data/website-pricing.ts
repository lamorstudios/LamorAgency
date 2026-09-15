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
export type CareId = 'none' | 'hosting' | 'business' | 'premium';

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
    id: 'hosting',
    name: 'Hosting',
    price: 29,
    note: 'Die Seite bleibt online, gesichert und technisch betreut.',
    includes: ['Hosting', 'SSL & Updates', 'Backups', 'Monitoring', 'Technische Wartung'],
  },
  {
    id: 'business',
    name: 'Business',
    price: 69,
    note: 'Dazu kleinere Änderungen, ohne dass du nachfragen musst.',
    includes: ['Alles aus Hosting', 'Kleinere Textänderungen', 'Inhaltspflege nach Absprache', 'Ansprechpartner per Mail'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 119,
    note: 'Für Seiten, die laufend mitwachsen sollen.',
    includes: ['Alles aus Hosting', 'Kleinere Änderungen', 'Monatliche Inhaltspflege', 'Technische Verbesserungen', 'Laufende Optimierung'],
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
    name: 'ONEPAGE',
    label: 'Landing Page',
    price: 1490,
    priceFrom: true,
    careTiers: ['hosting', 'business'],
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
    name: 'BUSINESS',
    label: 'Meistgewählt',
    price: 2490,
    priceFrom: true,
    careTiers: ['hosting', 'business', 'premium'],
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
    name: 'PREMIUM',
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
      'Website und Marke entstehen zusammen, nicht nacheinander.',
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
      'Wir bauen die Seite und produzieren, was darauf zu sehen ist.',
    price: null,
    priceFrom: false,
    priceNote: 'Individuell kalkuliert – abhängig von Drehtagen und Umfang',
    includes: ['Website', 'Professionelle Fotos', 'Videos', 'Social Media Assets'],
    cta: { label: 'Website + Content anfragen', href: '/webdesign-muenchen/#anfrage' },
  },
];

/** Der Ablauf eines Website-Projekts. */
export const websiteProcess = [
  { index: '01', title: 'Strategie', text: 'Ziele und Zielgruppe' },
  { index: '02', title: 'Konzept', text: 'Struktur und Nutzerführung' },
  { index: '03', title: 'Design', text: 'Individuell, kein Template' },
  { index: '04', title: 'Entwicklung', text: 'Responsive und schnell' },
  { index: '05', title: 'Launch', text: 'Testing, SEO-Basis, live' },
  { index: '06', title: 'Betreuung', text: 'Updates, Hosting, Monitoring', optional: true },
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

/**
 * ============================================================================
 * LEISTUNGSMATRIX – was in welchem Paket steckt
 * ----------------------------------------------------------------------------
 * REGEL 1: Jede Zeile ist aus den `features`-Listen der Pakete oben abgeleitet.
 *          Hinter jeder Zeile steht, worauf sie sich stützt. Es wird NICHTS
 *          zugesagt, was dort nicht steht.
 * REGEL 2: `from` nennt die UNTERSTE Stufe, ab der eine Zeile enthalten ist.
 *          Höhere Pakete enthalten den Umfang der niedrigeren – so sind die
 *          Pakete aufgebaut (BUSINESS ist gegenüber ONEPAGE "der vollständige
 *          Auftritt", PREMIUM mehr, CUSTOM am meisten). Deshalb listet CUSTOM
 *          oben nur, was über PREMIUM hinausgeht.
 *
 * Bewusst NICHT in der Matrix, weil in keinem Paket zugesagt:
 *   - GEO / KI-Sichtbarkeit
 *   - Cookie-/Consent-Tool (es gibt nur die DSGVO-Basisintegration)
 *   - Hosting, Wartung, laufende Betreuung → das sind die Betreuungsstufen
 *     (carePlans), kein Bestandteil der einmaligen Erstellung.
 * ============================================================================
 */
export const packageOrder = ['onepage', 'business', 'premium', 'custom'] as const;
export type PackageId = (typeof packageOrder)[number];

export interface MatrixRow {
  label: string;
  /** Unterste Stufe, ab der die Zeile enthalten ist. */
  from: PackageId;
  icon: string;
}

export const websiteMatrix: MatrixRow[] = [
  // ab ONEPAGE – steht so in der Onepage-Featureliste
  { label: 'Individuelles Webdesign', from: 'onepage', icon: 'image' },
  { label: 'Responsive für alle Geräte', from: 'onepage', icon: 'cube' },
  { label: 'Anfrageformular & WhatsApp-CTA', from: 'onepage', icon: 'bolt' },
  { label: 'SEO-Grundoptimierung', from: 'onepage', icon: 'trend' },
  { label: 'Performance-Optimierung', from: 'onepage', icon: 'bolt' },
  { label: 'Rechtstexte & DSGVO-Basis eingebunden', from: 'onepage', icon: 'heart' },
  { label: 'Deployment & technische Einrichtung', from: 'onepage', icon: 'cube' },
  // ab BUSINESS – Onepage ist eine Seite, alles Weitere kommt hier dazu
  { label: 'Mehrseitige Website', from: 'business', icon: 'image' },
  { label: 'Google Maps & Local SEO', from: 'business', icon: 'trend' },
  { label: 'Analytics / Tracking vorbereitet', from: 'business', icon: 'bars' },
  // ab PREMIUM
  { label: 'Creative-Direction-Konzept', from: 'premium', icon: 'heart' },
  { label: 'Motion Design & Scroll-Animationen', from: 'premium', icon: 'bolt' },
  { label: 'Blog- / Referenz-System', from: 'premium', icon: 'image' },
  // ab CUSTOM
  { label: 'Individuelle Funktionen & Buchungssysteme', from: 'custom', icon: 'cube' },
];

/** Ist die Zeile in diesem Paket enthalten? */
export const matrixIncludes = (row: MatrixRow, pkg: PackageId) =>
  packageOrder.indexOf(pkg) >= packageOrder.indexOf(row.from);

/**
 * "Bei anderen oft extra – bei LAMOR AGENCY inklusive"
 *
 * REGEL: Links steht ausschliesslich, wie ein Angebot ueblicherweise
 * ZUGESCHNITTEN ist – nie ein Preis, nie eine Wertung ueber Dritte. Rechts
 * steht nur, was tatsaechlich zugesagt ist: entweder eine Zeile aus
 * websiteMatrix mit from: 'onepage' (also in jedem Paket enthalten), oder
 * eine Eigenschaft des Ratenmodells:
 *   - "Ratenzahlung ohne Aufschlag" -> die Rate ist Preis / Laufzeit
 *   - "Eigentum nach vollstaendiger Zahlung" -> faq.ts: "Die
 *     Website-Erstellung ist ein einmaliges Projekt und gehoert danach dir."
 */
export interface InclusiveRow {
  label: string;
  usual: string;
  icon: string;
}

export const inclusiveComparison: InclusiveRow[] = [
  { label: 'Individuelles Design', usual: 'je nach Angebot', icon: 'image' },
  { label: 'Responsive Umsetzung', usual: 'je nach Angebot', icon: 'cube' },
  { label: 'SEO-Grundoptimierung', usual: 'häufig Zusatzleistung', icon: 'trend' },
  { label: 'Ratenzahlung ohne Aufschlag', usual: 'oft nur Einmalzahlung', icon: 'bolt' },
  { label: 'Eigentum nach vollständiger Zahlung', usual: 'je nach Modell gebunden', icon: 'heart' },
  { label: 'Rechtstexte technisch eingebunden', usual: 'oft separat', icon: 'heart' },
  { label: 'Deployment & Einrichtung', usual: 'je nach Anbieter separat', icon: 'cube' },
  { label: 'Fester Ansprechpartner', usual: 'abhängig vom Anbieter', icon: 'head' },
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

/** Rate mit Nachkommastellen, z. B. "207,50 €" – Cent-Betraege muessen stimmen. */
const nfRate = new Intl.NumberFormat('de-DE', {
  style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2,
});
export const euroRate = (n: number) => nfRate.format(n);

/**
 * ============================================================================
 * RATENZAHLUNG – die Website monatlich bezahlen
 * ----------------------------------------------------------------------------
 * Modell in einem Satz: Der Paketpreis wird auf die gewaehlte Laufzeit
 * verteilt. Danach ist die Website bezahlt und es laeuft nur noch Hosting
 * oder Betreuung weiter.
 *
 * WICHTIG fuer jede Darstellung:
 *   - Die Rate ist der Paketpreis GETEILT durch die Laufzeit. Kein Aufschlag,
 *     keine Zinsen, keine Gebuehr – deshalb rechnet der Rechner mit einer
 *     einfachen Division und mit nichts sonst.
 *   - Das Hosting laeuft DANEBEN und ist nicht Teil der Rate. Beides wird
 *     getrennt ausgewiesen, nie zu einer Summe verschmolzen.
 *   - Nach der letzten Rate ist der Website-Anteil 0 €. Er darf ab dann
 *     nirgends mehr als laufende Kosten auftauchen.
 * ============================================================================
 */
/**
 * Waehlbare Laufzeiten. MAXIMUM IST 12 MONATE – eine Agenturleistung ueber
 * zwei Jahre zu strecken wirkt wie die Finanzierung eines Konsumprodukts.
 * Alles andere (Regler, Hero-Rate, Zahlungsfortschritt) leitet sich hieraus
 * ab; es gibt keine zweite Stelle mit Laufzeiten.
 */
export const financingTerms = [3, 6, 9, 12] as const;
export const defaultFinancingTerm = 12;

/** Monatliche Website-Rate. Einzige Stelle, an der diese Formel steht. */
export const websiteRate = (price: number, months: number) => price / months;

/** Laengste waehlbare Laufzeit – ergibt die niedrigste Rate. */
export const longestTerm = financingTerms[financingTerms.length - 1];

/**
 * Niedrigstmoegliche Website-Rate: guenstigstes Paket auf die laengste
 * Laufzeit. Abgeleitet, kein eigener Preis – aendert sich automatisch mit.
 */
export const lowestRate = websiteRate(websiteEntryPrice, longestTerm);

/** Die technische Basis, die waehrend und nach der Ratenzahlung laeuft. */
export const hostingPlan = getCarePlan('hosting');
/** Der Weg fuer alle, die danach weiter betreut werden wollen. */
export const premiumPlan = getCarePlan('premium');


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
  /** Wie es üblicherweise aufgeteilt ist – rein strukturell, nie wertend. */
  others: string;
  /** Was bei LAMOR dazugehört – eine Zeile, kein Absatz. */
  lamor: string;
  /** Der Gewinn in zwei Wörtern. Steht als Pill in der dunklen Spalte. */
  gain: string;
  /** Icon-Name aus components/Icon.astro */
  icon: string;
}

export const websiteComparison: ComparisonRow[] = [
  { category: 'Website', icon: 'cube', others: 'Separat beauftragt', lamor: 'Konzept, Design, Umsetzung', gain: 'Ein Paketpreis' },
  { category: 'Design', icon: 'image', others: 'Separate Abstimmung', lamor: 'Von Anfang an integriert', gain: 'Ein Look' },
  { category: 'Content', icon: 'bolt', others: 'Weiterer Partner nötig', lamor: 'Foto & Video aus dem Haus', gain: 'Ein Drehtag' },
  { category: 'Branding', icon: 'heart', others: 'Separates Gewerk', lamor: 'Logo, Farben, Typografie', gain: 'Ein System' },
  { category: 'Hosting & Wartung', icon: 'trend', others: 'Je nach Modell extra', lamor: 'Hosting, Backups, Updates', gain: 'Optional betreut' },
];
