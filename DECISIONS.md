---
title: KM Decisions
tags: [km, decisions, governance, harness-engineering]
created: 2026-06-10
summary: Decision log for important km repository governance and structure choices.
related: [PROGRESS.md, CONSTRAINS.md, ARCHITECTURE.md, coding/software-repo-governance/repo-state-files-standard.md]
---

# KM Decisions

This file records important decisions, the reason behind them, and rejected alternatives. Use it to preserve the "why" across sessions.

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
