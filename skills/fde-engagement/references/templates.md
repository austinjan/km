---
title: FDE Engagement Templates
tags: [fde, templates, phase-gate, product-gap, ai-asset]
created: 2026-06-05
summary: Lightweight drafting skeletons for FDE engagement deliverables, gate decisions, AI assets, product gaps, and retrospectives.
related: [skills/fde-engagement/references/engagement-playbook.md, skills/fde-engagement/references/file-and-directory-convention.md]
---

# FDE Engagement Templates

Use these skeletons only when no more specific local template exists.

## Standard Deliverable Skeleton

```markdown
---
doc_type: <doc-type-slug>
title: <customer> <workflow> <deliverable>
engagement: <engagement-id>
customer: <customer-slug>
workflow: <workflow-slug>
phase: <NN-phase>
status: draft
version: 1
owner: <owner>
date: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
---

# <Title>

## Scope

## Out Of Scope

## Evidence

## Current Decision

## Decision Log

| Date | Decision | Evidence | Owner |
| --- | --- | --- | --- |

## Risks And Blockers

| Risk / Blocker | Impact | Owner | Next Action |
| --- | --- | --- | --- |

## Next Actions

| Action | Owner | Due |
| --- | --- | --- |
```

## Gate Decision Skeleton

```markdown
# Gate Decision: <phase>

Decision: <go | no-go | iterate | delay | stop | launch>

## Evidence Checked

- Owner:
- Data/samples:
- UAT/reviewer:
- Success metric:
- Scope boundary:
- Permission/security:
- Human approval:
- Eval/trace:
- Product gap owner:

## Three Outcomes

- Workflow outcome:
- AI asset outcome:
- Product learning outcome:

## Missing Evidence Or Accepted Risk

| Item | Risk | Accepted By | Follow-up |
| --- | --- | --- | --- |

## Next Actions

| Action | Owner | Due |
| --- | --- | --- |
```

## AI Asset Skeleton

```markdown
# AI Asset: <name>

## Intended Use

## Not For

## Required Tools, Data, And Permissions

## Workflow Steps

## Human Approval Points

## Eval Cases

| Case | Type | Input | Expected Output | Notes |
| --- | --- | --- | --- | --- |

## Failure Modes And Fallback

| Failure Mode | Detection | Fallback | Owner |
| --- | --- | --- | --- |

## Validation Evidence

## Registry Plan
```

## Product Gap Skeleton

```markdown
# Product Gap Classification

| Gap | Category | Evidence | Impact | Recommended Owner | Disposition | Next Action |
| --- | --- | --- | --- | --- | --- | --- |

Categories: product feature, integration, documentation, onboarding, permission/data readiness, sales expectation, reusable module, FDE playbook, platform tooling, customer action.
```

## Retrospective Skeleton

```markdown
# Build / Prove / Generalize Retrospective

## Workflow Outcome

## AI Asset Outcome

## Product Learning Outcome

## What Worked

## What Failed Or Surprised Us

## Reusable Patterns

## Non-Reusable Context

## Product / Platform / CS / Sales Follow-up

| Item | Owner | Evidence | Next Action |
| --- | --- | --- | --- |
```
