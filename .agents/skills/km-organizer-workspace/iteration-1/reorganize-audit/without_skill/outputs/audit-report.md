# os-config/ Directory Audit Report

## Current Structure

```
os-config/
  README.md                    -- top-level description (5 lines)
  mac-mini-remote-setup.md     -- Mac Mini remote dev environment guide (374 lines)
  wsl-setup.md                 -- WSL Ubuntu dev environment guide (196 lines)
  nushell/
    README.md                  -- Nushell directory overview
    config.nu                  -- Nushell config file
    setup.md                   -- one-liner pointing to a skill (3 lines)
    note.md                    -- Nushell tips and snippets
  darwin/
    zsh-clip-last.md           -- Ctrl+Y clip-last for macOS zsh
  windows/
    powershell-clip-last.md    -- Ctrl+Y clip-last for Windows PowerShell
```

## Assessment Summary

The directory is **partially organized**. OS-specific subdirectories (`darwin/`, `windows/`) exist but are used inconsistently. Several files are placed at the top level when they clearly belong inside an OS-specific folder.

**Rating: 6/10** -- the intent is right, but execution is inconsistent.

---

## Issues Found

### 1. Inconsistent OS-based grouping

`darwin/` and `windows/` subdirectories exist, but macOS-specific content also lives at the top level:

| File | OS | Current Location | Should Be |
|------|----|------------------|-----------|
| `mac-mini-remote-setup.md` | macOS | `os-config/` (top level) | `os-config/darwin/` |
| `wsl-setup.md` | Windows/WSL | `os-config/` (top level) | `os-config/windows/` or `os-config/wsl/` |
| `zsh-clip-last.md` | macOS | `os-config/darwin/` | Already correct |
| `powershell-clip-last.md` | Windows | `os-config/windows/` | Already correct |

### 2. Nushell is a shell, not an OS -- placement is fine but unique

`nushell/` is grouped by shell rather than by OS, which is reasonable since Nushell is cross-platform. However, there is no equivalent directory for `zsh` or `bash` configuration. The `zsh-clip-last.md` file sits under `darwin/` even though it is really a shell config snippet. This creates a mixed taxonomy (some folders are by OS, one is by shell).

### 3. `nushell/setup.md` is nearly empty

The file contains a single sentence: "use agent skill init-nushell-setup to init configuration and environment for nushell". This adds almost no value beyond what the README already says. It could be folded into `nushell/README.md`.

### 4. Top-level README is sparse

The `os-config/README.md` is only 5 lines. It does not list or link to any of its subdirectories or files, making discovery difficult. Per the repo convention, READMEs should provide navigation and context.

### 5. `darwin/` and `windows/` have no README

The repo convention is that each directory has a `README.md` for navigation. These two directories lack one.

### 6. `nushell/note.md` has minor quality issues

- The heading "Utiles" is a typo for "Utilities".
- The description says "fix some isseus" (typo for "issues").
- Contains a mix of English and Chinese without clear separation.

---

## Proposed Improvements

### A. Move top-level files into OS-specific directories

```
os-config/
  darwin/
    mac-mini-remote-setup.md    <-- moved from top level
    zsh-clip-last.md            (stays)
    README.md                   <-- new
  windows/
    wsl-setup.md                <-- moved from top level
    powershell-clip-last.md     (stays)
    README.md                   <-- new
  nushell/
    ...                         (no changes)
```

This makes the OS-based grouping consistent. Every OS-specific document lives under its OS directory.

### B. Add READMEs to `darwin/` and `windows/`

Example for `darwin/README.md`:

```markdown
# macOS (Darwin) Configuration

Guides and configuration snippets for macOS.

## Contents

- mac-mini-remote-setup.md -- Remote development environment via Tailscale + SSH + tmux
- zsh-clip-last.md -- Ctrl+Y keybinding to copy last command output to clipboard
```

### C. Merge `nushell/setup.md` into `nushell/README.md`

The one-liner in `setup.md` should be a bullet point in the README. Delete `setup.md` after merging.

### D. Expand the top-level `os-config/README.md`

Proposed content:

```markdown
# OS Configuration

Operating system HOWTOs, setup guides, and configuration files.

To set up your environment or install utilities, ask Claude Code first.
Available skills: `nushell-config-sync`, `nushell-install-utils`, `bash-install-utils`.

## Contents

- `darwin/` -- macOS guides and shell configuration
- `windows/` -- Windows and WSL setup guides
- `nushell/` -- Cross-platform Nushell configuration and notes
```

### E. Fix typos in `nushell/note.md`

- "Utiles" -> "Utilities"
- "fix some isseus" -> "fix some issues"

### F. (Optional) Consider a `linux/` directory

If Linux-specific (non-WSL) content is added in the future, having a `linux/` directory would keep the pattern consistent. No action needed now, but worth noting for future additions.

---

## Proposed Final Structure

```
os-config/
  README.md                         -- updated with directory listing
  darwin/
    README.md                       -- new navigation file
    mac-mini-remote-setup.md        -- moved from top level
    zsh-clip-last.md
  windows/
    README.md                       -- new navigation file
    wsl-setup.md                    -- moved from top level
    powershell-clip-last.md
  nushell/
    README.md                       -- updated (absorb setup.md content)
    config.nu
    note.md                         -- typos fixed
```

## Summary of Changes

| Action | Files Affected |
|--------|---------------|
| Move file | `mac-mini-remote-setup.md` -> `darwin/` |
| Move file | `wsl-setup.md` -> `windows/` |
| Create file | `darwin/README.md` |
| Create file | `windows/README.md` |
| Update file | `os-config/README.md` (expand) |
| Merge + delete | `nushell/setup.md` into `nushell/README.md` |
| Fix typos | `nushell/note.md` |

Total: 2 moves, 2 new READMEs, 3 edits, 1 deletion.
