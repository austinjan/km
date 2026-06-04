# Forward Deployed Engineering / AI Agent 導入部門研究

日期：2026-06-03  
目的：研究 FDE（Forward Deployed Engineer / Forward Deployed Engineering）模式，評估公司是否應建立一個具備業務理解與工程能力的客戶端 AI Agent 導入部門。

## 1. 摘要

FDE 的核心不是「派工程師去客戶那邊客製化」，而是把產品、工程、業務、顧問、導入與客戶成功的一部分能力壓縮在同一個高機動角色中。這個角色要能進到客戶既有工作流，找出有價值且可落地的 AI Agent 場景，快速做出可驗證的生產級原型，接上客戶資料、權限、工具、流程與治理機制，再把成功模式整理成產品能力、playbook 或可重複部署的模組。

如果公司要建立類似部門，建議不要一開始稱為「顧問團隊」或「售前團隊」。較精準的定位是：

> 客戶現場的 AI Agent 應用工程團隊，負責從 workflow discovery 到 production adoption，並把可重複模式回饋給產品與平台。

這個部門的核心任務可以拆成三類，且三者應該在每個 engagement 中同時發生：

1. 針對既有 workflow 做效率提升：先改善已經存在、每天發生、可量測的工作流程，而不是先做抽象 AI 展示。
2. 將 workflow know-how skill 化：把資深人員的判斷、例外處理、工具使用順序、拒絕條件與升級規則，整理成 agent skill、runbook、eval case、workflow template 或 troubleshooting tree，變成真正的公司 AI 資產。
3. 彌平產品與實際使用 gap：把客戶現場使用 NMS、aaagent / KM system 或其他產品時遇到的落差，分類回饋成產品 roadmap、connector backlog、onboarding 改善、文件/skill 補強或 sales expectation 修正。

因此 FDE 不只是交付客戶案子的 delivery function，也是一個把現場經驗轉成產品能力與公司 AI 資產的 operating model。

## 2. FDE 是什麼

### 2.1 傳統 FDE

Palantir 早期把 Forward Deployed Software Engineer（FDSE / Delta）放在 Business Development org，但任務是達成客戶的技術與營運成果，而不是只做銷售支援。Palantir UK 對 Delta 的描述也強調：直接與客戶合作、快速理解問題、設計並實作突破性解法，讓組織用資料產生實際影響。

這代表 FDE 的正確分類不是純工程、純顧問、純 PM 或純 sales engineer，而是結果導向的混合角色：

- 要能跟客戶高層與一線使用者溝通。
- 要能看懂客戶現有流程、資料、權限、系統邊界與政治現實。
- 要能自己寫程式或至少完成足夠真實的系統整合。
- 要能把現場學到的模式回饋給產品與核心工程。

### 2.2 AI 時代的 FDE

OpenAI 對 FDE 的定義很直接：FDE 是把 AI 帶進複雜真實用例與生產環境的方法。FDE 團隊不是先推通用產品，而是直接與客戶合作，解特定問題、驗證 impact，再找出能 scale 的模式。

OpenAI 2026 年 5 月宣布 OpenAI Deployment Company，明確提到 FDE 會嵌入客戶組織，和 business leaders、operators、frontline teams 一起找出 AI 影響最大的地方，重新設計關鍵 workflow，並把成果變成 durable systems。典型 engagement 會先做 focused diagnostic，再選少數 priority workflows，接著在客戶組織內設計、建置、測試與部署 production systems，連接模型、資料、工具、controls 與 business processes。

Anthropic 的 Applied AI FDE 職缺也呈現相同方向：FDE 直接嵌入 strategic customers，和客戶團隊一起交付進階 AI 應用；責任包含在客戶系統內建 production applications、交付 MCP servers、sub-agents、agent skills 等 production workflow artifacts，提供 enterprise deployment support，並 codify repeatable deployment patterns 回饋產品與工程。

## 3. 這類部門解決什麼問題

企業 AI Agent 導入的瓶頸通常不是「模型不夠聰明」，而是：

- 找不到足夠窄、足夠痛、足夠可量測的 workflow。
- 客戶流程散在 email、Excel、ERP、CRM、文件、Slack/Teams 與人工簽核中。
- 現有系統權限、資料品質、API、稽核與合規限制不清楚。
- Demo 很容易做，但從 pilot 到 production adoption 很難。
- 一線使用者不信任 agent，主管也不知道如何衡量 ROI。
- 每個客戶看似都不同，導致產品團隊無法從專案中萃取共通能力。

FDE 部門的價值，就是用能寫 code 的 deployment 人才，把上述問題壓成一個可管理的導入流程。

## 4. 和相近角色的差異

| 角色 | 主要任務 | 和 AI FDE 的差異 |
| --- | --- | --- |
| Sales Engineer | 支援售前、demo、技術問答、POC | FDE 更深進 post-sales / production，對 adoption 與 workflow impact 負責 |
| Solution Architect | 設計方案、系統架構、整合藍圖 | FDE 通常更 hands-on，會自己 build、debug、部署與交付 artifacts |
| Consultant | 診斷問題、流程改善、管理變革 | FDE 必須把建議轉成可運行的系統，不能只交簡報 |
| Customer Success | 續約、使用率、客戶健康度 | FDE 聚焦新 workflow 的落地與技術可行性，成功後才交給 CS 或 AM scale |
| Product Engineer | 建核心產品能力 | FDE 先在客戶現場找 pattern，再把 pattern 回饋給產品工程 |
| Implementation Engineer | 導入既有產品 | AI FDE 更常處理未知 workflow，需要從第一性原理設計 agent、eval 與 control loop |

## 5. 目標人才輪廓

公司想找「具備業務以及一點工程背景」的人，方向正確，但要避免只找會聊天、不敢碰系統的人。AI Agent 導入會碰到資料、權限、API、RPA、workflow state、eval、prompt、LLM failure mode、稽核與資安。如果候選人完全沒有實作能力，會很快退化成顧問或專案管理。

建議的人才分層：

### 5.1 AI Deployment Lead

適合背景：

- 技術型顧問、前 solution architect、前 founder、資深 sales engineer、懂業務的軟體工程師。
- 能和主管談 ROI，也能和 IT/工程談 API、資料表、權限、部署與安全。

主要責任：

- workflow discovery。
- 客戶 stakeholder mapping。
- use case prioritization。
- delivery scope 與 success metrics。
- 客戶現場協調與風險管理。

必要能力：

- 能寫清楚 problem statement、流程圖、成功指標、導入邊界。
- 能判斷哪些需求應該做 agent、哪些只是 automation、BI 或表單流程。
- 懂基本 LLM 能力與限制，不把所有問題都包成 prompt engineering。

### 5.2 Forward Deployed AI Engineer

適合背景：

- 2-5 年 full-stack、backend、data engineer、automation engineer。
- 有 API 串接、資料處理、內部工具、RAG、agent workflow、eval 或 workflow automation 經驗。

主要責任：

- 快速做 prototype。
- 串接客戶工具與資料。
- 建 agent workflow、tool calling、approval loop、logging、eval。
- 把可重複部分抽成 template、SDK、connector、playbook。

必要能力：

- Python 或 TypeScript 至少一種能 production 使用。
- 會讀 API 文件、處理 auth、webhook、queue、database、file ingestion。
- 了解 LLM agent 的失敗模式：幻覺、權限越界、工具誤用、上下文污染、不可重現。

### 5.3 Workflow Analyst / AI Ops Specialist

適合背景：

- 業務分析師、營運 PM、客服營運、內部流程改善、低代碼自動化。
- 不一定要很會寫程式，但要能拆流程、訪談一線使用者、寫測試案例與操作手冊。

主要責任：

- 訪談與流程盤點。
- 收集真實案例與 edge cases。
- 編寫 eval dataset。
- 協助 UAT、training、change management。

必要能力：

- 能辨識流程中的決策點、資料來源、例外處理與 handoff。
- 能把使用者口語需求轉成具體 agent 行為規格。

## 6. 部門初期組織設計

建議先用小隊制，不要先建大型顧問部門。

### 6.1 初期小隊

一個客戶導入 squad：

- 1 位 AI Deployment Lead。
- 1 位 Forward Deployed AI Engineer。
- 0.5-1 位 Workflow Analyst / AI Ops Specialist。
- 共用支援：平台工程、資安/法務、產品 PM。

### 6.2 部門職責

FDE 部門應負責：

- 找出客戶 workflow 中的 AI Agent 機會。
- 將 high-value workflow 轉成可交付的 agent prototype。
- 把既有 workflow 的處理時間、錯誤率、handoff 成本或人工負擔降下來。
- 萃取 workflow know-how，沉澱成 agent skill、runbook、eval dataset、workflow template 或 troubleshooting tree。
- 將產品與客戶實際使用之間的 gap 分類，回饋給產品、平台、文件、onboarding 與 sales enablement。
- 建立 production readiness 標準。
- 建立 eval、logging、audit、human approval、rollback。
- 交付可營運的 runbook 與 handoff。
- 把重複出現的需求整理成產品 roadmap input。

FDE 部門不應負責：

- 無限制客製化。
- 所有客戶的長期維運。
- 為了成交而承諾不可控的 AI 行為。
- 把 demo 包裝成 production。
- 替產品團隊永遠補洞。

### 6.3 Training 與 apprenticeship

FDE 能力不應一開始就設計成大型內部課程或認證。真正困難的能力，例如讀懂客戶組織政治、把場景切到足夠窄、判斷何時該拒絕需求、在不完整資料下推進 deployment，主要是 tacit knowledge，靠 engagement、scenario drill 與 apprenticeship 累積，不是靠 lecture 傳遞。

比較合理的順序是：

1. 先用 1-2 個內部或友好客戶案例跑完完整 engagement。
2. 從真實案例整理 war story、failure taxonomy、good / bad scope example、UAT 反饋與 production gap。
3. 由第一批 squad 帶新人參與下一個案子，透過 shadowing、scenario drill、review session 形成 apprenticeship。
4. 等 playbook 穩定後，再把重複內容整理成內部 training class。

可以提前建立的訓練只限於底層能力，例如 agent 基礎、公司 tooling（ts-agent、aascribe、MCP、KM system）、LLM failure mode、tool calling、eval、logging 與安全治理。這些是 FDE 的地板，不是 FDE 本身。

### 6.4 與平台 / R&D 的關係

「把 pattern 回饋給產品」必須是每個 squad 的 required deliverable，而不是把 finished project 丟給另一個獨立 analyst team 事後分析。pattern 是否可重複、邊界在哪、哪些地方只是運氣或客戶特例，通常在現場決策脈絡裡，不會完整存在交付文件中。

如果要成立獨立小 team，正確定位應該是 platform / tooling team，而不是 pattern-harvesting gatekeeper。它應該負責 productionize 現場驗證過的 reusable connector、agent framework、eval harness、deployment tooling、monitoring 與管理介面；但「什麼值得複製」的第一判斷要來自實際做案子的 squad。

與現有 NIMBL R&D 的關係也要清楚：

- FDE 負責現場 workflow discovery、prototype、pilot、production adoption 與 product gap 分類。
- NIMBL R&D 負責產品 roadmap ownership、核心產品架構與正式產品功能。
- Platform / tooling 支援橫向可複用能力，例如 connector、agent runtime、eval harness、deployment tooling。
- 銜接機制應採 embedded 或 rotation：R&D / platform engineer part-time 進 squad，做完帶著脈絡回到產品團隊，而不是只接收報告。
- 短期內 FDE 產出應直接餵給 NIMBL roadmap；新 team 不應另起一條會和既有 R&D 打架的產品 roadmap。

## 7. 客戶導入流程建議

### Phase 0: Qualification

目的：避免接錯案子。

檢查項目：

- 客戶是否有明確 workflow owner。
- 是否能提供真實案例、文件、資料或 sandbox。
- 是否願意指定一線使用者參與 UAT。
- 是否能接受 human-in-the-loop，而不是要求 agent 完全自動決策。
- 是否有 IT/security 對接窗口。
- 是否願意定義量化 success metric。

輸出：

- 客戶 readiness score。
- 候選 workflows 清單。
- 不建議導入的原因。
- 初步 skill asset 機會：哪些 know-how 值得萃取，哪些不值得。
- 初步 product gap 假設：功能、整合、文件、onboarding、權限、資料或 sales expectation 的可能落差。

### Phase 1: Workflow Discovery

目的：找到第一個足夠窄但有價值的工作流。

活動：

- 訪談主管、一線使用者、IT、合規。
- 收集 20-50 個真實工作樣本。
- 畫出 current-state workflow。
- 標記資料來源、工具、人工判斷、例外、審批、風險。

輸出：

- workflow map。
- agent opportunity brief。
- success metrics。
- scope boundary。
- know-how capture map：判斷規則、例外處理、升級條件、工具使用順序、不可自動化區域。
- product gap classification：product feature gap、integration gap、documentation gap、onboarding gap、permission / data readiness gap、sales expectation gap、reusable module opportunity。

### Phase 2: Prototype / Tracer Bullet

目的：用最小可運行系統驗證是否值得繼續。

內容：

- 接一個真實資料來源或模擬 sandbox。
- 支援一個完整 happy path。
- 至少包含 logging、trace、人工確認與失敗回報。
- 用真實案例做 eval，不只靠 demo script。

輸出：

- 可操作 demo。
- eval 結果。
- 技術風險清單。
- production gap list。
- draft agent skill / runbook / eval case。
- 初版 product gap report：哪些差距應靠產品補、哪些靠導入 playbook、哪些靠客戶資料或權限準備。

### Phase 3: Pilot

目的：讓小範圍真實使用者在受控條件下使用。

內容：

- 接入客戶實際工具或受控 replica。
- 加入權限、audit、approval、rollback。
- 設定 observability dashboard。
- 建立 support channel 與 incident process。

輸出：

- pilot adoption metrics。
- failure taxonomy。
- user feedback。
- go / no-go decision。
- validated skill asset：經真實使用者測過的 skill、runbook、eval 或 workflow template。
- product / platform recommendation：哪些 connector、產品功能、文件或 onboarding 改善值得排入 backlog。

### Phase 4: Production Deployment

目的：變成日常 workflow 的一部分。

內容：

- 安全審查。
- 權限與資料保護。
- SLA / support boundary。
- 操作手冊。
- handoff 給客戶內部 owner 或公司 CS/Support。

輸出：

- production runbook。
- change log。
- monitoring plan。
- post-launch review。
- operator training material。
- reusable asset handoff：skill、eval、runbook、workflow template、failure taxonomy。
- product gap closure plan：已補、待補、轉交 R&D、轉交 platform、轉交 CS / sales enablement 的項目。

### Phase 5: Generalize

目的：把專案經驗變成產品能力與公司 AI 資產。Generalize 不是事後外包給另一個 team 的分析工作，而是由原 squad 對現場驗證過的 pattern 負責整理，再與產品、平台、NIMBL R&D 一起決定 productionize 路徑。

輸出：

- connector backlog。
- reusable agent skills。
- eval templates。
- workflow patterns。
- sales enablement material。
- product roadmap input。
- product gap report。
- skill asset registry update。
- build / prove / generalize retrospective。

## 8. 成功指標

FDE 團隊不應只用「完成幾個 POC」衡量。建議指標：

- 從 discovery 到第一個可操作 prototype 的時間。
- pilot 使用者每週活躍率。
- workflow cycle time 是否下降。
- 人工處理時間是否下降。
- agent 建議被接受率。
- 需要人工修正的比例。
- 高風險錯誤數。
- 從客戶案子萃取出的 reusable patterns 數量。
- 對產品 roadmap 造成的具體改動。
- 續約、擴點、追加 workflow 的轉換率。

## 9. 風險與反模式

### 9.1 只做 demo，不做部署

AI Agent demo 很容易看起來有用，但沒有接權限、資料、稽核、例外處理與失敗回報時，客戶不會真的使用。

### 9.2 FDE 變成廉價客製化外包

如果每個客戶都做一次性程式，部門會吞掉產品債。必須要求每個 engagement 最後輸出 reusable pattern 或明確說明為什麼不可重複。

### 9.3 找太偏業務的人

只會 discovery 和簡報的人，無法在客戶 IT 現場推動部署。這類人可以當 Deployment Lead 或 Workflow Analyst，但每個 squad 必須配真的能 build 的工程人。

### 9.4 找太偏工程的人

只想寫乾淨產品、不願意進客戶現場面對模糊問題的人，也不適合 FDE。FDE 要能接受不完整資料、不完整需求與組織阻力。

### 9.5 缺少安全與治理標準

AI Agent 會讀資料、叫工具、改狀態。沒有明確 permission、audit、approval、rollback，就不應進 production。

## 10. 對公司可採取的初步策略

### 10.1 先建立「FDE playbook」，再招很多人

先用 1-2 個內部或友好客戶案例跑完完整流程。每次都產出：

- workflow map。
- agent spec。
- eval dataset。
- deployment checklist。
- runbook。
- reusable components。

### 10.2 第一批人不要只看履歷 title

更應該用情境測試：

- 給一個客戶工作流，請候選人切第一個 agent use case。
- 給一組 messy documents / email / spreadsheet，請候選人設計資料與工具接法。
- 請候選人說明 agent 何時需要 human approval。
- 請候選人寫一個小型 API integration 或 agent tool。
- 請候選人設計 eval 與 failure handling。

### 10.3 先做窄 workflow

適合第一波：

- 客服工單 triage。
- 報價/採購資料補齊。
- 合約或文件審閱輔助。
- CRM follow-up 自動整理。
- 內部知識檢索加 action recommendation。
- 重複表單與審批流程。

不適合第一波：

- 完全自動財務決策。
- 高風險法律/醫療最終判斷。
- 權限與資料邊界不清楚的跨部門 agent。
- 客戶自己也無法說清楚的宏大轉型案。

## 11. 收費模型建議

### 11.1 定價原則

FDE / AI Agent 導入不適合只用 hourly billing。純時薪會讓客戶覺得買的是人天，而不是 workflow outcome；也會讓公司承擔無止境的 discovery、IT 等待與 scope creep。建議採用：

- 階段固定價。
- 每階段有明確 deliverables 與 acceptance criteria。
- 超出範圍走 change request。
- 模型費、第三方 SaaS、雲端資源、差旅、資安稽核費用另計。
- 生產後支援用 monthly retainer，不包在一次性建置費中。

以下價格以 2026 年公開 AI consulting / implementation benchmarks 校準。公開資料顯示，hands-on AI implementation 常見 hourly range 約 USD 150-500+，更高階或企業級可到 USD 500-1,000+/hr；專案型 AI implementation 常見從 USD 15k-80k、20k-150k+，企業級 production 或 transformation 則可到 USD 100k-500k+。本文用 USD 報價，並以 2026-06-01 附近 USD/TWD 約 1:31.3 粗估新台幣，實際合約應以簽約日匯率重算。

### 11.2 推薦產品化方案

| 方案 | 期間 | 建議價格 | 適合客戶 | 目標 |
| --- | --- | --- | --- | --- |
| AI Workflow Diagnostic | 1-2 週 | USD 12k-25k / 約 NT$38萬-78萬 | 還不確定第一個場景的客戶 | 找出 1-3 個可導入 workflow，決定是否進 prototype |
| Agent Prototype Sprint | 4-6 週 | USD 35k-80k / 約 NT$110萬-250萬 | 有明確 workflow，但還沒驗證可行性 | 做出一個端到端 tracer bullet，驗證技術與使用價值 |
| Controlled Pilot | 8-12 週 | USD 90k-180k / 約 NT$280萬-560萬 | 已有 prototype，願意讓小組真實使用 | 在受控環境跑真實案例、建立治理與 adoption 指標 |
| Production Deployment | 12-16 週 | USD 180k-350k / 約 NT$560萬-1,100萬 | Pilot 成功、準備接正式流程 | 上 production，完成監控、稽核、runbook、handoff |
| Post-Launch Retainer | 每月 | USD 15k-40k / 約 NT$47萬-125萬 | 已上線客戶 | 監控、改善、事故處理、版本更新、追加 workflow discovery |

### 11.3 台灣市場啟動價

如果公司還在建立案例、品牌與 playbook，初期可以用較低的 design partner price，但不要免費做完整導入。建議：

- Diagnostic 不打折或只小幅折扣，因為這階段最容易被客戶當免費顧問使用。
- Prototype 可以給 20-30% 折扣，換取可公開的匿名 case study、推薦語、可重複資料模式或長約優先權。
- Pilot / Production 不建議大幅折扣，因為這會消耗工程與支援容量。

Design partner 條款可以是：

- Prototype: USD 25k-55k / 約 NT$78萬-172萬。
- Pilot: USD 70k-130k / 約 NT$219萬-407萬。
- Production: 依正式報價，不用 design partner 價格。

### 11.4 不建議的收費方式

- 免費 discovery：容易吸引沒有 owner、沒有預算、沒有資料準備的客戶。
- 成果全綁 ROI 分潤：AI 導入受客戶流程、資料品質與採用意願影響太大，初期很難公平歸因。
- 無上限 monthly retainer：會變成客戶內部 IT 外包。
- 只收低額 SaaS 月費：Agent 導入前期服務密度高，太早 SaaS 化會讓毛利失真。

### 11.5 可接受的混合收費

比較健康的商業結構：

- 固定導入費：cover discovery、engineering、deployment。
- 平台 / SaaS 月費：cover agent runtime、connector、monitoring、管理介面。
- Post-launch retainer：cover 客戶專屬支援與持續改善。
- Usage pass-through：模型 token、embedding、vector DB、雲端運算按實際使用轉嫁或加管理費。

## 12. 驗收標準建議

### 12.1 驗收原則

AI Agent 導入的驗收不能只寫「準確率達 95%」或「系統可正常使用」。合理驗收應該綁定：

- 明確 workflow scope。
- 指定資料來源與工具邊界。
- 可重現的測試案例。
- 角色權限與 human approval。
- 日誌、trace、audit 與 rollback。
- 使用者採用與營運指標。
- workflow 效率改善的 baseline 與追蹤方式。
- know-how asset：skill、runbook、eval case、workflow template 或 failure taxonomy。
- product gap report：把現場落差分類成產品、平台、文件、onboarding、客戶資料/權限或 sales expectation 問題。
- 已知限制與 out-of-scope 條款。

驗收應該分成 deliverable acceptance 與 outcome review。前者決定是否付款，後者決定是否進下一階段。不能把客戶內部 adoption、資料品質或 ROI 全部變成供應商單方付款風險。

每個 engagement 都應要求三類產出：

1. Workflow outcome：這個流程是否更快、更穩、更可觀測，或至少建立了可量測 baseline。
2. AI asset outcome：這個案子是否產生可重複使用的 skill、eval、runbook、template 或 failure taxonomy。
3. Product learning outcome：這個案子是否明確回饋產品 gap、platform tooling gap 或導入 playbook gap。

### 12.2 Phase 0 / Diagnostic 驗收

驗收交付物：

- 客戶 readiness scorecard。
- 3-5 個候選 workflows。
- 每個 workflow 的 value、feasibility、risk、data readiness 評分。
- 推薦第一個 prototype workflow。
- 初步 system boundary：資料來源、工具、權限、stakeholders、限制。
- Prototype proposal：範圍、時程、價格、成功指標、客戶依賴項。
- Know-how capture plan：要訪談誰、收集哪些判斷規則、哪些案例可轉成 eval。
- Product gap hypothesis：初步判斷 gap 來自產品功能、整合、文件、onboarding、資料權限或 sales expectation。

驗收標準：

- 至少訪談 3 類 stakeholder：business owner、一線使用者、IT/security 或 data owner。
- 至少收集 10-20 個真實或匿名化工作樣本。
- 每個候選 workflow 都有明確 owner 與 measurable pain。
- 客戶與公司共同確認第一個 prototype scope。
- 至少辨識 1-3 個可萃取 know-how asset 或明確說明為什麼不可萃取。
- 至少形成一版 product gap 假設，供下一階段驗證。
- 如果沒有合適場景，交付 no-go report 也視為完成。

付款建議：

- 100% upfront，或 50% upfront / 50% report delivery。
- 不以客戶是否決定進 prototype 作為付款條件。

### 12.3 Phase 1 / Prototype Sprint 驗收

驗收交付物：

- 一個可操作的端到端 agent prototype。
- Agent spec：goal、inputs、tools、permissions、human approval points、failure modes。
- 測試案例集：至少 30 個案例，含 happy path、edge case、應拒絕處理案例。
- Eval report：task completion、需要人工修正比例、重大錯誤、無法處理原因。
- Trace / logging：每次 agent action 可追蹤到輸入、工具呼叫、輸出與人工確認。
- Production gap list。
- Draft skill asset：agent skill、runbook、eval case、workflow template 或 troubleshooting tree。
- Product gap report v1：標明 gap owner 是 FDE、產品、platform、客戶 IT / data owner、CS / sales enablement 或不建議處理。

驗收標準：

- Prototype 能完成約定的 1 個 workflow happy path。
- 測試案例 task completion 建議達 70% 以上；未達時，需提供原因分類與修正方案。
- 重大安全錯誤為 0：不得越權讀取資料、不得未經核准改寫 production state、不得繞過 human approval。
- 所有工具呼叫都有 log。
- 客戶指定 3-5 位 reviewer 完成 UAT review。
- Draft skill asset 已用 prototype 案例驗證，且列出適用邊界與不可用情境。
- Product gap report 至少包含分類、證據、影響、建議 owner 與下一步。
- 明確標示 prototype 不是 production system。

付款建議：

- 40% kickoff。
- 40% prototype demo / UAT start。
- 20% eval report 與 production gap list 交付。

### 12.4 Phase 2 / Controlled Pilot 驗收

驗收交付物：

- Pilot-ready agent workflow。
- 接入約定的客戶 sandbox、staging 或受控 production replica。
- 權限模型、audit trail、approval queue、rollback 或 manual override。
- Monitoring dashboard 或 weekly pilot report。
- Incident process。
- Pilot retrospective。
- Validated skill asset：經 pilot 案例修正後的 skill、runbook、eval dataset 或 workflow template。
- Product / platform backlog recommendation：哪些項目應進產品 roadmap、platform tooling、文件/onboarding 或 sales enablement。

驗收標準：

- 至少 5-15 位真實使用者參與，或處理 50-200 件真實/匿名化案例。
- 連續 2 週完成 pilot run，不發生 critical incident。
- Critical severity 錯誤為 0；high severity 錯誤有 workaround 與 owner。
- Agent 建議接受率或有效使用率達雙方約定 threshold，建議初期目標 50-70%。
- 目標 workflow 的 cycle time 或人工處理時間有可觀測改善，建議初期目標 15-30%。
- Skill asset 至少被 1 位非原開發者或 operator 依文件操作過。
- Product / platform recommendation 經 FDE、產品或平台 owner review，並標示接受、拒絕或待驗證。
- 客戶完成 go / no-go / iterate decision。

付款建議：

- 30% kickoff。
- 40% pilot go-live。
- 30% retrospective 與 production recommendation 交付。

### 12.5 Phase 3 / Production Deployment 驗收

驗收交付物：

- Production agent workflow。
- Security / access review checklist。
- Versioned prompts、tools、configs、eval dataset。
- Monitoring、alerting、cost tracking。
- Production runbook。
- Admin / operator training。
- Handoff package。
- Post-launch support plan。
- Final skill asset package：versioned skill、eval、runbook、failure taxonomy、操作限制。
- Product gap closure package：已關閉項目、轉入 roadmap 項目、轉入 platform/tooling 項目、留給客戶或 sales/CS 的項目。

驗收標準：

- 客戶指定 production owner、technical owner、business owner。
- 權限、audit、approval、rollback 經客戶確認。
- Production smoke test 通過。
- 連續 2-4 週 stabilization period 內無 unresolved critical incident。
- 已知限制與 fallback procedure 已寫入 runbook。
- 客戶內部 operator 能依 runbook 完成基本操作、停用、回滾與問題回報。
- 上線後 KPI baseline 與追蹤方式已建立；不要要求上線當下就證明完整年度 ROI。
- Final skill asset package 已登錄到公司內部 skill / playbook registry。
- Product gap closure package 已由對應 owner 接收，不得停留在 FDE 報告中無人負責。

付款建議：

- 30% kickoff。
- 30% production readiness signoff。
- 25% production go-live。
- 15% stabilization period 完成。

### 12.6 Post-Launch Retainer 驗收

月費服務內容：

- 每週或雙週 health review。
- Incident triage。
- Prompt / tool / eval 小幅調整。
- 使用率與錯誤分析。
- 新 workflow discovery backlog。
- 版本升級與 release notes。
- Skill / runbook 小幅更新與版本紀錄。
- Product gap follow-up：追蹤已轉交 roadmap、platform、文件/onboarding、CS / sales enablement 的項目狀態。

月度驗收標準：

- 交付 monthly operation report。
- 回覆 SLA 達成。
- Critical incident 有 postmortem。
- 重要變更有 changelog。
- 下月 improvement backlog 已排序。
- Skill / runbook 變更有版本紀錄與影響說明。
- Product gap follow-up 有 owner、狀態與下一步。

不應包含：

- 新 workflow 的完整導入。
- 大型 connector 開發。
- 客戶內部流程大改。
- 24/7 on-call，除非另簽企業支援合約。

## 13. 合約邊界與客戶依賴項

### 13.1 客戶必須提供

- Business owner。
- Workflow owner。
- IT/security/data owner。
- 可用資料樣本或 sandbox。
- 測試使用者。
- UAT 回饋時程。
- 系統 access 與必要 API 文件。

如果客戶延遲提供依賴項，交期應順延，且不影響已完成 milestone 的付款。

### 13.2 Change Request 觸發條件

以下應視為超出範圍：

- 新增原本未列入的 workflow。
- 新增大型第三方系統整合。
- 從 sandbox 改成 production integration。
- 客戶資料結構或 API 權限與 discovery 結論大幅不同。
- 合規、資安、法務要求新增大量控制項。
- 客戶要求 agent 做原本列為 out-of-scope 的自動決策。

### 13.3 IP 與 reusable components

建議原則：

- 客戶資料、客戶專屬流程文件、客戶專屬設定歸客戶。
- 公司保留 generic connector、agent framework、eval harness、deployment tooling、playbook、匿名化 pattern 的再利用權。
- 客戶若要求專屬買斷 reusable platform component，需另行報價。

### 13.4 風險承諾邊界

合約文字應避免承諾：

- Agent 永不出錯。
- 一定達成指定 ROI。
- 可完全取代人員。
- 可在未取得系統權限或資料的情況下完成 production。

可以承諾：

- 明確階段交付物。
- 可重現測試案例。
- 已知限制揭露。
- 安全與 audit 控制。
- 問題修正流程。
- 使用與成效指標追蹤。

## 14. 建議文件與交付物模板

詳細流程、phase gate、驗收標準與產出文件清單請見：

- `study/fde-team/fde-engagement-playbook.md`
- `study/fde-team/ceo-business-model-and-nimbl-future.md`

未來可以在 repo 補以下模板：

- `docs/research/templates/fde-customer-readiness-scorecard.md`
- `docs/research/templates/fde-workflow-discovery-brief.md`
- `docs/research/templates/fde-agent-spec.md`
- `docs/research/templates/fde-production-readiness-checklist.md`
- `docs/research/templates/fde-pilot-retrospective.md`
- `docs/research/templates/fde-commercial-proposal.md`
- `docs/research/templates/fde-acceptance-criteria.md`
- `docs/research/templates/fde-know-how-capture-map.md`
- `docs/research/templates/fde-agent-skill-asset.md`
- `docs/research/templates/fde-product-gap-report.md`
- `docs/research/templates/fde-build-prove-generalize-retrospective.md`

## 15. 來源筆記

| 來源 | 重點 |
| --- | --- |
| OpenAI Deployment Company announcement, 2026-05-11 | OpenAI 把 FDE 定位為嵌入客戶組織、重設 workflow、把 AI 變成 durable systems；典型 engagement 從 diagnostic 到 priority workflow，再到設計、測試、生產部署。 |
| OpenAI Deploy page | FDE 是把 AI 帶進 complex real-world use cases 的方法；從 specific problem 開始，validate impact，再找 scalable patterns；循環是 build, prove, generalize。 |
| OpenAI FDE career page | FDE 負責 discovery、technical scoping、system design、build、production rollout；成功以 production adoption、workflow impact、eval-driven feedback 衡量。 |
| Anthropic Forward Deployed Engineer, Applied AI job | FDE 直接嵌入 strategic customers，建立 production applications、MCP servers、sub-agents、agent skills，並整理 repeatable deployment patterns 回饋產品工程。 |
| Palantir careers / UK careers | Palantir 將 FDSE 放在 Business Development org，但 mandate 是 technical and operational outcomes；Delta 直接與客戶合作理解問題並實作解法。 |
| Palantir AI FDE announcements | Palantir 也把「AI FDE」產品化成能在 Foundry 內用自然語言操作平台、建資料轉換、ontology、functions 的 agent，並強調 permission、visibility、sandbox testing。 |
| a16z, Trading Margin for Moat | a16z 把 FDE 視為 AI 應用公司用服務換 moat 的模式：在複雜 AI 應用中，差異化常來自如何在不同客戶情境落地。 |
| Threecus AI Consulting Rates, 2026 | AI consulting benchmarks：generalist advisory USD 200-500/hr、specialist USD 350-800/hr、project-based USD 15k-80k、enterprise transformation USD 100k+。 |
| AIDOLS AI Consulting Cost Guide, 2026 | 依 firm tier 拆解 AI consulting hourly：independent / boutique / mid-tier / Big Four / MBB 約 USD 150-1,000+/hr；90-day fixed-fee engagements 可到 USD 75k-250k。 |
| GroovyWeb AI Consulting Rates, 2026 | 公開整理 AI consulting rates，指出 Big 4、boutique、AI-first agency 之間價格差距大，適合用來校準低中高價位。 |
| Nic Chin AI Implementation Cost Guide, 2026 | 以實作經驗拆 AI implementation cost，指出 focused pilot 可從 USD 5k 起，常見 production-ish 專案多在 USD 8k-80k，但企業級可高很多。 |
| Currency.me.uk USD/TWD, 2026-06-01 | 匯率參考：2026-06-01 附近 1 USD 約 31.346 TWD；本文 TWD 僅為粗估，合約仍需用簽約日匯率。 |

## 16. 參考連結

- OpenAI: OpenAI launches the OpenAI Deployment Company to help businesses build around intelligence  
  https://openai.com/index/openai-launches-the-deployment-company/
- OpenAI: The OpenAI Deployment Company / Forward deployed engineering at OpenAI  
  https://openai.com/business/the-openai-deployment-company/
- OpenAI Careers: Forward Deployed Engineer (FDE) - SF  
  https://openai.com/careers/forward-deployed-engineer-%28fde%29-sf-san-francisco/
- Anthropic Careers: Forward Deployed Engineer, Applied AI  
  https://www.anthropic.com/careers/jobs/4985877008
- Palantir Careers: Students and Early Talent  
  https://www.palantir.com/careers/students-and-early-talent/
- Palantir UK Careers  
  https://www.palantir.com/uk/careers/
- Palantir Foundry Announcements: AI FDE generally available, 2026-03-12  
  https://www.palantir.com/docs/foundry/announcements/2026-03
- Palantir Foundry Announcements: Introducing AI forward deployed engineer, 2025-11-18  
  https://www.palantir.com/docs/foundry/announcements/2025-11
- a16z: Trading Margin for Moat: Why the Forward Deployed Engineer Is the Hottest Job in Startups  
  https://a16z.com/services-led-growth/
- Threecus: AI Consulting Rates: What to Charge in 2026  
  https://www.threecus.com/blog/ai-consulting-rates-pricing
- AIDOLS: AI Consulting Costs 2026  
  https://aidolsgroup.com/en/blog/category/research-report/ai-consulting-cost-guide/
- GroovyWeb: AI Consulting Rates 2026  
  https://www.groovyweb.co/blog/ai-consulting-rates-2026
- Nic Chin: How Much Does AI Implementation Cost? The 2026 Pricing Guide  
  https://nicchin.com/blog/ai-consulting-cost-guide
- Currency.me.uk: USD to TWD exchange rate, 2026-06-01  
  https://www.currency.me.uk/convert/usd/twd
