import { Option, program } from "commander";
import { calendarsCommand } from "./commands/calendars";
import { listCommand } from "./commands/list";

const cliVersion = process.env.ICAL_VERSION ?? "0.0.0-dev";
const outputFormats = ["toon"];

program
  .name("ical")
  .description("Read-only macOS Calendar CLI")
  .version(cliVersion);

program
  .command("calendars")
  .description("List all calendars")
  .addOption(formatOption())
  .action(calendarsCommand);

program
  .command("list")
  .description("List events")
  .option("-d, --days <number>", "Number of days to show", "1")
  .option("-f, --from <date>", "Start date (YYYY-MM-DD)")
  .option("-t, --to <date>", "End date (YYYY-MM-DD)")
  .option("-c, --calendar <id>", "Filter by calendar id")
  .addOption(formatOption())
  .action(listCommand);

program.parse();

function formatOption() {
  return new Option("--format <format>", "Output format")
    .choices(outputFormats)
    .default("toon");
}
