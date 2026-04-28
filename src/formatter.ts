import { encode } from "@toon-format/toon";
import type { Calendar, CalendarEvent, FormatOptions } from "./types";

export function formatCalendars(
  calendars: Calendar[],
  options: FormatOptions = {},
) {
  return formatData(
    {
      calendars: calendars.map((calendar) => ({
        id: calendar.id,
        name: calendar.name,
        color: calendar.color,
        origin: calendar.origin,
      })),
    },
    options,
  );
}

export function formatEvents(
  events: CalendarEvent[],
  options: FormatOptions = {},
) {
  return formatData(
    {
      events: events.map((event) => ({
        id: event.id,
        calendarId: event.calendarId,
        calendarName: event.calendarName,
        title: event.title,
        startDate: event.startDate.toISOString(),
        endDate: event.endDate.toISOString(),
        location: event.location ?? "",
        notes: event.notes ?? "",
        allDay: event.allDay,
      })),
    },
    options,
  );
}

function formatData(data: unknown, options: FormatOptions) {
  const format = options.format ?? "toon";

  if (format === "toon") {
    return encode(data);
  }

  throw new Error(`Unsupported output format: ${format}`);
}
