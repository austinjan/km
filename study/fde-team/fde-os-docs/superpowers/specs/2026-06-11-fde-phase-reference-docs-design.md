---
title: FDE Engagement Phase Reference Docs — Design
date: 2026-06-11
status: draft
---

# Design: Fill the 6 TODO phase reference docs in `fde-engagement`

## Problem

`skills/fde-engagement/references/` has one fully-developed phase guide,
`qualification.md` (Phase 0), and **six 28-line stubs** with only `TODO`
sections:

- `workflow-discovery.md` (Phase 1)
- `prototype-tracer-bullet.md` (Phase 2)
- `controlled-pilot.md` (Phase 3)
- `production-rollout.md` (Phase 4)
- `generalize.md` (Phase 5)
- `post-launch-retainer.md` (Phase 6)

Each stub must become an interactive phase guide like `qualification.md` that:

1. **Asks the FDE** the right questions to collect the information the phase needs
   and to understand the current situation (the "ask → collect" loop).
2. **Validates the phase outcome** against explicit gate criteria.
3. **Advises** the FDE on how to finish the phase's work and unblock missing evidence.

## Decisions

- **Order:** sequential Phase 1 → 6.
- **Depth:** full parity with `qualification.md`'s richness; **no new `.js`
  scripts** (later phases gate on evidence/thresholds, not numeric scoring).
- **Language:** English only.
- **Cadence:** write all six, then a single batch review.
- **Source of truth:** `references/engagement-playbook.md` (condensed) and
  `docs/FDE/engagement/fde-engagement-playbook.md` (full). Enrich to
  qualification-level depth.
- **Filenames in deliverable tables:** use the **bare doc-type slugs** from
  `references/file-and-directory-convention.md` ("Standard Doc Types" table).
  The full playbook's `fde-`-prefixed filenames are superseded by the convention
  (path carries phase, filename carries bare doc type).

## Common template (every phase doc)

1. **Frontmatter** — `name`, `description` (phase-specific).
2. **Purpose** — one paragraph; "act as the phase guide and gatekeeper" framing.
3. **Agent Instructions** — numbered run order: run intake questions, gather
   required-work evidence, check the gate, draft/update deliverables, load the
   convention before creating files, load templates only if no local template,
   record missing evidence + owner + recheck for `iterate`.
   Closes with a "do not guess <phase unknowns>; ask or mark a blocker" line.
4. **Intake Questions** *(satisfies "ask the FDE / understand current situation")* —
   grouped questions the skill asks the FDE before/while doing the work.
5. **Required Work** — the evidence/gates to gather, each with a
   *consequence-if-skipped* line (the `qualification.md` style).
6. **Gate Criteria** — decision table producing the phase verb + the evidence
   each verb requires.
7. **Advisory: Helping the FDE Finish** *(satisfies "provide advice, help finish")* —
   common failure modes, how to unblock missing evidence, what "good enough to
   advance" looks like.
8. **Deliverables** — table: deliverable / filename (bare slug) / produce-condition
   / minimum content; plus deliverable rules and the three-outcomes note.
9. **Validation Checklist** — convention/frontmatter; covers workflow + AI asset +
   product-learning outcomes; gate items satisfied/blocked/risk-accepted; phase-specific items.
10. **Closure** — only where the phase can end delivery work (Phase 2 `stop`,
    Phase 3 `stop`, Phase 4 `launch`/`stop`).

## Phase decision verbs (consistent with SKILL.md step 5)

| Phase | Verbs |
|---|---|
| 1 Workflow Discovery | go / iterate / no-go |
| 2 Prototype / Tracer Bullet | go-pilot / iterate / stop |
| 3 Controlled Pilot | go-production / iterate / stop |
| 4 Production Rollout | launch / delay / stop |
| 5 Generalize | complete |
| 6 Post-Launch Retainer | continue |

## Per-phase content map (deliverables use bare slugs)

- **Phase 1 — `10-discovery`:** `workflow-discovery-brief`, `current-state-workflow-map`,
  `agent-opportunity-brief`, `success-metrics-and-baseline`, `scope-boundary`,
  `know-how-capture-map`, `product-gap-classification`.
  Gate: narrow scope, trackable baseline, accessible tools/data, bounded risk.
- **Phase 2 — `20-prototype`:** `agent-spec`, `prototype-demo-notes`, `eval-dataset`,
  `eval-report`, `trace-logging-report`, `production-gap-list`, `agent-skill-asset`,
  `product-gap-report`. Key thresholds: ≥30 eval cases; task completion target ≥70%;
  zero critical security errors; every tool call traced; 3–5 UAT reviewers.
- **Phase 3 — `30-pilot`:** `pilot-plan`, `permission-and-approval-model`,
  `audit-and-rollback-plan`, `monitoring-dashboard-spec`, `weekly-pilot-report`,
  `incident-process`, `pilot-retrospective`, `product-platform-backlog-recommendation`.
  Thresholds: 5–15 users / 50–200 cases; ≥2 weeks no critical incident; acceptance 50–70%;
  cycle-time improvement 15–30%; asset used by a non-author operator.
- **Phase 4 — `40-production`:** `production-readiness-checklist`, `security-access-review`,
  `versioned-agent-config`, `production-smoke-test-report`, `monitoring-alerting-cost-plan`,
  `production-runbook`, `operator-training-material`, `handoff-package`,
  `post-launch-support-plan`, `product-gap-closure-package`. Named production/technical/business
  owners; security review; smoke test; 2–4 week stabilization; gap closure package owned.
- **Phase 5 — `50-generalize`:** `build-prove-generalize-retrospective`, `reusable-pattern-brief`,
  `connector-backlog`, `product-roadmap-input`, `sales-cs-enablement-notes`. Mature assets
  graduate to `skills/`; every gap owned; retrospective done.
- **Phase 6 — `60-retainer`:** `monthly-operation-report`, `incident-postmortem`, `change-log`,
  `release-notes`, `improvement-backlog`, `product-gap-follow-up`. Bounded scope; SLA met;
  postmortems for critical incidents; out-of-scope list explicit.

## Out of scope

- No edits to `SKILL.md` (reference paths already wired).
- No new scripts, no template changes, no changes to `qualification.md`.
