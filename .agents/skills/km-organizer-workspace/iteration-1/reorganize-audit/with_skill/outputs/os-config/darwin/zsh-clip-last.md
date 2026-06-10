---
title: Zsh Clip Last Command + Output (macOS)
tags: [macos, zsh, clipboard, keybinding, productivity]
created: 2026-03-28
summary: Zsh keybinding (Ctrl+Y) that re-runs the last command and copies both the command and its output to the macOS clipboard via pbcopy.
related:
  - os-config/windows/powershell-clip-last.md
---

# Zsh Clip Last Command + Output (macOS)

Copy the last command and its output to clipboard with a keybinding.

## Setup

Add to `~/.zshrc`:

```zsh
# Ctrl+Y: re-run last command and copy "$ command\noutput" to clipboard
clip-last() {
  local cmd=$(fc -ln -1 | sed 's/^ *//')
  (echo "$ $cmd" && eval "$cmd" 2>&1) | pbcopy
  echo "Copied to clipboard!"
}
zle -N clip-last
bindkey '^Y' clip-last
```

Reload: `source ~/.zshrc`

## Usage

1. Run any command normally (e.g. `ls`)
2. Press **Ctrl+Y**
3. Clipboard now contains:

```
$ ls
.DStore
name
README.md
```

## Note

This **re-executes** the last command to capture its output. Avoid using after destructive commands (`rm`, `git push`, etc.).
