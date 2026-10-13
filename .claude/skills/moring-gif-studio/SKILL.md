---
name: moring-gif-studio
description: Build on-brand animated GIFs / social visuals for Moring (moring.ai) posts, matching the live website look (light theme, coral italic key phrase, glass cards, real tool logos, status loaders). Use when asked to make GIFs, animated visuals, LinkedIn or X post graphics, or "a visual for the title-wise content plan" for Moring. Covers the whole loop - scene spec, deterministic frame render, GIF export, review, canvas upload.
---

# Moring GIF Studio

Turns a post from `docs/Moring_LinkedIn_X_TitleWise_Content_Plan_2026-09-24.md` into a looping GIF that looks like moring.ai. Proven on all 16 posts (T1-P1 to T9). The engine lives in `engine/`; every frame is a pure function of time, so renders are deterministic.

## When to use
- "make a GIF / animated visual / social graphic for <post or title>"
- restyling or re-rendering the existing set (`assets/gifs/linkedin-square/`)
- adding a new post type, tool logo, or React-Bits-style component to the visuals

## Output spec (from plan section 9, plus what worked)
- **1080x1080** is the default: works on LinkedIn feed (more mobile feed area than 1.91:1) and on X. Make 1200x675 only if asked (engine is 1080x1080; add a wrapper offset like the early X cut did).
- 20 fps, 5 to 8 s loop, **first frame is the hook** (title visible at t=0, motion starts after about 0.4 s).
- LinkedIn GIF at most 8 MB, X at most 15 MB (ours are 0.1 to 2 MB). Always also export the first-frame JPG fallback.
- **Alt-text = the post's primary keyword question**; keep it in `README_alt-text.md`. Never put a URL in the GIF; the link goes in the first comment.
- Stats carry source + year on the frame. Moring numbers say "proposed". Invented examples say "illustrative". No new stats.
- Banned in visuals: claiming an AWS Marketplace listing; "AICP / control plane" jargon in workflow-post hooks (T2 / T6 use "governed workflow agent" language); green check marks (the user dislikes green, pass states use teal ink); competitor claims that are not in the plan text.

## Brand (read from the live site, 2026-10-02)
See `reference/brand.md`. Short version: white ground, ink-teal `#082F34`, coral `#FF7649` (small coral text uses coral hover `#F05F30` at 16 px+; official palette in `reference/brand.md`, cream `#F7F4EE` cards, teal wash `#E6EFF0`), DM Sans + Geist Mono, one **coral italic key phrase per headline** (like "AI agents" on the hero), tracked mono caption, glass cards with soft teal shadows, dark terminal pane for code posts, real Moring logo bottom right (`engine/live/moring-logo-dark.svg`; the `-light` file has a white wordmark for dark backgrounds).

## Workflow
1. **Pick the post** in the content plan; note its visual spec and motion template (G1 flow, G2 typewriter, G3 checklist, G4 before/after, G5 counter, G6 timeline). Keep text per frame short.
2. **Set up** (once per session): copy `engine/` to the scratchpad. Needs Node 22+, Microsoft Edge (path in `render.js`), ffmpeg. Fonts load from Google Fonts at render time (network needed).
3. **Write the spec** in `specs.js`: `shell(tag, title, sub, foot, lines)` gives eyebrow, headline, divider, footer + Moring logo; then push elements. Element kinds and helpers: `reference/components.md`. Add the post to the `EM` map so its key phrase renders coral italic.
4. **Logos**: use `logo(x, y, "okta")` etc. from `brands.json` (official files downloaded from each company's own site; sources in `engine/live/sources.json`). New tool: add its URLs to `dl.js`, run `node dl.js` then `node assets.js` (needs `npm i @iconify-json/logos` in `engine/icons/` for the open-set fallbacks). Check the downloaded image visually; reject SVGs with scripts (dl.js does). Databricks / OpenAI / Azure use open-licensed marks because their sites block download or serve another brand.
5. **Render**: `GIF_OUT=<dir> node render.js T1-P1,T4` (prefix filter; no arg = all). One Edge instance over the DevTools port, about 0.5 s per frame, 16 posts in about 7 minutes. Output: `<id>.gif` + `<id>.jpg`.
6. **Review before showing** (this caught real bugs every time): build contact sheets with ffmpeg (3 frames per post at 45 / 70 / 95 percent) and look for title wrapping into content, text over icons, empty boxes, stamps covering text, low contrast, things appearing before their container. Fix, re-render only that post.
7. **Ship**: copy GIFs + JPGs to `assets/gifs/linkedin-square/`, update `README_alt-text.md` / `LOGO_SOURCES.md`, keep the previous theme in a sibling folder when restyling.
8. **Show on the canvas** (Design artifact): upload each GIF as an asset (Artifact tool, `asset: true`, up to 25 files per call), put the returned `/_blob/<id>` into `canvas.js`'s `blob` map, `node canvas.js`, then publish only the board `.dc.html` files. Each re-upload gives new ids; old assets stay. If a publish says a newer version exists, `read` `project/canvas.json` first and publish only the board files (the user may have moved boards).

## Engine gotchas (all learned the hard way)
- **No CSS animations or transitions.** Headless virtual time does not advance compositor animations (opacity / transform only). The engine sets styles per frame instead. Do not reintroduce `@keyframes`.
- **Edge CLI `--screenshot` is flaky** (fails silently after stale profiles, fails with 8 parallel instances at 1080). Use the CDP renderer (`render.js`); if you must use the CLI, use a fresh `--user-data-dir` and retry.
- `rm` with globs is blocked by the safety check; render into fresh folders instead of cleaning old ones.
- Titles: max 2 lines at 54 px (about 34 chars per line); coral italic is wider than regular. Use `⁠` around an en dash to stop a range like `$100-200K` splitting. Set `lines` correctly in `shell()` so the subtitle clears the title.
- Glass boxes need structure behind them to look like glass; the stage draws a faint dot grid and washes for that. Solid boxes: pass `fill`.
- Wordmark logos from the live sites may be white-on-transparent (made for dark pages). Use the dark variant or put them on the dark chip (`mode: "dark"`, already done for Okta).
- Footer / mono text under 14 px is only for captions; anything meant to be read is 17 px or more.
- Third-party logos are used nominatively to identify tools; mention this when handing over, and flag the competitor comparison (T6-P3) for review.
- **Adding a post without editing the repo engine blind:** write new spec blocks to a scratch `newspecs.js` and splice them in before `const EM = {` with a small patch script (also add the `EM` key phrase and the `FREE` file). Writing JS through a bash heredoc with `node -e '...'` broke on quoting; use the Write tool for script files.
- **`NOFREE=1`** renders without the "FREE FILE · NO FORM · ... LINK IN COMMENTS" strip. Use it whenever the post ships without a public file link (launch week did; those GIFs are in `assets/gifs/linkedin-square-nofile/`).
- **Title that is too long for one line collides with the subtitle** (C-P5 "Write one page before the pilot starts." wrapped into the sub). Shorten to fit one line or set `lines: 2`.
- **A stamp placed near the last row covers text**; put stamps in empty space (e.g. right of a short closing line) and check the last frame.
- **StatusMark appears 0.5 s before its row** (`SM` `in` starts at `tRun - 0.5`). In checklist rows, fade the row box in earlier (`in: [at - 0.65, at - 0.35]`) so the mark never floats on empty space.
- The first-frame JPG is mostly empty (only the title has appeared). Fine as a fallback; export the last frame if the owner wants a content-rich still.
- Post GIFs to LinkedIn as image assets (`moring-linkedin-copy/tools/cs.py upload_image`); they animate in the feed.

## Files
- `engine/lib.js` scene engine + ports of React Bits GlassSurface, LatticeLoader, StatusMark, ThoughtLine
- `engine/render.js` CDP frame renderer + ffmpeg GIF export
- `engine/specs.js` 21 posts as working examples (the first 16 plus T1-P3 kill switch, T2-P3 claims baseline, T4-P3 cost per task, T5-P3 approval gates, C-P5 pilot charter; copy a similar one)
- `engine/dl.js`, `engine/assets.js`, `engine/brands.json`, `engine/live/` logo pipeline and assets
- `engine/canvas.js` builds the canvas board files from uploaded asset ids
- `reference/brand.md`, `reference/components.md`, `reference/dark-theme.md`
