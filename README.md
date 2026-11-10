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

The core playground runs without an LLM. Optional model experiments are described below; this app does not reproduce the research benchmarks.

## Publishing and future iterations

This GitHub repository is the canonical source. For every completed iteration, validate the JavaScript, commit and push the changes to `main`, and verify both the **Validate Weightspace Lab** GitHub Actions workflow and the Cloudflare Pages deployment. Cloudflare's GitHub integration automatically deploys each push to `main`, keeping the repository and live app in sync without ChatGPT hosting.

Cloudflare Pages project: `weightspacelab`; framework: None; production branch: `main`; output directory: `dist`; build command: `node --check dist/app.js && node --check dist/experiments.js && node --test tests/*.test.cjs`. A failed validation prevents deployment. Preview URL: https://weightspacelab.pages.dev.

DNS: CNAME `weightspacelab` → `weightspacelab.pages.dev` (proxied). The custom domain is associated with the Cloudflare Pages project, which manages HTTPS certificates. GitHub Actions performs validation only.

## Model experiments (v0.2)

The experiment workspace adds three small-network tasks: identify a shuffled mystery network, repair a snapshot of the current network, and construct weights from zero for the selected pattern. There are three connection modes:

1. **Manual exchange:** prepare and copy the exact prompt, send it to any model you choose, and paste its JSON answer.
2. **Cloud API / your own key:** enter a trusted, browser-compatible chat-completions endpoint and model ID. The key stays in memory and goes only to that endpoint. The provider must allow browser CORS requests; the app does not bypass provider restrictions or proxy keys.
3. **Local model:** use a loopback server exposing `/v1/chat/completions`, such as a configured Ollama instance. Enter an installed model name. The server must allow the app's origin; browser local-network access restrictions may require serving this app locally. There is no bundled model and no automatic model download.

Model calls require HTTPS or a localhost app origin. Manual exchange also works over HTTP. Responses must be JSON, not executable code. Numerical proposals are shape/range validated, scored on 1,024 seeded random points, and applied only after explicit review. Run exports include the prompt, response, initial weights, seed, and results, but never API keys.

The evaluator supports only the three built-in target patterns and the 2→4→1 network. Extra natural-language instructions guide the model but do not change the target evaluator. Reading is a three-family identification test, not arbitrary checkpoint interpretation. Qwen/game experiments and research benchmarks are not implemented.

Run verification with `node --test tests/*.test.cjs`.
