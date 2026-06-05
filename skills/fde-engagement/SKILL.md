---
name: fde-engagement
description: Use this skill for FDE engagement planning, qualification, workflow discovery, prototype or tracer bullet work, controlled pilot, production rollout, phase gate review, delivery document drafting, AI asset extraction, product gap classification, and FDE engagement retrospective.
---

# FDE Engagement

Use this skill to run an FDE engagement as an executable workflow, not as a generic summary. The goal is to move a customer workflow through evidence-backed phases while producing three outcomes every time:

- **Workflow outcome**: the workflow is faster, more reliable, more observable, or has a measurable baseline.
- **AI asset outcome**: reusable know-how becomes a skill, runbook, eval dataset, workflow template, failure taxonomy, connector pattern, or troubleshooting tree.
- **Product learning outcome**: product, platform, onboarding, documentation, permission/data readiness, or sales expectation gaps are classified with evidence and assigned owners.

## Reference Loading

Load references only as needed:

- Read `references/engagement-playbook.md` when choosing a phase, preparing phase work, running a gate review, drafting phase deliverables, checking human-in-the-loop, eval, trace, safety, or product-gap requirements.
- Read `references/file-and-directory-convention.md` when creating, naming, locating, or frontmatter-checking FDE engagement documents or registry assets.
- Read `references/templates.md` when the user asks you to draft a deliverable, gate note, AI asset note, product gap report, or retrospective and no local template already exists.

If the user points to an existing engagement folder, inspect its `engagement.yaml`, phase folders, and relevant documents before deciding the next action.

## Phase Selection

Identify the current phase from the user's request, existing files, and evidence. When unclear, default to the earliest phase whose gate evidence is incomplete.

| Signal | Phase |
| --- | --- |
| Is this a real opportunity, should we take it, who owns it? | Phase 0: Qualification |
| What workflow should we automate, what is in scope, what are the metrics? | Phase 1: Workflow Discovery |
| Build the smallest real agent path, prove trace/eval/human approval. | Phase 2: Prototype / Tracer Bullet |
| Small real-user rollout, adoption/error/cycle-time monitoring. | Phase 3: Controlled Pilot |
| Production permission, audit, rollback, runbook, handoff, support boundary. | Phase 4: Production Rollout |
| Reusable assets, product/platform backlog, pattern extraction, retrospective. | Phase 5: Generalize |
| Monthly health, incident, release/change tracking, follow-up gaps. | Phase 6: Post-Launch Retainer |

Phases may be merged for small engagements, but gates must not disappear. If a phase is skipped or merged, write the reason, risk, and compensating evidence in the proposal, gate note, or acceptance note.

## Standard Workflow

1. **Orient**
   - Determine customer, workflow, engagement id, current phase, requested output, and decision deadline.
   - Inspect existing engagement files when available. Do not invent status if evidence is missing.
   - Confirm the three required outcomes: workflow, AI asset, and product learning.

2. **Read the Right Reference**
   - Load the phase section from `references/engagement-playbook.md`.
   - Load `references/file-and-directory-convention.md` before creating or renaming files.
   - Load `references/templates.md` only when drafting concrete deliverables.

3. **Check Gate Inputs Before Advancing**
   - Owner: business owner, workflow owner, technical/product owner where relevant.
   - Data/samples: real, anonymized, sandbox, or credible mock data with ground truth.
   - UAT/reviewer: named frontline reviewers or operators.
   - Success metric: measurable numerator, denominator, threshold, and baseline or baseline plan.
   - Scope boundary: in scope, out of scope, system boundary, allowed actions, refused actions.
   - Permission/security: data boundary, access model, audit, rollback, production-state protections.
   - Human approval: explicit approval points for external send, state change, high-risk decision, or sensitive access.

4. **Produce the Work**
   - Draft or update the requested engagement artifact using the repo's file convention.
   - Include owner, date, version/status, scope/out-of-scope, evidence, decision log, risks/blockers, and next actions.
   - For AI assets, include applicability, non-applicability, required tools/data/permissions, eval cases, failure modes, fallback, and human approval points.
   - For product gaps, include classification, evidence, impact, recommended owner, disposition, and next action.

5. **Make the Gate Decision**
   - Use one of: `go`, `no-go`, `iterate`, `delay`, `stop`, or `launch`, matching the phase.
   - State the evidence that supports the decision.
   - State missing evidence, accepted risks, blockers, and who owns each next action.
   - If advancing despite missing evidence, record why that is acceptable and what must be monitored.

6. **Validate**
   - Verify source files still exist if you derived from study material.
   - Verify generated paths, filenames, and frontmatter follow the convention.
   - Verify the deliverable covers workflow outcome, AI asset outcome, and product learning outcome.
   - Verify gate checklist items are either satisfied, marked blocker, or explicitly risk-accepted.

## Output Requirements

Every engagement deliverable should include:

- `owner`, `date`, `version` or `status`
- `scope` and `out-of-scope`
- evidence and source notes
- decision log
- risks and blockers
- next actions with owner and due date when possible

Use concise, decision-oriented writing. Prefer checklists, tables, and explicit go/no-go evidence over narrative explanation.

## Safety Rules

- Do not present a demo or prototype as production.
- Do not skip human approval for external communication, production-state changes, high-risk decisions, or sensitive data access.
- Do not proceed to production without permission, audit, rollback, monitoring, support boundary, and named production owners.
- Do not leave product gaps ownerless; assign to product, platform, FDE playbook, CS, sales, customer, or explicitly mark `needs owner`.
- Do not create broad custom work without a bounded workflow, success metric, and gate decision.
