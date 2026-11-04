# Weightspace Lab

An independent, browser-based playground for inspecting and editing a small neural network. Inspired by [Weight-Space Programming](https://rikiyat.github.io/blog/weight-space-programming/) by Rikiya Takehi and collaborators.

Live site: https://weightspacelab.fueldeskpro.com

## Run locally

```sh
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173. No API key, ChatGPT account, backend, or build dependencies are needed. Google Fonts is an optional typography dependency with local font fallbacks.

## Features

- Three hand-crafted classifiers: diagonal, band, and XOR.
- Live editing of all 17 parameters with browser-side inference.
- Fixed-grid behavior evaluation and JSON weight export.

This educational demo uses no LLM and does not reproduce the research benchmarks.

## Publishing and future iterations

This GitHub repository is the canonical source. For every completed iteration, validate the JavaScript, commit and push the changes to `main`, and verify that the **Deploy Weightspace Lab** GitHub Actions workflow succeeds. Every push deploys `dist/` to GitHub Pages and updates the custom domain automatically. Keep the repository and live app in sync through this workflow; no ChatGPT hosting is required.

DNS: CNAME `weightspacelab` → `merolaagi.github.io` (DNS only). The custom domain is also configured in the repository's Pages settings.
