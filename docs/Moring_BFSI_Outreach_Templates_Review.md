# BFSI Outbound Copy — CEO Review Draft

**Prepared by:** Moring GTM Template System
**Purpose:** For review and comment before any campaign copy is finalized or sent.
**Status:** DRAFT — nothing has been sent. No campaign is live.

This document shows exactly what a prospect will receive, built on the workflow-led strategy (lead with a business workflow, not a product). Your sign-off is needed on the language, the cadence, and the key decisions at the end.

---

## 1. The formula every message follows

`verified signal → named workflow problem → agent-assisted change → human control → one low-friction question`

Four things hold across every touch:
1. First contact is always a **workflow diagnostic** (comparing how they run a process today). Never a demo or workshop up front.
2. **No links, no attachments** in the first email.
3. Every message names the **human who keeps the final decision** (KYC analyst, claims adjuster, investigator).
4. **Prospect vocabulary only** (KYC evidence, exception queue, claims file). Product names like AICP appear only as "this is how it stays safe in production," later in the sequence.

---

## 2. The flagship sequence (Banking — KYC evidence, US, enterprise)

One fully worked example so you can see the tone and arc. The same structure maps to all six campaigns (KYC, financial-crime, ops exceptions, claims, underwriting, policy/SIU) and to UAE/Australia.

**CONTEXT:** Commercial onboarding & KYC evidence · Enterprise · Workflow/Ops buyer

### Email 1 — Day 1 (no link)
Subject: `kyc evidence at {company}`

> Hi {first name},
>
> {verified signal}. Teams handling commercial onboarding often lose days to evidence scattered across systems, especially when ownership of a document is unclear and approvals wait on it.
>
> We build governed agents that pull approved evidence together, prepare the onboarding file, and stop there. Your KYC analysts keep the final call. Would it be useful to compare how {company} handles this today?
>
> Regards,
> Nikhil

### LinkedIn 1 — Day 3 (connect request, ≤300 chars, no pitch)
> Hi {first name}, comparing how BFSI teams handle KYC evidence as AI moves into regulated production. Open to connecting?

### Email 2 — Day 5 (first link allowed)
Subject: `the quiet cost inside kyc evidence`

> Hi {first name},
>
> The real cost in onboarding evidence rarely shows up as one big line item. It compounds: analysts rechecking the same documents across systems, cases parked on ownership questions, turnaround stretching while the queue ages.
>
> Wrote up why this pattern persists and what changes when evidence assembly is bounded: {blog link}
>
> Does that track with what you see in your numbers?
>
> Regards,
> Nikhil

### LinkedIn 2 — Day 8 (post-accept)
> Thanks for connecting, {first name}. Quick one. How does {company} handle onboarding evidence today, mostly manual checks across systems, or partly automated already?

### Email 3 — Day 11 (mechanism + use-case brief)
Subject: `how the kyc evidence agent actually works`

> Hi {first name},
>
> Concretely: the agent gathers evidence from approved sources, assembles the onboarding file, flags missing or conflicting documents, and prepares a recommendation. Then it stops. Your KYC analysts review and decide, with every access and approval recorded.
>
> Here's a two-page brief on the flow, with modeled versus measured outcomes labeled: {use-case brief}
>
> Worth walking your team through it?
>
> Regards,
> Nikhil

### LinkedIn 3 — Day 15 (observation + routing question)
> One pattern we keep seeing in KYC onboarding: the bottleneck is rarely analysis. It's evidence assembly and handoffs between teams. Is this yours to solve at {company}, or does it sit elsewhere?

### Email 4 — Day 18 (workshop invite — first time it's offered)
Subject: `mapping the onboarding workflow together`

> Hi {first name},
>
> If it's useful, we run a working session on your onboarding workflow. You bring the current process, we map where an agent assists, where your analysts decide, and the baseline you would measure. Output is a one-page workflow blueprint, not a pitch deck.
>
> Would you plus someone from risk or technology join? We'll fit your calendar.
>
> Regards,
> Nikhil

### LinkedIn 4 — Day 24
> {first name}, worth a 20-minute conversation on onboarding evidence? If it's not your remit, glad to be pointed to whoever owns it.

### Email 5 — Day 28 (clean close, no link)
Subject: `closing the loop`

> Hi {first name},
>
> Last note from me. Is onboarding evidence simply not a priority right now, or owned by another team? Either answer helps, and the door stays open.
>
> Regards,
> Nikhil

---

## 3. How the message changes by buyer (same cadence, different substance)

| Buyer | Email 1 focus | Email 3 asset |
|---|---|---|
| **Workflow/Ops** (KYC, claims, ops lead) | queue, evidence-gathering problem they own | use-case brief |
| **Risk/Compliance** (CRO, CCO, MLRO) | proving what the AI accessed, recommended, escalated | AICP whitepaper (controls) |
| **Tech/Data/AI** (CIO, CDAO) | a workflow that needs integration + production owner | AICP whitepaper (reusable layer) |
| **Engineering** (VP Eng — only if AI-delivery signals) | release evidence / delivery bottleneck | AI-DLC brief |

Example — **Risk/compliance Email 1:**
> Hi {first name},
>
> {verified signal}. As AI reaches commercial onboarding, the harder question becomes provable: what was accessed, what was recommended, what escalated.
>
> We tie access, approvals, evidence and audit to that one workflow, not a generic layer, so your compliance team can show its work from day one. Would a production-control review of your onboarding evidence be useful?
>
> Regards,
> Nikhil

---

## 4. Cadence (per segment)

| Segment | Length | Touches |
|---|---|---|
| **Enterprise** (2,000+ emp US / 1,000+ UAE / 1,500+ AU) | 28 days | 5 emails + 4 LinkedIn |
| **Mid-market** (300–1,999 US / 200–999 UAE / 250–1,499 AU) | 20 days | 4 emails + 3 LinkedIn |

Every email, LinkedIn note, and DM above uses **one** workflow per account and names the human who decides. No product pitch in connection requests. Workshop is offered only at Email 4 (enterprise) or Email 3 (mid-market) — never up front.

---

## 5. Who is the ICP and who does the email go to?

### 5.1 Who is the email sent to / who is the ICP within the company?

The email goes to **named roles inside the target account**, mapped across the buying committee. There is no single "ICP" — it's a committee of roles per account. For any given account, emails go to the specific owner of the assigned workflow plus their approvers.

### 5.2 How many ICPs per segment?

This is a count of **contacts per account** (the buying committee depth), not a fixed number of "ICP types":

| Segment | # contacts per account | Who |
|---|---|---|
| **Mid-market** | 2 | 1 workflow/ops sponsor + 1 tech/risk approver |
| **Enterprise** | 3–4 | multi-threaded across routes (workflow/ops + risk + tech, + engineering if AI-DLC signal) |

### 5.3 The email outreach for each ICP (route)

The cadence stays the same; the substance changes by route. Each route has its own Email 1 angle, Email 2 focus, Email 3 asset, and Email 4/5 CTA (per playbook §7). The four route-specific Email 1s:

**ICP 1 — Workflow/Ops owner** (landing sponsor: Head of KYC/Onboarding, Claims Ops, etc.)
> Hi {first name},
>
> {verified signal}. Teams handling {workflow} lose days to evidence scattered across systems, especially when ownership is unclear and approvals wait on it.
>
> We build governed agents that pull approved evidence together, prepare the file, and stop there. Your {role} keep the final call. Would it be useful to compare how {company} handles this today?
>
> Regards,
> Nikhil

**ICP 2 — Risk/Compliance** (gatekeeper: CRO, CCO, MLRO, Head of FinCrime)
> Hi {first name},
>
> {verified signal}. As AI reaches {workflow}, the harder question becomes provable: what was accessed, what was recommended, what escalated.
>
> We tie access, approvals, evidence and audit to that one workflow, not a generic layer, so your compliance team can show its work. Would a production-control review be useful?
>
> Regards,
> Nikhil

**ICP 3 — Tech/Data/AI** (scaler: CIO, CTO, CDAO)
> Hi {first name},
>
> {verified signal}. {Workflow} is exactly where pilots stall. Integration, controls and an accountable production owner are missing, not model quality.
>
> We start with one high-value workflow, production-controlled, on your existing cloud. Open to comparing how {company} runs it today?
>
> Regards,
> Nikhil

**ICP 4 — Engineering** (AI-DLC, only on signal: VP Eng, Platform)
> Hi {first name},
>
> {verified signal}. AI-assisted delivery is moving faster than release evidence, testing gates and change control can absorb.
>
> We govern build, test and release for AI-assisted software, with evidence attached to every change. Worth a look at how {company} gates releases today?
>
> Regards,
> Nikhil

---

## 6. Decisions I need from you

1. **Voice** — Does the tone feel right for a regulated-bank buyer? Too casual / too formal?
2. **Workshop timing** — OK that the workshop is only offered at Email 4 (enterprise)? Or do you want it earlier/later?
3. **Sign-off** — Anything you'd reword in the flagship sequence above?
4. **Asset gaps** — We reference a workflow blog, use-case brief, AICP whitepaper, AI-DLC brief, and workshop page. Which of these exist today, and which need writing?

---

*Nothing above has been sent. All campaigns remain paused pending your review.*
