# BigHammer.ai · Cold calendar outreach (Gmail + Google Calendar iOS preview)

Static review site: cold calendar invites and registrant invites rendered as the recipient sees them: the email in Gmail for iOS, the event in Google Calendar for iOS, and the 3-day view where titles truncate.

**Live:** https://adisuja.github.io/bighammer-calendar-outreach/ · **Scorecard:** https://adisuja.github.io/bighammer-calendar-outreach/scorecard.html

## Files
- `index.html` — shell: top bar (controls), side-nav, grid, toast
- `data.js` — ALL copy + sample merge data + link checks. **Edit this file to change copy.** Tokens use `{{token}}`; `SEP` is the one switch for what renders where the source had an em dash.
- `app.js` — channel renderer (maps a cell to a screen)
- `core.js` / `core.css` — shared shell + iPhone frame (identical across the five BigHammer preview repos)
- `gmail.js` / `gmail.css` / `gcal.js` / `gcal.css` — platform chrome
- `scorecard.html` + `scorecard.js` / `scorecard.css` — benchmark scorecard computed live from `data.js`
- `assets/` — images used by the copy

## Data model
campaigns → columns (steps, left → right in send order) → rows (complete paths / variations) → cells (one screen each).
Every cell in a row continues from that row's earlier messages.

Bump the `?v=` query in `index.html` and `scorecard.html` on every push (GitHub Pages caching).
Source of truth for the copy: the BigHammer Google Doc, tab "UPDATED Calendar Outreach" (read 19 Sep 2026).
