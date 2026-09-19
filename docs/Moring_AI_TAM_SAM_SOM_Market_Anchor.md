# Moring AI — TAM / SAM / SOM + Market Anchor

Governed, production-ready AI for regulated enterprise workflows. Verified market sizing, addressable accounts, revenue pools, and the coverage gap.

**Verified: 2026-08-30.** Source ground: FDIC Q1-2026, NCUA 5300 Q1-2026, NAIC, Mordor Intelligence 2026-01-20, KPMG, Gartner 2026, Fortune Business Insights.

---

## 1. Market Anchor (validates the thesis)

- **Agentic AI in Financial Services = $7.78B (2026) → $43.5B (2031), 41.12% CAGR** (Mordor Intelligence, 2026-01-20). BFSI is the #1 vertical — driven by fraud detection/AML, KYC/onboarding, claims, and compliance automation = **exactly Moring's wedge**.
- Global agentic AI spend **~$50B (2025)** (KPMG). BFSI ≈ **19% of total AI market** (Fortune Business Insights).
- Gartner: **$2.5T total AI spending in 2026**; AI agent software spend **$206.5B in 2026, +139% YoY** (Gartner via The Agent Report 2026-06-24).
- **Gartner: >40% of agentic AI projects canceled by end of 2027** (cost/value/risk) → the exact "governed, don't DIY" gap Moring sells into.
- Only 14-23% of orgs have reached production-scale agent deployment (McKinsey 2026); **only 15% scaled multi-agent adoption, 16% say processes prepared** (Deloitte, Aug 2026).

**What it means:** the market is real, growing 41%/yr, BFSI-led, and the #1 failure mode (cancellation) is Moring's wedge. Demand is not the constraint — coverage and governed delivery are.

---

## 2. TAM — all eligible regulated institutions (accounts)

**Definition:** regulated institutions (US + CA + UAE + AU) whose workflows (onboarding/KYC, claims, prior-auth, outage restoration, service assurance, release evidence, payment ops) are agentic-AI-eligible AND above Moring's ICP floor (enterprise 2,000+ emp / $1B+ rev / $25B+ assets / $1B+ premium; mid-market 300-1,999 / $100M-999M / $2-24.9B / $100-999M).

### US account universe by vertical

| Vertical | Universe | ≥ ICP floor | Notes |
|---|---|---|---|
| Commercial banks | 3,763 (+515 S&Ls) | ~700 | 100 largest = $18T+ assets; mid ($2-25B) ≈ 450-500; rest community < floor |
| Credit unions | 4,336 | ~300 | $2.51T combined; median $50-90M → only top ~5-10% ($1B+) qualify |
| P&C carriers | ~2,500 | ~700 | $900B+ premiums; top 8 = ~45%; ~300 enterprise + ~400 mid |
| Life/health carriers | ~1,000 | ~400 | |
| Health payors | ~300-500 | ~300 | Medicare/Medicaid + commercial plans |
| Asset mgmt / wealth | ~2,000 | ~400 | |
| Payments / fintech | ~1,500 | ~250 | |
| Energy & utilities | ~2,000 | ~600 | Mission-critical ops |
| Telecom | ~300 | ~150 | |
| Airline / aero MRO | ~150 | ~60 | |
| SaaS / eng orgs (AI-DLC) | ~2,000 | ~400 | |
| **US subtotal** | **~19,000** | **~4,300 eligible** | |

### Non-US (CA + UAE + AU, compliance-reviewed)
- **+600-800 eligible accounts** across banks (CA Big-6 + regionals, UAE lenders, AU Big-4), insurers, payors, super funds, utilities.

### TAM headline
- **TAM ≈ 5,000 regulated institutions** with governed-agentic-AI need.
- **TAM $ (ACV-pool at ~$200K) ≈ $1B+; with $400K expansion ≈ $2B+.**

Sources: FDIC Q1-2026 (3,763 banks / 515 S&Ls / $26T assets), NCUA 5300 Q1-2026 (4,336 CUs / $2.51T), NAIC / practicetestgeeks 2026-08-01 (~2,500 P&C, $900B premiums), Mordor 2026-01-20, Wikipedia list of largest US banks 2026-08-09.

---

## 3. SAM — Serviceable & reachable this year (workflow-led, BFSI-first)

**Definition:** top eligible accounts actually executing a **named governed-workflow hypothesis** in 2026 AND reachable with a buyer + control committee contact set.

- **SAM ≈ 800-1,200 accounts** (BFSI-first: banks/CUs → onboarding & KYC; insurance → claims; payors → prior-auth; then energy, telecom, SaaS, aerospace per vertical playbooks).
- **SAM $ ≈ $200M-250M ARR pool** at ~$200K ACV + paid creditable POC land; **$450M+** with $400K land-and-expand.
- Coverage today: **138 accounts sourced ≈ 3% of TAM, ~12-17% of SAM.** The market is NOT thin — the pipeline is early.

---

## 4. SOM — realistic capture (12-36 months)

- **SOM = $5-8M ARR Y1 → $10-15M Y2-3** (matches `Moring_AI_Revenue_Model_Combined.md`).
- Requires: scaling from 138 sourced accounts (~3% coverage) to **400-500 qualified accounts** with fresh signals + full committee (2-4 DMs each) + **~10-15% pipeline-to-close**.
- Revenue stack: platform fee (AICP) + per-solution fee, outcome-priced (fee triggers only if outcome ships), paid creditable POC land.

---

## 5. Coverage gap — why it feels thin (and the fix)

| Symptom | Root cause | Fix |
|---|---|---|
| ~138 accounts only | Sourcing over-indexed on mega-banks (batches 10-14) | **Mid-market-first sweep**: regional banks $2-25B, top ~300 CUs ≥$1B, regional P&C carriers |
| Mid-market looks scarce | Clay data thinnest at regional/CU/mutual middle (40+ LOW-DATA rows) | Manual + Exa enrichment for the middle; don't trust Clay alone there |
| Half-fresh signals | 50 signals Jan-Apr 2026 (stale), 38 empty | One Exa re-pull pass on stale rows before E2/E3 |
| 126 rows LinkedIn-only | Clay MCP re-auth pending (workspace 1211532) | Backfill emails when MCP restored |
| ICP verticals dormant | Scope rule set 2026-08-28 (BFSI-only live) | Re-enable parked ICP campaigns on explicit approval |

---

## 6. Signals for the full eligible universe — how we source them

**Can we find signals for all ~800-1,200 SAM accounts? Yes — staged approach:**

1. **Always-on (Trigify monitors)** — LinkedIn/company posts + news monitors (Banking `e6981672`, Insurance `bab9b39b`, CU `96232a59`, Utilities `4d7897bb`, LinkedIn AI-leadership `01a3bd2e`). Continuous daily feed; low yield but freshest. Add Reddit `r/AIgovernance` monitor.
2. **Sweeps (Exa)** — per-vertical batch queries (S1 leadership moves, S2 hiring, S3 regulatory SR 26-2/NAIC, S4 AI initiatives, S5 ops pain). One query per account, top-2 results, dated fact extracted. This is how the original 152 were built in 2 passes.
3. **Workflow confirmation (Exa per account)** — for each SAM account: does it run the workflow (KYC/claims/prior-auth/outage), with what systems/pain? Find hiring (KYC/claims/model-risk), job posts, known bottlenecks. Flag "workflow not evidenced — do not outreach."
4. **Enrichment (Clay)** — resolve DMs (DM1-4 per account) + LinkedIn + emails; backfill the 126 LinkedIn-only rows on MCP re-auth.
5. **Refresh cadence** — 90-day signal shelf-life; re-pull stale rows before touch E2/E3/E4.

**Signal format (mandatory, per AGENTS.md):** `S1-2026-08-10 <company> hired <person> as <role>` — dated, public, company-specific. Never empty, never placeholder.

---

## 7. Pipeline math from TAM → revenue

| Stage | Count / Value |
|---|---|
| TAM (eligible accounts) | ~5,000 |
| SAM (reachable this year) | 800-1,200 |
| Qualified with signals + committee (target) | 400-500 |
| Pipeline-to-close | ~10-15% |
| Closed Y1 | ~25-40 accounts |
| ACV | ~$200K (land) → $400K (expand) |
| **SOM Y1** | **$5-8M ARR** |
| **SOM Y2-3** | **$10-15M ARR** |

---

## Sources
- Mordor Intelligence, "Agentic AI in Financial Services Market" — 2026-01-20 ($7.78B 2026 → $43.5B 2031, 41% CAGR).
- NCUA 5300 Call Report Q1-2026 / Depository360 2026-06-26 — 4,336 CUs, $2.51T.
- FDIC Q1-2026 / Wikipedia largest US banks 2026-08-09 — 3,763 commercial banks + 515 S&Ls.
- NAIC / practicetestgeeks 2026-08-01 — ~2,500 P&C carriers, $900B+ premiums.
- Gartner 2026 — $2.5T AI spend; >40% agentic projects canceled by 2027.
- KPMG — ~$50B global agentic AI spend 2025.
- The Agent Report 2026-06-24 — Gartner $206.5B agent software spend 2026 (+139%).
- Fortune Business Insights — BFSI ≈ 19% of AI market.
- McKinsey / Deloitte Aug 2026 — 14-23% scaled deployment; 15% multi-agent, 16% prepared.
- Moring_AI_Revenue_Model_Combined.md — SOM targets ($5-8M Y1 → $10-15M Y3).