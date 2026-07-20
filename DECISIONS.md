---
title: KM Decisions
tags: [km, decisions, governance, harness-engineering]
created: 2026-06-10
summary: Decision log for important km repository governance and structure choices.
related: [PROGRESS.md, CONSTRAINS.md, ARCHITECTURE.md, coding/software-repo-governance/repo-state-files-standard.md]
---

# KM Decisions

This file records important decisions, the reason behind them, and rejected alternatives. Use it to preserve the "why" across sessions.

## 2026-07-20: Keep Agent Skills In One Canonical Directory

- Decision: Keep project-local skill implementations under `.agents/skills/`; treat harness-specific skill paths as per-machine relative symlinks when a harness does not discover `.agents/skills/` directly.
- Reason: A single real copy avoids version drift and conflicting edits between Claude Code, Codex, opencode, and other harness-specific directories.
- Rejected alternative: Maintain independent real skill folders for each harness. That duplicates content and makes the active version ambiguous.
- Consequence: Inventory and archive duplicates before replacing any harness directory, refuse to hide leftover files, and keep symlinks out of Git so each machine can recreate them safely.

## 2026-06-10: Add `DECISIONS.md` To Repo Governance Standard

- Decision: Add `DECISIONS.md` as a standard root state file for software repositories.
- Reason: `PROGRESS.md` captures current state, `CONSTRAINS.md` captures hard rules, and `ARCHITECTURE.md` captures current structure, but none of them cleanly preserve why a meaningful choice was made or what alternatives were rejected.
- Source: WalkingLabs Harness Engineering Lecture 05 emphasized state persistence, decision logs, and atomic commits for cross-session continuity.
- Rejected alternative: Copy the lecture format directly. We instead adapted the principle into this repository's governance standard.
- Constraint: Decision entries should be concise and focused on choices future agents might otherwise re-litigate.

## 2026-06-10: Complete Root State File Set For KM

- Decision: Add a root `ARCHITECTURE.md` alongside `AGENTS.md`, `PROGRESS.md`, `CONSTRAINS.md`, and `DECISIONS.md`.
- Reason: The governance standard requires architecture state to be explicit, and the km repo should follow the same standard it teaches.
- Rejected alternative: Leave architecture implicit in `README.md` and `MANIFEST.md`. That would make service responsibilities, boundaries, dependencies, and risks harder for agents to find consistently.
- Consequence: Future structural changes to km should update `ARCHITECTURE.md` when responsibilities, interfaces, dependencies, or major risks change.

## 2026-07-16: Make Repository Governance Conditional And Outcome-Oriented

- Decision: Keep `repo-state-files-standard.md` as the single canonical policy, make state artifacts conditional on a demonstrated purpose, and replace duplicated audit prompts with one executable audit skill.
- Reason: Universal file requirements, repeated rules, and arbitrary size limits can create stale duplicate authority without improving agent behavior. GPT-5.6 guidance favors outcomes, decision rules, explicit permissions, stopping conditions, representative validation, and deliberate state management.
- Rejected alternative: Continue maintaining equivalent rules independently in the standard, checklist, prompts, skill draft, and templates.
- Consequence: New repositories use `CONSTRAINTS.md`; this repository retains legacy `CONSTRAINS.md` compatibility. Audits evaluate authority and usefulness rather than failing solely because a conditional file is absent.
- Follow-up: Validate future governance changes on representative repository tasks and keep MANIFEST navigation synchronized.

## 2026-07-16: Use Direct Main Updates For KM

- Decision: Commit KM repository changes directly to `main` and push to `origin/main`; do not require pull requests unless the user explicitly asks for one.
- Reason: This is a personal knowledge repository, so a branch-and-PR workflow adds coordination overhead without a corresponding review requirement.
- Rejected alternative: Require a feature branch and pull request for every knowledge update.
- Consequence: Atomic commits and validation remain required, while publication uses the simpler direct-to-main workflow.
