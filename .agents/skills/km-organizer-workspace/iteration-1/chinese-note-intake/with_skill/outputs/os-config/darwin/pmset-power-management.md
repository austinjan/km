---
title: macOS pmset 電源管理指令
tags: [macos, pmset, power-management, display, sleep]
created: 2026-04-05
summary: macOS 上使用 pmset 指令查看與設定電源管理選項，包含查看目前設定與設定螢幕休眠時間
related: []
---

# macOS pmset 電源管理指令

`pmset` 是 macOS 內建的電源管理指令工具。

## 常用操作

- 查看目前電源設定：

  ```bash
  pmset -g
  ```

- 設定螢幕休眠時間（例如 10 分鐘後關閉螢幕）：

  ```bash
  sudo pmset displaysleep 10
  ```
