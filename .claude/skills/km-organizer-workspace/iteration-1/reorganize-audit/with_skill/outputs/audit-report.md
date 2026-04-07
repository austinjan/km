---
title: os-config/ Directory Audit Report
tags: [audit, reorganize, os-config, knowledge-management]
created: 2026-04-05
summary: Audit of the os-config/ directory structure with findings on misplaced files, missing frontmatter, inconsistent organization, and proposed improvements.
---

# os-config/ Directory Audit Report

## Current Structure

```
os-config/
  README.md
  mac-mini-remote-setup.md      (loose file, not in any subdirectory)
  wsl-setup.md                  (loose file, not in any subdirectory)
  darwin/
    zsh-clip-last.md
  nushell/
    README.md
    config.nu
    note.md
    setup.md
  windows/
    powershell-clip-last.md
```

## Findings

### 1. Misplaced Content: `mac-mini-remote-setup.md` (HIGH)

This 375-line guide covers Mac Mini remote development setup (Homebrew, tmux, SSH, Tailscale). It sits at the os-config/ root level instead of inside `darwin/`. Since it is entirely macOS-specific, it belongs in `darwin/`.

**Proposed action:** Move to `os-config/darwin/mac-mini-remote-setup.md`.

### 2. Misplaced Content: `wsl-setup.md` (HIGH)

This WSL Ubuntu setup guide covers Node.js, Rust, Zed editor, SSH, and CLI utilities on Windows/WSL. It sits at the os-config/ root level instead of inside `windows/`. WSL is a Windows subsystem, so it belongs with Windows content.

**Proposed action:** Move to `os-config/windows/wsl-setup.md`.

### 3. Missing YAML Frontmatter on All Files (MEDIUM)

None of the Markdown files in os-config/ have the YAML frontmatter (`title`, `tags`, `created`, `summary`, `related`) required by the km-organizer skill for LLM retrieval. This applies to:

- `os-config/README.md`
- `os-config/darwin/zsh-clip-last.md`
- `os-config/nushell/README.md`
- `os-config/nushell/note.md`
- `os-config/nushell/setup.md`
- `os-config/mac-mini-remote-setup.md`
- `os-config/windows/powershell-clip-last.md`
- `os-config/wsl-setup.md`

**Proposed action:** Add frontmatter to every file.

### 4. `darwin/` Directory Has No README.md (MEDIUM)

Both `nushell/` and `windows/` have (or should have) README files, but `darwin/` has none. This breaks the navigation convention.

**Proposed action:** Create `os-config/darwin/README.md`.

### 5. `windows/` Directory Has No README.md (MEDIUM)

Same issue as darwin/.

**Proposed action:** Create `os-config/windows/README.md`.

### 6. Root README.md Is Minimal (LOW)

The os-config/README.md is only 5 lines and does not list the subdirectories or provide a content map. It should serve as navigation for the directory.

**Proposed action:** Expand to include subdirectory listing and file descriptions.

### 7. `nushell/note.md` Has Quality Issues (LOW)

- Typo: "Utiles" should be "Utilities"
- Typo: "isseus" should be "issues"
- Content is sparse and disorganized
- The title "Utiles I recommand to install" has a typo ("recommand" -> "recommend")

**Proposed action:** Polish the content and fix typos.

### 8. `nushell/setup.md` Is Nearly Empty (LOW)

The file only contains one line directing users to a skill. This could be merged into the nushell README.md or expanded with actual setup instructions.

**Proposed action:** Merge into nushell/README.md.

### 9. Thematic Inconsistency Between `darwin/` and `windows/` (LOW)

`darwin/` contains `zsh-clip-last.md` (a shell utility). `windows/` contains `powershell-clip-last.md` (the same utility for Windows) plus `wsl-setup.md` would be added. The clip-last files cross-reference each other with `related` links, which is good. But the directories mix "platform setup guides" with "shell tips/tricks." This is acceptable at current scale but worth watching as content grows.

### 10. No `linux/` Directory (OBSERVATION)

WSL content is Windows-specific, but if pure Linux setup guides are added later, a `linux/` directory would be needed. No action needed now.

---

## Proposed Reorganized Structure

```
os-config/
  README.md                         (expanded with navigation)
  darwin/
    README.md                       (new)
    mac-mini-remote-setup.md        (moved from root)
    zsh-clip-last.md                (unchanged, add frontmatter)
  nushell/
    README.md                       (updated, absorb setup.md content)
    config.nu                       (unchanged)
    note.md                         (polished, fix typos, add frontmatter)
  windows/
    README.md                       (new)
    powershell-clip-last.md         (unchanged, add frontmatter)
    wsl-setup.md                    (moved from root, add frontmatter)
```

## Summary of Proposed Changes

| # | Action | File | Reason |
|---|--------|------|--------|
| 1 | Move | `mac-mini-remote-setup.md` -> `darwin/` | macOS-specific content |
| 2 | Move | `wsl-setup.md` -> `windows/` | Windows/WSL-specific content |
| 3 | Create | `darwin/README.md` | Missing navigation file |
| 4 | Create | `windows/README.md` | Missing navigation file |
| 5 | Update | `os-config/README.md` | Expand with full directory map |
| 6 | Update | `nushell/README.md` | Absorb setup.md, improve |
| 7 | Delete | `nushell/setup.md` | Content merged into README |
| 8 | Update | `nushell/note.md` | Fix typos, add frontmatter |
| 9 | Update | All `.md` files | Add YAML frontmatter |

## Proposed File Contents

The following files show what the reorganized content would look like. These are written to the outputs directory for review.
