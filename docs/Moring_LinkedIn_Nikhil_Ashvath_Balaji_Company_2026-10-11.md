# LinkedIn + X: new posts for Balaji, Nikhil, Ashvath and the company page (2026-10-11)

Status: **DRAFT. Nothing is posted.** A person approves every post, tag and launch. Each named person must approve the words written in their voice before it goes out.
Follows `.claude/skills/moring-linkedin-copy` (value-first: the post teaches the whole idea, one free file with no form, link in the first comment, human in control, no meeting ask). These continue the set in `docs/Moring_LinkedIn_X_Value_First_Copy_2026-10-03.md` and do not repeat its topics.

| ID | Voice | Topic | Free file | GIF |
|---|---|---|---|---|
| T1-P3 | Balaji Nagaraj Kumar, VP Engineering | Kill-switch drill | `assets/free-value/agent-kill-switch-drill.md` | `T1-P3_ai-agent-kill-switch-drill.gif` |
| T2-P3 | Nikhil Devlapur, VP Sales | Claims triage baseline | `assets/free-value/claims-triage-baseline-worksheet.md` | `T2-P3_ai-claims-triage-baseline.gif` |
| T4-P3 | Ashvath Narayan, AI Engineer | Cost per accepted task | `assets/free-value/cost-per-accepted-task.md` | `T4-P3_ai-agent-cost-per-task.gif` |
| C-P5 | Moring company page | One-page pilot charter | `assets/free-value/agent-pilot-one-page-charter.md` | `C-P5_ai-agent-pilot-charter.gif` |

GIFs: `assets/gifs/linkedin-square/` (1080x1080, with a first-frame JPG fallback for each).
Suggested slots (plan §8 everyday engine): Mon Balaji · Tue Nikhil · Wed Ashvath · Sat company page. The company page also reshares each employee post on the day it goes out, adding a buyer line (lines below).

---

## POSTED: launch film, company page (2026-10-12 13:03 UTC = 9:03 AM ET)
- URL: https://www.linkedin.com/feed/update/urn:li:ugcPost:7515396769288122369 (author Moring AI, video `renders/moring-launch-ad-60fps.mp4` v15, first comment "See how it works: moring.ai #AIagents #AIgovernance #EnterpriseAI" posted, no boost).
- Published via ConnectSafely `schedule-post` from Nikhil's account with `companyUrn` (multipart upload: pass each part's full PUT response headers; LinkedIn returns no ETag, so ETag = the Location header; upload-complete then succeeds).
- Reposts queued: Nikhil +0.75h, Ashvath +1.6h, Ellakkia +2.4h (not visible in list-scheduled-posts; verify with get-reposts). Balaji's account was not connected at posting time.

## SCHEDULED (2026-10-12, owner: "drop the free file line for now and schedule")
Free-file line removed from every post; first comments now carry a short practical tip + hashtags instead of a file link. GIFs re-rendered without the free-file strip: `assets/gifs/linkedin-square-nofile/` (engine flag `NOFREE=1`). No boost on any post. Each employee post gets a company-page reshare at +3h.

| ConnectSafely id | Post | Account | Publishes (UTC = 9:00 AM ET) |
|---|---|---|---|
| 6acce259dcb1d21d7f32355a | T2-P3 claims triage | Nikhil | Tue 2026-10-13 13:00 |
| 6acce25ddcb1d21d7f323560 | T4-P3 cost per accepted task | Ashvath | Wed 2026-10-14 13:00 |
| 6acce263470c3c0ed159b448 | T5-P3 approval gate health check | Ellakkia | Thu 2026-10-15 13:00 |
| 6acce266470c3c0ed159b44d | C-P5 pilot charter | Moring AI page (via Nikhil) | Sat 2026-10-17 13:00 |

T1-P3 (Balaji) waits until his account shows in ConnectSafely. Free files stay in `assets/free-value/` for later.

## T1-P3 · Can you stop a running AI agent? (the kill-switch drill)
**Voice:** Balaji Nagaraj Kumar, VP Engineering
**Free file:** `agent-kill-switch-drill.md`
**Target keyword question (alt text):** How do you test an AI agent kill switch?

### LinkedIn
> Every agent has a "disable" button. Have you ever timed what happens after someone presses it?
>
> A switch that turns off the UI but leaves queued jobs and retries running does not stop the agent. It only stops you from watching it. Here is the drill I would run on one agent, in staging first:
>
> 1. Stop new actions at the credential or gateway, not inside the agent's code. Probe: send one tool call as the agent. Pass = denied and logged.
> 2. Stop work in flight. Probe: two minutes later, query for any action after the stop time. Pass = zero. A retry that fires late counts as a fail.
> 3. List everything it wrote. Pass = a full list (system, record, before and after values) in under 10 minutes, with no hand-grepping of logs.
> 4. Decide what to undo. Pass = every write has a rollback path or a named owner.
> 5. Restart only under approval. Pass = restart is blocked until a different named person signs off.
>
> Score: the time from the stop decision to the agent's last action. If anything happened after the stop, give it no more autonomy, however accurate it is.
>
> The person on call stops it. A named approver restarts it.
>
> The drill sheet is a free file, no form. Link in the comments. Which step would your team fail first?

### X (under 280)
`Your agent has a disable button. Have you timed what happens after you press it? 5-step kill-switch drill: stop new actions, stop in-flight retries, list every write, undo, restart only with approval. Free sheet ↓`

### X reply
GIF + [ASSET_URL]

### First comment
`Free file, no form: [ASSET_URL]. Pairs with the 36-check readiness sheet: [ASSET_URL_2]. Works with: any gateway or IAM you already run. #AIagents #AIgovernance #PlatformEngineering`

### Sources
- None needed: no external statistics. The drill is Moring's own method (label: proposed practice).

### Tags (max 2)
- None. No tool is central to this one.

### Open checks
- [ ] Balaji approves the wording.
- [ ] Owner confirms the free-file hosting URL and licence.

---

## T2-P3 · Claims triage: measure 4 numbers before any AI demo
**Voice:** Nikhil Devlapur, VP Sales (workflow language, no platform jargon)
**Free file:** `claims-triage-baseline-worksheet.md`
**Target keyword question (alt text):** How do you measure claims triage before automating it with AI?

### LinkedIn
> Heads of Claims: before anyone shows you an AI triage demo, pull 20 claims from last month and measure four things.
>
> 1. Time from first notice of loss to first assignment (the median).
> 2. Routing misses: how many claims ended up in a different queue than the first one.
> 3. Chase rate: how many needed at least one information request back to the claimant.
> 4. Severity drift: how many were rated one severity at triage and another after review.
>
> Label these measured. Without them, any later "faster" is a guess.
>
> Then read the misses. For each one, write a line about what was missing at triage that would have routed it right the first time. Usually one group dominates: a document sitting in another system, a fact that came out on the second call, or a coverage check that never happened at triage. That group is the first workflow worth fixing.
>
> An agent can read the notice, pull the policy and prior claims, list missing documents and draft a triage note. The handler still makes the assignment and the coverage call, under their name, with the reason recorded.
>
> The worksheet is a free file, no form. Link in the comments. Which of the four numbers would surprise your team most?

### X (under 280)
`Heads of Claims: before any AI triage demo, measure 20 recent claims. Time to first assignment, routing misses, chase rate, severity drift. Then read the misses. Free worksheet ↓`

### X reply
GIF + [ASSET_URL]

### First comment
`Free file, no form: [ASSET_URL]. Works with: any claims system export (Guidewire, Duck Creek or a spreadsheet). #Insurance #ClaimsManagement #InsurTech`

### Sources
- None needed: no external statistics. The example rows in the file are labeled illustrative.

### Tags (max 2)
- None. Guidewire and Duck Creek appear as plain names in the comment only, to show which export the worksheet expects. They are not tagged and no relationship is implied.

### Open checks
- [ ] Nikhil approves the wording.
- [ ] US insurance audience: post at 9:00 AM ET.

---

## T4-P3 · Cost per token is the wrong number. Track cost per accepted task.
**Voice:** Ashvath Narayan, AI Engineer
**Free file:** `cost-per-accepted-task.md` (outcome event + a SQL query, tested on DuckDB)
**Target keyword question (alt text):** How do you measure the real cost of an AI agent per task?

### LinkedIn
> The cheapest agent per token can be your most expensive agent per finished task.
>
> The token bill leaves out retries, runs that produced nothing, paid tool calls, and the minutes a person spends checking or fixing the output. So I track one number instead:
>
> cost per accepted task = (model + tool spend + review and rework time) / tasks accepted without rework
>
> To get there:
> 1. The workflow owner writes down what "accepted" means. For a review agent: the comment led to a code change.
> 2. Log one outcome row per task, with the same trace ID as the model calls.
> 3. Join spend to outcomes for 30 days and compute it per agent.
> 4. Separate out wasted spend: rejected and abandoned runs. That is usually where the retry loops are hiding.
> 5. Before you change model or prompt, run both versions on the same past tasks and compare this number, not cost per call.
>
> If review minutes go up while token cost goes down, the agent is moving work around, not removing it. Label any saving proposed until you have measured it.
>
> The owner defines accepted, a named reviewer marks each task, and a human approves any budget change.
>
> The event format and the query are in a free file, no form. Link in the comments. What does "accepted" mean for your busiest agent?

### X (under 280)
`Cost per token hides retries, empty runs, tool calls and human rework. Track cost per accepted task instead. Outcome event + 30-day SQL, free file ↓`

### X reply
GIF + [ASSET_URL]

### First comment
`Free file, no form: [ASSET_URL]. Builds on the per-PR cost event: [ASSET_URL_2]. Works with: any warehouse (Postgres, Snowflake, BigQuery, DuckDB). #LLMOps #FinOps #AIagents`

### Sources
- None needed: no external statistics. The table in the file is labeled illustrative. The query was run on DuckDB against a test fixture, and the results matched a hand calculation (2026-10-11).

### Tags (max 2)
- None.

### Open checks
- [ ] Ashvath approves the wording.
- [ ] The query uses Postgres or DuckDB interval syntax. Note any dialect changes if readers ask about Snowflake or BigQuery.

---

## C-P5 · Company page: the one-page AI agent pilot charter
**Voice:** Moring company page ("we")
**Free file:** `agent-pilot-one-page-charter.md`
**Target keyword question (alt text):** What should an AI agent pilot plan include before it starts?

### LinkedIn
> Many AI agent pilots end in neither a yes nor a no. Usually that is because nobody wrote down what yes would look like before the work started.
>
> Before any build, we fill in one page with the team that owns the workflow:
>
> 1. The workflow, named as a business process: "commercial onboarding evidence review", not "an LLM use case".
> 2. One accountable owner, plus the risk or control stakeholder who has to agree.
> 3. A baseline measured on real recent cases: cycle time, minutes per case, rework rate.
> 4. Success, written before the pilot: the number that must improve, the number that must not get worse, and who signs off.
> 5. What the agent may read, draft and write. Every write or payment has a named human approver.
> 6. A stop rule: what pauses the pilot, who can pause it, and who approves a restart.
>
> If a line cannot be filled in, the pilot is not ready. That is useful to know in week zero rather than month six.
>
> We keep every outcome labeled: proposed, modeled, measured or realized.
>
> The charter is a free file, no form. Link in the comments. Which line is hardest to fill in for the pilot you are running now?

### X (under 280)
`Most agent pilots end in neither yes nor no because nobody wrote down what yes looks like. One page before the build: workflow, owner, baseline, success, scope, stop rule. Free charter ↓`

### X reply
GIF + [ASSET_URL]

### First comment
`Free file, no form: [ASSET_URL]. More free files from moring (moring.ai): [FREE_PAGE_URL]. #AIagents #AIgovernance #DigitalTransformation`

### Sources
- None needed. "Many pilots end without a clear yes or no" is phrased as an observation, not a statistic. Do not swap in a percentage unless it comes from a named primary source.

### Tags (max 2)
- None.

### Open checks
- [ ] Owner approves the company-page voice.
- [ ] Do not use C-P1 to C-P4 from the 2026-09-24 plan until their claims are verified (the "$800M firm", "8 agents in 12 weeks" and site stats are still open in the claims register).

### Company-page reshare lines (one per employee post, same day)
- Balaji T1-P3: "For platform and risk leads: one drill tells you whether your agent can actually be stopped. Free sheet in Balaji's comments."
- Nikhil T2-P3: "For Heads of Claims: measure triage before you automate it. 20 claims, four numbers, free worksheet."
- Ashvath T4-P3: "For engineering and finance leads who share an AI bill: cost per accepted task, with the query included."

---

## T5-P3 · Approvers said yes to everything. Is the gate working? (added 2026-10-12)
**Voice:** Ellakkia S, AI Engineer
**Free file:** `approval-gate-health-check.md` (5 checks + SQL on the T5-P1 audit record, tested on DuckDB 2026-10-12)
**GIF:** `T5-P3_ai-agent-approval-gate-health-check.gif`
**Target keyword question (alt text):** How do you know if AI agent approval gates are working?
**Suggested slot:** Thu (plan §8: Ellakkia / Arya rotate)

### LinkedIn
> Your approvers said yes to every agent request last month. Is the gate working?
>
> An approval gate only protects you if the person actually reads the request. Approving everything in three seconds, at high volume, is a click, not a control. You can see it in the audit records you already keep:
>
> 1. Approval rate per rule. Pass = the gate says no sometimes, on rules with real volume.
> 2. Time to decide. Pass = decision times that fit the evidence being reviewed, not a few seconds.
> 3. Load per approver. Pass = no single person approves most of a rule.
> 4. Timeouts. Pass = zero timed-out approvals where the action still went through.
> 5. Self-approval. Pass = zero records where the approver is the person the agent acted for.
>
> Checks 4 and 5 are hard rules. Checks 1 to 3 tell you where to look.
>
> Then test the gate on purpose. In a test environment, plant a few known-bad requests: over the limit, a missing document, a write outside scope. Each should be rejected with a reason. Agree it with the approvers' manager first. It tests the gate, not a person.
>
> When a check fails, show approvers less but better: the evidence, the exception and the rule that fired.
>
> The five queries are in a free file, no form. Link in the comments. Which check would your gate fail first?

### X (under 280)
`Your approvers said yes to every agent request last month. Is the gate working? 5 checks on the audit records you already keep: approval rate, time to decide, load, timeouts, self-approval. Free SQL ↓`

### X reply
GIF + [ASSET_URL]

### First comment
`Free file, no form: [ASSET_URL]. Uses the audit record from my earlier post: [ASSET_URL_2]. Works with: any log store or warehouse (Postgres, DuckDB, Snowflake). #AIgovernance #AIagents #ModelRisk`

### Sources
- None needed: no external statistics. "100% approved, median 3s" in the GIF is labeled illustrative.

### Tags (max 2)
- None.

### Open checks
- [ ] Ellakkia approves the wording.
- [ ] Ellakkia's LinkedIn account is not connected to ConnectSafely yet (only Nikhil and Ashvath are). Post by hand or connect her account.

---

## Checks run (2026-10-11)
- Lint: `node .claude/skills/moring-linkedin-copy/tools/lint.js` on this file: clean (posts are 1,120 to 1,250 characters, 0 tags; X versions are 148 to 213 characters).
- No external numbers in any post. Every example figure in the free files is labeled illustrative.
- No customer names, no marketplace or partner claims, no meeting asks, no links in post bodies, no "AICP" or "control plane" in the T2 hook.
- `cost-per-accepted-task.md` SQL: run on DuckDB with a fixture, matched a hand calculation.
- Still open (owner): where the free files are hosted (`[ASSET_URL]`, `[FREE_PAGE_URL]`) and their licence. Each voice approves their own post.
