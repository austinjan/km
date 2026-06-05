---
title: skills.sh and Matt Pocock Agent Skills
tags: [agent-skills, skills-sh, mattpocock, claude-code, codex, skill-authoring]
created: 2026-05-25
summary: Source-backed notes on how `npx skills@latest add mattpocock/skills` discovers, lists, and installs portable agent skills for Claude Code and Codex.
related: [coding/agent-skills/README.md, coding/codex/README.md, coding/claude-code/README.md]
---

# skills.sh and Matt Pocock Agent Skills

## Command Checked

```bash
npx skills@latest add mattpocock/skills --list
```

Use `--list` first when learning or auditing a skill source. It clones and discovers skills without installing them.

As of 2026-05-25:

- `skills@latest` resolved to version `1.5.7`.
- The npm package repository is `vercel-labs/skills`.
- The package binary is `skills` / `add-skill`, both pointing to `bin/cli.mjs`.
- `mattpocock/skills` resolved to the GitHub repo `https://github.com/mattpocock/skills.git`.

## What Matt Pocock Built

Matt's repo is a multi-skill repository. The important convention is simple: each skill is a folder containing a `SKILL.md` file with YAML frontmatter.

Example structure:

```text
skills/
  engineering/
    diagnose/
      SKILL.md
    tdd/
      SKILL.md
    triage/
      SKILL.md
  productivity/
    grill-me/
      SKILL.md
    write-a-skill/
      SKILL.md
.claude-plugin/
  plugin.json
scripts/
  link-skills.sh
  list-skills.sh
```

The `SKILL.md` frontmatter provides the skill identity and trigger description:

```md
---
name: write-a-skill
description: Create new agent skills with proper structure, progressive disclosure, and bundled resources. Use when user wants to create, write, or build a new skill.
---
```

The description matters because the agent sees it before loading the full skill. A good description says both what the skill does and when to use it.

## Discovered Skills

The `--list` check found 14 public skills:

- `diagnose`
- `grill-with-docs`
- `improve-codebase-architecture`
- `prototype`
- `setup-matt-pocock-skills`
- `tdd`
- `to-issues`
- `to-prd`
- `triage`
- `zoom-out`
- `caveman`
- `grill-me`
- `handoff`
- `write-a-skill`

## How Installation Works

The `skills` CLI does this flow:

1. Parse the source string, such as `mattpocock/skills`.
2. Clone the repository, unless it can use a faster trusted GitHub blob path.
3. Discover skills by scanning common locations such as `skills/`, `.agents/skills/`, `.claude/skills/`, and paths declared by plugin manifests.
4. Read each `SKILL.md` and validate that it has usable frontmatter.
5. Select skills interactively, or install all in non-interactive agent mode.
6. Detect installed agents.
7. Install by copy or symlink.
8. Record lock metadata for future update tracking.

When running inside Codex, the CLI detects the agent and switches to non-interactive mode. Be careful: without `--list` or `--skill`, it may install every discovered skill.

## Claude Code and Codex Support

The installer knows agent-specific locations.

Project-level paths:

- Claude Code: `.claude/skills`
- Codex and other universal agents: `.agents/skills`

Global paths:

- Claude Code: `~/.claude/skills`
- Codex: `~/.codex/skills`

Matt's repo also includes `.claude-plugin/plugin.json`, which lists the skill folders that should be exposed as the plugin package. This helps Claude plugin tooling understand the official public skill set.

## Safe Installation Examples

List first:

```bash
npx skills@latest add mattpocock/skills --list
```

Install one skill for Codex:

```bash
npx skills@latest add mattpocock/skills --skill write-a-skill --agent codex
```

Install one skill for Claude Code:

```bash
npx skills@latest add mattpocock/skills --skill write-a-skill --agent claude-code
```

Install globally:

```bash
npx skills@latest add mattpocock/skills --skill write-a-skill --agent codex --global
```

## Learning Path

1. Learn the `SKILL.md` format: `name`, `description`, and the instruction body.
2. Practice writing descriptions with specific triggers.
3. Split large skills into progressive-disclosure files such as `REFERENCE.md`, examples, or scripts.
4. Test local install from a folder before publishing.
5. Publish a repo with a `skills/` folder.
6. Add `.claude-plugin/plugin.json` when Claude plugin compatibility matters.
7. Verify install paths for both `.agents/skills` and `.claude/skills`.

## Authoring Checklist

- Keep the skill folder name kebab-case.
- Put the main instructions in `SKILL.md`.
- Make the description specific enough for an agent to select the skill correctly.
- Keep `SKILL.md` short; move rarely used details to reference files.
- Add scripts only for deterministic operations that should not be regenerated repeatedly.
- Test discovery with `npx skills@latest add <source> --list`.
- Install one skill first before installing a whole collection.
