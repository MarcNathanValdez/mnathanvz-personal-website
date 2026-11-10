/**
 * intro-sound.js — sound effects for the logo entrance
 * ---------------------------------------------------------------
 * All sounds are generated in the browser (Web Audio API),
 * so there are no audio files to upload.
 *
 *  - whoosh   when the logo pieces fly in
 *  - impact   + metallic "ting" when they lock together
 *  - ticks    as the MNATHANVZ letters drop in
 *  - shimmer  with the shine sweep
 *  - whoosh   when the logo flies up to the header
 *
 * Change VOLUME (0 = silent, 1 = loud) to make it quieter or louder.
 * ---------------------------------------------------------------
 */

const IntroSound = (() => {
  const VOLUME = 0.55;

  let ctx = null;
  let master = null;

  /** Creates the audio engine. Browsers keep it "suspended" until a click. */
  function init() {
    if (ctx) return ctx;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;

    ctx = new AudioCtx();
    master = ctx.createGain();
    master.gain.value = VOLUME;
    master.connect(ctx.destination);
    return ctx;
  }

  /** True if sound can play right now without a click */
  function canPlay() {
    return Boolean(ctx) && ctx.state === "running";
  }

  /** Call from a click/key handler to allow sound */
  function unlock() {
    return ctx ? ctx.resume() : Promise.resolve();
  }

  /* ---------- Building blocks ---------- */

  function noise(duration) {
    const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    return source;
  }

  function envelope(at, peak, attack, release) {
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(peak, at + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + attack + release);
    gain.connect(master);
    return gain;
  }

  /** Air rushing past — filtered noise sweeping from one pitch to another */
  function whoosh(at, duration, fromHz, toHz, peak) {
    const source = noise(duration);
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 1.2;
    filter.frequency.setValueAtTime(fromHz, at);
    filter.frequency.exponentialRampToValueAtTime(toHz, at + duration);
    source.connect(filter).connect(envelope(at, peak, duration * 0.6, duration * 0.4));
    source.start(at);
    source.stop(at + duration);
  }

  /** Deep thump when the pieces lock */
  function impact(at) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(120, at);
    osc.frequency.exponentialRampToValueAtTime(38, at + 0.35);
    osc.connect(envelope(at, 0.9, 0.005, 0.45));
    osc.start(at);
    osc.stop(at + 0.5);

    // short crack on top
    const crack = noise(0.08);
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 1800;
    crack.connect(filter).connect(envelope(at, 0.35, 0.002, 0.07));
    crack.start(at);
  }

  /** Bright metallic ring */
  function ting(at) {
    [1320, 1980, 2640].forEach((hz, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = hz;
      osc.connect(envelope(at, 0.16 / (i + 1), 0.004, 1.1));
      osc.start(at);
      osc.stop(at + 1.2);
    });
  }

  /** Tiny click for each letter */
  function tick(at) {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = 2400;
    osc.connect(envelope(at, 0.07, 0.002, 0.04));
    osc.start(at);
    osc.stop(at + 0.06);
  }

  /** Sparkle that rises with the shine sweep */
  function shimmer(at) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1800, at);
    osc.frequency.exponentialRampToValueAtTime(4200, at + 0.8);
    osc.connect(envelope(at, 0.06, 0.3, 0.5));
    osc.start(at);
    osc.stop(at + 0.85);
  }

  /* ---------- Sequences (timed to the CSS animation) ---------- */

  function playEntrance() {
    if (!canPlay()) return;
    const t = ctx.currentTime;
    whoosh(t + 0.12, 0.8, 250, 2600, 0.45); // pieces fly in
    impact(t + 1.0); // pieces lock
    ting(t + 1.02);
    for (let i = 0; i < 9; i++) tick(t + 1.4 + i * 0.05); // letters
    shimmer(t + 1.7); // shine
  }

  function playExit() {
    if (!canPlay()) return;
    whoosh(ctx.currentTime, 0.75, 400, 5000, 0.3); // logo flies to the header
  }

  return { init, canPlay, unlock, playEntrance, playExit };
})();
