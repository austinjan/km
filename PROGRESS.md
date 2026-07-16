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

- 2026-07-16: Keep the GPT-5.6-aligned software repository governance package clear, evidence-based, and free of duplicate authority.

## Progressing

- None.

## Pending

- None.

## Stock / Backlog

- Run the repository-governance audit skill eval cases in an agent environment that supports isolated skill and baseline runs.

## Blocked

- None.

## Done

- 2026-07-16: Rebuilt `coding/software-repo-governance/` around one canonical standard; added GPT-5.6-aligned authority, autonomy, collaboration, validation, and long-running state management; replaced duplicate audit prompts and draft with a real skill plus eval cases; updated conditional templates and navigation metadata.
- 2026-07-16: Clarified `coding/software-repo-governance/` as the canonical entry point for Harness Engineering, harness/software project init, repo init, and repo check/audit information.
- 2026-06-29: Added document about machine learning concepts applied to AI Agent Skill improvement (Train / Validation / Test data splitting) under `study/AI/`.
- 2026-06-24: Split the oversized Pawapuro 2026-2027 guide into `gaming/pawapuro/` topic files for overview, `サクセス`, `栄冠ナイン`, `パワフェス`, career modes, and abilities/glossary.
- 2026-06-24: Added detailed `サクセス` recommended-mode strategy for `パラレルオールスターズ`, including route planning, time-space level goals, fielder/pitcher flows, `練習ビッグバン` usage, and common mistakes.
- 2026-06-24: Expanded the Pawapuro 2026-2027 guide with detailed `栄冠ナイン` event dates, `金特本` sources, `サクセス` route priorities, `パワフェス` loop strategy, `ペナント` yearly checklist, and special ability recommendations.
- 2026-06-24: Added the Pawapuro 2026-2027 guide with live-researched `パワフルプロ野球2026-2027` mode overview, starter strategy, Japanese original terms, and Chinese translations.
- 2026-06-24: Added project-local Codex `research` skill under `.codex/skills/research/` with web research, km cross-checking, game-locale sourcing, and approval-before-cleanup rules.
- 2026-06-24: Added `gaming/` as the top-level home for gaming-related information and updated repository navigation.
- 2026-06-10: Added `coding/software-repo-governance/` with reusable standards, adoption checklist, and templates for `AGENTS.md`, `PROGRESS.md`, `CONSTRAINS.md`, and `ARCHITECTURE.md`.
- 2026-06-10: Added the initial repo governance audit guidance, later superseded by the executable `repo-governance-audit` skill on 2026-07-16.
- 2026-06-10: Added small-`AGENTS.md` guidance: keep root agent instructions to 50-200 lines and move detailed topic instructions into `instructions/`.
- 2026-06-10: Added `agents-splitting-strategies.md` with an Index + Topic Files strategy for splitting giant `AGENTS.md` files.
- 2026-06-10: Added `prompts/split-agents-md-prompt.md` for asking an agent to split giant `AGENTS.md` files into compact root guidance plus `instructions/` topic files.
- 2026-06-10: Added atomic commit rule: every meaningful operation must be committed, where meaningful operation means one completed logical unit rather than every tiny edit.
- 2026-06-10: Added `DECISIONS.md` as the standard place to preserve important decision rationale, rejected alternatives, constraints, and consequences.
- 2026-06-10: Added `ARCHITECTURE.md` so km follows its own required root state file standard.
- 2026-06-10: Updated root `AGENTS.md` with required project state file rules.

## Validation Log

- 2026-07-16: Validated governance Markdown links, skill frontmatter and eval JSON, removed-path references, canonical-rule consistency, and the scoped Git diff.
- 2026-07-16: Verified root, coding, governance, and manifest navigation explicitly route Harness Engineering, project/repo initialization, and repo checking to `coding/software-repo-governance/`.
- 2026-06-10: Documentation-only change; no automated tests required.
- 2026-06-10: Verified root state files exist: `AGENTS.md`, `PROGRESS.md`, `CONSTRAINS.md`, `ARCHITECTURE.md`, and `DECISIONS.md`.
