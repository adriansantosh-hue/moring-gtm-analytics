# Per-PR AI cost attribution: the event to log and the query to run

Free to use, copy and share. No signup. Draft v0.1 by Moring AI (moring.ai). Licence: Apache-2.0 for the code, CC BY 4.0 for the text (proposed).

If the release pipeline does not know what an AI call cost and what it was for, spend hides in one invoice. Tag every call.

## The event (one per model call)

```json
{
  "ts": "2026-10-03T09:41:07Z",
  "team": "payments",
  "agent": "reviewer-agent",
  "pr": "payments-api#412",
  "model": "<model id>",
  "tokens_in": 18400,
  "tokens_out": 1200,
  "tokens_cached": 15000,
  "cost_usd": 0.0,
  "trace_id": "tr_7c91",
  "tool": "review_diff",
  "outcome": "comment_posted"
}
```

Set `cost_usd` from your provider's current price list at write time. Put the tags on every call at the gateway, so no team has to remember.

## The query (30 days, by PR)

```sql
SELECT pr, team, agent,
       SUM(cost_usd)             AS cost_usd,
       SUM(tokens_in + tokens_out) AS tokens,
       COUNT(*)                  AS calls
FROM ai_call_events
WHERE ts >= now() - interval '30 days'
GROUP BY pr, team, agent
ORDER BY cost_usd DESC;
```

## Find the unattributed spend

```sql
SELECT SUM(cost_usd) FILTER (WHERE pr IS NULL OR team IS NULL OR agent IS NULL) AS unattributed_usd,
       SUM(cost_usd)                                                           AS total_usd
FROM ai_call_events
WHERE ts >= now() - interval '30 days';
```

The ratio of those two numbers is your shadow spend. Measure it before you set any savings target.

## Levers to test once you can see the data

- Prompt caching for large, repeated input (check your provider's current cache pricing)
- Routing easy tasks to a cheaper model tier and keeping the strong model for hard ones
- Moving deterministic work out of the model and into code
- Per-agent and per-team budgets with alerts

Label any saving you claim as proposed until you have measured it on your own data.
