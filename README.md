# WhyHireWrong? Handbook

A complete, shareable company handbook for **WhyHireWrong?** built with Astro, MDX, Tailwind CSS, and Pagefind.

It explains how WhyHireWrong? works: our principles, services, sourcing and assessment methods, client and candidate processes, pricing approach, AI boundaries, and quality standards.

## Live handbook

After deployment, the handbook will be available at:

```text
https://whyhirewrong.com/handbook/
```

## Quick start

```bash
git clone https://github.com/Cranberr/whyhirewrong-handbook.git
cd whyhirewrong-handbook
npm install
npm run dev
```

Open:

```text
http://localhost:4321/handbook/
```

## Build and search

```bash
npm run build
npm run preview
```

The build command also generates the Pagefind search index.

## Add a chapter

Create a file in:

```text
src/content/handbook/
```

Example:

```mdx
---
title: New chapter
description: One-sentence summary.
order: 18
updated: 2026-10-19
---

## Section

Your content.
```

## Reusable components

### Callout

```mdx
import Callout from '../../components/Callout.astro';

<Callout variant="warning">

Do not share candidate data without consent.

</Callout>
```

### Checklist

```mdx
import Checklist from '../../components/Checklist.astro';

<Checklist title="Before a shortlist">

- Scorecard completed
- Evidence recorded
- Motivation confirmed
- Availability confirmed

</Checklist>
```

### Template

```mdx
import Template from '../../components/Template.astro';

<Template title="Client intake brief">

Add the template content here.

</Template>
```

## Deploy

### Vercel

1. Import the GitHub repository into Vercel.
2. Use the included `vercel.json` configuration.
3. Deploy.

### Netlify

1. Connect the repository to Netlify.
2. Use the included `netlify.toml` configuration.
3. Deploy.

Recommended production URL:

```text
https://whyhirewrong.com/handbook/
```

## Make it public

This repository is currently private. To share it publicly:

1. Open **Settings**.
2. Go to **General**.
3. Find **Danger Zone**.
4. Select **Change visibility**.
5. Choose **Public** and confirm.

## License

MIT. See [LICENSE](./LICENSE).
