> When adding or updating project instructions, edit THIS file (AGENTS.md), 
> never CLAUDE.md. CLAUDE.md is only an import shim.

# AGENTS.md

This file provides guidance to AI coding agents working in this repository.

## Project Overview

This is a file-based knowledge management repository that consolidates development resources, shell configuration, project documentation, and Claude Code skills. It uses structured directories with README.md files providing navigation and context.

## Required Project State Files

- `AGENTS.md` MUST stay small: target 50-200 lines, only essential repo overview, first-run commands, global hard constraints, project state files, and topic links. Detailed instructions belong in `instructions/`, one section per file.
- `PROGRESS.md` is the single source of truth for project progress. It MUST list what is done, pending, in stock/backlog, and currently progressing. Agents MUST update `PROGRESS.md` whenever a task is completed or its status changes.
- `CONSTRAINS.md` centralizes hard project constraints. It MUST use explicit `MUST` / `MUST NOT` language and SHOULD avoid soft preferences unless they are clearly labeled as non-binding guidance.
- `ARCHITECTURE.md` describes the service responsibilities, public interfaces, internal dependencies, and important external dependencies. Agents MUST update it when responsibilities, interfaces, or dependency boundaries change.
- All software repositories SHOULD keep these three files at the repository root and apply the same meanings consistently across projects.

## Answering Questions in This Repo

When asked a question in this project, **search this km repo first** before answering from general knowledge. Treat the repo as the primary source of truth.

- Use the **`indexing-folder` skill** (aascribe) to locate relevant content — start with `aascribe map <folder>` for routing, then `aascribe search <query> <folder> --fixed-strings` for exact mentions. If the folder is unindexed or stale, run `aascribe index <folder> --depth 2` first.
- Do not use `rg` / `fd` / `grep` for question-answering routing in this repo — go through aascribe so the index stays the canonical entry point.
- Once aascribe points to likely files, **read the actual files** before answering, and cite the path (e.g., `os-config/nushell/README.md`).
- Only fall back to general knowledge if nothing in the repo covers the topic — and say so explicitly.

## Key Directories

- `coding/` — Claude Code settings, editor configs, development tool preferences
- `os-config/nushell/` — Nushell shell configuration and setup
- `projects/` — Active project documentation (art-designed-ai-system, black-bear-ai-project, consulting-ai-develop)
- `.claude/skills/` — Custom Claude Code skills for automation

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

- Commit messages should be imperative and scoped (e.g., `Organize ATOP project notes`).
- Keep documentation in Markdown; add or update a folder's `README.md` when adding new content so navigation stays accurate.
- Never commit credentials or API keys — load them via env vars.
