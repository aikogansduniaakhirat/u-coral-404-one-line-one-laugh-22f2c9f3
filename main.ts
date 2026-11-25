/**
 * One Line, One Laugh — entry.
 *
 * The whole deliverable is one line of at most 200 characters, written to
 * ${MAKEFUN_OUTPUT_DIR:-/output}/entry.txt. Stdlib only, no network, no deps.
 *
 * The line is a single domestic observation that reports a totally normal
 * event for most of its length and then turns on the last three words: the
 * dog is not the strange one, the absence he is shouting at is. Nothing is
 * explained. The cap is enforced here rather than trusted to the grader.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My dog has been barking at nothing for an hour, and I'm starting to think the nothing is cornered.";

const MAX_CHARS = 200;
const OUT_NAME = "entry.txt";

function compose(): string {
  const text = LINE.normalize("NFC").trim();
  // Count code points, not UTF-16 units: the gate measures characters.
  const chars = [...text].length;
  if (chars < 1) throw new Error("line is empty");
  if (chars > MAX_CHARS) throw new Error(`line is ${chars} chars, cap ${MAX_CHARS}`);
  return text;
}

function main(): void {
  const dir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(dir, { recursive: true });
  const out = join(dir, OUT_NAME);
  const text = compose();
  writeFileSync(out, text, "utf8");
  process.stderr.write(`wrote ${text.length} chars to ${out}\n`);
}

try {
  main();
} catch (err) {
  process.stderr.write(`entry failed: ${(err as Error).message}\n`);
  process.exit(1);
}
