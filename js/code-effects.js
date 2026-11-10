/**
 * code-effects.js — programming-themed animations (home page)
 * ---------------------------------------------------------------
 *  1. Code rain: code symbols that float up behind the hero
 *  2. Code typer: a code editor that types itself when scrolled to
 *
 * Edit CODE_SYMBOLS or CODE_SAMPLE below to change what appears.
 * ---------------------------------------------------------------
 */

const CODE_SYMBOLS = ["</>", "{ }", "=>", "( )", "[ ]", ";", "&&", "===", "<div>", "const", "fn()", "#", "$", "//", "++"];

const CODE_SAMPLE = `const marc = {
  role: "IT Specialist",
  web: ["HTML", "CSS", "JavaScript", "PHP"],
  design: ["Photoshop", "Illustrator", "Canva"],
  video: ["CapCut", "Filmora Go"],
  ai: [
    "ChatGPT", "Claude",
    "Amazon Polly", "AI Chatbot Botcake",
  ],
  available: true,
};

// Ready when you are
marc.build("your next project");`;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 1. Code rain ---------- */
function initCodeRain() {
  const container = document.querySelector(".code-rain");
  if (!container || reduceMotion) return;

  const count = window.innerWidth < 700 ? 10 : 22;

  for (let i = 0; i < count; i++) {
    const symbol = document.createElement("span");
    symbol.textContent = CODE_SYMBOLS[i % CODE_SYMBOLS.length];

    // Random position, size and speed for each symbol
    symbol.style.left = `${Math.random() * 100}%`;
    symbol.style.fontSize = `${0.75 + Math.random() * 1.1}rem`;
    symbol.style.animationDuration = `${14 + Math.random() * 16}s`;
    symbol.style.animationDelay = `${-Math.random() * 30}s`;

    container.appendChild(symbol);
  }
}

/* ---------- 2. Code typer ---------- */

// Splits the code into colored pieces: [cssClass, text]
function tokenize(code) {
  const rules = [
    ["tok-comment", /^\/\/[^\n]*/],
    ["tok-string", /^"[^"]*"/],
    ["tok-keyword", /^\b(const|let|return|function)\b/],
    ["tok-bool", /^\b(true|false|null)\b/],
    ["tok-prop", /^[A-Za-z_]\w*(?=:)/],
    ["tok-fn", /^[A-Za-z_]\w*(?=\()/],
    ["tok-punct", /^[{}[\]().,;:=]/],
  ];

  const tokens = [];
  let rest = code;

  while (rest.length) {
    const rule = rules.find(([, regex]) => regex.test(rest));
    if (rule) {
      const text = rest.match(rule[1])[0];
      tokens.push([rule[0], text]);
      rest = rest.slice(text.length);
    } else {
      tokens.push(["", rest[0]]); // plain character (letters, spaces, new lines)
      rest = rest.slice(1);
    }
  }
  return tokens;
}

function typeCode(target) {
  const tokens = tokenize(CODE_SAMPLE);

  if (reduceMotion) {
    tokens.forEach(([cls, text]) => target.append(makeSpan(cls, text)));
    return;
  }

  let tokenIndex = 0;
  let charIndex = 0;
  let span = null;

  const cursor = makeSpan("code-cursor", "");
  target.append(cursor);

  function step() {
    if (tokenIndex >= tokens.length) return; // done — cursor keeps blinking

    const [cls, text] = tokens[tokenIndex];
    if (charIndex === 0) {
      span = makeSpan(cls, "");
      target.insertBefore(span, cursor);
    }

    span.textContent += text[charIndex];
    charIndex++;

    let delay = 28 + Math.random() * 40;
    if (text[charIndex - 1] === "\n") delay = 220; // short pause at each new line

    if (charIndex >= text.length) {
      tokenIndex++;
      charIndex = 0;
    }
    setTimeout(step, delay);
  }

  step();
}

function makeSpan(cls, text) {
  const span = document.createElement("span");
  if (cls) span.className = cls;
  span.textContent = text;
  return span;
}

function initCodeTyper() {
  const target = document.querySelector("#code-typer");
  if (!target) return;

  // Start typing only when the editor scrolls into view
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        typeCode(target);
      }
    },
    { threshold: 0.4 }
  );
  observer.observe(target);
}

initCodeRain();
initCodeTyper();
