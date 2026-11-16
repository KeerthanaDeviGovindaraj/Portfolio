# Keerthana Devi Govindaraj, Portfolio

Personal portfolio of Keerthana Devi Govindaraj, full stack software engineer and M.S. Software Engineering Systems student at Northeastern University.

**Live:** https://keerthanadevigovindaraj.github.io/Portfolio/

**Also on Netlify:** https://keerthanadevigportfolio.netlify.app (older copy, it can lag behind)

The site tells one story: software that shows its work. It covers the path from electronics to machine learning to full stack engineering, an evidence-based tech stack (every technology is paired with the projects that prove it), work experience, and selected projects.

## Built with

- Plain HTML, CSS and JavaScript. No framework and no build step.
- Fraunces (display), Inter (body) and JetBrains Mono (labels) from Google Fonts.
- Hosted on GitHub Pages, with a Netlify copy. Both publish from `main`, and both work because every asset path is relative.
- GitHub Pages is the main link because it has no credit limit. Netlify's free plan pauses production deploys when its monthly credits run out, so that copy can fall behind.

## Details

- Editorial beige palette with a clay accent, plus a dark mode that remembers your choice.
- Scroll reveals use `IntersectionObserver`. Animations and the cursor-follow dot switch off for visitors who prefer reduced motion, and the dot only appears on pointer devices.
- Responsive down to small phones, with a slide-in menu on mobile.

## Structure

```
index.html   the whole site, one page
style.css    design tokens, layout, dark mode, responsive rules
script.js    menu, theme toggle, reveals, active nav link, cursor dot
img/         favicons and icons
resume/      LaTeX source and compiled PDF of the resume
Keerthana_Devi_Govindaraj_Resume-SDE.pdf   the PDF the site links to
```

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Rebuild the resume

```bash
cd resume
pdflatex resume.tex && pdflatex resume.tex
cp resume.pdf ../Keerthana_Devi_Govindaraj_Resume-SDE.pdf
```

## Contact

- Email: govindaraj.ke@northeastern.edu
- LinkedIn: https://www.linkedin.com/in/keerthanadevig28062002/
- GitHub: https://github.com/KeerthanaDeviGovindaraj
