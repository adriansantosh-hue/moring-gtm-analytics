# Moring Signal-Based Outreach Plan (Exa-first · Apify optional)

> Execution layer for `Moring_AI_GTM_Strategy_Workflow_Led.md` + `Moring_AI_Vertical_Playbook_BFSI.md`.
> **Signal source of record: EXA API** (already configured + verified on this machine via mcporter). Clay demoted to optional enrichment.
> **Apify becomes OPTIONAL**, added later only for structured LinkedIn job-feed monitoring at scale (signal S1/S7 precision).
> Message formula everywhere: **Signal → Relevance → Specific workflow → Outcome → Soft CTA**

---

## 0. Engine decision — Exa vs Apify

| Need | Exa (primary ✅) | Apify (fallback 🔌) |
|---|---|---|
| Setup | **Zero — mcporter + exa already working** | New account, actor config, scheduling |
| Query style | Semantic/neural + keyword, date & domain filters, contents extraction | Structured scrapers (exact fields) |
| News/regulatory/announcements (S2–S6) | **Excellent** — best-in-class | Good |
| Finding career-pages / job mentions | Good via site/keyword search (`site:[domain] careers`, `[company] [role] opening`) | **Best** — structured job feeds with diffs |
| LinkedIn follower/growth deltas | ❌ not its job | Company scraper |
| Cost | Pay-per-request (~$3–5/1k searches + contents; free credit to start) | ~$10–30+/mo + actor usage |
| Weekly "what changed" | Run saved queries + **diff against last week's JSON snapshot** (store in `/signals/history/`) | Built-in schedules |

**Verdict:** run everything on Exa now. Add Apify later ONLY if S1 job-signal precision/volume demands structured feeds.

### Exa query recipes (weekly batch)

```
S2 leader moves   : "[Company] appoints OR names (COO|CRO|CIO|CDAO|Chief Claims) 2026"  (+date filter)
S3 regulatory     : "[Company] (OCC|Federal Reserve|FDIC|NAIC|APRA|CBUAE|enforcement|audit)" (+date)
S4 AI initiative  : "[Company] (AI pilot|agentic|automation|digital transformation|partnership)"
S5 ops pain       : "[Company] (outage|backlog|delays|complaints|AFCA|settlement)"
S6 growth         : "[Company] (expands|launches|acquires|opens) [region/product]"
S1 careers probe  : site:[company-domain] (careers|jobs)  +  "[Company] hiring (KYC|AML|claims|model risk)"
S7 stack          : "[Company] (Snowflake|Databricks|Kubernetes|core banking migration)"
```

Store each week's hits as JSONL (`signals/YYYY-WW.jsonl`); diff vs previous week to isolate NEW events. That diffing replaces what Apify schedules would have done.

---

## 1. Why this replaced Clay

| Job | Old tool | New tool (Exa-first) | Cost impact |
|---|---|---|---|
| News/regulatory/leader events | Clay + alerts | **Exa search w/ date filters** | ~$3–5/1k queries |
| AI-initiative & announcement discovery | Claygent | **Exa semantic search** (its sweet spot) | included |
| Career-page/job mentions | LinkedIn scraper | **Exa site+keyword search**; Apify optional at scale | near-$0 |
| Website content pulls | Crawler actor | **Exa get_contents / livecrawl** | cheap |
| Growth deltas (followers) | Company scraper | skip OR Apify later | $0 |
| Email finding/verification | Clay waterfall | **Instantly verify + SuperSearch**, or Apollo free tier | near-$0 to start |
| Account list storage | Clay table | **Sheet/Airtable/Notion + local JSONL** | $0 |

Keep the Clay MCP routine for deep account reviews only. Daily signal work = Exa.

---

## 2. ICP (BFSI playbook routes)

**Markets:** US first · UAE · Australia. Enterprise + mid-market per threshold tables (US ent: 2,000+ emp OR $1B+ rev OR $25B+ assets OR $1B+ premium; mid-market 300–1,999 emp OR $100M–$999M rev, etc.).

**Account types:** commercial/regional banks · retail banks · credit unions · asset & wealth managers · custodians · payments/lending · P&C insurers · life & annuity · health insurers · reinsurers · specialty · MGAs/brokers/TPAs at scale.

**Buying committee (map 2–4 contacts/account):**
- Route 1 Workflow owner: KYC Ops · Client Onboarding · Claims Ops · CUO · Lending/Payments/Recon Ops · SIU
- Route 2 Risk/control: CRO · CCO · MLRO · Head of FinCrime · Model Risk · Responsible AI
- Route 3 Tech/data/AI: CIO · CTO · CDAO · Head of AI · EA
- Route 4 Engineering: VP Eng · Platform Eng · DevSecOps (only for AI-DLC specialist route)

---

## 3. Signal catalog (what Apify watches)

| # | Signal | Exa detection (Apify fallback) | Maps to workflow | Urgency |
|---|---|---|---|---|
| S1 | **Workflow-specific hiring**: "KYC analyst", "AML investigator", "claims operations", "model risk", "Head of AI Governance" | Careers-site + keyword queries; weekly diff vs snapshot (Apify jobs actor if scale needed) | KYC evidence · FinCrime · Claims triage · Underwriting · AICP route | 🔥 High |
| S2 | **New leader <90 days** (COO/CRO/CIO/CDAO/Claims) | Exa news query "appoints/names [title]" + date filter | Any — assign by remit | 🔥 High |
| S3 | **Regulatory/audit event** (SR 26-2 RFI, NAIC, APRA CPS 230, CBUAE) | Exa news: company × regulator keywords + domain filter (fedreserve.gov etc.) | Governance angle on any workflow | 🔥 High |
| S4 | **AI/modernization announcement** | Exa semantic search (best-in-class) | Production-readiness angle; AICP supporting | 🟠 Med |
| S5 | **Ops pain made public**: outage, backlog, AFCA complaints, settlement | Exa news search | Claims/policy servicing · service assurance | 🟠 Med |
| S6 | **Growth/volume jump**: expansion, M&A, product launch | Exa news | Onboarding/KYC scale · lending exceptions | 🟠 Med |
| S7 | **Tech-stack change** | Jobs-keyword probes + news | Integration-heavy workflows; tech route | 🟡 Low-med |

**Cadence:** weekly Exa batch (Mon) → JSONL diff vs prior week → dedupe vs suppression → signal cards → human approves → Template/Campaign agents execute Tue–Thu.

**Hard rule carried over:** signal ≠ fit. Every hit still passes the ICP gate + gets ONE workflow hypothesis before outreach.

---

## 4. Signal card format (feeds the template step)

```
SIGNAL_ID: S1-2026-08-24-<company>
COMPANY / DOMAIN / MARKET / SEGMENT(ent|mm):
ICP GATE: pass/fail + which thresholds
SIGNAL: <dated fact + source URL>
WORKFLOW HYPOTHESIS: <one sentence>
ROUTE TARGET: <role/title to contact>
DRAFT STATUS: pending → approved copy link
SUPPRESSED?: prior contact? competitor POC?
```

---

## 5. Copy library — formula applied per signal

All copy obeys: no links in touch 1 · one idea one question · human-in-control line · diagnostic/comparison CTA · sign-off "Regards, Nikhil". Replace bracketed parts; never fabricate the signal.

### S1 — Workflow-specific hiring (route: workflow owner)

**Email 1**
```
Subject: [workflow] hiring at [Company]

Hi [First],

[Company]'s open [exact role title] role reads like [workflow] capacity is stretched — [one clause tying the posting to evidence-chasing/exceptions].

Teams handling [workflow] often lose days to gathering documents and reconciling sources across systems. We're building governed agents that assemble that evidence and prepare the recommendation, while your [analyst/officer] keeps the final call. Would it be useful to compare how [Company] runs this today?

Regards,
Nikhil
```

**LinkedIn connect (≤300c)**
> Hi [First], seeing [Company] grow the [team] team — comparing how US banks handle [workflow] as volumes climb. Open to connecting?

### S2 — New leader <90 days

**Email 1**
```
Subject: [function] priorities at [Company]

Hi [First],

Congrats on the [title] move — [month]. New leaders usually inherit one workflow everyone knows is slow but nobody owns end-to-end; in [vertical] that's often [workflow].

We help teams baseline that process quickly: where evidence-gathering stalls, what a bounded agent could prepare, and what stays with your team's judgment. Open to a 15-minute comparison of how [Company] handles it today?

Regards,
Nikhil
```

### S3 — Regulatory / audit event

**Email 1 (risk route)**
```
Subject: [regulator/event] and [workflow] at [Company]

Hi [First],

[One-clause dated fact: e.g., "With the agencies' RFI on agentic AI following SR 26-2"]. Events like this tend to turn [workflow] from an efficiency topic into an evidence-and-auditability topic.

We build governed agents for exactly that pattern — approved sources only, every recommendation logged, [named role] holds the final decision. Worth comparing how [workflow] would hold up under exam at [Company]?

Regards,
Nikhil
```

### S4 — AI initiative announced

**Email 1 (tech route)**
```
Subject: production path for [initiative] at [Company]

Hi [First],

Saw the [announcement] — interesting step. The usual next wall isn't the model; it's proving to risk and compliance who an agent accessed, what it recommended, and where a human decided.

That's the layer we ship alongside the workflow itself. If [initiative] touches [workflow], happy to share a short comparison of governed-vs-pilot paths — useful either way?

Regards,
Nikhil
```

### S5 — Public ops pain (outage/backlog/complaints)

**Email 1 (ops route)**
```
Subject: [incident/theme] at [Company]

Hi [First],

[One-clause public fact]. When [backlog/outage theme] hits, the hidden cost is usually evidence assembly — people stitching together status across systems instead of deciding.

For [workflow] we keep that assembly automated but bounded: approved sources, prepared recommendation, [named role] approves. Fair to ask whether [Company] has already solved this internally, or still feels it weekly?

Regards,
Nikhil
```

### S6 — Growth / volume jump

**Email 1**
```
Subject: scaling [workflow] at [Company]

Hi [First],

[Expansion fact]. Growth is great until [workflow] queues grow faster than headcount — that's usually where evidence-chasing starts eating SLAs.

Governed agents can absorb the volume while [named role] keeps approvals and the record stays audit-clean. Want a quick side-by-side of current process vs agent-assisted for [Company]?

Regards,
Nikhil
```

### S7 — Tech-stack change (tech route)

**Email 1**
```
Subject: [platform change] and what runs on top

Hi [First],

[Migration/platform fact]. Once the data foundation moves, the next question is which workflows get automated safely on top of it.

[Workflow] is usually the best first candidate in [vertical]: high volume, clear approval boundary, measurable cycle time. Worth 15 minutes to compare notes on sequencing?

Regards,
Nikhil
```

### LinkedIn variants (any signal — connect then DM)

**Connect:** `Hi {FIRST_NAME}, tracking {SIGNAL_THEME} across {VERTICAL} — comparing how teams handle {WORKFLOW} as AI enters production. Open to connecting?`
**Post-accept DM:** `Thanks {FIRST_NAME}. Following the {signal} at {Company} — we work on governed {WORKFLOW} agents: agent preps everything, {ROLE} keeps final approval, full audit trail. Is that a live topic on your side?`

---

## 6. Outcome lines bank (pick one per message; label honestly)

- KYC/onboarding: "cut evidence-chasing so case cycle time drops" *(modeled)*
- FinCrime: "alerts arrive pre-assembled with entity/transaction context; analysts decide"
- Claims: "missing-doc flags up front; complex cases routed with rationale intact"
- Underwriting: "risk evidence reconciled from approved sources before the UW opens the file"
- Ops/recon: "exceptions arrive with cross-system checks already done"
- Never claim measured ROI without a customer baseline. Use: *modeled*, *expected*, *designed to*.

## 7. Operating loop (weekly)

1. **Mon:** Exa batch queries (recipes §0) → diff vs `signals/history/` → new signal cards
2. **Tue:** human reviews cards → approve targets → Lead Gen Agent assigns workflow + route
3. **Wed:** Template Agent drafts E1 + connect per card → spot-check vs preflight checklist
4. **Thu:** Campaign Agent loads approved batch (HeyReach adds w/ lastName + custom fields; Instantly verified contacts) → sends within daily caps
5. **Fri:** pull replies/meetings; log objections; update this library monthly

## 8. Guardrails

- Suppression list checked before every add (prior contact, competitor POC, EU-unreviewed).
- One workflow hypothesis per account across ALL campaigns.
- Stop-on-engagement: any interested reply pauses automation immediately.
- Volume ramp: ≤20 new contacts/day total until reply quality known; then scale.
