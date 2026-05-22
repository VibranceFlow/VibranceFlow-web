# VibranceFlow Web

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Official **coming soon** landing page for [VibranceFlow](https://github.com/VibranceFlow). Static site deployed on [Vercel](https://vercel.com).

**Production:** [https://vibranceflow.vercel.app](https://vibranceflow.vercel.app)  
Custom domain `vibranceflow.vercel.app` can be added in the Vercel project settings.

## Stack

- Static HTML + CSS (no build step)
- Brand colors aligned with VibranceFlow Core (`#0a0a0f`, `#00e5c0`, `#8b5cf6`)
- Brand images at repo root: `logo.png`, `logo-hero.png`, `favicon.ico`, `og-image.png`, `apple-touch-icon.png`, plus `logo-mark.svg` fallback

## Local preview

```powershell
cd VibranceFlow-web
npx --yes serve . -p 3000
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Import the `VibranceFlow-web` GitHub repository.
2. Framework preset: **Other** (no build command).
3. Output directory: `.` (repository root).
4. Production branch: `main`.
5. Optional: add domain `vibranceflow.vercel.app` → point DNS to Vercel.

`vercel.json`, `robots.txt`, and `sitemap.xml` are included.

## Ecosystem

| Repository | Role |
|------------|------|
| [VibranceFlow-core](https://github.com/VibranceFlow/VibranceFlow-core) | Windows desktop app (GPL-3.0) |
| [VibranceFlow-mobile](https://github.com/VibranceFlow/VibranceFlow-mobile) | Phone remote (GPL-3.0) |
| [VibranceFlow-web](https://github.com/VibranceFlow/VibranceFlow-web) | This site (MIT) |

## Documentation

| File | Description |
|------|-------------|
| [docs/PROJECT.md](docs/PROJECT.md) | Site scope |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | SEO and future pages |

## License

MIT — see [LICENSE](LICENSE).
