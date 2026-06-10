---
title: Repository Governance Adoption Checklist
tags: [software-repo, governance, checklist, onboarding, agents]
created: 2026-06-10
summary: Checklist for adding standardized repo state files to a software repository.
related: [coding/software-repo-governance/repo-state-files-standard.md, coding/software-repo-governance/templates/AGENTS-section.md]
---

# Repository Governance Adoption Checklist

Use this checklist when adding the standard repo state files to a software project.

## Initial Setup

- [ ] Add or update root `AGENTS.md`.
- [ ] Add root `PROGRESS.md`.
- [ ] Add root `CONSTRAINS.md`.
- [ ] Add root `ARCHITECTURE.md`.
- [ ] Add root `DECISIONS.md`.
- [ ] Add root `instructions/` folder.
- [ ] Add `instructions/README.md`.
- [ ] Copy the required project state files section from [templates/AGENTS-section.md](templates/AGENTS-section.md) into `AGENTS.md`.
- [ ] Fill `PROGRESS.md` with current done, pending, stock/backlog, progressing, and blocked work.
- [ ] Fill `CONSTRAINS.md` with only hard constraints using `MUST` / `MUST NOT`.
- [ ] Fill `ARCHITECTURE.md` with the current service responsibilities, interfaces, and dependencies.
- [ ] Fill `DECISIONS.md` with important decisions, rationale, and rejected alternatives that future agents should not re-litigate.
- [ ] Move detailed setup, testing, deployment, style, domain, and workflow guidance into one-file-per-topic documents under `instructions/`.

## Agent Check

- [ ] Confirm `AGENTS.md` is 50-200 lines.
- [ ] Confirm `AGENTS.md` contains only project overview, first-run commands, global hard constraints, required state files, and topic links.
- [ ] Confirm `AGENTS.md` has no more than 15 global hard constraints.
- [ ] Confirm each topic link has a one-line description and applicability condition.
- [ ] Confirm `AGENTS.md` tells agents to read `CONSTRAINS.md` before risky changes.
- [ ] Confirm `AGENTS.md` tells agents to update `PROGRESS.md` when task status changes.
- [ ] Confirm `AGENTS.md` tells agents to update `ARCHITECTURE.md` when service boundaries change.
- [ ] Confirm `AGENTS.md` tells agents to update `DECISIONS.md` when important rationale would otherwise be lost.
- [ ] Confirm `AGENTS.md` or `CONSTRAINS.md` says every meaningful operation MUST be committed as one atomic action.
- [ ] Confirm validation commands are listed in `AGENTS.md`.

## Quality Check

- [ ] `PROGRESS.md` can answer "what is happening now?"
- [ ] `PROGRESS.md` can answer "what was completed recently?"
- [ ] `CONSTRAINS.md` contains no vague rules such as "try to" or "prefer" in the hard constraints section.
- [ ] `CONSTRAINS.md` defines meaningful operation as one completed logical unit, not every tiny edit.
- [ ] Commit rules make rollback safety explicit.
- [ ] `ARCHITECTURE.md` identifies what the service owns and does not own.
- [ ] `ARCHITECTURE.md` lists dependencies that can break the service.
- [ ] `DECISIONS.md` can answer "why did we choose this?"
- [ ] `DECISIONS.md` records rejected alternatives for important choices.
- [ ] `instructions/` has one section per file.
- [ ] Detailed instructions are linked from `AGENTS.md`, not copied into it.

## Maintenance Rule

Every completed task SHOULD leave the repo with:

- Updated code/docs.
- Updated `PROGRESS.md`.
- Updated `CONSTRAINS.md` if hard constraints changed.
- Updated `ARCHITECTURE.md` if responsibilities, interfaces, or dependencies changed.
- Updated `DECISIONS.md` if an important decision, rejected alternative, or tradeoff should persist.
- Validation command results recorded where useful.
