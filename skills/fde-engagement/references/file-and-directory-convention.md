---
title: FDE File and Directory Convention Reference
tags: [fde, file-convention, frontmatter, engagement-docs]
created: 2026-06-05
summary: Operational file naming, directory, and frontmatter rules for FDE engagement documents and reusable registry assets.
related: [study/fde-team/fde-file-and-directory-convention.md]
---

# FDE File and Directory Convention Reference

Use this reference before creating or renaming FDE engagement files.

## Directory Shape

```text
fde/
├── engagements/
│   └── <engagement-id>/
│       ├── engagement.yaml
│       ├── 00-qualification/
│       ├── 10-discovery/
│       ├── 20-prototype/
│       ├── 30-pilot/
│       ├── 40-production/
│       ├── 50-generalize/
│       └── 60-retainer/
├── registry/
│   ├── skills/<skill-name>/SKILL.md
│   ├── eval-templates/<name>.md
│   ├── connectors/<name>.md
│   ├── patterns/<pattern-name>.md
│   └── playbook-templates/<name>.md
├── index/
│   └── catalog.json
└── templates/
    └── <doc-type-slug>.md
```

Engagement ids use `<customer-slug>-<workflow-slug>[-<seq>]`: lowercase ASCII kebab-case, no date, no spaces, no underscores.

## Phase Folders

| Folder | Phase |
| --- | --- |
| `00-qualification` | Phase 0: Qualification |
| `10-discovery` | Phase 1: Workflow Discovery |
| `20-prototype` | Phase 2: Prototype / Tracer Bullet |
| `30-pilot` | Phase 3: Controlled Pilot |
| `40-production` | Phase 4: Production Rollout |
| `50-generalize` | Phase 5: Generalize |
| `60-retainer` | Phase 6: Post-Launch Retainer |

If a phase is skipped or merged, still create the phase folder and add a gate or acceptance note explaining reason, risk, and compensating evidence.

## Filename Pattern

```text
<doc-type-slug>[__<qualifier>].md
```

Rules:

- Path carries engagement and phase; filename carries stable doc type only.
- Do not put `fde-`, status, version, owner, or date in the filename.
- Use `__<qualifier>` only for recurring or multi-instance documents.
- Keep filenames lowercase ASCII kebab-case.

Qualifiers:

| Document | Qualifier | Example |
| --- | --- | --- |
| `weekly-pilot-report` | ISO week `YYYY-Www` | `weekly-pilot-report__2026-W23.md` |
| `monthly-operation-report` | Month `YYYY-MM` | `monthly-operation-report__2026-06.md` |
| `incident-postmortem` | Incident id | `incident-postmortem__INC-2026-001.md` |
| `release-notes` | Version | `release-notes__v1.0.16.md` |

## Standard Doc Types

| Phase folder | Doc types |
| --- | --- |
| `00-qualification` | `customer-readiness-scorecard`, `workflow-candidate-list`, `no-go-report`, `know-how-capture-plan`, `product-gap-hypothesis` |
| `10-discovery` | `workflow-discovery-brief`, `current-state-workflow-map`, `agent-opportunity-brief`, `success-metrics-and-baseline`, `scope-boundary`, `know-how-capture-map`, `product-gap-classification` |
| `20-prototype` | `agent-spec`, `prototype-demo-notes`, `eval-dataset`, `eval-report`, `trace-logging-report`, `production-gap-list`, `agent-skill-asset`, `product-gap-report` |
| `30-pilot` | `pilot-plan`, `permission-and-approval-model`, `audit-and-rollback-plan`, `monitoring-dashboard-spec`, `weekly-pilot-report`, `incident-process`, `pilot-retrospective`, `product-platform-backlog-recommendation` |
| `40-production` | `production-readiness-checklist`, `security-access-review`, `versioned-agent-config`, `production-smoke-test-report`, `monitoring-alerting-cost-plan`, `production-runbook`, `operator-training-material`, `handoff-package`, `post-launch-support-plan`, `product-gap-closure-package` |
| `50-generalize` | `build-prove-generalize-retrospective`, `reusable-pattern-brief`, `connector-backlog`, `product-roadmap-input`, `sales-cs-enablement-notes` |
| `60-retainer` | `monthly-operation-report`, `incident-postmortem`, `change-log`, `release-notes`, `improvement-backlog`, `product-gap-follow-up` |

## Required Frontmatter

Every engagement document must include:

```yaml
---
doc_type: agent-spec
title: Example workflow agent spec
engagement: customer-workflow
customer: customer
workflow: workflow
phase: 20-prototype
status: draft
version: 1
owner: owner-name
date: 2026-06-05
updated: 2026-06-05
---
```

Allowed `status` values:

- `draft`
- `in-review`
- `accepted`
- `validated`
- `superseded`

Useful optional fields:

```yaml
contributors: [name]
gate: prototype
tags: [scada, triage]
related:
  - 10-discovery/workflow-discovery-brief.md
produced_assets:
  - registry/skills/example-skill@1.0
```

## Reusable Registry Assets

Reusable assets graduate out of an engagement into `fde/registry/`. Engagement documents should reference registry assets instead of copying them.

Rules:

- Skill assets use `registry/skills/<skill-name>/SKILL.md`.
- Registry assets include `origin_engagement` and `version` in frontmatter.
- Reference format is `registry/skills/<name>@<version>`.
- An engagement may keep a draft `agent-skill-asset` document during prototype/pilot, but mature assets should move to registry during generalization.

## Hard Rules

- One file has one `doc_type`.
- Dates use ISO 8601.
- Status and version live in frontmatter, not filenames.
- Use git history for old versions; only keep `status: superseded` when a point-in-time file is operationally important.
- Catalogs and manifests should be generated from frontmatter when automation exists; avoid hand-maintained drift.
