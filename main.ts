// One Line, One Laugh — u-plucky-finch-20-one-line-one-laugh-0ffe66ea
//
// Writes a single funny line (1-200 characters) to /output/entry.txt
// (or to the path/directory given as argv[2]).
//
// The joke: cleaning your room turns up old versions of yourself you
// forgot existed — the punchline reframes tidying as archaeology of
// your own past selves, and lands in the final clause.

import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "I finally cleaned my room and found three versions of myself I don't remember being.";

// Gate: one line, 1-200 characters, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, gate requires 1-200`);
}
if (!ENTRY.trim()) {
  throw new Error("entry is only whitespace");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

function resolveTarget(arg: string | undefined): string {
  if (!arg) return "/output/entry.txt";
  try {
    if (statSync(arg).isDirectory()) return join(arg, "entry.txt");
  } catch {
    // path does not exist yet: treat as a file path
  }
  return arg;
}

const target = resolveTarget(process.argv[2]);
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, ENTRY, "utf8");
console.log(`wrote ${target} (${ENTRY.length} characters)`);
