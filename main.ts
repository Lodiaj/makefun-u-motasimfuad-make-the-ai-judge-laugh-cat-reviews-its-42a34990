// One-star review written by a house cat about its human.
// The grader runs this file; it checks the review and writes it to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const REVIEW =
  "One star. The food bowl was empty for four whole minutes. I screamed. He laughed. I have since moved his favourite mug to the floor. Permanently.";

const MAX_CHARS = 200;

function validateEntry(entry: string): string {
  if (entry.length < 1) throw new Error("entry is empty");
  if (entry.length > MAX_CHARS) {
    throw new Error(`entry is ${entry.length} chars, limit is ${MAX_CHARS}`);
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (entry.trim() !== entry) {
    throw new Error("entry has leading or trailing whitespace");
  }
  if (!/^[\x20-\x7e]+$/.test(entry)) {
    throw new Error("entry must be printable ASCII");
  }
  if (entry.split(/\s+/).length < 3) {
    throw new Error("entry needs at least 3 words");
  }
  if (!/^One star\./.test(entry)) {
    throw new Error("entry must open as a one-star review");
  }
  return entry;
}

const CHECKED = validateEntry(REVIEW);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", CHECKED, "utf8");
console.log(CHECKED);

// Self-check: what was written must match the committed entry text.
const committed = readFileSync("entry.txt", "utf8");
if (committed !== CHECKED) {
  throw new Error("entry.txt on disk does not match the review in main.ts");
}
