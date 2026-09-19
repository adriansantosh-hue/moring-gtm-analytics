# Moring Vertical Outbound Playbook — Banking, Financial Institutions & Insurance

> **STATUS: ACTIVE EXECUTION LAYER** for the workflow-led strategy (`Moring_AI_GTM_Strategy_Workflow_Led.md`).
> Scope: US, UAE, Australia · Enterprise + mid-market. Contains vertical-specific account selection, workflow campaigns, ICP routes, email/LinkedIn cadence, and content placement. Master strategy owns company-level positioning, qualification principles, measurement.

---

## 1. How the previous campaigns change

The previous structure asked prospects to understand moring product categories before they had a reason to care. The new structure starts with a workflow they already own. Product layers appear only after the workflow problem is established.

| Previous campaign | What remains useful | New role in outbound |
|---|---|---|
| AICP | Strong for CIO, CISO, risk, architecture, warm champion-led conversations | Supporting narrative inside every workflow campaign. Lead only when a known champion already recognizes the governance problem |
| AI-DLC | Strong for CTO, CIO, VP Engineering, platform teams building AI-enabled software | Specialist campaign route triggered by engineering hiring, AI release bottlenecks or software-delivery transformation |
| Agentic Solutions | Closest to how operating leaders describe demand | **Primary motion, renamed and packaged as Business Workflow Agents** |

## 2. Account universe and selection data

### Priority account types

| Vertical | Priority account types | Important operating metric |
|---|---|---|
| Banking & FI | Commercial/regional banks; retail banks; credit unions/mutuals; asset & wealth managers; custodians; payments & lending platforms | Total assets, AUM, transaction volume, loan book, branches, customer base, regulated entities |
| Insurance | P&C/general; life & annuity; health; reinsurers; specialty carriers; MGAs/brokers/TPAs with meaningful scale | GWP, claims volume, policies in force, lines of business, distribution model, regulated entities |

**Selection principle:** size is necessary but not sufficient. An account enters outbound only when scale + workflow fit + timing + buyer accessibility are all present.

### Segment thresholds (OR rule, then human review)

| Market | Enterprise start | Mid-market start |
|---|---|---|
| **US** | 2,000+ employees OR $1B+ revenue OR $25B+ assets/AUM OR $1B+ premium | 300–1,999 emp OR $100–999M rev OR $2–24.9B assets/AUM OR $100–999M premium |
| **UAE** | 1,000+ emp OR $500M+ rev OR $10B+ assets/AUM OR $500M+ premium | 200–999 emp OR $50–499M rev OR $1–9.9B assets/AUM OR $50–499M premium |
| **Australia** | 1,500+ emp OR $750M+ rev OR $15B+ assets/AUM OR $750M+ premium | 250–1,499 emp OR $75–749M rev OR $1.5–14.9B assets/AUM OR $75–749M premium |

Vertical metrics (assets/AUM/premium) override headcount when they better represent complexity. Recalibrate after first 100 reviewed accounts per market.

### Mandatory company fields

| Field group | Fields |
|---|---|
| Identity/geography | name, domain, HQ, operating countries, regulated entities, parent, ownership type |
| Industry/subsegment | bank/lender/payments/asset mgr/custodian/insurer/reinsurer/broker/MGA/TPA, lines of business |
| Scale | employees, revenue, assets, AUM, GWP, branches, customers, policies, claims/transaction volume |
| Workflow fit | current workflow, process owner, queue/exception type, likely systems, manual steps, measurable KPI |
| Tech/AI maturity | cloud, data platforms, AI stack, automation, public AI initiatives, pilots, production deployments |
| Risk/regulatory exposure | sensitive data, customer decisions, approval requirements, audit obligations, jurisdictions |
| Timing signals | leadership change, transformation program, new product/region, regulatory deadline, tech change, hiring, vendor review, content engagement |
| Relationship/routing | account owner, partner path, prior meetings, active opp, customer history, mutual connections, suppression status |
| Data quality | source URL, source date, confidence, last verified, unresolved conflicts |

## 3. Workflow priorities by market

Account research must confirm the workflow before outreach. Never send a generic agent story.

| Market | Banking & FI | Insurance |
|---|---|---|
| **US** | Commercial onboarding/KYC evidence; AML & financial-crime investigations; lending exceptions; investment-data reconciliation (asset/wealth/custody); payment disputes & fraud | Claims evidence & exception resolution; underwriting evidence; policy-servicing exceptions; SIU investigations; health prior-auth where relevant |
| **UAE** | Commercial onboarding/KYC; sanctions & AML review; trade-finance document evidence; credit exceptions; payment disputes & fraud | Motor & health claims; underwriting evidence; policy servicing; claims-integrity/fraud investigations; regulatory evidence prep |
| **AU** | Onboarding/KYC; financial-crime investigation; lending exceptions; hardship & complaints evidence; investment/super operations reconciliation | Claims evidence & exception resolution; underwriting; policy servicing; claims-integrity investigations; complaints & regulatory evidence |

### Recommended starting wedge

| Market | Banking/FI wedge | Insurance wedge |
|---|---|---|
| US | Commercial onboarding & KYC (investment-data reconciliation as specialist branch for asset managers/custodians) | Claims evidence & exception resolution |
| UAE | Commercial onboarding, KYC & sanctions evidence | Motor or health claims evidence (by carrier mix) |
| AU | Financial-crime investigation OR lending exceptions (by account type) | Claims evidence & complaints resolution |

## 4. Workflow campaigns (build these six)

| Campaign | Primary problem | Primary ICP | Supporting narrative |
|---|---|---|---|
| **Banking 1: Onboarding & KYC evidence** | Analysts chase evidence across sources, resolve ownership conflicts, wait for approval | Head of Client Onboarding, KYC Ops, CDD | AICP controls source access, sensitive data, approvals, decision record |
| **Banking 2: Financial-crime investigations** | Investigators assemble alerts/transactions/entities/policy evidence manually | Head of AML Ops, Financial Crime, Investigations | AICP constrains access/actions, records evidence, keeps final decisions accountable |
| **Banking 3: Operations exceptions** | Lending/payment/investment-data exceptions need repeated cross-system checks | Heads of Lending/Payments/Reconciliation/Investment Ops | AICP provides bounded tools, human approval, traceable recommendations |
| **Insurance 1: Claims evidence & exceptions** | Teams gather documents, find missing evidence, route complex cases manually | Chief Claims Officer, Head of Claims Ops/Transformation | AICP protects customer data; records evidence, recommendations, approvals |
| **Insurance 2: Underwriting evidence** | Underwriters collect risk evidence and reconcile inconsistent sources | CUO, Head of Underwriting Ops | AICP controls approved sources, decision support, escalation |
| **Insurance 3: Policy, complaints & fraud** | Servicing/complaints/SIU cases move across fragmented systems | Head of Policy Ops, Complaints, SIU, Claims Integrity | AICP: controlled access, routing, evidence, auditability |

## 5. ICP routes and pitch

| Route | Banking/FI titles | Insurance titles | They care about |
|---|---|---|---|
| 1. Workflow & operations | COO; Head of Ops; Client Onboarding; KYC Ops; Lending/Payments/Reconciliation/Investment Ops | COO; Chief Claims Officer; Claims Ops; CUO; Policy Ops; SIU/Complaints | Queue size, turnaround, manual effort, rework, service quality, ownership |
| 2. Risk/compliance/governance | CRO; CCO; MLRO; Head of FinCrime; Model Risk; Responsible AI | CRO; CCO; Claims Integrity; Privacy; Responsible AI; Internal Audit | Evidence, policy compliance, approval boundaries, traceability, sensitive data, audit readiness |
| 3. Technology/data/AI | CIO; CTO; CDAO; Head of AI; EA; AI Platform; Data Platform | CIO; CTO; CDAO; Head of AI; EA; Data & Integration | Integration, reusable controls, production ownership, security, scaling |
| 4. Engineering/software delivery | VP Eng; Platform Eng; App Dev; DevSecOps; AI Eng | VP Eng; Digital Eng; Platform Eng; DevSecOps | Build/test/release AI-enabled software without delivery bottlenecks |

### Executive ICP profiles

| Profile | Owns / when to target | Pitch |
|---|---|---|
| COO / Head of Ops | Service levels, cost, queues. Target when onboarding/claims/lending/reconciliation slow, manual, inconsistent | ONE Business Workflow Agent + baseline + expected outcome; human approval + AICP controls as part of production |
| CRO / CCO / Compliance | Policy, op risk, model risk, sensitive data, audit evidence. Target when AI use cases can't clear review or actions unexplainable | Governed workflow first; controlled access, decision boundaries, evidence, monitoring, audit via AICP |
| CIO | Enterprise tech strategy, integration, vendor fit, reuse. Target when pilots fragmented/duplicate infra | One high-value workflow first; then AICP as shared production control fitting existing systems/cloud |
| CTO / EA | Architecture standards, scalability. Target when agent designs hard to standardize into production | Workflow architecture, bounded tools, human decision points; AICP as reusable technical controls; AI-DLC only for software-delivery needs |
| CDAO / Head of AI | AI portfolio value, data access, evaluation, model governance. Target when pilots lack prioritization/owners | Named workflows with owners + outcomes; AICP governs deployment/evidence across portfolio |
| VP Eng / Platform | Throughput, DX, release quality. Target when AI-assisted delivery needs testing/gates/evidence | Specific software-delivery workflow; AI-DLC as method; AICP as access/policy/evidence control |

### Enterprise vs mid-market

| Dimension | Enterprise | Mid-market |
|---|---|---|
| Buying committee | Multi-thread ops/risk/tech/engineering | One operating sponsor + one tech or risk approver |
| Opening angle | Workflow scale, governance across teams, reusable pattern | Backlog, cost, turnaround; one workflow live without a big program |
| Proof needed | Architecture confidence, deployment model, controls, customer proof | Clear use case, time-to-value, effort, commercial clarity |
| Primary CTA | Tailored workflow discussion or workshop w/ business+tech+risk | Short discovery → targeted demo → scoped paid validation |
| Personalization depth | Research + role-specific message × 3–4 contacts | Research + role-specific message × 2 contacts |

## 6. Outbound cadence

### ENTERPRISE: 5 emails + 4 LinkedIn (28 days)

| Day | Ch | Communicate | Asset |
|---|---|---|---|
| 1 | E1 | Company-specific workflow observation, friction, one ownership/priority question | none |
| 3 | L1 | Connection request on workflow/remit. No pitch | none |
| 5 | E2 | Consequence of problem + useful POV | workflow blog link |
| 8 | L2 | After accept: short question how workflow handled today | none |
| 11 | E3 | Agent gathers evidence, prepares recommendation, accountable person stays in control | use-case brief (ops) / AICP whitepaper (risk-tech) / AI-DLC article (eng) |
| 15 | L3 | Observation or compact example; sits with them or another owner? | link only after engagement/permission |
| 18 | E4 | Invite buyer + stakeholders to workflow workshop or targeted demo; what session produces | workshop landing page |
| 24 | L4 | Short meeting request or polite redirect | none unless requested |
| 28 | E5 | Close loop: not a priority / belongs elsewhere? | none |

### MID-MARKET: 4 emails + 3 LinkedIn (20 days)

| Day | Ch | Communicate | Asset |
|---|---|---|---|
| 1 | E1 | Specific workflow problem, operating impact, relevance question | none |
| 3 | L1 | Connection tied to role + workflow | none |
| 5 | E2 | Cost/turnaround consequence; bounded agent reduces manual work | blog link |
| 8 | L2 | How is it handled; improvement planned? | none |
| 11 | E3 | Simple user flow, implementation boundary, measured outcome. Invite demo/workshop | use-case brief + workshop link; whitepaper only tech/risk |
| 16 | L3 | Meeting request or referral Q | none unless requested |
| 20 | E4 | Close loop: timing or owner wrong? | none |

## 7. Message substance by ICP (per touch)

### ICP 1: Workflow & operations
E1 queue/exception/evidence problem owned by their team (ent: scale across teams/jurisdictions · mid: backlog + fast first workflow) · E2 why manual evidence gathering creates delay/rework (+vertical blog) · E3 user flow: agent gathers approved evidence→prepares→stops for human (ent: +use-case brief, cross-functional control · mid: smallest deployable workflow + success metric) · E4 invite ops+tech+risk to define workflow & baseline (workshop link / targeted demo) · E5 priority-or-owner check (mid: omit, close E4). LinkedIn: connect on relevance→ask how handled→one observation→conversation.

### ICP 2: Risk/compliance/governance
E1 difficulty proving what an AI-assisted workflow accessed/recommended/escalated · E2 why governance-after-implementation slows production (+governance blog) · E3 AICP controls: approved data/tools, human decisions, evidence, monitoring, audit trail (+whitepaper) · E4 invite risk+business+tech to map one governed workflow · E5 routing Q (Responsible AI? compliance? model risk?) . LinkedIn: responsible-deployment angle→controls question→short discussion.

### ICP 3: Technology/data/AI
E1 named workflow needing integration+controls+accountable production ownership (ent: reuse across BUs without one framework · mid: one workflow live without building a platform) · E2 prototype→supportable production gap (+blog) · E3 AICP common access/approvals/evidence/monitoring/audit (+whitepaper/architecture overview) · E4 workflow+architecture workshop (or targeted demo mid) · E5 routing Q (AI platform? EA? workflow owner?). LinkedIn: production ownership→current pattern→example→call.

### ICP 4: Engineering/software delivery
E1 specific AI-enabled delivery bottleneck: requirements/testing/release evidence/change (ent: scale, standards, gates · mid: dev time, speed, no separate AI process) · E2 why normal SDLC needs extra AI evaluation/evidence/controls (+AI-DLC blog) · E3 AI-DLC as build/test/release/change method (+brief) · E4 invite eng+arch+risk to map one delivery workflow · E5 routing Q (platform eng? app dev? AI eng?). LinkedIn: engineering workflow→release process→discussion.

## 8. Asset placement

| Asset | Belongs in | Must contain | Don't use when |
|---|---|---|---|
| Workflow blog | E2; LinkedIn only after engagement | Buyer problem, why it persists, simple workflow pattern, practical implications | Generic, platform-first, or unrelated to named workflow |
| AICP whitepaper | E3 for risk/tech/governance buyers | Access, approvals, evidence, monitoring, auditability, customer-cloud deployment | Buyer is ops leader who hasn't accepted the workflow problem yet |
| AI-DLC article/brief | E2/E3 engineering buyers only | Requirements, evaluation, testing, release gates, evidence, change mgmt for AI-assisted software | No engineering-led AI delivery problem |
| Use-case brief/case study | E3 operations buyers | Problem, user flow, human decision, controls, measured/modeled outcome, evidence status | Result can't be sourced or clearly labeled |
| Workshop landing page | E4 enterprise; E3 mid-market | Who attends, workflow inputs, outputs, next steps | Used as FIRST cold CTA |

**Link rule:** No links/attachments in first cold email. None in LinkedIn connection request or first message. Later links only when directly supporting the discussed workflow.

---

*Execution notes for agents:* this cadence supersedes the generic ~14-touch ABM structure for BFSI. Campaign shells can be reused but copy must be rebuilt to workflow-first + asset-by-day placement. Six campaign builds map onto existing product-line lists after re-hypothesizing each account to ONE workflow.
