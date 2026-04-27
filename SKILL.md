---
name: ical
description: Use the ical command-line tool on macOS to inspect local Calendar data. Trigger for listing calendars, checking upcoming events, querying events by date range, filtering by calendar name, or providing calendar-aware local context.
---

# iCal CLI

Use the installed `ical` executable to inspect macOS Calendar data.

## Workflow

1. Confirm the executable is available:

   ```bash
   command -v ical
   ```

2. If it is missing, stop and tell the user the installed `ical` executable is required before continuing.

3. Discover calendar names before applying a calendar filter:

   ```bash
   ical calendars
   ```

4. Query events with the narrowest useful range:

   ```bash
   ical list
   ical list --days 7
   ical list --from 2026-03-10 --to 2026-03-12
   ical list --from 2026-03-10 --to 2026-03-12 --calendar Work
   ```

5. Summarize command output for the user instead of dumping long event lists unless they ask for raw output.

## Gotchas

- Date arguments must use `YYYY-MM-DD`.
- Calendar filters match calendar names case-insensitively, but the intended name should usually be confirmed with `ical calendars`.
- The default `ical list` window starts today and runs through tomorrow.
- If macOS blocks Calendar data access, ask the user to grant permission to the terminal app in System Settings.
- If the Calendar database is in a non-standard location, run with `ICAL_CALENDAR_DB_PATH=/path/to/Calendar.sqlitedb`.
