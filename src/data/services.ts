/**
 * Leistungen von LAMOR AGENCY – sechs Disziplinen, ein Studio.
 * Struktur und Unterleistungen entsprechen dem Leistungsumfang der Agentur.
 *
 * `media` verweist auf Bild/Video für die Hover-/Tap-Vorschau. Solange kein
 * echtes Asset vorliegt, rendert <Media> eine neutrale Media-Surface.
 */
export interface Service {
  index: string;
  slug: string;
  /** Deutsche Bezeichnung – trägt die Seite. */
  title: string;
  /** Kurzes englisches Label für den Creative-Agency-Look. */
  label: string;
  /** Ein Satz, der die Disziplin verkauft – keine Agentur-Floskeln. */
  short: string;
  /** Konkrete Einzelleistungen. Erscheinen als Liste auf /services/. */
  items: string[];
  media: { type: 'image' | 'video' | 'placeholder'; src?: string; poster?: string; alt: string; label?: string };
}

export const services: Service[] = [
  {
    index: '01',
    slug: 'video-production',
    title: 'Videoproduktion',
    label: 'Video Production',
    short: 'Von der ersten Idee bis zum finalen Frame – Bewegtbild, das für Plattform, Marke und Wirkung gebaut ist.',
    items: [
      'Social Media Videos',
      'Commercials / Werbespots',
      'Imagefilme',
      'Musikvideos',
      'Produktvideos',
      'Real Estate',
      'Event',
      'Postproduktion',
      'Color Grading',
    ],
    media: { type: 'placeholder', alt: 'Videoproduktion', label: '[SERVICE MEDIA] Videoproduktion' },
  },
  {
    index: '02',
    slug: 'photography',
    title: 'Fotografie',
    label: 'Photography',
    short: 'Bilder, die deine Marke tragen – sauber ausgeleuchtet, klar gestaltet, sofort einsetzbar.',
    items: [
      'Produktfotografie',
      'Brand Shootings',
      'Portrait',
      'Social Content',
      'Real Estate',
      'Events',
      'Marketingfotos',
    ],
    media: { type: 'placeholder', alt: 'Fotografie', label: '[SERVICE MEDIA] Fotografie' },
  },
  {
    index: '03',
    slug: 'social-media',
    title: 'Social Media',
    label: 'Social Media',
    short: 'Content, Strategie und Kanalführung aus einer Hand – damit aus Reichweite Wiedererkennung wird.',
    items: [
      'Content Creation',
      'Content Strategie',
      'Reels / TikTok / Shorts',
      'Kampagnen',
      'Community',
      'Social Media Betreuung',
      'Paid Creatives',
    ],
    media: { type: 'placeholder', alt: 'Social Media', label: '[SERVICE MEDIA] Social Media' },
  },
  {
    index: '04',
    slug: 'web-design',
    title: 'Webdesign',
    label: 'Web Design',
    short: 'Websites, die nicht nur gut aussehen, sondern Anfragen bringen. Schnell, sauber, auf jedem Gerät.',
    items: [
      'Individuelle Websites',
      'Landingpages',
      'Responsive Design',
      'Conversion-orientierte Struktur',
      'Performance',
      'SEO-Grundoptimierung',
      'Branding-Integration',
    ],
    media: { type: 'placeholder', alt: 'Webdesign', label: '[SERVICE MEDIA] Webdesign' },
  },
  {
    index: '05',
    slug: 'branding',
    title: 'Branding & Design',
    label: 'Branding & Design',
    short: 'Die visuelle Identität, an der man dich erkennt – bevor dein Name fällt.',
    items: [
      'Logo Design',
      'Corporate Identity',
      'Artworks',
      'Print',
      'Flyer',
      'Plakate',
      'Visitenkarten',
      'Kampagnendesign',
    ],
    media: { type: 'placeholder', alt: 'Branding und Design', label: '[SERVICE MEDIA] Branding' },
  },
  {
    index: '06',
    slug: 'models-talents',
    title: 'Models & Talents',
    label: 'Models & Talents',
    short: 'Gesichter für deine Kampagne – direkt über LAMOR gebucht, ohne zweite Agentur dazwischen.',
    items: [
      'Commercials',
      'Social Content',
      'UGC',
      'Musikvideos',
      'Fashion',
      'Fitness',
      'Beauty',
      'Lifestyle',
    ],
    media: { type: 'placeholder', alt: 'Models und Talents', label: '[SERVICE MEDIA] Models & Talents' },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
