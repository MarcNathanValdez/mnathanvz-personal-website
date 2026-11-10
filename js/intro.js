/**
 * intro.js — logo entrance (with sound) when someone opens the website
 * ---------------------------------------------------------------
 * Plays once per visit (until the browser tab is closed):
 *  1. Three pieces of the logo fly in and lock together
 *  2. An impact ring, an outline trace and a shine sweep
 *  3. The MNATHANVZ letters drop in one by one
 *  4. The logo flies up into the header and the page appears
 * Sounds are in js/intro-sound.js.
 *
 * Browsers only allow sound after a click, so if sound is blocked
 * the visitor first sees an "Enter" button. Clicking it starts the
 * entrance with sound. "Skip" (or Esc) goes straight to the site.
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

  let started = false;
  let finished = false;
  const timers = [];

  /* Plays the animation (and the sound, if allowed) */
  function start() {
    if (started) return;
    started = true;
    intro.classList.remove("is-waiting");
    IntroSound.playEntrance();

    timers.push(setTimeout(() => intro.classList.add("is-assembled"), 1000));
    timers.push(setTimeout(finish, INTRO_DURATION));
  }

  function finish() {
    if (finished) return;
    finished = true;
    timers.forEach(clearTimeout);

    try {
      sessionStorage.setItem("introSeen", "1");
    } catch (error) {
      /* storage blocked — the intro may play again next page, that's fine */
    }

    if (started) IntroSound.playExit();
    flyToHeader();
    intro.classList.remove("is-waiting");
    intro.classList.add("is-leaving");

    // Page animations start while the logo is flying
    root.classList.remove("is-intro");
    document.dispatchEvent(new Event("intro:done"));
    document.removeEventListener("keydown", onKey);
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

  /* "Enter" turns the sound on, then starts */
  function enter() {
    IntroSound.unlock().then(start, start);
  }

  /* Keyboard: Enter/Space = enter, Esc = skip, any key during the animation = skip */
  function onKey(event) {
    if (!started && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      enter();
    } else if (started || event.key === "Escape") {
      finish();
    }
  }

  intro.querySelector(".intro-enter").addEventListener("click", enter);
  intro.querySelector(".intro-skip").addEventListener("click", finish);
  document.addEventListener("keydown", onKey);

  // If the browser already allows sound, start right away; otherwise wait for "Enter"
  IntroSound.init();
  if (IntroSound.canPlay()) {
    start();
  } else {
    intro.classList.add("is-waiting");
    intro.querySelector(".intro-enter").focus({ preventScroll: true });
  }
}

runIntro();
