# Rushikesh Wavekar — Architect

Portfolio website. Static HTML/CSS/JS, no build step, ready for GitHub Pages.

## Pages
- `index.html` — home: hero, profile, experience, education, process, selected projects, tools, stats
- `work.html` — project catalogue with **Grid / List / Gallery** views and type filters
- `project.html?p=<slug>` — project detail with **Detail / Masonry / Slider** layouts and a lightbox
- `about.html` — profile, experience, freelance, education, skills and tools

## Editing content
All text lives in `js/data.js`: profile, experience, education, tools, and the `PROJECTS` list.
Images are in `assets/img/`. If you add one, also add its `[width, height]` to `SIZES` at the top of `data.js`.

## Publish on GitHub Pages
1. Create a repository named `<username>.github.io` (or any name).
2. Upload the contents of this folder to the repository root.
3. In **Settings → Pages**, set Source to *Deploy from a branch*, branch `main`, folder `/ (root)`.
4. The site goes live at `https://<username>.github.io/` a minute later.

## Credits
- Smooth scrolling: [Lenis](https://github.com/darkroomengineering/lenis)
- Fonts: Inter Tight and Newsreader (Google Fonts)
- ICONIQA photographs © 2025 ICONIQA Hotels and Resorts by Royal Orchid Hotels
