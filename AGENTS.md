> When adding or updating project instructions, edit THIS file (AGENTS.md), 
> never CLAUDE.md. CLAUDE.md is only an import shim.

# AGENTS.md

This file provides guidance to AI coding agents working in this repository.

## Project Overview

This is a file-based knowledge management repository that consolidates development resources, shell configuration, project documentation, and Claude Code skills. It uses structured directories with README.md files providing navigation and context.

## Repository Authority And State

- `AGENTS.md` is the entry router for this repository. Keep it easy to scan and link to detailed sources instead of copying them.
- `PROGRESS.md` is this repository's local progress authority. Update it when the objective, scope, status, blocker, milestone, or completion evidence changes; do not duplicate every commit.
- `CONSTRAINS.md` is this repository's legacy-named constraints authority. New repositories should use `CONSTRAINTS.md`.
- `ARCHITECTURE.md` describes repository ownership, interfaces, structure, and important dependencies. Update it when those boundaries materially change.
- `DECISIONS.md` preserves important decisions, reasons, alternatives, and consequences that future sessions might otherwise revisit.
- `MANIFEST.md` is the global retrieval map. Update it when content paths, navigation, or tags change.
- Preserve the current objective, accepted scope, decisions, blockers, completion criteria, and validation evidence when compacting long-running work. Re-check live repository evidence before relying on older summaries or reasoning.
- Use `coding/software-repo-governance/repo-state-files-standard.md` when adopting or auditing governance in another software repository; its artifacts are conditional rather than universally required.

## Answering Questions in This Repo

When asked a question in this project, **search this km repo first** before answering from general knowledge. Treat the repo as the primary source of truth.

- Use the **`indexing-folder` skill** (aascribe) to locate relevant content. Start with `aascribe map <folder>` and use its summaries to narrow the question to the smallest plausible subtree or set of files. If the map already identifies where the topic is covered, inspect those source files directly; do not run `search` automatically. Use `aascribe search <query> <narrowed-folder> --fixed-strings` only when exact mentions, line numbers, or exhaustive confirmation are needed. Search the whole repository only when the map cannot narrow the scope or the user explicitly requests repository-wide results. If the relevant folder is unindexed or stale, run `aascribe index <folder> --depth 2` first.
- Do not use `rg` / `fd` / `grep` for question-answering routing in this repo — go through aascribe so the index stays the canonical entry point.
- Once aascribe points to likely files, **read the actual files** before answering, and cite the path (e.g., `os-config/nushell/README.md`).
- Only fall back to general knowledge if nothing in the repo covers the topic — and say so explicitly.

## Key Directories

- `coding/` — Claude Code settings, editor configs, development tool preferences
- `os-config/nushell/` — Nushell shell configuration and setup
- `projects/` — Active project documentation (art-designed-ai-system, black-bear-ai-project, consulting-ai-develop)
- `.agents/skills/` — Canonical project-local agent skills
- `skills/` — Skill-management documentation, templates, and verification tools

## Build & Setup

```bash
python build.py          # Build km-tools (requires external aaagent-rs repo)
```

## Skills

Skills are invoked through the agent harness, not run directly. Key skills:
- **bash-install-utils** — Install CLI utilities (zoxide, starship, carapace, bat, rg, fd, xh) for bash/zsh
- **nushell-install-utils** — Install the same utilities with Nushell integration
- **nushell-config-sync** — Sync Nushell config between repo and system
- **managing-feature-plans** — Create/update feature plan documents in `doc/plan/`
- **analyzing-feature-implementations** — Analyze code and generate reports

## CLI Tool Preferences

Always prefer these modern replacements in shell commands:
- `rg` over `grep` — faster, respects .gitignore
- `fd` over `find` — simpler syntax, faster
- `bat` over `cat` — syntax highlighting
- `xh` over `curl` — friendlier HTTP client

## Commit & Documentation Conventions

- Every meaningful operation MUST be committed as one atomic action. A meaningful operation is a completed logical unit, not every tiny edit, and MUST be coherent enough to understand, revert, or cherry-pick independently.
- Commit messages should be imperative and scoped (e.g., `Organize ATOP project notes`).
- This is a personal knowledge repository. Changes SHOULD be committed directly to `main` and pushed to `origin/main`; a pull request is not required unless the user explicitly requests one.
- Keep documentation in Markdown; add or update a folder's `README.md` when adding new content so navigation stays accurate.
- Never commit credentials or API keys — load them via env vars.
