/**
 * main.js — shared by every page
 * ---------------------------------------------------------------
 *  - Dark mode toggle (with circular reveal animation)
 *  - Header border on scroll
 *  - Scroll reveal for sections
 *  - Typing effect in the hero
 *  - Auto age + footer year
 * ---------------------------------------------------------------
 */

/**
 * Runs code after the entrance screen (js/intro.js) has finished,
 * or right away if there is no entrance screen this time.
 */
function whenIntroDone(callback) {
  if (!document.documentElement.classList.contains("is-intro")) return callback();
  document.addEventListener("intro:done", callback, { once: true });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Page links ---------- */
/**
 * Links between pages are written without ".html" (e.g. href="portfolio"),
 * so the live site shows clean addresses like mnathanvz.space/portfolio.
 * The server handles that (see .htaccess / vercel.json).
 *
 * When you open the files straight from your computer (file://) there's
 * no server, so this adds ".html" back to make the links work there too.
 */
function initLocalLinks() {
  if (location.protocol !== "file:") return;

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === "./" || href === "/") {
      link.setAttribute("href", "index.html");
    } else if (/^[a-z0-9-]+$/i.test(href)) {
      link.setAttribute("href", `${href}.html`); // "portfolio" → "portfolio.html"
    }
  });
}

initLocalLinks(); // runs right away, before anyone can click

/* ---------- Theme ---------- */
const THEME_KEY = "theme";

function getTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    /* storage can be blocked — the theme still changes for this visit */
  }

  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
}

function toggleTheme(event) {
  const next = getTheme() === "dark" ? "light" : "dark";

  // Older browsers or reduced motion: just switch (CSS fades the colors)
  if (!document.startViewTransition || prefersReducedMotion) {
    applyTheme(next);
    return;
  }

  // Circle grows out from the button that was clicked
  const rect = event.currentTarget.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  const transition = document.startViewTransition(() => applyTheme(next));

  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 700, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" }
    );
  });
}

function initTheme() {
  applyTheme(getTheme());
  const toggle = document.querySelector(".theme-toggle");
  if (toggle) toggle.addEventListener("click", toggleTheme);
}

/* ---------- Header ---------- */
function initHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- Typing effect ---------- */
function initTyping() {
  const el = document.querySelector("[data-typed]");
  if (!el) return;

  // Words come from the HTML: data-typed="Word one, Word two"
  const words = el.dataset.typed.split(",").map((w) => w.trim());

  if (prefersReducedMotion) {
    el.textContent = words[0];
    return;
  }

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const word = words[wordIndex];
    charIndex += deleting ? -1 : 1;
    el.textContent = word.slice(0, charIndex);

    let delay = deleting ? 45 : 90;

    if (!deleting && charIndex === word.length) {
      delay = 1800; // pause on the full word
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 350;
    }

    setTimeout(tick, delay);
  }

  whenIntroDone(() => setTimeout(tick, 1200));
}

/* ---------- Small details ---------- */
function initAge() {
  // <span data-age-from="2000-06-17"></span> shows the current age
  document.querySelectorAll("[data-age-from]").forEach((el) => {
    const birth = new Date(el.dataset.ageFrom);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const hadBirthday =
      today.getMonth() > birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
    if (!hadBirthday) age -= 1;
    el.textContent = age;
  });
}

function initYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------- Start ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initHeader();
  initReveal();
  initTyping();
  initAge();
  initYear();
});
