// Build brands.json: data-URI + measured dominant brand colour for every logo downloaded from the live sites (plus open-licensed fallbacks).
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const dir = path.join(__dirname, "live");
const src = JSON.parse(fs.readFileSync(path.join(dir, "sources.json"), "utf8"));
const LG = require("./icons/node_modules/@iconify-json/logos/icons.json");
const brands = {};
for (const [k, v] of Object.entries(src)) {
  const f = path.join(dir, v.file); const svg = v.file.endsWith("svg");
  brands[k] = { source: v.src, uri: `data:${svg ? "image/svg+xml" : "image/png"};base64,` + fs.readFileSync(f).toString("base64"), live: true };
}
// Azure's own site only serves the Microsoft mark; Databricks / OpenAI block downloads: use open-licensed marks (iconify "logos" set)
const fromSet = (n) => { const d = LG.icons[n]; const w = d.width || LG.width || 24, h = d.height || LG.height || 24; const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${d.body}</svg>`; return "data:image/svg+xml;base64," + Buffer.from(s).toString("base64"); };
brands.azure = { source: "iconify logos/azure-icon (open set)", uri: fromSet("azure-icon"), live: false };
brands.databricks = { source: "iconify logos/databricks-icon (open set)", uri: fromSet("databricks-icon"), live: false };
brands.openai = { source: "iconify logos/openai-icon (open set)", uri: fromSet("openai-icon"), live: false };
brands.okta.mode = "dark"; // white wordmark: sits on dark glass

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
  const port = 9355;
  const edge = spawn(EDGE, ["--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`, `--user-data-dir=${path.join(__dirname, "prof-assets")}`, "about:blank"], { stdio: "ignore" });
  let tg;
  for (let i = 0; i < 60; i++) { try { tg = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page"); if (tg) break; } catch (e) {} await sleep(300); }
  const ws = new WebSocket(tg.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
  let id = 0; const pend = new Map(); ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } };
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pend.set(i, (d) => (d.error ? rej(new Error(JSON.stringify(d.error))) : res(d.result))); ws.send(JSON.stringify({ id: i, method, params })); });
  await send("Runtime.enable");
  const expr = `(async()=>{const B=${JSON.stringify(Object.fromEntries(Object.entries(brands).map(([k, v]) => [k, v.uri])))};const out={};
    for(const [k,u] of Object.entries(B)){ try{ const img=new Image(); img.src=u; await img.decode(); const c=document.createElement('canvas'); c.width=c.height=64; const x=c.getContext('2d'); x.drawImage(img,0,0,64,64); const d=x.getImageData(0,0,64,64).data; const bins={};
      for(let i=0;i<d.length;i+=4){ const a=d[i+3]; if(a<200) continue; const r=d[i],g=d[i+1],b=d[i+2]; const mx=Math.max(r,g,b),mn=Math.min(r,g,b); const sat=mx?(mx-mn)/mx:0; if(sat<0.28||mx<60) continue; const key=((r>>5)<<6)|((g>>5)<<3)|(b>>5); const e=bins[key]||(bins[key]={n:0,r:0,g:0,b:0}); e.n++;e.r+=r;e.g+=g;e.b+=b; }
      let best=null; for(const e of Object.values(bins)) if(!best||e.n>best.n) best=e;
      out[k]=best?('#'+[best.r,best.g,best.b].map(v=>Math.round(v/best.n).toString(16).padStart(2,'0')).join('')):null; }catch(e){ out[k]='ERR'; } } return out; })()`;
  const r = await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true });
  const acc = r.result.value;
  for (const [k, v] of Object.entries(brands)) v.accent = acc[k] && acc[k] !== "ERR" ? acc[k] : "#9FB6B9";
  ws.close(); edge.kill();
  fs.writeFileSync(path.join(__dirname, "brands.json"), JSON.stringify(brands));
  console.log(Object.entries(brands).map(([k, v]) => k + " " + v.accent + (v.live ? "" : " (open set)")).join("\n"));
  process.exit(0);
})();
