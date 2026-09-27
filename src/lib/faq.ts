/**
 * Preis-Platzhalter in FAQ-Texten auflösen.
 * So stehen Preise NUR in den Pricing-Daten und nie doppelt im FAQ-Text.
 *
 *   {{PREIS_START}} → günstigstes monatliches Paket (data/pricing.ts)
 *   {{WEB_PREIS}}   → günstigste Website-Erstellung (data/website-pricing.ts)
 *   {{WEB_MONAT}}   → günstigste Website-Betreuung  (data/website-pricing.ts)
 */
import type { FaqItem } from '@/data/faq';
import { packages, priceLine } from '@/data/pricing';
import { websiteEntryPrice, websiteEntryMonthly, euro } from '@/data/website-pricing';

const cheapestMonthly = packages
  .filter((p) => p.monthly.amount !== null)
  .sort((a, b) => (a.monthly.amount as number) - (b.monthly.amount as number))[0];

export const faqTokens: Record<string, string> = {
  '{{PREIS_START}}': cheapestMonthly ? priceLine(cheapestMonthly.monthly) : 'auf Anfrage',
  '{{WEB_PREIS}}': euro(websiteEntryPrice),
  '{{WEB_MONAT}}': `${euro(websiteEntryMonthly)} / Monat`,
};

export const resolveText = (text: string): string =>
  Object.entries(faqTokens).reduce((acc, [token, value]) => acc.split(token).join(value), text);

export const resolveFaqTokens = (items: FaqItem[]): FaqItem[] =>
  items.map((f) => ({ ...f, a: resolveText(f.a) }));
