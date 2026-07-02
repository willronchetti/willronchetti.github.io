# willronchetti.github.io

Source for my personal site — [willronchetti.github.io](https://willronchetti.github.io).

A single-page portfolio for a back-end / infrastructure engineer, styled as an
**engineering schematic on drafting paper** — a warm grid, hairline rules, a data-pipeline
diagram, and plate-numbered sections. Hand-tuned static **HTML / CSS / JS** — no frameworks,
no build step. Committing to `master` deploys it directly via GitHub Pages.

## Structure

```
index.html       # the whole site (hero, about, experience, work, education, off-hours, contact)
css/style.css    # design system: drafting-paper theme, CSS custom properties, responsive
js/main.js       # vanilla JS: mobile nav, hero role rotator, count-up gauges, scroll-reveal
images/          # downloadable résumé PDF
```

## Local preview

No tooling required — open `index.html` directly, or serve it to mimic GitHub Pages:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## A note on the UI

The visual design and front-end were built with the help of AI tooling — a deliberate
experiment in augmenting my skills into a domain outside my day-to-day. The engineering
work the site describes is entirely my own.

## License

[MIT](LICENSE).
