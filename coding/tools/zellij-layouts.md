---
title: Zellij Layout Creation Guide
tags: [zellij, terminal, multiplexer, layout, bash, windows]
created: 2026-04-07
summary: How to create a Zellij KDL layout file with multiple panes (e.g. 1 left + 2 right stacked), including Windows 11 config path
related: [coding/tools/tmux-cheatsheet.md]
---

# Zellij Layouts

## Config Path

| Environment | Path |
|---|---|
| Windows 11 (native) | `%APPDATA%\zellij\layouts\` |
| WSL / Git Bash | `~/.config/zellij/layouts/` |

## Layout File Format (KDL)

Layout files use the `.kdl` format.

## Example: 1 Left + 2 Right Stacked

`~/.config/zellij/layouts/my-layout.kdl`

```kdl
layout {
    pane split_direction="vertical" {
        // Left pane (50% width)
        pane {
            command "bash"
            size "50%"
        }

        // Right side: 2 panes stacked vertically
        pane split_direction="horizontal" {
            pane {
                command "bash"
            }
            pane {
                command "bash"
            }
        }
    }
}
```

## Usage

```bash
# Start zellij with a layout
zellij --layout my-layout

# Open new tab with layout (inside zellij)
zellij action new-tab --layout my-layout
```

## Key Concepts

| Concept | Notes |
|---|---|
| `split_direction="vertical"` | Splits panes left / right |
| `split_direction="horizontal"` | Splits panes top / bottom |
| `size "50%"` | Controls pane width or height; omit to auto-fill remaining space |
| `command "bash"` | Forces bash shell regardless of default shell |
