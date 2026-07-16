---
title: Software Repository Governance
tags: [software-repo, governance, agents, state-management, harness-engineering]
created: 2026-06-10
updated: 2026-07-16
summary: Canonical entry point for outcome-oriented repository governance, state management, adoption, templates, and audits.
related: [coding/software-repo-governance/repo-state-files-standard.md, coding/software-repo-governance/adoption-checklist.md]
---

# Software Repository Governance

This package helps humans and coding agents enter, understand, change, validate, and resume a software repository without hidden chat context or duplicate sources of truth.

## Start Here

1. Read [repo-state-files-standard.md](repo-state-files-standard.md) for the canonical policy, including authority, state management, permissions, and completion evidence.
2. Use [adoption-checklist.md](adoption-checklist.md) to adopt only the artifacts that have a clear purpose.
3. Use [agents-splitting-strategies.md](agents-splitting-strategies.md) only when root agent instructions have become hard to navigate.
4. Run [repo-governance-audit](skills/repo-governance-audit/SKILL.md) to review an existing repository without changing it unless fixes are requested.

## Templates

Templates are starting points, not policy or authority:

- [AGENTS-section.md](templates/AGENTS-section.md) — compact entry-router sections.
- [PROGRESS.md](templates/PROGRESS.md) — optional local progress and resumption state.
- [CONSTRAINTS.md](templates/CONSTRAINTS.md) — optional hard invariants.
- [ARCHITECTURE.md](templates/ARCHITECTURE.md) — optional system boundaries and dependencies.
- [DECISIONS.md](templates/DECISIONS.md) — optional decision rationale log.
- [instructions-README.md](templates/instructions-README.md) — optional topic-instruction index.

Do not create every template by default. The standard's applicability table decides what belongs in a repository.
