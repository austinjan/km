---
title: KM Architecture
tags: [km, architecture, knowledge-base, governance]
created: 2026-06-10
summary: Architecture map for the km file-based knowledge base repository.
related: [AGENTS.md, CONSTRAINS.md, DECISIONS.md, PROGRESS.md, MANIFEST.md]
---

# KM Architecture

This repository is a file-based knowledge base. It stores durable notes, project context, operating conventions, and reusable agent guidance as Markdown files organized by topic.

## Responsibilities

- Own durable knowledge that should survive beyond chat sessions.
- Provide a navigable folder structure with `README.md` files for local context.
- Maintain `MANIFEST.md` as the global retrieval map for agents and humans.
- Store project-local skills once under `.agents/skills/` for supported agents.
- Keep skill-management documentation, templates, and verification tools under `skills/`.
- Store software-repository governance as a self-contained audit skill under `coding/software-repo-governance/skills/repo-governance-audit/`, with policy, guidance, and conditional templates bundled in its `references/` directory.
- Store project-specific notes under `projects/` and learning material under `study/`.

## Non-Responsibilities

- Does not run a production service.
- Does not store credentials, private tokens, or secrets.
- Does not replace source repositories for active software products.

## Public Interfaces

- Markdown files are the primary interface for reading and updating knowledge.
- `AGENTS.md` is the canonical agent instruction entry point.
- `MANIFEST.md` is the global index for retrieval.
- `.agents/skills/*/SKILL.md` files are project-local workflow entry points for supported agents.
- `skills/verify-skills-structure.ts` verifies or migrates project and user-scope skill layouts.

## Internal Structure

- `coding/` - Development tools, agent guidance, editor notes, and reusable software-repo practices.
- `.agents/skills/` - Canonical project-local agent skills.
- `docs/` - Internal repository conventions and design specs.
- `os-config/` - Shell and operating-system configuration notes.
- `projects/` - Project and business context.
- `study/` - Learning material and research notes.
- `skills/` - Skill-management documentation, templates, and verification tools.
- `coding/software-repo-governance/skills/repo-governance-audit/` - Repository-governance workflow plus selectively loaded policy, guidance, and templates.

## Dependencies

- Git provides versioning, rollback, and atomic operation history.
- Markdown frontmatter supports retrieval and categorization.
- `MANIFEST.md` links folder structure, recent additions, and tag-based lookup.

## Known Risks

- Navigation drift: files can be added without updating `README.md` or `MANIFEST.md`.
- Context drift: progress, constraints, decisions, or architecture can become stale if not updated with completed work.
- Duplication: similar concepts can appear in multiple folders unless related links and manifest entries stay current.
- Authority drift: copied governance rules can conflict unless the skill routes every audit through its canonical bundled standard and treats templates as conditional starting points.

## Update Log

- 2026-08-06: Consolidated repository-governance policy, guidance, and templates into the audit skill's progressive-disclosure reference tree.
- 2026-07-20: Made `.agents/skills/` the canonical project-local skill interface and documented `skills/` as its management-tooling surface.
- 2026-06-10: Initial architecture map for the km repository.
