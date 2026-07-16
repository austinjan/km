---
title: Repository Governance Adoption Checklist
tags: [software-repo, governance, checklist, onboarding, agents]
created: 2026-06-10
updated: 2026-07-16
summary: Minimal checklist for adopting only the repository governance artifacts that have a clear purpose and authority.
related: [coding/software-repo-governance/repo-state-files-standard.md, coding/software-repo-governance/templates/AGENTS-section.md]
---

# Repository Governance Adoption Checklist

Use the canonical [governance standard](repo-state-files-standard.md) to decide what the repository needs. Do not create empty files to satisfy this checklist.

## 1. Identify authority

- [ ] Name the repository root and inspect the real project structure.
- [ ] Name the authoritative progress source: local file or external tracker.
- [ ] Identify existing organization, security, release, and contribution policies.
- [ ] Record legacy filenames or instruction entry points that must remain compatible.

## 2. Add the entry router

- [ ] Create or refine root `AGENTS.md` for agent-operated repositories.
- [ ] Include project purpose, first-run commands, instruction routing, authority paths, permission boundaries, and validation expectations.
- [ ] Link to detailed sources instead of duplicating them.
- [ ] Remove repeated process instructions, arbitrary length targets, and universal rules that require judgment.

## 3. Add only applicable state artifacts

- [ ] Add `PROGRESS.md` only when local progress state has a distinct purpose.
- [ ] Add `CONSTRAINTS.md` only for durable invariants not authoritative elsewhere.
- [ ] Add `ARCHITECTURE.md` only when boundaries and dependencies are not obvious from the repository.
- [ ] Add `DECISIONS.md` or ADRs only when important rationale must survive sessions.
- [ ] Add `instructions/` only when topic guidance would obscure the root router.
- [ ] Give every artifact an owner or authority, purpose, update trigger, and retirement condition.

## 4. Check state management

- [ ] Separate durable state from regenerable intermediate output.
- [ ] Preserve objective, scope, decisions, blockers, completion criteria, and evidence across compaction.
- [ ] Preserve research, design, implementation, review, and validation phase boundaries when authority differs.
- [ ] Re-check live evidence before trusting persisted reasoning or older summaries.
- [ ] Avoid turning progress state into a duplicate commit log.

## 5. Validate behavior

- [ ] A fresh agent can find setup and validation commands.
- [ ] A review-only request does not cause implementation.
- [ ] The agent can identify which state source is authoritative.
- [ ] Conflicting instructions are surfaced rather than silently combined.
- [ ] Conditional documents are judged by applicability and usefulness, not presence alone.
- [ ] Validation results support the completion claim.

## Completion

Adoption is complete when the repository is easier to enter, resume, change, and validate, with no new duplicate authority or purposeless document.
