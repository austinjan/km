---
title: Repo Structure Convention — single-source instructions & skills
tags: [convention, repo-structure, agents-md, claude-md, skills, symlink, codex, claude-code]
created: 2026-06-10
summary: How this repo avoids duplicated agent instructions and skills — AGENTS.md is the single instruction file, CLAUDE.md only imports it, and all skills live once under .agents/skills/ with symlinks for each harness (Claude Code, Codex).
related: [AGENTS.md, CLAUDE.md, docs/superpowers/specs]
---

# Repo Structure Convention

Single source of truth for agent instructions and skills, so nothing has to be
maintained in two places. Preferred layout for this knowledge-base repo.

## Target Layout

```
repo/
├── AGENTS.md              # 唯一維護的指令檔(<100 行)
├── CLAUDE.md              # 內容只有一行:@AGENTS.md
│                          #   (或 ln -s AGENTS.md CLAUDE.md)
├── .agents/skills/        # skills 真實目錄(SKILL.md 開放標準)
│   └── my-skill/SKILL.md
├── .claude/
│   ├── skills -> ../.agents/skills   # symlink
│   └── rules/             # Claude 專屬的 path-scoped rules(如有需要)
└── .gitignore             # 若 CLAUDE.md 用 symlink,可考慮 ignore
```

## Two Principles

1. **Instructions: AGENTS.md is canonical; CLAUDE.md only imports it.**
   - Maintain *only* `AGENTS.md`. Keep it under ~100 lines.
   - `CLAUDE.md` contains a single import line (`@AGENTS.md`) or is a symlink to
     `AGENTS.md`. Never edit instructions in `CLAUDE.md` directly.
   - Reason: Claude Code reads `CLAUDE.md`, Codex / other agents read
     `AGENTS.md`. The import shim means both harnesses see one source.

2. **Skills: only trust `.agents/skills/`; symlink for each harness.**
   - The real skill files (`SKILL.md`, the open standard) live once under
     `.agents/skills/`.
   - Each harness gets a symlink into that one directory instead of its own copy:
     - Claude Code: `.claude/skills -> ../.agents/skills`
     - Codex: equivalent symlink into its expected skills path
   - Reason: Claude Code only scans `.claude/skills/` (no config to change the
     path), so a symlink is the only way to point it at a shared source. Keeping
     two real copies caused drift (Codex-flavoured `.Codex/...` paths leaking
     into the Claude copy, plus skills existing on only one side).

## Constraints / Gotchas

- **Claude Code has no setting to relocate the skills directory.** It scans
  exactly `.claude/skills/`, `~/.claude/skills/`, and plugin `skills/`. A symlink
  at `.claude/skills` is the supported-in-practice way to share a source; there
  is no `skillsDirectory` config option.
- **SKILL.md paths must be harness-neutral.** Because one file is read by both
  Claude and Codex, avoid hardcoding `.claude/...` or `.Codex/...` inside skills;
  use relative paths so the same file is correct under any harness.
- **Git tracks symlinks**, so committing `.claude/skills` as a symlink is fine.
  If `CLAUDE.md` is a symlink, decide whether to track it or `.gitignore` it.
- **Harness-specific extras** (e.g. Claude path-scoped rules) live in their own
  harness dir (`.claude/rules/`), not in the shared skills source.

## Bootstrapping a New Repo

Use the bundled script to apply this layout to any other repo:

```bash
node docs/setup-repo-convention.js /path/to/other-repo        # set up
node docs/setup-repo-convention.js /path/to/repo --dry-run    # preview only
node docs/setup-repo-convention.js /path/to/repo --migrate    # move an existing real .claude/skills into .agents/skills
node docs/setup-repo-convention.js --help
```

It is idempotent and safe: creates `AGENTS.md` (stub if absent), writes the
`@AGENTS.md` CLAUDE.md shim (`--symlink-claude` to symlink instead; `--force`
to back up + replace existing content), ensures `.agents/skills/`, and points
`.claude/skills` at it via symlink.

## Symlinks Are Per-Machine (gitignored)

Only the **real source** is committed (`.agents/skills/`, `AGENTS.md`,
`CLAUDE.md`). The harness symlinks are **not** committed — they are recreated on
each clone by re-running `setup-repo-convention.js`. The script adds them to
`.gitignore` automatically; in this repo that is:

```gitignore
/.claude/skills        # symlink -> ../.agents/skills, recreated per machine
```

Rationale: a committed symlink is brittle across machines/OSes (Windows in
particular), and committing both the symlink and its target risks divergence.
Treat symlinks as build output: source in git, links generated locally.

Per-machine setup after cloning:

```bash
node docs/setup-repo-convention.js .
```

## Status

Decision recorded; migration to this layout (collapse `.claude/skills` +
`.agents/skills` into one source via symlink, neutralize SKILL.md paths) not yet
fully executed as of 2026-06-10.
