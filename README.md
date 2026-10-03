# Killian — developer portfolio

A portfolio for Killian, featuring his independently designed and implemented Particle Life Simulation. Plain HTML, CSS and JavaScript, with no paid tooling, runtime dependencies or build step.

Target URL: **https://DufusLupus.github.io/**

## Local development

Open `index.html` directly in a browser, or use the included local server with Node.js (no package installation required):

```sh
node scripts/serve.mjs
```

Visit http://127.0.0.1:4173. Stop the server with Ctrl+C. Edit `index.html`, `particle-life.html`, `styles.css` or `script.js` and refresh. The server binds only to localhost and serves HTML/CSS/JS/SVG/MP4 assets.

## GitHub Pages deployment

This workspace was already an empty Git repository with `origin` pointing to `https://github.com/dufuslupus/dufuslupus.github.io.git`. The portfolio is separate from Particle Sim.

1. Use a public repository named **dufuslupus.github.io**, owned by **DufusLupus**. If the configured remote already exists, use it; otherwise create an empty repository with that name on GitHub. A public repository can use GitHub Pages on the free plan. See [GitHub's Pages setup documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).
2. Commit and push the files:

   ```sh
   git add .
   git commit -m "Build Killian's developer portfolio"
   git push -u origin main
   ```

3. In the repository, go to **Settings → Pages**. Select **Deploy from a branch**, branch **main**, folder **/ (root)**, then save.
4. Wait for GitHub's Pages deployment to finish and visit https://DufusLupus.github.io/.

`.nojekyll` serves the files as a static site. No custom domain, GitHub Actions configuration, secret, subscription or build service is needed. Changes deploy when pushed to `main`. Repository creation, pushing and enabling Pages are not performed by these files.

## Content and design

- Introduction: self-taught software engineer; evidence through independent project work.
- Featured project: Particle Life, with GitHub/source links.
- Particle Life story: origin, visual evolution timeline, getting it parallel, runtime settings, lessons, benchmarking rebuild and WebGPU plans.
- Architecture: ordered frame pipeline and an interactive count → prefix sum → scatter explanation.
- General home page with an about section, future CV and additional-project placeholders.

The featured video is a recording from the Particle Sim README, stored locally as `assets/particle-life.mp4` (about 1.4 MB). Native video controls, muted playback, inline playback and metadata-only preloading keep it usable without automatically playing or downloading the whole recording. The grid example uses explanatory data rather than executing the engine. Neither requires SharedArrayBuffer or cross-origin isolation. No changes were made to the original project.

System fonts, responsive layouts, a skip link, visible keyboard focus, semantic headings, reduced-motion support and native buttons keep the page accessible and lightweight. The full written case study and source links work without JavaScript; JavaScript adds the grid-stage controls. The video works without JavaScript.

## Pages

- `index.html`: general introduction, featured project, about, future projects and CV placeholder.
- `particle-life.html`: dedicated project story, architecture and interactive grid explanation.

## Updating the portfolio

- **CV:** add a PDF, then replace the placeholder with a descriptive download link. Do not expose a download button until the file exists.
- **Projects:** replace the future-project placeholder with an actual case study and source links.
- **Contact:** GitHub is the supplied contact channel. Add an email only when Killian provides one.
- **Video:** the recording comes from https://github.com/user-attachments/assets/b621fb14-c8b5-4157-82b7-b56a4f75bf6d. Replace `assets/particle-life.mp4` if you want to use a newer capture.

## Verification

Run `node --check script.js` and `node --check scripts/serve.mjs`. Preview both pages at desktop and mobile sizes; check for overflow, test all grid-stage buttons, follow source links, navigate with a keyboard and confirm the CV remains clearly marked as unavailable. Disable JavaScript to check core content. No test framework or package installation is required.

The two-page update passed headless Chromium checks at viewport widths 1440, 1289, 768, 390 and 320 pixels: no horizontal overflow, working prefix-sum/scatter controls, no JavaScript errors, keyboard access to the skip link, and readable core content with pinned source links when JavaScript is disabled. Home and project desktop screenshots and desktop/mobile timeline screenshots were visually reviewed. Navigation between pages and playback of the actual simulation recording also passed. Browser checks used an already installed Playwright copy outside this repository; it is not a portfolio dependency. Both JavaScript syntax checks passed. The site is published through GitHub Pages.
