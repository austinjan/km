---
title: Every Compound Engineering Plugin
tags: [agent-skills, compound-engineering, codex, claude-code, cursor, ai-engineering-workflow]
created: 2026-06-09
summary: Source-backed introduction to Every's Compound Engineering plugin, a cross-agent workflow package for planning, reviewing, executing, and preserving engineering learnings.
related: [coding/agent-skills/README.md, coding/agent-skills/skills-sh-and-mattpocock-skills.md, coding/codex/README.md]
source:
  - https://github.com/EveryInc/compound-engineering-plugin
  - https://github.com/EveryInc/compound-engineering-plugin/blob/main/plugins/compound-engineering/README.md
---

# Every Compound Engineering Plugin 簡介

Every 的 `compound-engineering-plugin` 是一套給 Claude Code、Codex、Cursor、GitHub Copilot、Qwen Code、Droid、OpenCode 等 agentic coding 工具使用的工程 workflow plugin。它的核心主張是 **Compound Engineering**：每一次工程工作都不只交付當下的改動，也要留下讓下一次工作更容易的計畫、審查結果、知識沉澱與可重複流程。

這不是單一 `SKILL.md`，而是一個完整 plugin package：包含 slash-command style 的 skills、可被 skills 呼叫的 specialized agents、跨工具安裝器、release tooling、文件與測試。官方 README 在 2026-06-09 查到的狀態是 npm package `@every-env/compound-plugin` version `3.11.2`，root README 寫目前包含 37 個 skills 與 51 個 agents；plugin component README 則以 `38+` skills、`50+` agents 描述目前 inventory，顯示清單會跟 release 持續演進。

## 它解決什麼問題

傳統 AI coding 很容易變成「每次都從零開始解讀 repo」：需求討論、設計取捨、review 發現、bug 根因、部署注意事項，常常留在一次對話裡，下一輪 agent 又要重新學。Compound Engineering 的做法是把工程工作拆成一個會累積上下文的循環：

1. 先用 `/ce-strategy` 建立或維護 `STRATEGY.md`，把產品目標、persona、metrics、tracks 固定成上游錨點。
2. 用 `/ce-ideate`、`/ce-brainstorm`、`/ce-plan` 把模糊想法變成需求與執行計畫。
3. 用 `/ce-work` 或 `/ce-debug` 執行 feature / bug fix。
4. 用 `/ce-code-review`、`ce-doc-review` 等 review skills 透過多個 reviewer agents 檢查正確性、安全性、可維護性、測試缺口與文件品質。
5. 用 `/ce-compound` 或 `/ce-compound-refresh` 把學到的 repo-specific knowledge 寫成下一次可重用的 durable learning。
6. 用 `/ce-product-pulse` 回看真實使用狀況，讓下一輪 strategy / brainstorm 不只根據程式碼，也根據 user outcome。

它的哲學可以濃縮成：planning 和 review 佔大部分槓桿，execution 反而應該被好的前置思考縮小；每一次修 bug 或做 feature，都順手把「下次不必重新踩一次」的知識制度化。

## 主要組件

- **Core workflow skills**：`/ce-strategy`、`/ce-ideate`、`/ce-brainstorm`、`/ce-plan`、`/ce-work`、`/ce-debug`、`/ce-code-review`、`/ce-compound`、`/ce-product-pulse`。
- **Research and context skills**：例如 `/ce-sessions` 查跨 Claude Code / Codex / Cursor session history，`/ce-slack-research` 查 Slack 組織脈絡，`ce-riffrec-feedback-analysis` 把錄影、音訊或 notes 轉成 structured feedback。
- **Git workflow skills**：例如 `ce-commit`、`ce-commit-push-pr`、`ce-clean-gone-branches`、`ce-worktree`。
- **Review agents**：包含 correctness、security、performance、reliability、data integrity、testing、maintainability、architecture、project standards 等不同 persona。
- **Document review agents**：包含 coherence、feasibility、scope、product lens、security lens、adversarial document review 等。
- **Research / design / workflow agents**：例如 repo research、framework docs research、issue intelligence、session historian、web research、Figma sync、design iterator、PR comment resolver。

這種設計的重點是：skill 是人或主 agent 的入口；agent 是被 skill 委派出去的專家角色。使用者通常呼叫 `/ce-plan`、`/ce-code-review` 這類入口，而不是直接呼叫底層 reviewer agent。

## Codex 安裝注意

Codex 的安裝流程目前比較特別，因為 Codex native plugin install 會安裝 skills，但尚未完整支援 custom agents。官方文件建議三步驟：

```bash
codex plugin marketplace add EveryInc/compound-engineering-plugin
bunx @every-env/compound-plugin install compound-engineering --to codex
codex
```

進入 Codex 後再用 `/plugins` TUI 找到 Compound Engineering marketplace，安裝 `compound-engineering` plugin，並重啟 Codex。第一步只是註冊 marketplace，TUI install 才會啟用 native CE skills；Bun installer 這一步則補上 code review、research、workflow 等 skills 會委派的 custom agents。若少了 Bun agent install，像 `$ce-code-review`、`$ce-plan`、`$ce-work` 這些 delegating skills 可能會回報找不到 agents。

如果使用非預設 Codex profile，所有步驟要指向同一個 `CODEX_HOME`，避免 marketplace、skills、agents 分別裝到不同 profile。

## 適合怎麼看待它

這個 plugin 值得研究的地方，不只是它提供很多 commands，而是它把「AI assisted engineering」做成一套可複製的 operating system：

- `STRATEGY.md` 是產品與 repo 的高階 grounding。
- brainstorm / plan 是把模糊需求變成可執行 spec 的 gate。
- multi-agent review 是品質校準，不只找 bug，也訓練下一輪判斷。
- compound notes 是 team memory，把一次性對話轉成 repo 可查的知識。
- session / Slack / issue / product pulse 類工具把工程脈絡往程式碼外擴張。

對我們自己的 agent skills 設計也有啟發：不要只寫「執行任務」的 skill，也要設計能留下 artifact、更新知識、檢查品質、回收使用者結果的 workflow。真正會 compound 的不是 agent 一次做得多快，而是每次做完後，下一次 agent 進來時能少猜一點、多依據一點。

## 後續觀察點

- Codex native plugin spec 若未來支援 custom agents，Codex 安裝流程應會簡化。
- skills / agents 數量與名稱隨 release 演進，引用時應以 repo README、plugin README、GitHub Releases 為準。
- 這套工具偏 opinionated workflow；導入到自己的 repo 前，應先確認它的 artifact 路徑、review 標準、branch/worktree 習慣是否符合團隊節奏。
- 它的「compound」概念與我們在 `km`、`fde-os` 中想做的制度化知識沉澱很接近，可以作為設計 Black Bear / FDE agent workflow 的參考。
