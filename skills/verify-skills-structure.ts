#!/usr/bin/env -S npx tsx
/**
 * verify-skills-structure — consolidate agent skills into a single canonical `.agents/skills`
 * directory and make every other tool directory (e.g. `.claude/skills`) a RELATIVE symlink to it.
 *
 * Design rules enforced:
 *   - `.agents/skills` is the single source of truth (real folders live only here).
 *   - Every tool dir is a *relative* symlink → its scope's `.agents/skills`.
 *   - Same-scope pairing only (never link ~/.claude/skills into a project's .agents/skills).
 *   - Destructive by nature, so DRY-RUN is the default. Pass --apply to actually change things.
 *
 * Cross-platform: macOS, Linux, Windows.
 *   - Windows directory symlinks use type 'dir' and need Developer Mode or Administrator.
 *     (Junctions are not usable here because they cannot be relative.)
 *     Use --copy-fallback to copy instead of symlink when privilege is unavailable.
 *
 * Run:  npx tsx verify-skills-structure.ts [--home] [--project [dir]] [--apply] [--verify]
 *                                 [--copy-fallback] [--json]
 * Zero runtime dependencies (Node built-ins only).
 */

import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { createHash } from 'node:crypto';

// ---------------------------------------------------------------------------
// tiny report/logger
// ---------------------------------------------------------------------------
type Level = 'ok' | 'info' | 'warn' | 'error' | 'change';
interface Entry { level: Level; msg: string; }
const entries: Entry[] = [];
const log = (level: Level, msg: string) => entries.push({ level, msg });

const SYMBOL: Record<Level, string> = {
  ok: '✓', info: 'ℹ', warn: '⚠', error: '✗', change: '→',
};

// ---------------------------------------------------------------------------
// path & fs helpers
// ---------------------------------------------------------------------------
function expandHome(p: string): string {
  if (p === '~') return os.homedir();
  if (p.startsWith('~/') || p.startsWith('~\\')) return path.join(os.homedir(), p.slice(2));
  return p;
}
async function lstatSafe(p: string) {
  try { return await fs.lstat(p); } catch { return null; }
}
async function realpathSafe(p: string) {
  try { return await fs.realpath(p); } catch { return path.resolve(p); }
}
function pathEq(a: string, b: string): boolean {
  return process.platform === 'win32' ? a.toLowerCase() === b.toLowerCase() : a === b;
}
async function readlinkResolved(linkPath: string) {
  const raw = await fs.readlink(linkPath);           // exactly what is stored (rel or abs)
  const resolved = path.resolve(path.dirname(linkPath), raw);
  return { raw, resolved };
}
async function removeAny(p: string) {
  const st = await lstatSafe(p);
  if (!st) return;
  if (st.isSymbolicLink() || st.isFile()) await fs.unlink(p);
  else await fs.rm(p, { recursive: true, force: true });
}
async function moveDir(src: string, dest: string) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  try {
    await fs.rename(src, dest);
  } catch (e: any) {
    if (e && e.code === 'EXDEV') {           // cross-device: copy then remove
      await fs.cp(src, dest, { recursive: true });
      await fs.rm(src, { recursive: true, force: true });
    } else throw e;
  }
}

// content hash of a skill folder (path + bytes of every regular file, order-independent)
async function hashDir(dir: string): Promise<string> {
  const files: string[] = [];
  async function walk(d: string) {
    const es = await fs.readdir(d, { withFileTypes: true });
    for (const e of es) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) await walk(full);
      else if (e.isFile()) files.push(full);
    }
  }
  await walk(dir);
  files.sort();
  const h = createHash('sha256');
  for (const f of files) {
    const rel = path.relative(dir, f).split(path.sep).join('/');
    h.update(rel); h.update('\0');
    h.update(await fs.readFile(f)); h.update('\0');
  }
  return h.digest('hex');
}

// newest mtime anywhere in the tree
async function dirMtime(dir: string): Promise<number> {
  let max = 0;
  async function walk(d: string) {
    for (const e of await fs.readdir(d, { withFileTypes: true })) {
      const full = path.join(d, e.name);
      const st = await lstatSafe(full);
      if (st && st.mtimeMs > max) max = st.mtimeMs;
      if (e.isDirectory()) await walk(full);
    }
  }
  const st = await lstatSafe(dir);
  if (st) max = st.mtimeMs;
  try { await walk(dir); } catch { /* ignore */ }
  return max;
}

// SKILL.md is standardized on name/description/license/compatibility/metadata — no first-class
// `version`. So we look for a top-level `version:` OR `metadata.version`, and fall back to mtime.
async function readSkillVersion(dir: string): Promise<string | null> {
  let text: string;
  try { text = await fs.readFile(path.join(dir, 'SKILL.md'), 'utf8'); } catch { return null; }
  const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return null;
  const fm = fmMatch[1];
  const top = fm.match(/^\s*version:\s*["']?([^"'\r\n]+)/m);
  if (top) return top[1].trim();
  const meta = fm.match(/^metadata:\s*\r?\n([\s\S]*?)(?=^\S|$(?![\r\n]))/m);
  if (meta) {
    const v = meta[1].match(/^\s+version:\s*["']?([^"'\r\n]+)/m);
    if (v) return v[1].trim();
  }
  return null;
}
function cmpVersion(a: string, b: string): number | null {
  const pa = a.split(/[^0-9]+/).filter(Boolean).map(Number);
  const pb = b.split(/[^0-9]+/).filter(Boolean).map(Number);
  if (!pa.length || !pb.length) return null;
  const n = Math.max(pa.length, pb.length);
  for (let i = 0; i < n; i++) {
    const x = pa[i] ?? 0, y = pb[i] ?? 0;
    if (x !== y) return x > y ? 1 : -1;
  }
  return 0;
}
// returns 'a' if a is the one to keep (newer/preferred), else 'b'
async function pickNewer(a: string, b: string): Promise<'a' | 'b'> {
  const [va, vb] = await Promise.all([readSkillVersion(a), readSkillVersion(b)]);
  if (va && vb) {
    const c = cmpVersion(va, vb);
    if (c !== null && c !== 0) return c > 0 ? 'a' : 'b';
  }
  const [ma, mb] = await Promise.all([dirMtime(a), dirMtime(b)]);
  return ma >= mb ? 'a' : 'b';
}

// ---------------------------------------------------------------------------
// core operations
// ---------------------------------------------------------------------------
async function archive(src: string, canonical: string, apply: boolean) {
  const name = path.basename(src);
  const base = path.join(canonical, '..', 'archive-skill');
  let dest = path.join(base, name);
  if (await lstatSafe(dest)) {
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    dest = path.join(base, `${name}__${ts}`);
  }
  log('change', `archive: ${short(src)} → ${short(dest)}`);
  if (apply) await moveDir(src, dest);
}

async function makeRelSymlink(linkPath: string, canonical: string, copyFallback: boolean) {
  await fs.mkdir(path.dirname(linkPath), { recursive: true });
  await removeAny(linkPath);
  const target = path.relative(path.dirname(linkPath), canonical); // e.g. ../.agents/skills
  try {
    // 'dir' is required on Windows; ignored on POSIX.
    await fs.symlink(target, linkPath, 'dir');
    log('change', `symlink: ${short(linkPath)} → ${target}`);
  } catch (e: any) {
    if (copyFallback) {
      log('warn', `${short(linkPath)}: symlink failed (${e.code}); copying instead — ` +
        `this breaks single-source-of-truth (future edits won't sync)`);
      if (!(await lstatSafe(linkPath))) await fs.cp(canonical, linkPath, { recursive: true });
    } else {
      throw new Error(
        `symlink failed ${short(linkPath)} → ${target}: ${e.code}. ` +
        `On Windows enable Developer Mode or run as Administrator, or pass --copy-fallback.`);
    }
  }
}

async function verifyLink(canonical: string, linkPath: string) {
  const st = await lstatSafe(linkPath);
  if (!st) { log('info', `${short(linkPath)}: missing (would be created on --apply)`); return; }
  if (st.isSymbolicLink()) {
    const { raw, resolved } = await readlinkResolved(linkPath);
    const targetExists = await lstatSafe(resolved);
    if (!targetExists) { log('error', `${short(linkPath)}: broken symlink → ${raw}`); return; }
    const same = pathEq(await realpathSafe(resolved), await realpathSafe(canonical));
    if (!same) log('error', `${short(linkPath)}: points to ${short(resolved)} (expected ${short(canonical)})`);
    else if (path.isAbsolute(raw)) log('warn', `${short(linkPath)}: correct but ABSOLUTE (you asked for relative) → ${raw}`);
    else log('ok', `${short(linkPath)}: relative symlink OK → ${raw}`);
  } else if (st.isDirectory()) {
    log('warn', `${short(linkPath)}: real directory, not a symlink (run --apply to consolidate)`);
  } else {
    log('error', `${short(linkPath)}: unexpected file type`);
  }
}

async function consolidateAndLink(
  canonical: string, linkPath: string, apply: boolean, copyFallback: boolean,
) {
  const st = await lstatSafe(linkPath);

  // already a symlink — verify / repair
  if (st && st.isSymbolicLink()) {
    const { raw, resolved } = await readlinkResolved(linkPath);
    const ok = (await lstatSafe(resolved))
      && pathEq(await realpathSafe(resolved), await realpathSafe(canonical))
      && !path.isAbsolute(raw);
    if (ok) { log('ok', `${short(linkPath)}: already a correct relative symlink`); return; }
    log('change', `repair symlink: ${short(linkPath)}`);
    if (apply) await makeRelSymlink(linkPath, canonical, copyFallback);
    return;
  }

  // missing — just create the link
  if (!st) {
    log('change', `create symlink: ${short(linkPath)}`);
    if (apply) await makeRelSymlink(linkPath, canonical, copyFallback);
    return;
  }

  // a real file where a dir/symlink should be — refuse to clobber
  if (!st.isDirectory()) {
    log('error', `${short(linkPath)}: unexpected file (not a directory); skipping`);
    return;
  }

  // a real directory — consolidate each skill into canonical
  await fs.mkdir(canonical, { recursive: true }).catch(() => {});
  const es = await fs.readdir(linkPath, { withFileTypes: true });
  let leftovers = 0;
  for (const e of es) {
    const src = path.join(linkPath, e.name);
    if (!e.isDirectory()) { log('warn', `${short(src)}: skipped (non-folder under skills/)`); leftovers++; continue; }
    const canon = path.join(canonical, e.name);
    const canonSt = await lstatSafe(canon);

    if (!canonSt) {                          // new skill → move to canonical
      log('change', `move: ${short(src)} → ${short(canon)}`);
      if (apply) await moveDir(src, canon);
      continue;
    }
    const [h1, h2] = await Promise.all([hashDir(src), hashDir(canon)]);
    if (h1 === h2) {                         // identical duplicate → archive the link copy
      log('change', `duplicate (identical): ${e.name} — archiving link copy`);
      await archive(src, canonical, apply);
    } else {                                 // same name, different content → keep newer
      const keep = await pickNewer(src, canon); // 'a'=src(link), 'b'=canon
      if (keep === 'a') {
        log('change', `version-conflict: ${e.name} — link copy is newer; archiving canonical`);
        await archive(canon, canonical, apply);
        log('change', `move: ${short(src)} → ${short(canon)}`);
        if (apply) await moveDir(src, canon);
      } else {
        log('change', `version-conflict: ${e.name} — canonical is newer; archiving link copy`);
        await archive(src, canonical, apply);
      }
    }
  }

  if (!apply) { log('info', `${short(linkPath)}: after --apply this dir becomes a relative symlink`); return; }

  const remaining = (await fs.readdir(linkPath)).length;
  if (remaining === 0 && leftovers === 0) {
    await fs.rmdir(linkPath);
    await makeRelSymlink(linkPath, canonical, copyFallback);
  } else {
    log('warn', `${short(linkPath)}: ${remaining} item(s) left; NOT converted to symlink — review manually`);
  }
}

// shorten home dir for readable logs
function short(p: string): string {
  const h = os.homedir();
  return p.startsWith(h) ? '~' + p.slice(h.length) : p;
}

// ---------------------------------------------------------------------------
// scopes
// ---------------------------------------------------------------------------
interface Scope { label: string; canonical: string; links: string[]; }

async function processScope(s: Scope, opts: { apply: boolean; verifyOnly: boolean; copyFallback: boolean }) {
  log('info', `── scope: ${s.label} — canonical ${short(s.canonical)}`);

  // canonical must be a real directory, never a symlink
  const cst = await lstatSafe(s.canonical);
  if (cst?.isSymbolicLink()) {
    log('error', `${short(s.canonical)}: canonical must be a real folder, but it is a symlink`);
  } else if (cst?.isDirectory()) {
    const n = (await fs.readdir(s.canonical)).length;
    log('ok', `${short(s.canonical)}: canonical folder OK (${n} entr${n === 1 ? 'y' : 'ies'})`);
  } else if (!cst) {
    if (opts.apply && !opts.verifyOnly) { await fs.mkdir(s.canonical, { recursive: true }); log('change', `created ${short(s.canonical)}`); }
    else log('info', `${short(s.canonical)}: does not exist yet`);
  } else {
    log('error', `${short(s.canonical)}: exists but is not a directory`);
  }

  for (const link of s.links) {
    if (opts.verifyOnly) await verifyLink(s.canonical, link);
    else await consolidateAndLink(s.canonical, link, opts.apply, opts.copyFallback);
  }
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
function parseArgs(argv: string[]) {
  const o = { apply: false, verify: false, home: false, project: undefined as string | undefined,
    projectSet: false, copyFallback: false, json: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '--apply': o.apply = true; break;
      case '--verify': o.verify = true; break;
      case '--home': o.home = true; break;
      case '--project': o.projectSet = true;
        if (argv[i + 1] && !argv[i + 1].startsWith('--')) o.project = argv[++i];
        break;
      case '--copy-fallback': o.copyFallback = true; break;
      case '--json': o.json = true; break;
      case '-h': case '--help': o.help = true; break;
      default: log('warn', `unknown arg ignored: ${a}`);
    }
  }
  return o;
}

const HELP = `skills-linkctl — consolidate agent skills into .agents/skills with relative symlinks

USAGE
  npx tsx skills/verify-skills-structure.ts [--home] [--project [dir]] [--apply] [--verify] [--copy-fallback] [--json]

SCOPES (same-scope pairing only; a tool dir links to its own scope's canonical)
  project (default)   <cwd|dir>/.claude/skills  →  <cwd|dir>/.agents/skills
  --home              ~/.claude/skills          →  ~/.agents/skills

MODES
  (default)           DRY-RUN: print what would happen, change nothing
  --apply             perform moves / archives / symlink creation
  --verify            only check existing symlinks/layout, never change

OPTIONS
  --project [dir]     operate on a project root (defaults to cwd if dir omitted)
  --copy-fallback     if symlink creation fails (e.g. Windows w/o Developer Mode), copy instead
  --json              machine-readable report on stdout
  -h, --help

NOTES
  • .agents/skills is the single source of truth; every other dir is a RELATIVE symlink to it.
  • Duplicates: identical content → link copy archived; same name / different content →
    newer kept (SKILL.md version if present, else newest mtime), older moved to .agents/archive-skill/.
  • Codex / opencode / Gemini read .agents/skills natively, so they usually need NO symlink —
    only Claude Code (.claude/skills) does. Add more links in the scope config if your setup differs.`;

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) { console.log(HELP); return; }

  const scopes: Scope[] = [];
  // project scope is used when explicitly requested, or when no scope flag is given at all
  if (opts.projectSet || !opts.home) {
    const root = path.resolve(opts.project ? expandHome(opts.project) : process.cwd());
    scopes.push({
      label: 'project',
      canonical: path.join(root, '.agents', 'skills'),
      links: [
        path.join(root, '.claude', 'skills'),
        // add more tool dirs here if needed, e.g. path.join(root, '.codex', 'skills'),
      ],
    });
  }
  if (opts.home) {
    const h = os.homedir();
    scopes.push({
      label: 'home',
      canonical: path.join(h, '.agents', 'skills'),
      links: [
        path.join(h, '.claude', 'skills'),
      ],
    });
  }

  const mode = opts.verify ? 'VERIFY' : opts.apply ? 'APPLY' : 'DRY-RUN';
  log('info', `mode: ${mode}${mode === 'DRY-RUN' ? '  (no changes — re-run with --apply to execute)' : ''}`);

  for (const s of scopes) {
    await processScope(s, { apply: opts.apply && !opts.verify, verifyOnly: opts.verify, copyFallback: opts.copyFallback });
  }

  const counts = entries.reduce((m, e) => (m[e.level] = (m[e.level] || 0) + 1, m), {} as Record<Level, number>);
  const hasError = (counts.error || 0) > 0;

  if (opts.json) {
    console.log(JSON.stringify({ mode, entries, counts }, null, 2));
  } else {
    for (const e of entries) console.log(`${SYMBOL[e.level]} ${e.msg}`);
    console.log(`\nsummary: ${counts.ok || 0} ok, ${counts.change || 0} change(s), ` +
      `${counts.warn || 0} warning(s), ${counts.error || 0} error(s)`);
    if (mode === 'DRY-RUN' && (counts.change || 0) > 0) console.log('re-run with --apply to perform the changes above.');
  }
  process.exit(hasError ? 1 : 0);
}

main().catch((e) => { console.error('fatal:', e?.message || e); process.exit(2); });
