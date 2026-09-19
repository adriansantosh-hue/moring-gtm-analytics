# Spotonix GTM Tooling — Self-Connection Guide

How to connect and use the GTM tools for another agent: **Clay (GTM CLI + MCP + Public API)**, **HeyReach (MCP)**, **Instantly (MCP + CLI/API)**.

All tools are already configured on this machine. This doc tells an agent how to *connect itself* to each one (or verify the connection), and the exact quirks/caveats discovered during real use.

---

## 1. Environment variables (already set on this machine)

| Var | Where it's used | Notes |
|---|---|---|
| `CLAY_API_KEY` | Clay public API (`clay-api-key` header) | `clay_scoped_...`, 59 chars |
| `INSTANTLY_API_KEY` | Instantly MCP `Authorization: Bearer` | **Must be the base64 string** (`ZDFiYWY...==`, 68 chars), NOT the decoded `uuid:secret` — see §4 |
| `HEYREACH_MCP_KEY` | HeyReach MCP `X-API-Key` + `Authorization: Bearer` | 44 chars, works for MCP tool calls |
| `HEYREACH_API_KEY` | (separate) HeyReach API | Does **NOT** work on MCP tool calls — MCP key is the one that works |
| `N8N_API_KEY` | n8n MCP | localhost:5678 |
| `FIRECRAWL_API_KEY` | firecrawl MCP (currently broken) | — |

To set them fresh (PowerShell): `setx NAME "value"` then restart the shell/opencode.

---

## 2. opencode MCP config (current, working)

File: `C:\Users\cw_63\.config\opencode\opencode.json`

```jsonc
"instantly": {
  "type": "remote",
  "url": "https://mcp.instantly.ai/mcp",
  "enabled": true,
  "oauth": false,
  "headers": { "Authorization": "Bearer {env:INSTANTLY_API_KEY}" }
},
"heyreach": {
  "type": "remote",
  "url": "https://mcp.heyreach.io/mcp",
  "enabled": true,
  "oauth": false,
  "headers": {
    "X-API-Key": "{env:HEYREACH_MCP_KEY}",
    "Authorization": "Bearer {env:HEYREACH_MCP_KEY}"
  }
},
"clay_mcp": { "type": "remote", "url": "https://www.clay.com/mcp", "headers": { "clay-api-key": "{env:CLAY_API_KEY}" } },
"clay": { "type": "local", "command": ["npx", "-y", "@clayhq/clay-mcp"], "env": { "CLAY_API_KEY": "{env:CLAY_API_KEY}" } },
"beeze": { "type": "remote", "url": "https://app.beeze.ai/api/mcp", "oauth": { "clientId": "mcp_J69yU6ZCe0_iKYev7adr9tpH9X9WTt72" } }
```

**Verify connection:** `opencode mcp list` → all should show `✓ connected`.
**Note:** `tools.beeze_update_campaign_icp` is disabled in config — it has a draft-07 tuple schema (`items: [..]`) that DeepSeek's 2020-12 validator rejects. If you need ICP edits, call Beeze via raw HTTP, or temporarily re-enable when using a lenient model.

---

## 3. Clay — three surfaces

### 3a. Clay Public API (HTTP, simplest, read-only search — NO emails)

- Base: `https://api.clay.com/public/v0`
- Auth header: **`clay-api-key: <CLAY_API_KEY>`** (NOT `x-api-key`)
- Works for: `whoami`, **people/company search**. **Returns NO emails.**

Search flow (verified working):
```
1. POST /search/filters-mode
   body: {"source_type":"people","filters":{"names":["Greg Elenbaas"],"company_identifier":["wine.com"]}}
   → {"search_id":"search_..."}
2. POST /search/filters-mode/{search_id}/run
   body: {"limit":5}
   → data[] with {name, url (LinkedIn), latest_experience_title, latest_experience_company, domain}
```

Useful filters: `names[]`, `company_identifier[]` (domain), `job_title_keywords[]`, `headline_keywords[]`, `company_description_keywords[]`, `location_states_include[]`.

**Primary use case in this project:** verify a person's correct LinkedIn URL + current title/company (used to catch stale DMs and wrong URLs). Example: "is Matthew Shump the right Drata contact?" → search names+domain, check `latest_experience_title`.

### 3b. Clay GTM CLI (WSL2 — THE working path for email enrichment)

- Binary: `/home/claycli/clay` inside **WSL2** (NOT Windows `clay` which is the personal-CRM CLI).
- Version 0.7.0, OAuth device-logged-in (user `adrian santhosh`, workspace 1314398).
- Invoke from Windows PowerShell: `wsl -e bash -c "/home/claycli/clay <args>"`

**Email enrichment routine** (the one that returns work emails):
```
function: t_0tjzyap7vjPsC93dn4F   (Work Email, ~1.1 credits)
POST /routines/{id}/run  {"items":[{"id":"...","inputs":{...}}]}
poll GET /routines/run/{run_id}/results  (--limit 100)
```
- Inputs: Full Name, Company Domain, Company Name, optional Social Profile URL (must be a valid URI — drop if empty).
- **WSL stdout quirk:** you cannot capture WSL stdout with `Out-File` in PowerShell reliably — write the result file **inside WSL**, then `cp` it to `/mnt/c/...`.

Other routines:
- Enrich Person `t_0tjzyacUtABwKeyE56b` (0.5c)
- Find Contact Details `t_0tjzyaeTXcB5tnkcJpn` (12.8c)
- Enrich Person + Find Contact Details `t_0tjzyaeTXcB5tnkcJpn`
- Find People at Company `t_0tjzyaee8cvZSpWDqQ5` (2.6c, top ~10 incl C-suite)

### 3c. Clay CLI (npm global, personal CRM)

- `clay` CLI v1.0.4 at `C:\Users\cw_63\AppData\Roaming\npm\clay.ps1`, logged in as adriansanthosh77@gmail.com.
- Commands: `contacts:search`, `contacts:create`, `groups`, `notes`, `events`, etc.
- **MCP tools (`clay_*` in opencode) do NOT work for GTM data** — they resolve a browser session / personal contacts only. Use the GTM CLI (§3b) or public API (§3a).
- Direct REST to Clay MCP endpoints: `POST https://mcp.clay.earth/tools/v2/{route}` with `Authorization: Bearer <token>` (snake_case fields). Used for bulk group updates.

---

## 4. Instantly — MCP (email automation)

### 4a. Connect
- MCP endpoint: `https://mcp.instantly.ai/mcp`
- Auth: `Authorization: Bearer <INSTANTLY_API_KEY>` where the key is the **base64 string** you were given (`ZDFiYWY...==`). Decoding it yields `uuid:secret` which is the V1 format — **that decoded form is REJECTED** by the V2 API. Use the raw base64 string.
- `oauth: false` in config (it's header-auth, not OAuth).

### 4b. Raw HTTP MCP pattern (if tools aren't in your toolset)
```
POST https://mcp.instantly.ai/mcp
Headers: Content-Type: application/json, Accept: application/json, text/event-stream, Authorization: <base64 key>
Body (init): {"jsonrpc":"2.0","id":1,"method":"initialize","params":{...}}
→ capture mcp-session-id header, send it back on subsequent calls
Body (tools/call): {"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"<tool>","arguments":{...}}}
```
Instantly's MCP **does** return an `mcp-session-id` (unlike HeyReach) — pass it.

### 4c. Key tools / patterns
- `create_campaign` (name, email_list, sequences, schedule, daily_limit, stop_on_reply, open_tracking)
- `add_leads_to_campaign_or_list_bulk` — **per-lead custom variables**: each lead has `custom_variables` with `ceo_e1_body`, `ceo_e1_subject`, `ceo_e2_body`, etc. The sequence templates use `{{ceo_e1_body}}` so **each recipient gets their own message** (true ABM).
- `update_lead` — has **NO email field**; to change a lead's email you must delete + re-add. Can update `custom_variables` (used to fix templates mid-campaign).
- `leads_bulk_delete` (max 50/call), `list_leads` (paginate with `starting_after`), `get_campaign_analytics`, `get_daily_campaign_analytics`
- `list_emails` (Unibox), `reply_to_email`, `get_email`
- `verify_email` — one-off verification (returns verified/invalid/catch_all; ~0.25 credits)
- `activate_campaign` / `pause_campaign`

### 4d. Instantly CLI/API
- **V1 API is deprecated** (Jan 19, 2026). `/api/v1/*` and the `uuid:secret` V1 key do NOT work.
- V2 API base: `https://api.instantly.ai/api/v2` — requires a **V2 key** (Settings → Integrations → API Keys).
- The hosted **MCP server (`mcp.instantly.ai`) is the reliable path** and accepts the base64 key directly — prefer MCP over raw REST for automation.

### 4e. Instantly gotchas (learned in production)
- **Empty `lastName` on upload is fine for Instantly** (but NOT for HeyReach — see §5).
- `open_tracking: false` → open rates show 0 by design (no tracking pixel). Turn on if you want open data.
- A lead that already emailed won't re-send a changed E1 when you edit templates mid-campaign; only not-yet-reached leads pick up the change.
- Group-mailbox / bounced emails: verify before sending; a hard bounce (e.g. `mm@alcon.com` — a group mailbox) should be removed and that account made LinkedIn-only.

---

## 5. HeyReach — MCP (LinkedIn automation)

### 5a. Connect
- MCP endpoint: `https://mcp.heyreach.io/mcp`
- Auth: send **BOTH** headers:
  - `X-API-Key: <HEYREACH_MCP_KEY>`
  - `Authorization: Bearer <HEYREACH_MCP_KEY>`
- `oauth: false`. The **MCP key** works for tool calls; the separate `HEYREACH_API_KEY` does NOT (401 on tool calls).

### 5b. CRITICAL raw HTTP pattern (works, verified)
HeyReach's MCP server needs the **`Mcp-Protocol-Version: 2025-03-26`** header on every request. Without it, `add_leads_to_list_v2` silently returns `0` (creates nothing). With it, adds work.

```
POST https://mcp.heyreach.io/mcp
Headers: Content-Type: application/json,
         Accept: application/json, text/event-stream,
         X-API-Key: <key>, Authorization: Bearer <key>,
         Mcp-Protocol-Version: 2025-03-26
Body (init): {"jsonrpc":"2.0","id":1,"method":"initialize",...}
Body (tools/call): {"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"...","arguments":{...}}}
```
Note: HeyReach does NOT return an `mcp-session-id` — that's fine, just keep the protocol header.

### 5c. Key tools (43 total)
Campaigns: `create_campaign`, `get_campaign`, `get_all_campaigns`, `start_campaign`, `pause_campaign`, `resume_campaign`, `get_campaign_sequence`, `update_campaign_sequence`, `update_campaign_schedule`, `update_campaign_settings`, `update_campaign_accounts`
Leads/Lists: `create_empty_list`, `add_leads_to_list_v2`, `add_leads_to_campaign_v2`, `get_leads_from_list`, `get_leads_from_campaign`, `delete_leads_from_list_by_profile_url`, `get_list_by_id`, `get_all_lists`, `get_leads_from_list`
LinkedIn: `get_all_linked_in_accounts`, `get_linked_in_account_by_id`, `get_my_network_for_sender`
Inbox: `get_conversations_v2`, `get_chatroom`, `send_message`
Other: `get_overall_stats`, `add_tags_to_lead`, `get_tags_for_lead`, `get_campaigns_for_lead`, `create_webhook`, `update_webhook`

### 5d. Per-lead custom messages (ABM)
- Leads carry `customUserFields`: `[{"name":"ceo_note","value":"..."},{"name":"ceo_dm","value":"..."}]`
- The campaign **sequence** references them: connection request message = `{ceo_note}`, post-accept DM = `{ceo_dm}`.
- So each lead's connection note and DM are unique (true ABM).

### 5e. HeyReach gotchas (all learned in production)
1. **Empty `lastName` = silent 0 on add.** `add_leads_to_list_v2` returns `addedLeadsCount: 0` for any lead with `lastName: ""`. Always populate lastName.
2. **Raw urllib needs `Mcp-Protocol-Version` header** (see §5b) or it silently drops adds.
3. **Custom fields persist on update** but may be dropped on brand-new adds via some paths — after any add, **re-verify `customFields`** on the lead; if empty, re-add (update path) to persist.
4. **LinkedIn sender must be ACTIVE, not just Connected.** A campaign can't send from a connected-only account (`isActive: false` in API). Activate in the HeyReach dashboard (Chrome extension).
5. **Daily limits are per LinkedIn account**, shared across campaigns. Configure at LinkedIn accounts → Configure limits (API does NOT expose this — dashboard only). User wanted 10/day then 30/day.
6. **Sequence timing**: connection request → if accepted → message after a 1-day delay. No follow-ups (on hold per user).
7. **Bad profile URLs** → `CannotViewProfileDoesnotExist`. Verify URLs via Clay public API search (§3a) before adding. Common fix: the campaign holds pre-fix lead copies; delete bad-URL leads and re-add with correct ones.
8. **Already-1st-degree leads** → `AlreadyAConnection` (they should get the DM directly, not a connection request).

---

## 6. Quick "am I connected?" checklist for a fresh agent

```
1. env vars present:  $env:CLAY_API_KEY, $env:INSTANTLY_API_KEY, $env:HEYREACH_MCP_KEY
2. opencode mcp list → instantly, heyreach, clay show ✓
3. Instantly: list_campaigns / get_campaign_analytics returns data
4. HeyReach:  get_all_campaigns or get_all_linked_in_accounts returns data
5. Clay public API:  POST /search/filters-mode → run → returns people w/ LinkedIn URLs
6. Clay GTM email (if needed):  wsl -e bash -c "/home/claycli/clay routines runs start t_0tjzyap7vjPsC93dn4F --input ..."
```

---

## 7. Where the data lives

- Sheet web app (Google Apps Script): `https://script.google.com/macros/s/AKfycbx1LBpaBl2M5LeyjlZ32bAuBbuhC5hHq4VCWHRSe9E8ceeHGRuPZWcyjLLk41kgvfWd0A/exec` — GET `?action=export` (all tabs) / POST `{"action":"writeTab","tab":"...","range":"A1:U78","values":[[...]]}` (full-range).
- Campaign IDs:
  - Instantly `Spotonix CEO 77` = `7011cd35-d20b-4f5b-af26-2b7d9ba3ec9f` (213 leads, currently **PAUSED**)
  - HeyReach `Spotonix CEO 77` = campaign `559676`, list `874489` (221 leads, currently **PAUSED**)
- Local truth files in `Temp\opencode\`: `signal_224_voc_fixed.json` (master VOC copy), `ceo77_fixed.csv` (39 corrected DMs w/ verified emails+URLs), `ceo77_final_sheet.json`.

---

## 8. Message copy rules (do not break)

- Every message ends with the CTA: **"let me know if you are interested in a quick demo"**
  - NO "demoing this month", NO trailing `:` or `?` on the CTA, NO capitalized "Let me know".
- LinkedIn Note/DM must stay **≤ 300 chars**.
- VOC voice: `"I'm Venkatesh, CEO of Spotonix, an AI business analyst. Previously I was an investor with 8VC and Capital One Ventures."` + signal hook + value (`teams ask in english, see the plan before it runs, and answers validate against approved definitions`) + CTA.
- No em dashes, no AI-vocabulary words, lowercase openings are deliberate.
