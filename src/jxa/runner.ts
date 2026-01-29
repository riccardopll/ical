export async function runJxa<T>(script: string): Promise<T> {
  const proc = Bun.spawn(["osascript", "-l", "JavaScript", "-e", script], {
    stdout: "pipe",
    stderr: "pipe",
  });

  const stdout = await new Response(proc.stdout).text();
  const stderr = await new Response(proc.stderr).text();
  const exitCode = await proc.exited;

  if (exitCode !== 0) {
    throw new Error(`JXA script failed: ${stderr || stdout}`);
  }

  const trimmed = stdout.trim();
  if (!trimmed) {
    return undefined as T;
  }

  try {
    return JSON.parse(trimmed) as T;
  } catch {
    return trimmed as T;
  }
}
