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
- Store reusable software-repo governance guidance under `coding/software-repo-governance/`.
- Store project-specific notes under `projects/` and learning material under `study/`.

## Non-Responsibilities

- Does not run a production service.
- Does not store credentials, private tokens, or secrets.
- Does not replace source repositories for active software products.

## Public Interfaces

- Markdown files are the primary interface for reading and updating knowledge.
- `AGENTS.md` is the canonical agent instruction entry point.
- `MANIFEST.md` is the global index for retrieval.

## Internal Structure

- `coding/` - Development tools, agent guidance, editor notes, and reusable software-repo practices.
- `docs/` - Internal repository conventions and design specs.
- `os-config/` - Shell and operating-system configuration notes.
- `projects/` - Project and business context.
- `study/` - Learning material and research notes.
- `skills/` and `.agents/skills/` - Reusable agent skills and local skill definitions.

## Dependencies

- Git provides versioning, rollback, and atomic operation history.
- Markdown frontmatter supports retrieval and categorization.
- `MANIFEST.md` links folder structure, recent additions, and tag-based lookup.

## Known Risks

- Navigation drift: files can be added without updating `README.md` or `MANIFEST.md`.
- Context drift: progress, constraints, decisions, or architecture can become stale if not updated with completed work.
- Duplication: similar concepts can appear in multiple folders unless related links and manifest entries stay current.

## Update Log

- 2026-06-10: Initial architecture map for the km repository.
