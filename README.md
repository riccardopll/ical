# ical-cli

[![CI](https://github.com/riccardopll/ical-cli/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/riccardopll/ical-cli/actions/workflows/ci.yml)

Read-only macOS Calendar CLI built with Bun.

## Install

```bash
brew tap riccardopll/tap
brew install riccardopll/tap/ical-cli
```

## Usage

| Command                                                             | Description                                       | Example                                                                       |
| ------------------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------- |
| `ical calendars`                                                    | List all available calendars.                     | `bun run src/index.ts calendars`                                              |
| `ical list --days <number>`                                         | List events from today through the next `N` days. | `bun run src/index.ts list --days 7`                                          |
| `ical list --from <YYYY-MM-DD> --to <YYYY-MM-DD>`                   | List events within an explicit date range.        | `bun run src/index.ts list --from 2026-03-10 --to 2026-03-12`                 |
| `ical list --calendar <name>`                                       | List events for one calendar, case-insensitive.   | `bun run src/index.ts list --calendar Personal`                               |
| `ical list --from <YYYY-MM-DD> --to <YYYY-MM-DD> --calendar <name>` | Combine date range and calendar filtering.        | `bun run src/index.ts list --from 2026-03-10 --to 2026-03-12 --calendar Work` |
