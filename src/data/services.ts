/**
 * Leistungen von LAMOR AGENCY.
 * `media` verweist auf ein Bild/Video für die Hover-/Tap-Vorschau.
 * Solange kein echtes Asset vorliegt, wird ein klar erkennbarer Placeholder gezeigt.
 */
export interface Service {
  index: string;
  slug: string;
  title: string;
  short: string; // Kurzbeschreibung – Platzhalter, bis bestehende Wix-Texte übernommen werden
  tags: string[];
  media: { type: 'image' | 'video' | 'placeholder'; src?: string; poster?: string; alt: string; label?: string };
}

export const services: Service[] = [
  { index: '01', slug: 'social-media', title: 'Social Media', short: '[EXISTING TEXT] Strategie, Kanalführung und Community – Content, der Reichweite und Markenbindung aufbaut.', tags: ['Strategie', 'Content', 'Community', 'Ads'], media: { type: 'placeholder', alt: 'Social Media', label: '[SERVICE MEDIA] Social Media' } },
  { index: '02', slug: 'content-creation', title: 'Content Creation', short: '[EXISTING TEXT] Short-Form, Reels, Kampagnen-Content – produziert für Plattform, Format und Zielgruppe.', tags: ['Short-Form', 'Reels', 'Kampagnen'], media: { type: 'placeholder', alt: 'Content Creation', label: '[SERVICE MEDIA] Content Creation' } },
  { index: '03', slug: 'film-video', title: 'Film / Video', short: '[EXISTING TEXT] Videografie und Filmproduktion – von Musikvideo über Werbefilm bis Eventfilm.', tags: ['Filmproduktion', 'Musikvideo', 'Werbefilm', 'Event'], media: { type: 'placeholder', alt: 'Film und Video', label: '[SERVICE MEDIA] Film / Video' } },
  { index: '04', slug: 'photography', title: 'Photography', short: '[EXISTING TEXT] Fotografie für Marken, Kampagnen, Produkte und Events.', tags: ['Kampagne', 'Produkt', 'Event', 'Editorial'], media: { type: 'placeholder', alt: 'Fotografie', label: '[SERVICE MEDIA] Photography' } },
  { index: '05', slug: 'branding', title: 'Branding', short: '[EXISTING TEXT] Markenidentität, Positionierung und visuelle Systeme mit Wiedererkennung.', tags: ['Identity', 'Positionierung', 'Visual System'], media: { type: 'placeholder', alt: 'Branding', label: '[SERVICE MEDIA] Branding' } },
  { index: '06', slug: 'web-digital', title: 'Web & Digital', short: '[EXISTING TEXT] Webdesign, digitale Experiences und Marketing mit Fokus auf Performance.', tags: ['Webdesign', 'Digital Experience', 'Marketing'], media: { type: 'placeholder', alt: 'Web und Digital', label: '[SERVICE MEDIA] Web & Digital' } },
  { index: '07', slug: 'graphic-design', title: 'Graphic Design', short: '[EXISTING TEXT] Grafikdesign, Cover-Artworks, Print und Kampagnen-Visuals.', tags: ['Artwork', 'Print', 'Kampagne'], media: { type: 'placeholder', alt: 'Grafikdesign', label: '[SERVICE MEDIA] Graphic Design' } },
  { index: '08', slug: 'creative-direction', title: 'Creative Direction', short: '[EXISTING TEXT] Kreative Leitung über alle Kanäle – Konzept, Look und Umsetzung aus einer Hand.', tags: ['Konzept', 'Art Direction', 'Produktion'], media: { type: 'placeholder', alt: 'Creative Direction', label: '[SERVICE MEDIA] Creative Direction' } },
];
