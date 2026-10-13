# 12 questions to ask any AI governance or control platform (including ours)

Free to use, copy and share. No signup. Draft v0.1 by Moring AI (moring.ai). Vendor-neutral on purpose.

Ask for a live demonstration or evidence for each, not a slide.

| # | Question | A good answer shows | Red flag |
|---|---|---|---|
| 1 | Where does it run? | In your cloud account or VPC; you hold the keys | Only in the vendor's hosted tenant |
| 2 | What does it govern? | Agent actions across your clouds and tools | Only agents built inside that vendor's platform |
| 3 | Can it block an action before it runs? | A denied call that never reached the system of record | "We alert you afterwards" |
| 4 | Does the decision use the arguments, not just the tool name? | An amount over a limit refused or escalated | Tool-level allow/deny only |
| 5 | How is identity handled? | Per-agent workload identity, short-lived scoped tokens, the human on whose behalf it acted | Shared service accounts or token passthrough |
| 6 | Is policy code you can read and test? | Policy in a repo, tests in CI, shadow mode before enforcing | Rules only in a UI you cannot export |
| 7 | How do humans approve? | Named approver, evidence shown, scoped authority, recorded | A global "approve all" toggle |
| 8 | What is the evidence? | One correlated, signed, append-only record per action, denials included | Logs in four tools |
| 9 | Can one query replay an incident? | A live replay of last week's decision | "We can export logs" |
| 10 | What happens when it fails? | Fails closed, with a kill switch you have drilled | Fails open, or untested |
| 11 | What does it cost and how is it priced? | Clear pricing tied to something you can measure | Opaque consumption, price changes at renewal |
| 12 | How do you leave? | Your policies and records are exportable in open formats | Lock-in by format |

Scoring: 2 points for evidence shown live, 1 for a documented claim, 0 for nothing. Out of 24. Below 14, keep looking.

Use it as written on every vendor on your shortlist, in the same order.
