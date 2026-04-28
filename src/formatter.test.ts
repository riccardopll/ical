import { describe, expect, it } from "bun:test";
import { formatCalendars, formatEvents } from "./formatter";
import type { Calendar, CalendarEvent } from "./types";

describe("formatCalendars", () => {
  it("formats calendars as TOON", () => {
    const calendars: Calendar[] = [
      { id: "cal-1", name: "Personal", color: "#ff0000", origin: "iCloud" },
      { id: "cal-2", name: "Work", color: "#00ff00", origin: "Work" },
    ];

    expect(formatCalendars(calendars, { format: "toon" })).toBe(
      [
        "calendars[2]{id,name,color,origin}:",
        "  cal-1,Personal,#ff0000,iCloud",
        "  cal-2,Work,#00ff00,Work",
      ].join("\n"),
    );
  });

  it("formats an empty calendar list as TOON", () => {
    expect(formatCalendars([], { format: "toon" })).toBe("calendars[0]:");
  });
});

describe("formatEvents", () => {
  it("formats events as TOON with ISO date strings", () => {
    const events: CalendarEvent[] = [
      {
        id: "evt-1",
        calendarId: "cal-1",
        calendarName: "Personal",
        title: "Morning",
        startDate: new Date("2026-03-10T07:45:00Z"),
        endDate: new Date("2026-03-10T08:30:00Z"),
        location: "Office",
        notes: "",
        allDay: false,
      },
    ];

    expect(formatEvents(events, { format: "toon" })).toBe(
      [
        "events[1]{id,calendarId,calendarName,title,startDate,endDate,location,notes,allDay}:",
        '  evt-1,cal-1,Personal,Morning,"2026-03-10T07:45:00.000Z","2026-03-10T08:30:00.000Z",Office,"",false',
      ].join("\n"),
    );
  });

  it("formats an empty event list as TOON", () => {
    expect(formatEvents([], { format: "toon" })).toBe("events[0]:");
  });

  it("rejects unsupported formats", () => {
    expect(() => formatEvents([], { format: "json" })).toThrow(
      "Unsupported output format: json",
    );
  });
});
