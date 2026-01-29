import { runJxa } from "./runner";
import type { CalendarEvent, AddOptions, EditOptions } from "../types";

export async function listEvents(
  startDate: Date,
  endDate: Date,
  calendarName?: string,
): Promise<CalendarEvent[]> {
  const calendarFilter = calendarName
    ? `calNames = calNames.filter(function(n) { return n.toLowerCase() === "${calendarName.toLowerCase()}"; });`
    : "";

  const script = `
    (function() {
      var Calendar = Application("Calendar");
      var startDate = new Date(${startDate.getTime()});
      var endDate = new Date(${endDate.getTime()});
      var calNames = Calendar.calendars.name();
      ${calendarFilter}
      var result = [];
      for (var i = 0; i < calNames.length; i++) {
        var calName = calNames[i];
        var cal = Calendar.calendars.byName(calName);
        var events = cal.events.whose({
          _and: [
            { startDate: { _greaterThan: startDate } },
            { startDate: { _lessThan: endDate } }
          ]
        })();
        for (var j = 0; j < events.length; j++) {
          var ev = events[j];
          result.push({
            id: ev.uid(),
            calendarId: calName,
            calendarName: calName,
            title: ev.summary(),
            startDate: ev.startDate().toISOString(),
            endDate: ev.endDate().toISOString(),
            location: ev.location() || "",
            notes: ev.description() || "",
            allDay: ev.alldayEvent()
          });
        }
      }
      result.sort(function(a, b) {
        return new Date(a.startDate) - new Date(b.startDate);
      });
      return JSON.stringify(result);
    })();
  `;

  const events = await runJxa<any[]>(script);

  // Deduplicate by event ID (same event may appear in multiple calendars with same name)
  const seen = new Set<string>();
  const unique = events.filter((e) => {
    if (seen.has(e.id)) return false;
    seen.add(e.id);
    return true;
  });

  return unique.map((e) => ({
    ...e,
    startDate: new Date(e.startDate),
    endDate: new Date(e.endDate),
  }));
}

export async function addEvent(options: AddOptions): Promise<string> {
  const startDate = new Date(options.start);
  const endDate = options.end
    ? new Date(options.end)
    : new Date(startDate.getTime() + 60 * 60 * 1000);
  const calendarName = options.calendar || "Calendar";

  const script = `
    (function() {
      var Calendar = Application("Calendar");
      var cal = Calendar.calendars.byName("${calendarName}");
      if (!cal.name()) {
        throw new Error("Calendar not found: ${calendarName}");
      }
      var event = Calendar.Event({
        summary: ${JSON.stringify(options.title)},
        startDate: new Date(${startDate.getTime()}),
        endDate: new Date(${endDate.getTime()}),
        location: ${JSON.stringify(options.location || "")},
        description: ${JSON.stringify(options.notes || "")},
        alldayEvent: ${options.allDay || false}
      });
      cal.events.push(event);
      return JSON.stringify({ id: event.uid() });
    })();
  `;

  const result = await runJxa<{ id: string }>(script);
  return result.id;
}

export async function editEvent(
  eventId: string,
  options: EditOptions,
): Promise<void> {
  const updates: string[] = [];

  if (options.title) {
    updates.push(`event.summary = ${JSON.stringify(options.title)};`);
  }
  if (options.start) {
    const startDate = new Date(options.start);
    updates.push(`event.startDate = new Date(${startDate.getTime()});`);
  }
  if (options.end) {
    const endDate = new Date(options.end);
    updates.push(`event.endDate = new Date(${endDate.getTime()});`);
  }
  if (options.location !== undefined) {
    updates.push(`event.location = ${JSON.stringify(options.location)};`);
  }
  if (options.notes !== undefined) {
    updates.push(`event.description = ${JSON.stringify(options.notes)};`);
  }

  if (updates.length === 0) {
    throw new Error("No updates provided");
  }

  const script = `
    (function() {
      var Calendar = Application("Calendar");
      var event = null;
      var calNames = Calendar.calendars.name();
      for (var i = 0; i < calNames.length && !event; i++) {
        var cal = Calendar.calendars.byName(calNames[i]);
        var events = cal.events.whose({ uid: "${eventId}" })();
        if (events.length > 0) {
          event = events[0];
        }
      }
      if (!event) {
        throw new Error("Event not found: ${eventId}");
      }
      ${updates.join("\n      ")}
      return "ok";
    })();
  `;

  await runJxa<string>(script);
}

export async function deleteEvent(eventId: string): Promise<void> {
  const script = `
    (function() {
      var Calendar = Application("Calendar");
      var event = null;
      var cal = null;
      var calNames = Calendar.calendars.name();
      for (var i = 0; i < calNames.length && !event; i++) {
        cal = Calendar.calendars.byName(calNames[i]);
        var events = cal.events.whose({ uid: "${eventId}" })();
        if (events.length > 0) {
          event = events[0];
        }
      }
      if (!event) {
        throw new Error("Event not found: ${eventId}");
      }
      cal.events.byId(event.id()).delete();
      return "ok";
    })();
  `;

  await runJxa<string>(script);
}
