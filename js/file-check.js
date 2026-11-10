/**
 * file-check.js — finds each file, or hides it if it's gone
 * ---------------------------------------------------------------
 * For every project, certificate, resume and photo:
 *  1. If the file is in /assets, it's used from there.
 *  2. If not, and USE_LIVE_SITE_COPIES is true, the copy on
 *     www.mnathanvz.online is used (list in js/data/live-site-files.js).
 *  3. Otherwise it's hidden from the site.
 *
 * After you run download-assets (all files are in /assets),
 * set USE_LIVE_SITE_COPIES to false. From then on, deleting a
 * file from /assets removes it from the website.
 * ---------------------------------------------------------------
 */

const USE_LIVE_SITE_COPIES = true;

const ON_SERVER = location.protocol.startsWith("http");

/** Resolves to true if the file is in /assets */
function fileExists(path) {
  const url = encodeURI(path);

  // On a real server: ask for the file's headers only (fast, no download)
  if (ON_SERVER) {
    return fetch(url, { method: "HEAD", cache: "no-store" })
      .then((response) => response.ok || response.status === 405)
      .catch(() => false);
  }

  // Opened from your computer (file://): try loading images and videos
  const ext = path.split(".").pop().toLowerCase();

  if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext)) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  if (["mp4", "webm", "mov"].includes(ext)) {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => resolve(true);
      video.onerror = () => resolve(false);
      setTimeout(() => resolve(true), 8000); // slow file: assume it's there
      video.src = url;
    });
  }

  // PDFs can't be checked from file://, so they count as present
  return Promise.resolve(true);
}

/**
 * Resolves to the address to load the file from,
 * or null if it should be hidden.
 */
async function findFile(path) {
  if (await fileExists(path)) return encodeURI(path);

  const backup = typeof LIVE_SITE_FILES !== "undefined" ? LIVE_SITE_FILES[path] : null;
  if (USE_LIVE_SITE_COPIES && backup) return backup;

  return null;
}

/**
 * Handles every element with  data-file="path":
 * points its link/image to wherever the file was found, or removes it.
 */
function resolveFileElements() {
  document.querySelectorAll("[data-file]").forEach(async (el) => {
    const path = el.dataset.file;
    const url = await findFile(path);

    if (!url) {
      el.remove();
      return;
    }

    // Update the element itself and any link/image inside it
    [el, ...el.querySelectorAll("a, img")].forEach((node) => {
      if (node.hasAttribute("href")) node.setAttribute("href", url);
      if (node.tagName === "IMG") node.setAttribute("src", url);
    });
  });
}

resolveFileElements();
