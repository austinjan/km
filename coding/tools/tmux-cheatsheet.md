# tmux Cheat Sheet for AI-Assisted Development

Remote development with Claude Code / Codex over SSH + tmux.

## Session Management

| Command | Description |
|---------|-------------|
| `tmux new -s dev` | Create session named "dev" |
| `tmux attach -t dev` | Reattach to session |
| `tmux attach -t dev \|\| tmux new -s dev` | Attach or create if missing |
| `tmux ls` | List all sessions |
| `tmux kill-session -t dev` | Kill a session |

## Quick Connect (one-liner)

```bash
ssh mini -t "tmux attach -t dev || tmux new -s dev"
```

## Prefix Key: `Ctrl+b`

All tmux shortcuts start with the prefix `Ctrl+b`, then the action key.

## Session Shortcuts

| Key | Description |
|-----|-------------|
| `d` | Detach (session stays alive) |
| `s` | List/switch sessions |
| `$` | Rename session |
| `(` / `)` | Previous / next session |

## Window (Tab) Management

| Key | Description |
|-----|-------------|
| `c` | Create new window |
| `n` / `p` | Next / previous window |
| `0-9` | Jump to window by number |
| `,` | Rename window |
| `&` | Kill window |
| `w` | List all windows (interactive picker) |

## Pane Management

| Key | Description |
|-----|-------------|
| `%` | Split horizontally (left/right) |
| `"` | Split vertically (top/bottom) |
| Arrow keys | Move between panes |
| `z` | Toggle pane zoom (fullscreen) |
| `x` | Kill pane |
| `{` / `}` | Swap pane left / right |
| `Space` | Cycle pane layouts |
| `!` | Convert pane to its own window |

## Resize Panes

Hold `Ctrl+b`, then hold an arrow key. Or:

| Key | Description |
|-----|-------------|
| `Ctrl+b :resize-pane -D 5` | Resize down 5 rows |
| `Ctrl+b :resize-pane -U 5` | Resize up 5 rows |
| `Ctrl+b :resize-pane -L 10` | Resize left 10 columns |
| `Ctrl+b :resize-pane -R 10` | Resize right 10 columns |

## Copy Mode (Scrollback)

| Key | Description |
|-----|-------------|
| `[` | Enter copy mode (scroll with arrows/PgUp/PgDn) |
| `q` | Exit copy mode |
| `/` | Search forward (in copy mode) |
| `?` | Search backward (in copy mode) |

## Recommended Layouts for AI Dev

### Two-pane: Claude Code + shell

```
+-------------------+-------------------+
|                   |                   |
|   Claude Code     |   Shell / Git     |
|   or Codex        |                   |
|                   |                   |
+-------------------+-------------------+
```

```bash
# Create this layout:
tmux new -s dev
# Ctrl+b % to split horizontally
# Left pane: claude or codex
# Right pane: git, tests, server logs
```

### Three-pane: AI + shell + logs

```
+-------------------+-------------------+
|                   |                   |
|   Claude Code     |   Shell / Git     |
|   or Codex        |                   |
|                   +-------------------+
|                   |                   |
|                   |   Server / Logs   |
|                   |                   |
+-------------------+-------------------+
```

```bash
# Create this layout:
tmux new -s dev
# Ctrl+b % to split horizontally
# Move to right pane: Ctrl+b Right
# Ctrl+b " to split right pane vertically
# Move back to left pane: Ctrl+b Left
```

### Multi-window workflow

| Window | Purpose |
|--------|---------|
| `0:code` | Claude Code / Codex (main AI session) |
| `1:shell` | Git operations, file management |
| `2:server` | Dev server, docker, database |
| `3:test` | Test runner |

```bash
tmux new -s dev -n code
tmux new-window -t dev -n shell
tmux new-window -t dev -n server
tmux new-window -t dev -n test
tmux select-window -t dev:0
```

## Tips for AI-Assisted Development

- **Always use tmux over SSH** -- if connection drops, your Claude Code / Codex session survives. Reattach with `tmux attach`.
- **Zoom pane** (`Ctrl+b z`) when Claude is generating long output, zoom back when done.
- **Separate windows for AI and manual work** -- keeps AI output from cluttering your shell history.
- **Name your windows** (`Ctrl+b ,`) so you can quickly identify what's running where.
- **Use `Ctrl+b s`** to switch between sessions if you run multiple projects.

## Ghostty Terminal Fix

If you see `missing or unsuitable terminal: xterm-ghostty`, add to the remote machine's `~/.zshrc`:

```bash
if [[ "$TERM" == "xterm-ghostty" ]] && ! infocmp xterm-ghostty &>/dev/null; then
    export TERM=xterm-256color
fi
```

## Common tmux Commands

```bash
# Send keys to a specific pane (useful for scripting)
tmux send-keys -t dev:0 "claude" Enter

# Capture pane output to file
tmux capture-pane -t dev:0 -p > output.txt

# Set larger scrollback buffer
tmux set-option -g history-limit 50000
```
