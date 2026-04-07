---
title: Nushell Tips and Snippets
tags: [nushell, shell, tips, glob, redirect, just]
created: 2026-03-28
summary: Nushell usage notes covering glob patterns, output redirection, config reloading, and recommended utilities like just (make replacement).
---

# Nushell Tips and Snippets

## Glob Patterns

Use `**` to traverse directories recursively:

```nushell
# Find all .txt files recursively
ls **/*.txt
```

## Output Redirection

Bash:
```bash
"hello" > output.txt
```

Nushell:
```nushell
"hello" | save output.txt
```

## Config Reload

```nushell
source $nu.config-path
```

## Recommended Utilities

These tools work well with Nushell and fix common compatibility issues:

- **[just](https://github.com/casey/just)** -- Use instead of `make`. Install with `cargo install just`.
