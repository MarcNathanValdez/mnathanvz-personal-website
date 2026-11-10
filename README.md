# MNATHANVZ portfolio

Plain HTML, CSS and JavaScript — no build tools. Open `index.html` in a browser to preview.

## Files

```
index.html                 Home (hero + about + tools + certifications)
portfolio.html             Portfolio grid with filters and pop-up viewer
contact.html               Contact details + message form
css/style.css              All styles. Colors and fonts are at the top (section 1)
js/main.js                 Dark mode, scroll reveal, typing effect, age, year
js/intro.js                Logo entrance screen — once per visit
js/intro-sound.js          Entrance sound effects (made in the browser, no audio files)
js/animations.js           Page transitions, scroll bar, back-to-top, text scramble, tilt, ripple
js/code-effects.js         Floating code symbols + self-typing code editor
js/portfolio.js            Builds the portfolio grid (you rarely need to touch this)
js/data/portfolio-data.js  YOUR PROJECT LIST — edit this to add/remove work
js/contact.js              Contact form behavior
js/mascot.js               “Bit”, the little robot that walks along the bottom of every page
js/resume-viewer.js        View-only resume pop-up (no download button)
js/vendor/pdfjs/           PDF.js, draws the resume pages (don't edit)
js/file-check.js           Finds each file in /assets (or the live-site copy), hides it if gone
js/data/live-site-files.js Addresses of the copies on www.mnathanvz.online
.htaccess                  Clean page addresses on Apache hosting (no .html)
vercel.json                Clean page addresses on Vercel
download-assets.bat        Windows: double-click to download all your files into /assets
download-assets.ps1        (the script the .bat runs)
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
    apex-clips-media/
  documents/
    resume/                  Marc-Nathaniel-Valdez-CV.pdf
    certificates/            certificate PDFs
```

## First step: fill the /assets folders

Run the download script once. It copies every image, video and certificate
from www.mnathanvz.online into the right folder (about 70 files).

- **Windows:** double-click `download-assets.bat`
- **Mac/Linux:** `bash download-assets.sh`

You can run it again any time; files you already have are skipped.

Until then, nothing is missing on the site: any file not in `/assets` yet loads
from your current live site instead. Once the download is done, open
`js/file-check.js` and set `USE_LIVE_SITE_COPIES = false;` so that deleting a
file from `/assets` removes it from the website.

## Deleting work

With `USE_LIVE_SITE_COPIES = false` in `js/file-check.js`, delete the file from `assets/` (on your computer and on your server) and the site stops showing it:
the portfolio project, filter count, certificate, resume button or profile photo disappears automatically.
You don't have to edit any code. The line in `js/data/portfolio-data.js` can stay; it's simply skipped.

## Common edits

- **Add a project:** put the file in the matching `assets` folder, then in `js/data/portfolio-data.js` copy one line and change title/tools/src (e.g. `src: SOCIAL + "new-poster.png"`).
- **Add a link to a project:** add `link: "https://…"` to its line in `js/data/portfolio-data.js`. The pop-up shows a "View on Facebook" or "Visit website" button.
- **Add a YouTube playlist or video:** in `js/data/portfolio-data.js`, paste its link into `youtube: ""` (copy it from YouTube's address bar or Share button). Projects with an empty link stay hidden. The note above the Long-form videos lists every YouTube link automatically; its text is `YOUTUBE_NOTE` in the same file.
- **Add a certificate:** put the PDF in `assets/documents/certificates/` and add an `<li>` to the certificates list in `index.html`.
- **Change colors:** `css/style.css`, section 1. Light theme in `:root`, dark in `[data-theme="dark"]`.
- **Update your resume:** replace `assets/documents/resume/Marc-Nathaniel-Valdez-CV.pdf` with the new file (same name). The View resume button shows it in a view-only pop-up on the live site; opened from your computer, it opens in a new tab instead.
- **Change the code in the editor animation:** edit `CODE_SAMPLE` at the top of `js/code-effects.js`.
- **Animate a heading with the scramble effect:** add `data-scramble` to it.
- **Make something tilt on hover:** add `data-tilt` to it.
- **Make a list appear item by item:** add the class `stagger` to it.
- **Change the entrance screen:** timing and motion are in `css/style.css` section 16; how long it stays is `INTRO_DURATION` in `js/intro.js`. To see it again, close the tab and reopen the site.
- **Entrance sound:** change `VOLUME` at the top of `js/intro-sound.js` (0 = silent, 1 = loud).
- **Edit the About text, skill cards or FAQ:** all in `index.html` (search for `ABOUT` or `FAQ`). Copy an `<li class="skill-card">` or a `<details class="faq-item">` block to add one.
- **The robot (Bit):** its lines are at the top of `js/mascot.js` (`teases` and `reactions`). Set `enabled: false` there to remove it. `hidingSpots` sets where it hides and peeks out, and `peekChance` how often.
- **Change the typing words:** in `index.html`, edit `data-typed="..."` (comma separated).
- **Add a certificate or tool:** add an `<li>` in the matching list in `index.html`.

## Clean page addresses (no .html)

Links between pages are written as `portfolio` and `contact` (not `portfolio.html`),
so the live site shows mnathanvz.space/portfolio. How that works depends on your host:

- **Apache hosting (Hostinger, cPanel, most shared hosting):** upload `.htaccess` with the site. It's already set up.
- **Vercel:** `vercel.json` handles it.
- **Netlify, Cloudflare Pages, GitHub Pages:** works automatically, nothing to do.
- **Nginx:** add `try_files $uri $uri.html $uri/ =404;` to the site's `location /` block.

Old addresses like /portfolio.html redirect to /portfolio, so existing links keep working.
When you open the files from your computer, `js/main.js` adds `.html` back so the links still work.

To add a new page (e.g. `about.html`), link to it as `href="about"`.

## Uploading to your server

Upload the whole folder, including `assets/`. Every path is relative, so it works on any host.

Optional: set `FORM_ENDPOINT` in `js/contact.js` (e.g. Formspree) so messages arrive without opening an email app.
