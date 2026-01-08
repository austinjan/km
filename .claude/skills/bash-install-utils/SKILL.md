---
name: bash-install-utils
description: Install CLI utilities (zoxide, starship, carapace, bat, ripgrep, fd, xh) for Bash with proper integration. Use when user wants to set up these utilities for their bash environment.
---

# Bash Utilities Installer

Cross-platform script to install and configure popular CLI utilities for Bash.

## Supported Utilities

- **zoxide**: Smarter cd command that learns your habits
- **starship**: Fast, customizable prompt
- **carapace**: Multi-shell completion generator
- **bat**: Cat clone with syntax highlighting
- **ripgrep**: Fast grep replacement
- **fd**: Fast find replacement
- **xh**: Friendly HTTP client (like httpie but faster)

## Commands

### Install All Utilities

```bash
bash .claude/skills/bash-install-utils/install.sh --all
```

### Install Specific Utilities

```bash
bash .claude/skills/bash-install-utils/install.sh zoxide starship
```

### Check Installation Status

```bash
bash .claude/skills/bash-install-utils/install.sh --list
```

### Setup Bash Integration Only

If utilities are already installed, just configure .bashrc:

```bash
bash .claude/skills/bash-install-utils/install.sh --setup
```

## What It Does

1. **Installs utilities** using apt where available, or downloads pre-built binaries from GitHub releases
2. **Sets up bash integration** by adding initialization to ~/.bashrc:
   - zoxide init
   - starship prompt
   - carapace completions
   - Useful aliases (cat->bat, etc.)

## Installation Methods

| Utility  | Method |
|----------|--------|
| zoxide   | apt or official installer |
| starship | Official installer script |
| carapace | GitHub releases binary |
| bat      | apt (as batcat, symlinked) |
| ripgrep  | apt |
| fd       | apt (as fdfind, symlinked) |
| xh       | GitHub releases binary |

## After Installation

Run one of:
```bash
source ~/.bashrc
# or start a new terminal
```

## Bash Integration Added

The script adds a managed block to ~/.bashrc:

```bash
# >>> bash-utils-init >>>
# Zoxide - smarter cd
eval "$(zoxide init bash)"

# Starship prompt
eval "$(starship init bash)"

# Carapace completions
source <(carapace _carapace bash)

# Bat aliases
alias cat="bat --paging=never"
alias less="bat"
# <<< bash-utils-init <<<
```

Re-running the installer will update this block.
