# Repository Guidelines: erikwebb.github.io

This repository hosts the root GitHub Pages portfolio and utilities directory for Erik Webb (served at `https://www.erikwebb.net/` and `https://erikwebb.github.io/`).

## Architecture & Constraints
- **Zero-Build Static HTML**: Keep `index.html` standalone and hand-editable (`open index.html`). Do not introduce Node.js, `package.json`, Vite, or complex build pipelines.
- **Standalone Tool Repositories**: Individual web tools (e.g. `gdpr-passport-masker`) live in their own dedicated repositories under `github.com/erikwebb/` and are mounted by GitHub Pages at `/<tool-name>/`. Do not duplicate sub-tool application source code inside this repository.
- **Tailwind Styling**: Tailwind is loaded via runtime CDN. Use only standard default palette shades (e.g., `slate-800`, `slate-900`, `slate-950`) and avoid non-existent color classes (like `slate-850`).
- **Privacy-First**: Respect the client-side privacy ethos—avoid tracking scripts, telemetry, or unnecessary external network requests.
