const C = { bg: "#FFFFFF", panel: "#F7F4EE", panel2: "#E6EFF0", term: "#082F34", line: "#DCDFE6", mute: "#5A6A6A", soft: "#5A6A6A", txt: "#082F34", txt2: "#5A6A6A", coral: "#FF7649", coralD: "#F05F30", ok: "#0F4147" };
const T = (x, y, txt, o = {}) => ({ k: "text", x, y, txt, w: 952, ...o });
const B = (x, y, w, h, o = {}) => ({ k: "box", x, y, w, h, ...o });
const P = (pts, o = {}) => ({ k: "path", pts, ...o });
const K = (x, y, at, o = {}) => ({ k: "tick", x, y, in: [at, at + 0.3], ...o });
const XX = (x, y, at, o = {}) => ({ k: "tick", x, y, x2: true, col: C.coral, in: [at, at + 0.3], ...o });
const S = (x, y, txt, at, o = {}) => ({ k: "stamp", x, y, txt, in: [at, at + 0.3], ...o });
const mono = { mono: true };
const MORING_LOGO = "data:image/svg+xml;base64," + Buffer.from(require("fs").readFileSync(require("path").join(__dirname, "live", "moring-logo-dark.svg"), "utf8").replace(/<metadata>[\s\S]*?<\/metadata>/, "")).toString("base64");
// StatusMark: dashed ring -> spinning arc -> drawn check (tRun / tDone in seconds)
const SM = (x, y, tRun, tDone, o = {}) => ({ k: "statusmark", x, y, tRun, tDone, size: o.size || 26, in: [Math.max(0, tRun - 0.5), Math.max(0, tRun - 0.5) + 0.01], dy: 0, ...(o.rest || {}), ...o.extra });
// ThoughtLine: breathing sparkle + shimmer label + step trace, settles into "Thought for Xs" and folds
const TH = (x, y, from, doneAt, steps, o = {}) => ({ k: "thought", x, y, from, doneAt, steps: steps.map(([t, text]) => ({ t, text })), label: o.label || "Thinking…", doneLabel: o.doneLabel || "Thought for", fs: o.fs || 16, in: [from - 0.2, from + 0.1], dy: 0, ...(o.rest || {}) });
// LatticeLoader chip: working wave -> check, label + stopwatch swap (from / doneAt in seconds)
const LL = (x, y, w, label, doneLabel, from, doneAt, o = {}) => ({ k: "lattice", x, y, w, h: o.h || 42, label, doneLabel, labelW: o.labelW || 150, from, doneAt, pattern: o.pattern || "orbit", grid: o.grid || 3, fs: o.fs || 16, in: [from - 0.2, from + 0.1], ...(o.rest || {}) });
const BR = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "brands.json"), "utf8"));
const ACCENT = { okta: "#007DC1", anthropic: "#D97757", github: "#E6EDF3", mcp: "#E6EDF3", openai: "#10A37F", opa: "#7D9199" }; // brands whose logo is monochrome / white: accent from brand guidelines
function logo(x, y, name, o = {}) {
  const b = BR[name];
  if (!b) throw new Error("no brand asset " + name);
  const accent = ACCENT[name] || b.accent;
  return { k: "logo", x, y, w: o.w || 64, h: o.h || 40, uri: b.uri, mode: name === "okta" ? "dark" : "light", accent, pad: o.pad, ...(o.rest || {}) };
}
const WM = (x, y, txt, o = {}) => ({ k: "logo", x, y, w: o.w || 96, h: o.h || 36, txt, s: o.s || 15, ...(o.rest || {}) });

function shell(tag, title, sub, foot, lines, ts = 54) {
  const els = [
    T(64, 56, tag, { ...mono, s: 15, ls: 0.16, col: "#3F7076", w: 700 }),
    T(64, 84, title, { s: ts, wt: 700, lh: 1.08, ls: -0.02, html: true }),
  ];
  if (sub) els.push(T(64, lines === 1 ? 160 : 206, sub, { s: 24, col: C.txt2 }));
  els.push(B(64, 956, 952, 1, { fill: C.line, stroke: C.line, bw: 0, r: 0 }));
  els.push(T(64, 976, foot, { ...mono, s: 13, col: C.mute, ls: 0.06, w: 780 }));
  els.push({ k: "img", x: 862, y: 970, w: 154, h: 37, uri: MORING_LOGO });
  return els;
}

function table(o) {
  const els = [];
  const { x = 64, y, w = 952, cols, head, rows, rowH = 70, gap = 10, at = 1, step = 0.6, fs = 22, tick = false, hlCol = 99 } = o;
  let cx = x + 24;
  head.forEach((h, i) => { if (h) els.push(T(cx, y, h, { ...mono, s: 13, col: i === hlCol ? C.coral : C.mute, ls: 0.08, w: cols[i] - 16 })); cx += cols[i]; });
  rows.forEach((r, ri) => {
    const t0 = at + ri * step, ry = y + 34 + ri * (rowH + gap);
    els.push(B(x, ry, w, rowH, { in: [t0, t0 + 0.35], hl: [[t0 + 0.15, t0 + step + 0.5]] }));
    let cx2 = x + 24;
    r.forEach((c, ci) => {
      const cpl = Math.max(8, (cols[ci] - 34) / (fs * 0.52));
      const lines = Math.ceil(c.length / cpl);
      const ty = ry + (rowH - lines * fs * 1.25) / 2;
      els.push(T(cx2, ty, c, { s: fs, wt: ci === 0 ? 700 : 500, col: ci === 0 ? C.txt : C.txt2, w: cols[ci] - 30, in: [t0 + 0.1, t0 + 0.45], lh: 1.25 }));
      cx2 += cols[ci];
    });
    if (o.sm) els.push(SM(x + w - 56, ry + rowH / 2 - 13, t0 + 0.2, t0 + step - 0.05, { size: 26, extra: { in: [t0 + 0.1, t0 + 0.4] } }));
    else if (tick) els.push(K(x + w - 52, ry + rowH / 2 - 12, t0 + 0.5));
  });
  return els;
}

function term(lines, opt = {}) {
  const els = [B(64, 270, 952, opt.h || 600, { fill: C.term, stroke: C.line, r: 16 })];
  [0, 1, 2].forEach((i) => els.push({ k: "dot", x: 96 + i * 26, y: 302, r: 7, col: ["#FF7649", "#9AA6AC", "#E4E8EC"][i] }));
  els.push(T(180, 292, opt.name || "terminal", { ...mono, s: 14, col: "#7FA0A4", w: 400 }), logo(930, 284, "mcp", { w: 70, h: 34, pad: 5 }), T(820, 292, "MCP", { ...mono, s: 14, col: "#7FA0A4", w: 100, al: "right" }));
  const TERM = { [C.soft]: "#9FB6B9", [C.ok]: "#FFFFFF", [C.coralD]: "#FF8F6B" };
  lines.forEach((l) => els.push(T(96, l.y, l.txt, { ...mono, pre: true, s: l.s || 24, col: TERM[l.col] || l.col || "#FFFFFF", w: 880, type: l.type, in: [l.type[0], l.type[0] + 0.01], dy: 0 })));
  return els;
}

const specs = [];

// ---------- T1-P1 ----------
{
  const els = shell("MORING.AI · ENGINEERING", "What is an AI control plane?", "Every agent action passes ONE checkpoint before it runs.", "Deny · Attribute · Replay — the 3-question test", 1);
  els.push(B(360, 268, 360, 74, { hl: [[1.1, 2.4]] }), T(384, 280, "AGENT", { ...mono, s: 12, col: C.mute }), T(384, 302, "Claims triage agent", { s: 22 }));
  els.push(P([[540, 342], [540, 404]], { pulse: [1.3, 1.95] }));
  els.push(B(64, 404, 952, 196, { hl: [[2.0, 3.8]] }), T(90, 420, "CONTROL PLANE", { ...mono, s: 16, col: C.coralD }));
  [["Identity", "Okta", "okta"], ["Authorization", "OPA", null], ["Egress", "Gateway", null], ["Audit", "Splunk", "splunk"], ["Containment", "Sandbox", null]].forEach(([n, tl, lg], i) => {
    const x = 90 + i * 184, at = 2.1 + i * 0.32;
    els.push(B(x, 456, 172, 112, { hl: [[at, 3.8]] }), T(x + 16, 468, n, { s: 19, wt: 500, w: 150 }), T(x + 16, 498, tl, { ...mono, s: 13, col: C.soft, w: 150 }), K(x + 172 - 44, 526, at + 0.1));
    if (lg) els.push(logo(x + 16, 524, lg, { w: 62, h: 32, pad: 5 }));
    else if (tl === "OPA") els.push(logo(x + 16, 524, "opa", { w: 62, h: 32, pad: 3 }));
  });
  els.push(P([[290, 600], [290, 690]], { pulse: [3.8, 4.3], pcol: C.ok }), P([[790, 600], [790, 690]], { pulse: [3.8, 4.3] }));
  els.push(B(64, 690, 452, 84, { hl: [[4.3, 6]], hlStroke: C.ok }), logo(86, 704, "guidewire", { w: 46, h: 40, pad: 5 }), T(146, 708, "Guidewire · set reserve", { s: 22, w: 340 }), T(88, 746, "in policy · bounded", { ...mono, s: 14, col: C.soft }));
  els.push(B(564, 690, 452, 84, { hl: [[4.3, 6]] }), T(588, 704, "Unknown host · send data out", { s: 22 }), T(588, 746, "out of boundary", { ...mono, s: 14, col: C.soft }));
  els.push(S(440, 668, "ALLOW ✓", 4.3, { col: C.ok, s: 22 }), S(940, 668, "DENY ✕", 4.3, { s: 22 }));
  els.push(B(64, 806, 952, 90, { in: [4.7, 5.0] }), T(88, 818, "→ SIGNED AUDIT RECORD", { ...mono, s: 16, col: C.coralD, in: [4.7, 5.0] }), T(88, 848, "principal=agent-7 · tool=set_reserve · result=allow · denied=1 · sig=0x9f3a…", { ...mono, s: 16, type: [4.9, 5.9], pre: true, w: 900, in: [4.8, 4.81], dy: 0 }));
  els.push(T(64, 922, "RUNS IN YOUR CLOUD", { ...mono, s: 13, col: C.mute, w: 220, ls: 0.1, in: [5.4, 5.8] }), logo(296, 912, "aws", { w: 70, h: 34, pad: 4, rest: { in: [5.4, 5.8] } }), logo(378, 912, "azure", { w: 70, h: 34, pad: 4, rest: { in: [5.5, 5.9] } }), logo(460, 912, "gcp", { w: 70, h: 34, pad: 4, rest: { in: [5.6, 6.0] } }));
  els.push(LL(724, 408, 270, "Checking", "Done in", 2.0, 3.7, { labelW: 100 }), TH(748, 276, 0.3, 1.5, [[0.5, "Read claim 4471"], [0.9, "Propose set_reserve $12,000"]], { label: "Thinking…", doneLabel: "Thought for", fs: 19 }));
  specs.push({ id: "T1-P1_what-is-an-ai-control-plane", dur: 6.4, alt: "What is an AI control plane and how do you evaluate one", els });
}

// ---------- T1-P2 ----------
{
  const els = shell("MORING.AI · AI GOVERNANCE", "More than 40% of agentic AI projects will be canceled by 2027", null, "Gartner, 2025 — directional, not our ROI · agentic AI governance framework", 2);
  els.push(T(64, 236, "0%", { s: 150, wt: 700, col: C.coral, lh: 1, w: 420, count: { a: 0.6, b: 2.0, from: 0, to: 40, suf: "%" } }));
  els.push(T(500, 262, "Not because models are weak.", { s: 30, wt: 700, w: 516 }));
  els.push(T(500, 312, "Because no one can answer: who acted, under what policy, with what evidence?", { s: 22, col: C.txt2, w: 516, in: [1.8, 2.3] }));
  els.push(T(64, 420, "Gartner, 2025 — directional", { ...mono, s: 14, col: C.mute }));
  els.push(T(64, 484, "THE FIX: A 36-CHECK MATRIX, RUN ON ONE AGENT BEFORE SCALE", { ...mono, s: 16, col: C.coralD, in: [2.6, 3.0], w: 952 }));
  ["Identity", "Policy", "Egress", "Trace", "Caps", "Kill switch"].forEach((n, i) => {
    const x = 64 + (i % 3) * 324, y = 524 + Math.floor(i / 3) * 150, at = 3.2 + i * 0.4;
    els.push(B(x, y, 304, 130, { in: [2.8, 3.2], hl: [[at, at + 0.9]] }), T(x + 22, y + 24, n, { s: 26, wt: 700, w: 240, in: [2.8, 3.2] }), T(x + 22, y + 74, i === 5 ? "drill ✓" : "cleared", { ...mono, s: 16, col: C.ok, w: 200, in: [at, at + 0.3] }), SM(x + 304 - 58, y + 18, at - 0.55, at, { size: 30, extra: { in: [2.8, 3.2] } }));
  });
  els.push(T(64, 830, "Result: cleared · conditional · not-ready", { ...mono, s: 16, col: C.txt2, in: [5.3, 5.7] }));
  els.push(LL(640, 470, 376, "Running 36 checks", "Done in", 3.2, 5.3, { labelW: 170, pattern: "snake" }));
  specs.push({ id: "T1-P2_ai-agent-governance-framework", dur: 6.4, alt: "Why 40 percent of agentic AI projects face cancellation and the governance fix", els });
}

// ---------- T2-P1 ----------
{
  const els = shell("MORING.AI · BANKING OPERATIONS", "KYC Ops: what if the evidence pack arrived ready, not chased?", null, "AI agent governance for banks · KYC onboarding evidence · human approves", 2);
  els.push(B(64, 262, 952, 262, { dim: [3.0, 3.6, 0.35] }), T(88, 278, "TODAY · ONE ONBOARDING", { ...mono, s: 16, col: C.coralD, w: 500 }));
  ["Core", "CRM", "Docs", "Sanctions", "ID check", "Email"].forEach((n, i) => {
    els.push(B(88 + i * 152, 314, 140, 48, { dim: [3.0, 3.6, 0.35] }));
    if (n === "CRM") els.push(logo(98 + i * 152, 320, "salesforce", { w: 58, h: 36, pad: 4, rest: { dim: [3.0, 3.6, 0.4] } }), T(160 + i * 152, 326, "CRM", { s: 18, w: 70, dim: [3.0, 3.6, 0.4] }));
    else if (n === "Email") els.push(logo(98 + i * 152, 320, "microsoft", { w: 40, h: 36, pad: 6, rest: { dim: [3.0, 3.6, 0.4] } }), T(146 + i * 152, 326, "Email", { s: 18, w: 70, dim: [3.0, 3.6, 0.4] }));
    else els.push(T(88 + i * 152, 326, n, { s: 18, al: "center", w: 140, dim: [3.0, 3.6, 0.4] }));
  });
  els.push(B(88, 410, 430, 90, { dim: [3.0, 3.6, 0.4] }), T(110, 422, "Scattered evidence", { s: 24, wt: 700, w: 390 }), T(110, 458, "3 analysts reconcile conflicts", { ...mono, s: 14, col: C.soft, w: 390 }));
  els.push(P([[518, 455], [588, 455]], { dim: [3.0, 3.6, 0.4] }), B(588, 410, 400, 90, { stroke: C.coral, dim: [3.0, 3.6, 0.4] }), T(612, 422, "Backlog: days", { s: 24, wt: 700, col: C.coralD, w: 360 }), T(612, 458, "reviewers re-check thin packs", { ...mono, s: 14, col: C.soft, w: 360 }));
  els.push(B(64, 556, 952, 338, { in: [2.8, 3.3], stroke: C.ok }), T(88, 572, "WITH A GOVERNED WORKFLOW AGENT", { ...mono, s: 14, col: C.ok, in: [2.8, 3.3], w: 600 }));
  [["Agent preps", "gathers + compares evidence"], ["Human approves", "named reviewer, full record"], ["One trail", "SR 11-7 / SR 26-2 ready"]].forEach(([a, b], i) => {
    const x = 88 + i * 312, at = 3.3 + i * 0.6;
    els.push(B(x, 618, 280, 110, { in: [at, at + 0.3], hl: [[at + 0.2, 6]], hlStroke: C.ok }), T(x + 20, 636, a, { s: 26, wt: 700, w: 250, in: [at, at + 0.3] }), T(x + 20, 676, b, { ...mono, s: 14, col: C.soft, w: 250, in: [at, at + 0.3] }));
    if (i < 2) els.push(P([[x + 280, 673], [x + 312, 673]], { pulse: [at + 0.4, at + 0.8], pcol: C.ok, in: [at, at + 0.3] }));
  });
  els.push(TH(88, 760, 3.3, 5.0, [[3.5, "Gather evidence from 6 systems"], [4.0, "Compare and flag true exceptions"], [4.5, "Assemble the reviewer pack"]], { label: "Preparing the pack…", doneLabel: "Prepared in", fs: 19 }), T(88, 806, "Owner: Head of KYC / Onboarding Ops", { ...mono, s: 16, col: C.soft, in: [5.3, 5.7], w: 700 }), T(88, 842, "Cycle time drops. The approval stays human.", { s: 28, wt: 700, in: [5.5, 5.9], w: 880 }));
  specs.push({ id: "T2-P1_ai-agent-governance-for-banks", dur: 6.6, alt: "AI agent governance for banks KYC onboarding evidence workflow", els });
}

// ---------- T2-P2 ----------
{
  const els = shell("MORING.AI · POC TO PRODUCTION", "You fixed one agent failure. What else did you break?", null, "Governed AI agents · prompt changes need evals + approval gates, not vibes", 2);
  els.push(B(64, 262, 952, 128, { stroke: C.coral }), T(92, 280, "Handoffs fell  ✓", { s: 30, wt: 700, w: 860 }), T(92, 326, "…but missing-record cases started auto-passing  ✕", { s: 26, col: C.coralD, wt: 500, w: 860 }));
  els.push(T(64, 426, "BEFORE ANY CHANGE GOES LIVE", { ...mono, s: 16, col: C.coralD, in: [0.8, 1.2], w: 700 }));
  els.push(...table({ y: 452, cols: [952], head: [""], rows: [["Prompt change"], ["Evals pass — routing accuracy gates the release"], ["Approval gate"], ["Audit log written"], ["Go-live — only after the gates"]], rowH: 66, gap: 10, at: 1.8, step: 0.9, fs: 24, sm: true }));
  specs.push({ id: "T2-P2_governed-ai-agents-poc-to-production", dur: 6.6, alt: "POC to production checklist governed AI agents evals approval gates", els });
}

// ---------- T3-P1 ----------
{
  const els = shell("MORING.AI · MCP", "MCP standardizes the connection. It does NOT govern it.", null, "MCP governance · scoped per-tool tokens (RFC 8707) · gateway when shared", 2);
  els.push(...term([
    { y: 336, txt: "$ mint scoped token per tool", type: [0.6, 1.7] },
    { y: 392, txt: "  aud-bound · RFC 8707", type: [1.8, 2.7], col: C.soft },
    { y: 448, txt: "$ never pass the user token through  ✕", type: [2.9, 4.0], col: C.coralD },
    { y: 504, txt: "$ gateway when shared: auth·route·version", type: [4.1, 5.3] },
    { y: 560, txt: "$ golden datasets: test tool-selection", type: [5.4, 6.5] },
    { y: 650, txt: "✓ governed", type: [6.7, 7.2], col: C.ok, s: 44 },
  ], { name: "mcp-gateway — governed", h: 520 }));
  specs.push({ id: "T3-P1_mcp-governance", dur: 7.6, alt: "MCP governance scoped tokens gateway hosting table", els });
}

// ---------- T3-P2 ----------
{
  const els = shell("MORING.AI · MCP SECURITY", "Four ways an MCP setup gets attacked, and the fix for each.", null, "MCP security · tool poisoning · indirect prompt injection (XPIA) · sandbox + audit", 2);
  els.push(...term([
    { y: 336, txt: "$ command injection → sandbox servers", type: [0.6, 1.8], s: 23 },
    { y: 400, txt: "$ indirect injection → human confirm", type: [1.9, 3.1], s: 23 },
    { y: 464, txt: "$ tool poisoning → sign + version", type: [3.2, 4.4], s: 23 },
    { y: 528, txt: "$ rug-pull → audit before prod", type: [4.5, 5.7], s: 23 },
    { y: 620, txt: "scoped identity + egress boundary", type: [5.9, 6.7], s: 23, col: C.soft },
    { y: 660, txt: "+ tamper-evident log", type: [6.7, 7.3], s: 23, col: C.soft },
    { y: 740, txt: "✓ infrastructure, not a demo", type: [7.4, 8.1], col: C.ok, s: 34 },
  ], { name: "mcp-server — hardening", h: 640 }));
  specs.push({ id: "T3-P2_mcp-security", dur: 8.4, alt: "MCP security threats tool poisoning indirect injection defenses", els });
}

// ---------- T4-P1 ----------
{
  const els = shell("MORING.AI · AI-DLC COST", "No per-PR cost attribution = $100⁠–⁠200K of shadow AI spend", null, "Illustrative per-PR mock · Moring AI-DLC measure — proposed, not your ROI", 2);
  els.push(T(64, 232, "$0", { s: 130, wt: 700, col: C.coral, lh: 1, w: 420, count: { a: 0.5, b: 2.2, from: 0, to: 200, pre: "$", suf: "K" } }));
  els.push(T(500, 262, "hides in one invoice", { s: 30, wt: 700, w: 516 }), T(500, 310, "Every call should carry: team · agent · PR · tokens · cost · trace ID", { s: 21, col: C.txt2, w: 516, in: [1.8, 2.3] }));
  els.push(B(64, 410, 952, 316, { in: [2.4, 2.8] }), T(88, 424, "COST PER PR · ILLUSTRATIVE MOCK", { ...mono, s: 13, col: C.mute, in: [2.4, 2.8], w: 600 }));
  [["PR #412 · reviewer agent", 38], ["PR #413 · docs agent", 12], ["PR #414 · refactor agent", 91], ["PR #415 · test agent", 27]].forEach(([n, v], i) => {
    const y = 466 + i * 60, a = 2.8 + i * 0.35;
    els.push(logo(86, y - 3, "github", { w: 34, h: 34, pad: 3, rest: { in: [a, a + 0.3] } }), T(130, y + 2, n, { s: 18, col: C.txt2, w: 224, in: [a, a + 0.3] }), B(360, y, 520, 28, { fill: "#E4E8EC", stroke: "#E4E8EC", bw: 0, r: 6, in: [a, a + 0.3] }), { k: "bar", x: 360, y, w: Math.round(520 * v / 91), h: 28, col: v === 91 ? C.coral : C.mute, grow: [a, a + 0.8], in: [a, a + 0.2] }, T(896, y + 1, "$" + v, { ...mono, s: 20, col: C.txt, w: 100, in: [a + 0.6, a + 1.0] }));
  });
  els.push(B(64, 756, 952, 150, { in: [4.6, 5.0], stroke: C.ok }), T(88, 774, "SHADOW SPEND RECOVERED", { ...mono, s: 14, col: C.ok, in: [4.6, 5.0], w: 600 }), T(88, 806, "One gateway, every call tagged. Cost layer live day 4.", { s: 26, wt: 700, in: [4.8, 5.2], w: 880 }), T(88, 852, "Prompt caching 50–90% off cacheable input · tier-routing 60–80% blended", { s: 19, col: C.txt2, in: [5.1, 5.5], w: 880 }));
  specs.push({ id: "T4-P1_ai-agent-cost-observability", dur: 6.4, alt: "AI agent cost observability per PR attribution chart", els });
}

// ---------- T4-P2 ----------
{
  const els = shell("MORING.AI · ARCHITECTURE", "Orchestration moves work. Governance decides what may move.", null, "Governs actions that CROSS layers · request path, not a sidecar", 2, 50);
  const L = [["Models", "foundation + task models"], ["Agent runtime", "orchestration: moves the work"], ["CONTROL PLANE", "identity · authz · egress · audit · containment"], ["Systems of record", "ledger · claims · CRM"], ["Evidence", "signed, replayable trail"]];
  L.forEach(([n, s], i) => {
    const y = 268 + i * 116, cp = i === 2, at = 1.2 + i * 0.65;
    els.push(B(64, y, 952, 88, { hl: cp ? [[2.6, 6.4]] : [[at, at + 0.7]], hlFill: cp ? C.panel2 : undefined }), T(92, y + 14, n, { s: cp ? 28 : 26, wt: 700, col: cp ? C.coral : C.txt, w: 600 }), T(92, y + 52, s, { ...mono, s: 14, col: C.soft, w: 700 }));
    const lgs = [["anthropic", "openai", "gcp"], ["databricks"], [], ["salesforce", "sap", "servicenow", "workday"], ["splunk", "datadog"]][i];
    lgs.forEach((nm, j) => els.push(logo(1016 - 20 - (lgs.length - j) * 76 + 12, y + 24, nm, { w: 64, h: 40, pad: 6 })));
    if (i < 4) els.push(P([[540, y + 88], [540, y + 116]], { pulse: [at + 0.3, at + 0.75] }));
  });
  els.push(S(840, 512, "IN THE REQUEST PATH", 3.2, { s: 17, rot: -4 }));
  specs.push({ id: "T4-P2_ai-agent-orchestration-governance", dur: 6.4, alt: "Enterprise AI architecture where control plane fits five layer stack", els });
}

// ---------- T5-P1 ----------
{
  const els = shell("MORING.AI · AUDIT TRAIL", "Who acted at 03:00, under what policy, with what evidence?", null, "EU AI Act Art. 12 shape: automatic · lifetime · retrievable", 2);
  els.push(B(64, 262, 952, 640), T(96, 282, "ONE RECORD PER ACTION · ILLUSTRATIVE", { ...mono, s: 16, col: C.coralD, w: 700 }));
  [["who", "agent-claims-07 · for j.alvarez"], ["what", "set_reserve(claim=4471, $12,000)"], ["when", "2026-09-24T03:00:14Z"], ["system", "Guidewire · prod"], ["result", "allowed · approved by claims lead"], ["duration", "412 ms"], ["cost", "$0.004 · 3,180 tokens"], ["signature", "0x9f3a…c1 · append-only"]].forEach(([k, v], i) => {
    const y = 336 + i * 66, a = 0.9 + i * 0.55;
    els.push(T(96, y, k, { ...mono, s: 18, col: C.mute, w: 180, in: [a, a + 0.2] }), T(290, y - 3, v, { s: 26, wt: 500, w: 680, type: [a, a + 0.5], in: [a, a + 0.01], dy: 0 }), K(970, y, a + 0.5), B(96, y + 44, 888, 1, { fill: C.line, stroke: C.line, bw: 0, r: 0, in: [a, a + 0.3] }));
  });
  els.push(LL(640, 270, 350, "Signing record", "Signed in", 0.9, 5.4, { labelW: 160, pattern: "snake" }));
  specs.push({ id: "T5-P1_ai-agent-audit-trail", dur: 6.8, alt: "AI agent audit trail schema who what when result cost signature", els });
}

// ---------- T5-P2 ----------
{
  const els = shell("MORING.AI · HUMAN IN THE LOOP", "Approval gates are the feature, not the friction.", null, "AI agent approval workflow · allow / escalate / deny · everything logged", 2);
  els.push(B(64, 268, 280, 80, { hl: [[1.0, 2.0]] }), T(88, 290, "Agent proposes", { s: 26, wt: 700, w: 240 }), P([[344, 308], [400, 308]], { pulse: [1.2, 1.8] }));
  els.push(B(400, 268, 280, 80, { hl: [[1.8, 3.2]] }), T(424, 290, "Policy check", { s: 26, wt: 700, w: 240 }));
  const dimB = { dim: [3.6, 4.0, 0.4] };
  els.push(P([[540, 348], [540, 430], [212, 430], [212, 520]], { pulse: [3.0, 3.6], ...dimB }), P([[540, 348], [540, 520]], { pulse: [3.0, 3.6] }), P([[540, 348], [540, 430], [868, 430], [868, 520]], { pulse: [3.0, 3.6], ...dimB }));
  els.push(B(64, 520, 296, 96, { ...dimB, hlStroke: C.ok }), T(88, 536, "AUTO-ALLOW", { s: 22, wt: 700, w: 250, ...dimB, col: C.ok }), T(88, 574, "read-only · bounded", { ...mono, s: 14, col: C.soft, w: 250, ...dimB }));
  els.push(B(392, 520, 296, 96, { hl: [[3.6, 6.8]] }), T(416, 536, "ESCALATE TO HUMAN", { s: 22, wt: 700, w: 270 }), T(416, 574, "writes · money · PII", { ...mono, s: 14, col: C.soft, w: 250 }));
  els.push(B(720, 520, 296, 96, { ...dimB }), T(744, 536, "DENY + ALERT", { s: 22, wt: 700, w: 250, ...dimB, col: C.coralD }), T(744, 574, "out of boundary", { ...mono, s: 14, col: C.soft, w: 250, ...dimB }));
  els.push(P([[540, 616], [540, 690]], { pulse: [3.8, 4.4] }), B(392, 690, 296, 84, { hl: [[4.4, 6.8]], hlStroke: C.ok, in: [4.0, 4.4] }), T(416, 706, "Named reviewer", { s: 22, wt: 700, w: 260, in: [4.0, 4.4] }), T(416, 740, "approve / reject", { ...mono, s: 14, col: C.soft, w: 250, in: [4.0, 4.4] }), K(644, 706, 5.0));
  els.push(B(64, 810, 952, 88, { in: [5.2, 5.6], stroke: C.ok }), T(88, 824, "EVERYTHING LOGGED", { ...mono, s: 13, col: C.ok, in: [5.2, 5.6], w: 500 }), T(88, 852, "proposed action · evidence · expected result · decision", { s: 22, wt: 500, in: [5.4, 5.8], w: 880 }));
  els.push(TH(704, 268, 1.8, 3.2, [[2.0, "Identity: agent-claims-07"], [2.4, "Scope: set_reserve"], [2.8, "Writes need a human"]], { label: "Checking policy…", doneLabel: "Checked in", fs: 19 }), LL(704, 698, 312, "Awaiting approval", "Approved in", 4.4, 5.3, { labelW: 160, pattern: "dots" }));
  specs.push({ id: "T5-P2_ai-agent-approval-workflow", dur: 7.0, alt: "AI agent approval workflow gate flowchart allow escalate deny", els });
}

// ---------- T6-P1 ----------
{
  const els = shell("MORING.AI · BANK AI GOVERNANCE", "SR 11-7 is superseded. GenAI and agents are not in SR 26-2.", null, "SR 26-2 (Apr 2026) · non-enforceable guidance · GenAI / agentic not in scope", 2);
  const xs = [150, 390, 630, 870];
  const N = [["SR 11-7", "model risk, superseded"], ["SR 26-2", "Apr 2026"], ["GenAI carved out", "not in scope"], ["Your call", "govern before asked"]];
  xs.slice(0, 3).forEach((x, i) => els.push(P([[x + 18, 330], [xs[i + 1] - 18, 330]], { pulse: [1.0 + i * 1.0, 1.8 + i * 1.0], ambient: true })));
  N.forEach(([a, b], i) => {
    const x = xs[i], at = 0.9 + i * 1.0;
    els.push({ k: "dot", x, y: 330, r: 16, col: i === 3 ? C.coral : C.mute, in: [0, 0] }, B(x - 110, 380, 220, 130, { hl: [[at, 6.6]], hlStroke: i === 3 ? C.coral : C.ok }), T(x - 90, 398, a, { s: 25, wt: 700, w: 190, col: i === 3 ? C.coral : C.txt }), T(x - 90, 454, b, { ...mono, s: 14, col: C.soft, w: 190 }));
  });
  els.push(T(64, 580, "You have a window, not an exemption.", { s: 40, wt: 700, in: [4.2, 4.7], w: 952 }));
  els.push(T(64, 654, "Guidance, not a rule, aimed mostly at banks over $30B. Agents touching credit, ledger and customer data still need your own controls.", { s: 24, col: C.txt2, in: [4.6, 5.1], w: 900 }));
  els.push(T(64, 756, "workload identity per agent · policy-as-code · human approval on writes · one evidence trail", { ...mono, s: 16, col: C.soft, in: [5.2, 5.7], w: 900 }));
  els.push(S(870, 282, "GOVERN NOW ✓", 5.0, { col: C.ok, s: 22, rot: -4 }));
  specs.push({ id: "T6-P1_sr-26-2-ai-governance-banks", dur: 6.8, alt: "SR 26-2 explained: what it says, what it does not cover, and what banks should do", els });
}

// ---------- T6-P2 ----------
{
  const els = shell("MORING.AI · INSURANCE CLAIMS", "NAIC exam: show the model, data, decision and human owner", null, "NAIC AI Model Bulletin · roughly half the states · governed claims triage", 2);
  els.push(...table({ y: 262, cols: [270, 682], head: ["NAIC EXPECTS", "GOVERNED CLAIMS TRIAGE"], hlCol: 1, rows: [["Inventory", "Every agent registered, one named owner"], ["Testing", "Evals before every change"], ["Governance", "Adjuster decides; the agent preps"], ["Documentation", "Rationale + evidence kept per claim"]], rowH: 104, gap: 12, at: 1.2, step: 0.9, fs: 26, tick: true }));
  els.push(T(64, 836, "−40% cycle time (Moring insurance measure — PROPOSED) means nothing if the file can't survive review.", { s: 23, col: C.txt2, in: [5.2, 5.7], w: 900 }));
  specs.push({ id: "T6-P2_naic-ai-model-bulletin-compliance", dur: 6.8, alt: "NAIC AI model bulletin compliance matrix insurers", els });
}

// ---------- T6-P3 ----------
{
  const els = shell("MORING.AI · COMPARISON", "12 questions to ask any AI governance platform, including ours", null, "Score 2 shown live · 1 documented · 0 nothing. Ask for evidence, not slides.", 2);
  els.push(...table({ y: 262, cols: [190, 380, 382], head: ["", "ASK THE VENDOR", "A GOOD ANSWER SHOWS"], hlCol: 2, rows: [["Runs where", "Whose account and keys?", "Yours, shown live"], ["Scope", "One platform, or across tools?", "Across clouds and tools"], ["Block", "Before the action runs?", "Yes, on the arguments"], ["Policy", "Code you can test in CI?", "Readable, shadow mode"], ["Evidence", "One record per action?", "Signed, denials included"]], rowH: 100, gap: 10, at: 1.2, step: 0.8, fs: 23 }));
  specs.push({ id: "T6-P3_ai-governance-platform-questions", dur: 6.2, alt: "Questions to ask any AI governance platform before you sign", els });
}

// ---------- T7 ----------
{
  const els = shell("MORING.AI · ENTERPRISE RAG", "Retrieval won. Generation lost.", "RAG note from an enterprise workflow.", "Illustrative trace, redacted · version-pinned corpus + eval before each index swap", 1);
  els.push(B(64, 270, 952, 268, { dim: [3.0, 3.6, 0.35] }), T(88, 286, "BEFORE", { ...mono, s: 16, col: C.coralD, w: 300 }));
  els.push(T(88, 322, "Q: what is the escalation limit?", { s: 24, wt: 500, w: 860, dim: [3.0, 3.6, 0.4] }), T(88, 372, "top-k chunks look relevant  ✓", { s: 24, col: C.txt2, w: 860, dim: [3.0, 3.6, 0.4] }), T(88, 420, "cites Policy_BU3_v2019 — superseded  ✕", { s: 24, col: C.coralD, w: 860, dim: [3.0, 3.6, 0.4] }), T(88, 480, "hallucinated citations in production", { ...mono, s: 16, col: C.soft, w: 860, dim: [3.0, 3.6, 0.4] }));
  els.push(S(860, 330, "WRONG VERSION", 1.6, { s: 20, rot: -5, dim: [3.0, 3.6, 0.4] }));
  els.push(B(64, 570, 952, 326, { in: [2.8, 3.3], stroke: C.ok }), T(88, 586, "AFTER", { ...mono, s: 14, col: C.ok, in: [2.8, 3.3], w: 300 }));
  ["version-pinned corpus", "source filter per business unit", "50 golden Q/A before each index swap"].forEach((n, i) => els.push(T(88, 626 + i * 50, "✓  " + n, { s: 25, wt: 500, w: 860, in: [3.3 + i * 0.5, 3.7 + i * 0.5] })));
  els.push(T(88, 800, "0", { s: 80, wt: 700, col: C.ok, lh: 1, w: 120, in: [5.0, 5.4] }), T(190, 822, "hallucinated citations", { s: 26, wt: 700, w: 700, in: [5.1, 5.5] }), T(190, 858, "Boring. Effective. Production.", { ...mono, s: 15, col: C.soft, w: 700, in: [5.4, 5.8] }));
  specs.push({ id: "T7_rag-pipelines-enterprise", dur: 6.6, alt: "Enterprise RAG pipeline version pinned eval", els });
}

// ---------- T8 ----------
{
  const els = shell("MORING.AI · AGENT EVALS", "Gap rate lied until we measured routing.", "Agent eval note — illustrative.", "Evals that gate releases > evals that decorate dashboards", 2);
  els.push(B(64, 270, 460, 400), T(92, 290, "FIX RATE", { ...mono, s: 14, col: C.mute, w: 300 }), T(92, 330, "+0%", { s: 120, wt: 700, col: C.ok, lh: 1, w: 400, count: { a: 0.8, b: 2.2, from: 0, to: 20, pre: "+", suf: "%" } }), B(92, 500, 400, 22, { fill: "#E4E8EC", stroke: "#E4E8EC", bw: 0, r: 6 }), { k: "bar", x: 92, y: 500, w: 330, h: 22, col: C.ok, grow: [0.8, 2.2] }, T(92, 548, "improved  ✓", { s: 26, wt: 700, w: 400, in: [2.2, 2.6] }));
  els.push(B(556, 270, 460, 400, { hl: [[3.2, 6.6]] }), T(584, 290, "ROUTING ACCURACY", { ...mono, s: 14, col: C.mute, w: 400 }), T(584, 330, "?", { s: 120, wt: 700, col: C.coral, lh: 1, w: 400, out: [3.4, 3.8] }), T(584, 550, "missing-record cases auto-pass ✕", { s: 22, wt: 500, col: C.coralD, w: 400, in: [2.6, 3.0], out: [3.4, 3.8] }), T(584, 330, "✓", { s: 120, wt: 700, col: C.ok, lh: 1, w: 400, in: [3.6, 4.0] }), T(584, 480, "the right cases reach the human", { s: 28, wt: 700, w: 400, in: [3.8, 4.2] }), T(584, 580, "the gating metric", { s: 24, wt: 500, col: C.ok, w: 400, in: [4.0, 4.4] }));
  els.push(B(64, 710, 952, 170, { in: [4.6, 5.0], stroke: C.ok }), T(92, 730, "RELEASE GATE", { ...mono, s: 14, col: C.ok, in: [4.6, 5.0], w: 400 }), T(92, 768, "No ship without routing accuracy.", { s: 40, wt: 700, in: [4.8, 5.2], w: 880 }), T(92, 828, "Evals that gate releases > evals that decorate dashboards.", { s: 22, col: C.txt2, in: [5.2, 5.6], w: 880 }));
  specs.push({ id: "T8_ai-agent-evaluation", dur: 6.4, alt: "Agent evaluation routing accuracy gate", els });
}

// ---------- T9 ----------
{
  const els = shell("MORING.AI · BUILD VS BUY", "Build an AI control plane: 6–12 months, or assemble in weeks", null, "Build wins when the surface is tiny · Buy wins when auditors ask for one trail", 2);
  els.push(...table({ y: 262, cols: [230, 370, 352], head: ["", "BUILD IT", "ASSEMBLE IT"], hlCol: 2, rows: [["Time", "6–12 months", "Weeks"], ["Team", "Dedicated team", "Uses your IAM + KMS"], ["Policy engine", "You build it", "Already built"], ["Adapters", "MCP · REST · gRPC: you build", "Already built"], ["Audit log", "Signed log: you build it", "Already built"], ["Keys and lock-in", "Yours", "You own keys, no lock-in"]], rowH: 80, gap: 10, at: 1.2, step: 0.75, fs: 22 }));
  els.push(logo(928, 406, "aws", { w: 70, h: 36, pad: 5, rest: { in: [2.1, 2.5] } }));
  specs.push({ id: "T9_ai-control-plane-build-vs-buy", dur: 6.8, alt: "Build vs buy AI control plane table", els });
}

// ---------- T1-P3 ----------
{
  const els = shell("MORING.AI · ENGINEERING", "Can you stop a running agent?", "Pressing disable is not the test. Timing what happens next is.", "AI agent kill-switch drill · stop, prove it stopped, list what it did", 1);
  els.push(LL(64, 228, 420, "Agent running", "Stopped in", 0.5, 1.7, { labelW: 170, pattern: "spiral" }));
  els.push(T(520, 236, "T0 = the moment someone decides to stop", { ...mono, s: 16, col: C.soft, w: 496, in: [0.6, 1.0] }));
  els.push(T(64, 300, "THE DRILL · STAGING FIRST", { ...mono, s: 16, col: C.coralD, w: 600, in: [1.0, 1.4] }));
  els.push(...table({ y: 326, cols: [500, 452], head: ["STEP", "PASS ="], rows: [["Stop new actions", "call denied + logged"], ["Stop in-flight retries", "0 actions after T0"], ["List every write", "full list < 10 min"], ["Decide what to undo", "rollback or named owner"], ["Restart under approval", "a different named person"]], rowH: 78, gap: 12, at: 1.6, step: 0.7, fs: 24, sm: true }));
  els.push(B(64, 836, 952, 92, { in: [5.3, 5.7], stroke: C.ok }), T(88, 852, "SCORE", { ...mono, s: 14, col: C.ok, w: 200, in: [5.3, 5.7] }), T(88, 878, "Time from T0 to the agent’s last action.", { s: 26, wt: 700, w: 900, in: [5.4, 5.8] }));
  specs.push({ id: "T1-P3_ai-agent-kill-switch-drill", dur: 7.0, alt: "How do you test an AI agent kill switch?", els });
}

// ---------- T2-P3 ----------
{
  const els = shell("MORING.AI · CLAIMS OPERATIONS", "Heads of Claims: measure 4 numbers before any AI demo.", null, "Claims triage baseline · label it measured · the handler decides", 2);
  els.push(T(64, 262, "PULL 20 CLAIMS FROM LAST MONTH", { ...mono, s: 16, col: C.coralD, w: 700 }));
  const miss = [3, 7, 8, 13, 17];
  for (let i = 0; i < 20; i++) {
    const x = 64 + i * 48, at = 0.5 + i * 0.06, m = miss.includes(i);
    els.push(B(x, 296, 40, 52, { in: [at, at + 0.2], r: 8, hl: m ? [[2.0, 7.4]] : undefined, hlStroke: m ? C.coral : undefined, hlTint: m ? C.coral : undefined }));
  }
  els.push(T(64, 360, "illustrative sample · coral = routed to the wrong queue first", { ...mono, s: 14, col: C.mute, w: 900, in: [2.0, 2.4] }));
  [["Time to first assignment", "median, notice → assignment"], ["Routing misses", "first queue ≠ final queue"], ["Chase rate", "≥1 info request to claimant"], ["Severity drift", "rating changed after review"]].forEach(([a, b], i) => {
    const x = 64 + (i % 2) * 486, y = 410 + Math.floor(i / 2) * 150, at = 2.4 + i * 0.5;
    els.push(B(x, y, 466, 130, { in: [at - 0.3, at], hl: [[at, at + 0.9]] }), T(x + 22, y + 22, (i + 1) + "  " + a, { s: 25, wt: 700, w: 380, in: [at - 0.3, at] }), T(x + 22, y + 82, b, { ...mono, s: 15, col: C.soft, w: 400, in: [at - 0.3, at] }), SM(x + 466 - 56, y + 20, at, at + 0.45, { size: 28 }));
  });
  els.push(B(64, 730, 952, 196, { in: [4.6, 5.0], stroke: C.ok }), T(88, 746, "THEN READ THE MISSES", { ...mono, s: 14, col: C.ok, w: 600, in: [4.6, 5.0] }));
  els.push(TH(88, 780, 4.8, 6.0, [[5.0, "Read the notice + pull the policy"], [5.4, "List missing documents"]], { label: "Drafting triage note…", doneLabel: "Drafted in", fs: 19 }));
  els.push(T(88, 862, "The agent drafts the note. The handler makes the call.", { s: 27, wt: 700, w: 900, in: [6.0, 6.4] }));
  specs.push({ id: "T2-P3_ai-claims-triage-baseline", dur: 7.4, alt: "How do you measure claims triage before automating it with AI?", els });
}

// ---------- T4-P3 ----------
{
  const els = shell("MORING.AI · AGENT COST", "Cost per token is the wrong number.", "Track cost per accepted task.", "Retries, empty runs, tool calls and review time are not on the token bill", 1);
  els.push(B(64, 228, 952, 96, { fill: C.term, stroke: C.term, r: 14 }));
  els.push(T(92, 244, "COST PER ACCEPTED TASK =", { ...mono, s: 14, col: "#9FB6B9", w: 600 }));
  els.push(T(92, 272, "(model + tools + review time) / accepted tasks", { ...mono, s: 26, col: "#FFFFFF", w: 900, pre: true, type: [0.5, 1.8], in: [0.5, 0.51], dy: 0 }));
  els.push(B(64, 356, 952, 360, { in: [1.9, 2.3] }), T(88, 372, "$ PER ACCEPTED TASK · ILLUSTRATIVE", { ...mono, s: 13, col: C.mute, w: 600, in: [1.9, 2.3] }));
  [["docs-agent", "96% accepted", 0.40], ["reviewer-agent", "75% accepted", 1.90], ["refactor-agent", "33% accepted", 9.75]].forEach(([n, acc, v], i) => {
    const y = 420 + i * 86, a = 2.3 + i * 0.45, hi = v > 5;
    els.push(T(88, y, n, { s: 22, wt: 700, w: 240, in: [a, a + 0.3] }), T(88, y + 32, acc, { ...mono, s: 14, col: hi ? C.coralD : C.soft, w: 240, in: [a, a + 0.3] }));
    els.push(B(340, y + 6, 540, 30, { fill: "#E4E8EC", stroke: "#E4E8EC", bw: 0, r: 6, in: [a, a + 0.3] }), { k: "bar", x: 340, y: y + 6, w: Math.max(12, Math.round(540 * v / 9.75)), h: 30, col: hi ? C.coral : C.mute, grow: [a, a + 0.8], in: [a, a + 0.2] }, T(896, y + 6, "$" + v.toFixed(2), { ...mono, s: 20, w: 110, in: [a + 0.6, a + 1.0] }));
  });
  els.push(T(88, 676, "Low acceptance costs more than token price.", { s: 20, col: C.txt2, w: 900, in: [3.8, 4.2] }));
  els.push(B(64, 748, 952, 172, { in: [4.8, 5.2], stroke: C.ok }), T(88, 766, "THE HUMAN CHECK", { ...mono, s: 14, col: C.ok, w: 600, in: [4.8, 5.2] }));
  els.push(T(88, 798, "Review minutes up, token cost down?", { s: 27, wt: 700, w: 900, in: [5.0, 5.4] }), T(88, 842, "The agent is moving work, not removing it. The owner defines “accepted”; a person approves budget changes.", { s: 20, col: C.txt2, w: 900, in: [5.3, 5.7] }));
  specs.push({ id: "T4-P3_ai-agent-cost-per-task", dur: 6.8, alt: "How do you measure the real cost of an AI agent per task?", els });
}

// ---------- C-P5 ----------
{
  const els = shell("MORING.AI · AI AGENT PILOTS", "Write one page first.", "Before any AI agent pilot starts. A blank line means not ready.", "Keep outcomes labeled: proposed · modeled · measured · realized", 1);
  els.push(B(64, 230, 952, 610, { fill: C.panel, stroke: C.line }));
  els.push(T(96, 252, "AI AGENT PILOT CHARTER · 1 PAGE", { ...mono, s: 15, col: C.coralD, w: 700 }));
  [["Workflow", "a business process, not an LLM use case"], ["Owner", "one name + the risk stakeholder"], ["Baseline", "measured on real recent cases"], ["Success", "written before the pilot starts"], ["Scope", "read · draft · write, each write approved"], ["Stop rule", "who pauses, who approves a restart"]].forEach(([a, b], i) => {
    const y = 296 + i * 88, at = 0.9 + i * 0.6;
    els.push(B(96, y, 888, 72, { in: [at - 0.65, at - 0.35], hl: [[at, at + 0.8]], fill: "#FFFFFF" }), T(124, y + 22, a, { s: 25, wt: 700, w: 230, in: [at - 0.6, at - 0.3] }), T(360, y + 26, b, { s: 20, col: C.txt2, w: 520, in: [at - 0.6, at - 0.3] }), SM(984 - 54, y + 22, at, at + 0.45, { size: 28 }));
  });
  els.push(S(880, 884, "READY TO START", 5.0, { col: C.ok, s: 22, rot: -4 }));
  els.push(T(64, 872, "A named human approves every write.", { s: 26, wt: 700, w: 640, in: [5.3, 5.7] }));
  specs.push({ id: "C-P5_ai-agent-pilot-charter", dur: 6.6, alt: "What should an AI agent pilot plan include before it starts?", els });
}


// ---------- T5-P3 ----------
{
  const els = shell("MORING.AI · AI GOVERNANCE", "Approvers said yes to everything. Is the gate working?", null, "AI agent approval gate health check · from the audit records you already keep", 2);
  els.push(T(64, 258, "0%", { s: 120, wt: 700, col: C.coral, lh: 1, w: 380, count: { a: 0.5, b: 1.9, from: 0, to: 100, suf: "%" } }));
  els.push(T(440, 266, "approved · median 3s to decide", { s: 26, wt: 700, w: 576, in: [1.2, 1.6] }), T(440, 306, "illustrative month on one approval rule", { ...mono, s: 14, col: C.mute, w: 576, in: [1.2, 1.6] }), T(440, 340, "A click, not a control.", { s: 24, col: C.coralD, w: 576, in: [1.9, 2.3] }));
  els.push(T(64, 420, "FIVE CHECKS ON YOUR AUDIT RECORDS", { ...mono, s: 16, col: C.coralD, w: 700, in: [2.2, 2.6] }));
  els.push(...table({ y: 446, cols: [440, 512], head: ["CHECK", "PASS ="], rows: [["Approval rate per rule", "the gate says no sometimes"], ["Time to decide", "fits the evidence to review"], ["Load per approver", "no one person does most"], ["Timeouts", "fail closed · target 0"], ["Self-approval", "approver ≠ requester · target 0"]], rowH: 72, gap: 10, at: 2.6, step: 0.65, fs: 23, sm: true }));
  specs.push({ id: "T5-P3_ai-agent-approval-gate-health-check", dur: 7.0, alt: "How do you know if AI agent approval gates are working?", els });
}


const EM = { "T1-P1": "AI control plane", "T1-P2": "40%", "T2-P1": "arrived ready", "T2-P2": "What else did you break?", "T3-P1": "does NOT govern it.", "T3-P2": "the fix for each.", "T4-P1": "$100\u2060–\u2060200K of shadow AI spend", "T4-P2": "Governance decides what may move.", "T5-P1": "with what evidence?", "T5-P2": "not the friction.", "T6-P1": "not in SR 26-2.", "T6-P2": "human owner", "T6-P3": "including ours", "T7": "Generation lost.", "T8": "routing", "T9": "or assemble in weeks", "T1-P3": "stop", "T2-P3": "4 numbers", "T4-P3": "the wrong number.", "C-P5": "one page", "T5-P3": "yes to everything." };
const FREE = {"T1-P1": "control-plane-3-question-test.md", "T1-P2": "agent-readiness-36-checks.csv", "T2-P1": "kyc-evidence-pack-template.md", "T2-P2": "agent-change-release-gate.md", "T3-P1": "mcp-governance-and-security-checklist.md", "T3-P2": "mcp-governance-and-security-checklist.md", "T4-P1": "ai-cost-attribution.md", "T4-P2": "five-layer-agent-stack-map.md", "T5-P1": "agent-audit-record.schema.json", "T5-P2": "agent-action-gate.rego", "T6-P1": "sr-26-2-agentic-ai-scope-explainer.md", "T6-P2": "naic-ai-exam-readiness-checklist.md", "T6-P3": "ai-governance-platform-questions.md", "T7": "rag-version-pinning-eval-checklist.md", "T8": "agent-change-release-gate.md", "T9": "build-vs-buy-control-plane-scorecard.csv", "T1-P3": "agent-kill-switch-drill.md", "T2-P3": "claims-triage-baseline-worksheet.md", "T4-P3": "cost-per-accepted-task.md", "C-P5": "agent-pilot-one-page-charter.md", "T5-P3": "approval-gate-health-check.md"};
// NOFREE=1 renders without the free-file strip (for posts that ship no file link)
specs.forEach((sp) => { const f = FREE[sp.id.split("_")[0]]; if (f && !process.env.NOFREE) sp.els.push(T(64, 1014, "FREE FILE · NO FORM · " + f + " · LINK IN COMMENTS", { ...mono, s: 15, col: C.coralD, ls: 0.04, w: 952, in: [1.2, 1.6] })); });
specs.forEach((sp) => { const key = sp.id.split("_")[0], t = sp.els[1], ph = EM[key]; if (!ph || !t.txt.includes(ph)) { console.log("EM MISS", key); return; } t.txt = t.txt.replace(ph, '<em style="color:#FF7649;font-style:italic">' + ph + "</em>"); });
module.exports = { specs, C };
