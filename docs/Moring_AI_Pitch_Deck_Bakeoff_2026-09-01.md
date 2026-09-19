# Moring AI — One-Page Pitch Deck + Bake-Off Evidence PDF (Master Copy)

**Date:** 2026-09-01. Two buyer versions (Mid-Market + Enterprise) + the technical bake-off evidence pack. This is the copy for the one-pager/PDF; format in Webflow/Canva/Slides.

---

# VERSION A — MID-MARKET ONE-PAGER (500–5,000 employees)

**Headline:**
> **Your AI is stuck at the demo. Moring gets governed AI to production — in weeks, not years.**

**The problem (1 line each):**
- Gartner: **>40% of agentic AI projects will be canceled by 2027** (cost, unclear value, weak risk controls).
- 74% of enterprises have rolled back a live AI agent (Sinch). Only 15% have scaled multi-agent AI (Deloitte).
- You can't hire the AI talent; the DIY pilot dies at the security review.

**What Moring delivers:**
- **Governed Business Workflow Agents** — claims preparation, KYC/onboarding evidence, prior-auth routing, payment exceptions. We deliver the agents; your team keeps the decision.
- **One governed substrate (Moring AICP)** — policy, access, audit, cost — in YOUR cloud, never hosted.
- **Forward-deployed engineers** embedded with your SMEs.

**The Moring difference (3 bullets):**
1. **Outcome-priced** — baseline first, verify, bill. Fee only triggers if the outcome ships.
2. **You own everything** — in your cloud, source + runbooks + evals handed over. No lock-in.
3. **Regulator-ready** — SR 26-2, NAIC, HIPAA, SOC 2 evidence. Your CISO approves, not blocks.

**The offer:**
> Start with a 30-minute **AI Discovery Workshop** → baseline metric + architecture sketch + yes/no on outcome pricing. Then a **paid creditable POC** (fully creditable toward the contract).

**Proof:**
- 99.9% uptime · <200ms latency · ~40% cost savings · 14 days to live · Forrester: "oversight must live outside the agent's execution loop."
- ~$200K entry, ~$400K land-and-expand.

**CTA:** Book the workshop.

---

# VERSION B — ENTERPRISE ONE-PAGER (5,000+ employees / $25B+ assets)

**Headline:**
> **A governed control plane for your AI estate — delivered in your cloud, with the evidence your regulators demand.**

**The problem (enterprise framing):**
- Gartner: by 2027, **40% of enterprises will demote or decommission autonomous agents** due to governance gaps found after production incidents.
- Uniform governance fails (Gartner) — you need proportional, autonomy-tiered control.
- SR 26-2 (Apr 2026) supersedes SR 11-7; an AI RFI is coming. NAIC + EU AI Act (Aug 2 2026) are live for insurance.

**What Moring delivers:**
- **AICP — the governed substrate** in your cloud (AWS Bedrock-native, IAM-aware, EKS, PrivateLink, in-VPC, zero exfiltration).
- **Governed Business Workflow Agents** for claims, KYC, prior-auth, payments, AI-DLC, AI Ops — delivered by forward-deployed engineers.
- **Audit lake with trace-ID forensics** — replayable runs, per-action approval, context-sensitive authorization (OPA/Cedar), SOC 2/ISO 27001/HIPAA.

**The Moring difference (enterprise):**
1. **Outcome-priced** — the fee only triggers on a measured, shipped outcome.
2. **No lock-in** — you own source, runbooks, evals, decision logs at handoff.
3. **Regulated-depth + compliance mapping** — SR 26-2, NAIC, HIPAA, FFIEC, SOC 2 — not a generic platform.
4. **AWS co-sell + Marketplace fast-lane** — procurement rides existing agreements.

**The offer:**
> **Paid creditable POC** on one named workflow → **AICP platform in your cloud (14 days)** → **first solution in production (Month 9)** → **expand on the same substrate.**

**Proof:** 99.9% SLA · <200ms · ~40% cost · Forrester five control-plane capabilities, all delivered · land ~$350-400K, expand to $750K-1M.

**CTA:** Request an AI Discovery Workshop / Enterprise architecture review.

---

# VERSION C — THE BAKE-OFF EVIDENCE PACK (for the 48-hour evaluation)

**Purpose:** buyers (r/AI_Agents) run 48-hr evals on approval gates + RBAC + revoke-mid-run + audit-log query. This PDF is the pass-the-test evidence.

**Section 1 — What the bake-off tests (and Moring passes):**
| Test | Moring capability | How we prove it |
|---|---|---|
| 2 approval gates on a real workflow | Per-action approval + HITL | Live demo on claims/KYC workflow |
| Enforce RBAC + revoke an approver mid-run | Policy at the substrate (OPA/Cedar) | Live revoke + audit log shows the change |
| Query audit log for who/what/when | Trace-ID audit lake | <1-min retrieval, replayable |
| Replay a run step-by-step | Replayable runs / decision provenance | Full step trace |
| Cost per agent/team/PR | Cost observability | Live dashboard |
| Rollback a bad agent action | Rollback paths | Live rollback |

**Section 2 — The architecture (technical evidence):**
- **Policy at the substrate (OPA/Cedar)** — not prompt-guardrails. Context-sensitive authorization at the tool-invocation boundary.
- **Identity propagation** — agent acts "as" the user; subject passed through every tool call.
- **MCP scoping + agent registry + kill switch** — per-endpoint credential scoping, inventory, real-time shutdown.
- **Audit lake with trace-ID forensics** — every action trace-keyed, replayable, retrievable <1 min. SR 26-2/NAIC/HIPAA/SOC 2 mapped.
- **Zero data exfiltration, in-VPC, K8s-native, Bedrock-native, AWS Marketplace** (once listed).
- **Cost observability** — per-team/per-agent/per-PR attribution.

**Section 3 — The why-us vs the alternatives (the bake-off decision):**
| Vendor | What it is | The gap |
|---|---|---|
| ServiceNow AI Control Tower | Bundled enterprise control plane | Walled garden, your estate in their world |
| Microsoft A365 | Identity-first control plane | Assistant-centric, consumption tax, no regulated depth |
| IBM watsonx | Analyst-validated governance platform | Steep learning curve, heavy stack, policy not delivery |
| Guild.ai | Independent runtime-native control plane | Engineering estates, not regulated business workflows; no outcome pricing |
| Credo AI | Policy/compliance program | Watches; doesn't deliver agents |
| **Moring** | **Governed control plane for regulated business workflows — delivered, outcome-priced, in your cloud** | **The only one with all three: regulated workflow + delivered agents + outcome pricing** |

**Section 4 — The offer after the bake-off:**
> "We'll run the 48-hour bake-off on ONE of your real workflows. If it passes on approval gates, RBAC, audit forensics, and rollback — you decide the next step on a paid creditable POC. Our fee only triggers on a shipped, measured outcome."

**Footer on all versions:** AI outcomes, delivered. Governed AI for the workflows you actually run. · moring.ai · Nikhil Devlapur, VP Sales