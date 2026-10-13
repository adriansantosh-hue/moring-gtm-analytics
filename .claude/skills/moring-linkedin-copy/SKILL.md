---
name: moring-linkedin-copy
description: Write and run Moring (moring.ai) LinkedIn and X content - value-first posts (teach the idea, optional free file, primary sources, human in control, no meeting ask), plus publishing through ConnectSafely, team and outbound comment rounds in a human (not AI-sounding) style, reply checks, ICP follow-up and activity logging. Use when asked to write, rewrite, review, schedule, post, comment, reply, repost or report on LinkedIn or X content for Moring voices or the Moring company page. Includes post anatomy, voices, tagging protocol, claims checklist, copy linter, a ConnectSafely client and engagement playbooks.
---

# Moring LinkedIn copy

Sources of truth: the 16 first posts in `docs/Moring_LinkedIn_X_Value_First_Copy_2026-10-03.md`; the launch-week posts (T1-P3, T2-P3, T4-P3, T5-P3, C-P5, launch film) in `docs/Moring_LinkedIn_Nikhil_Ashvath_Balaji_Company_2026-10-11.md`; comment targets and ICP follow-ups in `docs/Moring_LinkedIn_Comment_Targets_2026-10-13.md`. Free files: `assets/free-value/`. Visuals: `.claude/skills/moring-gif-studio` (GIFs in `assets/gifs/linkedin-square/`, versions without the free-file strip in `assets/gifs/linkedin-square-nofile/`).

A person approves every post, comment, reply, repost, like round, connection request and launch (AGENTS.md). Approval in one round does not carry to the next.

## Writing a post
1. **Pick the voice and title** (`reference/voices.md`). T2 and T6 use workflow language, never "control plane" or "AICP" in the hook.
2. **Pick one question the reader can answer today.** A free file (md, csv, json, rego) is optional: only promise "link in the comments" if the file has a public home. If not, drop the free-file line and make the first comment a practical tip + hashtags (what we did on 2026-10-12). Build and test any file in `assets/free-value/` (run SQL on DuckDB via `uv run --with duckdb`).
3. **Draft from `templates/post-template.md`** (anatomy in `reference/post-anatomy.md`).
4. **Verify every fact** against a primary source, named and dated (`reference/claims-checklist.md`). Unverifiable = cut. Example figures are labeled illustrative.
5. **Tag** per `reference/tagging.md` (max two, only when central, verify the page).
6. **Lint**: `node .claude/skills/moring-linkedin-copy/tools/lint.js path/to/draft.md` (it warns "no free file line" when you dropped it on purpose; that's fine).
7. **Pair the visual** (GIF from moring-gif-studio, alt text = the target keyword question) and get approval from the owner and from the named voice.

## Publishing and engagement
- **How to post, comment, reply, repost, connect:** `reference/connectsafely-playbook.md` + `tools/cs.py` (account IDs, company URN, GIF and video upload, what the API cannot do).
- **How to comment so it doesn't look AI-generated, team engagement timing, outbound comment rounds, reply checks, ICP check + 14-day account rule before any connection request, Slack and Drive logging, posting on X:** `reference/engagement-playbook.md`.
- Spread rounds out (8 to 15 min between actions, 40 to 60 min per account), run them in the background, log every action, and post a summary to Slack #comments-and-logs afterwards.

## The rules (short)
1. Teach the whole thing in the post: 3 to 5 numbered steps the reader can do without clicking.
2. Links go in the **first comment**, never the body (LinkedIn and X).
3. Cite primary sources by name and date.
4. Name real tools; tag at most two company pages, only when central. Never competitors or regulators, never imply partnership.
5. Label illustrative / proposed / modeled / measured / realized. No invented stats, customers or marketplace claims.
6. Human in control in every post.
7. No meeting ask in posts or comments. Close with a practitioner question.
8. First mention in an article: "moring (moring.ai)".
9. Plain, short sentences. No hype, no emoji walls, max 3 hashtags in the first comment.
10. Comments: short, specific, often a question, no pitch, never a fake personal anecdote (see engagement playbook).
11. Never use ConnectSafely `boost`. Never post a pitch in a connection request.

## Output format
Per post: title and ID, free file (or "none"), LinkedIn body, X version (under 280, or full text on @Moring_AI Premium), X reply, first comment, sources, tags, open checks. Save drafts in `docs/` as `Moring_LinkedIn_<topic>_<date>.md`.
