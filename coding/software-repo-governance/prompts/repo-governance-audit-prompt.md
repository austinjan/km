---
title: Repository Governance Audit Prompt
tags: [software-repo, governance, audit, prompt, agents]
created: 2026-06-10
summary: Pasteable prompt that asks an agent to audit whether a software repository follows the standard repo state file guidance.
related: [coding/software-repo-governance/repo-state-files-standard.md, coding/software-repo-governance/adoption-checklist.md, coding/software-repo-governance/skills/repo-governance-audit-skill.md]
---

# Repository Governance Audit Prompt

Use this prompt with Codex, Claude Code, or another coding agent when you want it to check whether a software repository follows the standard repo state file guidance.

```text
You are auditing this software repository for repository governance readiness.

Goal:
Check whether the repo follows the standard state-file guidance for `AGENTS.md`, `PROGRESS.md`, `CONSTRAINS.md`, and `ARCHITECTURE.md`.

Required references:
- Read root `AGENTS.md` if it exists.
- Read root `PROGRESS.md` if it exists.
- Read root `CONSTRAINS.md` if it exists.
- Read root `ARCHITECTURE.md` if it exists.
- Inspect root `instructions/` if it exists.
- Inspect the repo tree enough to understand whether these docs match the actual project structure.
- Inspect recent git status/diff if available, so you can tell whether current changes require state-file updates.

Audit criteria:
1. `AGENTS.md`
   - MUST exist at the repo root.
   - MUST explain how agents should work in this repo.
   - MUST mention `PROGRESS.md`, `CONSTRAINS.md`, and `ARCHITECTURE.md`.
   - MUST tell agents when to update those state files.
   - MUST stay small: target 50-200 lines.
   - MUST contain only essential items: project overview, first-run commands, global hard constraints, required state files, and links to topic instruction documents.
   - MUST NOT become a giant instruction file.
   - MUST keep global hard constraints to no more than 15 non-negotiable rules.
   - SHOULD link to topic documents with one-line descriptions plus applicability conditions.

2. `PROGRESS.md`
   - MUST exist at the repo root.
   - MUST be the single source of truth for progress.
   - MUST show done, pending, stock/backlog, blocked, and currently progressing work.
   - MUST be updated when task status changes.
   - SHOULD include validation results for completed work.

3. `CONSTRAINS.md`
   - MUST exist at the repo root.
   - MUST centralize hard constraints.
   - Hard constraints MUST use explicit `MUST` or `MUST NOT` language.
   - MUST NOT mix hard constraints with casual preferences unless preferences are clearly labeled separately.
   - MUST require every meaningful operation to be committed as one atomic action.
   - MUST define meaningful operation as one completed logical unit, not every tiny edit.
   - MUST make rollback safety depend on commit atomicity.

4. `ARCHITECTURE.md`
   - MUST exist at the repo root.
   - MUST describe service responsibilities.
   - MUST describe public/internal interfaces and important data flows.
   - MUST list internal and external dependencies.
   - SHOULD identify non-responsibilities, runtime/deployment assumptions, and known architecture risks.

5. Consistency
   - The docs MUST not contradict each other.
   - The docs SHOULD match the actual repo tree and implementation.
   - Recent code or documentation changes SHOULD be reflected in `PROGRESS.md`.
   - Architecture-affecting changes SHOULD be reflected in `ARCHITECTURE.md`.
   - New hard rules SHOULD be reflected in `CONSTRAINS.md`.

6. `instructions/`
   - Detailed instructions MUST live in root `instructions/`.
   - `instructions/` MUST use one section per file.
   - Detailed setup, testing, deployment, style, domain, and workflow guidance SHOULD be linked from `AGENTS.md`, not copied into it.

Output format:
- Start with one of: `PASS`, `PASS WITH GAPS`, or `FAIL`.
- Then list findings ordered by severity.
- For each finding include:
  - Severity: `P0`, `P1`, `P2`, or `P3`
  - File/path
  - Problem
  - Suggested fix
- Include a short "Recommended next actions" section.
- Do not modify files unless explicitly asked.

Severity guide:
- `P0`: Missing core file or contradiction that can mislead future agents immediately.
- `P1`: Required section or update rule missing.
- `P2`: Useful guidance is stale, incomplete, or vague.
- `P3`: Formatting, navigation, or clarity improvement.
```
