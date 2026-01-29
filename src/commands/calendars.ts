import { listCalendars } from "../jxa/calendars";
import { formatCalendars } from "../formatter";

export async function calendarsCommand(): Promise<void> {
  const calendars = await listCalendars();
  console.log(formatCalendars(calendars));
}
