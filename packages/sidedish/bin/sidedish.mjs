#!/usr/bin/env node
// pnpm dlx sidedish init: installs sidedish + Tailwind v4 and wires them into your Next.js app. No prompts.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

const args = process.argv.slice(2), cwd = process.cwd();
const has = (f) => existsSync(join(cwd, f));
const fail = (m) => { console.error("✖ " + m); process.exit(1); };

if ((args[0] ?? "init") !== "init") fail("Usage: sidedish init [--no-install] [--no-fonts]");
if (!has("package.json")) fail("No package.json here. Run this in your Next.js project root.");

if (!args.includes("--no-install")) {
  // Lockfile first; without one (new app, or a workspace package) use whoever ran us, else pnpm.
  const ran = process.env.npm_config_user_agent?.match(/^(pnpm|npm|yarn|bun)\//)?.[1];
  const name = has("pnpm-lock.yaml") ? "pnpm" : has("yarn.lock") ? "yarn" : has("bun.lockb") || has("bun.lock") ? "bun" : has("package-lock.json") ? "npm" : ran ?? "pnpm";
  const pm = name === "npm" ? "npm install" : `${name} add`;
  const pkgs = "sidedish tailwindcss @tailwindcss/postcss postcss";
  console.log(`→ ${pm} ${pkgs}`);
  execSync(`${pm} ${pkgs}`, { stdio: "inherit", cwd });
}

// Tailwind v4 needs the PostCSS plugin. Keep any config the project already has.
if (!["postcss.config.mjs", "postcss.config.js", "postcss.config.cjs"].some(has)) {
  writeFileSync(join(cwd, "postcss.config.mjs"), 'export default { plugins: { "@tailwindcss/postcss": {} } };\n');
  console.log("✓ Created postcss.config.mjs");
} else console.log("• postcss config already exists. Make sure it uses @tailwindcss/postcss.");

const dirs = ["src/app", "app"];
const find = (name) => dirs.flatMap((d) => ["tsx", "jsx", "js"].map((e) => `${d}/${name}.${e}`)).find(has);
const layout = find("layout");
const manual = `\nAdd this to your root layout:\n\n  import "./globals.css";\n  import { Sidedish } from "sidedish";\n\n  <body>\n    <Sidedish />\n    {children}\n  </body>\n\nAnd to globals.css:\n\n  @import "tailwindcss";\n  @import "sidedish/sidedish.css";\n`;
if (!layout) fail("No app/layout found (App Router)." + manual);

// globals.css: Tailwind first, then Sidedish (its rules live in Tailwind layers, so your utilities always win).
const css = dirs.map((d) => `${d}/globals.css`).find(has) ?? `${layout.split("/").slice(0, -1).join("/")}/globals.css`;
let c = has(css) ? readFileSync(join(cwd, css), "utf8") : "";
if (!c.includes("sidedish")) {
  const add = (args.includes("--no-fonts") ? "" : '@import "sidedish/fonts.css";\n') + (c.includes('"tailwindcss"') ? "" : '@import "tailwindcss";\n') + '@import "sidedish/sidedish.css";\n';
  writeFileSync(join(cwd, css), add + c);
  console.log(`✓ Patched ${css}`);
}

let src = readFileSync(join(cwd, layout), "utf8");
if (src.includes("sidedish")) { console.log(`✓ ${layout} already uses Sidedish.`); process.exit(0); }
if (!/<body[^>]*>/.test(src)) fail(`Couldn't find <body> in ${layout}.` + manual);

// Keep a leading "use …" directive on top.
const dir = src.match(/^\s*["']use \w+["'];?\s*\n/);
const at = dir ? dir[0].length : 0;
const imp = (/globals\.css/.test(src) ? "" : 'import "./globals.css";\n') + 'import { Sidedish } from "sidedish";\n';
src = src.slice(0, at) + imp + src.slice(at);
src = src.replace(/<body[^>]*>/, (m) => `${m}\n        <Sidedish />`);
writeFileSync(join(cwd, layout), src);

console.log(`✓ Patched ${layout}
✓ Sidedish is ready. Try it in any page:

  <button data-tone="good" className="md:w-auto w-full">Hello Sidedish</button>

Docs: open the Sidedish docs site → Installation`);
