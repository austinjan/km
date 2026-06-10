---
title: Nushell Configuration and Notes
tags: [nushell, shell, configuration, zoxide, starship]
created: 2026-03-28
summary: Nushell shell configuration files, setup instructions, and usage notes. Use the nushell-config-sync skill to sync config between this repo and the system.
---

# nushell/

Nushell shell configuration and notes.

## Setup

Use the Claude Code skill `nushell-install-utils` to set up Nushell with integrations (zoxide, starship, carapace).

## Syncing Config

Sync config files between this directory and your system:

```nushell
# Copy system config to this repo
cp $"($nu.config-path)" .
```

Or use the `nushell-config-sync` skill for managed sync.

## Files

- **config.nu** -- Nushell configuration file (zoxide, starship, editor settings, aliases)
- **note.md** -- Nushell tips, snippets, and recommended utilities
