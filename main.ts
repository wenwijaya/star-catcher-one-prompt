// Star Catcher — make.fun program/v1 entrypoint (Node 22, standard library only).
//
// The entry itself is the X post: a short video of an AI agent building this
// tiny browser game from a single prompt. All this program does is hand the
// grader the post's address — it copies POST.json from the repository root
// into the output directory and exits 0. It reads nothing else, writes
// nothing else, and uses no network access and no wall clock, so two runs
// produce the same bytes.
//
// Local check, the way the grader runs it:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// Afterwards out/POST.json is byte for byte this repository's POST.json.

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const repoRoot = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(repoRoot, "POST.json");
const target = join(outDir, "POST.json");

mkdirSync(outDir, { recursive: true });

if (!existsSync(source)) {
  console.error("POST.json not found in the repository root: " + source);
  process.exit(1);
}

try {
  copyFileSync(source, target);
} catch (err) {
  console.error("could not copy POST.json to " + target + ": " + String(err));
  process.exit(1);
}
