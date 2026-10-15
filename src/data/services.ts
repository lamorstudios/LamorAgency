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

  /* ---- Felder für die Startseite (Erklärfilm-Blöcke) ---------------------
     Sie beantworten in dieser Reihenfolge die drei Fragen, die ein Besucher
     in den ersten Sekunden stellt: Was bringt mir das? Was bekomme ich
     konkret? Könnt ihr das wirklich? */

  /** Schwerpunkt der Agentur – steht auf der Startseite weit oben. */
  focus?: boolean;
  /** Der Nutzen in einem Satz. Aus Kundensicht, nicht aus Agentursicht. */
  promise: string;
  /** Drei Dinge, die der Kunde am Ende in der Hand hat. Keine Methoden. */
  deliverables: [string, string, string];
  /**
   * Ein Satz technisches Know-how. Er belegt die Kompetenz, statt sie zu
   * behaupten – genau das, was der Erklärfilm daneben zeigt.
   * REGEL: nur, was wirklich so gearbeitet wird. Nichts dazuerfinden.
   */
  proof: string;
}

/**
 * REIHENFOLGE = SCHWERPUNKT. Die vier Disziplinen mit `focus: true` stehen
 * auf der Startseite oben und bekommen dort je einen Erklaerfilm. Wer den
 * Schwerpunkt verschiebt, aendert hier die Reihenfolge – die Startseite
 * zieht automatisch nach.
 */
export const services: Service[] = [
  {
    index: '01',
    slug: 'video-production',
    title: 'Videografie',
    label: 'Video Production',
    short: 'Vom Konzept bis zum finalen Frame.',
    focus: true,
    promise: 'Ein Film, der deine Marke so aussehen lässt, wie du sie meinst – nicht wie ein Handyvideo.',
    deliverables: [
      'Fertiger Film in allen Formaten, die du brauchst',
      'Geschnitten, vertont, farbkorrigiert',
      'Zusätzliche Schnittfassungen für Social',
    ],
    proof: 'Gedreht auf Sony-Cinema-Technik, geschnitten und gegradet in der Adobe Creative Cloud, Ton auf Neumann abgehört.',
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
    slug: 'motion-graphics',
    title: 'Motion Graphics',
    label: 'Motion Design',
    short: 'Erklärt in zwanzig Sekunden, was ein Flyer nicht schafft.',
    focus: true,
    promise: 'Dein Angebot wird in wenigen Sekunden verstanden – auch von Leuten, die vorher nie davon gehört haben.',
    deliverables: [
      'Erklärfilm für Website, Messe und Social',
      'Animiertes Logo und bewegte Typografie',
      'Hoch- und Querformat aus einer Produktion',
    ],
    proof: 'Jede Textebene wird als echte Grafik gesetzt und animiert – nichts wird abgefilmt, dadurch bleibt alles bis ins letzte Pixel scharf.',
    items: [
      'Erklärfilme',
      'Logo-Animation',
      'Kinetische Typografie',
      'Produktfilme in Motion Design',
      'Animierte Social Ads',
      'Bauchbinden und Grafikpakete',
      'Animierte Preis- und Leistungsübersichten',
    ],
    media: { type: 'placeholder', alt: 'Motion Graphics', label: '[SERVICE MEDIA] Motion Graphics' },
  },
  {
    index: '03',
    slug: 'branding',
    title: 'Branding & Design',
    label: 'Branding & Design',
    short: 'Erkennbar, bevor dein Name fällt.',
    focus: true,
    promise: 'Alles, was von dir zu sehen ist, sieht nach derselben Firma aus – vom Logo bis zum Lieferwagen.',
    deliverables: [
      'Logo und Markenauftritt',
      'Vorlagen für Print und Social',
      'Druckfertige Daten für deine Druckerei',
    ],
    proof: 'Das Logo entsteht als Vektor und funktioniert deshalb auf der Visitenkarte genauso wie auf der Fahrzeugbeschriftung.',
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
    index: '04',
    slug: 'web-design',
    title: 'Webdesign',
    label: 'Web Design',
    short: 'Websites, die Anfragen bringen.',
    focus: true,
    promise: 'Eine Website, die Besucher zur Anfrage führt – statt sie nur höflich zu begrüßen.',
    deliverables: [
      'Individuell gebaute Website',
      'Auf Handy, Tablet und Desktop geprüft',
      'Anfrageformular, das in deinem Postfach landet',
    ],
    proof: 'Jede Seite wird einzeln auf Ladezeit und Bedienbarkeit gemessen, bevor sie online geht.',
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
    slug: 'photography',
    title: 'Fotografie',
    label: 'Photography',
    short: 'Bilder, die sofort einsetzbar sind.',
    promise: 'Bilder, die du sofort verwenden kannst – ohne dass jemand nachbessern muss.',
    deliverables: [
      'Retuschierte Bilder in voller Auflösung',
      'Zuschnitte für Website und Social',
      'Nutzungsrechte für deine Werbung',
    ],
    proof: 'Fotos entstehen im selben Setup wie der Film – ein Termin, zwei Ergebnisse.',
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
    index: '06',
    slug: 'social-media',
    title: 'Social Media',
    label: 'Social Media',
    short: 'Content, Strategie und Kanal in einer Hand.',
    promise: 'Dein Kanal läuft weiter, auch wenn du gerade keine Zeit hast, dich darum zu kümmern.',
    deliverables: [
      'Fertige Posts und Reels im Voraus',
      'Redaktionsplan für den Monat',
      'Auswertung, was tatsächlich lief',
    ],
    proof: 'Der Content entsteht aus dem Material, das beim Dreh ohnehin anfällt – kein zweiter Termin nötig.',
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
    index: '07',
    slug: 'models-talents',
    title: 'Models & Talents',
    label: 'Models & Talents',
    short: 'Gesichter direkt über LAMOR AGENCY gebucht.',
    promise: 'Das passende Gesicht für deine Kampagne – gebucht über uns, ohne zweite Agentur.',
    deliverables: [
      'Vorauswahl passender Models',
      'Buchung und Koordination am Drehtag',
      'Freigegebenes Material für deine Werbung',
    ],
    proof: 'Die Models kommen aus unserem eigenen Pool und stehen am selben Drehtag zur Verfügung.',
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

/** Die Schwerpunkte – sie tragen die Startseite. */
export const focusServices = services.filter((s) => s.focus);

export const getService = (slug: string) => services.find((s) => s.slug === slug);
