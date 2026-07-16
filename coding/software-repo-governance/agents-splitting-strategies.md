---
title: Splitting Overgrown Agent Instructions
tags: [agents, software-repo, governance, instructions]
created: 2026-06-10
updated: 2026-07-16
summary: Decision rules for turning an overgrown AGENTS.md into a compact repository router without creating duplicate authority.
related: [coding/software-repo-governance/repo-state-files-standard.md, coding/software-repo-governance/templates/AGENTS-section.md]
---

# Splitting Overgrown Agent Instructions

Use this guidance only when important repository-wide instructions are difficult to find in `AGENTS.md`. File length is a signal, not the goal.

## Target structure

Keep in root `AGENTS.md`:

- project purpose and ownership;
- fastest setup and validation commands;
- authoritative state and policy paths;
- repository-wide permission and safety boundaries;
- links with clear applicability conditions;
- completion and validation expectations.

Move task-specific detail into one topic per file under `instructions/`, for example testing, security, deployment, frontend, data, or domain guidance. Create only topics that the repository actually needs.

Move durable facts to the authoritative sources defined by the [governance standard](repo-state-files-standard.md). Link instead of copying; a split fails if it creates two editable versions of the same rule.

## Migration workflow

1. Read current instructions and identify who uses each section and when.
2. Map duplicate rules and existing authoritative sources.
3. Keep content needed before most tasks in `AGENTS.md`.
4. Move activity-specific content to the smallest useful set of topic files.
5. Replace moved content with a one-line link and applicability condition.
6. Remove obsolete, repeated, or behavior-neutral process instructions.
7. Verify links, authority, permission boundaries, and first-run commands.
8. Test with representative tasks before treating the new structure as complete.

## Completion test

A fresh agent should be able to answer:

- What does this repository own?
- What evidence and instructions are authoritative?
- Which detailed guidance applies to this task?
- What may be changed without further approval?
- How is current state resumed?
- What validation proves completion?

If the split makes any answer harder or introduces duplicate authority, revise it.
