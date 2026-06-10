#!/usr/bin/env node
/**
 * setup-repo-convention.js
 *
 * Bootstrap another repo to follow this repo's single-source convention
 * (see ./repo-structure-convention.md):
 *
 *   - AGENTS.md is the single canonical instruction file.
 *   - CLAUDE.md only imports it (`@AGENTS.md`), or is a symlink to AGENTS.md.
 *   - Skills live once under `.agents/skills/`.
 *   - `.claude/skills` is a symlink -> ../.agents/skills (Claude Code only
 *     scans `.claude/skills/` and has no setting to relocate it).
 *
 * Usage:
 *   node setup-repo-convention.js [targetDir] [flags]
 *
 *   targetDir            Repo root to set up. Default: current directory.
 *
 * Flags:
 *   --migrate            If a real `.claude/skills` dir already exists, move its
 *                        contents into `.agents/skills` before symlinking.
 *   --symlink-claude     Make CLAUDE.md a symlink to AGENTS.md instead of an
 *                        `@AGENTS.md` import file.
 *   --force              Overwrite an existing CLAUDE.md that has other content
 *                        (a .bak backup is written first).
 *   --dry-run            Print what would happen without touching the filesystem.
 *   -h, --help           Show this help.
 *
 * Exit code is 0 on success, 1 on a handled error.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// arg parsing
// ---------------------------------------------------------------------------

const argv = process.argv.slice(2);
if (argv.includes('-h') || argv.includes('--help')) {
  printHelp();
  process.exit(0);
}

const flags = new Set(argv.filter((a) => a.startsWith('-')));
const positional = argv.filter((a) => !a.startsWith('-'));

const opts = {
  migrate: flags.has('--migrate'),
  symlinkClaude: flags.has('--symlink-claude'),
  force: flags.has('--force'),
  dryRun: flags.has('--dry-run'),
};

const unknown = [...flags].filter(
  (f) =>
    !['--migrate', '--symlink-claude', '--force', '--dry-run', '-h', '--help'].includes(f)
);
if (unknown.length) {
  fail(`Unknown flag(s): ${unknown.join(', ')}  (use --help)`);
}

const targetDir = path.resolve(positional[0] || process.cwd());

// ---------------------------------------------------------------------------
// logging helpers
// ---------------------------------------------------------------------------

const TAG = opts.dryRun ? '[dry-run] ' : '';
const log = (msg) => console.log(`${TAG}${msg}`);
const skip = (msg) => console.log(`  ok    ${msg}`);
const did = (msg) => console.log(`  ${opts.dryRun ? 'would' : 'done '} ${msg}`);
const warn = (msg) => console.warn(`  warn  ${msg}`);

function fail(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

function printHelp() {
  const text = fs.readFileSync(__filename, 'utf8');
  const banner = text.split('\n').filter((l) => l.startsWith(' *') || l.startsWith('/**'));
  console.log(banner.map((l) => l.replace(/^ \* ?| \*$|^\/\*\*$/g, '')).join('\n').trim());
}

// ---------------------------------------------------------------------------
// fs primitives (dry-run aware)
// ---------------------------------------------------------------------------

function ensureDir(absPath) {
  if (fs.existsSync(absPath)) return;
  if (!opts.dryRun) fs.mkdirSync(absPath, { recursive: true });
}

function writeFile(absPath, content) {
  if (!opts.dryRun) fs.writeFileSync(absPath, content);
}

function rel(p) {
  return path.relative(targetDir, p) || '.';
}

// ---------------------------------------------------------------------------
// content templates
// ---------------------------------------------------------------------------

const AGENTS_STUB = `# AGENTS.md

This file provides guidance to AI coding agents working in this repository.

> When adding or updating project instructions, edit THIS file (AGENTS.md),
> never CLAUDE.md. CLAUDE.md is only an import shim.

## Project Overview

<describe the project>

## Conventions

<build / test / style notes>
`;

const CLAUDE_IMPORT = `@AGENTS.md\n`;

const GITIGNORE_NOTE =
  '# Per-machine harness symlinks (recreated by setup-repo-convention.js) — do not commit\n';

// ---------------------------------------------------------------------------
// steps
// ---------------------------------------------------------------------------

function setupAgentsMd() {
  log('AGENTS.md (canonical instruction file)');
  const p = path.join(targetDir, 'AGENTS.md');
  if (fs.existsSync(p)) {
    skip('AGENTS.md already exists — left untouched');
  } else {
    writeFile(p, AGENTS_STUB);
    did('create AGENTS.md (stub)');
  }
}

function setupClaudeMd() {
  log('CLAUDE.md (import shim -> AGENTS.md)');
  const p = path.join(targetDir, 'CLAUDE.md');
  const stat = fs.existsSync(p) ? fs.lstatSync(p) : null;

  if (opts.symlinkClaude) {
    // want: CLAUDE.md -> AGENTS.md symlink
    if (stat && stat.isSymbolicLink() && fs.readlinkSync(p) === 'AGENTS.md') {
      skip('CLAUDE.md already a symlink -> AGENTS.md');
      return;
    }
    if (stat) replaceExistingClaude(p, stat);
    if (!opts.dryRun) fs.symlinkSync('AGENTS.md', p);
    did('symlink CLAUDE.md -> AGENTS.md');
    ignoreSymlink('/CLAUDE.md');
    return;
  }

  // want: CLAUDE.md containing `@AGENTS.md`
  if (stat && !stat.isSymbolicLink()) {
    const cur = fs.readFileSync(p, 'utf8').trim();
    if (cur === '@AGENTS.md') {
      skip('CLAUDE.md already imports @AGENTS.md');
      return;
    }
    replaceExistingClaude(p, stat);
  } else if (stat && stat.isSymbolicLink()) {
    replaceExistingClaude(p, stat);
  }
  writeFile(p, CLAUDE_IMPORT);
  did('write CLAUDE.md with `@AGENTS.md`');
}

function replaceExistingClaude(p, stat) {
  const hasRealContent =
    !stat.isSymbolicLink() && fs.readFileSync(p, 'utf8').trim().length > 0 &&
    fs.readFileSync(p, 'utf8').trim() !== '@AGENTS.md';
  if (hasRealContent && !opts.force) {
    fail(
      `CLAUDE.md already has its own content. Move it into AGENTS.md, then ` +
        `re-run with --force (a .bak backup will be written).`
    );
  }
  if (hasRealContent) {
    const bak = p + '.bak';
    if (!opts.dryRun) fs.copyFileSync(p, bak);
    did(`back up existing CLAUDE.md -> ${rel(bak)}`);
  }
  if (!opts.dryRun) fs.rmSync(p, { force: true });
}

function setupSkills() {
  log('skills (single source under .agents/skills, symlinked into .claude)');
  const agentsSkills = path.join(targetDir, '.agents', 'skills');
  const claudeDir = path.join(targetDir, '.claude');
  const claudeSkills = path.join(claudeDir, 'skills');

  ensureDir(agentsSkills);
  did(`ensure ${rel(agentsSkills)}/`);
  ensureDir(claudeDir);

  const stat = fs.existsSync(claudeSkills) ? fs.lstatSync(claudeSkills) : null;
  const wantTarget = path.join('..', '.agents', 'skills'); // relative to .claude/

  if (stat && stat.isSymbolicLink()) {
    const cur = fs.readlinkSync(claudeSkills);
    if (cur === wantTarget) {
      skip('.claude/skills already symlinked -> ../.agents/skills');
      return;
    }
    if (!opts.dryRun) fs.rmSync(claudeSkills, { force: true });
    did('replace stale .claude/skills symlink');
  } else if (stat && stat.isDirectory()) {
    if (!opts.migrate) {
      fail(
        `.claude/skills is a real directory. Re-run with --migrate to move its ` +
          `contents into .agents/skills, or merge it manually first.`
      );
    }
    migrateSkills(claudeSkills, agentsSkills);
    if (!opts.dryRun) fs.rmSync(claudeSkills, { recursive: true, force: true });
    did('remove old real .claude/skills (contents migrated)');
  } else if (stat) {
    fail(`.claude/skills exists but is neither a symlink nor a directory.`);
  }

  if (!opts.dryRun) fs.symlinkSync(wantTarget, claudeSkills);
  did('symlink .claude/skills -> ../.agents/skills');
  ignoreSymlink('/.claude/skills');
}

function migrateSkills(fromDir, toDir) {
  const entries = fs.readdirSync(fromDir);
  for (const name of entries) {
    const src = path.join(fromDir, name);
    const dst = path.join(toDir, name);
    if (fs.existsSync(dst)) {
      warn(`skip "${name}" — already exists in .agents/skills (resolve manually)`);
      continue;
    }
    if (!opts.dryRun) fs.renameSync(src, dst);
    did(`migrate skill "${name}" -> .agents/skills/`);
  }
}

// Symlinks are machine-local — they must be recreated per clone (by re-running
// this script), so they are gitignored rather than committed. Append the path
// to .gitignore (creating the file and a header the first time).
function ignoreSymlink(pattern) {
  const p = path.join(targetDir, '.gitignore');
  const existing = fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
  const lines = existing.split('\n').map((l) => l.trim());
  if (lines.includes(pattern)) {
    skip(`.gitignore already ignores ${pattern}`);
    return;
  }
  let block = '';
  if (!existing.includes(GITIGNORE_NOTE.trim())) block += `\n${GITIGNORE_NOTE}`;
  block += `${pattern}\n`;
  const next = existing.endsWith('\n') || existing === '' ? existing + block : existing + '\n' + block;
  writeFile(p, next);
  did(`gitignore ${pattern} (per-machine symlink)`);
}

// ---------------------------------------------------------------------------
// run
// ---------------------------------------------------------------------------

function main() {
  if (!fs.existsSync(targetDir) || !fs.statSync(targetDir).isDirectory()) {
    fail(`target is not a directory: ${targetDir}`);
  }
  log(`Setting up repo convention in: ${targetDir}`);
  if (opts.dryRun) log('(dry run — no files will be changed)');
  console.log('');

  setupAgentsMd();
  setupClaudeMd();
  setupSkills();

  console.log('');
  log('Done. Next: put real skills in .agents/skills/, write AGENTS.md.');
  log('Reminder: keep SKILL.md paths harness-neutral (no hardcoded .claude/.Codex).');
}

main();
