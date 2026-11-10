/**
 * mascot.js — "Bit", a little robot that lives at the bottom of the page
 * ---------------------------------------------------------------
 *  - Walks around, waves, jumps, falls asleep when nobody moves
 *  - Teases visitors with little speech bubbles
 *  - Hides behind the hero logo or your profile photo and peeks out
 *  - Eyes follow the mouse
 *  - Click it: it laughs, gets angry or falls in love (random)
 *
 * Edit the texts in MASCOT below. To remove Bit from the site,
 * set enabled to false.
 * ---------------------------------------------------------------
 */

const MASCOT = {
  enabled: true,
  name: "Bit",
  speed: 55, // walking speed in pixels per second

  // Random lines while it wanders around
  teases: [
    "Psst… click me.",
    "I saw you looking 👀",
    "Boop me. I dare you.",
    "Have you tried dark mode? 🌙",
    "Marc made me in JavaScript!",
    "The portfolio is the best part, trust me.",
    "Don’t scroll too fast, I get dizzy.",
    "Hire Marc. He feeds me electricity ⚡",
    "I’m not lost, I’m exploring.",
  ],

  // What it says when peeking out from behind the logo or photo
  peeks: [
    "Peekaboo! 👀",
    "Shh… I’m hiding back here.",
    "Nice view from behind here.",
    "You can’t see me… right?",
  ],

  // How often Bit hides and peeks, compared with its other moves (bigger = more often)
  peekChance: 6,

  // Things it can hide behind (on any page — spots not on the current page are skipped):
  //  selector  the element(s) on the page
  //  edge      where its top edge really is (% from the bottom of the element)
  //  spots     where along that edge Bit can pop up (% from the left)
  //  inside    true = Bit moves along with the element (for the floating logo and tilting photo)
  hidingSpots: [
    // Home
    { selector: ".hero-mark", edge: 93, spots: [26, 74], inside: true }, // behind the two peaks of the M
    { selector: ".profile-frame", edge: 100, spots: [20, 35, 50, 65, 80], inside: true },
    { selector: ".skill-card", edge: 100, spots: [25, 50, 75] },
    { selector: ".code-window", edge: 100, spots: [30, 50, 70, 85] },
    { selector: ".tools", edge: 100, spots: [15, 40, 65] },
    { selector: ".faq-list", edge: 100, spots: [20, 40, 60, 80] },
    // Portfolio
    { selector: ".work-item", edge: 100, spots: [25, 50, 75] },
    { selector: ".youtube-note", edge: 100, spots: [20, 50, 80] },
    // Contact
    { selector: ".contact-form", edge: 100, spots: [20, 45, 70, 85] },
    { selector: ".contact-list", edge: 100, spots: [20, 45, 70] },
  ],

  // What it says when clicked
  reactions: {
    laugh: ["Hahaha! That tickles!", "Hehe, stop it! 😆", "HAHA! Again!"],
    angry: ["Hey! Rude! 😤", "Stop poking me!", "Grrr… I’m busy walking!"],
    love: ["Aww… I like you too 💖", "You’re my favorite visitor 💕", "*blushes in binary*"],
  },
};

(function initMascot() {
  if (!MASCOT.enabled) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // The robot drawing (used for the walking Bit and the peeking Bit)
  const ROBOT_SVG = `
      <svg viewBox="0 0 80 100" aria-hidden="true">
        <!-- antenna -->
        <line class="m-line" x1="40" y1="14" x2="40" y2="5"/>
        <circle class="m-bulb" cx="40" cy="5" r="3.5"/>

        <!-- legs + arms (behind the body) -->
        <rect class="m-part m-leg m-leg-l" x="29" y="78" width="8" height="15" rx="3"/>
        <rect class="m-part m-leg m-leg-r" x="43" y="78" width="8" height="15" rx="3"/>
        <rect class="m-part m-arm m-arm-l" x="15" y="64" width="9" height="16" rx="4"/>
        <rect class="m-part m-arm m-arm-r" x="56" y="64" width="9" height="16" rx="4"/>

        <!-- body -->
        <rect class="m-part" x="23" y="60" width="34" height="22" rx="8"/>
        <path class="m-chest" d="M33 74V67l7 5 7-5v7"/>

        <!-- head + screen -->
        <g class="m-head">
          <rect class="m-part" x="9" y="14" width="62" height="47" rx="15"/>
          <rect class="m-screen" x="16" y="21" width="48" height="33" rx="10"/>

          <g class="m-face">
            <!-- normal eyes (follow the mouse) -->
            <g class="m-eyes m-eyes-normal">
              <ellipse cx="31" cy="36" rx="4" ry="5"/>
              <ellipse cx="49" cy="36" rx="4" ry="5"/>
            </g>
            <!-- happy eyes ^ ^ -->
            <g class="m-eyes m-eyes-happy">
              <path d="M27 38q4-7 8 0M45 38q4-7 8 0"/>
            </g>
            <!-- angry eyes -->
            <g class="m-eyes m-eyes-angry">
              <path d="M26 31l9 4M54 31l-9 4"/>
              <ellipse cx="31" cy="39" rx="3.5" ry="3"/>
              <ellipse cx="49" cy="39" rx="3.5" ry="3"/>
            </g>
            <!-- heart eyes -->
            <g class="m-eyes m-eyes-love">
              <path d="M31 42l-5-5a3 3 0 0 1 5-4 3 3 0 0 1 5 4z"/>
              <path d="M49 42l-5-5a3 3 0 0 1 5-4 3 3 0 0 1 5 4z"/>
            </g>
            <!-- sleeping eyes - - -->
            <g class="m-eyes m-eyes-sleep">
              <path d="M27 37h8M45 37h8"/>
            </g>

            <!-- blush -->
            <ellipse class="m-blush" cx="23" cy="45" rx="4" ry="2.5"/>
            <ellipse class="m-blush" cx="57" cy="45" rx="4" ry="2.5"/>

            <!-- mouths -->
            <path class="m-mouth m-mouth-smile" d="M35 46q5 4 10 0"/>
            <path class="m-mouth m-mouth-laugh" d="M34 44h12q0 7-6 7t-6-7z"/>
            <path class="m-mouth m-mouth-angry" d="M35 49q5-4 10 0"/>
            <path class="m-mouth m-mouth-o" d="M40 44a2.5 3 0 1 0 0.01 0z"/>
          </g>
        </g>
      </svg>`;

  /* ---------- Build the character ---------- */
  const root = document.createElement("div");
  root.className = "mascot";
  root.innerHTML = `
    <div class="mascot-bubble" role="status" aria-live="polite"></div>
    <div class="mascot-fx" aria-hidden="true"></div>
    <button class="mascot-figure" type="button" aria-label="${MASCOT.name}, the robot. Click to play.">
      ${ROBOT_SVG}
    </button>`;
  document.body.appendChild(root);

  const figure = root.querySelector(".mascot-figure");
  const bubble = root.querySelector(".mascot-bubble");
  const fx = root.querySelector(".mascot-fx");

  /* ---------- State ---------- */
  let x = 24; // position from the left edge
  let dir = 1; // 1 = facing right, -1 = facing left
  let busy = false; // reacting to a click
  let nextTimer = null;
  let sleepTimer = null;
  let bubbleTimer = null;
  let lastReaction = "";

  const width = () => root.offsetWidth || 70;
  const maxX = () => Math.max(24, window.innerWidth - width() - 90); // keep clear of back-to-top
  const random = (list) => list[Math.floor(Math.random() * list.length)];
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function place() {
    root.style.transform = `translateX(${x}px)`;
    root.style.setProperty("--dir", dir);
  }

  function setMood(mood) {
    root.dataset.mood = mood || "";
  }

  /* ---------- Speech bubble ---------- */
  function say(text, ms = 2800) {
    clearTimeout(bubbleTimer);
    bubble.textContent = text;
    root.classList.add("is-talking");

    // keep the bubble inside the screen
    requestAnimationFrame(() => {
      const rect = bubble.getBoundingClientRect();
      let shift = 0;
      if (rect.left < 8) shift = 8 - rect.left;
      if (rect.right > window.innerWidth - 8) shift = window.innerWidth - 8 - rect.right;
      bubble.style.setProperty("--shift", `${shift}px`);
    });

    bubbleTimer = setTimeout(() => root.classList.remove("is-talking"), ms);
  }

  /* ---------- Little effects (hearts, steam, ZZZ, HA) ---------- */
  function burst(type, count = 5) {
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = `m-fx m-fx-${type}`;
      p.textContent = { love: "♥", laugh: "HA", sleep: "Z", angry: "" }[type];
      p.style.setProperty("--dx", `${(Math.random() - 0.5) * 60}px`);
      p.style.animationDelay = `${i * 120}ms`;
      fx.appendChild(p);
      p.addEventListener("animationend", () => p.remove());
    }
  }

  /* ---------- Walking ---------- */
  function walkTo(targetX) {
    return new Promise((resolve) => {
      targetX = Math.min(Math.max(16, targetX), maxX());
      dir = targetX >= x ? 1 : -1;
      place();

      if (reduceMotion) {
        resolve();
        return;
      }

      root.classList.add("is-walking");
      let last = performance.now();

      function step(now) {
        if (busy) {
          root.classList.remove("is-walking");
          resolve();
          return;
        }
        const dt = (now - last) / 1000;
        last = now;
        x += dir * MASCOT.speed * dt;

        if ((dir === 1 && x >= targetX) || (dir === -1 && x <= targetX)) {
          x = targetX;
          place();
          root.classList.remove("is-walking");
          resolve();
          return;
        }
        place();
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------- Things it does on its own ---------- */
  /* ---------- Hide behind the logo or photo and peek out ---------- */
  let peekBit = null;

  function findHidingSpot() {
    const visible = [];
    MASCOT.hidingSpots.forEach((spot) => {
      document.querySelectorAll(spot.selector).forEach((el) => {
        const r = el.getBoundingClientRect();
        // its top edge must be on screen (below the header), and big enough to hide behind
        if (r.width > 40 && r.top > 120 && r.top < window.innerHeight - 140) visible.push({ ...spot, el });
      });
    });
    return visible.length ? random(visible) : null;
  }

  async function peek() {
    const spot = findHidingSpot();
    if (!spot) return walkTo(Math.random() * maxX()); // nothing to hide behind right now

    // 1. The walking Bit ducks out of sight
    root.classList.add("is-gone");
    await wait(450);

    // 2. A Bit rises from behind the top edge of the logo/photo
    const holder = document.createElement("div");
    holder.className = "peek";
    const along = random(spot.spots);
    holder.innerHTML = `
      <div class="mascot-bubble" role="status" aria-live="polite"></div>
      <div class="peek-clip">
        <div class="mascot mascot-peeking">
          <button class="mascot-figure" type="button" aria-label="${MASCOT.name} is peeking. Click to play.">${ROBOT_SVG}</button>
        </div>
      </div>`;
    if (spot.inside) {
      // placed inside the element, so it floats/tilts with it
      holder.style.left = `${along}%`;
      holder.style.bottom = `${spot.edge}%`;
      spot.el.appendChild(holder);
    } else {
      // placed on the page right at the element's top edge
      // (works even for boxes with rounded, clipped corners)
      const r = spot.el.getBoundingClientRect();
      holder.classList.add("peek-on-page");
      holder.style.left = `${r.left + window.scrollX + (r.width * along) / 100}px`;
      holder.style.top = `${r.top + window.scrollY + r.height * (1 - spot.edge / 100)}px`;
      document.body.appendChild(holder);
    }
    peekBit = holder.querySelector(".mascot-peeking");
    const peekBubble = holder.querySelector(".mascot-bubble");

    const sayPeek = (text) => {
      peekBubble.textContent = text;
      peekBubble.style.setProperty("--shift", "0px");
      holder.classList.add("is-talking");
      requestAnimationFrame(() => {
        const b = peekBubble.getBoundingClientRect();
        let shift = 0;
        if (b.left < 8) shift = 8 - b.left;
        if (b.right > window.innerWidth - 8) shift = window.innerWidth - 8 - b.right;
        peekBubble.style.setProperty("--shift", `${shift}px`);
      });
    };

    let clicked = false;
    holder.querySelector(".mascot-figure").addEventListener("click", () => {
      if (clicked) return;
      clicked = true;
      const mood = random(["laugh", "angry", "love"]);
      peekBit.dataset.mood = mood;
      sayPeek(random(["You found me! 😆", "Hey! I was hiding! 😤", "You found me… 💕"]));
    });

    requestAnimationFrame(() => holder.classList.add("is-up"));
    await wait(700);
    sayPeek(random(MASCOT.peeks));
    await wait(2800);

    // 3. Ducks back down, and the walking Bit comes back
    holder.classList.remove("is-talking", "is-up");
    await wait(500);
    holder.remove();
    peekBit = null;
    root.classList.remove("is-gone");
    await wait(600);
  }

  const actions = [
    { weight: MASCOT.peekChance, run: peek },
    { weight: 4, run: () => walkTo(Math.random() * maxX()) },
    { weight: 3, run: async () => { say(random(MASCOT.teases)); await wait(3000); } },
    { weight: 1, run: async () => { root.classList.add("is-waving"); say("Hi there! 👋", 2000); await wait(2000); root.classList.remove("is-waving"); } },
    { weight: 1, run: async () => { root.classList.add("is-jumping"); await wait(900); root.classList.remove("is-jumping"); } },
    { weight: 1, run: async () => { setMood("curious"); await wait(2200); setMood(""); } },
  ];

  function pickAction() {
    const total = actions.reduce((sum, a) => sum + a.weight, 0);
    let roll = Math.random() * total;
    return actions.find((a) => (roll -= a.weight) < 0) || actions[0];
  }

  async function loop() {
    clearTimeout(nextTimer);
    if (busy || root.dataset.mood === "sleep") return;

    if (!reduceMotion) await pickAction().run();
    else if (Math.random() < 0.4) say(random(MASCOT.teases));

    nextTimer = setTimeout(loop, 1200 + Math.random() * 2500);
  }

  /* ---------- Falls asleep when nobody moves for 25 seconds ---------- */
  function resetSleep() {
    clearTimeout(sleepTimer);
    if (root.dataset.mood === "sleep") {
      setMood("");
      say("Huh? I’m awake! I’m awake!", 2000);
      nextTimer = setTimeout(loop, 2200);
    }
    sleepTimer = setTimeout(fallAsleep, 25000);
  }

  function fallAsleep() {
    if (busy) return;
    clearTimeout(nextTimer);
    setMood("sleep");
    const snore = () => {
      if (root.dataset.mood !== "sleep") return;
      burst("sleep", 3);
      setTimeout(snore, 2400);
    };
    snore();
  }

  /* ---------- Eyes follow the mouse ---------- */
  function lookAt(event) {
    const rect = figure.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height * 0.35);
    const distance = Math.hypot(dx, dy) || 1;
    root.style.setProperty("--look-x", `${((dx / distance) * 3 * dir).toFixed(2)}px`);
    root.style.setProperty("--look-y", `${((dy / distance) * 2.5).toFixed(2)}px`);

    if (peekBit) {
      const r = peekBit.getBoundingClientRect();
      const px = event.clientX - (r.left + r.width / 2);
      const py = event.clientY - (r.top + r.height * 0.35);
      const d = Math.hypot(px, py) || 1;
      peekBit.style.setProperty("--look-x", `${((px / d) * 3).toFixed(2)}px`);
      peekBit.style.setProperty("--look-y", `${((py / d) * 2.5).toFixed(2)}px`);
    }
  }

  /* ---------- Click: laugh, angry or in love ---------- */
  async function react() {
    resetSleep();
    busy = true;
    clearTimeout(nextTimer);
    root.classList.remove("is-walking", "is-waving", "is-jumping");

    const moods = ["laugh", "angry", "love"].filter((m) => m !== lastReaction);
    const mood = random(moods);
    lastReaction = mood;

    setMood(mood);
    say(random(MASCOT.reactions[mood]), 2600);
    burst(mood, mood === "laugh" ? 3 : 6);

    await wait(2600);
    setMood("");
    busy = false;
    nextTimer = setTimeout(loop, 1500);
  }

  /* ---------- Start ---------- */
  figure.addEventListener("click", react);
  ["pointermove", "scroll", "keydown", "touchstart"].forEach((type) =>
    window.addEventListener(type, resetSleep, { passive: true })
  );
  window.addEventListener("pointermove", lookAt, { passive: true });
  window.addEventListener("resize", () => {
    x = Math.min(x, maxX());
    place();
  });

  place();

  // Appears after the entrance animation, then says hello
  const appear = () => {
    root.classList.add("is-here");
    setTimeout(() => {
      say(`Hi! I’m ${MASCOT.name}. Click me!`, 3200);
      resetSleep();
      nextTimer = setTimeout(loop, 3600);
    }, 900);
  };
  if (typeof whenIntroDone === "function") whenIntroDone(() => setTimeout(appear, 1200));
  else appear();
})();
