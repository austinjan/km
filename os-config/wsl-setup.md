# WSL Ubuntu Setup Guide

This document covers the setup process for a development environment on WSL Ubuntu.

## Prerequisites

- WSL2 with Ubuntu installed
- Windows Terminal or similar

## Development Tools

### Node.js (via nvm)

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Load nvm without restarting shell
\. "$HOME/.nvm/nvm.sh"

# Install Node.js
nvm install 24

# Verify installation
node -v  # v24.12.0
npm -v   # 11.6.2
```

### Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
. "$HOME/.cargo/env"
```

### GitHub CLI

```bash
(type -p wget >/dev/null || (sudo apt update && sudo apt install wget -y)) \
  && sudo mkdir -p -m 755 /etc/apt/keyrings \
  && out=$(mktemp) && wget -nv -O$out https://cli.github.com/packages/githubcli-archive-keyring.gpg \
  && cat $out | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
  && sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
  && sudo mkdir -p -m 755 /etc/apt/sources.list.d \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
  && sudo apt update \
  && sudo apt install gh -y

# Authenticate
gh auth login
```

## Zed Editor

### GPU/Mesa Support

```bash
sudo add-apt-repository ppa:kisak/kisak-mesa
sudo apt update
sudo apt upgrade
```

### Install Zed

```bash
sudo curl -f https://zed.dev/install.sh | sh
source ~/.bashrc
```

### Audio Dependencies

```bash
sudo apt install libasound2t64
```

### Environment Configuration

Add to `~/.bashrc`:

```bash
# Allow emulated GPU for Zed
export ZED_ALLOW_EMULATED_GPU=1

# Run Zed without Wayland (X11 mode)
alias zed="WAYLAND_DISPLAY='' zed"
```

## SSH & Git Setup

### Generate SSH Key

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

### SSH Agent (keychain)

```bash
sudo apt update && sudo apt install keychain -y

# Add to ~/.bashrc
eval $(keychain --eval --agents ssh id_ed25519)
```

### Copy Public Key

```bash
cat ~/.ssh/id_ed25519.pub
# Add this to GitHub: Settings > SSH and GPG keys
```

## WSL Utilities

### wslu (WSL Utilities)

```bash
sudo apt install wslu
```

### Browser Integration

Add to `~/.bashrc`:

```bash
export BROWSER=wslview
```

### libsecret (Credential Storage)

```bash
sudo apt install libsecret-1-0
```

## CLI Utilities

Modern CLI tools installed to `~/.local/bin`:

```bash
# Run the install script
bash .claude/skills/bash-install-utils/install.sh --all
```

Or install manually from GitHub releases:

| Tool | Description | Install |
|------|-------------|---------|
| [zoxide](https://github.com/ajeetdsouza/zoxide) | Smarter cd command | `curl -sSfL https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/install.sh \| sh` |
| [starship](https://starship.rs/) | Fast, customizable prompt | `curl -sS https://starship.rs/install.sh \| sh -s -- -b ~/.local/bin` |
| [carapace](https://github.com/carapace-sh/carapace-bin) | Multi-shell completions | Download from GitHub releases |
| [bat](https://github.com/sharkdp/bat) | Better cat with syntax highlighting | Download from GitHub releases |
| [fd](https://github.com/sharkdp/fd) | Fast find alternative | Download from GitHub releases |
| [ripgrep](https://github.com/BurntSushi/ripgrep) | Fast grep alternative | Download from GitHub releases |
| [xh](https://github.com/ducaale/xh) | Friendly HTTP client | Download from GitHub releases |

## Complete ~/.bashrc Additions

```bash
# NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Rust
. "$HOME/.cargo/env"

# SSH keychain
eval $(keychain --eval --agents ssh id_ed25519)

# WSL browser
export BROWSER=wslview

# Zed editor
export ZED_ALLOW_EMULATED_GPU=1
alias zed="WAYLAND_DISPLAY='' zed"

# >>> bash-utils-init >>>
# Add ~/.local/bin to PATH if not present
[[ ":$PATH:" != *":$HOME/.local/bin:"* ]] && export PATH="$HOME/.local/bin:$PATH"

# Bat aliases
alias cat="bat --paging=never"
alias less="bat"

# Carapace completions
source <(carapace _carapace bash)

# Starship prompt
eval "$(starship init bash)"

# Zoxide - smarter cd (must be last)
eval "$(zoxide init bash)"
# <<< bash-utils-init <<<
```
