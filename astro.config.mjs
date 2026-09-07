// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.lamoragency.de',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  integrations: [
    sitemap({
      // Placeholder-Einträge (Projekte/Artikel ohne echte Inhalte) bleiben aus der Sitemap.
      filter: (page) => !page.includes('/placeholder-') && !page.endsWith('/404'),
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  image: {
    // Sharp ist installiert: AVIF/WebP werden beim Build generiert.
    responsiveStyles: true,
  },
  vite: { build: { cssMinify: 'lightningcss' } },
});
