# Moring GTM Dashboard

Standalone dashboard for Moring AI's ICP coverage, persona mix, outbound analytics, GSC/analytics gaps, and next actionable insights.

## Files

- `index.html` - GitHub Pages-ready standalone dashboard.
- `moring-gtm-dashboard.html` - Codex inline visualization source from the first draft.

## Publish on GitHub Pages

1. Commit the `dashboard/` folder to the GitHub repository.
2. In GitHub, open **Settings -> Pages**.
3. Set the source to the branch that contains this folder.
4. If GitHub Pages is configured for `/docs`, either move `dashboard/index.html` to `docs/index.html` or set up a GitHub Actions Pages workflow.

Direct path after publishing from the repository root:

```text
https://<org-or-user>.github.io/<repo>/dashboard/
```

## Data Snapshot

The dashboard is static. It reflects the workspace state summarized from:

- `docs/Moring_Outbound_Analytics_Messaging_Change_2026-09-19.md`
- `docs/Moring_AI_Site_Live_vs_Missing_2026-09-09.md`
- `docs/Moring_AI_GTM_Strategy_Workflow_Led.md`
- `data/Moring_Master_With_Templates.csv`
- `scripts/metrics_20260912_221401.json`
