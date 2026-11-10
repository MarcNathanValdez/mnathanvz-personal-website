# MNATHANVZ portfolio

Plain HTML, CSS and JavaScript — no build tools. Open `index.html` in a browser to preview.

## Files

```
index.html                 Home (hero + about + tools + certifications)
portfolio.html             Portfolio grid with filters and pop-up viewer
contact.html               Contact details + message form
css/style.css              All styles. Colors and fonts are at the top (section 1)
js/main.js                 Dark mode, scroll reveal, typing effect, age, year
js/animations.js           Page transitions, scroll bar, back-to-top, text scramble, tilt, ripple
js/code-effects.js         Floating code symbols + self-typing code editor
js/portfolio.js            Builds the portfolio grid (you rarely need to touch this)
js/data/portfolio-data.js  YOUR PROJECT LIST — edit this to add/remove work
js/contact.js              Contact form behavior
js/file-check.js           Hides anything whose file was deleted from /assets
download-assets.ps1        Windows: downloads all your files into /assets
download-assets.sh         Mac/Linux: same thing

assets/
  images/
    logo/                    logo.svg, logo.png
    profile/                 profile-img.png
    graphic-design/
      social-media/
      email-templates/
      edited-photos/
      flowcharts/
      logos/
    websites/                website screenshots
  videos/
    pspace/
    zens-informative-tv-show/
    adapot-vlog/
    inner-sparc-realty/
    rove-chem-trading/
  documents/
    resume/                  Marc-Nathaniel-Valdez-CV.pdf
    certificates/            certificate PDFs
```

## First step: fill the /assets folders

Run the download script once. It copies every image, video and certificate
from www.mnathanvz.online into the right folder (about 70 files).

- **Windows:** right-click `download-assets.ps1` > Run with PowerShell
- **Mac/Linux:** `bash download-assets.sh`

You can run it again any time; files you already have are skipped.

## Deleting work

Delete the file from `assets/` (on your computer and on your server) and the site stops showing it:
the portfolio project, filter count, certificate, resume button or profile photo disappears automatically.
You don't have to edit any code. The line in `js/data/portfolio-data.js` can stay; it's simply skipped.

## Common edits

- **Add a project:** put the file in the matching `assets` folder, then in `js/data/portfolio-data.js` copy one line and change title/tools/src (e.g. `src: SOCIAL + "new-poster.png"`).
- **Add a certificate:** put the PDF in `assets/documents/certificates/` and add an `<li>` to the certificates list in `index.html`.
- **Change colors:** `css/style.css`, section 1. Light theme in `:root`, dark in `[data-theme="dark"]`.
- **Update your resume:** replace `assets/documents/resume/Marc-Nathaniel-Valdez-CV.pdf` with the new file (same name).
- **Change the code in the editor animation:** edit `CODE_SAMPLE` at the top of `js/code-effects.js`.
- **Animate a heading with the scramble effect:** add `data-scramble` to it.
- **Make something tilt on hover:** add `data-tilt` to it.
- **Make a list appear item by item:** add the class `stagger` to it.
- **Change the typing words:** in `index.html`, edit `data-typed="..."` (comma separated).
- **Add a certificate or tool:** add an `<li>` in the matching list in `index.html`.

## Uploading to your server

Upload the whole folder, including `assets/`. Every path is relative, so it works on any host.

Optional: set `FORM_ENDPOINT` in `js/contact.js` (e.g. Formspree) so messages arrive without opening an email app.
