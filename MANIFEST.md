# KM Repository Manifest

## Content Map

- `coding/` — Development tools, editor configs, CLI preferences
  - `coding/claude-code/` — Claude Code global settings and CLI tool preferences
  - `coding/codex/` — Codex Desktop and CLI workflow notes, hotkeys, skills, and practical usage patterns
    - `hotkeys.md` — Codex Desktop and CLI keyboard shortcuts with source confidence and local verification notes
  - `coding/agent-skills/` — Reusable agent skill/plugin notes across Claude Code, Codex, and related coding agents
    - `compound-engineering-plugin.md` — Every Compound Engineering plugin overview: skills, agents, Codex install caveats, and knowledge-compounding workflow
    - `matt-van-horn-claude-code-workflow.md` — Extracted workflow patterns from Matt Van Horn's Claude Code / Compound Engineering usage: plan-first, voice, parallel sessions, context compounding
  - `coding/editor/zed/` — Zed editor setup, WSL installation
  - `coding/tools/` — CLI and dev tool documentation
    - `tmux-cheatsheet.md` — tmux key bindings and session management
    - `zellij-layouts.md` — Zellij KDL layout creation, Windows 11 config paths
    - `zellij-win11-setup.md` — Full reproducible zellij setup for Win11 (exact config.kdl + dev.kdl content for LLM-assisted re-setup)
- `os-config/` — Shell and OS configuration
  - `os-config/darwin/` — macOS config
    - `mac-mini-remote-setup.md` — Mac Mini 遠端開發機（Tailscale + SSH + tmux）
    - `zsh-clip-last.md` — Ctrl+Y clipboard keybinding for zsh
  - `os-config/windows/` — Windows 11 / WSL config
    - `wsl-setup.md` — WSL2 Ubuntu full dev environment setup
    - `powershell-clip-last.md` — Ctrl+Y clipboard keybinding for PowerShell
  - `os-config/nushell/` — Nushell config, setup notes
- `projects/` — Active project documentation
  - `projects/atop/` — ATOP company-related notes and asset records
    - `projects/atop/nimbl/` — NIMBL 產品願景、商業模式與 FDE 協作筆記
  - `projects/art-designed-ai-system/` — 陶瓷廠 AI 設計流程系統（2D/3D 工具，設計檔分類）
  - `projects/black-bear-ai-project/` — AI 工具導入公司，KM 系統展示
  - `projects/consulting-ai-develop/` — AI 開發流程顧問，環境設置，教育訓練
- `programming-language/` — Language-specific notes
  - `programming-language/rust/syntax/` — Rust syntax snippets (enum variants, etc.)
- `study/` — Learning resources
  - `study/AI/` — AI/LLM 學習筆記，prompt 設計，context engineering，Claude Code skills
  - `study/fde-team/` — Forward Deployed Engineering / AI Agent 導入部門研究、playbook 與官網服務頁文案
    - `fde-website-page-sample.md` — 官網用 FDE 服務頁文案，說明服務內容、客戶價值與客戶投入條件
- `personal-info/` — Personal notes
  - `personal-info/game/` — 遊戲資訊（卡厄斯夢境）
- `docs/` — Internal design specs
  - `docs/superpowers/specs/` — km-organizer skill design doc

## Recent Additions

- 2026-06-09: `coding/agent-skills/compound-engineering-plugin.md` — Every Compound Engineering plugin 簡介與 Codex 安裝注意事項
- 2026-06-09: `coding/agent-skills/matt-van-horn-claude-code-workflow.md` — Matt Van Horn Claude Code 工作流文章的長期價值提取
- 2026-06-05: `projects/atop/asset-transfer-bob-to-austin.md` — ATOP ASUS PC asset transfer record from Bob's US development use to Austin in Zhonghe
- 2026-06-05: `projects/atop/nimbl/product-vision-and-roadmap.md` — NIMBL 產品願景與 FDE 現場回饋驅動 Roadmap 等想法
- 2026-06-05: `study/fde-team/fde-website-page-sample.md` — FDE 官網服務頁文案，說明服務內容、客戶價值與客戶投入條件
- 2026-05-25: `coding/codex/hotkeys.md` — Practical Codex Desktop and CLI keyboard shortcuts with source confidence and verification notes.
- 2026-04-10: `coding/tools/zellij-win11-setup.md` — Full reproducible zellij Win11 setup (config.kdl + dev layout)
- 2026-04-07: `coding/tools/zellij-layouts.md` — Zellij KDL layout guide (Windows 11)
- 2026-04-07: `os-config/darwin/mac-mini-remote-setup.md` — moved from os-config root
- 2026-04-07: `os-config/windows/wsl-setup.md` — moved from os-config root

## Tags Index

- ai, llm, prompt: `study/AI/note.md`
- ai-tools: `coding/codex/README.md`
- agent-skills, compound-engineering: `coding/agent-skills/compound-engineering-plugin.md`, `coding/agent-skills/skills-sh-and-mattpocock-skills.md`
- claude-code-workflow, plan-first, voice-input: `coding/agent-skills/matt-van-horn-claude-code-workflow.md`
- atop, asset, asset-transfer: `projects/atop/asset-transfer-bob-to-austin.md`
- claude-code, skills: `study/AI/note.md`, `coding/claude-code/`
- codex, codex-desktop, codex-cli: `coding/codex/README.md`, `coding/codex/hotkeys.md`
- coding-agent: `coding/codex/README.md`
- fde: `projects/atop/nimbl/product-vision-and-roadmap.md`, `study/fde-team/fde-website-page-sample.md`
- ai-agent, website-copy, service-design: `study/fde-team/fde-website-page-sample.md`
- hotkeys, keyboard-shortcuts: `coding/codex/hotkeys.md`
- nimbl: `projects/atop/nimbl/product-vision-and-roadmap.md`
- product-vision: `projects/atop/nimbl/product-vision-and-roadmap.md`
- zellij, terminal, multiplexer: `coding/tools/zellij-layouts.md`, `coding/tools/zellij-win11-setup.md`
- tmux: `coding/tools/tmux-cheatsheet.md`, `os-config/darwin/mac-mini-remote-setup.md`
- windows, win11: `coding/tools/zellij-layouts.md`, `coding/tools/zellij-win11-setup.md`, `os-config/windows/`
- wsl, ubuntu: `os-config/windows/wsl-setup.md`
- macos, mac: `os-config/darwin/`
- ssh, tailscale, remote-dev: `os-config/darwin/mac-mini-remote-setup.md`
- clipboard, keybinding: `os-config/darwin/zsh-clip-last.md`, `os-config/windows/powershell-clip-last.md`
- nushell: `os-config/nushell/`
- rust, enum: `programming-language/rust/syntax/emun.md`
- zed: `coding/editor/zed/`
- bash, zsh: `os-config/darwin/zsh-clip-last.md`, `os-config/windows/wsl-setup.md`
