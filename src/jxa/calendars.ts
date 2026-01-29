import { runJxa } from "./runner";
import type { Calendar } from "../types";

export async function listCalendars(): Promise<Calendar[]> {
  const script = `
    (function() {
      var Calendar = Application("Calendar");
      var names = Calendar.calendars.name();
      var result = [];
      for (var i = 0; i < names.length; i++) {
        result.push({
          id: names[i],
          name: names[i],
          color: ""
        });
      }
      return JSON.stringify(result);
    })();
  `;
  return runJxa<Calendar[]>(script);
}

export async function getCalendarByName(
  name: string,
): Promise<Calendar | null> {
  const calendars = await listCalendars();
  return (
    calendars.find((c) => c.name.toLowerCase() === name.toLowerCase()) || null
  );
}
