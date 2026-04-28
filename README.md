# ical

A compact Apple Calendar CLI that outputs LLM-friendly data.

## Install

```bash
brew tap riccardopll/tap
brew install riccardopll/tap/ical
```

## Commands

| Command                                           | Description                                       |
| ------------------------------------------------- | ------------------------------------------------- |
| `ical calendars`                                  | List available calendars.                         |
| `ical list`                                       | List events from today through tomorrow.          |
| `ical list --days <number>`                       | List events from today through the next `N` days. |
| `ical list --from <YYYY-MM-DD> --to <YYYY-MM-DD>` | List events within an explicit date range.        |
| `ical list --calendar <id>`                       | Limit event results to one calendar.              |
