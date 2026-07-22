---
name: tools
description: Development utilities and tools documentation
---

## Categories

### API Testing & Development
- **yaak** - Modern API testing client
- **HTTPie/xh** - Command-line HTTP clients

### Networking & Analysis
- **Wireshark** - Network protocol analyzer
- **tcpdump** - Command-line packet analyzer
- [network-tools/](network-tools/) - Network monitoring and debugging guides
  - [mitmproxy](network-tools/mitmproxy-pi-agent-http-monitoring.md) - Intercept and inspect Pi Agent HTTP/HTTPS requests

### CLI Utilities
See also: [claude-code/CLAUDE.md](../claude-code/CLAUDE.md) for globally configured CLI tools

- **ripgrep (rg)** - Fast text search
- **fd** - Fast file finder
- **bat** - Cat clone with syntax highlighting
- **zoxide** - Smarter cd command
- **starship** - Cross-shell prompt
- **carapace** - Multi-shell completion

### Database Tools
- **DBeaver** - Universal database tool
- **pgcli** - Postgres CLI with autocomplete
- **mycli** - MySQL CLI with autocomplete

### Version Control & Git
- **lazygit** - Terminal UI for git
- **tig** - Text-mode interface for git
- **delta** - Syntax-highlighting pager for git

### Terminal Multiplexers
- **tmux** - [Cheatsheet](tmux-cheatsheet.md)
- **zellij** - [Layout creation guide](zellij-layouts.md) — KDL-based layouts, Windows 11 config paths
  - [Win11 full setup](zellij-win11-setup.md) — Complete reproducible config (config.kdl + dev.kdl) for LLM-assisted setup on a new machine

### Monitoring & Debugging
- **htop/btop** - Interactive process viewer
- **glances** - System monitoring tool
- **strace** - System call tracer

---

## Adding New Tools

When documenting a new tool, create a separate markdown file with:
- Tool name and description
- Installation instructions
- Basic usage examples
- Configuration tips
- Links to official documentation
