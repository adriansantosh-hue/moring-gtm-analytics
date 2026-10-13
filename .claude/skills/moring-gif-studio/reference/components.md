# Engine elements and component ports

A post is `{ id, dur, alt, els: [...] }`. `render(t)` evaluates every element at time `t` seconds. Common fields on any element: `in: [t0, t1]` fade/slide in (default visible at 0), `out: [t0, t1]`, `dim: [t0, t1, minOpacity]`, `hl: [[t0, t1], ...]` highlight windows (glow / tint), `dy` slide distance.

| kind | what | key fields |
|---|---|---|
| `box` | glass card by default (GlassSurface port); solid if `fill` is set | `x y w h r stroke hlStroke hlTint glass:false` |
| `text` | sans or `mono:true` | `txt s wt col w lh ls al pre html type:[a,b] count:{a,b,from,to,pre,suf,dec} hlCol` |
| `path` | circuit line with flowing dashes, arrowhead, coral pulse | `pts:[[x,y]...] pulse:[a,b] pcol ambient:false arrow:false` |
| `tick` | glass badge with a drawn check (or `x2:true` cross) | `x y s col` |
| `stamp` | glass stamp that pops in | `txt col s rot` |
| `logo` | chip holding an official logo, glow in the brand accent on `hl` | `uri mode:"dark" accent w h pad` (use helper `logo(x,y,name)`) |
| `img` | plain image (Moring logo) | `uri w h` |
| `bar` | growing bar | `w h col grow:[a,b]` |
| `dot` | node dot | `r col` |
| `lattice` | LatticeLoader port: wave then check, label + stopwatch swap | `from doneAt label doneLabel pattern grid w labelW` (helper `LL`) |
| `statusmark` | StatusMark port: dashed ring, spinning / progress arc, drawn check, optional struck label | `tRun tDone prog:true fail strike label size` (helper `SM`) |
| `thought` | ThoughtLine port: breathing sparkle, shimmer label, step trace, "Thought for Xs" fold | `from doneAt steps:[{t,text}] label doneLabel fs` (helper `TH`) |

Spec helpers in `specs.js`: `T B P K XX S` (text, box, path, tick, cross, stamp), `shell()` (frame furniture), `table()` (revealing rows, optional `sm:true` for StatusMark per row), `term()` (dark terminal with typed lines), `logo()`, `LL()`, `SM()`, `TH()`.

## Where each component earns its place
- **GlassSurface**: every card, row and chip. Port details: displacement map data-URI per box, three `feDisplacementMap` channels (red / green / blue offsets 0 / 10 / 20), `distortionScale -140`, applied as `backdrop-filter: url(#id)`. Small badges use plain blur.
- **LatticeLoader**: "agent is checking / signing / awaiting approval" status chips. Patterns available: orbit, snake, spiral, ripple, arrow, dots (3x3) and sweep, spin, rain, pulse (4x4).
- **StatusMark**: checklist rows and matrix cells that go pending to running to done.
- **ThoughtLine**: where an agent reasons before acting (claims agent, evidence prep, policy check).
- Pass colour is teal ink `#0F4147`, never green.

## Motion templates (plan section 9) mapped to builds
G1 flow = T1-P1, T4-P2, T5-P2 (paths + pulses + stamps). G2 typewriter = T3-P1, T3-P2 (`term`). G3 checklist = T1-P2, T2-P2, T5-P1, T6-P2, T9 (`table`, `SM`). G4 before/after = T2-P1, T7, T6-P3. G5 counter = T1-P2, T4-P1 (`count`). G6 timeline = T6-P1. G7 poll = not built yet (question + three answer pills pulsing).
