# Moring AI Workspace

This workspace holds Moring AI's GTM strategy, outbound data, campaign automation, web/app scripts, and source-of-truth context for agents.

Moring AI sells governed, production-ready AI for regulated enterprise workflows. The active positioning is **workflow-led**: lead with a named business workflow, accountable owner, measurable outcome, and governed production controls underneath.

## Start Here

1. Read [AGENTS.md](AGENTS.md) for the full workspace context, current campaign state, and operating rules.
2. Read [docs/Moring_AI_GTM_Strategy_Workflow_Led.md](docs/Moring_AI_GTM_Strategy_Workflow_Led.md) before producing any GTM, outreach, positioning, or website copy.
3. Use [WORKSPACE_ARCHITECTURE.md](WORKSPACE_ARCHITECTURE.md) to understand folder ownership and where new artifacts should go.
4. Use [docs/Moring_AI_ONE_Research_Brief_2026-09-01.md](docs/Moring_AI_ONE_Research_Brief_2026-09-01.md) for the consolidated market, competitor, campaign, SEO/GEO/AEO, and execution brief.

## Folder Map

| Path | Purpose |
|---|---|
| `docs/` | Durable strategy, research, GTM, SEO/GEO, competitive, and outreach documents. |
| `data/` | CSV/XLSX source data, lead trackers, enrichment outputs, and campaign/account sheets. |
| `data/generated/` | Regenerable batch files, JSON chunks, upload payloads, and other intermediate artifacts. |
| `automation/` | One-off or operator-run PowerShell scripts. |
| `scripts/` | Scheduled/production sync scripts and state/log files. GitHub Actions expects this path. |
| `apps-script/` | Google Apps Script web apps and HTML surfaces. |
| `assets/` | Documents, screenshots, images, and other binary reference material. |
| `moring-gtm-sync/` | Nested sync repository mirror. Treat as secondary unless explicitly working on that repo. |
| `.github/workflows/` | Top-level GitHub Actions workflow for scheduled HubSpot sync. |
| `.opencode/` | Local agent/tooling configuration and dependencies. Usually do not edit manually. |

## Source Of Truth

The active GTM source of truth is [docs/Moring_AI_GTM_Strategy_Workflow_Led.md](docs/Moring_AI_GTM_Strategy_Workflow_Led.md). It supersedes older AICP-led or workshop-first language.

For quick decisions:

| Need | Read |
|---|---|
| Active GTM motion and CTA | `docs/Moring_AI_GTM_Strategy_Workflow_Led.md` |
| Consolidated research and execution brief | `docs/Moring_AI_ONE_Research_Brief_2026-09-01.md` |
| Revenue targets and scenarios | `docs/Moring_AI_Revenue_Model_Combined.md` |
| SEO/GEO/AEO plan | `docs/Moring_AI_Inbound_GEO_AEO_SEO_Plan_2026-09-08.md` |
| Competitive positioning | `docs/Moring_AI_Actual_Competitors_and_Why_Choose_Us.md` |
| Campaign and tooling notes | `docs/GTM_TOOLING_CONNECTION_GUIDE.md` and `AGENTS.md` |

## Secrets

Do not store live API keys or tokens in tracked/plaintext config files. Local automation should read:

- `INSTANTLY_API_KEY`
- `HEYREACH_MCP_KEY`
- `HUBSPOT_TOKEN`
- `CLAY_API_KEY` when Clay public API access is needed

The local HubSpot sync config uses placeholders and resolves credentials from environment variables.

## Operational Notes

- Figures, campaign status, regulatory references, and market data decay quickly. Re-verify before outbound or strategic claims.
- Keep generated files under `data/generated/`.
- Keep durable strategy edits under `docs/`.
- Keep runnable sync code in `scripts/` unless you also update the GitHub workflow and Windows Task Scheduler path.
