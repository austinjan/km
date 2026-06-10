---
title: CONSTRAINS.md Template
tags: [constraints, software-repo, governance, template]
created: 2026-06-10
summary: Template for recording hard project constraints with explicit MUST and MUST NOT language.
related: [coding/software-repo-governance/repo-state-files-standard.md]
---

# Project Constraints

This file centralizes hard constraints. Hard constraints MUST use explicit `MUST` or `MUST NOT` language.

## Product Constraints

- The system MUST ...

## Architecture Constraints

- The service MUST ...
- The service MUST NOT ...

## Data Constraints

- The system MUST ...
- The system MUST NOT ...

## Security Constraints

- Secrets MUST NOT be committed to the repository.
- Credentials MUST be loaded from approved runtime configuration.

## Dependency Constraints

- New dependencies MUST ...
- New dependencies MUST NOT ...

## Operational Constraints

- Deployments MUST ...
- Background jobs MUST ...

## Non-Binding Preferences

These are preferences, not hard constraints.

- Prefer ...
