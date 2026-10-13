# Cost per accepted task: the agent cost number worth tracking

Free to use, copy and share. No signup. Draft v0.1 by Moring AI (moring.ai). Licence: Apache-2.0 for the code, CC BY 4.0 for the text (proposed).

Cost per token tells you what the model charged. It does not tell you what a finished piece of work cost. Retries, runs that produced nothing, tool and API calls, and the human time spent checking or fixing the output all sit outside the token bill.

**Cost per accepted task** = (model spend + tool and API spend + human review and rework cost) / tasks accepted without rework

Builds on the per-call event in `ai-cost-attribution.md` (same `trace_id`).

## Step 1: define "accepted" in writing
Before you measure, the workflow owner writes down what accepted means. Examples:
- Code review agent: the comment was resolved by a code change, not dismissed.
- Claims triage agent: the handler kept the suggested queue.
- Evidence prep agent: the reviewer approved the pack without asking for more documents.

## Step 2: log one outcome row per task

```json
{
  "task_id": "tk_2291",
  "trace_id": "tr_7c91",
  "agent": "reviewer-agent",
  "team": "payments",
  "status": "accepted",
  "runs": 2,
  "review_minutes": 6,
  "rework_minutes": 0,
  "decided_by": "j.rao",
  "decided_at": "2026-10-09T14:02:00Z"
}
```

`status` is one of `accepted`, `accepted_with_rework`, `rejected`, `abandoned` (the agent never produced an output).

## Step 3: the query (30 days, by agent)

```sql
-- model_calls: one row per model call (from ai-cost-attribution.md)
-- tool_calls:  one row per paid tool or API call, with cost_usd and trace_id
-- tasks:       one row per task (above)
-- :loaded_rate_per_min = fully loaded cost of reviewer time per minute (your finance number)
WITH spend AS (
  SELECT trace_id, SUM(cost_usd) AS model_usd FROM model_calls
  WHERE ts >= CURRENT_DATE - INTERVAL '30 days' GROUP BY trace_id
), tools AS (
  SELECT trace_id, SUM(cost_usd) AS tool_usd FROM tool_calls
  WHERE ts >= CURRENT_DATE - INTERVAL '30 days' GROUP BY trace_id
)
SELECT
  t.agent,
  COUNT(*)                                                    AS tasks,
  SUM(CASE WHEN t.status = 'accepted' THEN 1 ELSE 0 END)      AS accepted,
  ROUND(SUM(COALESCE(s.model_usd,0) + COALESCE(x.tool_usd,0)
        + (t.review_minutes + t.rework_minutes) * :loaded_rate_per_min), 2) AS total_usd,
  ROUND(SUM(COALESCE(s.model_usd,0) + COALESCE(x.tool_usd,0)
        + (t.review_minutes + t.rework_minutes) * :loaded_rate_per_min)
        / NULLIF(SUM(CASE WHEN t.status = 'accepted' THEN 1 ELSE 0 END), 0), 2) AS usd_per_accepted_task,
  ROUND(SUM(CASE WHEN t.status IN ('rejected','abandoned')
        THEN COALESCE(s.model_usd,0) + COALESCE(x.tool_usd,0) ELSE 0 END), 2)   AS wasted_usd
FROM tasks t
LEFT JOIN spend s ON s.trace_id = t.trace_id
LEFT JOIN tools x ON x.trace_id = t.trace_id
WHERE t.decided_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY t.agent
ORDER BY usd_per_accepted_task DESC;
```

Tasks with no `trace_id` match are your attribution gap: fix logging before trusting the number.

## Step 4: read it
| Agent (illustrative) | Tasks | Accepted | $ per accepted task | Wasted $ |
|---|---|---|---|---|
| reviewer-agent | 400 | 300 | 1.90 | 41 |
| docs-agent | 250 | 240 | 0.40 | 3 |
| refactor-agent | 120 | 40 | 9.75 | 160 |

(Made-up numbers to show the shape. Use your own.)

A cheap-per-token agent with a low acceptance rate can be the most expensive one per finished task. Look at three things:
1. **Acceptance rate.** Low acceptance usually costs more than token price.
2. **Wasted spend.** Rejected and abandoned runs: often retry loops or tasks the agent should not take.
3. **Human minutes.** If review time rises, the agent is moving work, not removing it.

## Step 5: compare changes on the same tasks
Before switching model tier, prompt or tools, run both versions on the same set of past tasks and compare cost per accepted task, not cost per call. Label any saving **proposed** until it is measured in production.

Humans stay in control: the workflow owner defines "accepted", a named reviewer marks each task, and a person approves any budget or model change.
