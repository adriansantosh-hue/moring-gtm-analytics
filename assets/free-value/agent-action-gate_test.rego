# Tests for agent-action-gate.rego. Run: opa test . -v
# STATUS: the same cases were checked against the policy on rego-cpp (2026-10-03); this test file has not
# been run with the OPA binary yet. Run it before publishing.

package agent.gate_test

import data.agent.gate
import rego.v1

read_call := {
	"principal": {"agent_id": "claims-agent-07", "scopes": ["tool:get_claim", "tool:set_reserve"]},
	"tool": {"name": "get_claim", "side_effect": "read", "data_classes": [], "egress_host": "claims.internal.example"},
	"args": {},
}

write_call := {
	"principal": {"agent_id": "claims-agent-07", "scopes": ["tool:get_claim", "tool:set_reserve"]},
	"tool": {"name": "set_reserve", "side_effect": "write", "data_classes": [], "egress_host": "claims.internal.example", "approver_role": "claims-lead"},
	"args": {"amount": 1000},
}

test_read_in_scope_is_allowed if {
	gate.decision.decision == "allow" with input as read_call
}

test_write_needs_a_named_approver if {
	d := gate.decision with input as write_call
	d.decision == "requires-approval"
	d.approver_role == "claims-lead"
}

test_money_above_auto_limit_escalates if {
	d := gate.decision with input as object.union(write_call, {"args": {"amount": 12000}})
	d.decision == "requires-approval"
	contains(d.reason, "auto-approve limit")
}

test_amount_above_hard_limit_is_denied if {
	d := gate.decision with input as object.union(write_call, {"args": {"amount": 90000}})
	d.decision == "deny"
}

test_unknown_host_is_denied if {
	call := object.union(read_call, {"tool": {"name": "get_claim", "side_effect": "read", "data_classes": [], "egress_host": "evil.example"}})
	gate.decision.decision == "deny" with input as call
}

test_missing_scope_is_denied if {
	call := object.union(read_call, {"principal": {"agent_id": "claims-agent-07", "scopes": []}})
	gate.decision.decision == "deny" with input as call
}

test_unknown_side_effect_falls_to_default_deny if {
	call := object.union(read_call, {"tool": {"name": "get_claim", "side_effect": "exec", "data_classes": [], "egress_host": "claims.internal.example"}})
	gate.decision.decision == "deny" with input as call
}
