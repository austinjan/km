---
title: AGENTS.md Entry Router Template
tags: [agents, software-repo, governance, template]
created: 2026-06-10
updated: 2026-07-16
summary: Adaptable root AGENTS.md sections for project purpose, authority, permissions, state, instruction routing, and validation.
related: [coding/software-repo-governance/skills/repo-governance-audit/references/repo-state-files-standard.md]
---

# AGENTS.md Entry Router Template

Adapt this template to the repository. Remove sections that have no real source or purpose; do not leave placeholders in adopted files.

```markdown
# Repository Guidance

## Project purpose

[One or two sentences describing what this repository owns and does not own.]

## First-run commands

- `[setup command]` — [expected result]
- `[targeted validation command]` — [what it proves]

## Authority and state

- Progress: `[local path or tracker]` — [when it is authoritative and when to update it]
- Constraints: `[path or policy]` — [when it applies]
- Architecture: `[path]` — [when to update it]
- Decisions: `[path or ADR directory]` — [what deserves a record]

Check current repository and tracker evidence before relying on older summaries. Preserve the objective, scope, decisions, blockers, completion criteria, and validation evidence when compacting long-running work.

## Autonomy and approval

- Review, explain, diagnose, and plan requests authorize inspection and reporting, not implementation.
- Change, build, and fix requests authorize scoped local edits and relevant non-destructive validation.
- External writes, destructive actions, releases, commits, pushes, and material scope expansion require [state the repository's actual authorization rule].

## Topic instructions

- `[path]` — Applies when [specific condition].

## Completion

Before reporting completion, [state the required tests, checks, evidence, and behavior when validation cannot run].
```
