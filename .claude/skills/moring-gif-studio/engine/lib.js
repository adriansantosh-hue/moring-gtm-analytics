// Moring scene engine: every frame is a pure function of time t (seconds). No CSS animations.
// Glass surfaces are a port of React Bits <GlassSurface /> (SVG displacement-map backdrop filter + RGB split), driven from plain DOM.
(function () {
  const C = { bg: "#FFFFFF", panel: "#F7F4EE", panel2: "#E6EFF0", line: "#DCDFE6", mute: "#5A6A6A", soft: "#5A6A6A", txt: "#082F34", txt2: "#5A6A6A", coral: "#FF7649", ok: "#0F4147" };
  const clamp = (x) => Math.max(0, Math.min(1, x));
  const seg = (t, a, b) => (b <= a ? (t >= a ? 1 : 0) : clamp((t - a) / (b - a)));
  const eo = (p) => 1 - Math.pow(1 - p, 3);
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const mix = (c1, c2, k) => { const a = hex(c1), b = hex(c2); return "rgb(" + a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(",") + ")"; };
  const NS = "http://www.w3.org/2000/svg";
  const rgba = (h, a) => { const c = hex(h); return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; };

  // ---- GlassSurface port ----
  const GL = { borderWidth: 0.07, brightness: 50, opacity: 0.93, blur: 11, displace: 0, distortionScale: -140, redOffset: 0, greenOffset: 10, blueOffset: 20, xChannel: "R", yChannel: "G", mixBlendMode: "difference", saturation: 1.25 };
  function displacementMap(w, h, r) {
    const edge = Math.min(w, h) * (GL.borderWidth * 0.5);
    const svg = '<svg viewBox="0 0 ' + w + " " + h + '" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="rg" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient><linearGradient id="bg2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient></defs><rect x="0" y="0" width="' + w + '" height="' + h + '" fill="black"></rect><rect x="0" y="0" width="' + w + '" height="' + h + '" rx="' + r + '" fill="url(#rg)" /><rect x="0" y="0" width="' + w + '" height="' + h + '" rx="' + r + '" fill="url(#bg2)" style="mix-blend-mode: ' + GL.mixBlendMode + '" /><rect x="' + edge + '" y="' + edge + '" width="' + (w - edge * 2) + '" height="' + (h - edge * 2) + '" rx="' + r + '" fill="hsl(0 0% ' + GL.brightness + "% / " + GL.opacity + ')" style="filter:blur(' + GL.blur + 'px)" /></svg>';
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }
  let filterN = 0;
  function makeFilter(defs, w, h, r) {
    const id = "gs" + ++filterN;
    const f = document.createElementNS(NS, "filter"); f.setAttribute("id", id); f.setAttribute("color-interpolation-filters", "sRGB"); f.setAttribute("x", "0%"); f.setAttribute("y", "0%"); f.setAttribute("width", "100%"); f.setAttribute("height", "100%");
    const ch = (name, off, mat) => '<feDisplacementMap in="SourceGraphic" in2="map" scale="' + (GL.distortionScale + off) + '" xChannelSelector="' + GL.xChannel + '" yChannelSelector="' + GL.yChannel + '" result="d' + name + '"/><feColorMatrix in="d' + name + '" type="matrix" values="' + mat + '" result="' + name + '"/>';
    f.innerHTML = '<feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" href="' + displacementMap(w, h, r) + '"/>' +
      ch("red", GL.redOffset, "1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0") + ch("green", GL.greenOffset, "0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0") + ch("blue", GL.blueOffset, "0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0") +
      '<feBlend in="red" in2="green" mode="screen" result="rg"/><feBlend in="rg" in2="blue" mode="screen" result="output"/><feGaussianBlur in="output" stdDeviation="' + (GL.displace || 0.7) + '"/>';
    defs.appendChild(f); return id;
  }
  const GLASS_SHADOW = "0 0 2px 1px rgba(8,47,52,.10) inset, 0 0 12px 4px rgba(255,255,255,.75) inset, 0 10px 30px rgba(8,47,52,.10), 0 2px 6px rgba(8,47,52,.06)";

  // ---- LatticeLoader port (React Bits): patterns, marks, wave ----
  const PATTERNS = {
    arrow: { 3: { cells: [1, 2, 3, 0, 1, 2, 1, 2, 3], loop: 7.2, scale: 1 } },
    dots: { 3: { cells: [0, 1, 2, 0, 1, 2, 0, 1, 2], loop: 3, scale: 2.4 } },
    ripple: { 3: { cells: [2, 1, 2, 1, 0, 1, 2, 1, 2], loop: 4.8, scale: 1.5 } },
    spiral: { 3: { cells: [0, 1, 2, 7, 8, 3, 6, 5, 4], loop: 9, scale: 1.2, lit: 0.35 } },
    orbit: { 3: { cells: [0, 1, 2, 7, null, 3, 6, 5, 4], loop: 8, scale: 1.2 }, 4: { cells: [0, 1, 2, 3, 11, null, null, 4, 10, null, null, 5, 9, 8, 7, 6], loop: 6, scale: 1.2, lit: 0.45 } },
    snake: { 3: { cells: [0, 1, 2, 5, 4, 3, 6, 7, 8], loop: 9, scale: 1, lit: 0.35 }, 4: { cells: [0, 1, 2, 3, 7, 6, 5, 4, 8, 9, 10, 11, 15, 14, 13, 12], loop: 16, scale: 1, lit: 0.25 } },
    sweep: { 4: { cells: [0, 1, 2, 3, 1, 2, 3, 4, 2, 3, 4, 5, 3, 4, 5, 6], loop: 5, scale: 1, lit: 0.45 } },
    spin: { 4: { cells: [0, 0, 1, 1, 0, 0, 1, 1, 3, 3, 2, 2, 3, 3, 2, 2], loop: 4, scale: 1.6, lit: 0.35 } },
    rain: { 4: { cells: [0, 2, 1, 3, 1, 3, 2, 4, 2, 4, 3, 5, 3, 5, 4, 6], loop: 4, scale: 1.2, lit: 0.35 } },
    pulse: { 4: { cells: [2, 1, 1, 2, 1, 0, 0, 1, 1, 0, 0, 1, 2, 1, 1, 2], loop: 2.4, scale: 2.5, lit: 0.45 } },
  };
  const MARKS = { 3: { done: [2, 3, 5, 7], error: [0, 2, 4, 6, 8] }, 4: { done: [7, 8, 10, 13], error: [0, 3, 5, 6, 9, 10, 12, 15] } };
  const DEFAULT_PATTERN = { 3: "orbit", 4: "sweep" };
  function resolveLattice(name, n) { const named = PATTERNS[name]; const p = (named && named[n]) || PATTERNS[DEFAULT_PATTERN[n]][n]; return { cells: p.cells, loop: p.loop, scale: p.scale, lit: p.lit || 0.62 }; }
  const LIT = { 0.62: [0.18, 0.42, 0.62], 0.45: [0.13, 0.31, 0.45], 0.35: [0.10, 0.24, 0.35], 0.25: [0.07, 0.17, 0.25] };
  const ss = (x) => x * x * (3 - 2 * x);
  function latWave(f, lit) { const [a, b, c] = LIT[lit] || LIT[0.62]; if (f < a) return ss(f / a); if (f < b) return 1; if (f < c) return 1 - ss((f - b) / (c - b)); return 0; }

  window.initScene = function (spec) {
    const stage = document.getElementById("stage");
    stage.style.cssText = "position:relative;width:1080px;height:1080px;overflow:hidden;color:#082F34;font-family:'DM Sans',sans-serif;background:radial-gradient(820px 620px at 92% 2%,rgba(255,118,73,.16),transparent 64%),radial-gradient(900px 760px at 0% 100%,rgba(247,244,238,1),transparent 62%),radial-gradient(560px 420px at 55% 55%,rgba(230,239,240,.5),transparent 70%),#FFFFFF";
    // faint circuit grid so the glass has structure to refract
    const grid = document.createElement("div");
    grid.style.cssText = "position:absolute;inset:0;background-image:radial-gradient(rgba(8,47,52,.11) 1.2px,transparent 1.7px);background-size:27px 27px;background-position:13px 9px";
    stage.appendChild(grid);
    const defsSvg = document.createElementNS(NS, "svg"); defsSvg.setAttribute("width", 0); defsSvg.setAttribute("height", 0); defsSvg.style.cssText = "position:absolute;left:0;top:0";
    const defs = document.createElementNS(NS, "defs"); defsSvg.appendChild(defs); stage.appendChild(defsSvg);

    const items = [];
    const font = (e) => (e.mono ? "'Geist Mono',monospace" : "'DM Sans',sans-serif");
    const abs = (el, e) => { el.style.position = "absolute"; el.style.left = e.x + "px"; el.style.top = e.y + "px"; };
    const glassOn = (el, e, small) => {
      if (small) { el.style.backdropFilter = "blur(10px) saturate(1.6)"; return; }
      const id = makeFilter(defs, Math.round(e.w), Math.round(e.h), e.r == null ? 14 : e.r);
      el.style.backdropFilter = "url(#" + id + ") saturate(" + GL.saturation + ")"; el.style.webkitBackdropFilter = el.style.backdropFilter;
    };

    spec.els.forEach((e) => {
      let el; const it = { e };
      if (e.k === "box") {
        const glass = e.glass != null ? e.glass : (e.fill == null && e.bw !== 0 && e.h >= 24);
        e._glass = glass;
        el = document.createElement("div"); abs(el, e);
        el.style.cssText += ";width:" + e.w + "px;height:" + e.h + "px;box-sizing:border-box;border:" + (e.bw == null ? (glass ? 1.5 : 2) : e.bw) + "px solid;border-radius:" + (e.r == null ? 14 : e.r) + "px";
        if (glass) glassOn(el, e, e.small);
      } else if (e.k === "text") {
        el = document.createElement("div"); abs(el, e);
        el.style.cssText += ";width:" + (e.w || 900) + "px;font-size:" + (e.s || 20) + "px;font-weight:" + (e.wt || 500) + ";line-height:" + (e.lh || 1.25) + ";font-family:" + font(e) + ";text-align:" + (e.al || "left") + ";white-space:" + (e.pre ? "pre" : "normal") + (e.ls ? ";letter-spacing:" + e.ls + "em" : "");
        if (e.html) el.innerHTML = e.txt;
      } else if (e.k === "path") {
        el = document.createElementNS(NS, "svg"); el.setAttribute("width", 1080); el.setAttribute("height", 1080); el.style.cssText = "position:absolute;left:0;top:0;overflow:visible";
        const d = "M" + e.pts.map((p) => p.join(",")).join(" L");
        const mk = () => { const p = document.createElementNS(NS, "path"); p.setAttribute("d", d); p.setAttribute("fill", "none"); p.setAttribute("stroke-linecap", "round"); p.setAttribute("stroke-linejoin", "round"); el.appendChild(p); return p; };
        it.base = mk(); it.base.setAttribute("stroke", e.col || C.line); it.base.setAttribute("stroke-width", 2);
        it.flow = mk(); it.flow.setAttribute("stroke", C.soft); it.flow.setAttribute("stroke-width", 2); it.flow.setAttribute("stroke-dasharray", "6 14"); if (e.ambient === false) it.flow.style.display = "none";
        it.pulse = mk(); it.pulse.setAttribute("stroke", e.pcol || C.coral); it.pulse.setAttribute("stroke-width", 4);
        it.L = it.base.getTotalLength();
        it.pulse.setAttribute("stroke-dasharray", "52 " + (it.L + 200));
        if (e.arrow !== false) {
          const n = e.pts.length, a = e.pts[n - 2], b = e.pts[n - 1];
          const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
          const g = document.createElementNS(NS, "polygon"); g.setAttribute("points", "-12,-6 0,0 -12,6"); g.setAttribute("fill", e.col || C.soft);
          g.setAttribute("transform", "translate(" + b[0] + "," + b[1] + ") rotate(" + ang + ")"); el.appendChild(g); it.arrow = g;
        }
      } else if (e.k === "bar") {
        el = document.createElement("div"); abs(el, e); el.style.cssText += ";height:" + e.h + "px;width:0;border-radius:" + (e.r == null ? 6 : e.r) + "px;background:" + (e.col || C.coral);
      } else if (e.k === "tick") {
        // glass badge with a white check / cross (no green)
        const s = e.s || 24, pad = 5;
        el = document.createElement("div"); abs(el, e);
        el.style.cssText += ";margin:" + (-pad) + "px 0 0 " + (-pad) + "px;width:" + (s + 2 * pad) + "px;height:" + (s + 2 * pad) + "px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.72);border:1px solid rgba(8,47,52,.16);box-shadow:0 0 6px 1px rgba(255,255,255,.95) inset,0 2px 8px rgba(8,47,52,.10)";
        glassOn(el, e, true);
        const sv = document.createElementNS(NS, "svg"); sv.setAttribute("width", s); sv.setAttribute("height", s); sv.setAttribute("viewBox", "0 0 18 18"); sv.style.overflow = "visible";
        const p = document.createElementNS(NS, "polyline"); p.setAttribute("fill", "none"); p.setAttribute("stroke-width", 2.6); p.setAttribute("stroke-linecap", "round"); p.setAttribute("stroke-linejoin", "round");
        if (e.x2) { p.setAttribute("points", "3,3 15,15"); const q = document.createElementNS(NS, "polyline"); q.setAttribute("points", "15,3 3,15"); q.setAttribute("fill", "none"); q.setAttribute("stroke-width", 2.6); q.setAttribute("stroke-linecap", "round"); q.setAttribute("stroke", e.col || C.coral); sv.appendChild(q); it.q = q; }
        else p.setAttribute("points", "3,9.5 7.5,14 15,4.5");
        p.setAttribute("stroke", e.col || "#0F4147"); sv.appendChild(p); it.p = p; el.appendChild(sv);
      } else if (e.k === "dot") {
        el = document.createElement("div"); abs(el, e); const r = e.r || 6; el.style.cssText += ";margin:" + (-r) + "px 0 0 " + (-r) + "px;width:" + 2 * r + "px;height:" + 2 * r + "px;border-radius:50%;background:" + (e.col || C.coral);
      } else if (e.k === "logo") {
        // glass chip holding an official logo (light glass for dark marks, dark glass for white marks)
        el = document.createElement("div"); abs(el, e);
        const dark = e.mode === "dark";
        el.style.cssText += ";width:" + (e.w || 64) + "px;height:" + (e.h || 40) + "px;box-sizing:border-box;padding:" + (e.pad == null ? 7 : e.pad) + "px;border-radius:" + (e.r == null ? 10 : e.r) + "px;display:flex;align-items:center;justify-content:center;overflow:hidden;" +
          "background:" + (dark ? "#082F34" : "#FFFFFF") + ";border:1px solid " + (dark ? "#082F34" : "#E4E8EC") + ";box-shadow:0 3px 12px rgba(8,47,52,.12)";
        if (dark) glassOn(el, e, true);
        if (e.uri) { const im = document.createElement("img"); im.src = e.uri; im.style.cssText = "max-width:100%;max-height:100%;object-fit:contain;display:block"; el.appendChild(im); it.img = im; }
        else if (e.txt) { el.style.color = "#082F34"; el.style.fontWeight = 700; el.style.fontSize = (e.s || 15) + "px"; el.textContent = e.txt; }
        it.accent = e.accent || "#FFFFFF";
      } else if (e.k === "lattice") {
        // LatticeLoader port: n x n lattice that waves while working, then dissolves into a check / cross; label + stopwatch swap
        const n = e.grid === 4 ? 4 : 3, cs = e.cell || 8, gp = e.gap || 3, fs = e.fs || 16, idle = e.idle == null ? 0.15 : e.idle;
        const pat = resolveLattice(e.pattern || "orbit", n);
        el = document.createElement("div"); abs(el, e);
        el.style.cssText += ";height:" + (e.h || 44) + "px;width:" + (e.w || 250) + "px;box-sizing:border-box;padding:0 16px;border-radius:999px;display:flex;align-items:center;gap:" + Math.round(fs * 0.7) + "px;background:rgba(255,255,255,.7);border:1px solid rgba(8,47,52,.12);box-shadow:" + GLASS_SHADOW;
        glassOn(el, e, true);
        const gridEl = document.createElement("div"); gridEl.style.cssText = "display:grid;flex:none";
        const layer = () => { const l = document.createElement("div"); l.style.cssText = "grid-area:1/1;display:grid;grid-template-columns:repeat(" + n + "," + cs + "px);gap:" + gp + "px"; gridEl.appendChild(l); return l; };
        const cell = (p, round) => { const c = document.createElement("div"); c.style.cssText = "width:" + cs + "px;height:" + cs + "px;border-radius:" + (e.shape === "square" ? Math.max(1, cs * 0.25) + "px" : "50%") + ";background:" + (e.ink || "#082F34") + ";opacity:" + idle; p.appendChild(c); return c; };
        const runLayer = layer(), markLayer = layer(); markLayer.style.transformOrigin = "center";
        const runCells = pat.cells.map(() => cell(runLayer)), markCells = pat.cells.map(() => cell(markLayer));
        const mk = MARKS[n][e.status === "error" ? "error" : "done"], mcol = e.status === "error" ? (e.errorColor || "#FF7649") : (e.doneColor || "#0F4147");
        markCells.forEach((c, i) => { if (mk.includes(i)) { c.style.background = mcol; c.style.opacity = 1; } });
        el.appendChild(gridEl);
        const lw = document.createElement("div"); lw.style.cssText = "position:relative;height:" + Math.round(fs * 1.25) + "px;width:" + (e.labelW || 130) + "px;font-weight:500;font-size:" + fs + "px;line-height:" + Math.round(fs * 1.25) + "px;flex:none";
        const mkLabel = (txt) => { const s = document.createElement("span"); s.style.cssText = "position:absolute;left:0;top:0;white-space:nowrap"; s.textContent = txt; lw.appendChild(s); return s; };
        const l1 = mkLabel(e.label || "Thinking"), l2 = mkLabel(e.status === "error" ? (e.errorLabel || "Failed after") : (e.doneLabel || "Done in"));
        el.appendChild(lw);
        const timer = document.createElement("span"); timer.style.cssText = "font-family:'Geist Mono',monospace;font-size:" + Math.round(fs * 0.875) + "px;opacity:.6;font-variant-numeric:tabular-nums"; timer.textContent = "0.0s"; el.appendChild(timer);
        it.lat = { pat, runCells, runLayer, markLayer, l1, l2, timer, idle };
      } else if (e.k === "statusmark") {
        // StatusMark port: dashed idle ring -> spinning / progress arc -> drawn check or cross; label dims and is struck on done
        const s = e.size || 24, sw = e.sw || 2, r = 10 - sw / 2, Cc = 2 * Math.PI * r, P = Cc / (e.dashes || 8);
        el = document.createElement("div"); abs(el, e);
        el.style.cssText += ";display:flex;align-items:center;gap:" + Math.round(s * 0.5) + "px;line-height:1";
        const svg = document.createElementNS(NS, "svg"); svg.setAttribute("viewBox", "0 0 24 24"); svg.setAttribute("width", s); svg.setAttribute("height", s); svg.style.cssText = "flex:none;overflow:visible";
        const mkc = () => { const c = document.createElementNS(NS, "circle"); c.setAttribute("cx", 12); c.setAttribute("cy", 12); c.setAttribute("r", r); c.setAttribute("transform", "rotate(-90 12 12)"); svg.appendChild(c); return c; };
        const track = mkc(); track.setAttribute("stroke-width", sw);
        const ring = mkc(); ring.setAttribute("fill", "none"); ring.setAttribute("stroke-width", sw); ring.setAttribute("stroke-linecap", "round");
        const mkp = (d) => { const p = document.createElementNS(NS, "path"); p.setAttribute("d", d); p.setAttribute("fill", "none"); p.setAttribute("stroke-width", sw); p.setAttribute("stroke-linecap", "round"); p.setAttribute("stroke-linejoin", "round"); p.setAttribute("pathLength", 1); p.setAttribute("stroke-dasharray", "1 2"); svg.appendChild(p); return p; };
        const check = mkp("M7.5 12.25 10.5 15.25 16.75 8.75"), cross = mkp("M8.5 8.5 15.5 15.5M15.5 8.5 8.5 15.5");
        el.appendChild(svg);
        let label = null, strike = null;
        if (e.label) { label = document.createElement("span"); label.style.cssText = "position:relative;font-size:" + (e.fs || 16) + "px;line-height:1.25;white-space:nowrap;font-weight:500"; label.textContent = e.label; strike = document.createElement("span"); strike.style.cssText = "position:absolute;left:0;right:0;top:50%;height:" + Math.max(1, (e.fs || 16) / 14) + "px;background:currentColor;transform:scaleX(0);transform-origin:left center;translate:0 -50%"; label.appendChild(strike); el.appendChild(label); }
        it.sm = { r, Cc, P, track, ring, check, cross, label, strike };
      } else if (e.k === "thought") {
        // ThoughtLine port: breathing sparkle, shimmering label, step trace, settles into "Thought for Xs" and folds
        const fs = e.fs || 16;
        el = document.createElement("div"); abs(el, e);
        el.style.cssText += ";display:flex;flex-direction:column;align-items:flex-start;font-size:" + fs + "px;font-weight:500;line-height:1.2;white-space:nowrap";
        const head = document.createElement("div"); head.style.cssText = "display:inline-flex;align-items:center;gap:.3em";
        const gl = document.createElement("span"); gl.style.cssText = "display:inline-flex;width:1.1em;height:1.1em;margin-right:.2em;flex:none";
        gl.innerHTML = '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"><path d="M10 2.8c.5 4.6 2 7.2 6.6 8.1-4.6.9-6.1 3.5-6.6 8.1-.5-4.6-2-7.2-6.6-8.1C8 10 9.5 7.4 10 2.8z"/><path d="M19 14.5c.2 2 .8 3 2.8 3.4-2 .4-2.6 1.4-2.8 3.4-.2-2-.8-3-2.8-3.4 2-.4 2.6-1.4 2.8-3.4z"/></svg>';
        head.appendChild(gl);
        const stack = document.createElement("span"); stack.style.cssText = "display:inline-grid";
        const mkT = (txt) => { const s = document.createElement("span"); s.style.cssText = "grid-area:1/1;width:max-content"; s.textContent = txt; stack.appendChild(s); return s; };
        const work = mkT(e.label || "Thinking…"), done = mkT(e.doneLabel || "Thought for");
        head.appendChild(stack);
        const timer = document.createElement("span"); timer.style.cssText = "font-variant-numeric:tabular-nums;font-family:'Geist Mono',monospace;font-size:.875em"; timer.textContent = "0.0s"; head.appendChild(timer);
        const chev = document.createElement("span"); chev.style.cssText = "display:inline-flex;margin-left:.1em;width:1em;height:1em"; chev.innerHTML = '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>'; head.appendChild(chev);
        el.appendChild(head);
        const fold = document.createElement("div"); fold.style.cssText = "overflow:hidden;width:max-content"; const stepsEl = document.createElement("div"); stepsEl.style.cssText = "display:flex;flex-direction:column;gap:.45em;width:max-content;padding:.6em 0 .2em 1.6em;font-size:.875em;font-weight:400";
        const stepEls = (e.steps || []).map((st) => { const row = document.createElement("div"); row.style.cssText = "display:flex;align-items:center;gap:.5em"; const mk = document.createElement("span"); mk.style.cssText = "display:inline-grid;place-items:center;width:1em;height:1em;flex:none"; const tx = document.createElement("span"); tx.textContent = st.text; row.appendChild(mk); row.appendChild(tx); stepsEl.appendChild(row); return { row, mk, tx, t: st.t }; });
        fold.appendChild(stepsEl); el.appendChild(fold);
        it.th = { gl, stack, work, done, timer, chev, fold, stepsEl, stepEls, fullH: 0 };
      } else if (e.k === "img") {
        el = document.createElement("img"); abs(el, e); el.src = e.uri; el.style.cssText += ";width:" + e.w + "px;height:" + e.h + "px;object-fit:contain;display:block"; it.img = el;
      } else if (e.k === "stamp") {
        el = document.createElement("div"); abs(el, e);
        el.style.cssText += ";padding:8px 18px;border:3px solid " + (e.col || C.coral) + ";border-radius:12px;font-family:'Geist Mono',monospace;font-weight:500;font-size:" + (e.s || 26) + "px;letter-spacing:.08em;color:" + (e.col || C.coral) + ";background:rgba(255,255,255,.78);white-space:nowrap;box-shadow:0 0 8px 1px rgba(255,255,255,.95) inset,0 6px 20px rgba(8,47,52,.14)";
        glassOn(el, e, true); el.textContent = e.txt;
      }
      el.style.opacity = 0; stage.appendChild(el); it.el = el; items.push(it);
    });

    window.imagesReady = () => Promise.all(items.filter((i) => i.img).map((i) => i.img.decode().catch(() => null)));

    window.render = function (t) {
      items.forEach((it) => {
        const e = it.e, el = it.el;
        const inn = e.in || [0, 0];
        const pin = inn[1] <= inn[0] ? (t >= inn[0] ? 1 : 0) : eo(seg(t, inn[0], inn[1]));
        let a = pin;
        if (e.out) a *= 1 - eo(seg(t, e.out[0], e.out[1]));
        if (e.dim) a *= 1 - (1 - e.dim[2]) * eo(seg(t, e.dim[0], e.dim[1]));
        let h = 0;
        (e.hl || []).forEach((w) => { h = Math.max(h, eo(seg(t, w[0], w[0] + 0.2)) * (1 - eo(seg(t, w[1] - 0.2, w[1])))); });
        const dy = e.dy == null ? 10 : e.dy;
        if (e.k === "stamp") {
          const p = seg(t, inn[0], inn[0] + 0.22); const sc = 1.7 - 0.7 * eo(p);
          el.style.opacity = t >= inn[0] ? a : 0; el.style.transform = "translate(-50%,-50%) rotate(" + (e.rot || -6) + "deg) scale(" + sc + ")"; return;
        }
        el.style.opacity = a;
        if (e.k !== "path" && e.k !== "dot") el.style.transform = "translateY(" + (1 - pin) * dy + "px)";
        if (e.k === "box") {
          const stroke = e.stroke || (e._glass ? "#DCDFE6" : C.line);
          el.style.borderColor = mix(stroke, e.hlStroke || C.coral, h);
          if (e._glass) {
            const tint = e.hlTint || e.hlStroke || C.coral, tc = tint.length === 7 ? tint : C.coral;
            el.style.background = h > 0.02 ? "linear-gradient(" + rgba(tc, 0.10 * h) + "," + rgba(tc, 0.10 * h) + "),rgba(255,255,255,.62)" : "rgba(255,255,255,.62)";
            el.style.boxShadow = GLASS_SHADOW + (h > 0.02 ? ",0 0 " + 34 * h + "px " + rgba(tc, 0.22 * h) : "");
          } else {
            el.style.background = e.hlFill ? mix(e.fill || C.panel, e.hlFill, h) : (e.fill || C.panel);
            el.style.boxShadow = h > 0.02 ? "0 0 " + 40 * h + "px rgba(255,118,73," + 0.28 * h + ")" : "none";
          }
        } else if (e.k === "text") {
          let s = e.txt;
          if (e.type) { const p = seg(t, e.type[0], e.type[1]); const n = Math.floor(s.length * p); s = s.slice(0, n) + (p > 0 && p < 1 ? "▌" : ""); }
          if (e.count) { const c = e.count; const v = c.from + (c.to - c.from) * eo(seg(t, c.a, c.b)); s = (c.pre || "") + v.toFixed(c.dec || 0) + (c.suf || ""); }
          if (!e.html && el.textContent !== s) el.textContent = s;
          el.style.color = e.hlCol ? mix(e.col || C.txt, e.hlCol, h) : (e.col || C.txt);
        } else if (e.k === "bar") {
          const g = e.grow || [0, 0]; el.style.width = e.w * eo(seg(t, g[0], g[1])) + "px";
        } else if (e.k === "tick") {
          const p = seg(t, inn[0], inn[0] + 0.3);
          const len = e.x2 ? 17 : 16; it.p.setAttribute("stroke-dasharray", len); it.p.setAttribute("stroke-dashoffset", len * (1 - eo(p)));
          if (it.q) { it.q.setAttribute("stroke-dasharray", 17); it.q.setAttribute("stroke-dashoffset", 17 * (1 - eo(p))); }
        } else if (e.k === "logo") {
          if (h > 0.02) { const ac = it.accent.length === 7 ? it.accent : "#082F34"; el.style.boxShadow = "0 3px 12px rgba(8,47,52,.12),0 0 " + 24 * h + "px " + rgba(ac, 0.6 * h); }
        } else if (e.k === "lattice") {
          const L = it.lat, tt = Math.min(t, e.doneAt), d = (e.step || 90) * L.pat.scale, cycle = Math.round(L.pat.loop * d);
          L.runCells.forEach((c, i) => {
            const unit = L.pat.cells[i]; let op = L.idle;
            if (unit == null) op = L.idle * 0.47;
            else { const local = tt * 1000 - e.from * 1000 - Math.round(unit * d); if (local >= 0) op = L.idle + (1 - L.idle) * latWave((local % cycle) / cycle, L.pat.lit); }
            c.style.opacity = op;
          });
          const k = eo(seg(t, e.doneAt, e.doneAt + 0.2));
          L.runLayer.style.opacity = 1 - k; L.markLayer.style.opacity = k; L.markLayer.style.transform = "scale(" + (0.9 + 0.1 * k) + ")";
          L.l1.style.opacity = 1 - k; L.l1.style.filter = "blur(" + 2 * k + "px)"; L.l2.style.opacity = k; L.l2.style.filter = "blur(" + 2 * (1 - k) + "px)";
          const ds = Math.floor(Math.max(0, tt - e.from) * 10);
          L.timer.textContent = ds < 600 ? (ds / 10).toFixed(1) + "s" : Math.floor(ds / 600) + "m " + ((ds % 600) / 10).toFixed(1) + "s";
        } else if (e.k === "statusmark") {
          const S = it.sm, tR = e.tRun, tD = e.tDone, ink = e.ink || "#082F34", dc = e.fail ? (e.errorColor || "#FF7649") : (e.doneColor || "#0F4147");
          const run = t >= tR, done = t >= tD, IDLE = 0.3;
          const m = run ? eo(seg(t, tR, tR + 0.3)) : 0;
          const prog = (tt) => (e.prog ? clamp(seg(tt, tR, tD)) : 0.68);
          const arcRun = run ? prog(Math.min(t, tD)) : 1;
          const arc = done ? arcRun + (1 - arcRun) * eo(seg(t, tD, tD + 0.3)) : arcRun;
          const dash = IDLE * S.P + (arc * S.Cc - IDLE * S.P) * m, gap = (1 - IDLE) * S.P + ((1 - arc) * S.Cc - (1 - IDLE) * S.P) * m;
          S.ring.setAttribute("stroke-dasharray", Math.max(0, dash) + " " + Math.max(0, gap));
          let travel = 0;
          if (run && !e.prog) { const raw = -S.Cc * (((Math.min(t, tD) - tR) * 1000) / (e.spin || 1100)); travel = done ? raw + (Math.floor(raw / S.Cc) * S.Cc - raw) * eo(seg(t, tD, tD + 0.3)) : raw; }
          S.ring.setAttribute("stroke-dashoffset", travel);
          const col = done ? mix(ink, dc, eo(seg(t, tD, tD + 0.2))) : ink;
          S.ring.setAttribute("stroke", col); S.ring.style.opacity = 0.55 + 0.45 * m;
          S.track.setAttribute("stroke", col); S.track.setAttribute("fill", col);
          S.track.setAttribute("stroke-opacity", done ? 0 : 0.2 * m); S.track.setAttribute("fill-opacity", done ? (e.fillOpacity == null ? 0.12 : e.fillOpacity) * eo(seg(t, tD, tD + 0.18)) : 0);
          const draw = eo(seg(t, tD + 0.12, tD + 0.12 + (e.draw || 0.24)));
          const mark = e.fail ? S.cross : S.check; mark.setAttribute("stroke", dc); mark.setAttribute("stroke-dashoffset", 1.05 * (1 - draw)); mark.style.opacity = done && t >= tD + 0.12 ? 1 : 0;
          if (S.label) { S.label.style.opacity = done ? 0.65 - 0.05 * eo(seg(t, tD, tD + 0.2)) + 0 : (run ? 1 : 0.65); S.label.style.color = ink; if (e.strike) S.strike.style.transform = "scaleX(" + eo(seg(t, tD + 0.18, tD + 0.46)) + ")"; }
        } else if (e.k === "thought") {
          const T = it.th, from = e.from, dn = e.doneAt, period = e.period || 1.6, depth = e.depth == null ? 0.45 : e.depth;
          const k = eo(seg(t, dn, dn + 0.35)), working = t < dn;
          const tt = Math.min(t, dn);
          // glyph breathes while working, dims to .55 when settled
          const breath = (x) => { const ph = (((x - from) % period) + period) % period / period; return (1 - depth) + depth * (0.5 - 0.5 * Math.cos(2 * Math.PI * ph)); };
          const gOp = working ? breath(t) : breath(dn) + (0.55 - breath(dn)) * k;
          T.gl.style.opacity = gOp;
          // label: shimmer sweep while working, crossfade + blur into the settled sentence
          const sh = ((((t - from) % (e.shimmer || 1.8)) + (e.shimmer || 1.8)) % (e.shimmer || 1.8)) / (e.shimmer || 1.8);
          T.work.style.backgroundImage = "linear-gradient(100deg,rgba(8,47,52,.45) 30%,#082F34 50%,rgba(8,47,52,.45) 70%)"; T.work.style.backgroundSize = "250% 100%"; T.work.style.backgroundPosition = (125 - 250 * sh) + "% 0"; T.work.style.webkitBackgroundClip = "text"; T.work.style.backgroundClip = "text"; T.work.style.webkitTextFillColor = "transparent";
          T.work.style.opacity = 1 - k; T.work.style.filter = "blur(" + 2 * k + "px)"; T.done.style.opacity = 0.75 * k; T.done.style.filter = "blur(" + 2 * (1 - k) + "px)";
          const wW = T.work.offsetWidth, dW = T.done.offsetWidth, sW = T.stack.offsetWidth;
          T.timer.style.transform = "translateX(" + ((wW + (dW - wW) * k) - sW) + "px)"; T.timer.style.opacity = 0.55 + 0.2 * k;
          const ds = Math.floor(Math.max(0, tt - from) * 10); T.timer.textContent = ds < 600 ? (ds / 10).toFixed(1) + "s" : Math.floor(ds / 600) + "m " + ((ds % 600) / 10).toFixed(1) + "s";
          // steps: appear one by one, earlier ones tick; whole trace folds on settle
          const hasSteps = T.stepEls.length > 0; T.chev.style.opacity = hasSteps ? 0.55 : 0;
          T.chev.style.transform = "rotate(" + 180 * (working ? eo(seg(t, from, from + 0.2)) : 1 - k) + "deg)";
          let lastVisible = -1; T.stepEls.forEach((s, i) => { if (t >= s.t) lastVisible = i; });
          T.stepEls.forEach((s, i) => {
            const a = eo(seg(t, s.t, s.t + 0.2)); s.row.style.opacity = a; s.row.style.transform = "translateY(" + (1 - a) * -4 + "px)";
            const isDone = !working || i < lastVisible;
            s.mk.innerHTML = isDone ? '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>' : '<i style="display:block;width:.4em;height:.4em;border-radius:50%;background:currentColor;opacity:' + (0.55 + 0.45 * (0.5 - 0.5 * Math.cos(2 * Math.PI * ((t * 1000 / 1600) % 1)))) + '"></i>';
            s.mk.style.opacity = 0.55; s.tx.style.opacity = isDone ? 0.55 : 1;
          });
          if (hasSteps) { T.fullH = T.stepsEl.offsetHeight; const open = working ? 1 : (e.collapse === false ? 1 : 1 - k); T.fold.style.height = T.fullH * open + "px"; T.fold.style.opacity = open; }
        } else if (e.k === "path") {
          it.flow.setAttribute("stroke-dashoffset", -(t * 40));
          if (e.pulse) { const p = seg(t, e.pulse[0], e.pulse[1]); const on = t >= e.pulse[0] && t <= e.pulse[1] + 0.02; const s = p * (it.L + 52) - 52; it.pulse.setAttribute("stroke-dashoffset", -s); it.pulse.style.opacity = on ? 1 : 0; }
          else it.pulse.style.opacity = 0;
        }
      });
    };
    window.render(0);
  };
  window.MORING_C = C;
})();
