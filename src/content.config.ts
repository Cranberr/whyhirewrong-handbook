import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const handbook = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/handbook' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    updated: z.coerce.date(),
    owner: z.string().default('Hubert Warszta'),
  }),
});

export const collections = { handbook };
