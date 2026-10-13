# The 5-layer agent stack: where governance sits

Free to use, copy and share. No signup. Draft v0.1 by Moring AI (moring.ai). Licence: CC BY 4.0 (proposed).

Orchestration moves work. Governance decides what may move. The mistake is to assume the layer that moves work also governs it.

| Layer | What it does | Example tools (illustrative, not an endorsement) | Question to ask |
|---|---|---|---|
| 1. Models | Reasoning and generation | Anthropic, OpenAI, Google models | Which model, which version, who approved it? |
| 2. Agent runtime / orchestration | Plans steps, calls tools, keeps state | LangGraph, CrewAI, vendor agent frameworks | Can it act without anyone checking? |
| 3. **Control plane** | Checks identity, authorization, egress, audit and containment on every action, in the request path | Identity (for example Okta), policy engine (for example OPA), gateway, log store (for example Splunk) | Can it deny before the action runs, attribute it, and replay it? |
| 4. Systems of record | Where the action lands | Guidewire, Salesforce, ServiceNow, Workday, SAP, a ledger | Who owns the data it changes? |
| 5. Evidence | The record an auditor reads | Log and analytics platforms (for example Splunk, Datadog, Snowflake) | Is it one trail, signed, and queryable? |

## Why layer 3 is its own layer

- Platforms usually govern what happens inside their own walls: a data platform governs its data, a model platform governs models.
- An agent action crosses layers: a model proposes, a runtime calls a tool, a system of record changes. The control that matters is on the crossing.
- In the request path, not beside it. A sidecar that only observes can report a problem but cannot stop it.

## Build, buy or assemble, per layer

| Layer | Usually |
|---|---|
| 1, 2, 4 | Buy or already own |
| 3 | The open question. Use the build-vs-buy scorecard |
| 5 | Reuse your existing log platform; make sure the record format is right |

Use it on a whiteboard: draw your agent across the five layers and mark where each control actually runs.
