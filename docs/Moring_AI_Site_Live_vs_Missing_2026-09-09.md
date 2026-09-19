# Moring Website — What's LIVE vs What's MISSING
**Verified 2026-09-09 · Full re-crawl of the rebuilt site (Vercel-hosted, "moring" branding)**

---

## TL;DR
The SEO/GEO/AEO foundation from the Inbound Plan is **largely SHIPPED** (canonicals, meta, schema, sitemap, workflow-led titles all live). **Three blocking gaps remain:** (1) GSC verification + GA4/GTM tracking were DROPPED in the rebuild — Google can't verify the new site and zero analytics is collecting; (2) the false "AWS Marketplace: Listed" claim is still on /aws; (3) 5 old resource URLs still 404 in the index.

---

## ✅ LIVE — what shipped (verified by full crawl)

| Check | Status | Detail |
|---|---|---|
| **Canonical tags** | ✅ **FIXED** | Every page has a self-referencing canonical (`https://www.moring.ai/<page>/`) — home, products, workshops, whitepaper, partner, contact, blogs all verified |
| **Meta descriptions** | ✅ **FIXED** | Unique, keyword-rich on all pages |
| **OG + Twitter cards** | ✅ **FIXED** | Full og:title/desc/image + twitter:card + twitter:image on every page; og:image URLs resolve |
| **JSON-LD schema** | ✅ **FIXED** | Organization + WebSite + ContactPoint on all; BreadcrumbList/ListItem on product pages; **Service + BusinessAudience on /aws** |
| **Title tags / H1s** | ✅ **REWORKED** | Now workflow-led: "Build and Deploy AI Agents Into Production", "AI Control Plane for Production AI Agents", "AI Ops Agents for Incident Response", "AI Agents for Insurance/Banking Workflows" — the message-to-site fix is IN |
| **Sitemap** | ✅ **FIXED** | `sitemap-index.xml` → `sitemap-0.xml` = **43 URLs**; **all 11 blog posts included** (reconciliation-breaks, who-is-accountable, orchestration, enterprise-ai-architecture no longer missing) |
| **robots.txt** | ✅ | Allow all + sitemap-index + RSS feed link (`/rss.xml`) |
| **Redirects** | ✅ | Legacy `.html` paths 301→new homes (via `vercel.json` + `scripts/emit-redirects.mjs`); `/about` → 200, `/platform` → 200 (AICP) |
| **noindex** | ✅ None | All pages indexable |
| **Product-page schema** | ✅ | /ai-control-plane = Organization, WebSite, BreadcrumbList, ListItem |

---

## ❌ MISSING / STILL BROKEN (verified 2026-09-09)

### 1. 🚨 REGRESSION — GSC verification + GA4/GTM + HubSpot GONE
- **The rebuilt site head has NO tracking/verification at all.** Verified on `/` and `/ai-control-plane/`:
  - `google-site-verification` — **absent**
  - GA4 `G-DF4X8424BJ` / `gtag` — **absent**
  - GTM `GTM-M92CJFC6` — **absent**
  - HubSpot (`js.hs-scripts`), PostHog, Plausible, Segment — **absent**
- The only scripts on the page are JSON-LD schema + small inline JS (burger menu / step animations). Fully static build.
- **Consequence:** Google CANNOT verify the new site in Search Console, and **zero analytics data is collecting**. You are flying blind on traffic.
- **Cause:** the old site had `google-site-verification: MJRG5O4exnFZE-EVLSuRx1u1TQ8Xw6PvpcoIkehtisc`, GA4 `G-DF4X8424BJ`, GTM `GTM-M92CJFC6` — all dropped in the rebuild.
- **Fix:** add to the new site's `<head>` (layout/head component so it renders on every page):
  ```html
  <meta name="google-site-verification" content="MJRG5O4exnFZE-EVLSuRx1u1TQ8Xw6PvpcoIkehtisc" />
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-DF4X8424BJ"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-DF4X8424BJ');</script>
  ```

### 2. 🚨 /aws still claims "AWS Marketplace: Listed" — FALSE
- Live text on /aws: *"Marketplace Listed — procure on your existing AWS agreement"* and *"Marketplace-listed, your security and procurement teams are reviewing patterns they already approve."*
- **No actual AWS Marketplace listing exists.** ServiceNow AI Control Tower + Credo ARE listed; Moring is not.
- **Fix:** remove the claim OR actually list (AWS now has a dedicated "AI agents & tools" path, Bedrock + AgentCore-native, MCP/A2A).

### 3. 🚨 5 old resource URLs still 404 (soft-404 in the index)
- `/services/` → **404**
- `/resources/building-production-ready-agentic-ai/` → **404**
- `/resources/composable-ai-platform-approach/` → **404**
- `/resources/forward-deployed-engineering-model/` → **404**
- `/resources/document-processing-at-scale/` → **404**
- (`/about` + `/platform` now map correctly — only these 5 remain dead.)
- **Fix:** 301 to new equivalents, or restore the content (it was genuinely good SEO material: document processing, FDE model, production AI).

### 4. ⚠️ `/index.html` still resolves 200
- Duplicate homepage variant still live. Canonical now points to `/`, so lower risk — but confirm GSC consolidates to `/`.

### 5. ⚠️ Landing/destination pages absent (expected — build-out next)
- `/demo/kyc`, `/demo/claims`, `/learn/what-is-an-ai-control-plane`, `/compare/*`, `/report/*` → all **404** (the funnel-bottom build-out from Inbound Plan §7.3).

---

## The priority order

1. **Re-add GSC verification + GA4/GTM + HubSpot** to the new site (blocking — flying blind + Google can't verify)
2. **Fix the false AWS Marketplace claim** (remove "Listed" or actually list)
3. **301 or restore the 5 dead resource URLs**
4. Then continue the funnel-bottom build-out (demo/learn/compare/report pages)

---

*Cross-ref: `Moring_AI_Inbound_GEO_AEO_SEO_Plan_2026-09-08.md` §1.5 (post-rebuild crawl) · AGENTS.md "Site SEO / GEO / Indexing State" · ONE Research Brief Part 4 + Part 16.*