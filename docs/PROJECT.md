# Project overview

Marketing and distribution site for the VibranceFlow ecosystem: landing page, platform downloads, links to GitHub, and support (e.g. Buy Me a Coffee). Hosted on **Vercel**.

## Ecosystem

| Repo | Role | License |
|------|------|---------|
| [VibranceFlow-core](https://github.com/VibranceFlow/VibranceFlow-core) | Windows desktop | GPL-3.0 |
| [VibranceFlow-mobile](https://github.com/VibranceFlow/VibranceFlow-mobile) | Android / iOS remote | GPL-3.0 |
| [VibranceFlow-PoC](https://github.com/VibranceFlow/VibranceFlow-PoC) | Archived PoC | - |
| [VibranceFlow-web](https://github.com/VibranceFlow/VibranceFlow-web) | This site | MIT |

## Tech direction

- Static or SSR framework suited to Vercel (Next.js, Astro, or similar).
- **SEO first:** metadata, Open Graph, `sitemap.xml`, `robots.txt`, semantic headings, Core Web Vitals.
- English primary copy; structure ready for i18n later if needed.

## Content requirements

- Hero: per-game color profiles on Windows.
- Download CTAs: Windows, Linux, Android, iOS (honest “coming soon” until releases exist).
- Links: GitHub org/repos, core contributing guide, license badges.
- Support: Buy Me a Coffee (or equivalent).

## Maintenance

Maintainer-only repository. Code contributions belong in VibranceFlow-core and VibranceFlow-mobile.

## Out of scope

- Windows display APIs
- Mobile WebSocket server
- Bundling GPL core source (link to GitHub instead)

See [ARCHITECTURE.md](ARCHITECTURE.md) for deployment and SEO.
