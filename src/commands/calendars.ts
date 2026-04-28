import { listCalendars } from "../sqlite/calendar";
import { formatCalendars } from "../formatter";
import type { FormatOptions } from "../types";

export async function calendarsCommand(options: FormatOptions = {}) {
  const calendars = await listCalendars();
  console.log(formatCalendars(calendars, { format: options.format ?? "toon" }));
}
