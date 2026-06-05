# FDE Engagement Playbook / AI Agent 導入執行手冊

日期：2026-06-04  
目的：把 FDE / AI Agent 導入流程拆成可執行、可驗收、可交接的工作方式。本文補充 `forward-deployed-engineering.md`，聚焦每個 phase 的活動、驗證標準、產出文件、責任分工與 phase gate。

## 1. 使用方式

這份 playbook 適用於三種情境：

1. 改善既有 workflow 的效率、品質或可觀測性。
2. 將 workflow know-how 萃取成 agent skill、runbook、eval、workflow template 等公司 AI 資產。
3. 彌平現有產品與客戶實際使用之間的 gap，例如 NMS、aaagent / KM system、connector、onboarding、文件、權限與資料準備落差。

每個 engagement 不應只問「agent 有沒有做出來」，而要同時回答三個問題：

- Workflow outcome：流程是否更快、更穩、更可觀測，或至少建立可追蹤 baseline。
- AI asset outcome：是否產生可重複使用的 skill、eval、runbook、template 或 failure taxonomy。
- Product learning outcome：是否把產品 gap、platform gap、導入 playbook gap 明確回饋給 owner。

## 2. Engagement 總流程

| Phase | 名稱 | 主要目的 | Gate |
| --- | --- | --- | --- |
| 0 | Qualification | 避免接錯案子 | 有 owner、有資料/案例、有 UAT 使用者、有 success metric，否則 no-go |
| 1 | Workflow Discovery | 找到足夠窄且有價值的 workflow | Scope、baseline、system boundary、know-how capture plan 被確認 |
| 2 | Prototype / Tracer Bullet | 用最小真實系統驗證價值與風險 | Happy path、eval、trace、draft skill、product gap report v1 完成 |
| 3 | Controlled Pilot | 讓小範圍真實使用者受控使用 | Adoption、error、cycle time、operator feedback、validated skill 被確認 |
| 4 | Production Deployment | 進入正式日常 workflow | Security、permission、audit、rollback、runbook、handoff 完成 |
| 5 | Generalize | 把經驗變成產品能力與 AI 資產 | Asset registry、product roadmap input、platform backlog、retrospective 完成 |
| 6 | Post-Launch Retainer | 維持、改善與追加 discovery | Monthly operation report、incident、change log、gap follow-up 完成 |

Phase 可以依案件規模合併，但不應跳過 gate。若跳過某個 phase，必須在 proposal 或 acceptance note 中寫明原因與風險。

## 3. 角色與責任

| 角色 | 核心責任 | 不應承擔 |
| --- | --- | --- |
| AI Deployment Lead | scope、stakeholder、success metric、風險與 phase gate | 單獨承諾無法控制的 AI outcome |
| Forward Deployed AI Engineer | prototype、tool integration、agent workflow、logging、eval、deployment | 無限制客製化或長期維運 |
| Workflow Analyst / AI Ops Specialist | 訪談、案例收集、流程拆解、eval case、UAT、operator handoff | 只做訪談但不落到具體行為規格 |
| Product / NIMBL R&D Owner | roadmap ownership、正式產品功能、產品架構 | 被動接收沒有證據的需求清單 |
| Platform / Tooling Owner | connector、agent runtime、eval harness、deployment tooling、monitoring | 事後替 squad 判斷 pattern 是否可複製 |
| Customer Workflow Owner | 提供流程 owner、決策、UAT、使用者與內部 adoption | 把資料、權限、使用者參與問題全轉嫁給 FDE |
| Customer IT / Security / Data Owner | sandbox、API、權限、安全審查、資料邊界 | 到 production 前才第一次介入 |

## 4. Phase 0: Qualification

### 4.1 目的

判斷這個案子是否適合進入 FDE engagement。Qualification 的目標不是成交，而是避免把模糊願望、沒有 owner 的 AI 想像、或資料權限完全不明的案子包成 prototype。

### 4.2 必做活動

- **確認 business owner、workflow owner、IT/security/data owner**：
  - 識別決定預算與商業目標的 **Business Owner**。
  - 識別每天面對此工作流、能定義對錯的 **Workflow Owner**。
  - 識別能批准系統接入、提供資料與 API 的 **IT/Security/Data Owner**。
  - *標準*：若任一關鍵角色缺席或由無權力代理人參與，則必須在評分表中列為高風險阻礙（Blocker）。
- **確認是否能提供真實案例、文件、資料樣本或 sandbox**：
  - 要求客戶在 Phase 0 結束前提供 10-20 個歷史真實案例（包含輸入、中間判定與最終輸出）或可用於測試的模擬 sandbox 環境。
  - *標準*：拒絕「上線後才想辦法接資料」或「只看範例截圖就寫 prompt」的盲目開發，確保有足夠的 ground truth 可進行評測。
- **確認是否有 3-5 位一線 reviewer 或 UAT 使用者**：
  - 這些使用者必須是每天實際執行此 workflow 的一線人員，而非不碰操作的主管。
  - *標準*：一線人員需承諾在 Phase 2 與 Phase 3 期間每週投入 2-4 小時參與訪談、審查 Agent 建議、提供真實回饋，並在 Pilot 階段將其納入日常工作。
- **確認客戶能接受 human-in-the-loop，不要求 agent 一開始完全自動決策**：
  - 與客戶達成共識：初期 Agent 僅作為副駕駛（Co-pilot）提供建議，所有對外發送、修改狀態、高風險決策必須經過一線人員確認（Human-in-the-loop）才能執行。
  - *標準*：簽署合作意向或 proposal 時，需明文寫入安全防護機制（guardrails），明確拒絕初期完全自動決策（autonomous decision-making）的要求。
- **確認至少一個可量測 success metric，例如 cycle time、人工處理時間、錯誤率、接受率、升級率**：
  - 定義明確的量化指標（如「工單處理時間降低 30%」、「一線人員對 Agent 建議的接受率大於 70%」、「自動分類準確率達 85%」）。
  - *標準*：不接受「讓系統更聰明」、「提升數位化體驗」等模糊描述，必須有具備明確分母與分子定義的指標。
- **初步判斷哪些 know-how 可能被 skill 化**：
  - 分析該工作流是否包含可固化的專家知識（如：SCADA 工單 triage 判斷、特定設備 troubleshooting 順序）。
  - *標準*：評估專家知識是否能整理成可重複部署的 Prompt、Tooling、MCP 伺服器、Agent Skill、Eval Dataset 或操作 Runbook，作為公司 AI 資產。
- **初步判斷產品 gap 可能來自哪裡**：
  - 對照現有產品能力（如 NMS、aaagent / KM system），評估導入此工作流時可能遇到的系統或功能落差。
  - *標準*：初步分類落差原因，是缺乏特定資料 connector、權限機制不合規，還是客戶資料品質不佳？將這些假設記入 `product-gap-hypothesis`。

### 4.3 產出文件

- `fde-customer-readiness-scorecard.md`
- `fde-workflow-candidate-list.md`
- `fde-no-go-report.md`，若沒有合適場景
- `fde-know-how-capture-plan.md`
- `fde-product-gap-hypothesis.md`

### 4.4 驗收標準

- 至少訪談 3 類 stakeholder：business owner、一線使用者、IT/security 或 data owner。
- 至少取得 10-20 個真實或匿名化工作樣本；若無法取得，需列為 blocker。
- 每個候選 workflow 都有 owner、measurable pain 與初步 system boundary。
- 至少辨識 1-3 個可萃取 know-how asset，或明確說明不可萃取原因。
- 至少形成一版 product gap hypothesis。

### 4.5 Gate 決策

- Go：有 owner、有樣本、有 UAT 使用者、有 success metric、有可控 scope。
- No-go：沒有 owner、沒有資料、沒有一線使用者、客戶拒絕 human approval、scope 是宏大轉型願望。
- Iterate：場景有價值，但需先補資料、權限、owner 或 workflow 邊界。

## 5. Phase 1: Workflow Discovery

### 5.1 目的

把候選場景拆成一個足夠窄、可驗證、可落地的 workflow，並建立 baseline、agent scope、know-how capture map 與 product gap classification。

### 5.2 必做活動

- 訪談主管、一線使用者、IT、合規或資安。
- 收集 20-50 個真實工作樣本，標記 happy path、edge case、reject case。
- 畫 current-state workflow：input、decision、tool、handoff、approval、exception、output。
- 建立 baseline：目前平均處理時間、等待時間、錯誤率、返工率、升級率或其他可觀測指標。
- 定義 agent 可以做、不可做、必須請人確認的行為。
- 建立 know-how capture map：判斷規則、例外處理、升級條件、工具順序、不可自動化區域。
- 建立 product gap classification：產品功能、整合、文件、onboarding、permission/data readiness、sales expectation、reusable module opportunity。

### 5.3 產出文件

- `fde-workflow-discovery-brief.md`
- `fde-current-state-workflow-map.md`
- `fde-agent-opportunity-brief.md`
- `fde-success-metrics-and-baseline.md`
- `fde-scope-boundary.md`
- `fde-know-how-capture-map.md`
- `fde-product-gap-classification.md`

### 5.4 驗收標準

- workflow 可以用 1-2 句話描述目標、input、output 與成功條件。
- workflow owner 確認 scope boundary。
- 至少有一個可觀測 baseline；若沒有現成數據，需定義 prototype / pilot 中如何補 baseline。
- 已標明哪些行為需要 human approval，哪些行為必須拒絕。
- know-how capture map 包含至少 5 個判斷點或明確說明此 workflow 判斷密度低。
- product gap classification 每一項都有證據來源，例如訪談、樣本、產品操作紀錄、UAT feedback。

### 5.5 Gate 決策

- Go：scope 足夠窄、baseline 可追蹤、資料與工具可接、風險可控。
- No-go：流程本身不穩定、資料不可得、權限不可得、成功標準不可定義。
- Iterate：重新切 scope，或先做資料/權限 readiness work。

## 6. Phase 2: Prototype / Tracer Bullet

### 6.1 目的

用最小可運行系統驗證一個完整 happy path，而不是做投影片式 demo。Prototype 可以使用 sandbox、mock data 或受控資料來源，但必須保留 trace、logging、human confirmation 與 eval。

### 6.2 必做活動

- 實作一個 end-to-end agent workflow。
- 至少串接一個真實資料來源、sandbox 或可信 mock。
- 建立 tool call logging、agent trace、人工確認點與失敗回報。
- 建立至少 30 個 eval case：happy path、edge case、reject case。
- 記錄每次失敗原因：資料不足、權限不足、模型誤判、tool error、scope 不清、human approval 缺失。
- 產出 draft skill asset：agent skill、runbook、eval case、workflow template 或 troubleshooting tree。
- 產出 product gap report v1。

### 6.3 產出文件

- `fde-agent-spec.md`
- `fde-prototype-demo-notes.md`
- `fde-eval-dataset.md`
- `fde-eval-report.md`
- `fde-trace-logging-report.md`
- `fde-production-gap-list.md`
- `fde-agent-skill-asset-draft.md`
- `fde-product-gap-report-v1.md`

### 6.4 驗收標準

- Prototype 完成約定的 1 個 workflow happy path。
- Task completion 建議達 70% 以上；未達時，需提供 failure taxonomy 與修正方案。
- 重大安全錯誤為 0：不得越權讀取資料、不得未經核准改寫 production state、不得繞過 human approval。
- 所有 tool call 都有 log，可追蹤 input、tool、output、agent reasoning summary、human decision。
- 3-5 位 reviewer 完成 UAT review。
- Draft skill asset 已用 prototype 案例驗證，並列出適用邊界與不可用情境。
- Product gap report 至少包含分類、證據、影響、建議 owner 與下一步。
- 文件明確標示 prototype 不是 production system。

### 6.5 Gate 決策

- Go pilot：value 被 reviewer 認可、critical risk 可控、資料/權限可進一步接入。
- Iterate：task completion 偏低但 failure 可修正，或 scope 需要收窄。
- Stop：核心 workflow 不適合 agent、風險不可控、客戶不願投入 UAT 或權限準備。

## 7. Phase 3: Controlled Pilot

### 7.1 目的

讓 5-15 位真實使用者在受控環境中使用 agent，驗證 adoption、錯誤、cycle time、operator handoff、support process 與 skill asset 是否能被非原開發者使用。

### 7.2 必做活動

- 接入客戶 sandbox、staging 或受控 production replica。
- 建立權限模型、audit trail、approval queue、rollback 或 manual override。
- 建立 monitoring dashboard 或 weekly pilot report。
- 設定 support channel、incident severity、owner 與回應流程。
- 處理 50-200 件真實或匿名化案例。
- 每週整理 adoption metrics、failure taxonomy、user feedback。
- 修正並驗證 skill asset。
- 產出 product / platform backlog recommendation。

### 7.3 產出文件

- `fde-pilot-plan.md`
- `fde-permission-and-approval-model.md`
- `fde-audit-and-rollback-plan.md`
- `fde-monitoring-dashboard-spec.md`
- `fde-weekly-pilot-report.md`
- `fde-incident-process.md`
- `fde-pilot-retrospective.md`
- `fde-agent-skill-asset-validated.md`
- `fde-product-platform-backlog-recommendation.md`

### 7.4 驗收標準

- 至少 5-15 位真實使用者參與，或處理 50-200 件真實/匿名化案例。
- 連續 2 週完成 pilot run，不發生 critical incident。
- Critical severity 錯誤為 0；high severity 錯誤有 workaround 與 owner。
- Agent 建議接受率或有效使用率達雙方約定 threshold，建議初期目標 50-70%。
- 目標 workflow 的 cycle time 或人工處理時間有可觀測改善，建議初期目標 15-30%。
- Skill asset 至少被 1 位非原開發者或 operator 依文件操作過。
- Product / platform recommendation 經 FDE、產品或平台 owner review，並標示 accepted、rejected、needs evidence。
- 客戶完成 go / no-go / iterate decision。

### 7.5 Gate 決策

- Go production：adoption、risk、permission、support、operator readiness 都可控。
- Iterate：agent 有價值，但需修權限、UI、workflow、training 或 scope。
- Stop：真實使用者不採用、風險過高、客戶 owner 不願承接、核心 gap 需產品先補。

## 8. Phase 4: Production Deployment

### 8.1 目的

讓 agent workflow 變成正式日常流程的一部分，並完成安全、權限、audit、rollback、monitoring、training、handoff 與 post-launch support boundary。

### 8.2 必做活動

- 完成 security / access review。
- 建立 production permission、audit、approval、rollback。
- 建立 versioned prompts、tools、configs、eval dataset。
- 設定 monitoring、alerting、cost tracking。
- 執行 production smoke test。
- 完成 operator training 與 handoff。
- 完成 final skill asset package。
- 完成 product gap closure package。

### 8.3 產出文件

- `fde-production-readiness-checklist.md`
- `fde-security-access-review.md`
- `fde-versioned-agent-config.md`
- `fde-production-smoke-test-report.md`
- `fde-monitoring-alerting-cost-plan.md`
- `fde-production-runbook.md`
- `fde-operator-training-material.md`
- `fde-handoff-package.md`
- `fde-post-launch-support-plan.md`
- `fde-final-skill-asset-package.md`
- `fde-product-gap-closure-package.md`

### 8.4 驗收標準

- 客戶指定 production owner、technical owner、business owner。
- 權限、audit、approval、rollback 經客戶確認。
- Production smoke test 通過。
- 連續 2-4 週 stabilization period 內無 unresolved critical incident。
- 已知限制與 fallback procedure 已寫入 runbook。
- 客戶內部 operator 能依 runbook 完成基本操作、停用、回滾與問題回報。
- KPI baseline 與追蹤方式已建立；不要要求上線當下就證明完整年度 ROI。
- Final skill asset package 已登錄到公司內部 skill / playbook registry。
- Product gap closure package 已由對應 owner 接收，不得停留在 FDE 報告中無人負責。

### 8.5 Gate 決策

- Launch：安全、權限、runbook、operator、support boundary 都到位。
- Delay：缺少 owner、權限、rollback、monitoring、operator readiness 或 critical gap。
- Stop：客戶不願承擔 production owner，或要求 agent 做 out-of-scope 自動決策。

## 9. Phase 5: Generalize

### 9.1 目的

把現場驗證過的 pattern 轉成公司產品能力、平台能力、AI asset 與 sales / CS enablement。Generalize 必須由原 squad 負責初步萃取，平台與 R&D 負責 productionize，不能把 finished project 丟給一個不在現場的 analyst team 事後判斷。

### 9.2 必做活動

- 整理 reusable pattern：適用條件、不適用條件、必要資料、必要權限、風險。
- 更新 skill / playbook registry。
- 將 connector、agent runtime、eval harness、deployment tooling 需求轉給 platform / tooling owner。
- 將產品功能與 UX gap 轉給 NIMBL R&D 或對應 product owner。
- 將 onboarding、文件、sales expectation gap 轉給 CS / sales enablement。
- 舉行 build / prove / generalize retrospective。

### 9.3 產出文件

- `fde-build-prove-generalize-retrospective.md`
- `fde-reusable-pattern-brief.md`
- `fde-skill-asset-registry-update.md`
- `fde-connector-backlog.md`
- `fde-product-roadmap-input.md`
- `fde-sales-cs-enablement-notes.md`

### 9.4 驗收標準

- 每個 reusable pattern 都有 evidence，不只靠 squad 直覺。
- 每個 pattern 都有適用邊界與不可用情境。
- Product / platform / CS / sales enablement gap 都有 owner 與狀態。
- 至少一個 artifact 可被下一個 squad 重用，或明確說明此案沒有可重用內容。
- R&D / platform 透過 embedded、rotation 或 review session 接收脈絡。

## 10. Phase 6: Post-Launch Retainer

### 10.1 目的

維持 production workflow 的健康度，處理 incident、小幅調整、版本升級、使用率分析，以及發現下一批 workflow opportunity。Retainer 不應變成無上限外包。

### 10.2 服務內容

- 每週或雙週 health review。
- Incident triage。
- Prompt / tool / eval 小幅調整。
- 使用率與錯誤分析。
- 新 workflow discovery backlog。
- 版本升級與 release notes。
- Skill / runbook 小幅更新與版本紀錄。
- Product gap follow-up。

### 10.3 產出文件

- `fde-monthly-operation-report.md`
- `fde-incident-postmortem.md`
- `fde-change-log.md`
- `fde-release-notes.md`
- `fde-improvement-backlog.md`
- `fde-product-gap-follow-up.md`

### 10.4 驗收標準

- Monthly operation report 已交付。
- 回覆 SLA 達成。
- Critical incident 有 postmortem。
- 重要變更有 changelog。
- 下月 improvement backlog 已排序。
- Skill / runbook 變更有版本紀錄與影響說明。
- Product gap follow-up 有 owner、狀態與下一步。

### 10.5 不包含

- 新 workflow 的完整導入。
- 大型 connector 開發。
- 客戶內部流程大改。
- 24/7 on-call，除非另簽企業支援合約。

## 11. 產出文件總表

| 文件 | 階段 | 主要用途 | Owner |
| --- | --- | --- | --- |
| Customer readiness scorecard | Phase 0 | 判斷是否適合進入 engagement | Deployment Lead |
| Workflow candidate list | Phase 0 | 排序候選 workflow | Deployment Lead |
| No-go report | Phase 0 | 說明不建議導入原因 | Deployment Lead |
| Workflow discovery brief | Phase 1 | 定義 workflow、scope、stakeholder | Deployment Lead |
| Current-state workflow map | Phase 1 | 描述現行流程與 handoff | Workflow Analyst |
| Success metrics and baseline | Phase 1 | 建立可量測指標 | Deployment Lead |
| Know-how capture map | Phase 1 | 萃取判斷規則與例外處理 | Workflow Analyst |
| Product gap classification | Phase 1 | 分類產品與導入落差 | Deployment Lead + Product Owner |
| Agent spec | Phase 2 | 定義 agent 目標、工具、權限、失敗模式 | FDE Engineer |
| Eval dataset | Phase 2 | 建立可重現測試案例 | Workflow Analyst + FDE Engineer |
| Eval report | Phase 2 | 驗證 task completion 與 failure taxonomy | FDE Engineer |
| Trace logging report | Phase 2 | 證明工具呼叫與人工確認可追蹤 | FDE Engineer |
| Draft skill asset | Phase 2 | 建立初版 AI asset | FDE Engineer + Workflow Analyst |
| Product gap report v1 | Phase 2 | 把 gap 指派 owner 與下一步 | Deployment Lead |
| Pilot plan | Phase 3 | 規劃使用者、案例、時程、風險 | Deployment Lead |
| Permission and approval model | Phase 3 | 定義權限與人工審批 | FDE Engineer + IT/Security |
| Weekly pilot report | Phase 3 | 追蹤 adoption、error、feedback | Workflow Analyst |
| Pilot retrospective | Phase 3 | 決定 go / no-go / iterate | Deployment Lead |
| Validated skill asset | Phase 3 | 經真實使用驗證的 AI asset | FDE Engineer |
| Product / platform backlog recommendation | Phase 3 | 餵給 R&D / platform roadmap | Deployment Lead + Product Owner |
| Production readiness checklist | Phase 4 | 上線前 gate | Deployment Lead |
| Security access review | Phase 4 | 資安與權限審查 | IT/Security + FDE Engineer |
| Production smoke test report | Phase 4 | 上線前驗證 | FDE Engineer |
| Production runbook | Phase 4 | 交給 operator 使用 | FDE Engineer + Workflow Analyst |
| Handoff package | Phase 4 | 交接給客戶 owner / CS / support | Deployment Lead |
| Final skill asset package | Phase 4 | 登錄公司 AI asset | FDE Engineer |
| Product gap closure package | Phase 4 | 確認 gap owner 接收 | Deployment Lead |
| Build / prove / generalize retrospective | Phase 5 | 萃取可複製 pattern | Whole Squad |
| Reusable pattern brief | Phase 5 | 讓下一個 squad 重用 | Whole Squad |
| Product roadmap input | Phase 5 | 餵給 NIMBL R&D | Product Owner |
| Monthly operation report | Phase 6 | Retainer 月度驗收 | Deployment Lead |
| Incident postmortem | Phase 6 | 重大事故復盤 | FDE Engineer |
| Improvement backlog | Phase 6 | 排序下月改善 | Deployment Lead |

## 12. 文件品質標準

所有交付文件都應符合以下標準：

- 有 owner、date、version、status。
- 有 scope 與 out-of-scope。
- 有 evidence，不只寫結論。
- 有 decision log，記錄重要取捨。
- 有 open risks / blockers。
- 有 next action、owner、due date。
- 能被非原作者讀懂並繼續工作。

對 AI asset 額外要求：

- 明確寫出適用情境與不可用情境。
- 包含至少 5-10 個測試案例；production 前應擴充到和風險相符的數量。
- 寫清楚需要哪些工具、權限、資料來源。
- 寫清楚何時需要 human approval。
- 寫清楚 failure mode 與 fallback。

對 product gap report 額外要求：

- 每個 gap 都要有分類、證據、影響、建議 owner、建議處理方式。
- 分類至少包含 product feature、integration、documentation、onboarding、permission / data readiness、sales expectation、reusable module。
- 不要把所有 gap 都丟給產品；有些 gap 應由 FDE playbook、platform tooling、CS、sales 或客戶自己處理。

## 13. Phase Gate Checklist

### 13.1 進 Prototype 前

- Workflow owner 已確認。
- Scope boundary 已確認。
- Baseline 或 baseline 補齊方式已確認。
- 資料來源、工具、權限初步可行。
- UAT reviewer 已指定。
- Know-how capture map 初版完成。
- Product gap hypothesis 初版完成。

### 13.2 進 Pilot 前

- Prototype 完成 happy path。
- Eval report 完成。
- Critical security error 為 0。
- 所有 tool call 有 trace。
- Draft skill asset 完成。
- Product gap report v1 完成。
- 客戶同意提供 pilot 使用者與受控環境。

### 13.3 進 Production 前

- Pilot adoption 與 error 指標達標或有明確風險接受。
- Permission、audit、approval、rollback 完成。
- Operator 能依 runbook 操作。
- Monitoring、alerting、cost tracking 完成。
- Final skill asset package 完成。
- Product gap closure package 已分派 owner。
- Production owner、technical owner、business owner 指定完成。

### 13.4 Engagement 結束前

- Workflow outcome 已記錄。
- AI asset 已登錄或說明不可重用原因。
- Product learning 已進 roadmap、platform backlog、CS / sales enablement 或客戶 action。
- Build / prove / generalize retrospective 完成。
- 下一個 workflow backlog 已整理，若有 retainer。

## 14. Training 與能力養成

FDE training 不應一開始就變成課程或認證。正確順序是 apprenticeship-first：

1. 第一批 squad 跑完 1-2 個真實 engagement。
2. 從 engagement 中整理 war story、failure taxonomy、good / bad scope example。
3. 新人先 shadow，再負責小片段，例如訪談紀錄、eval case、tool integration、runbook。
4. 透過 scenario drill 訓練判斷能力，例如該不該接案、該不該自動化、何時該 human approval。
5. 等 pattern 穩定後，再整理成 internal class。

可以先上課的只有底層能力：

- LLM / agent 基礎。
- Tool calling、MCP、ts-agent、aascribe、KM system。
- Eval、trace、logging、audit。
- LLM failure mode。
- 權限、資料保護、human-in-the-loop。

這些是 FDE 地板，不代表完成 FDE 訓練。

## 15. 和 NIMBL R&D / Platform 的銜接

FDE 與 R&D 的界線應該清楚：

- FDE owns 現場 workflow discovery、prototype、pilot、production adoption、product gap classification。
- NIMBL R&D owns 產品 roadmap、核心產品功能、正式產品架構。
- Platform / tooling owns reusable connector、agent framework、eval harness、deployment tooling、monitoring。

銜接方式：

- 每個 squad 至少有一位 product 或 platform owner 參與 phase gate review。
- 重要 engagement 採 embedded / rotation，讓 R&D / platform engineer part-time 進 squad。
- Product gap report 不只送出文件，必須有 review meeting 與 owner assignment。
- Platform 不應事後替 squad 判斷 pattern，而應與 squad 一起 productionize 已驗證 pattern。
- 短期內 FDE 產出直接餵 NIMBL roadmap，不另起一條 competing roadmap。

