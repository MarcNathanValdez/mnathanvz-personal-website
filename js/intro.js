/**
 * intro.js — logo entrance when someone opens the website
 * ---------------------------------------------------------------
 * Plays once per visit (until the browser tab is closed):
 *  1. Three pieces of the logo fly in and lock together
 *  2. An impact ring, an outline trace and a shine sweep
 *  3. The MNATHANVZ letters drop in one by one
 *  4. The logo flies up into the header and the page appears
 *
 * Visitors can click "Skip" or press any key.
 * The animation timing lives in css/style.css (section 16).
 * ---------------------------------------------------------------
 */

const INTRO_DURATION = 2700; // ms before the logo flies to the header

function runIntro() {
  const root = document.documentElement;
  const intro = document.querySelector(".intro");
  if (!intro) return;

  // Not playing this time (already seen, or reduced motion)
  if (!root.classList.contains("is-intro")) {
    intro.remove();
    return;
  }

  let finished = false;

  function finish() {
    if (finished) return;
    finished = true;

    try {
      sessionStorage.setItem("introSeen", "1");
    } catch (error) {
      /* storage blocked — the intro may play again next page, that's fine */
    }

    flyToHeader();
    intro.classList.add("is-leaving");

    // Page animations start while the logo is flying
    root.classList.remove("is-intro");
    document.dispatchEvent(new Event("intro:done"));
  }

  /* Moves the big logo onto the small one in the header */
  function flyToHeader() {
    const mark = intro.querySelector(".intro-mark");
    const target = document.querySelector(".brand svg");
    intro.classList.add("is-assembled"); // in case Skip was pressed early

    if (!target) {
      setTimeout(() => intro.remove(), 900);
      return;
    }

    const from = mark.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const scale = to.width / from.width;
    const x = to.left + to.width / 2 - (from.left + from.width / 2);
    const y = to.top + to.height / 2 - (from.top + from.height / 2);

    target.style.opacity = "0"; // hidden until the big logo lands on it
    mark.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;

    setTimeout(() => {
      target.style.opacity = "";
      intro.remove();
    }, 900);
  }

  // Swap the 3 pieces for one solid logo once they've locked together
  setTimeout(() => intro.classList.add("is-assembled"), 1000);

  setTimeout(finish, INTRO_DURATION);
  intro.querySelector(".intro-skip").addEventListener("click", finish);
  document.addEventListener("keydown", finish, { once: true });
}

runIntro();
