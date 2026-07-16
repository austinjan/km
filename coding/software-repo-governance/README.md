---
title: Software Repository Governance and Harness Engineering
tags: [software-repo, governance, harness-engineering, harness-init, project-init, repo-init, repo-check, agents, documentation, progress-tracking]
created: 2026-06-10
summary: Unified home for Harness Engineering, harness or software project initialization, repository initialization, repository checks, and reusable repo state-file governance.
related: [coding/software-repo-governance/repo-state-files-standard.md, coding/software-repo-governance/adoption-checklist.md]
---

# Software Repository Governance and Harness Engineering

This folder stores reusable guidance for software repositories that should be followed consistently across projects.

The goal is to make every repo easy for humans and coding agents to resume, audit, and change safely.

## Scope and Search Terms

Treat this folder as the canonical entry point for:

- **Harness Engineering / harness engineer** — designing the instructions, tools, environment, state, feedback, and governance around coding agents.
- **Harness init / software project init** — establishing a dependable agent harness when starting a software project.
- **Repo init** — adding the standard repository state files, instructions structure, constraints, and templates to a new or existing repository.
- **Repo check / repo audit** — checking whether a repository follows the governance standard and identifying missing, stale, or inconsistent state files.

Course-specific Harness Engineering study notes remain in [`study/harness-engineering/`](../../study/harness-engineering/). This folder owns the reusable, project-facing initialization and checking practices.

## Files

- [repo-state-files-standard.md](repo-state-files-standard.md) - Standard meaning and update rules for `AGENTS.md`, `PROGRESS.md`, `CONSTRAINS.md`, `ARCHITECTURE.md`, and `DECISIONS.md`.
- [adoption-checklist.md](adoption-checklist.md) - Checklist for adding the standard to a new or existing repository.
- [agents-splitting-strategies.md](agents-splitting-strategies.md) - Practical strategy for splitting a giant `AGENTS.md` into a compact index plus topic files.
- [prompts/repo-governance-audit-prompt.md](prompts/repo-governance-audit-prompt.md) - Pasteable prompt for auditing whether a repo follows the governance standard.
- [prompts/split-agents-md-prompt.md](prompts/split-agents-md-prompt.md) - Pasteable prompt for splitting a giant `AGENTS.md` into a compact index plus `instructions/` topic files.
- [skills/repo-governance-audit-skill.md](skills/repo-governance-audit-skill.md) - Skill-style workflow draft for repeatable governance audits.
- [templates/AGENTS-section.md](templates/AGENTS-section.md) - Copyable `AGENTS.md` section for required project state files.
- [templates/PROGRESS.md](templates/PROGRESS.md) - Template for repo progress tracking.
- [templates/CONSTRAINS.md](templates/CONSTRAINS.md) - Template for hard project constraints.
- [templates/ARCHITECTURE.md](templates/ARCHITECTURE.md) - Template for service architecture documentation.
- [templates/DECISIONS.md](templates/DECISIONS.md) - Template for preserving important decision rationale and rejected alternatives.
- [templates/instructions-README.md](templates/instructions-README.md) - Template for splitting detailed instructions into one topic per file.

## When To Use

Use this package when starting a new software repository, initializing or improving its agent harness, onboarding an agent to an existing repo, checking repo governance, or cleaning up a repo where project state is spread across chat history, issues, and undocumented assumptions.
