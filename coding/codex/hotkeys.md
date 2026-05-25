---
title: Codex Hotkeys
tags: [codex, hotkeys, keyboard-shortcuts, codex-desktop, codex-cli]
created: 2026-05-25
summary: Practical Codex Desktop and CLI keyboard shortcuts, separated by official documentation, personal confirmation, and items to verify in the app.
related: [coding/codex/README.md, coding/claude-code/README.md]
---

# Codex Hotkeys

This note tracks useful Codex shortcuts. Treat it as a living note: keep shortcuts that are personally useful, and mark whether they come from official docs, personal testing, or need verification.

## Best Daily Shortcuts

| Shortcut | Context | Action | Confidence | Notes |
| --- | --- | --- | --- | --- |
| `Cmd` + `J` | Codex Desktop | Toggle terminal | Official + tested | Fastest way to show/hide the integrated terminal. |
| Left `Cmd` + Right `Cmd` | Codex Desktop on macOS | Appshots / capture active app context | Tested | Personal observation. Verify whether the binding has been customized in local app settings. |
| `Cmd` + `K` or `Cmd` + `Shift` + `P` | Codex Desktop | Open command menu | Official | Useful when searching for commands instead of remembering every shortcut. |
| `Cmd` + `B` | Codex Desktop | Toggle sidebar | Official | Helps focus the thread or recover navigation. |
| `Cmd` + `Option` + `B` | Codex Desktop | Toggle diff panel | Official | Useful while reviewing agent file edits. |
| `Cmd` + `N` or `Cmd` + `Shift` + `O` | Codex Desktop | New thread | Official | Use when the current context is no longer related. |
| `Cmd` + `F` | Codex Desktop | Find in thread | Official | Useful for searching earlier instructions, file paths, commands, or decisions. |
| `Cmd` + `Shift` + `[` / `Cmd` + `Shift` + `]` | Codex Desktop | Previous / next thread | Official | Useful when jumping between active workstreams. |
| `Ctrl` + `M` | Codex Desktop | Dictation | Official | Useful for long task descriptions if voice input is comfortable. |
| `Ctrl` + `L` | Codex Desktop terminal | Clear terminal | Official | Clears terminal display without changing the thread. |
| `Esc` `Esc` | Codex composer | Edit previous user message | Needs local verification | Frequently mentioned in Codex shortcut summaries; verify in current app. |
| `Enter` while agent is running | Codex composer | Inject steering instructions into the current turn | Needs local verification | Useful if the agent is drifting and should be redirected immediately. |
| `Tab` while agent is running | Codex composer | Queue a follow-up for the next turn | Needs local verification | Useful for adding the next instruction without interrupting the current run. |

## Desktop App Official Shortcuts

Source: [Codex app commands](https://developers.openai.com/codex/app/commands).

| Shortcut | Action |
| --- | --- |
| `Cmd` + `Shift` + `P` or `Cmd` + `K` | Command menu |
| `Cmd` + `,` | Settings |
| `Cmd` + `O` | Open folder |
| `Cmd` + `[` | Navigate back |
| `Cmd` + `]` | Navigate forward |
| `Cmd` + `+` or `Cmd` + `=` | Increase font size |
| `Cmd` + `-` or `Cmd` + `_` | Decrease font size |
| `Cmd` + `B` | Toggle sidebar |
| `Cmd` + `Option` + `B` | Toggle diff panel |
| `Cmd` + `J` | Toggle terminal |
| `Ctrl` + `L` | Clear the terminal |
| `Cmd` + `N` or `Cmd` + `Shift` + `O` | New thread |
| `Cmd` + `F` | Find in thread |
| `Cmd` + `Shift` + `[` | Previous thread |
| `Cmd` + `Shift` + `]` | Next thread |
| `Ctrl` + `M` | Dictation |

## CLI / TUI Shortcuts

Source: [Codex CLI interactive mode](https://www.mintlify.com/openai/codex/concepts/interactive-mode). This source appears to mirror generated OpenAI/Codex CLI docs; recheck against the current installed CLI if behavior matters.

| Shortcut | Action | Notes |
| --- | --- | --- |
| `Ctrl` + `C` | Cancel current operation or exit | Context-dependent. |
| `Ctrl` + `D` | Exit Codex when input is empty | Common terminal convention. |
| `Ctrl` + `L` | Clear screen | Terminal display only. |
| Up / Down | Navigate command history | Useful for prompt reuse. |
| `Page Up` / `Page Down` | Scroll conversation | Terminal-dependent. |
| `Home` / `End` | Jump to start/end of input | Terminal-dependent. |
| `Enter` | Send message | In CLI composer. |
| `Shift` + `Enter` | Insert newline | If the terminal supports it. |
| `Ctrl` + `U` | Clear current line | Useful for rewriting a prompt. |
| `Ctrl` + `W` | Delete word backward | Useful while editing a prompt. |
| `Tab` | Autocomplete when available | Depends on context. |
| `Ctrl` + `R` | Resume previous session | Verify against current installed CLI. |
| `Ctrl` + `P` | Open command palette if enabled | Verify against current installed CLI. |
| `Esc` | Cancel current input | Useful when abandoning a draft. |

## Built-In Discovery

- In Codex web/cloud, the official changelog says the shortcuts page can be opened with `Cmd` + `/` on macOS and `Ctrl` + `/` elsewhere.
- In Codex Desktop, prefer `Cmd` + `K` / `Cmd` + `Shift` + `P` when unsure. Search commands from the command menu instead of memorizing everything.

## To Verify Locally

- Whether `Cmd` + `/` opens a shortcut page in the current Codex Desktop app or only Codex web/cloud.
- Whether Appshots is still bound to left `Cmd` + right `Cmd`, or whether it has been customized in settings.
- Whether `Esc` `Esc`, running-turn `Enter`, and running-turn `Tab` work in the installed Desktop app version.
- Whether CLI newline is `Shift` + `Enter` or another terminal-specific binding in the current Ghostty/Zellij setup.

## Sources

- [Codex app commands](https://developers.openai.com/codex/app/commands) - Official Desktop app shortcut table and slash commands.
- [Codex Appshots](https://developers.openai.com/codex/appshots) - Official Appshots documentation entry.
- [Codex changelog](https://developers.openai.com/codex/changelog) - Official note that Codex has a shortcuts page opened by `Cmd` + `/` or `Ctrl` + `/`.
- [Codex CLI interactive mode](https://www.mintlify.com/openai/codex/concepts/interactive-mode) - CLI/TUI shortcut reference; verify locally for terminal-specific behavior.

