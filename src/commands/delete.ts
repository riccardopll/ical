import { deleteEvent } from "../jxa/events";
import { formatEventDeleted } from "../formatter";

export async function deleteCommand(eventId: string): Promise<void> {
  await deleteEvent(eventId);
  console.log(formatEventDeleted());
}
