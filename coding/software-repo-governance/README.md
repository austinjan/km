---
title: Software Repository Governance
tags: [software-repo, governance, agents, documentation, progress-tracking]
created: 2026-06-10
summary: Reusable repository-level guidance for AGENTS.md, PROGRESS.md, CONSTRAINS.md, ARCHITECTURE.md, and DECISIONS.md across software projects.
related: [coding/software-repo-governance/repo-state-files-standard.md, coding/software-repo-governance/adoption-checklist.md]
---

# Software Repository Governance

This folder stores reusable guidance for software repositories that should be followed consistently across projects.

The goal is to make every repo easy for humans and coding agents to resume, audit, and change safely.

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

Use this package when starting a new software repository, onboarding an agent to an existing repo, or cleaning up a repo where project state is spread across chat history, issues, and undocumented assumptions.
