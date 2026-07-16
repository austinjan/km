---
title: Software Repository Governance Standard
tags: [software-repo, governance, agents, state-management, prompt-design]
created: 2026-06-10
updated: 2026-07-16
summary: Canonical, outcome-oriented standard for agent instructions, repository state, authority, permissions, architecture, decisions, and validation.
related: [coding/software-repo-governance/adoption-checklist.md, coding/software-repo-governance/skills/repo-governance-audit/SKILL.md]
---

# Software Repository Governance Standard

This is the canonical policy for this package. Checklists, templates, and skills apply this standard; they do not define competing rules.

The outcome is a repository that a human or coding agent can enter, understand, change safely, validate, and resume without depending on hidden chat history.

## Governance Principles

1. Prefer outcomes, decision rules, and completion evidence over fixed process steps.
2. Use `MUST` only for genuine invariants. Use applicability rules for context-dependent choices.
3. Keep each fact in one authoritative location and link to it elsewhere.
4. Create a document only when it has a reader, a purpose, and an update trigger.
5. Treat repository contents and configured work trackers as evidence; do not assume a document is current because it exists.

## Minimum and Conditional Artifacts

| Artifact | Status | Create or retain it when |
| --- | --- | --- |
| `AGENTS.md` | Required for agent-operated repositories | An agent works directly in the repository. |
| Progress source | Required | Work must be resumed or coordinated. It may be `PROGRESS.md` or an explicitly named external tracker. |
| `CONSTRAINTS.md` | Conditional | The project has durable, non-negotiable rules that are not already authoritative elsewhere. |
| `ARCHITECTURE.md` | Conditional | Ownership, boundaries, data flow, or dependencies are not quickly recoverable from the repository. |
| `DECISIONS.md` or ADRs | Conditional | Important choices may otherwise be re-litigated or lose their rationale. |
| `instructions/` | Conditional | Task-specific guidance would obscure repository-wide instructions in `AGENTS.md`. |

Existing repositories may retain a legacy filename such as `CONSTRAINS.md`. `AGENTS.md` must name the actual authoritative path. New repositories should use `CONSTRAINTS.md`.

## Authority and Conflict Resolution

`AGENTS.md` must identify the repository's authoritative sources rather than copying their contents.

Use this default precedence unless a higher-level platform policy defines another order:

1. Platform, organization, security, and other higher-authority policy.
2. Current explicit user request, within those safety and permission boundaries.
3. Repository-wide `AGENTS.md` instructions.
4. More specific directory or topic instructions.
5. Current state, architecture, constraint, and decision records.
6. Templates and examples, which are never authoritative after adoption.

When sources conflict, report the conflict if it can change the result, authorization, safety, or public behavior. Do not silently merge incompatible rules. Prefer the narrower applicable instruction only when doing so is safe and does not override a higher-authority rule.

## `AGENTS.md`

`AGENTS.md` is the entry router, not a repository encyclopedia.

It should contain only information an agent needs before most tasks:

- a short project purpose and ownership statement;
- the fastest setup and validation commands;
- authoritative paths for progress, constraints, architecture, decisions, and topic instructions;
- repository-wide safety or permission boundaries;
- rules for deciding which detailed instructions apply;
- completion and validation expectations.

Length limits such as 50-200 lines and counts such as 15 constraints are review signals, not compliance requirements. Split the file when important routing information becomes hard to find.

## State Management

State management must preserve useful continuity without treating all previous context as permanently valid. This section adapts OpenAI's GPT-5.6 guidance for long-running workflows and state.

### Name the authoritative state

- Identify where current work status lives: a local file, issue tracker, plan, or another explicit system of record.
- Do not require `PROGRESS.md` when an external tracker is authoritative unless the local file has a distinct, stated purpose.
- Record identifiers or links needed to reconnect local work with the authoritative tracker.

### Separate durable and ephemeral state

Durable state belongs in the repository or configured tracker when it must survive a fresh session:

- current objective, accepted scope, and completion criteria;
- active, blocked, pending, and completed work at the level needed for coordination;
- validated decisions and rejected alternatives;
- architecture boundaries and hard constraints;
- validation evidence that affects whether work is considered complete.

Ephemeral state should normally remain in the current task or tool session:

- routine tool narration;
- abandoned hypotheses;
- raw intermediate output that can be regenerated;
- reasoning tied to assumptions that are no longer current.

### Preserve phase and milestone boundaries

- Distinguish research, design, implementation, review, validation, and external coordination when those phases grant different authority.
- When conversation or tool history is replayed, preserve the original phase or message role so commentary is not mistaken for a final decision.
- Compact state after meaningful milestones, not mechanically after every turn.
- A compacted summary must preserve the objective, accepted scope, decisions, blockers, completion criteria, and required evidence.

### Prevent stale-state anchoring

- Treat persisted reasoning as useful only while its objective, assumptions, and priorities remain current.
- Re-check live repository and tracker evidence before relying on older summaries.
- Replace or retire stale state instead of accumulating contradictory snapshots.
- Keep stable instruction prefixes stable when prompt caching matters; change them intentionally and validate the effect.

### Define update triggers and stopping conditions

Update durable state when the objective, scope, status, blocker, accepted decision, architecture boundary, hard constraint, or completion evidence changes. Do not turn the state source into a log of every edit.

Stop updating when the authoritative state fully represents the current milestone and another entry would only repeat implementation detail already available from Git history.

## Constraints, Architecture, and Decisions

### Constraints

Keep only true invariants in the authoritative constraints source. Use `MUST` and `MUST NOT` for safety, compatibility, legal, data, or operational rules that genuinely admit no judgment. Express preferences and context-dependent behavior as decision rules.

### Architecture

Document the system shape appropriate to the repository: service, library, CLI, application, monorepo, data pipeline, or documentation system. Cover ownership, non-ownership, interfaces, data flow, important dependencies, runtime boundaries, and risks only where they help future changes.

### Decisions

Record choices future contributors might otherwise revisit without the original context. Include the decision, reason, relevant alternatives, consequences, and follow-up. Use a single `DECISIONS.md` for a small history or ADR files when independent decisions need their own lifecycle.

## Autonomy and Approval Boundaries

Repository instructions should distinguish request types:

- Answer, explain, review, diagnose, and plan: inspect and report; do not implement unless requested.
- Change, build, and fix: make scoped local changes and run relevant non-destructive validation.
- External writes, destructive actions, releases, purchases, credential changes, and material scope expansion: require explicit authority unless an established workflow clearly grants it.

Git commits and pushes are actions, not automatic documentation hygiene. Define commit boundaries for rollback safety, but follow the user's authorization and repository workflow before committing or pushing. Never include unrelated user changes.

## Collaboration and Response Guidance

Personality and collaboration rules are optional and should remain short. Define concrete behavior rather than labels such as "friendly":

- how directly to state conclusions;
- when to ask, make a reversible assumption, or stop;
- how to report uncertainty and tradeoffs;
- what evidence must be included;
- the default response detail and what a shorter answer must preserve.

For concise responses, preserve the conclusion, required evidence, material caveats, decisions, and next action. Remove repetition, generic reassurance, and optional background first.

These rules do not replace goals, success criteria, permission boundaries, tool routing, validation, or stopping conditions.

## Validation and Completion

A governance audit must test usefulness, not only file presence. Success means:

- authoritative sources are named and do not conflict;
- required and applicable conditional artifacts have a clear purpose and update trigger;
- current repository or tracker evidence supports claims of freshness;
- permission boundaries prevent unintended changes;
- a fresh agent can locate setup, state, constraints, and validation without hidden context;
- validation covers the requested change, and missing evidence is reported rather than guessed.

Evaluate prompt or instruction changes on representative repository tasks. Remove repeated rules one group at a time, rerun the same cases, and keep a change only when it preserves or improves correct behavior.

## Source Guidance

- [OpenAI: GPT-5.6 long-running workflows and state](https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6#long-running-workflows-and-state) — phase preservation, milestone compaction, persisted reasoning, and stable prompt prefixes.
- [OpenAI: GPT-5.6 personality, collaboration, and response length](https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6#personality-collaboration-and-response-length) — concrete collaboration behavior and information-preserving brevity.
