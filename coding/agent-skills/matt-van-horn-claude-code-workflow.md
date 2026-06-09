---
title: Matt Van Horn 的 Claude Code / Compound Engineering 工作流
tags: [claude-code, codex, compound-engineering, agent-skills, ai-workflow, voice-input, planning]
created: 2026-06-09
summary: 從一篇介紹 Matt Van Horn Claude Code 用法的文章中提取可長期保存的工作流模式：plan-first、語音輸入、並行 agent sessions、context compounding、遠端 AI 工作站與多模型分工。
related: [coding/agent-skills/compound-engineering-plugin.md, coding/agent-skills/README.md, coding/codex/README.md]
source:
  - pasted article from Codex attachment on 2026-06-09
---

# Matt Van Horn 的 Claude Code / Compound Engineering 工作流

這篇文章最值得保存的不是「Matt 用了哪些工具」，而是一套新的 agentic work operating model：人負責意圖、判斷、取捨與回饋；AI 負責調研、規劃、執行、review、沉澱。它把 coding agent 從「幫忙寫程式」推到「可並行調度的工作系統」。

## 核心原則：有想法時先寫 plan

文章裡最重要的習慣是：除非真的只改一行，否則任何想法、bug、錯誤訊息、產品點子都先進 `/ce: plan`，產出 `plan.md` 後才執行。

這個習慣的價值在於把「先想清楚再做」從個人自律變成工具強制流程：

- 需求、問題、方案、檔案影響範圍、驗收標準先被寫下來。
- 計畫基於 repo、過去 bug 經驗、文件與外部研究，而不是泛泛建議。
- `/ce: work` 可以接手 plan 拆任務、修改程式、跑測試、勾驗收項。
- context 掉了也可以開新 session 指向同一份 plan 繼續，`plan.md` 變成 durable checkpoint。

這跟 `km` / FDE 文件裡常講的制度化很接近：不要只追求一次性完成任務，而是讓每次任務留下下一次可復用的 artifact。

## Plan-first workflow 的可複製版本

可以把文章中的 workflow 抽象成這樣：

```text
idea / bug / research question
  -> latest context collection
  -> plan.md
  -> work execution
  -> tests / review
  -> compound note / reusable learning
  -> next plan starts with better context
```

適合我們借用的規則：

- 小改動可以直接做；只要跨多檔、多步驟、多角色，就先 plan。
- plan 裡一定要有驗收標準，最好是可勾選 checklist。
- plan 應該引用 repo 現況與過去決策，不只寫一般方法論。
- work session 只負責執行 plan，不在執行時重新發明需求。
- 任務完成後要寫下 learnings，否則下一次 agent 仍然會重新踩一次坑。

## 語音輸入的真正突破

文章提到 Matt 使用 Monologue 這類語音輸入工具，把口述直接送進 Claude Code。這裡的重點不是 transcription 比以前更準，而是接收端變成 LLM 後，輸入不必完美。

傳統語音輸入要求每個字正確，因為文字處理器不理解意圖；LLM 可以容忍重複、跳躍、口語、轉錄錯字，並用上下文補齊意思。這讓「像跟同事說話一樣跟 agent 講需求」變成可行工作流。

對自己的啟發：

- 需求初稿、bug 描述、meeting debrief、strategy idea 很適合先口述。
- 語音輸入應該接到 planning / summarization，而不是直接接到 code editing。
- 口述後要讓 agent 反問或整理成 plan，避免把模糊語音直接變成模糊執行。

## 四到六個並行 sessions：一個人調度多條工作流

Matt 的模式是同時開多個終端與 Claude Code sessions：一個寫 plan，一個執行前一份 plan，一個做研究，一個修測試中發現的 bug。這不是單純 multitasking，而是把 agent session 當成可排程的 worker。

讓並行可行的配套：

- 每個 session 有清楚 artifact，例如 `plan.md`、bug report、research output。
- 完成時有提示音，讓人只在需要 review / unblock 時介入。
- 編輯器自動保存，讓人與 agent 對同一批檔案的狀態同步。
- 權限策略要配合任務風險；文章中提到完全放開權限，但這只適合可信 repo / 低風險環境。

可以保存為操作原則：**parallel agents 需要 durable artifacts，不然只是多開幾個會迷路的對話。**

## `/last30days`：決策前先抓最新社群脈絡

文章裡的 `/last30days` 代表一個很有用的模式：在做技術選型或產品判斷前，先收集最近 30 天 Reddit、X、YouTube、Hacker News、網頁等社群討論，再把結果餵進 plan。

價值在於補上模型訓練資料的時間落差：

- framework / vendor / browser automation / AI 工具選型很容易變動，不能只靠模型記憶。
- 社群討論可暴露文件沒有寫的痛點，例如 token cost、DX、穩定性、真實踩坑。
- plan 不是只根據官方文件或舊知識，而是根據當下使用者正在討論的問題。

這個方法可延伸到市場研究、競品分析、活動規劃、投資假設、客戶痛點盤點。原則是：**先收現場訊號，再讓 AI 形成計畫。**

## Context compounding：午餐聊天也能變產品提案

文章中最有啟發的故事是：Matt 把一段午餐會議錄音轉錄後丟給 Claude Code，因為 agent 已經知道公司 GitHub repo、過去 strategy plans、技術決策，所以它能把零散聊天轉成 product proposal，而不是只做摘要。

這裡的真正能力來自上下文累積：

- meeting transcript 只是原料。
- repo code 是可行性邊界。
- strategy docs 是方向與取捨。
- 過去 plans 是已知決策與歷史脈絡。
- agent 把這些交叉比對後，才產出有用提案。

對 `km` 的直接啟發：每一份 strategy、decision、playbook、plan、learning 都應該能被下一次 agent 找到。知識庫不是給人偶爾查閱而已，它應該成為 agent 下一次規劃的 context substrate。

## Mac Mini 作為 24 小時 AI 工作站

文章提到用 Mac Mini 跑長時間 Claude Code / OpenClaw workflow，再透過 Telegram 或 tmux 遠端調度。這個模式值得保存，因為它把 AI work 從筆電當下狀態解耦出來。

可複製價值：

- 長時間任務跑在 always-on machine，筆電只是入口。
- 手機上想到 bug / idea，可以遠端丟 `/ce: plan`。
- 飛機或不穩網路環境用 tmux 連回工作站，斷線後 session 仍繼續。
- 適合需要長時間 build、research、test、agent loops 的工作。

這與 `os-config/darwin/mac-mini-remote-setup.md` 的方向一致：Mac Mini 不只是遠端開發機，也可以是常駐 AI worker。

## 多模型分工：Claude 規劃，Codex 執行

文章提到的費用與能力分工也值得記錄：高強度 Opus sessions 很快耗盡額度，因此 Matt 用 Claude 做 planning / orchestration，用 Codex 做 heavy implementation，並讓兩邊互相 review。

可抽象成一個原則：不要把所有 AI 當成同一種 worker。不同模型 / 工具可以像團隊角色一樣分工：

- Claude：長上下文討論、需求澄清、strategy / plan / orchestration。
- Codex：repo-grounded coding、執行 plan、跑測試、修實作。
- 交叉 review：Claude review Codex，Codex review Claude，降低單一模型盲點。

這種分工在 FDE / consulting 場景也有用：讓一個 agent 產出 plan，另一個 agent 根據 repo / artifact 實作，再用第三個視角做 review。

## 不只寫程式：Disney World 案例的意義

文章最後的旅行規劃案例說明，這套 workflow 的適用範圍不是 coding，而是任何複雜資訊決策：

```text
voice / rough request
  -> latest research
  -> structured plan
  -> publishable artifact
  -> calendar / reminder / automation
```

旅行、活動、產品研究、客戶訪談、教育訓練、FDE engagement 都可以套同一個循環。差別只在 domain knowledge、驗收標準與輸出 artifact。

## 對我們的行動啟發

- 在 `km` 裡保存的不只是結論，也要保存 decision context，讓下一次 agent 能用。
- 在 `fde-os` 或客戶 engagement 中，任何多步驟工作都應該先產出 plan / checklist / scorecard。
- 語音輸入可以作為 strategy / meeting / idea capture 的入口，但要經過整理與確認後才執行。
- Mac Mini 可以定位成常駐 AI workstation：tmux、遠端入口、通知、任務續跑。
- Agent skills 的設計應包含「執行前規劃」「執行後 review」「完成後 compound learning」，而不是只包一個 command。

一句話總結：這篇文章真正值得學的是 **plan as durable context**。人把意圖講清楚，agent 把它變成可驗收的計畫、可執行的改動、可保存的知識；下一次工作再從這些 artifact 開始，而不是從空白對話開始。
