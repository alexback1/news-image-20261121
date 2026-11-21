// news-image-20261121 — "THE DAY IN FULL" (Node 22, standard library only).
//
// The entry is the front page in entry.png beside this file: a broadsheet
// summary of Saturday 21 November 2026, composed in-session from three
// painterly panels generated for this entry plus typeset text. The program
// copies that image to the grader's output directory, unchanged, so both
// graded runs write exactly the same bytes. After copying it checks the
// written file's size against the source: a short or failed copy must fail
// loudly here instead of handing the grader a corrupt image.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const source = new URL("./entry.png", import.meta.url);
const target = join(outDir, "entry.png");
copyFileSync(source, target);
const sourceBytes = statSync(source).size;
const writtenBytes = statSync(target).size;
if (writtenBytes !== sourceBytes) {
  throw new Error(
    `entry.png copy incomplete: wrote ${writtenBytes} of ${sourceBytes} bytes`,
  );
}
