# WhyHireWrong? Handbook

This repository contains the WhyHireWrong? company handbook: how we work, how we source and assess candidates, and how we collaborate with clients.

## Stack

- [Astro](https://astro.build)
- MDX for handbook content
- Tailwind CSS
- Pagefind for local search
- GitHub Actions for build validation

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:4321

## Build

```bash
npm run build
npm run preview
```

## Add a handbook page

Create a new `.mdx` file in `src/content/handbook/`:

```mdx
---
title: New chapter
description: One-sentence summary.
order: 12
updated: 2026-10-19
---

## Section

Content.
```

## Deployment

Connect this repository to Vercel or Cloudflare Pages.

- Build command: `npm run build`
- Output directory: `dist`
- Recommended URL: `whyhirewrong.com/handbook`
