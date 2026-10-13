# MCP in production: governance and security checklist

Free to use, copy and share. No signup. Draft v0.1 by Moring AI (moring.ai). Licence: CC BY 4.0 (proposed).

MCP standardizes how an agent connects to tools. It does not decide who may use which tool, with what token, against which tenant, or what gets recorded. This list covers that gap. Each line says where it comes from: the MCP specification, OWASP, or Moring practice.

## 1. Identity and tokens

- [ ] Clients send the OAuth `resource` parameter (RFC 8707) in authorization and token requests, naming the MCP server the token is for. (MCP spec, authorization, 2025-06-18: MUST)
- [ ] Servers validate that a token was issued for them (audience) and reject others with 401. (MCP spec: MUST)
- [ ] Never pass the caller's token through to a downstream API. Mint a new, narrower token per downstream call. (MCP spec: token passthrough is forbidden; it creates a confused-deputy problem)
- [ ] Scope tokens per tool, short-lived. (Moring practice; consistent with the audience-restricted guidance)
- [ ] Record the human the agent acts for on every call. (Moring practice)

## 2. Where it runs

| | Local | Remote (one team) | Gateway (shared) |
|---|---|---|---|
| Auth | developer's machine, often a personal token | server validates tokens | gateway validates once, mints scoped tokens downstream |
| Versioning | whatever is installed | server owner | gateway pins and rolls versions |
| Multi-tenant | no | by design effort | enforced at the gateway |
| Use when | prototypes | one team, few tools | many teams or many servers |

Rule of thumb (Moring practice): a gateway is overhead for one team and close to mandatory for twelve.

## 3. Tool design

- [ ] Small, typed tools with explicit input schemas. Prefer many narrow tools to one broad one.
- [ ] Mark each tool read or write. Writes, money and personal data need a human confirmation step.
- [ ] Make destructive tools idempotent or reversible where you can.
- [ ] Tool names and descriptions are code: version them, review them, sign them.

## 4. Threats and defenses

| Threat | What it looks like | Defense | OWASP agentic ID |
|---|---|---|---|
| Command injection / unexpected code execution | A tool or server runs attacker-influenced commands (for example, the 2025 mcp-remote vulnerability, CVE-2025-6514; check NVD for details) | Sandbox servers, no ambient credentials, patch fast | ASI05 |
| Indirect prompt injection | Instructions hidden in data the agent reads, steering its next tool call | Treat tool output as untrusted, confirm side effects with a human, limit what a read can lead to | ASI01 (agent goal hijack) |
| Tool poisoning | A tool description carries hidden instructions | Review and sign definitions, pin versions, diff on change | ASI04 (supply chain), ASI02 (tool misuse) |
| Rug pull | A trusted server changes behavior after approval | Pin versions, re-review on change, audit every server before production | ASI04 |
| Over-privileged identity | One token valid everywhere | Audience-bound, per-tool tokens | ASI03 (identity and privilege abuse) |

OWASP Top 10 for Agentic Applications 2026 names: ASI01 Agent Goal Hijack, ASI02 Tool Misuse and Exploitation, ASI03 Identity and Privilege Abuse, ASI04 Agentic Supply Chain Vulnerabilities, ASI05 Unexpected Code Execution, ASI06 Memory and Context Poisoning, ASI07 Insecure Inter-Agent Communication, ASI08 Cascading Failures, ASI09 Human-Agent Trust Exploitation, ASI10 Rogue Agents.

## 5. Testing

- [ ] Build a golden dataset from real API or tool logs: a prompt and the tool it should pick, plus cases where it should pick none.
- [ ] Run it on every change to a tool description, schema or server version.
- [ ] Track wrong-tool rate and "should have asked a human" misses.

## 6. Evidence

- [ ] One record per tool call: principal, tool, arguments hash, policy decision, approval, result, trace ID. (Schema: agent-audit-record.schema.json)
- [ ] Denials are recorded as fully as successes.

Sources: MCP specification, authorization (modelcontextprotocol.io, 2025-06-18); OWASP Top 10 for Agentic Applications 2026 (genai.owasp.org).
