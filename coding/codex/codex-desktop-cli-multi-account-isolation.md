---
title: Codex Desktop 與 CLI 多帳戶隔離
tags: [codex, multi-account, cli, desktop, authentication, CODEX_HOME, macOS]
created: 2026-08-31
summary: 在 macOS 上保留既有 Codex Desktop 環境，並以獨立 CODEX_HOME 讓第二個 ChatGPT 帳戶登入 Codex CLI 的已驗證設定與操作手冊。
related: [coding/codex/hotkeys.md, os-config/darwin/README.md]
---

# Codex Desktop 與 CLI 多帳戶隔離

## 結果

2026-08-31 已在這台 Mac 完成兩個獨立的 Codex 登入狀態：

| 用途 | 啟動方式 | 狀態根目錄 | 登入狀態 |
| --- | --- | --- | --- |
| 既有／Desktop 工作環境 | Codex Desktop 或 `codex` | `~/.codex` | 已登入 ChatGPT |
| 第二帳戶 CLI | `codex-secondary` | `~/.codex-cli-secondary` | 已登入 ChatGPT |

兩個 `auth.json` 均為 `0600`，位於不同目錄且內容不相同。驗證過程沒有輸出 email、token 或其他帳戶識別資料。

## 隔離方式

官方 `CODEX_HOME` 會設定 CLI、IDE extension、app-server 與安裝程式使用的 Codex 狀態根目錄，涵蓋 config、auth、logs、sessions、skills 與套件 metadata。本設定不修改全域 `CODEX_HOME`，而是只由第二帳戶啟動器設定，因此裸命令 `codex` 與 Desktop 的既有環境不受影響。

第二帳戶啟動器位於：

```text
~/.local/bin/codex-secondary
```

內容：

```zsh
#!/bin/zsh
set -eu

export CODEX_HOME="$HOME/.codex-cli-secondary"

if [[ ! -d "$CODEX_HOME" ]]; then
  print -u2 -- "Missing isolated Codex home: $CODEX_HOME"
  exit 1
fi

exec "$HOME/.local/bin/codex" "$@"
```

`~/.local/bin` 原本已在 `PATH`，所以不需要修改 `.zshrc`。

## 日常使用

啟動第二帳戶 CLI：

```zsh
codex-secondary
```

確認第二帳戶 CLI 登入狀態：

```zsh
codex-secondary login status
```

只登出第二帳戶 CLI：

```zsh
codex-secondary logout
```

重新登入第二帳戶：

```zsh
codex-secondary login
```

使用既有/default CLI 狀態：

```zsh
codex
codex login status
```

執行登入流程時，瀏覽器選中的 ChatGPT 帳戶決定該狀態根目錄保存哪個登入。Codex CLI 的狀態輸出不顯示帳戶 email；本設定刻意不解析或持久化帳戶識別資料，所以應由使用者在瀏覽器登入頁確認帳戶。

## 驗證紀錄

- Codex CLI 版本：`0.151.0`。
- `CODEX_HOME` 與 `CODEX_SQLITE_HOME` 未被全域設定。
- `~/.codex-cli-secondary` 權限：`0700`。
- `~/.local/bin/codex-secondary` 權限：`0755`。
- `codex login status`：`Logged in using ChatGPT`。
- `codex-secondary login status`：`Logged in using ChatGPT`。
- 兩個 auth cache 權限：`0600`。
- 兩個 auth cache 位於不同狀態根且內容不相同。
- 建立及登入第二 CLI 環境後，既有 Desktop 工作階段仍持續運作。

## 安全與維護

- 不要複製、提交或在文件中貼出任何 `auth.json` 內容。
- 不要把 `CODEX_HOME` 全域 export 成第二帳戶路徑，否則裸命令 `codex` 也會改用第二環境。
- 第二環境有獨立 config、sessions 與 skills；需要共用的專案 Skill 應保留在專案的 `.agents/skills/`，不要複製登入資料。
- 更新 Codex CLI 後，`codex-secondary` 仍會呼叫 `~/.local/bin/codex`；可用 `codex-secondary --version` 確認。
- 若要移除第二環境，先執行 `codex-secondary logout`，確認沒有需要保留的 session，再移除啟動器與 `~/.codex-cli-secondary`。這是破壞性操作，不應在未確認前執行。

## 官方依據

- [OpenAI Docs：Authentication](https://learn.chatgpt.com/docs/auth) — Codex 的 ChatGPT/API key 登入方式、`codex login status`、`codex logout` 與登入快取行為。
- [OpenAI Docs：Environment variables](https://learn.chatgpt.com/docs/config-file/environment-variables) — `CODEX_HOME` 是 CLI、IDE extension、app-server 與安裝程式的狀態根，包含 auth、config、logs、sessions 與 skills。
