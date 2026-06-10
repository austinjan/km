---
title: instructions/README.md Template
tags: [instructions, software-repo, governance, template]
created: 2026-06-10
summary: Template for the instructions folder that keeps AGENTS.md small by splitting detailed guidance into topic files.
related: [coding/software-repo-governance/repo-state-files-standard.md, coding/software-repo-governance/templates/AGENTS-section.md]
---

# Instructions

This folder stores detailed agent instructions by topic. Keep `AGENTS.md` small and link to these files instead of copying long guidance there.

## Rules

- Use one section per file.
- State when each file applies.
- Keep hard constraints in `CONSTRAINS.md` unless they are only local to one topic.
- Link important topic files from root `AGENTS.md`.

## Suggested Files

- `testing.md` - Applies when adding, changing, or validating behavior.
- `deployment.md` - Applies when changing runtime, infrastructure, release flow, or environments.
- `security.md` - Applies when touching authentication, authorization, secrets, user data, or external integrations.
- `frontend.md` - Applies when changing UI, visual design, routes, or browser behavior.
- `data.md` - Applies when changing schemas, migrations, analytics, retention, or data contracts.
