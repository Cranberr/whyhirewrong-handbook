# Contributing to the WhyHireWrong? Handbook

This handbook explains how WhyHireWrong? works. Changes should make the handbook more accurate, useful, and actionable.

## Before changing a page

Ask:

1. Does this reflect what we actually do?
2. Can someone act correctly after reading it?
3. Is it specific enough to be useful?
4. Does it protect client and candidate confidentiality?
5. Does it avoid unsupported claims?

## Adding a chapter

Create a new `.mdx` file in:

```text
src/content/handbook/
```

Use this frontmatter:

```mdx
---
title: Your chapter title
description: One clear sentence explaining the chapter.
order: 18
updated: 2026-10-19
---
```

## Writing rules

- Use short sentences.
- Use active voice.
- Replace vague claims with examples, thresholds, or checklists.
- State the owner, process, tools, and exceptions.
- Update the `updated` field.
- Add material changes to the change log.

## Commit messages

Use clear messages such as:

```text
Add candidate scorecard template
Clarify client response-time expectations
Update pricing engagement models
```
