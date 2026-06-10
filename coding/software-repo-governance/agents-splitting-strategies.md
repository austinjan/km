---
title: AGENTS.md Splitting Strategies
tags: [agents, software-repo, governance, instructions, strategy]
created: 2026-06-10
summary: Practical strategies for splitting a giant AGENTS.md into a compact root file plus topic-specific instruction files.
related: [coding/software-repo-governance/repo-state-files-standard.md, coding/software-repo-governance/templates/AGENTS-section.md, coding/software-repo-governance/templates/instructions-README.md]
---

# AGENTS.md Splitting Strategies

Use these strategies when a repository's `AGENTS.md` has become too long.

## Strategy 1: Index + Topic Files

This is the default recommended strategy.

Keep root `AGENTS.md` as a small routing document. Move detailed guidance into `instructions/`, one topic per file.

### Root `AGENTS.md` Keeps

- Project overview: one or two sentences explaining what the repo is.
- First-run commands: the fastest path to setup and validation, such as `make setup` and `make test`.
- Global hard constraints: no more than 15 non-negotiable rules.
- Required project state files: `PROGRESS.md`, `CONSTRAINS.md`, `ARCHITECTURE.md`.
- Topic links: one-line descriptions plus applicability conditions.

### `instructions/` Receives

- `instructions/testing.md` - test commands, test strategy, fixtures, coverage expectations.
- `instructions/development.md` - local workflow, branch workflow, common commands.
- `instructions/architecture.md` - detailed architecture guidance that does not belong in root `ARCHITECTURE.md`.
- `instructions/security.md` - auth, secrets, data handling, dependency security.
- `instructions/frontend.md` - UI conventions, browser validation, design system rules.
- `instructions/deployment.md` - release, environments, migration, rollback.
- `instructions/data.md` - schemas, migrations, data contracts, retention.
- `instructions/domain.md` - business language, domain rules, glossary.

Only create files that match the repo. Do not create empty topic files just to satisfy a generic list.

### Example Root `AGENTS.md`

```markdown
# Repository Guidelines

## Project Overview

This repository contains the customer-facing web app and API for Example Product. It owns user onboarding, billing settings, and account administration workflows.

## First-Run Commands

- `make setup` - Install dependencies and prepare local configuration.
- `make test` - Run the default validation suite.

## Global Hard Constraints

- Secrets MUST NOT be committed.
- Database migrations MUST be backward compatible.
- User-visible behavior changes MUST include tests or documented manual validation.
- `AGENTS.md` MUST stay between 50 and 200 lines.
- Detailed instructions MUST live in `instructions/`, one topic per file.

## Required Project State Files

- `PROGRESS.md` is the single source of truth for project progress. Update it when task status changes.
- `CONSTRAINS.md` centralizes hard constraints using `MUST` / `MUST NOT`.
- `ARCHITECTURE.md` describes responsibilities, interfaces, and dependencies.

## Topic Instructions

- `instructions/testing.md` - Applies when adding, changing, or validating behavior.
- `instructions/security.md` - Applies when touching auth, secrets, user data, or external integrations.
- `instructions/deployment.md` - Applies when changing runtime, infrastructure, release flow, or environments.
- `instructions/frontend.md` - Applies when changing UI, routes, visual design, or browser behavior.
```

### Migration Steps

1. Count `AGENTS.md` lines and identify sections over 20 lines.
2. Keep only repo-wide rules in `AGENTS.md`.
3. Move each detailed section to `instructions/<topic>.md`.
4. Add an applicability line at the top of every topic file.
5. Replace moved content in `AGENTS.md` with a one-line link.
6. Move hard non-negotiable rules into `CONSTRAINS.md` if they are not agent-specific.
7. Update `PROGRESS.md` with the split task and validation result.

### Split Decision Rule

Keep content in `AGENTS.md` only if an agent must read it before almost every task.

Move content to `instructions/` if it applies only to a specific activity, area, language, framework, service, or workflow.

Move content to `CONSTRAINS.md` if it is a hard project rule.

Move content to `ARCHITECTURE.md` if it describes ownership, interfaces, data flow, or dependencies.

Move content to `PROGRESS.md` if it describes current status, completed work, blocked work, or next work.
