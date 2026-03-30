# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a file-based knowledge management repository that consolidates development resources, shell configuration, project documentation, and Claude Code skills. It uses structured directories with README.md files providing navigation and context.

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
