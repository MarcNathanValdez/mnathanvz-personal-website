/**
 * file-check.js — hides anything whose file was deleted
 * ---------------------------------------------------------------
 * Delete a file from /assets and the site stops showing it:
 *  - portfolio projects (checked in js/portfolio.js)
 *  - any element with  data-file="path/to/file"
 *    (certificates, the resume button, the profile photo)
 *
 * Nothing to edit here — just add or delete files in /assets.
 * ---------------------------------------------------------------
 */

const ON_SERVER = location.protocol.startsWith("http");

/** Resolves to true if the file is there, false if it was deleted */
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

  // PDFs can't be checked from file://, so they're shown
  return Promise.resolve(true);
}

/** Removes every [data-file] element whose file is missing */
function hideMissingFiles() {
  document.querySelectorAll("[data-file]").forEach((el) => {
    fileExists(el.dataset.file).then((exists) => {
      if (!exists) el.remove();
    });
  });
}

hideMissingFiles();
