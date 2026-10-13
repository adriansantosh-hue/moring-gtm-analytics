# Engagement playbook (comments, replies, ICP follow-up, logging)

Learned 2026-10-12/13 running the launch week. Execution details are in `connectsafely-playbook.md`.

## 1. Comment style (boss feedback: "looks generic and agentic")
Bad (what we posted first): confident claim -> "That's the..." -> neat takeaway; "X is underrated", "not just a cost one, a governance one", "worth measuring before anything else"; six polished comments from teammates within 15 minutes.

Good:
- One or two short sentences, lowercase is fine, under ~250 characters.
- Respond to one specific thing in their post. Often end with a real question to the author.
- One plain detail, no pitch, no links, no hashtags, no "great post".
- Use the words buyers search (AI agents, audit trail, human in the loop, KYC onboarding, claims triage) only where they fit naturally.
- Never invent a personal story in someone's voice ("finance asked me last month").
Examples that landed (got author replies): "severity drift is a sneaky one. would you track it per adjuster or per queue?" · "cascading first is a nice default. curious what the System 1 router got wrong more often...".

Best of all: send each person a one-line prompt and let them write it themselves.

## 2. Team engagement on our own posts
- Early real comments help reach, but teammate comments count less and a burst looks like a pod. Use 1 to 2 colleagues per post, first one 20 to 40 min after posting, next 1 to 2 h later. The author replying to every outside comment matters more.
- Company page reshares each employee post ~3 h after (via `schedule-post` `reposts` with Nikhil + `companyUrn`).
- Launch-type posts: repost from everyone ONCE (manual `repost-post`, not also queued).

## 3. Outbound comments on other people's posts (5 per voice per round)
1. `search-posts` past-week by lane keywords (Nikhil: KYC/claims/bank ops; Ashvath: LLM cost/inference/routing; Ellakkia: audit/approvals/agent governance; Balaji: kill switch/control plane/agent identity; Company: pilots to production, AI governance banks).
2. Drop: hiring/recruiter posts, vendor promos, direct competitors, regulators (comment fine, never pitch), posts already buried in comments, Moring's own posts.
3. Draft per section 1, author tagged, save to `docs/Moring_LinkedIn_Comment_Targets_<date>.md`, get approval, post spaced (8 to 15 min between any two actions, 40 to 60 min per account).

## 4. Checking replies
Run 4 to 8 h after a round (US working hours): own posts via `get-all-post-comments` (outside comments); target posts via Chrome page text (API has no reply data). Draft a short answer for each, from the person who was replied to, tag the replier, ask one question. Post after approval, 10 to 20 min apart.

## 5. ICP check before any connection request or pitch
For everyone who engaged: read headline + current company (Chrome profile top card). ICP = regulated buyer (bank >= $2B, insurer, payor, utility...) at manager+ level in a workflow, risk or AI role. Not ICP: founders/vendors, consultants, students, analysts, regulators (never pitch), retail. SI/IT-services people = partner route.
Then:
- Check the account in Instantly (`list_leads search:<domain>`, look at `timestamp_last_contact`) and HeyReach. One active person per account, 14-day cooling gap; hold if anyone there was touched in the last 14 days.
- Connection request: short note referencing their post, no pitch.
- M1 only after acceptance (approved architecture: who they are + problem + "I work on this problem, so I am curious: is that true for your team today?"). M2 only after a reply.

## 6. Logging (owner rule 2026-10-13)
- After every round, post a short update to Slack **#comments-and-logs** (`C0C8YRCNYUU`): live, replies, ICP follow-ups/holds, team to-dos, next scheduled.
- Keep the Drive activity log (one row per action: Date, Platform, Account, Action, Target, Link, Text, Status, Notes). No Google Sheets editor connector in chat, so each refresh is a new copy via Drive `create_file` (CSV -> Sheet) unless the owner connects Sheets.

## 7. X (@Moring_AI)
No X API. Post through Claude in Chrome (owner's logged-in browser): `file_upload` caps at 10 MB, so export a 720p copy (`-vf scale=1280:-2,fps=30 -b:v 1100k`, ~9 MB). Account is Premium, so the full LinkedIn text fits. After clicking Post, wait 30+ s before navigating (video processing; navigating early looked like a failed post). Link goes in a reply, not the body. Pin launch posts (... > Pin to your profile).
