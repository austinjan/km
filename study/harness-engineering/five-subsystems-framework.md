---
title: The Harness — Definition, Five Subsystems, and Canonical Artifacts
tags: [harness-engineering, ai-agents, claude-code, agents-md, context-engineering, llm]
created: 2026-06-10
summary: The core mental model of harness engineering — a harness is everything outside the model weights, decomposed into 5 subsystems (Instructions, Tools, Environment, State, Feedback) backed by concrete repo files. Includes the artifact cheat sheet and a critical assessment of the framework's gaps.
related: [study/harness-engineering/course-notes.md, study/AI/note.md]
---

# The Harness: Definition, Five Subsystems, Canonical Artifacts

## What a harness is

> **A harness is everything in the engineering infrastructure *outside the model
> weights*.**

It is NOT just a prompt or a single `CLAUDE.md` file. It is the structured
scaffolding that determines how much of the model's actual capability gets
realized in practice. A strong model with no tools, no feedback loop, and no
reproducible environment performs like a much weaker one.

Foundational constraint (OpenAI): **"information that doesn't exist in the repo,
doesn't exist for the agent."** Agents see only three things — system prompts,
repository file contents, and tool outputs. Knowledge in Slack/Confluence/Jira/
engineers' heads is invisible and forces guessing.

## The five subsystems

| # | Subsystem | Responsibility | Canonical artifact(s) |
|---|-----------|----------------|------------------------|
| 1 | **Instructions** | Orient the agent: project overview, stack, constraints, doc links | `AGENTS.md` / `CLAUDE.md` (router, 50–200 lines) + `docs/*.md` topic files |
| 2 | **Tools** | Operational access (shell, package mgmt) under least-privilege | tool/permission config |
| 3 | **Environment** | Self-describing, reproducible runtime | `pyproject.toml`, `.nvmrc`, `.python-version`, Docker, devcontainers |
| 4 | **State** | Cross-session continuity: done / doing / blocked, and the *why* | `PROGRESS.md`, `DECISIONS.md`, atomic git commits |
| 5 | **Feedback** | Objective verification the agent can run to confirm success | test/lint/typecheck commands (`pytest`, `mypy`, `ruff`), E2E pipeline |

**Highest leverage:** the **Feedback** subsystem — lowest investment, highest
return. It closes the loop so the agent can self-correct instead of guessing
confidently (open loop).

## Canonical repo artifacts (the recurring "harness file set")

- `AGENTS.md` / `CLAUDE.md` — entry router. Project overview, run commands, ≤15
  hard constraints, links out. **Not** an encyclopedia.
- `docs/<topic>.md` — topic docs (api-patterns, database-rules…), 50–150 lines,
  loaded on demand (progressive disclosure).
- `ARCHITECTURE.md` (per module) — responsibilities, interfaces, constraints.
- `CONSTRAINTS.md` — explicit MUST / MUST NOT rules.
- `PROGRESS.md` — current state, completed/in-progress, blockers, next steps.
- `DECISIONS.md` — design decisions + rationale + rejected alternatives.
- **Feature list** (JSON/Markdown) — the harness *primitive*: per feature a
  triple of {behavior, verification command, state}. States: `not_started →
  active → blocked → passing`; transition to `passing` only via successful
  verification (irreversible, agent cannot self-declare).
- **Session Exit Checklist** — build passes, tests pass, progress recorded, no
  debug code/stale artifacts, standard startup path works.

## Key diagnostic concepts

- **Fresh Session Test** — can a brand-new agent session answer the 5 basic
  project questions using *only* repo contents?
- **Verification gap** — agent's self-reported confidence vs. actual
  correctness. The most common failure mode. (Neural nets are systematically
  overconfident — ICML 2017.)
- **Controlled variable exclusion + failure attribution** — toggle one subsystem
  at a time to find the real bottleneck before blaming the model.
- **Harness rots like code** — audit and prune regularly; stale docs are more
  dangerous than missing ones (knowledge decay misdirects agents).
- **WIP = 1** — limit work-in-progress to one active task (Kanban / Little's
  Law); cited 37% higher completion.

---

## Critical assessment (my take)

The framework is genuinely good and worth teaching from. The "outside the
weights" definition and the emphasis on Feedback are the parts to defend
hardest. Refinements:

1. **Boundaries aren't clean — "Environment" largely collapses into "Tools."**
   Reproducibility (`.nvmrc`, lockfiles, containers) is a *quality of the
   execution environment the tools run in*, not a true peer axis. A 4-way cut
   (Instructions / Tools+Environment / State / Feedback) is arguably more honest.

2. **"State" as a single `PROGRESS.md` is the thinnest part.** Real state lives
   in many forms — conversation context, compaction/summarization, persistent
   memory, git history, the issue tracker. The *function* (durable cross-session
   memory) is real; one markdown file is a brittle implementation of it.

3. **Missing a 6th subsystem: Control / Orchestration.** Who decides when to
   stop, when to ask the human, when to spawn a subagent, how to gate
   permissions, how to decompose work? That runtime control loop is what makes a
   harness *agentic* rather than just well-documented, and it doesn't fit cleanly
   into any of the five. The course's model is mostly about *static context
   provisioning* and under-weights the *runtime loop*.

**Impact ranking (mine):** Tools ≈ Feedback > Instructions > Environment > State.

**Bottom line:** solid, useful, teachable. Disagreements are at the margins —
slightly over-split categories (Environment ⊂ Tools), an under-theorized State
category, and an omitted orchestration/control loop.
