// Prints raw and gzipped size of the shipped CSS + JS. Fails if the total passes the 10KB budget.
import { gzipSync } from "node:zlib";
import { readFileSync } from "node:fs";
let total = 0;
for (const f of ["sidedish.css", "sidedish.js"]) {
  const b = readFileSync(new URL(`../packages/sidedish/${f}`, import.meta.url));
  const g = gzipSync(b, { level: 9 }).length;
  total += g;
  console.log(`${f.padEnd(12)} ${String(b.length).padStart(6)} raw ${String(g).padStart(6)} gz`);
}
console.log(`total gz     ${total} bytes`);
if (total > 10240) { console.error("Over the 10KB budget"); process.exit(1); }
