---
name: repo-governance-audit
description: Audit or improve a software repository's agent instructions, authority, durable state, progress tracking, constraints, architecture, decisions, permission boundaries, and validation. Use whenever a user asks to prepare a repo for coding agents, review AGENTS.md or state files, check governance or harness readiness, find conflicting or stale repository instructions, or verify whether repo documentation supports safe cross-session work. Audit only unless the user explicitly requests changes.
---

# Repository Governance Audit

Produce an evidence-backed assessment of whether a fresh human or coding agent can enter, understand, change, validate, and resume the repository safely.

## Canonical reference

Read `../../repo-state-files-standard.md` completely before applying this workflow. Treat it as policy. Templates and examples are not compliance rules.

## Outcome and success criteria

An audit succeeds when it:

- identifies the real repository and configured tracker evidence;
- names authoritative sources and material conflicts;
- distinguishes required artifacts from conditional ones;
- checks durable state quality, not just file presence;
- checks permission, validation, and completion boundaries;
- supports every finding with a path, current evidence, and a practical correction;
- stops without modifying the repository unless fixes were requested.

## Collaboration and authorization

- For review, explanation, diagnosis, or planning, inspect and report only.
- For an explicit fix request, make scoped local documentation changes and validate them.
- Ask only when a missing choice would materially change authority, public behavior, destructive action, external state, or scope.
- Preserve unrelated user changes. Do not commit or push unless the user or repository workflow authorizes it.
- Lead with the conclusion. Keep evidence, material caveats, and next actions; omit repeated rules and generic reassurance.

## Workflow

### 1. Establish scope and evidence

Inspect the repository root, active instructions, current Git state, relevant tracker references, and actual project structure. Read the documents that claim authority; do not infer freshness from filenames or templates.

Use independent reads in parallel when practical. Keep dependent checks sequential. Stop retrieving when the core findings have sufficient current evidence.

### 2. Map authority and applicability

Identify:

- instruction precedence and conflicting rules;
- the authoritative progress source;
- which conditional artifacts have a demonstrated purpose;
- legacy names or compatibility requirements;
- request types that authorize review, local changes, external changes, commits, or releases.

Do not mark a repository down for omitting a conditional document when another clear source covers the need.

### 3. Audit state management

Check whether durable state preserves the current objective, scope, status, blockers, decisions, completion criteria, and relevant validation evidence.

Check that the repository:

- separates durable state from routine narration and regenerable output;
- preserves research, design, implementation, review, and validation boundaries when they affect authority;
- compacts after milestones while retaining required state;
- revalidates older summaries and persisted reasoning against live evidence;
- retires stale or contradictory snapshots;
- avoids duplicating Git history or an authoritative external tracker.

### 4. Audit instruction quality

Look for:

- repeated rules that can drift;
- absolute language applied to judgment calls;
- process-heavy instructions without a user-visible outcome;
- missing success criteria, evidence requirements, stop rules, or validation;
- vague personality labels without concrete collaboration behavior;
- instructions that permit unintended implementation or external side effects.

### 5. Determine findings

Use severity based on impact, not document type:

- `P0`: immediate safety, authorization, data-loss, or materially misleading conflict.
- `P1`: missing authority, state, permission, or validation rule likely to cause incorrect work.
- `P2`: stale, duplicated, vague, or over-prescriptive guidance that reduces reliability.
- `P3`: navigation, naming, or clarity improvement with limited behavioral impact.

For each finding include the evidence, why it matters, and the smallest useful fix. Label inference separately from directly observed facts.

### 6. Fix only when requested

When fixes are authorized:

1. Propose or apply the smallest coherent structure that resolves duplicate authority.
2. Create conditional artifacts only when their purpose is demonstrated.
3. Preserve repo-specific instructions and compatible legacy paths.
4. Update affected README, manifest, progress, architecture, constraint, and decision metadata when their actual state changes.
5. Run link, structure, consistency, and Git-diff checks.

## Output

Start with `PASS`, `PASS WITH GAPS`, or `FAIL`, followed by:

1. Conclusion.
2. Findings ordered by severity.
3. Missing or weak evidence.
4. Recommended next actions.
5. If fixes were requested: changed files and validation performed.

Keep the report proportional to the number and impact of findings.

## Stop rules

- Stop when every conclusion has sufficient current evidence and another lookup would only improve phrasing.
- If a required source is missing, name it and narrow the conclusion instead of guessing.
- If evidence conflicts, report the conflict and its consequence.
- Do not expand an audit into implementation without authorization.
