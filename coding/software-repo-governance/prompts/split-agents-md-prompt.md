---
title: Split AGENTS.md Prompt
tags: [agents, software-repo, governance, prompt, instructions]
created: 2026-06-10
summary: Pasteable prompt that asks an agent to split a giant AGENTS.md into a compact root index and topic files under instructions/.
related: [coding/software-repo-governance/agents-splitting-strategies.md, coding/software-repo-governance/repo-state-files-standard.md, coding/software-repo-governance/templates/instructions-README.md]
---

# Split AGENTS.md Prompt

Use this prompt when a repository's root `AGENTS.md` is too large and should be split into a compact root file plus topic-specific instruction files.

```text
You are refactoring this repository's agent instructions.

Goal:
Split a giant root `AGENTS.md` into a compact root index plus detailed topic files under `instructions/`.

Rules:
- Preserve the meaning of the existing instructions.
- Do not delete important constraints, commands, workflows, or repo context.
- Root `AGENTS.md` MUST stay between 50 and 200 lines after the split.
- Root `AGENTS.md` MUST contain only:
  - project overview: one or two sentences
  - first-run commands, such as `make setup` and `make test`, adapted to this repo
  - global hard constraints, no more than 15 non-negotiable rules
  - required project state file rules for `PROGRESS.md`, `CONSTRAINS.md`, and `ARCHITECTURE.md`
  - topic instruction links with one-line descriptions and applicability conditions
- Detailed instructions MUST live in root `instructions/`.
- `instructions/` MUST use one topic/section per file.
- Do not create empty topic files.
- If a hard rule is project-wide and not agent-specific, put it in `CONSTRAINS.md` or link to the existing rule there.
- If content describes service responsibilities, interfaces, data flow, or dependencies, put it in `ARCHITECTURE.md` or link to the existing section there.
- If content describes current status, completed work, blocked work, or next work, put it in `PROGRESS.md`.
- Update `PROGRESS.md` after the split.

Suggested topic files:
- `instructions/testing.md` - Applies when adding, changing, or validating behavior.
- `instructions/development.md` - Applies when setting up local workflow, branches, or common commands.
- `instructions/security.md` - Applies when touching auth, secrets, user data, permissions, or external integrations.
- `instructions/frontend.md` - Applies when changing UI, routes, browser behavior, or visual design.
- `instructions/deployment.md` - Applies when changing runtime, infrastructure, release flow, or environments.
- `instructions/data.md` - Applies when changing schemas, migrations, analytics, retention, or data contracts.
- `instructions/domain.md` - Applies when using business language, domain rules, or glossary terms.

Workflow:
1. Read the current root `AGENTS.md`.
2. Read `CONSTRAINS.md`, `ARCHITECTURE.md`, and `PROGRESS.md` if they exist.
3. Inspect the repo tree enough to understand which topic files are actually useful.
4. Propose the split plan:
   - what stays in `AGENTS.md`
   - which `instructions/` files will be created
   - what content moves to each file
   - whether anything belongs in `CONSTRAINS.md`, `ARCHITECTURE.md`, or `PROGRESS.md`
5. If the user asked you to implement directly, apply the split after the plan.
6. Create or update `instructions/README.md`.
7. Rewrite root `AGENTS.md` as a compact index.
8. Create topic files under `instructions/`.
9. Update `PROGRESS.md` with the completed split and validation result.
10. Report changed files and any unresolved judgment calls.

Output:
- If planning only: provide the split plan and stop.
- If implementing: provide a concise summary, changed files, and validation performed.
```
