/**
 * animations.js — extra animations used on every page
 * ---------------------------------------------------------------
 *  1. Page transitions (fade out when you click a link)
 *  2. Scroll progress bar
 *  3. Back-to-top button
 *  4. Text scramble on headings with  data-scramble
 *  5. Staggered lists: children of  .stagger  appear one by one
 *  6. 3D tilt on elements with  data-tilt
 *  7. Ripple when a button is clicked
 *
 * Every effect turns off for people who choose "reduce motion".
 * ---------------------------------------------------------------
 */

const motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- 1. Page transitions ---------- */
function initPageTransitions() {
  if (motionOff) return;

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;

    const url = new URL(link.href, location.href);
    const lastPart = url.pathname.split("/").pop();
    const isPage = !lastPart.includes(".") || lastPart.endsWith(".html"); // "portfolio", "", "contact.html"
    const isInternalPage =
      url.origin === location.origin &&
      url.pathname !== location.pathname &&
      !link.target &&
      !link.hasAttribute("download") &&
      isPage;

    // Let new tabs, downloads and modifier-clicks work normally
    if (!isInternalPage || event.metaKey || event.ctrlKey || event.shiftKey) return;

    event.preventDefault();
    document.body.classList.add("is-leaving");
    setTimeout(() => (location.href = link.href), 280);
  });

  // Coming back with the browser's Back button: show the page again
  window.addEventListener("pageshow", () => document.body.classList.remove("is-leaving"));
}

/* ---------- 2 + 3. Scroll progress + back to top ---------- */
function initScrollUI() {
  const bar = document.querySelector(".scroll-progress");
  const topButton = document.querySelector(".back-to-top");

  function update() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const progress = max > 0 ? scrollY / max : 0;
    if (bar) bar.style.transform = `scaleX(${progress})`;
    if (topButton) topButton.classList.toggle("is-visible", scrollY > 600);
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  if (topButton) {
    topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: motionOff ? "auto" : "smooth" }));
  }
}

/* ---------- 4. Text scramble ---------- */
const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#01";

function scramble(el) {
  const finalText = el.textContent.trim();
  el.setAttribute("aria-label", finalText); // screen readers read the real text
  if (motionOff) return;

  // Wrap each word in a box locked to its final width,
  // so the heading doesn't jump while the letters change
  el.innerHTML = finalText
    .split(" ")
    .map((word) => `<span class="scramble-word" aria-hidden="true">${word}</span>`)
    .join(" ");
  const words = [...el.querySelectorAll(".scramble-word")].map((span) => {
    span.style.width = `${span.getBoundingClientRect().width}px`;
    return { span, text: span.textContent };
  });

  const total = finalText.replace(/ /g, "").length;
  const duration = 1100; // ms
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    let settled = Math.floor(progress * total);

    words.forEach(({ span, text }) => {
      span.textContent = [...text]
        .map((char) => (settled-- > 0 ? char : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]))
        .join("");
    });

    if (progress < 1) requestAnimationFrame(frame);
    else el.textContent = finalText;
  }

  requestAnimationFrame(frame);
}

function initScramble() {
  // Wait for the web font, so the word widths are measured correctly
  const ready = document.fonts ? document.fonts.ready : Promise.resolve();
  ready.then(() => {
    whenIntroDone(() => {
      document.querySelectorAll("[data-scramble]").forEach((el) => setTimeout(() => scramble(el), 150));
    });
  });
}

/* ---------- 5. Staggered lists ---------- */
function initStagger() {
  document.querySelectorAll(".stagger").forEach((list) => {
    [...list.children].forEach((child, i) => child.style.setProperty("--i", i));

    // Lists that aren't .reveal themselves wait for their parent .reveal
    const trigger = list.classList.contains("reveal") ? list : list.closest(".reveal");
    if (!trigger) list.classList.add("is-visible");
  });
}

/* ---------- 6. 3D tilt ---------- */
function initTilt() {
  if (motionOff || !canHover) return;

  // One listener for the whole page, so cards added later (portfolio) also tilt
  document.addEventListener("pointermove", (event) => {
    const el = event.target.closest("[data-tilt]");
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5; // -0.5 … 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    el.style.setProperty("--tilt-x", `${(-y * 10).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
    el.style.setProperty("--shine-x", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--shine-y", `${(y + 0.5) * 100}%`);
    el.classList.add("is-tilting");
  });

  document.addEventListener("pointerout", (event) => {
    const el = event.target.closest("[data-tilt]");
    if (el && !el.contains(event.relatedTarget)) {
      el.classList.remove("is-tilting");
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    }
  });
}

/* ---------- 7. Button ripple ---------- */
function initRipple() {
  if (motionOff) return;

  document.addEventListener("pointerdown", (event) => {
    const button = event.target.closest(".btn, .filter-btn");
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement("span");

    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    button.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
}

/* ---------- Start ---------- */
initPageTransitions();
initScrollUI();
initScramble();
initStagger();
initTilt();
initRipple();
