#!/usr/bin/env node
/**
 * Anthropic University: the one check command.
 *
 * Runs everything CI runs, in the same order, and fails on the first broken step:
 *   1. Validate the question banks           node scripts/build.mjs --check
 *   2. Regenerate outputs and fail if any generated file changed (CI's "in sync" gate)
 *   3. Syntax-check every JS/MJS file in docs/, scripts/ and tests/
 *   4. Run the offline tests in tests/*.test.mjs   node --test
 *   5. Parse every tracked JSON file
 *   6. Check relative links in hand-written markdown resolve to real files
 *   7. Check llms.txt follows the llmstxt.org shape with absolute URLs
 *   8. claude plugin validate --strict on the marketplace and each plugin
 *      (local only: skipped with a notice when the `claude` CLI is not on PATH, as in CI)
 *
 * Usage: node scripts/check.mjs
 * Node stdlib only. No network.
 */

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function step(name, fn) {
  process.stdout.write(`- ${name} ... `);
  try {
    const note = fn();
    console.log(note ? `ok (${note})` : "ok");
  } catch (e) {
    console.log("FAIL");
    console.log(String(e.message || e).replace(/^/gm, "    "));
    failures.push(name);
  }
}

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: ROOT, encoding: "utf8" });
  if (r.error) throw r.error;
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(" ")} exited ${r.status}\n${r.stdout}${r.stderr}`);
  return r.stdout;
}

function trackedFiles() {
  return run("git", ["ls-files", "--cached", "--others", "--exclude-standard"])
    .split("\n")
    .filter(Boolean)
    .filter((f) => !f.startsWith(".worktrees/") && !f.startsWith(".claude/worktrees/"))
    .filter((f) => existsSync(join(ROOT, f)));
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

// Every directory build.mjs writes into.
function generatedSnapshot() {
  const dirs = [join(ROOT, "content"), join(ROOT, "docs", "data")];
  const pluginsDir = join(ROOT, "plugins");
  if (existsSync(pluginsDir)) {
    for (const p of readdirSync(pluginsDir)) dirs.push(join(pluginsDir, p, "data"));
  }
  const snap = new Map();
  const files = dirs.flatMap(walk);
  if (existsSync(join(ROOT, "docs", "llms.txt"))) files.push(join(ROOT, "docs", "llms.txt"));
  for (const f of files) {
    snap.set(relative(ROOT, f), createHash("sha256").update(readFileSync(f)).digest("hex"));
  }
  return snap;
}

console.log("Anthropic University checks\n");

step("validate question banks (build.mjs --check)", () => {
  const out = run(process.execPath, ["scripts/build.mjs", "--check"]);
  return out.match(/Validation passed[^\n]*/)?.[0];
});

step("generated files in sync (build.mjs)", () => {
  const before = generatedSnapshot();
  run(process.execPath, ["scripts/build.mjs"]);
  const after = generatedSnapshot();
  const changed = [...new Set([...before.keys(), ...after.keys()])].filter((k) => before.get(k) !== after.get(k));
  if (changed.length) {
    throw new Error(
      `build.mjs changed ${changed.length} generated file(s). They are now regenerated; review and commit them, then rerun:\n` +
        changed.map((c) => `  ${c}`).join("\n"),
    );
  }
});

step("JS syntax (node --check)", () => {
  const files = trackedFiles().filter((f) => /^(docs|scripts|tests)\/.*\.m?js$/.test(f));
  for (const f of files) run(process.execPath, ["--check", f]);
  return `${files.length} files`;
});

step("offline tests (node --test tests/*.test.mjs)", () => {
  const files = trackedFiles().filter((f) => /^tests\/.*\.test\.mjs$/.test(f));
  if (!files.length) throw new Error("no tests found in tests/");
  const out = run(process.execPath, ["--test", "--test-reporter=tap", ...files]);
  return out.match(/^# pass \d+/m)?.[0].slice(2);
});

step("JSON parses", () => {
  const files = trackedFiles().filter((f) => f.endsWith(".json"));
  for (const f of files) {
    try {
      JSON.parse(readFileSync(join(ROOT, f), "utf8"));
    } catch (e) {
      throw new Error(`${f}: ${e.message}`);
    }
  }
  return `${files.length} files`;
});

step("relative markdown links resolve", () => {
  const generated = /(practice-exam|flashcards)\.md$/;
  const files = trackedFiles().filter((f) => f.endsWith(".md") && !generated.test(f));
  const broken = [];
  for (const f of files) {
    const text = readFileSync(join(ROOT, f), "utf8").replace(/```[\s\S]*?```/g, "");
    for (const m of text.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      const target = m[1];
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      const path = decodeURIComponent(target.split("#")[0]);
      if (!existsSync(join(ROOT, dirname(f), path))) broken.push(`${f}: ${target}`);
    }
  }
  if (broken.length) throw new Error(broken.join("\n"));
  return `${files.length} files`;
});

step("llms.txt format", () => {
  const text = readFileSync(join(ROOT, "llms.txt"), "utf8");
  const lines = text.split("\n");
  const problems = [];
  if (!/^# \S/.test(lines[0])) problems.push("first line must be an H1 title");
  if (!lines.some((l) => l.startsWith("> "))) problems.push("needs a '> ' summary blockquote");
  if (lines.filter((l) => /^# /.test(l)).length !== 1) problems.push("exactly one H1 allowed");
  for (const m of text.matchAll(/\]\(([^)]+)\)/g)) {
    if (!/^https:\/\//.test(m[1])) problems.push(`link is not an absolute https URL: ${m[1]}`);
  }
  if (problems.length) throw new Error(problems.join("\n"));
});

step("plugin manifests (claude plugin validate --strict)", () => {
  const probe = spawnSync("claude", ["--version"], { encoding: "utf8" });
  if (probe.error || probe.status !== 0) return "skipped: claude CLI not on PATH";
  const targets = ["."];
  for (const p of readdirSync(join(ROOT, "plugins"))) targets.push(`plugins/${p}`);
  for (const t of targets) run("claude", ["plugin", "validate", "--strict", t]);
  return `${targets.length} manifests`;
});

console.log("");
if (failures.length) {
  console.log(`${failures.length} check(s) failed: ${failures.join(", ")}`);
  process.exit(1);
}
console.log("All checks passed.");
