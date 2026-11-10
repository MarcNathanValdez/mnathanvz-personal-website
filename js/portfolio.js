/**
 * portfolio.js — builds the portfolio grid from js/data/portfolio-data.js
 * ---------------------------------------------------------------
 *  - Filter buttons (with item counts) + animated filtering
 *  - Lazy-loaded video previews
 *  - Lightbox with previous / next (buttons or arrow keys)
 * You normally don't need to edit this file — edit the data file instead.
 * ---------------------------------------------------------------
 */

const grid = document.querySelector("#work-grid");
const filtersEl = document.querySelector("#filters");
const lightbox = document.querySelector("#lightbox");

let availableItems = []; // projects whose file exists in /assets
let visibleItems = []; // items in the current filter
let currentIndex = 0; // which item the lightbox shows

const ICONS = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg>',
  web: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-3a15.7 15.7 0 0 0-1.4-4A8 8 0 0 1 18.9 8zM12 4c.8 1.1 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.9 1.9-4zM4.3 14a8 8 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4zm.8 2h3a15.7 15.7 0 0 0 1.4 4 8 8 0 0 1-4.4-4zm3-8h-3a8 8 0 0 1 4.4-4A15.7 15.7 0 0 0 8.1 8zM12 20c-.8-1.1-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.9-1.9 4zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4zm.2 6a15.7 15.7 0 0 0 1.4-4h3a8 8 0 0 1-4.4 4zm1.8-6a16.5 16.5 0 0 0 0-4h3.4a8 8 0 0 1 0 4z"/></svg>',
};

/** Turns a path from the data file into a full, safe URL */
function assetUrl(path) {
  return encodeURI(ASSET_BASE + path);
}

/* ---------- Filters ---------- */
function renderFilters() {
  const counts = availableItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const buttons = [["all", "All", availableItems.length]];
  Object.entries(CATEGORIES).forEach(([key, label]) => {
    if (counts[key]) buttons.push([key, label, counts[key]]);
  });

  filtersEl.innerHTML = buttons
    .map(
      ([key, label, count], i) =>
        `<button class="filter-btn" type="button" data-filter="${key}" aria-pressed="${key === "all"}" style="--i:${i}">
          ${label} <span class="count">${count}</span>
        </button>`
    )
    .join("");

  filtersEl.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button || button.getAttribute("aria-pressed") === "true") return;

    filtersEl.querySelectorAll(".filter-btn").forEach((b) => b.setAttribute("aria-pressed", b === button));
    changeFilter(button.dataset.filter);
  });
}

/* Old cards shrink away, then the new set animates in */
function changeFilter(filter) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return renderGrid(filter);

  grid.classList.add("is-leaving");
  setTimeout(() => {
    grid.classList.remove("is-leaving");
    renderGrid(filter);
  }, 250);
}

/* ---------- Grid ---------- */
function cardMarkup(item, index) {
  const src = assetUrl(item.src);
  let media = `<img src="${src}" alt="" loading="lazy">`;
  let badge = "";

  if (item.type === "video") {
    // data-src is swapped into src when the card scrolls into view
    media = `<video data-src="${src}#t=0.5" muted playsinline preload="metadata"></video>`;
    badge = `<span class="work-badge">${ICONS.play} Video</span>`;
  } else if (item.type === "website") {
    badge = `<span class="work-badge">${ICONS.web} Website</span>`;
  }

  return `
    <li class="work-item" style="--i:${Math.min(index, 12)}">
      <button class="work-card" type="button" data-index="${index}">
        <span class="work-thumb" data-tilt>${media}${badge}<span class="work-view">View</span></span>
        <span>
          <span class="work-title">${item.title}</span>
          <span class="work-tools">${item.type === "video" ? "" : "Made with "}${item.tools}</span>
        </span>
      </button>
    </li>`;
}

function renderGrid(filter = "all") {
  visibleItems = filter === "all" ? availableItems : availableItems.filter((item) => item.category === filter);

  if (!visibleItems.length) {
    grid.innerHTML = '<li class="empty-state">No projects to show yet.</li>';
    return;
  }

  grid.innerHTML = visibleItems.map(cardMarkup).join("");
  lazyLoadVideos();
}

function lazyLoadVideos() {
  const videos = grid.querySelectorAll("video[data-src]");

  if (!("IntersectionObserver" in window)) {
    videos.forEach((v) => (v.src = v.dataset.src));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "200px" }
  );

  videos.forEach((v) => observer.observe(v));
}

/* ---------- Lightbox ---------- */
function showItem(index, direction = 0) {
  currentIndex = (index + visibleItems.length) % visibleItems.length; // wraps around
  const item = visibleItems[currentIndex];
  const src = assetUrl(item.src);
  const media = lightbox.querySelector(".lightbox-media");

  media.innerHTML =
    item.type === "video"
      ? `<video src="${src}" controls autoplay playsinline></video>`
      : `<img src="${src}" alt="${item.title}">`;

  // Slide in from the side we're moving toward
  media.classList.remove("slide-next", "slide-prev");
  if (direction) {
    void media.offsetWidth; // restarts the animation
    media.classList.add(direction > 0 ? "slide-next" : "slide-prev");
  }

  lightbox.querySelector("h2").textContent = item.title;
  lightbox.querySelector("p").textContent = item.tools;
  lightbox.querySelector(".lightbox-counter").textContent = `${currentIndex + 1} / ${visibleItems.length}`;

  lightbox.querySelector(".lightbox-actions").innerHTML =
    item.type === "website"
      ? `<a class="btn btn-primary" href="${item.link}" target="_blank" rel="noopener">Visit website</a>`
      : `<a class="btn btn-ghost" href="${src}" target="_blank" rel="noopener">Open full size</a>`;

  // Hide arrows when there is only one item
  lightbox.querySelectorAll(".lightbox-nav").forEach((b) => (b.hidden = visibleItems.length < 2));
}

function initLightbox() {
  grid.addEventListener("click", (event) => {
    const card = event.target.closest(".work-card");
    if (!card) return;
    showItem(Number(card.dataset.index));
    lightbox.showModal();
  });

  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  lightbox.querySelector(".lightbox-nav.prev").addEventListener("click", () => showItem(currentIndex - 1, -1));
  lightbox.querySelector(".lightbox-nav.next").addEventListener("click", () => showItem(currentIndex + 1, 1));

  // Arrow keys move between projects
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showItem(currentIndex - 1, -1);
    if (event.key === "ArrowRight") showItem(currentIndex + 1, 1);
  });

  // Click on the dark backdrop closes it
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });

  // Stop any playing video when the lightbox closes
  lightbox.addEventListener("close", () => {
    lightbox.querySelector(".lightbox-media").innerHTML = "";
  });
}

/* ---------- Start ---------- */

// Only show projects whose file is still in /assets (see js/file-check.js).
// Delete a file and its project disappears — filters and counts update too.
async function start() {
  grid.innerHTML = '<li class="empty-state">Loading projects…</li>';

  const checks = await Promise.all(PORTFOLIO_ITEMS.map((item) => fileExists(ASSET_BASE + item.src)));
  availableItems = PORTFOLIO_ITEMS.filter((item, i) => checks[i]);

  const missing = PORTFOLIO_ITEMS.length - availableItems.length;
  if (missing) console.info(`${missing} portfolio file(s) not found in /assets, so they are hidden.`);

  renderFilters();
  renderGrid();
  initLightbox();
}

start();
