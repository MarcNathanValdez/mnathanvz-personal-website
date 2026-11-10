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

/**
 * Reads a YouTube link (playlist, video, youtu.be, shorts) and returns
 * { embed, watch, thumb } — or null if the link isn't recognized.
 */
function parseYouTube(link) {
  if (!link) return null;
  let url;
  try {
    url = new URL(link);
  } catch (error) {
    return null;
  }

  const list = url.searchParams.get("list");
  let video = url.searchParams.get("v");
  if (url.hostname === "youtu.be") video = url.pathname.slice(1);
  const shorts = url.pathname.match(/^\/(shorts|embed)\/([\w-]+)/);
  if (shorts) video = shorts[2];

  if (list) {
    return {
      embed: `https://www.youtube-nocookie.com/embed/videoseries?list=${list}`,
      watch: `https://www.youtube.com/playlist?list=${list}`,
      thumb: video ? `https://i.ytimg.com/vi/${video}/hqdefault.jpg` : "",
    };
  }
  if (video) {
    return {
      embed: `https://www.youtube-nocookie.com/embed/${video}`,
      watch: `https://www.youtube.com/watch?v=${video}`,
      thumb: `https://i.ytimg.com/vi/${video}/hqdefault.jpg`,
    };
  }
  return null;
}

const ICONS = {
  youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15.1V8.9L15.3 12z"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg>',
  web: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-3a15.7 15.7 0 0 0-1.4-4A8 8 0 0 1 18.9 8zM12 4c.8 1.1 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.9 1.9-4zM4.3 14a8 8 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4zm.8 2h3a15.7 15.7 0 0 0 1.4 4 8 8 0 0 1-4.4-4zm3-8h-3a8 8 0 0 1 4.4-4A15.7 15.7 0 0 0 8.1 8zM12 20c-.8-1.1-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.9-1.9 4zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4zm.2 6a15.7 15.7 0 0 0 1.4-4h3a8 8 0 0 1-4.4 4zm1.8-6a16.5 16.5 0 0 0 0-4h3.4a8 8 0 0 1 0 4z"/></svg>',
};

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
  const src = item.url;
  let media = `<img src="${src}" alt="" loading="lazy">`;
  let badge = "";

  if (item.type === "youtube") {
    media = item.yt.thumb
      ? `<img src="${item.yt.thumb}" alt="" loading="lazy">`
      : `<span class="yt-tile">${ICONS.youtube}<span>${item.title}</span></span>`;
    badge = `<span class="work-badge">${ICONS.youtube} YouTube</span>`;
  } else if (item.type === "video") {
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
          ${item.tools ? `<span class="work-tools">${item.type === "image" || item.type === "website" ? "Made with " : ""}${item.tools}</span>` : ""}
        </span>
      </button>
    </li>`;
}

/* Note with the YouTube links, shown for "All" and "Long-form video" */
function renderYouTubeNote(filter) {
  const note = document.querySelector("#youtube-note");
  const playlists = availableItems.filter((item) => item.type === "youtube");
  const show = typeof YOUTUBE_NOTE !== "undefined" && (filter === "all" || filter === "longVideo");

  if (!note || !show) {
    if (note) note.hidden = true;
    return;
  }

  const links = playlists
    .map((item) => `<li><a href="${item.yt.watch}" target="_blank" rel="noopener">${item.title}</a></li>`)
    .join("");

  note.innerHTML = `
    <span class="youtube-note-icon">${ICONS.youtube}</span>
    <div>
      <p>${YOUTUBE_NOTE.text}
        Watch them on <a href="${YOUTUBE_NOTE.channelLink}" target="_blank" rel="noopener">${YOUTUBE_NOTE.channelName}</a>.</p>
      ${links ? `<ul>${links}</ul>` : ""}
    </div>`;
  note.hidden = false;
}

function renderGrid(filter = "all") {
  renderYouTubeNote(filter);
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

/** Button text for a project link, based on where it goes */
function linkLabel(link) {
  if (/facebook\.com|fb\.com/i.test(link)) return "View on Facebook";
  if (/instagram\.com/i.test(link)) return "View on Instagram";
  return "Visit website";
}
function showItem(index, direction = 0) {
  currentIndex = (index + visibleItems.length) % visibleItems.length; // wraps around
  const item = visibleItems[currentIndex];
  const src = item.url;
  const media = lightbox.querySelector(".lightbox-media");

  if (item.type === "youtube") {
    media.innerHTML = `<div class="yt-frame"><iframe src="${item.yt.embed}" title="${item.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
  } else if (item.type === "video") {
    media.innerHTML = `<video src="${src}" controls autoplay playsinline></video>`;
  } else {
    media.innerHTML = `<img src="${src}" alt="${item.title}">`;
  }

  // Slide in from the side we're moving toward
  media.classList.remove("slide-next", "slide-prev");
  if (direction) {
    void media.offsetWidth; // restarts the animation
    media.classList.add(direction > 0 ? "slide-next" : "slide-prev");
  }

  lightbox.querySelector("h2").textContent = item.title;
  lightbox.querySelector("p").textContent = item.tools ? `${item.type === "image" ? "Made with " : ""}${item.tools}` : "";
  lightbox.querySelector(".lightbox-counter").textContent = `${currentIndex + 1} / ${visibleItems.length}`;

  let action = `<a class="btn btn-ghost" href="${src}" target="_blank" rel="noopener">Open full size</a>`;
  if (item.type === "website") {
    action = `<a class="btn btn-primary" href="${item.link}" target="_blank" rel="noopener">Visit website</a>`;
  } else if (item.type === "youtube") {
    action = `<a class="btn btn-primary" href="${item.yt.watch}" target="_blank" rel="noopener">Watch on YouTube</a>`;
  } else if (item.link) {
    // Optional project link (Facebook post, client website…)
    action += `<a class="btn btn-primary" href="${item.link}" target="_blank" rel="noopener">${linkLabel(item.link)}</a>`;
  }
  lightbox.querySelector(".lightbox-actions").innerHTML = action;

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

// Find each project's file (see js/file-check.js). Projects with no file
// are hidden, and the filters and counts update to match.
async function start() {
  grid.innerHTML = '<li class="empty-state">Loading projects…</li>';

  const urls = await Promise.all(
    PORTFOLIO_ITEMS.map((item) => {
      if (item.type !== "youtube") return findFile(ASSET_BASE + item.src);
      const yt = parseYouTube(item.youtube); // YouTube: no file to check, just a valid link
      item.yt = yt;
      return yt ? yt.embed : null;
    })
  );
  availableItems = PORTFOLIO_ITEMS.map((item, i) => ({ ...item, url: urls[i] })).filter((item) => item.url);

  const missing = PORTFOLIO_ITEMS.length - availableItems.length;
  if (missing) console.info(`${missing} portfolio file(s) not found, so they are hidden.`);

  renderFilters();
  renderGrid();
  initLightbox();
}

start();
