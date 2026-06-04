---
name: macos-zsh-clip
description: Set up a zsh keybinding (Ctrl+Y) on macOS to copy the last command and its output to clipboard. Use when user wants to set up the clip-last feature for their zsh environment on macOS.
---

# macOS Zsh Clip Last Command

Set up a keybinding to copy the last terminal command and its output to the macOS clipboard.

## What It Does

Adds a **Ctrl+Y** keybinding to zsh that:
1. Re-runs the last command
2. Copies `$ command\noutput` to clipboard via `pbcopy`

## Setup Steps

### 1. Add to `~/.zshrc`

Append the following block to the user's `~/.zshrc`:

```zsh
# >>> zsh-clip-last >>>
# Ctrl+Y: re-run last command and copy "$ command\noutput" to clipboard
clip-last() {
  local cmd=$(fc -ln -1 | sed 's/^ *//')
  (echo "$ $cmd" && eval "$cmd" 2>&1) | pbcopy
  echo "Copied to clipboard!"
}
zle -N clip-last
bindkey '^Y' clip-last
# <<< zsh-clip-last <<<
```

### 2. Reload

```zsh
source ~/.zshrc
```

## Important Notes

- **macOS only** — uses `pbcopy` which is macOS-specific
- **Re-executes the last command** to capture output. Warn the user to avoid pressing Ctrl+Y after destructive commands (`rm`, `git push`, etc.)
- If the block already exists in `~/.zshrc`, do not add it again

## Reference

See `os-config/darwin/zsh-clip-last.md` for full documentation.
