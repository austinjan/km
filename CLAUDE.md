# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a file-based knowledge management repository that consolidates development resources, shell configuration, project documentation, and Claude Code skills. It uses structured directories with README.md files providing navigation and context.

## Answering Questions in This Repo

When the user asks a question in this project, **search this km repo first** before answering from general knowledge. Treat the repo as the primary source of truth.

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

Skills are invoked through Claude Code, not run directly. Key skills:
- **bash-install-utils** — Install CLI utilities (zoxide, starship, carapace, bat, rg, fd, xh) for bash/zsh
- **nushell-install-utils** — Install the same utilities with Nushell integration
- **nushell-config-sync** — Sync Nushell config between repo and system
- **managing-feature-plans** — Create/update feature plan documents in `doc/plan/`
- **analyzing-feature-implementations** — Analyze code and generate reports

## CLI Tool Preferences

Always prefer these modern replacements in Bash tool calls:
- `rg` over `grep` — faster, respects .gitignore
- `fd` over `find` — simpler syntax, faster
- `bat` over `cat` — syntax highlighting
- `xh` over `curl` — friendlier HTTP client

## AGENTS.md (for Rust code in related repos)

The AGENTS.md references conventions for the extracted `aaagent-rs` Rust project:
- `cargo fmt` before committing
- `cargo check --all-features` and `cargo test --all-features` for validation
- Tests co-located with modules, named `test_<area>_<scenario>`
- Commit messages: imperative, scoped (e.g., `Implement Gemini chat loop pruning`)
- API keys via env vars (`OPENAI_API_KEY`, `GEMINI_API_KEY`), never committed
