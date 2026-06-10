---
title: KM Constraints
tags: [km, constraints, governance, git]
created: 2026-06-10
summary: Hard constraints for maintaining the km knowledge base repository.
related: [AGENTS.md, PROGRESS.md, DECISIONS.md, coding/software-repo-governance/repo-state-files-standard.md]
---

# KM Constraints

This file centralizes hard constraints for the km repository. Hard constraints use explicit `MUST` / `MUST NOT` language.

## Git Constraints

- Every meaningful operation MUST be committed. No exceptions.
- A meaningful operation means one completed logical unit of work, not every tiny edit. The unit MUST be coherent enough to understand, revert, or cherry-pick independently.
- Each commit MUST represent one atomic action. Agents MUST NOT bundle unrelated changes into one commit.
- Agents MUST NOT leave completed meaningful work uncommitted.
- Rollback safety depends on commit atomicity. Commit boundaries MUST be treated as part of the implementation, not after-the-fact cleanup.

## Security Constraints

- Credentials, API keys, private tokens, and secrets MUST NOT be committed.
- Secrets MUST be loaded from approved local or runtime configuration.
