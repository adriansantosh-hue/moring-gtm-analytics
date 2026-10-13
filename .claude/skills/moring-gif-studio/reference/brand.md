# Moring brand tokens for visuals

**Official source (wins over everything below):** Arya Sharan's Drive folder "brand files" (https://drive.google.com/drive/folders/1jKUnvPUMiCoIEV2mahm6FqzPu3eI83Rn), doc "font and colors", read 2026-10-05. Fonts: DM Sans + Geist Mono.

| Role | Hex |
|---|---|
| Coral (primary) | `#FF7649` |
| Coral soft | `#FFA585` |
| Coral wash | `#FFF1EA` |
| Teal | `#0F4147` |
| Deep teal (headings, dark backgrounds) | `#082F34` |
| Teal soft | `#4B8087` |
| Teal wash | `#E6EFF0` |
| Main text | `#082F34` |
| Secondary text | `#5A6A6A` |
| Coral hover | `#F05F30` |
| Page background | `#FFFFFF`, plus warm cream `#F7F4EE` sections |
| Borders | `#DCDFE6` / `#E4E8EC` |

The official guide has no "deep coral". Small coral labels in the GIFs use coral hover `#F05F30` at 16 px or larger (the earlier `#C2481C` was my own choice and is retired). Cards fill cream `#F7F4EE`; highlight fill is teal wash `#E6EFF0`. Logo kit (marks and wordmarks in teal, ink, coral, white, bone, colour; PNG only) is in the Drive folder `logo`; the GIFs still use the site's SVG logo until the kit's vector files are supplied.

Everything below was read from the live site on 2026-10-02 and is superseded by the table above where they differ.

Read from the live site (moring.ai) with the browser tool on 2026-10-02: computed styles, CSS custom properties, header logo.

| Token | Value | Use |
|---|---|---|
| bg | `#FFFFFF` | page ground |
| ink (fg-1) | `#082F34` | headlines, primary text |
| text 2 | `#2E3A3A` / `#5A6A6A` | body, secondary |
| teal | `#0F4147`, soft `#4B8087`, mid `#3F7076`, wash `#E6EFF0` | pass states, eyebrow, panels |
| coral | `#FF7649` | accent, italic key phrase, pulses, DENY |
| coral deep | `#C2481C` | small coral text (contrast on white) |
| coral wash | `#FFF1EA` | highlight tint |
| lines | `#DCDFE6`, `#E4E8EC`, `#C4CBD2` | borders, dividers, tracks |
| button / pill | `#0B0B0C` | black pills (site CTA) |
| shadows | `0 10px 30px #082F341a` family | soft teal shadows |
| fonts | DM Sans (400 / 500 / 700, italic 500 / 700), Geist Mono | headline weight 700, tracking -0.02em; mono captions tracked 0.16em |
| radii | 10 / 14 / 20 px, pills 999 | cards 14 |

Site patterns to echo: headline with one coral italic phrase; small tracked mono eyebrow in teal; white cards with hairline border + soft shadow; dark terminal pane; hero has a coral radial wash with a dotted ripple (approximated here with a coral radial wash + dot grid).

Logo: `https://www.moring.ai/images/logo-moring-dark.svg` (orange mark + teal wordmark, for light backgrounds). `logo-moring-light.svg` has a white wordmark. Strip the `<metadata>` (C2PA, about 8 KB) before embedding.

Voice rules from AGENTS.md that apply to visuals: workflow-led language, human-in-control line, proposed / modeled / measured / realized kept separate, one workflow per post, no meeting ask in the visual.
