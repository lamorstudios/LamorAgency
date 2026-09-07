import { site } from '@/data/site';
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
