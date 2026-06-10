---
title: AGENTS.md Project State Files Section
tags: [agents, software-repo, governance, template]
created: 2026-06-10
summary: Copyable AGENTS.md section defining PROGRESS.md, CONSTRAINS.md, and ARCHITECTURE.md rules.
related: [coding/software-repo-governance/repo-state-files-standard.md]
---

# AGENTS.md Essential Sections

Use these sections in the root `AGENTS.md` of software repositories.

```markdown
## Project Overview

One or two sentences that make it clear what this repository is and what it owns.

## First-Run Commands

- `make setup` - Install dependencies and prepare local development.
- `make test` - Run the default validation suite.

## Global Hard Constraints

- Keep this list to no more than 15 non-negotiable rules.
- Use `MUST` / `MUST NOT` language for hard constraints.
- Move detailed instructions into topic files under `instructions/`.
- `AGENTS.md` MUST stay between 50 and 200 lines.

## Required Project State Files

- `PROGRESS.md` is the single source of truth for project progress. It MUST list what is done, pending, in stock/backlog, and currently progressing. Agents MUST update `PROGRESS.md` whenever a task is completed or its status changes.
- `CONSTRAINS.md` centralizes hard project constraints. It MUST use explicit `MUST` / `MUST NOT` language and SHOULD avoid soft preferences unless they are clearly labeled as non-binding guidance.
- `ARCHITECTURE.md` describes the service responsibilities, public interfaces, internal dependencies, and important external dependencies. Agents MUST update it when responsibilities, interfaces, or dependency boundaries change.
- All software repositories SHOULD keep these three files at the repository root and apply the same meanings consistently across projects.

## Topic Instructions

- `instructions/testing.md` - Test strategy and commands. Applies when adding, changing, or validating behavior.
- `instructions/deployment.md` - Deployment and release rules. Applies when changing runtime, infrastructure, or release flow.
```
