import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const media = z.object({
  type: z.enum(['image', 'video', 'placeholder']).default('placeholder'),
  src: z.string().optional(), // z.B. '/src/assets/work/slug/hero.jpg' oder '/media/slug/hero.mp4'
  poster: z.string().optional(),
  alt: z.string().default(''),
  label: z.string().optional(), // Placeholder-Beschriftung
  ratio: z.enum(['wide', 'cinema', 'square', 'portrait', 'story']).default('wide'),
  caption: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    category: z.string(),
    services: z.array(z.string()),
    year: z.number().optional(),
    summary: z.string(),
    hero: media,
    preview: media.optional(), // Hover-Video / Vorschau in Listen
    gallery: z.array(media).default([]),
    size: z.enum(['full', 'large', 'medium', 'small']).default('medium'),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    placeholder: z.boolean().default(false), // true → noindex + nicht in Sitemap
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.string(),
    cover: media.optional(),
    author: z.string().default('LAMOR AGENCY'),
    draft: z.boolean().default(false),
    placeholder: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
