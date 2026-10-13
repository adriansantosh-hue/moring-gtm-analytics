const fs = require("fs");
const path = require("path");
const { spawn, execFileSync } = require("child_process");
const { specs } = require("./specs.js");

const ROOT = __dirname;
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const FPS = 20;
const only = process.argv[2] ? process.argv[2].split(",") : null;
const OUT = process.env.GIF_OUT || path.join(ROOT, "out");
fs.mkdirSync(path.join(ROOT, "pages"), { recursive: true });
fs.mkdirSync(path.join(ROOT, "frames"), { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

const lib = fs.readFileSync(path.join(ROOT, "lib.js"), "utf8");
const font = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,500;1,700&family=Geist+Mono:wght@400;500&display=swap">`;
const pageFor = (s) => `<!doctype html><html><head><meta charset="utf-8">${font}<style>body{margin:0;background:#fff}</style></head><body><div id="stage"></div><script>${lib}</script><script>window.SPEC=${JSON.stringify(s)};initScene(window.SPEC);</script></body></html>`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const port = 9344;
  const prof = path.join(ROOT, "prof-cdp");
  const edge = spawn(EDGE, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, "--window-size=1080,1080", "about:blank"], { stdio: "ignore" });
  let targets;
  for (let i = 0; i < 60; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.find((t) => t.type === "page")) break; } catch (e) {} await sleep(300); }
  const tgt = targets.find((t) => t.type === "page");
  const ws = new WebSocket(tgt.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const pend = new Map();
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } };
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pend.set(i, (d) => (d.error ? rej(new Error(method + ": " + JSON.stringify(d.error))) : res(d.result))); ws.send(JSON.stringify({ id: i, method, params })); });
  await send("Page.enable"); await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1080, height: 1080, deviceScaleFactor: 1, mobile: false });

  for (const s of specs) {
    if (only && !only.some((o) => s.id.startsWith(o))) continue;
    const pf = path.join(ROOT, "pages", s.id + ".html");
    fs.writeFileSync(pf, pageFor(s));
    await send("Page.navigate", { url: "file:///" + pf.replace(/\\/g, "/") });
    for (let i = 0; i < 100; i++) { const r = await send("Runtime.evaluate", { expression: "document.readyState==='complete' && typeof render==='function'" , returnByValue: true }); if (r.result.value) break; await sleep(100); }
    await send("Runtime.evaluate", { expression: "document.fonts.ready.then(()=>true)", awaitPromise: true, returnByValue: true });
    await send("Runtime.evaluate", { expression: "imagesReady().then(()=>true)", awaitPromise: true, returnByValue: true });
    await sleep(400);
    const fdir = path.join(ROOT, "frames", s.id); fs.mkdirSync(fdir, { recursive: true });
    const n = Math.round(s.dur * FPS);
    for (let f = 0; f < n; f++) {
      await send("Runtime.evaluate", { expression: `render(${(f / FPS).toFixed(4)})` });
      const shot = await send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(path.join(fdir, "f" + String(f).padStart(4, "0") + ".png"), Buffer.from(shot.data, "base64"));
    }
    // static first-frame fallback (the hook)
    await send("Runtime.evaluate", { expression: "render(0)" });
    const jp = await send("Page.captureScreenshot", { format: "jpeg", quality: 92 });
    fs.writeFileSync(path.join(OUT, s.id + ".jpg"), Buffer.from(jp.data, "base64"));
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(fdir, "f%04d.png"), "-vf", "split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=none", path.join(OUT, s.id + ".gif")]);
    console.log("done", s.id, n, "frames", (fs.statSync(path.join(OUT, s.id + ".gif")).size / 1e6).toFixed(2) + " MB");
  }
  ws.close(); edge.kill();
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
