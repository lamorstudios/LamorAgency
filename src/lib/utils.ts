export const formatDate = (d: Date, lang = 'de-DE') => new Intl.DateTimeFormat(lang, { day: '2-digit', month: 'long', year: 'numeric' }).format(d);
export const isoDate = (d: Date) => d.toISOString().split('T')[0];
export const readingTime = (text = '') => Math.max(1, Math.round(text.trim().split(/\s+/).filter(Boolean).length / 200));
export const pad = (n: number) => String(n).padStart(2, '0');
