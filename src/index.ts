import { program } from "commander";
import { calendarsCommand } from "./commands/calendars";
import { listCommand } from "./commands/list";
import { addCommand } from "./commands/add";
import { editCommand } from "./commands/edit";
import { deleteCommand } from "./commands/delete";

program.name("ical").description("macOS Calendar CLI").version("0.0.1");

program
  .command("calendars")
  .description("List all calendars")
  .action(calendarsCommand);

program
  .command("list")
  .description("List events")
  .option("-d, --days <number>", "Number of days to show", "1")
  .option("-f, --from <date>", "Start date (YYYY-MM-DD)")
  .option("-t, --to <date>", "End date (YYYY-MM-DD)")
  .option("-c, --calendar <name>", "Filter by calendar name")
  .action(listCommand);

program
  .command("add")
  .description("Add a new event")
  .requiredOption("--title <title>", "Event title")
  .requiredOption("--start <datetime>", "Start date/time")
  .option("--end <datetime>", "End date/time (defaults to 1 hour after start)")
  .option("-c, --calendar <name>", "Calendar name", "Calendar")
  .option("--location <location>", "Event location")
  .option("--notes <notes>", "Event notes")
  .option("--all-day", "Create an all-day event")
  .action(addCommand);

program
  .command("edit <event-id>")
  .description("Edit an existing event")
  .option("--title <title>", "New event title")
  .option("--start <datetime>", "New start date/time")
  .option("--end <datetime>", "New end date/time")
  .option("--location <location>", "New event location")
  .option("--notes <notes>", "New event notes")
  .action(editCommand);

program
  .command("delete <event-id>")
  .description("Delete an event")
  .action(deleteCommand);

program.parse();
