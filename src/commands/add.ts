import dayjs from "dayjs";
import { addEvent } from "../jxa/events";
import { formatEventCreated } from "../formatter";

interface AddCommandOptions {
  title: string;
  start: string;
  end?: string;
  calendar?: string;
  location?: string;
  notes?: string;
  allDay?: boolean;
}

export async function addCommand(options: AddCommandOptions): Promise<void> {
  const startDate = parseDateTime(options.start);
  const endDate = options.end
    ? parseDateTime(options.end, startDate)
    : dayjs(startDate).add(1, "hour").toDate();

  const eventId = await addEvent({
    title: options.title,
    start: startDate.toISOString(),
    end: endDate.toISOString(),
    calendar: options.calendar,
    location: options.location,
    notes: options.notes,
    allDay: options.allDay,
  });

  console.log(formatEventCreated(eventId));
}

function parseDateTime(input: string, referenceDate?: Date): Date {
  const trimmed = input.trim().toLowerCase();

  // Handle relative dates
  if (trimmed === "today") {
    return dayjs().startOf("day").hour(9).toDate();
  }
  if (trimmed === "tomorrow") {
    return dayjs().add(1, "day").startOf("day").hour(9).toDate();
  }
  if (trimmed.startsWith("tomorrow ")) {
    const time = trimmed.replace("tomorrow ", "");
    const [hours, minutes] = parseTime(time);
    return dayjs()
      .add(1, "day")
      .startOf("day")
      .hour(hours)
      .minute(minutes)
      .toDate();
  }

  // Handle time-only input (use reference date or today)
  if (/^\d{1,2}:\d{2}$/.test(trimmed) || /^\d{1,2}(am|pm)$/i.test(trimmed)) {
    const [hours, minutes] = parseTime(trimmed);
    const base = referenceDate ? dayjs(referenceDate) : dayjs();
    return base.startOf("day").hour(hours).minute(minutes).toDate();
  }

  // Standard date parsing
  const parsed = dayjs(input);
  if (!parsed.isValid()) {
    throw new Error(`Invalid date/time: ${input}`);
  }
  return parsed.toDate();
}

function parseTime(time: string): [number, number] {
  const ampm = time.match(/(am|pm)$/i);
  const cleaned = time.replace(/(am|pm)$/i, "").trim();

  let hours: number;
  let minutes = 0;

  if (cleaned.includes(":")) {
    const parts = cleaned.split(":");
    hours = parseInt(parts[0] ?? "0", 10);
    minutes = parseInt(parts[1] ?? "0", 10);
  } else {
    hours = parseInt(cleaned, 10);
  }

  if (ampm?.[1]) {
    if (ampm[1].toLowerCase() === "pm" && hours !== 12) {
      hours += 12;
    } else if (ampm[1].toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }
  }

  return [hours, minutes];
}
