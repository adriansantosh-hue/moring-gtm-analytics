# Approval gate health check: is the human in the loop actually deciding?

Free to use, copy and share. No signup. Draft v0.1 by Moring AI (moring.ai). Licence: Apache-2.0 for the code, CC BY 4.0 for the text (proposed).

An approval gate only protects you if the person approving actually reads the request. When approvers say yes to almost everything, very fast, at high volume, the gate turns into a click. This check uses the audit records you already keep (shape: `agent-audit-record.schema.json`) to show whether that is happening. Run it monthly, per rule and per approver.

## The five checks

| # | Check | What it shows | Fail sign (set your own thresholds, these are starting points) |
|---|---|---|---|
| 1 | Approval rate per rule | Is the gate ever saying no? | 100% approved over a month, on a rule that sees real volume |
| 2 | Time to decide | Is anyone reading? | Median decision time of a few seconds on requests that carry evidence to review |
| 3 | Load per approver | Is one person approving everything? | One approver handles most of a rule's volume, or far more per day than they could review |
| 4 | Timeouts fail closed | What happens when nobody answers? | Any `timed-out` approval whose action still `succeeded` |
| 5 | No self-approval | Is the agent's requester also the approver? | Any record where `approver` = `on_behalf_of` |

Checks 4 and 5 are hard rules: the target is zero. Checks 1 to 3 are signals that tell you where to look, not verdicts.

## The queries

Flatten your audit records into one table first (one row per record, columns named as below). Written for Postgres / DuckDB; adjust the date functions for your warehouse.

```sql
-- audit: record_id, trace_id, ts, agent_id, on_behalf_of, tool, rule_id,
--        policy_decision, approval_required, approver, decided_at,
--        approval_outcome, result_status

-- 1 + 2. Approval rate and median decision time per rule (last 30 days)
SELECT
  rule_id,
  COUNT(*)                                                         AS approvals,
  ROUND(AVG(CASE WHEN approval_outcome = 'approved' THEN 1.0 ELSE 0 END), 3) AS approval_rate,
  ROUND(CAST(PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (decided_at - ts))) AS NUMERIC), 1) AS median_seconds_to_decide
FROM audit
WHERE approval_required AND ts >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY rule_id
ORDER BY approval_rate DESC, median_seconds_to_decide ASC;

-- 3. Load per approver per rule (last 30 days)
SELECT
  rule_id, approver,
  COUNT(*) AS decisions,
  ROUND(COUNT(*) * 1.0 / SUM(COUNT(*)) OVER (PARTITION BY rule_id), 3) AS share_of_rule,
  ROUND(COUNT(*) * 1.0 / COUNT(DISTINCT CAST(decided_at AS DATE)), 1)   AS per_active_day
FROM audit
WHERE approval_required AND approver IS NOT NULL
  AND ts >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY rule_id, approver
ORDER BY share_of_rule DESC;

-- 4. Timeouts that did NOT fail closed (target: zero rows)
SELECT record_id, trace_id, rule_id, ts
FROM audit
WHERE approval_outcome = 'timed-out' AND result_status = 'succeeded';

-- 5. Self-approval (target: zero rows)
SELECT record_id, trace_id, rule_id, approver
FROM audit
WHERE approval_required AND approver = on_behalf_of;
```

## Then test the gate on purpose
Numbers tell you where to look. To know whether approvers catch problems, plant a few known-bad requests in a test environment (or in shadow mode): an amount over the limit, a missing document, a write to a system outside the agent's scope.
- Pass = each one is rejected, with a reason written down.
- Agree the test with the approvers' manager first. It is a check of the gate's design, not a trap for a person.

## What to change when a check fails
- **Rubber-stamping (1, 2):** show the approver less but better: the evidence, the exception and the rule that fired, not the whole case. Move low-risk, well-tested actions to auto-allow so attention goes where it matters.
- **Overload (3):** add approvers or split the rule by risk. A gate one person cannot keep up with is not a gate.
- **Timeouts that pass (4):** fix the policy so `timed-out` = blocked. This is a defect, not a tuning question.
- **Self-approval (5):** block it in the policy (approver must differ from the requester), not just in the process document.

Humans stay in control: approvers decide, the gate's owner reviews these numbers monthly, and any change to who approves what is itself approved and logged.
