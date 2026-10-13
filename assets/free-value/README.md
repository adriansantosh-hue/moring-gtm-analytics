# Moring free-value assets (draft v0.1, 2026-10-03)

Plain files, no signup, no form. Each one backs a post in `docs/Moring_LinkedIn_X_Value_First_Copy_2026-10-03.md`. Status: DRAFT until the owner approves publishing. Licence is proposed (CC BY 4.0 for documents, Apache-2.0 for code): owner to confirm.

| File | What it is | Post |
|---|---|---|
| `control-plane-3-question-test.md` | 12 probes (Deny / Attribute / Replay) with pass signs and scoring | T1-P1 |
| `agent-readiness-36-checks.csv` | 36 checks across Identity, Policy, Egress, Trace, Caps, Kill switch | T1-P2 |
| `kyc-evidence-pack-template.md` | Evidence pack structure and a baseline method for onboarding review | T2-P1 |
| `agent-change-release-gate.md` | Fix rate vs routing accuracy, release checklist, working script | T2-P2, T8 |
| `mcp-governance-and-security-checklist.md` | Tokens, hosting, tool design, threats mapped to OWASP agentic IDs | T3-P1, T3-P2 |
| `ai-cost-attribution.md` | Per-call event, 30-day by-PR query, unattributed-spend query | T4-P1 |
| `five-layer-agent-stack-map.md` | Where governance sits in the agent stack | T4-P2 |
| `agent-audit-record.schema.json` | JSON Schema + example for one audit record per action | T5-P1 |
| `agent-action-gate.rego`, `agent-action-gate_test.rego` | Allow / requires-approval / deny policy with fail-closed defaults | T5-P2 |
| `sr-26-2-agentic-ai-scope-explainer.md` | What SR 26-2 says, what it does not, a 10-minute self-check | T6-P1 |
| `naic-ai-exam-readiness-checklist.md` | Per-claim file and program checklist from the NAIC bulletin | T6-P2 |
| `ai-governance-platform-questions.md` | 12 vendor-neutral questions with a scoring sheet | T6-P3 |
| `rag-version-pinning-eval-checklist.md` | Version-pinned corpus and pre-swap eval checklist | T7 |
| `build-vs-buy-control-plane-scorecard.csv` | Weighted scorecard across 8 dimensions | T9 |
| `agent-kill-switch-drill.md` | 5-step stop drill with pass signs and a score sheet | T1-P3 |
| `claims-triage-baseline-worksheet.md` | 20-claim baseline: 4 numbers, CSV columns, miss review | T2-P3 |
| `cost-per-accepted-task.md` | Outcome event + 30-day SQL for cost per accepted task (run on DuckDB 2026-10-11) | T4-P3 |
| `agent-pilot-one-page-charter.md` | One-page pilot charter: owner, baseline, success, scope, stop rule | C-P5 |
| `approval-gate-health-check.md` | 5 checks + SQL on audit records: approval rate, time to decide, load, timeouts, self-approval (run on DuckDB 2026-10-12) | T5-P3 |

## What was checked (2026-10-03)
- `agent-action-gate.rego`: 8 decision cases behave as documented on an independent Rego v1 engine (rego-cpp via regopy). NOT yet run with the OPA binary or `opa test`: do that before publishing.
- `agent-change-release-gate.md`: the script was extracted and run on a 5-row sample; results matched hand calculation.
- `agent-audit-record.schema.json`: valid JSON Schema (2020-12); the example validates; a record missing `signature` is rejected.
- CSV files parse with consistent columns. `ai-cost-attribution.md` JSON block parses.
- Regulatory and standards statements were taken from primary sources (OCC Bulletin 2026-13, FDIC press release, Fed speech May 1 2026, NAIC bulletin and adoption map, MCP specification 2025-06-18, OWASP Agentic Top 10 2026, EU AI Act articles 12 and 26). Still to verify before posting: the CVE-2025-6514 details (NVD) and the Gartner wording.

## Open decisions for the owner
1. Where the files live (recommended: a public GitHub repo plus a `/free` page on moring.ai) and the licence.
2. Reconcile `agent-readiness-36-checks.csv` with the matrix inside the gated whitepaper so both say the same thing.
3. Whether to ungate a one-page version of the whitepaper (see the research notes in the copy doc).
