# Web site architecture

## Role

Single-purpose **marketing and distribution** surface for VibranceFlow. It does not run the display engine or mobile pairing logic.

## Deployment

| Item | Plan |
|------|------|
| Host | [Vercel](https://vercel.com) connected to `VibranceFlow/VibranceFlow-web` |
| Branch | `main` → production (maintainer-only repository) |
| Domain | [vibranceflow.vercel.app](https://vibranceflow.vercel.app); optional custom `vibranceflow.vercel.app` in Vercel |

## Stack (implemented)

- **Static HTML** at repo root: `index.html`, `styles.css`, `logo-mark.svg`, and committed PNG/ICO brand files.
- Deploy: Vercel, no build step, output directory `.`.

## Page map

| Route | Purpose |
|-------|---------|
| `/` | Coming soon hero, GitHub links, brand mark |
| `/#features` | Per-game profiles, tray app, mobile remote (planned) |
| `/#download` | Windows, Linux, Android, iOS buttons |
| `/#open-source` | Links to core, mobile, PoC (archived) repos |
| `/#support` | Buy Me a Coffee |

## SEO checklist

- [ ] `<title>` ≤ 60 chars, includes "VibranceFlow" + primary keyword (e.g. game vibrance Windows)
- [ ] Meta description ~150–160 chars
- [ ] `link rel="canonical"`
- [ ] Open Graph: `og:title`, `og:description`, `og:image`, `og:url`
- [ ] Twitter card `summary_large_image`
- [ ] JSON-LD `SoftwareApplication` when downloads are live
- [ ] `sitemap.xml` + `robots.txt`
- [ ] `hreflang` only if translations ship
- [ ] Lighthouse: LCP, CLS, accessible contrast

## Download links policy

- **Windows:** GitHub Release asset from VibranceFlow-core when published.
- **Linux:** Release or docs link when supported; otherwise disabled CTA.
- **Android / iOS:** Store URLs or "Coming soon" until VibranceFlow-mobile ships.

Never imply a build exists without a real URL.

## Third-party

- **Buy Me a Coffee:** external link, `rel="noopener noreferrer"`.
- **GitHub:** org `https://github.com/VibranceFlow`.

## License boundary

This site is **MIT**. Do not bundle GPL core source; link to GitHub for source and license text.
