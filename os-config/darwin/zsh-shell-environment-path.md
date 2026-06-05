# Shell Environment Findings

## Summary

在這台機器上，`bun` 已經安裝在：

- `/Users/austinjan/.bun/bin/bun`

但 Codex app 內執行的命令當時找不到 `bun`，原因不是未安裝，而是 **目前這個非互動 shell / app session 沒有讀到 `~/.zshrc` 裡設定的 Bun PATH**。

## What We Observed

- `which bun` 回傳 `bun not found`
- `command -v bun` 無輸出
- `~/.bun/bin` 內存在 `bun` 與 `bunx`
- 當下 session 的 `PATH` 沒有包含 `~/.bun/bin`
- 原本 `~/.zshrc` 內有：
  - `export BUN_INSTALL="$HOME/.bun"`
  - `export PATH="$BUN_INSTALL/bin:$PATH"`

## Root Cause

shell 環境設定分散在錯的層級：

- `~/.zshrc` 適合放互動 shell 專用設定，例如 prompt、alias、completion
- 但 `PATH`、工具鏈位置、必要環境變數若只放在 `~/.zshrc`，GUI app、非互動 shell、agent session 可能看不到

因此：

- 一般 Terminal 互動操作可以用 `bun`
- Codex 這類 app 內啟動的命令環境，可能找不到 `bun`

## Fix Applied

已將通用環境設定移到 `~/.zprofile`：

- `BUN_INSTALL`
- `PATH` 對 `~/.bun/bin` 的設定
- `PATH` 對 `~/.local/bin` 的設定
- `GEMINI_API_KEY`

並將 `~/.zshrc` 保留為互動 shell 設定：

- completion
- prompt
- aliases
- bun completion
- gcloud completion

## Recommended Convention

之後建議遵守這個分工：

- `~/.zprofile`
  - Homebrew shellenv
  - PATH
  - Bun / Go / local bin 等工具鏈路徑
  - 必要的環境變數
- `~/.zshrc`
  - `compinit`
  - `starship`
  - `zoxide`
  - `carapace`
  - aliases
  - shell functions

## Important Note

這次修改只能影響 **新開的 shell / 新啟動的 app session**。

如果某個已經開著的 app 還是看不到 `bun`，通常需要：

1. 完全關閉該 app
2. 重新開啟 app
3. 重新建立新的 agent/session

## Follow-up Suggestion

如果未來還有其他工具也遇到「Terminal 可用、Codex 不可用」的情況，優先檢查：

1. binary 是否真的存在
2. 當前 session 的 `PATH`
3. 該工具的 PATH 是否只寫在 `~/.zshrc`
4. 是否需要移到 `~/.zprofile`
