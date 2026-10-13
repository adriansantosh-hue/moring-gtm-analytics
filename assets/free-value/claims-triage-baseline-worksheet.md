# Claims triage baseline: 20 claims, 4 numbers, before you automate anything

Free to use, copy and share. No signup. Draft v0.1 by Moring AI (moring.ai). Licence: CC BY 4.0 (proposed).

Before anyone shows you an AI triage demo, measure how triage works today on your own claims. Without a baseline, any later "faster" is a guess. This takes one analyst about half a day.

## Step 1: pick the sample
- 20 claims reported in the last 30 to 60 days, one line of business (for example personal auto or small commercial property).
- Mix of simple and messy. Do not pick only the clean ones.
- Remove anything under litigation or with personal data you cannot use for internal review.

## Step 2: fill one row per claim

Copy this into a spreadsheet:

```csv
claim_ref,line_of_business,fnol_timestamp,first_assignment_timestamp,first_queue,final_queue,reassignments,info_requests_to_claimant,missing_docs_at_assignment,severity_at_triage,severity_after_review,systems_opened_by_handler,notes
C-0001,personal_auto,2026-09-02 09:14,2026-09-02 15:40,fast_track,fast_track,0,0,none,low,low,3,
C-0002,personal_auto,2026-09-02 10:02,2026-09-03 11:25,fast_track,complex,2,2,police_report;photos,low,medium,6,bodily injury surfaced on call 2
```

(The two rows are illustrative. Replace them with your claims.)

## Step 3: compute four numbers
| # | Number | How | Yours |
|---|---|---|---|
| 1 | Time to first assignment | median of `first_assignment - fnol` | |
| 2 | Routing miss rate | share of claims where `first_queue` differs from `final_queue` | |
| 3 | Chase rate | share of claims with one or more `info_requests_to_claimant` | |
| 4 | Severity drift | share where `severity_at_triage` differs from `severity_after_review` | |

Label these **measured**. Keep the sheet; it is the comparison point for any pilot.

## Step 4: read the misses
For every claim counted in number 2 or 4, write one line: what was missing at triage that would have sent it to the right queue first time? Group the lines. The biggest group is your first workflow to fix.

Common groups (check which apply to you):
- A document existed but was in another system
- A fact came out on the second call (injury, prior claim, coverage question)
- Coverage or policy terms were not checked at triage
- The triage rule did not cover this case type

## Step 5: write the pilot target before the pilot
| Field | Example | Yours |
|---|---|---|
| Workflow | personal auto FNOL triage | |
| Accountable owner | head of claims operations | |
| Which number must move, by how much | routing miss rate, owner sets the threshold | |
| Which number must NOT get worse | severity drift on bodily injury claims | |
| Who decides the assignment | the triage handler or supervisor, always | |

## Where an agent can help (and where it must not decide)
An agent can read the FNOL, pull the policy and prior claims, list missing documents, flag coverage questions and draft a triage note with a suggested queue. The handler or supervisor makes the assignment and the coverage call, and that decision is recorded with their name and the reason.

Keep outcomes labeled: proposed (what a vendor says), modeled (what a spreadsheet says), measured (what your sample shows), realized (what happened in production).
