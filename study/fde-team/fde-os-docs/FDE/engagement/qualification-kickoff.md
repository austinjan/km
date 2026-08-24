# FDE Engagement Kickoff — 對齊檢查清單與說明

> 用途:在任何 FDE engagement 真正動工(進 sandbox、寫第一個 agent、跑第一個 demo)之前,先把這份清單走完。
> 核心精神 : **進場前先把「人、料、權、靶」對齊;進場後持續採集「能複用的 know-how」與「產品該補的洞」。**
> 把「技術上做得出來」轉成「客戶真的會用、且看得到價值」,靠的就是這份前置功課。

---

## Part 1 — 進場前的對齊閘門(Alignment Gates)

這五項是 **gate**。任一項沒確認,後面 deployment 很容易卡死、或交付了卻沒人用。每一項都附上「為什麼」與「沒做到的後果」。

### 1. 確認三個 owner:business / workflow / IT-security-data

這三個角色經常被混為一談,實際上常是三個不同的人、三種不同的阻塞點。用一句 RACI 釐清:

- **Business owner(真正出錢、承擔成敗的人)**
  重點在 *real*——不是派來開會的代表,而是專案失敗時被問責、成功時拿 credit 的人。
  *沒做到的後果:* 專案沒有政治靠山,資源一抽就死。

- **Workflow owner(每天真的在跑這個流程的人)**
  最了解痛點的 operator 或現場主管。business owner 在高層,workflow owner 才知道現場怎麼運作、卡在哪。
  *沒做到的後果:* 做出來的東西不貼合真實流程,operator 不買單。

- **IT / security / data owner(把關者)**
  在 OT / 網管環境(NIMBL 場景)特別致命——agent 要 SSH 進設備、存取拓樸資料、跨 VLAN,這些人不點頭你連 PoC 環境都進不去。
  *做法:* 提早找到他們,把 data access 與 security review 變成**並行**而非阻塞。

### 2. 確認可提供真實案例、文件、資料樣本或 sandbox

AI agent 要 demo、要訓練、要驗證,需要真實的輸入輸出(真實設備 log、真實告警、真實處理流程),以及一個能動手的 sandbox 環境。

- *沒做到的後果:* 只能做空殼 demo,無法證明在客戶真實情境下有效;之後要資料時才發現流程要走三個月審批。
- *判準:* 至少拿到一組「真實 input → 期望 output」的範例,且 sandbox 的取得時程已排定。

### 3. 確認 3–5 位一線 reviewer / UAT 使用者

要先**點名具體的人**並取得他們的**時間承諾**,而不只是「之後找人試用」。

- *沒做到的後果:* 功能做完卻卡在「沒人有空驗收」,專案懸空。
- *判準:* 名單(姓名+角色)+ 每人可投入的大致時數已確認。

### 4. 確認客戶接受 human-in-the-loop,不要求 agent 一開始就完全自動決策

先談清楚:哪些動作 agent 可自動執行、哪些必須人工 approval 才能下手、客戶能接受什麼程度的自動化。這條線**直接決定架構設計**(human-in-the-loop 的插入點)。

- *沒做到的後果:* 客戶期待「全自動」但資安/責任界線不允許,或反之你做了全自動但客戶不敢上線。
- *判準:* 自動 / 需審核 的動作分類已書面對齊;第一階段預設 agent 提建議、人按確認。

### 5. 確認至少一個可量測的 success metric

例如 cycle time、人工處理時間、錯誤率、接受率、升級率。一開始就把數字釘死,deployment 才有靶心,也才有後續 expand 的籌碼。

- *沒做到的後果:* 「功能做完」不等於「帶來價值」,驗收時各說各話,無法證明 ROI。
- *判準(關鍵):* 不能只寫名稱,要有 **baseline(現況數字)+ target(目標數字)+ 量測方式**。
  例:「告警處理時間從現況 12 分鐘 → 目標 4 分鐘,以工單系統時間戳量測。」



## 速查 Checklist(kickoff 會議直接勾)

** 進場前對齊(全部要 ✅ 才動工)**

- [ ] Business owner 已確認(真正承擔成敗的人,非代表)
- [ ] Workflow owner 已確認(每天跑流程的 operator/主管)
- [ ] IT / security / data owner 已確認,data access + security review 已並行啟動
- [ ] 已取得真實案例 / 文件 / 資料樣本(至少一組 input→output)
- [ ] Sandbox 環境取得時程已排定
- [ ] 3–5 位一線 reviewer / UAT 名單已點名,且時間承諾已取得
- [ ] Human-in-the-loop 界線已書面對齊(自動 vs 需審核動作分類)
- [ ] 第一階段預設「agent 提建議、人確認」已被客戶接受
- [ ] Success metric 已釘死:baseline + target + 量測方式
