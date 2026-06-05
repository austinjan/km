---
title: FDE Engagement Playbook Reference
tags: [fde, engagement, workflow, phase-gate, ai-asset, product-gap]
created: 2026-06-05
summary: Condensed operational reference for running FDE engagements from qualification through retainer while preserving workflow, AI asset, and product learning outcomes.
related: [study/fde-team/fde-engagement-playbook.md, study/fde-team/forward-deployed-engineering.md]
---

# FDE Engagement Playbook Reference

This reference distills the source playbook into phase actions, evidence, deliverables, and gate checks. Use the source files in `study/fde-team/` when deeper rationale is needed.

## Non-Negotiable Outcomes

Every engagement must produce or explicitly rule out all three:

| Outcome | Required check |
| --- | --- |
| Workflow outcome | Faster, more stable, more observable, or baseline established. |
| AI asset outcome | Skill, runbook, eval, template, failure taxonomy, connector pattern, or explicit no-reuse reason. |
| Product learning outcome | Product/platform/onboarding/docs/permission/data/sales gap classified with evidence and owner. |

## Phase 0: Qualification

Purpose: avoid accepting vague AI wishes, ownerless work, or impossible data/security situations.

Required work:

- Identify business owner, workflow owner, and IT/security/data owner.
- Obtain 10-20 real, anonymized, or sandbox examples with inputs, intermediate decisions, and outputs.
- Name 3-5 frontline UAT reviewers.
- Confirm human-in-the-loop is accepted.
- Define at least one metric such as cycle time, manual effort, error rate, acceptance rate, escalation rate, or task completion.
- Identify possible know-how assets and product gap hypotheses.

Deliverables:

- `customer-readiness-scorecard`
- `workflow-candidate-list`
- `no-go-report` when no scenario is suitable
- `know-how-capture-plan`
- `product-gap-hypothesis`

Gate:

- Go when owner, samples, UAT users, success metric, and bounded scope exist.
- No-go when no owner/data/frontline users exist, human approval is refused, or the ask is only a broad transformation wish.
- Iterate when the opportunity is valuable but owner, data, permission, or scope boundary needs readiness work.

## Phase 1: Workflow Discovery

Purpose: narrow the scenario into one valuable workflow with baseline, system boundary, agent boundary, know-how map, and product gap classification.

Required work:

- Interview business, frontline, IT, security, data, and compliance stakeholders as relevant.
- Collect 20-50 examples covering happy path, edge case, and reject case.
- Map input, decision, tool, handoff, approval, exception, and output.
- Establish baseline or a plan to create one.
- Mark agent allowed actions, refused actions, and human approval requirements.
- Capture judgment rules, exceptions, escalation criteria, tool sequence, and non-automatable areas.
- Classify product gaps as product feature, integration, documentation, onboarding, permission/data readiness, sales expectation, or reusable module opportunity.

Deliverables:

- `workflow-discovery-brief`
- `current-state-workflow-map`
- `agent-opportunity-brief`
- `success-metrics-and-baseline`
- `scope-boundary`
- `know-how-capture-map`
- `product-gap-classification`

Gate:

- Go when scope is narrow, baseline is trackable, tools/data are accessible, and risk is bounded.
- No-go when workflow instability, missing data/permission, or undefined success criteria prevents a real prototype.
- Iterate by recutting scope or doing readiness work first.

## Phase 2: Prototype / Tracer Bullet

Purpose: prove the smallest real end-to-end agent workflow with trace, logging, eval, and human confirmation.

Required work:

- Implement one happy path using real data, sandbox, or credible mock.
- Record tool call logs, agent trace, human decision points, and failure reports.
- Create at least 30 eval cases spanning happy path, edge case, and reject case.
- Record failure taxonomy: data missing, permission missing, model error, tool error, scope ambiguity, approval gap, product gap.
- Produce a draft AI asset and product gap report v1.

Deliverables:

- `agent-spec`
- `prototype-demo-notes`
- `eval-dataset`
- `eval-report`
- `trace-logging-report`
- `production-gap-list`
- `agent-skill-asset`
- `product-gap-report`

Gate:

- Go pilot when reviewer value is confirmed, critical risk is controlled, and further data/permission access is plausible.
- Iterate when task completion is low but failures are fixable or scope can be narrowed.
- Stop when the workflow is not agent-suitable, risk is uncontrolled, or the customer will not provide UAT/permissions.

## Phase 3: Controlled Pilot

Purpose: let a small real user group use the agent in a controlled environment and verify adoption, error, cycle time, handoff, support, and asset usability.

Required work:

- Use sandbox, staging, or controlled production replica.
- Define permission model, audit trail, approval queue, rollback, and manual override.
- Monitor adoption, error, cycle time, operator feedback, incidents, and support.
- Process 50-200 real or anonymized cases, or justify a smaller sample.
- Validate the AI asset with at least one non-original developer or operator.
- Assign product/platform backlog recommendations with owner review.

Deliverables:

- `pilot-plan`
- `permission-and-approval-model`
- `audit-and-rollback-plan`
- `monitoring-dashboard-spec`
- `weekly-pilot-report`
- `incident-process`
- `pilot-retrospective`
- `agent-skill-asset`
- `product-platform-backlog-recommendation`

Gate:

- Go production when adoption, risk, permission, support, and operator readiness are controlled.
- Iterate when value exists but permission, UI, training, workflow, or scope needs adjustment.
- Stop when users do not adopt, risk is too high, the owner will not take over, or a core product gap blocks progress.

## Phase 4: Production Rollout

Purpose: make the agent workflow part of normal operations with safety, ownership, monitoring, rollback, training, handoff, and support boundaries.

Required work:

- Complete security/access review.
- Establish production permission, audit, approval, rollback, monitoring, alerting, and cost tracking.
- Version prompts, tools, configs, and eval datasets.
- Run production smoke tests.
- Train operators and hand off runbooks.
- Finalize AI asset package and product gap closure package.

Deliverables:

- `production-readiness-checklist`
- `security-access-review`
- `versioned-agent-config`
- `production-smoke-test-report`
- `monitoring-alerting-cost-plan`
- `production-runbook`
- `operator-training-material`
- `handoff-package`
- `post-launch-support-plan`
- `product-gap-closure-package`

Gate:

- Launch when security, permission, rollback, monitoring, operator readiness, support boundary, and production owners are ready.
- Delay when owner, permission, rollback, monitoring, operator readiness, or critical gap is missing.
- Stop when no production owner exists or the customer requires out-of-scope autonomous decisions.

## Phase 5: Generalize

Purpose: convert validated field learning into product capability, platform backlog, reusable AI assets, and sales/CS enablement.

Required work:

- Extract reusable pattern with applicability, non-applicability, required data, required permission, and risks.
- Move mature reusable assets to the registry and reference them from the engagement.
- Assign connector, runtime, eval harness, deployment tooling, product, onboarding, documentation, sales, and CS gaps.
- Run build/prove/generalize retrospective with original squad and product/platform owners.

Deliverables:

- `build-prove-generalize-retrospective`
- `reusable-pattern-brief`
- `connector-backlog`
- `product-roadmap-input`
- `sales-cs-enablement-notes`

Gate:

- Complete when workflow outcome is recorded, reusable assets are registered or ruled out, product learning has owners, and the retrospective is done.

## Phase 6: Post-Launch Retainer

Purpose: keep production workflow healthy without turning FDE into unbounded outsourcing.

Required work:

- Run weekly, biweekly, or monthly health review.
- Triage incidents and update evals, prompts, tools, and runbooks in small bounded changes.
- Track usage, errors, costs, releases, change log, and product gap follow-up.
- Maintain improvement backlog and identify next workflow opportunities.

Deliverables:

- `monthly-operation-report`
- `incident-postmortem`
- `change-log`
- `release-notes`
- `improvement-backlog`
- `product-gap-follow-up`

Gate:

- Continue only when SLA, incident handling, change log, improvement backlog, and product-gap follow-up remain bounded and owned.

## Gate Checklist

Before any gate decision, check:

- Owners: business, workflow, technical/product, production where relevant.
- Data/samples: enough examples, sandbox, ground truth, or explicit blocker.
- UAT/reviewer: named frontline reviewers or operators.
- Success metric: baseline, target, denominator, and tracking plan.
- Scope boundary: in scope, out of scope, system boundary, refused actions.
- Permission/security: access, data boundary, audit, rollback, monitoring, sensitive-data handling.
- Human approval: required approval points and actions that must never be autonomous.
- Eval/trace: test cases, tool call logs, failure taxonomy, and reviewer evidence.
- Product gap owner: each gap assigned or marked `needs owner` with escalation path.
