---
name: bash-install-utils
description: Install CLI utilities (zoxide, starship, carapace, bat, ripgrep, fd, xh) with shell integration for bash or zsh on Linux and macOS. Use when user wants to set up these utilities for their shell environment.
---

# Shell Utilities Installer

Cross-platform script to install and configure popular CLI utilities for bash or zsh on Linux and macOS.

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

### Setup Shell Integration Only

If utilities are already installed, just configure the shell rc file:

```bash
bash .claude/skills/bash-install-utils/install.sh --setup
```

## What It Does

1. **Detects OS and architecture** (Linux/macOS, x86_64/arm64) and downloads the correct binaries
2. **Detects your shell** (bash or zsh via `$SHELL`) and configures the appropriate rc file
3. **Installs utilities** using apt (Linux) or downloads pre-built binaries from GitHub releases
4. **Sets up shell integration** by adding initialization to ~/.bashrc or ~/.zshrc:
   - zoxide init
   - starship prompt
   - carapace completions
   - Useful aliases (cat->bat, etc.)

## Installation Methods

| Utility  | Linux         | macOS                    |
|----------|---------------|--------------------------|
| zoxide   | apt or installer | Official installer     |
| starship | Official installer | Official installer  |
| carapace | GitHub binary | GitHub binary            |
| bat      | apt or GitHub binary | GitHub binary      |
| ripgrep  | apt or GitHub binary | GitHub binary      |
| fd       | apt or GitHub binary | GitHub binary      |
| xh       | GitHub binary | GitHub binary            |

## After Installation

```bash
source ~/.zshrc   # for zsh
source ~/.bashrc  # for bash
# or start a new terminal
```

## Shell Integration Added

The script adds a managed block to ~/.zshrc or ~/.bashrc:

```bash
# >>> shell-utils-init >>>
# Add ~/.local/bin to PATH if not present
[[ ":$PATH:" != *":$HOME/.local/bin:"* ]] && export PATH="$HOME/.local/bin:$PATH"

# Bat aliases
alias cat="bat --paging=never"
alias less="bat"

# Carapace completions
source <(carapace _carapace zsh)

# Starship prompt
eval "$(starship init zsh)"

# Zoxide - smarter cd (must be last)
eval "$(zoxide init zsh)"
# <<< shell-utils-init <<<
```

Re-running the installer will update this block.
