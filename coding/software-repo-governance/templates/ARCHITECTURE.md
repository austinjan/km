---
title: ARCHITECTURE.md Template
tags: [architecture, software-repo, governance, template]
created: 2026-06-10
summary: Template for documenting service responsibilities, interfaces, dependencies, and boundaries.
related: [coding/software-repo-governance/repo-state-files-standard.md]
---

# Architecture

This file describes service responsibilities, interfaces, dependencies, and boundaries.

## Service Purpose

Describe why this service exists.

## Responsibilities

- Owns ...

## Non-Responsibilities

- Does not own ...

## Public Interfaces

- API / CLI / UI / event interface:
  - Purpose:
  - Inputs:
  - Outputs:
  - Compatibility expectations:

## Internal Interfaces

- Module or boundary:
  - Purpose:
  - Callers:
  - Dependencies:

## Data Model / Persistence

- Primary data entities:
- Storage:
- Retention:
- Migration rules:

## Dependencies

### Internal Dependencies

- Service/module:
  - Used for:
  - Failure impact:

### External Dependencies

- Vendor/API/service:
  - Used for:
  - Auth/config:
  - Failure impact:

## Runtime / Deployment

- Runtime:
- Configuration:
- Environments:
- Startup/shutdown:

## Known Risks

- Risk:
  - Impact:
  - Mitigation:

## Update Log

- YYYY-MM-DD: Initial architecture document.
