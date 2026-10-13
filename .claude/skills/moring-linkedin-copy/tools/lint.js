// Usage: node lint.js draft.md
// Checks every "> " quoted LinkedIn block and X lines against the value-first rules.
const fs = require('fs');
const f = process.argv[2];
if (!f) { console.error('usage: node lint.js draft.md'); process.exit(2); }
const txt = fs.readFileSync(f, 'utf8');
const banned = [/book a (demo|call)/i, /let'?s (talk|chat|connect)/i, /schedule a (call|meeting)/i,
  /excited to (share|announce)/i, /game.?changer/i, /revolutioni[sz]/i, /\bAICP\b/, /guaranteed?/i,
  /marketplace/i, /\bpartner(ship)?\b/i];
let issues = 0;
const warn = (m) => { issues++; console.log('! ' + m); };

const blocks = [];
let cur = [];
for (const l of txt.split(/\r?\n/)) {
  if (l.startsWith('>')) cur.push(l.replace(/^>\s?/, ''));
  else if (cur.length) { blocks.push(cur.join('\n')); cur = []; }
}
if (cur.length) blocks.push(cur.join('\n'));

blocks.forEach((b, i) => {
  const n = b.length, tags = (b.match(/@\w+/g) || []).length, tag = `block ${i + 1}`;
  if (n > 3000) warn(`${tag}: ${n} chars, over the LinkedIn 3000 limit`);
  if (n < 500) warn(`${tag}: ${n} chars, short for a value-first post (target 775-1318)`);
  if (tags > 2) warn(`${tag}: ${tags} tags, max 2`);
  if (/https?:\/\//i.test(b)) warn(`${tag}: link in body, move it to the first comment`);
  if (!/\?|tell (me|us)|reply|let (me|us) know/i.test(b.split('\n').slice(-3).join(' '))) warn(`${tag}: no closing question or reply invite`);
  if (!/free/i.test(b)) warn(`${tag}: no free file line`);
  if (!/human|approv|review|decid/i.test(b)) warn(`${tag}: no human-in-control line`);
  if ((b.match(/#\w+/g) || []).length > 3) warn(`${tag}: more than 3 hashtags`);
  banned.forEach((r) => { if (r.test(b)) warn(`${tag}: banned or risky term ${r}`); });
  console.log(`block ${i + 1}: ${n} chars, ${tags} tags`);
});

for (const m of txt.matchAll(/\*\*X:\*\*\s*`([^`]+)`|^## X \(under 280\)\s*\n`([^`]+)`/gm)) {
  const x = m[1] || m[2];
  if (x.length > 280) warn(`X post is ${x.length} chars, over 280`);
}
if (!blocks.length) warn('no "> " LinkedIn blocks found');
console.log(issues ? `${issues} issue(s)` : 'clean');
process.exit(issues ? 1 : 0);
