---
title: Repository Governance Audit Skill Draft
tags: [software-repo, governance, audit, skill, agents]
created: 2026-06-10
summary: Skill-style workflow for repeatedly auditing whether a software repo follows the standard state-file guidance.
related: [coding/software-repo-governance/repo-state-files-standard.md, coding/software-repo-governance/prompts/repo-governance-audit-prompt.md]
---

# Repository Governance Audit Skill Draft

This is a portable skill draft. Convert it into a platform-specific `SKILL.md` when the wording has worked well across several repositories.

## Trigger

Use this workflow when the user asks to:

- audit repo governance
- check whether a repo follows the `AGENTS.md` / `PROGRESS.md` / `CONSTRAINS.md` / `ARCHITECTURE.md` standard
- prepare a repo for coding agents
- verify that project state files are complete and current
- check whether recent work updated progress, constraints, or architecture docs

## Inputs

- Repository path, defaulting to current working directory.
- Optional scope, such as "only check docs" or "also inspect recent diff".
- Optional permission to fix issues. If not provided, audit only.

## Workflow

### 1. Identify Repository Context

- Confirm the current repository root.
- Inspect the top-level tree.
- Read `AGENTS.md`, `PROGRESS.md`, `CONSTRAINS.md`, and `ARCHITECTURE.md` if present.
- Inspect `instructions/` if present.
- Check `git status --short` when available.
- Inspect recent diffs when the user wants current-work consistency checked.

### 2. Check Required Files

For each required file, record whether it is:

- present
- missing
- present but incomplete
- present but stale relative to repo contents or current diff

Required files:

- `AGENTS.md`
- `PROGRESS.md`
- `CONSTRAINS.md`
- `ARCHITECTURE.md`
- `instructions/`

### 3. Apply Governance Rules

Check `AGENTS.md`:

- It MUST explain agent workflow for the repo.
- It MUST mention the required state files.
- It MUST say when agents update `PROGRESS.md`, `CONSTRAINS.md`, and `ARCHITECTURE.md`.
- It MUST stay small: target 50-200 lines.
- It MUST contain only essential items: project overview, first-run commands, global hard constraints, required state files, and links to topic instruction documents.
- It MUST NOT become a giant instruction file.
- It MUST keep global hard constraints to no more than 15 non-negotiable rules.
- It SHOULD link to topic documents with one-line descriptions plus applicability conditions.

Check `PROGRESS.md`:

- It MUST identify current focus.
- It MUST include done, pending, stock/backlog, blocked, and progressing sections.
- It MUST not rely on chat history as the only progress source.
- It SHOULD include recent validation results.

Check `CONSTRAINS.md`:

- It MUST centralize hard constraints.
- Hard constraints MUST use explicit `MUST` or `MUST NOT` language.
- Preferences MUST be separated from hard constraints.
- Vague language such as "try to", "maybe", or "prefer" MUST NOT appear in hard constraints.
- It MUST require every meaningful operation to be committed as one atomic action.
- It MUST define meaningful operation as one completed logical unit, not every tiny edit.
- It MUST make rollback safety depend on commit atomicity.

Check `ARCHITECTURE.md`:

- It MUST describe service responsibilities.
- It MUST describe interfaces and important data flows.
- It MUST list internal and external dependencies.
- It SHOULD identify non-responsibilities, runtime assumptions, deployment assumptions, and architecture risks.

Check `instructions/`:

- It MUST contain detailed instruction files by topic.
- It MUST use one section per file.
- Topic files SHOULD state when they apply.
- Detailed setup, testing, deployment, style, domain, and workflow guidance SHOULD live here, not in `AGENTS.md`.

### 4. Report Findings

Start with one of:

- `PASS`
- `PASS WITH GAPS`
- `FAIL`

Use this severity scale:

- `P0`: Missing core file or contradiction that can mislead future agents immediately.
- `P1`: Required section or update rule missing.
- `P2`: Useful guidance is stale, incomplete, or vague.
- `P3`: Formatting, navigation, or clarity improvement.

For every finding, include:

- severity
- file/path
- problem
- suggested fix

### 5. Fix Only When Asked

Do not modify files during an audit unless the user explicitly asks for fixes.

When asked to fix:

- Create missing files from the templates in `coding/software-repo-governance/templates/`.
- Move bloated `AGENTS.md` content into topic files under `instructions/`.
- Preserve existing repo-specific instructions.
- Keep changes scoped to governance docs.
- Update `PROGRESS.md` after the fix.
- Report validation performed.

## Output Shape

```markdown
PASS WITH GAPS

## Findings

- P1 `PROGRESS.md`: Missing blocked section.
  Suggested fix: Add a `## Blocked` section and record any blocked work or `None`.

## Recommended Next Actions

- Add the missing section.
- Re-run the audit after updating the file.
```
