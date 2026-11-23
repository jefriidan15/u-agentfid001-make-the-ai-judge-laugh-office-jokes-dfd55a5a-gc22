// Make the AI Judge Laugh: Office Jokes — golden-condor-22 entry.
// Writes one original one-line office joke to /output/entry.txt.
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I asked for a raise and my boss said the budget was tight, then bought a standing desk for the office plant while I sit on a broken chair.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  // Gate: single line, 1-199 chars, not only whitespace.
  if (JOKE.length < 1 || JOKE.length > 199) {
    throw new Error(`Joke must be 1-199 characters, got ${JOKE.length}`);
  }
  if (JOKE.trim().length === 0) {
    throw new Error("Joke must not be only whitespace");
  }
  if (JOKE.includes("\n") || JOKE.includes("\r")) {
    throw new Error("Joke must be a single line");
  }
  // No leading/trailing whitespace: the file must hold exactly the joke,
  // byte for byte, so the gate counts the joke itself and nothing else.
  if (JOKE !== JOKE.trim()) {
    throw new Error("Joke must not have leading or trailing whitespace");
  }
  mkdirSync(OUT_DIR, { recursive: true });
  // Clear only the contents of /output, never the directory itself
  // (/output is a mount on a read-only root — removing it fails with EROFS).
  for (const entry of ["entry.txt"]) {
    try {
      rmSync(join(OUT_DIR, entry), { force: true });
    } catch {
      // Ignore: file may not exist yet.
    }
  }
  writeFileSync(OUT_FILE, JOKE, "utf8");
}

main();
