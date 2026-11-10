/**
 * resume-viewer.js — view-only resume pop-up
 * ---------------------------------------------------------------
 * The "View resume" button opens the PDF inside a pop-up, drawn
 * page by page as images, so there's no download or print button.
 * Uses PDF.js (js/vendor/pdfjs), loaded only when the button is clicked.
 *
 * Opened straight from your computer (file://), browsers block this,
 * so the PDF opens in a new tab instead.
 * ---------------------------------------------------------------
 */

const PDFJS_PATH = "js/vendor/pdfjs/";

const viewer = document.querySelector("#resume-viewer");
const pagesEl = viewer ? viewer.querySelector(".resume-viewer-pages") : null;
let pdfjsReady = null; // loads PDF.js once
let renderedUrl = null; // skip re-drawing if it's already shown

function loadPdfJs() {
  if (!pdfjsReady) {
    pdfjsReady = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = PDFJS_PATH + "pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_PATH + "pdf.worker.min.js";
        resolve(window.pdfjsLib);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return pdfjsReady;
}

async function renderResume(url) {
  if (renderedUrl === url) return;

  pagesEl.innerHTML = '<p class="resume-viewer-status">Loading resume…</p>';
  const pdfjsLib = await loadPdfJs();
  const pdf = await pdfjsLib.getDocument(url).promise;

  pagesEl.innerHTML = "";
  const width = pagesEl.clientWidth - 32; // inner padding
  const ratio = window.devicePixelRatio || 1;

  for (let n = 1; n <= pdf.numPages; n++) {
    const page = await pdf.getPage(n);
    const scale = width / page.getViewport({ scale: 1 }).width;
    const viewport = page.getViewport({ scale: scale * ratio });

    const canvas = document.createElement("canvas");
    canvas.className = "resume-page";
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.width = `${viewport.width / ratio}px`;
    canvas.style.setProperty("--i", n - 1);
    pagesEl.appendChild(canvas);

    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
  }

  renderedUrl = url;
}

function initResumeViewer() {
  const button = document.querySelector("[data-resume-viewer]");
  if (!button || !viewer) return;

  button.addEventListener("click", async (event) => {
    // From your computer: just open the PDF in a new tab (default link behavior)
    if (location.protocol === "file:") return;

    event.preventDefault();
    viewer.showModal();

    try {
      await renderResume(button.href);
    } catch (error) {
      // Viewer failed (very old browser, file moved…): fall back to a new tab
      viewer.close();
      window.open(button.href, "_blank", "noopener");
    }
  });

  viewer.querySelector(".resume-viewer-close").addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) viewer.close();
  });

  // No right-click "Save image as…" on the pages
  pagesEl.addEventListener("contextmenu", (event) => event.preventDefault());
}

initResumeViewer();
