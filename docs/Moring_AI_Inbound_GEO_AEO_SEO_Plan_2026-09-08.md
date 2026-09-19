# Moring AI — Inbound / SEO / GEO / AEO / Content Plan
**DRAFT for Arya review · 2026-09-08 · Prepared from live site crawl + ONE Research Brief + competitor keyword research**

---

## 0. EXECUTIVE SUMMARY (the 60-second read)

Moring's **outbound engine works** (LinkedIn 18.6% DM reply rate, 53 connections accepted, 8 replies). The **inbound engine is the missing half** — and it's currently the cheapest, highest-leverage fix available.

**The problem in one line:** Moring's site is technically sound but invisible — it ranks for almost nothing, is **cited by zero AI answer engines** (GEO = D grade), and has **no inbound destination pages** for the demand it's generating.

**The three fixes, in priority order:**
1. **GEO/authority (the #1 gap)** — publish original data + answer pages so AI engines (ChatGPT/Perplexity/Claude/Google AI Overviews) cite moring.ai for category questions. Today they cite ServiceNow, IBM, Guild, Credo — never Moring.
2. **Technical SEO (the cheap 2-week fix)** — add canonical tags (currently ZERO on every page), fix the two-site duplicate problem, remove the false AWS Marketplace claim.
3. **Content + landing-page build-out** — the current 41-page sitemap with only ~12 real pages + 7 blog posts is not a demand engine. Needs ~15 new pieces per the roadmap below.

**Why now (the urgency):** 76%→38% of AI Overview citations overlap with top-10 rankings (Convert/GEO 2026); pages not updated quarterly are 3x more likely to lose AI citations; brands cited in AI Overviews earn **35% more organic clicks and 91% more paid clicks**. Every week Moring stays uncited, the incumbents compound their citation advantage.

**Do we need more blogs & landing pages?** Yes — specific ones. **~10-12 more blog posts + ~8-10 landing/destination pages** (detailed in 7). But the *kind* matters more than the count: the 7 existing posts are all already long-form (3,500-6,300 words, well above the 2,000-word floor) — the gap is **topical coverage of high-intent keywords**, **answer-ready formatting**, and **citable original data**.

---

## 1. LIVE SITE CRAWL — WHAT ACTUALLY EXISTS (verified 2026-09-08)

### 1.1 Sitemap inventory (41 URLs, both moring.ai + www.moring.ai listed)

| Type | URLs | Notes |
|---|---|---|
| **Core pages (12)** | /, /contact, /blogs, /ai-control-plane, /ai-ops, /ai-dlc, /ai-insurance, /fintech-and-banks, /aws, /about-us, /privacy-policy, /careers, /workshops | The real "money" pages |
| **Workshops (2)** | /workshops/aicp-workshop, /workshops/ai-dlc-workshop | Offers |
| **Whitepaper (1)** | /whitepaper/the-enterprise-ai-control-plane | Lead magnet |
| **Partner (2)** | /partner-program, /become-a-partner | |
| **Misc (2)** | /search, /blogs (dup) | |
| **Blog posts (7)** | agentic-aiops, ai-dlc-vs-ai-sdlc, from-pilot-to-platform, observability-for-ai-agents, taking-mcp-to-production, what-is-an-ai-control-plane, why-mcp-exists | See 6 |
| **Blog categories (5)** | /blog-category/{company,engineering,platform,product,research} | Thin (1-3 posts each) |
| **Jobs (10)** | /jobs/* | Careers pages |

### 1.2 Technical audit results (per-page, live crawl)

| Check | Status | Detail |
|---|---|---|
| **Canonical tags** | ❌ **NONE on any page** | Home, product pages, blog, whitepaper — all missing. **THE #1 technical bug.** |
| **GSC verification** | ✅ Present | `google-site-verification: MJRG5O4exnFZE-EVLSuRx1u1TQ8Xw6PvpcoIkehtisc` on homepage — site IS verified in Search Console (verified 2026-09-08). |
| **Meta descriptions** | ✅ Present | All product pages have them (e.g. /ai-control-plane: "Single control plane to build, deploy, manage & govern enterprise AI. Cost observability, govern…") |
| **JSON-LD schema** | ✅ Present | Product pages = SoftwareApplication + Offer + Organization + AggregateRating. Home = Organization. |
| **Title tags / H1s** | ✅ Good | Keyword-rich, unique per page (e.g. "AI-DLC: Governed Agentic SDLC | $5-10M Y1 Impact"). H1s use inline spans but present. |
| **robots.txt** | ✅ | Allow: / + 2 sitemaps (moring.ai + www). |
| **Sitemap** | ✅ | 41 URLs, both domains listed; **all 41 return HTTP 200** (verified with Googlebot UA, 2026-09-08). |
| **noindex tags** | ✅ None | All pages indexable — no accidental noindex/robots blocks. |
| **Speed / Core Web Vitals** | ⚠️ Untested | No Lighthouse data. Webflow-hosted = generally OK, but needs verification. |
| **OG tags** | ⚠️ Partial | og:title present; og:description not found on product pages (worth adding). |
| **Blog depth** | ⚠️ Thin cluster | 7 posts, 5 categories, no topical pillar structure. |

### 1.3 The duplicate-content problem (confirmed)
- Site is served at **both `moring.ai` and `www.moring.ai`**, plus **`/index.html`** resolves separately.
- Google has indexed **all three homepage variants** (confirmed via `site:moring.ai` search) — classic duplicate-content split.
- **Old template pages still live**: `moring.ai/about` and `moring.ai/contact` return the OLD site ("Introducing our Agentic AI Platform… Services/Platform/Industries") — two versions of the site in the index simultaneously.
- **Fix:** canonical tags (point www + index.html → www) + redirect/remove old template pages + submit sitemap in GSC.

### 1.4 Indexing status (what Google has actually indexed)
- ✅ Indexed: homepage (+www +index.html variants), /about-us, /blogs (11 posts), /contact, /about (old), /platform (old URL now serving new AICP content)
- ⚠️ **4 of 11 blog posts are NOT in the sitemap** (reconciliation-breaks, accountability, orchestration, enterprise-ai-architecture) — add them
- ⚠️ **6 old-template URLs indexed but now 404** (services, about, 4× /resources/*) — soft-404 risk
- ⚠️ Small indexed footprint vs 41 sitemap URLs — product pages + workshops + whitepaper need GSC indexing requests
- ⚠️ Wrong-entity bleed: `MorningAI` (morningai.com, a different company) surfaces in moring.ai searches

### 1.5 POST-REBUILD CRAWL — WHAT'S LIVE vs WHAT'S MISSING (verified 2026-09-09)

> The site was rebuilt (now Vercel-hosted, "moring" lowercase branding). The SEO/GEO/AEO work from this plan is LARGELY LIVE. Full re-crawl below.

#### ✅ LIVE — what shipped (verified by full crawl)

| Check | Status | Detail |
|---|---|---|
| **Canonical tags** | ✅ **FIXED** | Every page has a self-referencing canonical (`https://www.moring.ai/<page>/`) — home, products, workshops, whitepaper, partner, contact, blogs all verified |
| **Meta descriptions** | ✅ **FIXED** | Unique, keyword-rich on all pages |
| **OG + Twitter cards** | ✅ **FIXED** | Full og:title/desc/image + twitter:card + twitter:image on every page (og:image URLs resolve) |
| **JSON-LD schema** | ✅ **FIXED** | Organization + WebSite + ContactPoint on all; BreadcrumbList/ListItem on product pages; **Service + BusinessAudience on /aws** |
| **Title tags / H1s** | ✅ **REWORKED** | Now workflow-led: "Build and Deploy AI Agents Into Production", "AI Control Plane for Production AI Agents", "AI Ops Agents for Incident Response", "AI Agents for Insurance/Banking Workflows" — the message-to-site fix is IN |
| **Sitemap** | ✅ **FIXED** | New `sitemap-index.xml` → `sitemap-0.xml` = **43 URLs**; **all 11 blog posts now included** (reconciliation-breaks, who-is-accountable, orchestration, enterprise-ai-architecture no longer missing) |
| **robots.txt** | ✅ | Allow all + sitemap-index + RSS feed link (`/rss.xml`) |
| **Redirects** | ✅ | Legacy `.html` paths 301→new homes (via `vercel.json` + `scripts/emit-redirects.mjs`); `/about` → 200, `/platform` → 200 (AICP) |
| **noindex** | ✅ None | All pages indexable |
| **Schema types (product)** | ✅ | /ai-control-plane = Organization, WebSite, BreadcrumbList, ListItem |

#### ❌ MISSING / STILL BROKEN (verified 2026-09-09)

| Gap | Status | Evidence / Fix |
|---|---|---|
| **GSC verification + GA4 + GTM GONE** | 🚨 **REGRESSION** | New site head has **NO** `google-site-verification`, **NO** `gtag.js`, **NO** GA4 `G-DF4X8424BJ`, **NO** `GTM-M92CJFC6`, **NO** HubSpot tracking. **The rebuild dropped all tracking/verification → Google can't verify the new site + zero analytics data collecting.** Re-add all three. |
| **/aws false "Marketplace: Listed" claim** | 🚨 **STILL FALSE** | Live text: "Marketplace Listed — procure on your existing AWS agreement" + "Marketplace-listed, your security and procurement teams…" — **no actual AWS listing exists** (ServiceNow Control Tower + Credo are listed; Moring is not). Remove the claim or list. |
| **5 old resource URLs still 404** | 🚨 | `/services/` → 404, `/resources/building-production-ready-agentic-ai/` → 404, `/resources/composable-ai-platform-approach/` → 404, `/resources/forward-deployed-engineering-model/` → 404, `/resources/document-processing-at-scale/` → 404. Only `/about/` + `/platform/` mapped. **These are still soft-404s in the index** — 301 to new equivalents or restore the content (it was genuinely good SEO material: document processing, FDE model, production AI). |
| **`/index.html` still resolves 200** | ⚠️ | Duplicate homepage variant still live (canonical now points to `/`, so lower risk — but confirm GSC consolidates). |
| **Landing/destination pages absent** | ⚠️ | `/demo/kyc`, `/demo/claims`, `/learn/what-is-an-ai-control-plane`, `/compare/*`, `/report/*` → all 404 (the funnel-bottom build-out, Part 7.3, is next). |

#### The verdict (post-rebuild)
**Technical SEO foundation is largely SHIPPED** — canonicals, meta, schema, sitemap, and workflow-led titles all live. **Three must-fix gaps remain:**
1. **Re-add GSC verification + GA4/GTM + HubSpot to the new site** (blocking — flying blind on traffic + Google can't verify the rebuild)
2. **Fix the false AWS Marketplace claim** (remove "Listed" or actually list)
3. **301 or restore the 5 dead resource URLs** (services + 4× /resources/*)

---

## 2. TOP SEO / TRAFFIC KEYWORDS — COMPETITOR LANDSCAPE

### 2.1 The keyword map (what the category actually searches)

Based on competitor SERP analysis (ServiceNow, IBM, Microsoft, Guild.ai, Credo AI, Rubrik, Zenity, Airia, Fiddler) + AI-governance content research. **Volume/difficulty are directional estimates** — verify in Semrush/Ahrefs before committing budget (Semrush free Keyword Magic + Ahrefs Keywords Explorer).

#### Tier 1 — Head terms (high volume, HIGH difficulty, incumbents own)
| Keyword | Est. vol/mo (US) | Difficulty | Who owns it | Moring can win? |
|---|---|---|---|---|
| AI agent governance | 1K-10K | 80+ | IBM, Credo, ServiceNow, Superblocks | ❌ Not directly — own the *long-tail* |
| AI governance platform | 1K-10K | 80+ | IBM watsonx, Credo, Fiddler | ❌ |
| AI agent control plane | 1K-4K | 70+ | ServiceNow (AI Control Tower), Guild, Airia, Rubrik | ⚠️ Lean-in — new term, contested, not settled |
| agent orchestration | 10K-40K | 85+ | LangChain, Microsoft, many | ❌ (crowded, off-strategy) |
| enterprise AI governance | 1K-4K | 75+ | IBM, ServiceNow | ⚠️ |
| AI agent security | 1K-4K | 70+ | Zenity ($125M), Rubrik, Palo Alto | ⚠️ |

#### Tier 2 — The Moring strike zone (low-mid volume, LOW-MID difficulty, nobody owns cleanly) ⭐
| Keyword | Est. vol/mo | Difficulty | Why Moring can win |
|---|---|---|---|
| governed AI agents | 100-500 | 20-30 | Category Moring is **defining** — zero established content |
| AI agent governance for banks / insurance / healthcare | 200-800 | 30-40 | **The regulated-workflow wedge.** Zero dedicated content exists |
| AI control plane for regulated industry | 50-200 | 20-30 | Exactly Moring's positioning |
| SR 26-2 / AI model risk management (MRM) | 500-2K (spiking) | 40-50 | Regulatory surge term, trade-press owned but thin on vendor answers |
| AI agent governance NAIC / insurance | 100-400 | 30-40 | NAIC AI Model Bulletin = hard "why now" |
| AI agent audit trail / auditability | 300-1K | 35-45 | Maps to the "Splunk for agents" buyer language |
| AI agent cost observability | 100-400 | 25-35 | Guild's Spend Explorer proves demand |
| agent governance framework | 200-500 | 40-50 | IBM/MS own docs; long-tail open |
| AI agent approval workflow / human-in-the-loop | 300-1K | 30-40 | The control-plane buyer language |
| MCP governance / MCP security | 500-2K (rising) | 40-50 | Moring has 2 MCP posts already — extend to a pillar |

#### Tier 3 — Long-tail question keywords (for AEO/answer pages) ⭐
- "what is an AI control plane" (Moring HAS a post — optimize + standalone answer page)
- "what is AI agent governance" · "how to govern AI agents in production"
- "who governs AI agents" · "what happens when an AI agent makes a bad decision"
- "how to pass SR 26-2 AI audit" · "NAIC AI model bulletin compliance"
- "AI agent guardrails vs policy" · "approval gates for AI agents"
- "how much does AI agent governance cost"
- "AI agent governance for [claims / KYC / prior-auth / payments]"

### 2.2 Who's winning today (the SERP reality)

| Competitor | Owns keyword(s) | Their content weapon |
|---|---|---|
| **Microsoft** | "govern AI agents" how-to | Cloud Adoption Framework doc = the SEO how-to authority; Entra Agent IDs |
| **IBM** | "AI governance platform", "watsonx.governance" | Gartner MQ Leader badge + 31K-view governance video + dedicated GRC content |
| **ServiceNow** | "AI Control Tower", "control plane" | Knowledge 2026 event-anchored + product page + Marketplace listing |
| **Guild.ai** | "control plane for AI agents", glossary terms | Founder video (111K views) + glossary + Spend Explorer free tool + Discord |
| **Credo AI** | "AI governance", "EU AI Act compliance" | Forrester Wave Leader + comparison pages (Credo vs ServiceNow!) + policy packs |
| **Rubrik / Zenity / Airia** | "agent security", "safe undo", orchestration | Security-grade feature content + G2 reviews |
| **Superblocks / aicompliancevendors.com** | "best AI agent governance platforms" | **Listicle/comparison roundups — the ranking pages Moring must appear on** |

**Key insight:** the high-volume heads are owned by incumbents with domain authority + analyst badges. **Moring cannot win Tier 1 head-on — but it can win Tier 2/3, which is where the buyers actually convert** (regulated-workflow long-tail = purchase intent). Credo's "vs ServiceNow" comparison page is the exact playbook Moring should copy (7).

### 2.3 THE KEYWORD ATTACK PLAN — COMPETITOR CONTEXT (what each owns, what we attack, how)

#### What the competitors actually own right now (verified 2026-09-08, SERP + content analysis)

| Competitor | Keywords/content it owns | The gap in its armor |
|---|---|---|
| **Microsoft** | "governing AI agents", "Implementing Agent 365" (Inside Track, 500K-agent story), Entra Agent ID, Cloud Adoption Framework how-to docs | Everything is Microsoft-tenant-specific; **no regulated-workflow evidence**; vendor-lock framing (Moring's "your cloud, your regulators" wins) |
| **IBM** | "AI governance platform", "watsonx.governance", Gartner MQ Leader badge, governance video (31K views) | Policy-registry/GRC framing; **steep learning curve, heavy stack**; no delivered business agents |
| **ServiceNow** | "AI Control Tower", "control plane", event-anchored (Knowledge 2026), AWS Marketplace listing | Walled garden; **governs agents in ServiceNow, not across clouds**; no outcome pricing |
| **Guild.ai** | **"agent control plane" glossary** (guild.ai/glossary/agent-control-plane), "control plane for AI agents", "AI Spend Explorer" (free tool = cost-visibility keyword magnet), founder video (111K) | Engineering/runtime-centric; **no regulated-BFSI depth, no delivered business agents**; glossary = definitions only, not workflow evidence |
| **Credo AI** | "AI governance", "EU AI Act compliance", policy packs, **comparison pages (Credo vs ServiceNow)** = the model to copy | Policy tooling only; **"tells you what to govern, doesn't run it"** |
| **Atlan** | "AI control plane: components, architecture and use cases" (knowledge-base how-to, Jul 2026), "what is AI gateway" | Metadata/data-governance framing; **not workflow-delivery or regulated-specific** |
| **LucidTrust (NEW threat)** | **"SR 26-2"**, "SR 26-2 AI governance gap for banks", "agentic AI governance for regulated institutions", "AI vendor due diligence questionnaire" — **a direct competitor attacking Moring's exact regulatory wedge** | Startup, likely same scale; **Moring must out-position now before it owns the SR 26-2 SERP** |
| **Zenity / Rubrik** | "AI agent security", "safe undo", agent discovery | Security-only framing; **no business-workflow outcome, no regulated evidence trail** |
| **Superblocks / aicompliancevendors.com** | "best AI agent governance platforms", "Credo vs ServiceNow" roundups | Listicles Moring must get listed in (they're the ranking pages buyers click) |

#### THE ATTACK MATRIX — what Moring can win (verified gaps, no one owns these cleanly)

**Tier A — Regulatory goldmine (spiking intent, LOW competition, only LucidTrust doing it). HIGHEST PRIORITY:**
| Attack keyword | Why we win | The asset to build | Est. diff |
|---|---|---|---|
| SR 26-2 AI governance for banks / GenAI | LucidTrust alone owns this; Moring has the FDE + audit-lake depth | Pillar post + /learn/sr-26-2-explained + whitepaper update | 40-50 (low for the value) |
| AI model risk management (MRM) for GenAI/agentic | Regulators carved GenAI OUT of SR 26-2 scope → governance gap everyone must fill | "The SR 26-2 gap: governing agentic AI before the RFI lands" | 40-50 |
| NAIC AI Model Bulletin compliance (insurance) | ~half of states adopted; zero vendor-dedicated content found | Claims/underwriting governance post + compliance matrix | 30-40 |
| AI governance for [banks / credit unions / insurers / healthcare payors] | Zero vertical-specific content exists; maps directly to ICP + fast-yes personas | One post per vertical + per-workflow demo pages | 30-40 |
| AI agent governance for regulated industry | Exactly Moring's position (nobody owns the phrase) | Pillar page owning "governed business workflow agents" | 20-30 |

**Tier B — Buyer-language long-tail (the words buyers actually use; Guild owns definitions but not the regulated evidence angle):**
| Attack keyword | Why we win | Asset |
|---|---|---|
| AI agent audit trail / auditability / audit logs | The r/AI_Agents + CISO buyer language ("here is the proof") | Audit-lake post + demo page |
| AI agent approval workflow / human-in-the-loop | Approval gates = Moring's core feature | Bake-off post + answer page |
| AI agent cost observability / per-agent cost | Guild's Spend Explorer proves demand; Moring has cost controls | Cost-observability comparison post (vs Guild) |
| AI agent registry / inventory | Core AICP feature; ServiceNow/MS own it only in their estates | Registry + identity post |
| MCP governance / MCP security / scoped MCP credentials | Moring has 2 MCP posts + ToolHive; rising keyword | Extend to a MCP-governance pillar |
| AI agent identity / agent IDs | Vendor-neutral answer to Microsoft's Entra Agent ID | Identity-propagation post |

**Tier C — Comparison / competitor-displacement (Credo's proven playbook):**
| Attack keyword | Asset |
|---|---|
| Moring vs ServiceNow AI Control Tower | Comparison page + bake-off evidence |
| Moring vs Microsoft Agent 365 | Comparison page ("500K agents Microsoft governs in its own tenant — what about yours?") |
| Moring vs Guild.ai | "Governing agents vs delivering governed workflows" comparison |
| Moring vs IBM watsonx.governance | "Policy registry vs delivered outcome" comparison |
| AI control plane alternatives / agent governance platforms | Get listed in Superblocks/aicompliancevendors roundups + own the alternative |

**Tier D — Own the category Moring is defining (zero-competition head start):**
- "Governed business workflow agents" (the strategy's owned phrase — put it on a page NOW)
- "Governed agentic AI" · "AI-DLC" (already owns the term) · "governed AI deployment"
- "AI agent governance for [claims / KYC / prior-auth / payments]" (the workflow-specific long-tails)

**The verdict for Arya:** the two winnable prize clusters are **(1) the regulatory wedge (SR 26-2 / NAIC / vertical governance)** — where LucidTrust is the only competitor and Moring's regulated-depth + FDE is a genuine advantage — and **(2) the buyer-language long-tail (audit trail, approval gates, cost observability, MCP security)** where Guild owns definitions but nobody owns the regulated-workflow evidence angle. Both are Tier 2/3 keywords: low-mid difficulty, high purchase intent, and directly mapped to the fast-yes ICP personas. Attack Tier A first (the SR 26-2 pillar), then Tier B, then comparisons.

---

## 3. SEO AUDIT — Moring's current state (B+ but fragile)

From ONE Research Brief 4.2 (re-verified live today):

**✅ Strengths**
- robots.txt + sitemap.xml (both domains) 
- Unique keyword-rich titles/H1s, meta descriptions present on product pages
- JSON-LD schema (Organization + SoftwareApplication + Offer + AggregateRating)
- Real long-form blog content (7 posts, 3.5K-6.3K words each)
- Footer clean (14 links, all live — earlier "dead link" finding retracted)

**❌ Weaknesses**
1. **NO canonical tags on any page** — duplicate-content risk (confirmed live today)
2. **Two site versions indexed** (moring.ai + www + index.html) + old-template pages still live
3. **Blog = thin topical cluster** (7 posts / 5 categories, no pillar structure, no internal-link mesh)
4. **No landing/destination pages** — nothing for inbound leads to convert on except /contact
5. **AWS Marketplace claim is FALSE** ("Listed — procure on your existing AWS agreement" but NO listing exists) — fails procurement review + loses co-sell
6. **No Lighthouse/Core Web Vitals data** — unverified speed
7. **og:description missing** on product pages (social sharing weak)

**Immediate technical fixes (2-week sprint):**
- [ ] Add canonical tags site-wide (www.moring.ai as canonical) — Webflow: Settings → SEO, or custom code
- [ ] Submit sitemap to GSC (both properties) + request indexing for product/workshop/whitepaper pages
- [ ] Remove or redirect old-template pages (/about, /contact legacy)
- [ ] Remove the AWS Marketplace false claim OR start the listing (the procurement fast-lane)
- [ ] Add og:description + og:image to product pages
- [ ] Run Lighthouse → fix any CWV issues → log scores

---

## 4. GEO AUDIT — Generative Engine Optimization (D = the #1 gap)

### 4.1 The problem (from brief 4.3, still true today)
- **Moring is cited by ZERO AI answer engines for its own category terms.**
- When ChatGPT/Perplexity/Claude/Google AI Overviews answer "agent control plane" or "AI agent governance," they cite: **Guild.ai, IBM, Microsoft, ServiceNow, Credo, arXiv, CXO Today.** Never Moring.
- Moring appears only when the query literally contains "moring.ai."
- Root cause: **near-zero third-party citations/backlinks** — no industry placements, no Reddit/LinkedIn distribution, no analyst quotes, no data reports pointing to moring.ai.

### 4.2 What wins GEO in 2026 (verified research)
- AI engines prefer **original data, comparison tables, answer-shaped content, and sites with citation context** — not marketing pages.
- Brands cited in AI Overviews earn **35% more organic clicks + 91% more paid clicks**.
- By March 2026, only **38% of AI-cited pages ranked in Google's top 10** — a page can be cited WITHOUT ranking. This is GOOD news for Moring: GEO is winnable without beating ServiceNow in rankings.
- Pages not updated quarterly are **3x more likely to lose AI citations**.

### 4.3 The GEO fix (priority order)
1. **Publish original data → "State of Agent Governance in Regulated Enterprise 2026"** — built from the brief's 11 pain sources (Gartner 40% cancellation, Sinch 74%, MIT/IDC/RAND) + Moring's POC data. This is the **citation magnet** — AI engines cite survey/report pages. (Playbook G from brief.)
2. **Standalone answer pages** (see 7) — "What is an AI Control Plane?", "What is AI Agent Governance?", "SR 26-2 explained", each with a direct definition in the first 50 words + FAQ schema.
3. **Comparison pages** — Moring vs ServiceNow / A365 / watsonx / Guild / Lyzr / Credo. Comparison content is exactly what AI engines pull for "alternatives to X" queries.
4. **Founder-led distribution** — Balaji/Nikhil post the findings on LinkedIn (AI-indexable), and the report gets syndicated to Reddit r/AI_Agents, analyst portals, LinkedIn newsletters. Citations follow distribution.
5. **Get listed in the roundup pages** — Superblocks "9 Best AI Agent Governance Platforms", aicompliancevendors.com, G2. Appearing in those = backlink + AI-citation + review-listing in one.
6. **Forrester/Gartner** — the control-plane market landscape (Forrester named it; Leslie Joseph's list is open) — get Moring listed. Analyst citation = instant GEO + shortlist inclusion.

---

## 5. AEO AUDIT — Answer Engine Optimization (C+)

### 5.1 Strengths
- FAQ blocks exist on /ai-control-plane and the whitepaper ("What is an AI Control Plane?", "Where does it run?", "product or services?") — exactly what answer engines extract.
- One blog post is answer-shaped: "What an AI Control Plane Is, and the Three-Question Test" (6,332 words, dated content).

### 5.2 Gaps
- No **standalone citable definition pages** (answer pages live inside product pages, not as distinct URLs AI can quote cleanly).
- No **FAQPage schema** (JSON-LD) — the markup that explicitly tells engines what to quote.
- No **snippet-targeted formatting** (question-as-H2 + 40-60-word direct answer block under each).
- **Zero external signals** — AEO needs inbound confirmation to be trusted.

### 5.3 The AEO fix
- Create 4-6 standalone `/learn/` or `/glossary/` answer pages (see 7.3) with: question H2 → direct 40-60 word answer paragraph → table → FAQPage + HowTo schema.
- Restructure existing blog posts with an "Answer box" at the top (position zero format).
- Add FAQPage JSON-LD to /ai-control-plane, whitepaper, and the new answer pages.

---

## 6. CONTENT AUDIT — THE 11 EXISTING BLOG POSTS

| Post | Words | Date | Author | Category |
|---|---|---|---|---|
| What an AI Control Plane Is + Three-Question Test | 6,332 | 2026-08-04 | Ashvath | Engineering |
| Agentic AIOps: Who Governs the Ops Agents | 4,914 | 2026-08-15 | Ellakkiaa | Platform |
| From Pilot to Platform: 90-Day Rollout Plan | 4,467 | 2026-08-06 | Balaji | Research |
| Taking MCP to Production | 4,495 | 2026-08-02 | Vignesh | Engineering |
| AI-DLC vs AI-SDLC: What's the Difference? | 4,119 | 2026-08-02 | Balaji | Engineering |
| Why MCP Exists | 4,034 | 2026-08-02 | Vignesh | Product |
| Observability for AI Agents | 3,509 | 2026-08-15 | Ashvath | Platform |
| Who Is Accountable When an AI Agent Makes a Bad Decision? | — | 2026-09-02 | Arya Sharan | Engineering |
| How Should a Bank Use AI Agents to Investigate Reconciliation Breaks? | — | ~Sep 2026 | — | Engineering |
| What Is AI Agent Orchestration and How Do You Govern It? | — | ~Aug 2026 | Ellakkiaa | Product |
| Enterprise AI Architecture: Where an AI Control Plane Fits | — | ~Aug 2026 | Ashvath | Platform |

**⚠️ NEW INDEXING ISSUE (verified 2026-09-08): the last 4 posts are NOT in the sitemap.xml** — Google can still find them via /blogs pagination, but they have no sitemap signal + no canonical tags + slower discovery. Add all 11 to the sitemap.

**Assessment:** Good quality, solid length, real authors (not AI-slop), and publishing has now resumed (newest post Sep 2 2026 by **Arya Sharan**). **But:** the 7 original posts cluster in one 2-week window; **none target the regulated-workflow commercial keywords** (2 Tier 2/3) except the new reconciliation-breaks post (banking); no internal-link mesh; no canonical tags. Google's freshness signal decays on the Aug posts (3x citation-loss risk). The sitemap gap must be fixed immediately.

---

## 7. CONTENT STRATEGY — THE INBOUND LEAD ENGINE

### 7.1 The strategy in one line
**Own the regulated-workflow long-tail + become the cited authority for "governed business workflow agents" — via 4 content pillars, each with a destination page that converts.**

### 7.2 The 4 content pillars (map to ICP + keywords)

**Pillar 1 — The Regulated Workflow (commercial, HIGH priority)** → inbound leads from ICP buyers
Target keywords: "AI agent governance for banks/insurance/healthcare", "KYC automation", "claims AI", "prior-auth AI", "SR 26-2", "NAIC"
- 6 new posts (see 7.4)
- Destination: **per-workflow landing pages** → /demo/kyc, /demo/claims, /demo/prior-auth, /demo/payments (the Playbook C missing destination)

**Pillar 2 — The Control Plane Explained (GEO/AEO, HIGH priority)** → cited authority + answer-box traffic
Target keywords: "what is an AI control plane", "AI agent governance", "AI agent audit trail"
- 4 standalone answer pages + optimize the existing "What is an AI Control Plane" post
- Destination: /ai-control-plane + whitepaper

**Pillar 3 — Original Data (the GEO citation magnet)**
- "State of Agent Governance in Regulated Enterprise 2026" report (survey + benchmarks + Moring POC data)
- Distribution: LinkedIn, Reddit, analyst portals, newsletters
- Destination: gated report → /whitepaper + /contact

**Pillar 4 — Comparisons & Category (competitor-displacement)**
Target: "vs ServiceNow AI Control Tower", "vs Microsoft A365", "vs IBM watsonx", "vs Guild.ai", "Credo AI vs ServiceNow" (already exists — copy that format)
- 4-6 comparison pages
- Destination: /ai-control-plane (bake-off evidence)

### 7.3 Landing / destination pages to build (the missing funnel bottom)

| Page | Purpose | Keyword target |
|---|---|---|
| /demo/kyc | C1 workflow demo page | KYC automation, SR 26-2 |
| /demo/claims | C3 workflow demo page | claims AI, NAIC |
| /demo/prior-auth | healthcare payor demo page | prior-auth AI, HIPAA |
| /demo/payments | payments demo page | payment disputes, fraud |
| /learn/what-is-an-ai-control-plane | AEO answer page | what is an AI control plane |
| /learn/what-is-ai-agent-governance | AEO answer page | AI agent governance |
| /learn/sr-26-2-explained | AEO + regulatory page | SR 26-2, model risk |
| /compare/moring-vs-servicenow-aict | comparison | AI control tower vs |
| /compare/moring-vs-microsoft-a365 | comparison | Agent 365 vs |
| /compare/moring-vs-guild-ai | comparison | Guild.ai vs |
| /report/state-of-agent-governance-2026 | gated data report | (citation magnet) |

**These are the pages that turn inbound traffic into booked meetings** — the offer ladder (workshop → POC → platform) needs a landing per step (9D.1 from brief).

### 7.4 New blog posts to write (12 recommended, in priority order)

**Wave 1 — Regulated Workflow (commercial intent, publish first):**
1. "AI Agent Governance for Banks: SR 26-2, Model Risk, and the Evidence Trail" (the flagship — note: LucidTrust is the only competitor here, attack now)
2. "Claims Automation with Governed AI Agents: From Document-Chasing to Approved in Hours"
3. "KYC Onboarding Automation: One Process, Six Systems, Zero Lost Evidence"
4. "NAIC AI Model Bulletin: What Insurers Must Do (and What a Control Plane Handles)"
5. "AI Agent Audit Trails: How to Prove Who Did What, When, and Why"
6. "Human-in-the-Loop AI: Why Approval Gates Are the Feature, Not the Friction"

> **Already covered (don't duplicate):** the new "How Should a Bank Use AI Agents to Investigate Reconciliation Breaks?" post (Arya Sharan, Sep 2026) already targets the banking-workflow angle — extend it with internal links + answer-box formatting rather than writing a new banking post.

**Wave 2 — GEO/AEO answer pages + data:**
7. "What is an AI Control Plane?" (standalone answer page, upgrade the existing post)
8. "What is AI Agent Governance? Definition, Frameworks, and the 2026 Reality"
9. "The State of Agent Governance in Regulated Enterprise 2026" (the data report)
10. "How to Run a 48-Hour AI Agent Bake-Off" (the r/AI_Agents-mood play — 2 approval gates, RBAC, audit log)

**Wave 3 — Comparison/category:**
11. "Moring vs ServiceNow AI Control Tower" (Credo-style comparison)
12. "Moring vs Guild.ai: Governing Agents vs Delivering Governed Workflows"
13. "Moring vs Microsoft Agent 365 / IBM watsonx.governance"
14. "The Regulated Enterprise's Guide to Choosing an AI Control Plane" (pillar page linking all comparisons)

**Cadence:** 1-2 posts/week. **Format rule:** every post gets an answer-box opening (question → 40-60 word direct answer), FAQ schema, internal links to its demo/landing page, and a distribution pass (LinkedIn + Reddit + newsletter).

---

## 8. COMMUNITY STRATEGY (where the demand conversation actually happens)

### 8.1 The verified reality (from brief 9A.4 + live Reddit research 2026-09-08)
- **r/AI_Agents = 257K-420K members** — the #1 technical-buyer community. NOT r/AIgovernance (511 subs, dead) or r/AI_Governance (government-focused, wrong audience).
- Other live communities: r/aiagents (~117K), r/mcp (infrastructure), r/buildinpublic, r/AiAutomations, r/LangChain, r/machinelearning.
- **The 2026 mood (verified May-Aug 2026 threads):** anti-hype, anti-fragile. "Multi agent systems are a total nightmare in production" (55 upvotes), "The AI Agents hype has officially gone too far," "State of AI Agents in corporates mid-2026" (narrow deployments, claims processing, onboarding, human exception queues). **The conversation is ALREADY at Moring's exact thesis** — governed, workflow-bounded agents with human exception handling.
- **Community rules that matter:** r/AI_Agents = no spam, links in comments not posts, 1:10 self-promo ratio, substance required (100+ words). Guild.ai runs a Discord + free Spend Explorer tool + glossary = the PLG/community wedge.

### 8.2 The Moring community playbook
1. **Be a helpful engineer, not a vendor.** Answer questions on governed agent deployment, MCP security, audit trails, approval gates — where Moring has genuine depth. This builds the citation/callout pattern.
2. **Comment on competitor news** (the Guild play — their CEO publicly critiques ServiceNow). Moring should do the same on ServiceNow/MS/Guild announcements.
3. **Launch a Discord/Slack community** OR a free diagnostic tool (e.g. "Agent Governance Readiness Check" — mirrors Guild's Spend Explorer) as the PLG wedge.
4. **Post the data report + bake-off methodology to r/AI_Agents** (links in comments per rules) — direct GEO/citation feed.
5. **Distribution loop:** every blog post → LinkedIn (exec) + Reddit (technical) + newsletter → citations → GEO. (Brief's 15-minute rule + engagement pods.)
6. **Own the "governed business workflow agents" phrase** in these communities — define the category where the conversation already is.

---

## 9. ICP MAPPED TO CONTENT (who each asset should reach)

From brief 6 + 9A.4 (the buyer committee):

| Buyer type | Title | Pain (verbatim) | Content that reaches them |
|---|---|---|---|
| **A — Economic** | CIO, CDO, CAIO, COO, CFO | ROI, time-to-value, board pressure, POC→production | Data report, "90-day rollout", comparison pages, SR 26-2 post |
| **B — Workflow (landing sponsor, FAST-YES)** | Head of Claims, KYC/AML, Payments, Ops, VP Eng | Queue size, SLA, manual effort, evidence scattered | **The regulated-workflow posts + demo pages (Pillar 1)** — this is the primary inbound target |
| **C — Control (veto, win early)** | CISO, CRO, Head of AI Governance, Model Risk, Compliance | Audit pass, control evidence, SR 26-2/NAIC, no lock-in | Audit-trail post, bake-off post, compliance matrix, answer pages |

**The fast-yes persona is the #1 inbound target** (brief 6.1): mid-market insurance Claims Ops lead or KYC/AML Ops lead at a 500-3,000-employee regulated firm under NAIC/SR 26-2 pressure. **Pillar 1 content is written exactly for them.** Every regulated-workflow post ends on its demo-page CTA → workshop → POC ladder.

**Keyword-to-buyer mapping:** regulated-workflow long-tail (2 Tier 2/3) maps ~90% to Type B (landing) + Type C (veto); control-plane-explained maps to Type C; comparison/data maps to Type A + shortlist.

---

## 10. THE 90-DAY INBOUND ROADMAP (draft)

**Days 0-14 — Fix the technical foundation**
Canonical tags · **add the 4 missing blog posts to sitemap** · **301 or restore the 6 dead old-template URLs** · GSC sitemap submit + indexing requests · remove old-template pages · remove/start AWS listing · og:description · Lighthouse + CWV · GA4/Search Console goal tracking

**Days 14-45 — Publish Wave 1 + answer pages (the commercial + GEO core)**
6 regulated-workflow posts · 3 answer pages (/learn/) · per-workflow demo pages (/demo/kyc, /demo/claims) · FAQ schema · internal-link mesh

**Days 30-60 — The data report + distribution engine**
"State of Agent Governance 2026" report · founder LinkedIn campaign (Balaji/Nikhil 2-4x/wk) · Reddit r/AI_Agents distribution · G2/Superblocks/analyst listing applications · newsletter launch

**Days 45-75 — Comparison + category build-out**
4-6 comparison pages · pillar guide · bake-off post · competitor-displacement content

**Days 60-90 — Measure + compound**
GSC keyword/impression tracking · AI-citation monitoring (track ChatGPT/Perplexity/Claude mentions) · iterate on what's cited/ranked · refresh quarterly (the 3x citation-loss rule)

**Success metrics to report to Arya:** indexed URLs (41→all money pages), # of AI citations for category terms (0→target 10+), GSC impressions/clicks, demo-page visits→bookings, backlink/DR growth, blog post rankings for Tier 2/3 keywords.

---

## 11. "DO WE NEED MORE BLOGS AND LANDING PAGES?" — DIRECT ANSWER

**Yes, specifically:**
- **~12-14 new blog posts** (the exact list in 7.4) — NOT more of the same; the current 7 are good but cover only the engineering/explainer layer. The missing 90% is regulated-workflow commercial content.
- **~10 new landing/destination pages** (7.3) — demo pages + answer pages + comparison pages + gated report. These are the funnel bottom that turns traffic into booked meetings (currently only /contact exists).

**Anything else?** Yes, in priority order:
1. **Canonical tags** (blocking everything — no more content until this is fixed, or you're multiplying a duplicate-content problem)
2. **Add the 4 missing blog posts to the sitemap** (reconciliation-breaks, accountability, orchestration, enterprise-ai-architecture) + 301 or restore the 6 dead old-template URLs (/services, /about, 4× /resources/*)
3. **AWS Marketplace listing** (or remove the claim) — procurement fast-lane + GEO + co-sell
4. **Analyst/vendor listings** (Forrester control-plane landscape, G2, Superblocks roundups) — instant authority + citation
5. **Founder content engine** (Balaji/Nikhil) — the #1 unblocked, free, compounding lever
6. **A free diagnostic/PLG wedge** (Agent Governance Readiness Check) — community + bottom-up demand
7. **Newsletter + community (Discord/Slack)** — owned audience, citation distribution
8. **Refresh cadence** — quarterly content updates (the 3x citation-loss rule)

---

# PART 12 — ALL-CHANNEL SOCIAL MEDIA STRATEGY (DEEP-DIVE, verified 2026-09-08)

> **The headline number that changes everything:** social content generates **~2.5x more AI citations than owned brand pages** (NoGood/Goodie, 45M citations across 10 AI surfaces, Feb 2026). YouTube + Reddit + LinkedIn are how AI engines learn about a brand — often MORE than the brand's own website. **Moring's social presence is the #1 unblocked lever for fixing the GEO-D grade (4) — not just the website.**

## 12.1 The citation table — where AI engines actually cite social (verified)

| Platform | % of social citations (Feb 2026) | Top AI surface for it | Moring's fit |
|---|---|---|---|
| **YouTube (long video)** | **45.9%** (up from 31.2% Oct 2025) | Perplexity 97.4%, Gemini 74.7%, Google AI Overview 47.6% | 🔴 **#1 GEO lever — create it NOW** |
| **Reddit** | **24.9%** (led at 31.1% in Jan 2026) | ChatGPT 59.5%, Claude 53.2%, DeepSeek 48%, Copilot 40.1% | 🔴 #2 — the only platform cited by ALL 10 AI surfaces |
| **LinkedIn (articles)** | **11.8%** (articles 5.8x more cited than feed posts) | Copilot 52.4%, DeepSeek 57.3%, Meta AI 53% | 🟠 #3 — B2B authority substrate |
| **X/Twitter** | **8.4%** (down from 28.8%; 99.7% of X citations = Grok only) | Grok 77.3% (X-post exclusive) | 🟡 Grok-specific; low priority unless targeting Grok users |
| TikTok / Instagram / Facebook | ~2.5% each | — | ⚪ Skip for Moring's ICP |

**Format wins (same platform):** YouTube **Long Video : Short = 51:1** for citations (Shorts ~11K vs Long ~574K). LinkedIn **Article : Feed Post = 5.8:1**. Instagram Reels beat posts but Instagram is wrong-audience anyway.

**The Moring implication — in order of GEO value:**
1. **YouTube long-form** (45.9% of social citations) — Balaji/Nikhil 10-20 min technical talks, transcripts indexed by every Google AI surface + Perplexity. **This alone can lift the GEO grade from D to B.**
2. **Reddit** (24.9%, cited by ALL engines including ChatGPT+Claude — Moring's buyer tool of choice) — the helpful-practitioner play in 8.
3. **LinkedIn articles** (not feed posts) — post the blog posts as **LinkedIn Articles** (republish), because articles get 5.8x the citations of feed posts.
4. **X** — only for Grok visibility; low ROI for regulated-B2B buyers. Optional, later.

## 12.2 YouTube strategy (the #1 GEO + credibility lever)

**Why:** Google owns YouTube; its AI surfaces (AI Overview, AI Mode, Gemini) have unmediated access to transcripts. A 15-min Moring talk gets INDEXED as citation fuel — no ranking fight needed. Guild.ai proved it: one 111K-view founder deep-dive built the category + social proof.

**The plan (Phase 1 — 4 videos, then weekly):**
| # | Video (10-20 min, long-form) | Why it gets cited | Owner |
|---|---|---|---|
| 1 | "Why 40% of Agentic AI Projects Die — and the Control Layer That Saves Them" (Gartner 40% + Sinch 74% + live bake-off demo) | Data + a stat AI engines quote | Balaji |
| 2 | "Inside a Governed AI Deployment: Paid POC to Production in 14 Days" | Process answer — "how to" | Nikhil |
| 3 | "AI Agent Audit Trails: Proving Who Did What, When, and Why" (audit-lake walkthrough) | The buyer-language answer (r/AI_Agents exact ask) | Balaji |
| 4 | "What an AI Control Plane Is (and the Three-Question Test)" — repurpose the 6,332-word post into video | Definition + FAQ = AEO/GEO gold | Balaji |

**Production rules:** long-form only (no shorts for citations) · transcripts auto-indexed (don't disable) · FAQ/timestamps in description · closed captions on · embed on blog posts · upload to YouTube + repost to LinkedIn (Article) + X.

**Where Moring's buyers already watch (guest/podcast targets, verified):** GAEA Talks (1.71M subs — Oliver Patel's enterprise AI governance episode, 177K views), theCUBE/SiliconANGLE AppDevANGLE (agentic governance episodes), ServiceNow+NVIDIA-style enterprise talks, AWS re:Invent talks, Gartner/Forrester webcasts. **Moring should pitch Balaji/Nikhil as guests to theCUBE + GAEA-style channels — borrowed audience + YouTube transcript citations in one move.**

## 12.3 Reddit strategy (the "real experience" substrate — cited by ChatGPT + Claude)

**Verified landscape (2026):** the demand conversation is NOT in r/AIgovernance (511 subs) or r/AI_Governance (government-focused). It's in **r/AI_Agents (257K-420K)**, **r/aiagents (~117K)**, **r/mcp (62K)**, **r/langchain (40K)**, **r/LLMDevs**, **r/n8n**, plus **r/devops / r/sysadmin / r/CyberSecurity** for the AI-Ops/security angle.

**The 2026 mood (verified threads, Apr-Aug 2026):** "Multi agent systems are a total nightmare in production" (55 upvotes), "The AI Agents hype has officially gone too far," "State of AI Agents in corporates mid-2026" (claims processing, onboarding, human exception queues = **Moring's exact thesis**). The community is anti-hype, anti-fragile, pro-governance — it's ALREADY at Moring's message. This is the honest, no-spin community.

**The play (per community, with rules from RedditFind + r/AI_Agents mod rules):**
| Subreddit | Fit | What Moring posts (value-first) | Avoid |
|---|---|---|---|
| r/AI_Agents | 97% | Answer "how do you govern agents in production" with substance (audit trails, approval gates, human-in-loop) | Link drops, self-promo, thin demos (9:1 value rule) |
| r/aiagents | 95% | Build retrospectives, MCP security, production failures with exact context | Waitlists, disguised promo, astroturfing |
| r/mcp | 91% | Protocol/tool-scoping questions, "taking MCP to production" lessons (Moring has 2 posts) | Naked links (posts need links in comments) |
| r/langchain | 87% | Framework → production migration, governance at runtime | Framework debates, off-topic |
| r/LLMDevs | 86% | Agent harness, evals, tool-calling, memory layers | Self-promo |
| r/devops / r/sysadmin / r/CyberSecurity | Med | AI Ops, alert noise, LLM cost, agent security/guardrails | Vendor noise |
| r/saas / r/productmanagement | Med | Non-promotional founder retrospectives (brief's best-performing format), pricing lessons | Lead-gen surveys, naked links |

**The citation trick:** answer questions so completely + accurately that the thread BECOMES the AI-cited source (Reddit's licensing deal with OpenAI = ChatGPT reads it directly). Durable threads ("what I wish I knew", "how we did X in production", comparison threads) are the ones AI engines cite.

## 12.4 LinkedIn strategy (B2B authority substrate — articles beat posts)

**Verified (NoGood):** LinkedIn cited by 9 of 10 AI surfaces; **Articles = 196K citations vs 34K for Feed Posts (5.8x)**. For B2B, LinkedIn is foundational infrastructure — but the format that wins AI search is the ARTICLE, not the feed post.

**The plan:**
1. **Every blog post → republished as a LinkedIn Article** (5.8x citation leverage). Cross-post the full text (LinkedIn penalizes external-link-only).
2. **Executive engine (Balaji + Nikhil)**: 2-4x/wk feed posts (the 80-10-10 rule — 80% value, 10% engagement, 10% promo), + substantive comments on the voices below. Exec posts are AI-indexable (Edelman-LinkedIn data).
3. **Comment on (the verified target list):**
   - **Oliver Patel** (Head of Enterprise AI Governance @ AstraZeneca; 9K+ Substack subs; 7K+ newsletter; 292-729-reaction posts; book "Fundamentals of AI Governance" out Sept 7 2026 — THE governance voice to co-create with)
   - **Leslie Joseph (Forrester)** — named the control-plane market
   - **Steve Nouri, Cassie Kozyrkov, Allie K. Miller** (the tier-1 AI LinkedIn voices, from GenAI.Works top-10 2026)
   - **Competitors** (ServiceNow, Microsoft, IBM, Guild.ai) — the Guild play: their CEO publicly critiques ServiceNow; Moring should comment substantively on competitor announcements
   - **Target-account AI-hire posts** (CTO/CAIO/CISO/Head of AI Governance announcements)
4. **Company page**: daily → 3-5x/wk (the benchmark), only value content, drive to Articles.
5. **Newsletter**: Oliver Patel's model (weekly Substack → 9K subs → citations). Moring starts "Governed Agentic AI" — every edition is a LinkedIn Article + a citation.

## 12.5 X/Twitter (optional, Grok-only value)

**Verified (MaxAEO, 6,400 Grok answers):** X posts = 47% of Grok's cited sources; 68% of cited posts <48h old; authority + recency + exactness win. **But 99.7% of X citations come ONLY from Grok** — if Moring's buyers don't use Grok, X has near-zero AI-search value. **Verdict:** deprioritize X; if Balaji wants it, use it for real-time commentary on SR 26-2/NAIC news (Grok's recency bias), not as a core channel.

## 12.6 Other communities & owned channels (the "where we need to be" list)

| Community / channel | What it is | Moring move | Priority |
|---|---|---|---|
| **Agentic Village** (agenticvillage.net) | Global practitioner community for responsible Agentic AI (forums, cohorts, glossary, ask-an-expert) | Join as practitioner; contribute governance content; possibly sponsor tier | 🟠 High |
| **Oliver Patel's Substack** | 9K-sub enterprise AI governance newsletter; publishes resource guides (80+ resources, Edition #45) | **Get Moring listed in the next resource guide** + comment/subscribe + offer co-authored content | 🔴 High (citation!) |
| **Discord/Slack community (own)** | Guild runs one (their PLG wedge) | Moring launches one (or a free "Agent Governance Readiness Check" tool) | 🟠 Medium-High |
| **Private exec forums** (Open Future Forum: CTO/CISO/CFO Forum Select) | Invite-only peer rooms = exactly Moring's committee | Engage as peer/contributor only (vendor presence banned) | 🟡 Selective |
| **Analyst portals** (Gartner/Forrester/IDC, TechTarget, CIO, InfoWeek, EY/Deloitte/BCG) | Where buyers build shortlists | Get cited; Forrester control-plane landscape + "Moring delivers all five capabilities" | 🟠 High |
| **Conferences** (AWS re:Invent Dec, Gartner, InsureTech, FinovateFall Sep 9, Sibos Sep 28) | Full buying committee | Selective booth/talk/podcast; re:Invent fits AWS story | 🟡 Med (expensive) |
| **Newsletter (own)** | Oliver Patel's model = compounding owned audience + citations | "Governed Agentic AI" weekly; every edition → LinkedIn Article + citation | 🔴 High |
| **Instagram** | Wrong audience | Employer-brand only, last priority | ⚪ Optional |

---

# PART 13 — COMMUNITY AGENT INTEGRATION (operationalizing 8 + 12)

The project has a **gtm-community agent** (`.opencode/agents/gtm-community.md`) that already codifies the monitoring checklist + engagement template. This plan upgrades it with the verified citation data. **The agent's job is now:**

## 13.1 The monitoring checklist (upgraded, 3x/week Mon/Wed/Fri)

1. **r/AI_Agents + r/aiagents** (was: r/AIgovernance only — ADD the high-traffic subs) — governance-in-practice: audit, policy, agent runtime, SR 26-2, control plane, "how do you govern agents"
2. **r/mcp + r/langchain + r/LLMDevs** — protocol/framework questions (Moring has MCP depth)
3. **r/devops, r/sysadmin, r/CyberSecurity** — AI Ops, alert noise, LLM cost, guardrails, MCP security
4. **YouTube** — enterprise agent-governance talks (theCUBE, GAEA, ServiceNow+NVIDIA format); read comments for pain signals; note guest opportunities
5. **LinkedIn** — Oliver Patel, Leslie Joseph/Forrester, competitor posts (ServiceNow/MS/IBM/Guild), target-account AI-hire announcements
6. **Buying signals to route to Lead Gen** (unchanged, high-value): POC stalls, "AI cost is a black box", ungoverned Claude Code/Cursor, model-risk/audit anxiety, SR 26-2/NAIC/APRA/CBUAE questions, "how do we get agents into production safely"

## 13.2 The engagement template (already in the agent doc — keep it)

`THREAD → PAIN/SIGNAL → DRAFT COMMENT (≤250 words, helpful-first, no links) → WHY THIS ADDS VALUE → MORING MENTION: none|natural → ROUTE → STATUS: DRAFT awaiting approval.` **Nothing posts without human approval (hard rule #1).**

## 13.3 New cadence targets (from the citation data)

- **2-5 quality engagements/week** (the agent doc's "2-5 beats 20 throwaways" — confirmed by the Resonance signal: Grok/X and AI engines weight WHO engages, not volume)
- **1 blog post → distributed everywhere** (LinkedIn Article + Reddit + newsletter) each week
- **Quarterly refresh** of any post that's getting citations (3x citation-loss risk for stale pages)
- **Comment on 3-5 competitor/analyst posts/week** (the Guild play — their CEO critiques ServiceNow publicly; Moring's agents can draft the same on competitors)

---

# PART 14 — TRIGIFY MONITORING (the always-on signal + content source)

**⚠️ Tooling flag (2026-09-08):** the Trigify MCP server is configured in opencode.json (`api.trigify.io/mcp`, key stored outside docs) but **returns 401 Unauthorized on direct API/MCP calls** ("Authentication required. Sign in with OAuth, or provide a Trigify API key via x-api-key or Authorization: Bearer"). The key in config is not being accepted — needs re-auth (OAuth browser flow) or a regenerated key before the agent can pull monitor results programmatically.

**Until re-auth, the documented monitor set (from AGENTS.md, created 2026-08-26) still exists in the app:**
- Banking `e6981672` · Insurance `bab9b39b` · Credit Unions `96232a59` · Utilities `4d7897bb` (news monitors: agentic-AI keywords + one vertical term)
- LinkedIn AI-leadership monitor `01a3bd2e` (low-yield, ~5% actionable)

**How Trigify feeds this plan (once re-authed):**
1. **Signals → content**: every monitor-caught regulatory/vertical event (SR 26-2 RFI, NAIC, bank AI hiring) = a timely blog post + LinkedIn commentary + Reddit answer (Grok/recency bias makes fresh-topic commentary citable).
2. **Signals → community agent**: the gtm-community agent uses Trigify hits to know WHAT to comment on (fresh, on-topic, citable) rather than scrolling cold.
3. **Signals → GEO**: fresh regulatory analysis on the site (updated quarterly) is exactly the freshness AI engines reward.

**Action:** re-auth Trigify (OAuth browser flow per AGENTS.md notes) or regenerate the API key, then wire the monitors into the community agent's daily intake.

---

# PART 15 — "ANYTHING ELSE?" — THE COMPLETE ANSWER (deep-dive version)

Everything below is in addition to the blogs/landing pages (7) and the 90-day roadmap (10):

**Immediate (this week):**
1. Canonical tags (blocking — do before any new content)
2. Re-auth Trigify (401 today)
3. Remove/start AWS Marketplace listing (false claim on /aws)

**High-leverage (next 30 days):**
4. **YouTube long-form** — 4 videos (the 45.9%-of-social-citations lever). The single biggest GEO fix that doesn't require backlinks.
5. **LinkedIn Articles** — republish all 7 existing blog posts as Articles (5.8x citation leverage, free).
6. **Get listed in Oliver Patel's resource guide** + the Superblocks/aicompliancevendors roundups (instant citation + backlink).
7. **Newsletter** ("Governed Agentic AI") — Oliver Patel's proven compounding model.
8. **Community agent daily intake** wired to Trigify + Reddit + LinkedIn (2-5 substantive engagements/week).

**Foundation (30-90 days):**
9. **State of Agent Governance 2026** data report (the citation magnet) + distribute everywhere.
10. **Comparison pages** (vs ServiceNow/A365/watsonx/Guild/Credo) — the Credo "vs ServiceNow" playbook.
11. **Analyst/vendor listings** — Forrester control-plane landscape, G2, Gartner.
12. **Free diagnostic/PLG wedge** (Agent Governance Readiness Check) + Discord/Slack.
13. **Guest on theCUBE / GAEA / enterprise-AI podcasts** (borrowed audience + YouTube transcript citations).
14. **Conferences** — AWS re:Invent (Dec 2026) + vertical shows, selective.

**The honest priority order for Arya:** canonical tags → YouTube long-form → LinkedIn Articles → newsletter + data report → Reddit/community agent daily → comparisons → analyst listings → everything else. **The first three are all free, unblocked, and directly attack the GEO-D grade — the single biggest gap between Moring and the incumbents.**

---

# PART 16 — WHERE WE WIN vs WHERE WE LACK (the honest balance sheet, verified 2026-09-08)

> The one-paragraph read: **Moring's product + delivery model is genuinely differentiated** (regulated-workflow agents, delivered, outcome-priced, in-customer-cloud) — no competitor can credibly claim that bundle. **But everything that converts awareness into trust (proof, authority, distribution, discoverability) is missing or broken.** The wins are structural and permanent; the lacks are almost all fixable content/infrastructure work. The fix list is the plan above.

## 16.1 WHERE WE WIN (the real, defensible advantages)

| # | We win here | vs who | Why it's durable |
|---|---|---|---|
| 1 | **Regulated-business-workflow agents** (claims, KYC, prior-auth, payments) — delivered, not a platform to build on | Guild (engineering-runtime), ServiceNow (walled garden), IBM (policy registry) | Nobody sells the bundle "we deliver YOUR governed business agents." It's the unoccupied position (9B.3). |
| 2 | **Outcome-priced** — fee triggers only if the measured outcome ships | Everyone (MS consumption, ServiceNow platform, Guild seats) | The anti-surprise-bill + anti-risk model; procurement-friendly; G2's #1 complaint solved. |
| 3 | **In your cloud, no lock-in, you own the keys** (source, runbooks, evals at handoff) | ServiceNow/MS walled gardens, IBM heavy stack | Directly answers the "no lock-in" buyer demand + the sovereignty angle regulators want. |
| 4 | **Policy at the substrate (OPA/Cedar), audit lake, approval gates, replayable runs** | Guild (runtime), Credo (policy-only), Rubrik (undo-only) | Passes the 48-hour bake-off the r/AI_Agents buyers actually run — the one vendor that does. |
| 5 | **Compliance mapping** (SR 26-2, NAIC/MRM, HIPAA, EU AI Act, APRA, CBUAE, SOC 2) | All competitors lack regulated-depth | The "why now" layer + the exam-anxiety lever; regulators are about to RFI agentic AI. |
| 6 | **FDE + speed** (14-day platform, weeks-not-years) | SI/consultant model (months) | Removes the #1 enterprise hiring/building bottleneck. |
| 7 | **Live outbound proof** — LinkedIn 18.6% DM reply rate (beats benchmark), 53 connects, warm referrals (Julie QBE→Nigel) | Benchmark 15-20% | The motion WORKS; pipeline is real, just young. |
| 8 | **Founder/technical depth** (Balaji ex-CERN/Volvo, whitepaper; real engineer-authors on blog) | Guild founder-led (but Moring has comparable raw material) | The GEO/content engine can be built on real technical authority — no invention needed. |
| 9 | **Category term is ours to define** — "Governed Business Workflow Agents" + "AI-DLC" | Nobody owns these | First-mover phrase rights in a category that's converging on "control plane" (a word that's now table stakes). |

## 16.2 WHERE WE LACK (the honest gaps — all fixable)

### A. Proof & trust (the conversion killers) — VERIFIED 2026-09-08
| Gap | Evidence | Fix |
|---|---|---|
| **ZERO public customer references / case studies / testimonials** | Homepage has no logos/references; blogs page has no case studies (checked live) | Land 1 insurance + 1 banking + 1 payor champion, publish 3 case studies (brief 9A.4); the FDE + outcome model is designed to create them |
| **ZERO analyst recognition** | No Gartner MQ / Forrester Wave / badge vs IBM (MQ Leader), Credo (Wave Leader), ServiceNow | Get Moring into Forrester's control-plane landscape (Leslie Joseph's list is open) + vendor listings |
| **ZERO reviews** (G2 / Capterra) | Capterra profile exists but no verified reviews; no G2 presence | Claim profiles + seed 5-10 honest reviews from engaged prospects |
| **No pricing transparency** | /pricing 404 (checked); competitors publish (Airia $50/mo tiers, Zenity, etc.) | Publish the offer-ladder pricing (9D.1) — anti-surprise-bill IS the story |

### B. Discoverability & authority (the traffic killers)
| Gap | Evidence | Fix |
|---|---|---|
| **GEO = D grade** — ZERO AI-engine citations for own category terms | AI answers cite Guild/IBM/MS/ServiceNow/Credo/Atlan, never Moring | YouTube long-form + data report + LinkedIn Articles + answer pages (Parts 12-13) |
| **Near-zero domain authority** | No backlinks; vs ServiceNow DR 85, 1.9M backlinks | Roundup listings, analyst citations, Reddit/LinkedIn distribution, guest podcasts |
| **Technical SEO broken** | No canonicals anywhere; 6 old-template URLs 404 in index; 4 blog posts missing from sitemap; triple homepage variants | The 10 days-0-14 fix list |
| **Small indexed footprint** | ~9-11 pages vs 41 sitemap URLs; product pages not pushed | GSC indexing requests + sitemap fix |
| **AWS Marketplace claim is FALSE** | /aws claims "listed" — it is NOT; ServiceNow/Credo ARE listed | Remove claim or list (procurement fast-lane + GEO + co-sell) |

### C. Distribution & content engine (the reach killers)
| Gap | Evidence | Fix |
|---|---|---|
| **No exec-LinkedIn engine** | Only Balaji active; company ER 0.06%; Guild's CEO does 4-5/wk + critiques competitors | Balaji + Nikhil 2-4x/wk (the 12 pre-written posts exist in the brief 9D.7) |
| **No YouTube / video** | Guild 111K founder video; IBM 31K governance video; Moring has zero | 4 long-form videos (Part 12.2) |
| **No community / Discord / free tool** | Guild runs Discord + Spend Explorer + glossary | Agent Governance Readiness Check + Discord/Slack |
| **No newsletter** | Oliver Patel has 9K+ subs; Moring has none | "Governed Agentic AI" weekly (every edition = LinkedIn Article + citation) |
| **No comparison content** | Credo owns "vs ServiceNow"; Moring has zero | 4-6 comparison pages (Tier C attack) |
| **Blog gaps** | 11 posts, none on SR 26-2/NAIC/payors; the money keywords untargeted | The 7.4 wave-1 list |

### D. Brand & operations
| Gap | Evidence | Fix |
|---|---|---|
| **Entity confusion** | TWO entities indexed: "moring" (Crunchbase, new positioning) AND "MORING AI SOFTWARE PRIVATE LIMITED" (Chennai/India, agentic-platform description) + "MorningAI" (morningai.com, different company) bleeds into results | Consolidate entity claims (Crunchbase/LinkedIn/website consistent); disambiguate from MorningAI |
| **Team size** | 8 employees vs Guild 46 (5.75x) — but per-employee reach is comparable | Play the leverage game (agents + FDE), don't compete on headcount |
| **Trigify broken** | API key returns 401 (verified) | Re-auth / regenerate key |

## 16.3 THE ONE-SENTENCE VERDICT
**Moring wins where it matters most — the product, the delivery model, and the pricing — and lacks only where attention and trust are built (proof, authority, distribution, discoverability). Every lack on this list is content/infrastructure work the plan above already schedules. The wins compound; the lacks are fixable; nothing here is structural.**

---

*Sources (Part 16): live crawl of moring.ai (2026-09-08 — no case studies, no pricing, no testimonials, /services & /pricing 404) · ONE Research Brief Parts 2, 4, 6, 8, 9A, 9B, 9D · competitor SERP analysis (Guild glossary, Atlan how-to, LucidTrust SR 26-2, Microsoft Inside Track, Credo comparison pages, ServiceNow Knowledge 2026, Concurate ServiceNow SEO teardown) · Capterra/Crunchbase/CB Insights entity records · NoGood/MaxAEO/LinkedOtter research (Parts 12-15).*

*Sources (Part 12-15): NoGood/Goodie social-citation study (45M citations, 10 AI surfaces, Feb 2026 — YouTube 45.9%/Reddit 24.9%/LinkedIn 11.8%/X 8.4%, Long-video:Short 51:1, Article:Feed 5.8:1) · RedditFind subreddit research (May 2026) · MaxAEO Grok citation study (6,400 answers, Jul 2026) · Oliver Patel LinkedIn/Substack (9K+ subs, GAEA Talks 177K views) · Agentic Village (2026) · Concurate ServiceNow SEO teardown (1.6M monthly organic, glossary-page strategy) · LinkedOtter demand-gen for AI governance (2026-07) · gtm-community agent doc · Trigify API status (401, 2026-09-08) · brief Parts 8/9A/9D.*
