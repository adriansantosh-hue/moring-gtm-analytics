# agent-action-gate.rego
# A starter policy that decides what an AI agent may do with a tool: allow, requires-approval, or deny.
# Free to use and adapt. Draft v0.1 by Moring AI (moring.ai). Licence: Apache-2.0 (proposed, owner to confirm).
#
# STATUS: written for OPA v1 syntax. The 8 decision cases below were checked on an independent Rego v1
# engine (rego-cpp via the regopy package) on 2026-10-03 and all behaved as described. The OPA binary
# itself and the test file have not been run yet. Before you use or post it:
#   opa test . -v
#
# Design choices
#   - Fail closed: only a read-only tool the agent has a scope for is auto-allowed. Anything unknown is denied.
#   - Arguments matter: the decision looks at amounts and data classes, not just the tool name.
#   - Writes, money above a limit and personal data go to a named human.
#   - The decision shape (allow / deny / requires-approval + reason) matches the tool-approval pattern used
#     by agent SDKs, for example the Vercel AI SDK policy-opa adapter.
#
# Input shape (example)
#   {
#     "principal": {"agent_id": "claims-agent-07", "on_behalf_of": "j.alvarez", "scopes": ["tool:get_claim", "tool:set_reserve"]},
#     "tool": {"name": "set_reserve", "side_effect": "write", "data_classes": ["pii"], "egress_host": "claims.internal.example", "approver_role": "claims-lead"},
#     "args": {"amount": 12000}
#   }

package agent.gate

import rego.v1

# Tune these for your workflow. Example values only.
allowed_hosts := {"claims.internal.example", "crm.internal.example"}

auto_limit := 5000

hard_limit := 50000

# Default: deny.
default decision := {"decision": "deny", "reason": "no rule allowed this call (default deny)"}

default approver_role := "named-reviewer"

approver_role := input.tool.approver_role if input.tool.approver_role

# --- Hard denials -------------------------------------------------------------

has_scope if concat(":", ["tool", input.tool.name]) in input.principal.scopes

deny_reasons contains "principal has no scope for this tool" if not has_scope

deny_reasons contains "destination host is not on the allowlist" if {
	input.tool.egress_host
	not input.tool.egress_host in allowed_hosts
}

deny_reasons contains "amount is above the hard limit" if input.args.amount > hard_limit

# --- Escalations (a human decides) --------------------------------------------

escalate_reasons contains "write action needs a named approver" if input.tool.side_effect == "write"

escalate_reasons contains "amount is above the auto-approve limit" if input.args.amount > auto_limit

escalate_reasons contains "touches personal data" if "pii" in input.tool.data_classes

# --- Decisions ----------------------------------------------------------------

decision := {"decision": "deny", "reason": concat("; ", sort(deny_reasons))} if count(deny_reasons) > 0

decision := {
	"decision": "requires-approval",
	"reason": concat("; ", sort(escalate_reasons)),
	"approver_role": approver_role,
} if {
	count(deny_reasons) == 0
	count(escalate_reasons) > 0
}

# Only a read-only tool, in scope, with no deny or escalation reasons is auto-allowed.
decision := {"decision": "allow", "reason": "read-only and in scope"} if {
	count(deny_reasons) == 0
	count(escalate_reasons) == 0
	input.tool.side_effect == "read"
}
