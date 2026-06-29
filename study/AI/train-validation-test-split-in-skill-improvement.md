---
title: ts-agent 專案自我改進工作流：機器學習概念（Train / Validation / Test 資料切分）在 Agent Skill 優化上的套用
tags: [ts-agent, machine-learning, train-validation-test, agent-skills, skill-evaluation]
created: 2026-06-29
summary: 記錄 ts-agent 專案中自我改進（Self-Improvement）工作流如何借鏡機器學習經典的 Train / Validation / Test 資料切分，來進行 AI Agent Skill 的指令優化與評測閘門判定。
related: [study/AI/note.md, coding/agent-skills/README.md]
---

# ts-agent 專案自我改進工作流：機器學習概念在 Agent Skill 優化上的套用

## 核心概念

本篇記錄 **ts-agent** 專案在自我改進（Self-Improvement）工作流中，如何套用機器學習經典的 **訓練 / 驗證 / 測試（Train / Validation / Test）** 資料切分概念。評測引擎會產生由模型撰寫的評測任務（每個任務包含：一個情境 + 一份評分規準 / Rubric），並在流程的不同階段中分別使用這三種不同角色的任務。

### 1. 訓練任務 (Train Tasks) — 用來學習
- **目的**：提供學習與錯誤分析的基礎。
- **流程**：
  1. 先讓 Agent Skill 執行這些任務。
  2. 收集失敗案例與錯誤。
  3. 進入 **Reflect（反思）** 步驟：讀取失敗案例，提出有限度、針對性的「學到的修改（Learned Edits）」，並加入到 Skill 的指令（Instructions）中。
- **數量要求**：最少 1 個。
- **作用**：決定要對 Skill 修改什麼。

### 2. 驗證任務 (Validation Tasks) — 用來判斷修改好壞
- **目的**：評估在訓練任務中產生的修改（Learned Edits）是否確實提升了效能，且沒有產生副作用（Regressions）。
- **流程**：
  1. 在此切分上進行兩次評分：
     - **Baseline (基準)**：修改前的舊版本。
     - **Candidate (候選)**：加入 Learned Edits 之後的新版本。
  2. **Gate (閘門)**：只有當候選版本在驗證集上的評分，以「嚴格幅度」超越基準版本時，才會正式採納此修改。
- **特性**：這些任務**絕對不會**被拿來撰寫或引導修改，以確保檢查的獨立性。
- **數量要求**：最少 2 個（數量足夠多，對比與統計才具備實質意義）。

### 3. 測試任務 (Test Tasks) — 用來評估推廣能力
- **目的**：評估最終修改的真實泛化能力（Generalization）。
- **流程**：
  - 在學習（Train）與閘門判定（Validation）階段**完全保留不碰**。
  - 只有在修改被正式採納後，才用測試任務進行最終評分。
  - 產生的評分數據作為最後「能不能推廣到真實世界 / 新情境？」的泛化指標，並隨結果一同回報。
- **數量要求**：最少 0 個（可選）。

---

## 為什麼要將它們分開？（核心理由）

如果你拿來「調整 / 優化」Skill 的任務（Train），與拿來「評估」的任務是同一批，那麼 Agent 就只是在 **「背答案」（Overfitting / 過度擬合）**。

- **Train (訓練)**：決定修改什麼（Learn）。
- **Validation (驗證)**：判斷修改好不好（Gate）。
- **Test (測試)**：估計在真實世界中的泛化與推廣能力（Generalize）。

這三者的徹底分離，是確保 AI Agent Skill 的改進具備實質穩健性（Robustness）的關鍵防線。
