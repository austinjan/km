---
title: KM Progress
tags: [km, progress, governance]
created: 2026-06-10
summary: Repository-level progress state for the km knowledge base.
related: [coding/software-repo-governance/README.md]
---

# KM Progress

This file tracks repository-level progress for the km knowledge base.

## Current Focus

- 2026-06-10: Capture reusable software repository governance guidance for all software repos.

## Progressing

- None.

## Pending

- None.

## Stock / Backlog

- Consider adding a script command that automatically audits a repo for `AGENTS.md`, `PROGRESS.md`, `CONSTRAINS.md`, and `ARCHITECTURE.md`.

## Blocked

- None.

## Done

- 2026-06-24: Added `gaming/pawapuro-2026-2027-guide.md` with live-researched `パワフルプロ野球2026-2027` mode overview, starter strategy, Japanese original terms, and Chinese translations.
- 2026-06-24: Added project-local Codex `research` skill under `.codex/skills/research/` with web research, km cross-checking, game-locale sourcing, and approval-before-cleanup rules.
- 2026-06-24: Added `gaming/` as the top-level home for gaming-related information and updated repository navigation.
- 2026-06-10: Added `coding/software-repo-governance/` with reusable standards, adoption checklist, and templates for `AGENTS.md`, `PROGRESS.md`, `CONSTRAINS.md`, and `ARCHITECTURE.md`.
- 2026-06-10: Added repo governance audit prompt and skill-style workflow draft under `coding/software-repo-governance/prompts/` and `coding/software-repo-governance/skills/`.
- 2026-06-10: Added small-`AGENTS.md` guidance: keep root agent instructions to 50-200 lines and move detailed topic instructions into `instructions/`.
- 2026-06-10: Added `agents-splitting-strategies.md` with an Index + Topic Files strategy for splitting giant `AGENTS.md` files.
- 2026-06-10: Added `prompts/split-agents-md-prompt.md` for asking an agent to split giant `AGENTS.md` files into compact root guidance plus `instructions/` topic files.
- 2026-06-10: Added atomic commit rule: every meaningful operation must be committed, where meaningful operation means one completed logical unit rather than every tiny edit.
- 2026-06-10: Added `DECISIONS.md` as the standard place to preserve important decision rationale, rejected alternatives, constraints, and consequences.
- 2026-06-10: Added `ARCHITECTURE.md` so km follows its own required root state file standard.
- 2026-06-10: Updated root `AGENTS.md` with required project state file rules.

## Validation Log

- 2026-06-10: Documentation-only change; no automated tests required.
- 2026-06-10: Verified root state files exist: `AGENTS.md`, `PROGRESS.md`, `CONSTRAINS.md`, `ARCHITECTURE.md`, and `DECISIONS.md`.
