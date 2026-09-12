import { site } from '@/data/site';
import { faqs } from '@/data/faq';
import { packages as pricingPackages, priceLine } from '@/data/pricing';
import { services as allServices } from '@/data/services';
const abs = (path: string) => `${site.url}${path.replace(/\/?$/, '/')}`;
export const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
});
export const blogPosting = (p: { title: string; description: string; date: Date; updated?: Date; path: string; image?: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: p.title,
  description: p.description,
  datePublished: p.date.toISOString(),
  dateModified: (p.updated ?? p.date).toISOString(),
  inLanguage: site.lang,
  mainEntityOfPage: abs(p.path),
  ...(p.image ? { image: `${site.url}${p.image}` } : {}),
  author: { '@id': `${site.url}/#organization` },
  publisher: { '@id': `${site.url}/#organization` },
});
export const creativeWork = (w: { title: string; description: string; path: string; client: string; category: string; year?: number }) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: w.title,
  description: w.description,
  url: abs(w.path),
  genre: w.category,
  ...(w.year ? { dateCreated: String(w.year) } : {}),
  sourceOrganization: { '@type': 'Organization', name: w.client },
  creator: { '@id': `${site.url}/#organization` },
});

/** FAQPage aus src/data/faq.ts – Preise werden aus pricing.ts eingesetzt. */
export const faqPage = () => {
  const entry = pricingPackages
    .filter((p) => p.monthly.amount !== null)
    .sort((a, b) => (a.monthly.amount as number) - (b.monthly.amount as number))[0];
  const entryLabel = entry ? priceLine(entry.monthly) : 'auf Anfrage';
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs
      .filter((f) => f.schema)
      .map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/\{\{PREIS_START\}\}/g, entryLabel) },
      })),
  };
};

/** Angebotskatalog: Leistungen und Pakete mit echten Preisen. */
export const offerCatalog = () => ({
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: `Leistungen und Pakete – ${site.name}`,
  provider: { '@id': `${site.url}/#organization` },
  itemListElement: [
    ...allServices.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.short, serviceType: s.label },
    })),
    ...pricingPackages.map((p) => ({
      '@type': 'Offer',
      name: p.name,
      description: p.for,
      ...(p.monthly.amount !== null
        ? {
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: p.monthly.amount,
              priceCurrency: 'EUR',
              valueAddedTaxIncluded: false,
              unitCode: 'MON',
            },
          }
        : {}),
    })),
  ],
});
