# Real photo files

The website expects these real-photo files in this directory:

- `playa-san-jose-encarnacion-main.jpg`
- `playa-san-jose-sunset.jpg`
- `playa-san-jose-summer.jpg`
- `playa-san-jose-river.jpg`

Run `pnpm photos:download` from a networked environment to download the exact Wikimedia Commons originals listed in `../../IMAGE-SOURCES.md`.

This execution environment could not fetch external binary image files. The site therefore uses the same verified Commons originals as browser fallbacks when a local JPG is absent.
