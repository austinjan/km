---
title: Repository State Files Standard
tags: [software-repo, governance, agents, progress, constraints, architecture]
created: 2026-06-10
summary: Defines the required repository state files and their responsibilities for all software repositories.
related: [coding/software-repo-governance/templates/AGENTS-section.md, coding/software-repo-governance/adoption-checklist.md]
---

# Repository State Files Standard

Every software repository SHOULD keep a small set of root-level files that make the current state explicit.

These files are for both humans and coding agents. They reduce hidden context, prevent duplicated decisions, and make it easier to resume work after interruptions.

## Required Root Files

### `AGENTS.md`

Purpose: repository instructions for coding agents.

Rules:

- `AGENTS.md` MUST describe how agents should work in the repository.
- `AGENTS.md` MUST mention the required project state files and their meanings.
- `AGENTS.md` MUST tell agents when to update `PROGRESS.md`, `CONSTRAINS.md`, and `ARCHITECTURE.md`.
- `AGENTS.md` MUST stay small: target 50-200 lines.
- `AGENTS.md` MUST contain only the most essential items: a one- or two-sentence project overview, first-run commands, global hard constraints, and links to topic instruction documents.
- `AGENTS.md` MUST NOT become a giant instruction file.
- `AGENTS.md` MUST keep global hard constraints to no more than 15 non-negotiable rules.
- `AGENTS.md` SHOULD include first-run commands such as `make setup` and `make test`, adapted to the repository.
- `AGENTS.md` SHOULD link to topic documents using one-line descriptions plus applicability conditions.

Recommended sections:

- Project Overview
- First-Run Commands
- Global Hard Constraints
- Required Project State Files
- Topic Instructions

### `PROGRESS.md`

Purpose: single source of truth for current project progress.

Rules:

- `PROGRESS.md` MUST be the repo's canonical progress state.
- `PROGRESS.md` MUST show what is done, pending, in stock/backlog, and currently progressing.
- Agents MUST update `PROGRESS.md` when a task is completed.
- Agents MUST update `PROGRESS.md` when a task moves between pending, progressing, blocked, done, or backlog.
- `PROGRESS.md` SHOULD include the latest validation result for completed work.
- `PROGRESS.md` MUST NOT depend on chat history as the only record of status.

Recommended sections:

- Current Focus
- Progressing
- Pending
- Stock / Backlog
- Done
- Blocked
- Validation Log

### `CONSTRAINS.md`

Purpose: centralized hard constraints.

Rules:

- `CONSTRAINS.md` MUST contain hard project constraints.
- Each hard constraint MUST use explicit `MUST` or `MUST NOT` language.
- `CONSTRAINS.md` MUST NOT mix hard constraints with casual preferences unless preferences are clearly labeled separately.
- Agents MUST check `CONSTRAINS.md` before making architecture, dependency, security, data, deployment, or workflow changes.
- Agents MUST update `CONSTRAINS.md` when the project accepts a new hard rule.

Recommended sections:

- Product Constraints
- Architecture Constraints
- Data Constraints
- Security Constraints
- Dependency Constraints
- Operational Constraints
- Non-Binding Preferences

Note: the filename is intentionally `CONSTRAINS.md` if that is the repo convention. If starting fresh, `CONSTRAINTS.md` is the more common English spelling, but consistency inside the repo matters more than renaming later.

### `ARCHITECTURE.md`

Purpose: service architecture map.

Rules:

- `ARCHITECTURE.md` MUST describe the service responsibilities.
- `ARCHITECTURE.md` MUST describe public interfaces, internal interfaces, and important data flows.
- `ARCHITECTURE.md` MUST list key internal and external dependencies.
- Agents MUST update `ARCHITECTURE.md` when responsibilities, interfaces, dependency boundaries, persistence, queues, background jobs, or integration points change.
- `ARCHITECTURE.md` SHOULD explain major tradeoffs and known architecture risks.

Recommended sections:

- Service Purpose
- Responsibilities
- Non-Responsibilities
- Public Interfaces
- Internal Interfaces
- Data Model / Persistence
- Dependencies
- Runtime / Deployment
- Known Risks
- Update Log

### `instructions/`

Purpose: detailed instructions split by topic.

Rules:

- Repositories MUST place detailed instruction files in `instructions/`.
- `instructions/` MUST use one section per file.
- Topic instruction files SHOULD be named by topic, for example `instructions/testing.md`, `instructions/deployment.md`, `instructions/security.md`, or `instructions/frontend.md`.
- Topic instruction files SHOULD state when they apply.
- `AGENTS.md` SHOULD link to topic files instead of duplicating their content.
- Detailed setup, testing, deployment, style, domain, and workflow instructions SHOULD live in `instructions/`, not in `AGENTS.md`.

## Agent Workflow

Before changing code:

1. Read `AGENTS.md`.
2. Check `CONSTRAINS.md` for hard constraints.
3. Check `ARCHITECTURE.md` if the task touches design, dependencies, interfaces, or service boundaries.
4. Check `PROGRESS.md` to avoid duplicating or reopening work.

After changing code or docs:

1. Update `PROGRESS.md` if task status changed.
2. Update `CONSTRAINS.md` if a new hard rule was introduced.
3. Update `ARCHITECTURE.md` if service responsibilities, interfaces, or dependencies changed.
4. Run the repository's normal validation commands and record important validation results in `PROGRESS.md`.
