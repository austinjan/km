---
title: AI 學習筆記
tags: [ai, llm, prompt, context-engineering, claude-code, skills]
created: 2026-04-07
summary: AI/LLM 核心概念學習筆記，涵蓋 prompt 設計、context engineering、tool call、Claude Code skills 使用原則
---

# AI 學習筆記

## 了解 LLM 本質

- LLM 是統計模型，透過大量文本預測下一個字詞的機率
- 並不具備真正的理解能力，是基於訓練資料中的模式生成回應

## 設計有效的 Prompt

- **明確且具體**：提供清晰的指示，避免模糊要求
- **提供上下文**：給予足夠背景資訊
- **使用範例**：提供範例輸入和輸出，引導模型理解預期結果

## Context Engineering 技巧

- **分段提示**：將複雜任務拆分成多個步驟，逐步引導
- **反覆迭代**：根據模型回應不斷調整優化 prompt
- **使用系統提示**：利用 system-level prompt 設定模型行為和風格
- **Progressive disclosure**：逐步揭示資訊，避免一次提供過多內容
- **小步驟驗證**：每個步驟都要能驗證結果，不要一次跑太多
- **定期 clear / compact**：避免 context 過長拖累模型效率

## Tool Call

- 了解 tool call 的運作方式
- Context 過大或過複雜時會有臨界點（Phase Transition），超過後模型效率會陷入低效或錯誤狀態
- 參考：https://www.youtube.com/watch?v=PQQbNMHN0t4

## Claude Code Skills

- 透過 skill 完成團隊協作和流程規範
- **Concise is key（精簡為王）**：每寫一段文字都問自己，Claude 真的需要這個嗎？是不是常識？值不值得花 token？
- 正向回饋產品文件：在 CLAUDE.md 或 AGENTS.md 等 AI 規範文件中記錄有效的做法
