# BFSI Account Templates — Rendered for Real Accounts

Drafted from `Moring_AI_Enrichment_Tracker.csv` (ENRICHED accounts) using the BFSI playbook cadence (Enterprise = 5 email + 4 LinkedIn / 28d). Each account multi-threaded across ICP routes. All emails open with a placeholder `{signal}` — **must be filled with a verified, dated, company-specific signal before send** (Lead Gen supplies it). No links in Email 1. Sign "Regards, Nikhil".

STATUS: DRAFT — awaiting approval. Nothing has been sent.

---

## 1. M&T Bank — Commercial Onboarding & KYC Evidence (Enterprise, US)

Contacts mapped (Risk-led account; KYC ops owner not in tracker, so we thread risk + tech):
- DM1 Neeraj Singh, Chief Risk Officer → **Risk route**
- DM2 Andrew Foster, Chief Data Officer → **Tech route**
- DM3 Brian Borawski, SVP Deputy BSA Officer / AML Head Digital Assets → **Risk/FinCrime route**
- DM4 Brady Green, Chief Technology Officer → **Tech route**

### E1 — Day 1 — to Neeraj Singh (Risk route) — no link
Subject: `kyc evidence at M&T Bank`
> Hi Neeraj,
>
> {signal}. As AI reaches commercial onboarding and KYC evidence, the harder question becomes provable: what was accessed, what was recommended, what escalated.
>
> We tie access, approvals, evidence and audit to that one workflow, not a generic layer, so your compliance and risk teams can show their work from day one. Would a production-control review of your onboarding evidence be useful?
>
> Regards,
> Nikhil

### LI1 — Day 3 — connect (≤300c, no pitch)
> Hi Neeraj, comparing how BFSI teams handle KYC evidence as AI moves into regulated production. Open to connecting?

### E2 — Day 5 — to Neeraj (first link allowed) — risk angle
Subject: `the quiet cost inside kyc evidence`
> Hi Neeraj,
>
> The real cost in onboarding evidence rarely shows up as one big line item. It compounds: analysts rechecking the same documents across systems, cases parked on ownership questions, turnaround stretching while the queue ages.
>
> Wrote up why this pattern persists and what changes when evidence assembly is bounded: {blog link}
>
> Does that track with what your risk and ops teams see?
>
> Regards,
> Nikhil

### LI2 — Day 8 — post-accept
> Thanks for connecting, Neeraj. Quick one. How does M&T handle onboarding evidence today, mostly manual checks across systems, or partly automated already?

### E3 — Day 11 — to Neeraj (risk asset)
Subject: `how the kyc evidence agent stays controlled`
> Hi Neeraj,
>
> Concretely: the agent gathers evidence from approved sources, assembles the onboarding file, flags missing or conflicting documents, and prepares a recommendation. Then it stops. Your KYC analysts review and decide, with every access and approval recorded.
>
> The whitepaper covers the control side: approved data and tools, human decisions, monitoring, audit trail, deployed in your cloud. {AICP link}
>
> Worth walking your risk and ops teams through it?
>
> Regards,
> Nikhil

### LI3 — Day 15 — observation + routing
> One pattern we keep seeing in KYC onboarding: the bottleneck is rarely analysis. It's evidence assembly and handoffs between teams. Is this yours to solve at M&T, or does it sit with onboarding operations?

### E4 — Day 18 — workshop invite
Subject: `mapping the onboarding workflow together`
> Hi Neeraj,
>
> If it's useful, we run a working session on your onboarding workflow. You bring the current process, we map where an agent assists, where your analysts decide, and the baseline you would measure. Output is a one-page workflow blueprint, not a pitch deck.
>
> Would you plus someone from onboarding or technology join? We'll fit your calendar.
>
> Regards,
> Nikhil

### LI4 — Day 24
> Neeraj, worth a 20-minute conversation on KYC evidence? If it's not your remit, glad to be pointed to whoever owns it.

### E5 — Day 28 — clean close
Subject: `closing the loop`
> Hi Neeraj,
>
> Last note from me. Is onboarding evidence simply not a priority right now, or owned by another team? Either answer helps, and the door stays open.
>
> Regards,
> Nikhil

### E1 variants for the other M&T DMs (thread them after E1 to Neeraj)

**E1 to Andrew Foster (CDO, Tech route):**
Subject: `kyc evidence at M&T Bank`
> Hi Andrew,
>
> {signal}. Commercial onboarding is exactly where pilots stall. Integration, controls and an accountable production owner are missing, not model quality.
>
> We start with one high-value workflow, production-controlled, on your existing cloud. Open to comparing how M&T runs onboarding today?
>
> Regards,
> Nikhil

**E1 to Brian Borawski (SVP AML, FinCrime route):**
Subject: `aml evidence at M&T Bank`
> Hi Brian,
>
> {signal}. Investigators assembling alerts, transactions and entity evidence manually lose time to evidence that sits across systems.
>
> We build governed agents that gather approved evidence, prepare the case file and stop — your investigators keep the final decision, with everything recorded. Would a production-control review of an AML workflow be useful?
>
> Regards,
> Nikhil

**E1 to Brady Green (CTO, Tech route):**
Subject: `kyc evidence at M&T Bank`
> Hi Brady,
>
> {signal}. KYC evidence is exactly where pilots stall. Integration, controls and an accountable production owner are missing, not model quality.
>
> We start with one high-value workflow, production-controlled, on your existing cloud. Open to comparing how M&T runs it today?
>
> Regards,
> Nikhil

---

## 2. Chubb — Claims Evidence & Exception Resolution (Enterprise, US)

Contacts mapped (ops-led account):
- DM1 Omkar Dash, Global Head of AI → **Tech route**
- DM2 John Keogh, President & COO → **Workflow/Ops route (landing sponsor)**
- DM3 Rakshit Kapoor, Global Chief Data Officer → **Tech route**
- DM4 Eduard Fabian, CIO Commercial Insurance → **Tech route**

### E1 — Day 1 — to John Keogh (Workflow/Ops route) — no link
Subject: `claims evidence at Chubb`
> Hi John,
>
> {signal}. Teams handling claims evidence and exceptions lose days to missing documents and complex-case routing, especially when evidence is scattered across systems.
>
> We build governed agents that gather approved evidence, prepare the claim file and stop there. Your claims adjusters keep the final call. Would it be useful to compare how Chubb handles this today?
>
> Regards,
> Nikhil

### LI1 — Day 3 — connect
> Hi John, comparing how insurance teams handle claims evidence as AI moves into regulated production. Open to connecting?

### E2 — Day 5 — to John
Subject: `the quiet cost inside claims evidence`
> Hi John,
>
> Most of the time in claims goes to chasing documents and routing complex cases, not to judgement. That shows up as cycle time and leakage, and it doesn't shrink with headcount.
>
> Wrote up why, and what changes when evidence assembly is bounded: {blog link}
>
> Does that match what your claims teams see?
>
> Regards,
> Nikhil

### LI2 — Day 8 — post-accept
> Thanks for connecting, John. Quick one. How does Chubb handle claims evidence today, mostly manual checks across systems, or partly automated already?

### E3 — Day 11 — to John (ops asset)
Subject: `how the claims evidence agent actually works`
> Hi John,
>
> Concretely: the agent gathers evidence from approved sources, assembles the claim file, flags missing or conflicting documents, and prepares a recommendation. Then it stops. Your claims adjusters review and decide, with every access and approval recorded.
>
> Here's a two-page brief on the flow, with modeled versus measured outcomes labeled: {use-case brief}
>
> Worth walking your claims team through it?
>
> Regards,
> Nikhil

### LI3 — Day 15
> One pattern we keep seeing in claims: the bottleneck is rarely analysis. It's evidence assembly and handoffs between teams. Is this yours to solve at Chubb, or does it sit with claims ops?

### E4 — Day 18 — workshop invite
Subject: `mapping the claims workflow together`
> Hi John,
>
> If it's useful, we run a working session on your claims workflow. You bring the current process, we map where an agent assists, where your adjusters decide, and the baseline you would measure. Output is a one-page workflow blueprint, not a pitch deck.
>
> Would you plus someone from risk or technology join? We'll fit your calendar.
>
> Regards,
> Nikhil

### LI4 — Day 24
> John, worth a 20-minute conversation on claims evidence? If it's not your remit, glad to be pointed to whoever owns it.

### E5 — Day 28
Subject: `closing the loop`
> Hi John,
>
> Last note from me. Is claims evidence simply not a priority right now, or owned by another team? Either answer helps, and the door stays open.
>
> Regards,
> Nikhil

### E1 variants for the other Chubb DMs

**E1 to Omkar Dash (Global Head of AI, Tech route):**
Subject: `claims evidence at Chubb`
> Hi Omkar,
>
> {signal}. Claims evidence is exactly where AI pilots stall. Integration, controls and an accountable production owner are missing, not model quality.
>
> We start with one high-value workflow, production-controlled, on your existing cloud. Open to comparing how Chubb runs it today?
>
> Regards,
> Nikhil

**E1 to Rakshit Kapoor (Global CDO, Tech route):**
Subject: `claims evidence at Chubb`
> Hi Rakshit,
>
> {signal}. Claims evidence is where pilots stall. Integration, controls and an accountable production owner are missing, not model quality.
>
> We start with one high-value workflow, production-controlled, on your existing cloud. Open to comparing how Chubb runs it today?
>
> Regards,
> Nikhil

**E1 to Eduard Fabian (CIO Commercial, Tech route):**
Subject: `claims evidence at Chubb`
> Hi Eduard,
>
> {signal}. Commercial claims evidence is exactly where pilots stall. Integration, controls and an accountable production owner are missing, not model quality.
>
> We start with one high-value workflow, production-controlled, on your existing cloud. Open to comparing how Chubb runs it today?
>
> Regards,
> Nikhil

---

## 3. Travelers — Claims Evidence & Exception Resolution (Enterprise, US)

Contacts mapped (ops-led account):
- DM1 Erik Roen, SVP & CIO Claim → **Workflow/Ops route (landing sponsor)**
- DM4 Niamh Gaudin, Chief Risk Officer → **Risk route**
(DM2 email PENDING — use LinkedIn only; DM3 Andreas Wetterwald, CIO Digital Enablement → Tech route)

### E1 — Day 1 — to Erik Roen (Workflow/Ops route) — no link
Subject: `claims evidence at Travelers`
> Hi Erik,
>
> {signal}. Teams handling claims evidence and exceptions lose days to missing documents and complex-case routing, especially when evidence is scattered across systems.
>
> We build governed agents that gather approved evidence, prepare the claim file and stop there. Your claims adjusters keep the final call. Would it be useful to compare how Travelers handles this today?
>
> Regards,
> Nikhil

### LI1 — Day 3 — connect
> Hi Erik, comparing how insurance teams handle claims evidence as AI moves into regulated production. Open to connecting?

### E2 — Day 5 — to Erik
Subject: `the quiet cost inside claims evidence`
> Hi Erik,
>
> Most of the time in claims goes to chasing documents and routing complex cases, not to judgement. That shows up as cycle time and leakage, and it doesn't shrink with headcount.
>
> Wrote up why, and what changes when evidence assembly is bounded: {blog link}
>
> Does that match what your claims teams see?
>
> Regards,
> Nikhil

### LI2 — Day 8 — post-accept
> Thanks for connecting, Erik. Quick one. How does Travelers handle claims evidence today, mostly manual checks across systems, or partly automated already?

### E3 — Day 11 — to Erik (ops asset)
Subject: `how the claims evidence agent actually works`
> Hi Erik,
>
> Concretely: the agent gathers evidence from approved sources, assembles the claim file, flags missing or conflicting documents, and prepares a recommendation. Then it stops. Your claims adjusters review and decide, with every access and approval recorded.
>
> Here's a two-page brief on the flow, with modeled versus measured outcomes labeled: {use-case brief}
>
> Worth walking your claims team through it?
>
> Regards,
> Nikhil

### LI3 — Day 15
> One pattern we keep seeing in claims: the bottleneck is rarely analysis. It's evidence assembly and handoffs between teams. Is this yours to solve at Travelers, or does it sit with claims ops?

### E4 — Day 18 — workshop invite
Subject: `mapping the claims workflow together`
> Hi Erik,
>
> If it's useful, we run a working session on your claims workflow. You bring the current process, we map where an agent assists, where your adjusters decide, and the baseline you would measure. Output is a one-page workflow blueprint, not a pitch deck.
>
> Would you plus someone from risk or technology join? We'll fit your calendar.
>
> Regards,
> Nikhil

### LI4 — Day 24
> Erik, worth a 20-minute conversation on claims evidence? If it's not your remit, glad to be pointed to whoever owns it.

### E5 — Day 28
Subject: `closing the loop`
> Hi Erik,
>
> Last note from me. Is claims evidence simply not a priority right now, or owned by another team? Either answer helps, and the door stays open.
>
> Regards,
> Nikhil

### E1 variants for the other Travelers DMs

**E1 to Niamh Gaudin (CRO, Risk route):**
Subject: `claims evidence at Travelers`
> Hi Niamh,
>
> {signal}. As AI reaches claims evidence, the harder question becomes provable: what was accessed, what was recommended, what escalated.
>
> We tie access, approvals, evidence and audit to that one workflow, not a generic layer, so your risk team can show its work. Would a production-control review of your claims workflow be useful?
>
> Regards,
> Nikhil

**E1 to Andreas Wetterwald (CIO Digital Enablement, Tech route; email pending — LinkedIn only):**
Subject: `claims evidence at Travelers`
> Hi Andreas,
>
> {signal}. Claims evidence is exactly where pilots stall. Integration, controls and an accountable production owner are missing, not model quality.
>
> We start with one high-value workflow, production-controlled, on your existing cloud. Open to comparing how Travelers runs it today?
>
> Regards,
> Nikhil

---

## 4. KeyBank — KYC / Financial-Crime Evidence (Enterprise, US)

Contacts mapped (risk/control-led account):
- DM1 Mo Ramani, Chief Risk Officer → **Risk route**
- DM2 Sal Maiorana, Chief Compliance Officer → **Risk route**
- DM3 Nick Schappacher, Chief Information Security Officer → **Control route**
- DM4 Mike Onders, EVP Divisional CIO / Head of AI Engineering → **Tech route**

### E1 — Day 1 — to Mo Ramani (Risk route) — no link
Subject: `kyc evidence at KeyBank`
> Hi Mo,
>
> {signal}. As AI reaches commercial onboarding and KYC evidence, the harder question becomes provable: what was accessed, what was recommended, what escalated.
>
> We tie access, approvals, evidence and audit to that one workflow, not a generic layer, so your compliance and risk teams can show their work from day one. Would a production-control review of your onboarding evidence be useful?
>
> Regards,
> Nikhil

### LI1 — Day 3 — connect
> Hi Mo, comparing how BFSI teams handle KYC evidence as AI moves into regulated production. Open to connecting?

### E2 — Day 5 — to Mo (risk angle)
Subject: `the quiet cost inside kyc evidence`
> Hi Mo,
>
> The real cost in onboarding evidence rarely shows up as one big line item. It compounds: analysts rechecking the same documents across systems, cases parked on ownership questions, turnaround stretching while the queue ages.
>
> Wrote up why this pattern persists and what changes when evidence assembly is bounded: {blog link}
>
> Does that track with what your risk and ops teams see?
>
> Regards,
> Nikhil

### LI2 — Day 8 — post-accept
> Thanks for connecting, Mo. Quick one. How does KeyBank handle onboarding evidence today, mostly manual checks across systems, or partly automated already?

### E3 — Day 11 — to Mo (risk asset)
Subject: `how the kyc evidence agent stays controlled`
> Hi Mo,
>
> Concretely: the agent gathers evidence from approved sources, assembles the onboarding file, flags missing or conflicting documents, and prepares a recommendation. Then it stops. Your KYC analysts review and decide, with every access and approval recorded.
>
> The whitepaper covers the control side: approved data and tools, human decisions, monitoring, audit trail, deployed in your cloud. {AICP link}
>
> Worth walking your risk and ops teams through it?
>
> Regards,
> Nikhil

### LI3 — Day 15
> One pattern we keep seeing in KYC onboarding: the bottleneck is rarely analysis. It's evidence assembly and handoffs between teams. Is this yours to solve at KeyBank, or does it sit with onboarding operations?

### E4 — Day 18 — workshop invite
Subject: `mapping the onboarding workflow together`
> Hi Mo,
>
> If it's useful, we run a working session on your onboarding workflow. You bring the current process, we map where an agent assists, where your analysts decide, and the baseline you would measure. Output is a one-page workflow blueprint, not a pitch deck.
>
> Would you plus someone from onboarding or technology join? We'll fit your calendar.
>
> Regards,
> Nikhil

### LI4 — Day 24
> Mo, worth a 20-minute conversation on KYC evidence? If it's not your remit, glad to be pointed to whoever owns it.

### E5 — Day 28
Subject: `closing the loop`
> Hi Mo,
>
> Last note from me. Is onboarding evidence simply not a priority right now, or owned by another team? Either answer helps, and the door stays open.
>
> Regards,
> Nikhil

### E1 variants for the other KeyBank DMs

**E1 to Sal Maiorana (CCO, Risk route):**
Subject: `kyc evidence at KeyBank`
> Hi Sal,
>
> {signal}. As AI reaches KYC and onboarding evidence, the harder question becomes provable: what was accessed, what was recommended, what escalated.
>
> We tie access, approvals, evidence and audit to that one workflow, not a generic layer, so your compliance team can show its work from day one. Would a production-control review of your onboarding evidence be useful?
>
> Regards,
> Nikhil

**E1 to Nick Schappacher (CISO, Control route):**
Subject: `kyc evidence at KeyBank`
> Hi Nick,
>
> {signal}. As AI reaches KYC evidence, the hard part is keeping access, policy and audit on that workflow from day one, not bolting it on later.
>
> We bind identity, permissions, evidence and auditability to that one workflow so it's safe in production. Open to a production-control review of an onboarding workflow?
>
> Regards,
> Nikhil

**E1 to Mike Onders (EVP CIO / Head of AI Engineering, Tech route):**
Subject: `kyc evidence at KeyBank`
> Hi Mike,
>
> {signal}. KYC evidence is exactly where pilots stall. Integration, controls and an accountable production owner are missing, not model quality.
>
> We start with one high-value workflow, production-controlled, on your existing cloud. Open to comparing how KeyBank runs it today?
>
> Regards,
> Nikhil

---

## Handoff notes

- **E1 for every DM needs a verified {signal}** before send — not yet present. Lead Gen must attach the dated, company-specific signal (hiring, exam/RFI pressure, transformation programme, new product).
- **Assets referenced** ({blog link}, {AICP link}, {use-case brief}) must exist and be workflow-specific before Email 2/3 go out.
- **Travelers DM2 (Kevin De Sa) email PENDING** → LinkedIn-only; **Andreas Wetterwald email PENDING** → LinkedIn-only. Email the others.
- Cadence: day-based enterprise sequence, all 5 emails + 4 LinkedIn per account; multi-threaded across the mapped routes.
- Nothing has been sent. All sequences remain DRAFT pending approval + signal + asset completion.
