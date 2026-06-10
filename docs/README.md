---
name: docs
description: Internal design specs and repo conventions — how this knowledge base itself is structured and how its skills/instructions are maintained.
---

## Contents

Internal documentation about the repo itself (not knowledge content).

- `repo-structure-convention.md` — Single-source convention: AGENTS.md is the only instruction file (CLAUDE.md imports it), and all skills live once under `.agents/skills/` with per-harness symlinks.
- `setup-repo-convention.js` — Node script that bootstraps another repo to this convention (creates AGENTS.md, the CLAUDE.md import shim, `.agents/skills/`, and the `.claude/skills` symlink). Run `node docs/setup-repo-convention.js --help`.
- `superpowers/specs/` — km-organizer skill design doc.
