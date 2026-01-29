import { editEvent } from "../jxa/events";
import { formatEventUpdated } from "../formatter";
import type { EditOptions } from "../types";

export async function editCommand(
  eventId: string,
  options: EditOptions,
): Promise<void> {
  await editEvent(eventId, options);
  console.log(formatEventUpdated());
}
