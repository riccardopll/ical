# ical

[![CI](https://github.com/riccardopll/ical/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/riccardopll/ical/actions/workflows/ci.yml)

A small command-line tool for Apple Calendar on macOS.

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
| `ical list --calendar <name>`                     | Limit event results to one calendar.              |
