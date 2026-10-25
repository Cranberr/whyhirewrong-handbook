# WhyHireWrong? Handbook

**Hire proof, not promises.** The complete WhyHireWrong? protocol, written down and open for anyone to read.

I'm Hubert Warszta. I've been hiring engineers, product people and designers since 2012. This handbook is how I work, in the same words I use with clients and candidates on [whyhirewrong.com](https://whyhirewrong.com/).

## What's inside

| # | Chapter |
|---|---|
| 01 | [Why WhyHireWrong? exists](src/content/handbook/01-why-whyhirewrong-exists.mdx) |
| 02 | [How I work](src/content/handbook/02-how-i-work.mdx) |
| 03 | [Two ways to work with me](src/content/handbook/03-services.mdx) |
| 04 | [The company search protocol](src/content/handbook/04-company-search-protocol.mdx) |
| 05 | [Screening and verification](src/content/handbook/05-screening-and-verification.mdx) |
| 06 | [The shortlist](src/content/handbook/06-the-shortlist.mdx) |
| 07 | [Included in every search](src/content/handbook/07-included-in-every-search.mdx) |
| 08 | [Candidate experience](src/content/handbook/08-candidate-experience.mdx) |
| 09 | [Career Re:Work](src/content/handbook/09-career-rework.mdx) |
| 10 | [Terms and fees](src/content/handbook/10-terms-and-fees.mdx) |
| 11 | [Tools and AI](src/content/handbook/11-tools-and-ai.mdx) |
| 12 | [What the data says](src/content/handbook/12-what-the-data-says.mdx) |
| 13 | [FAQ for companies](src/content/handbook/13-faq-companies.mdx) |
| 14 | [FAQ for job seekers](src/content/handbook/14-faq-job-seekers.mdx) |
| 15 | [Work with me](src/content/handbook/15-contact.mdx) |
| 16 | [Change log](src/content/handbook/16-change-log.mdx) |

Every chapter reads fine right here on GitHub. You don't need to build anything to share it.

## Run it locally

```bash
git clone https://github.com/Cranberr/whyhirewrong-handbook.git
cd whyhirewrong-handbook
npm install
npm run build
npm run preview
```

Then open `http://localhost:4321/handbook/`. Search works after `npm run build`, because that's when Pagefind builds the index.

## Deploy

The repo includes `vercel.json` and `netlify.toml`. Import it into Vercel or Netlify and deploy, no extra settings needed. The handbook lives under `/handbook/`, and the root redirects there.

## Built with

Astro, MDX, Tailwind CSS and Pagefind.

## Contact

[hubert@whyhirewrong.com](mailto:hubert@whyhirewrong.com) · [Book a video meeting](https://cal.com/hubert-warszta/general-call) · [LinkedIn](https://www.linkedin.com/in/hwarszta/)

## License

MIT. See [LICENSE](./LICENSE).
