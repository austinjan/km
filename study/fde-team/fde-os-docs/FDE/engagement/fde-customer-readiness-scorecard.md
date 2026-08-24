# FDE Customer Readiness Scorecard

> 用途:Phase 0 Qualification 的評分依據。把質性訪談結果轉成可機械對照的分數,讓 gate 決策不靠感覺。
> 用法:先跑 **Section A kill-switch**(任一 ✔ = 直接 No-go,不必評分);全部清空後,再評 **Section B 七個維度**(各 0–2 分),最後用 **Section C 對照表**判 Go / Iterate / No-go。

---

## Section A — Hard-blocker Kill Switch（D8）

任一項勾選即 **No-go**,無視 Section B 分數。出 `fde-no-go-report.md` 記錄。

- [ ] 禁止任何外部 LLM 呼叫,且無可用的內網/本地模型替代
- [ ] 禁止 agent 對 production device 寫入,而本案核心價值正依賴寫入動作
- [ ] Data residency / 落地限制使所需資料無法進入可用環境
- [ ] 稽核 / 合規要求在本案時程內無法滿足
- [ ] 其他無法繞過的結構性禁制:______________________

---

## Section B — Scored Dimensions（D1–D7，各 0–2 分）

評分定義:**0 = 缺失/阻塞｜1 = 部分/待補｜2 = 紮實/可進場**

| 維度 | 0 分 | 1 分 | 2 分 | 得分 |
|---|---|---|---|---|
| **D1 Business owner** | 找不到真正承擔成敗者,只有代表 | 有人選但承諾/權責未確認 | 明確、已承諾、會被問責 | ☐ |
| **D2 Workflow owner** | 無人實際擁有此流程 | 有但未深度訪談/痛點模糊 | 已訪談,痛點與現況清楚 | ☐ |
| **D3 IT/sec/data owner + access path** | 把關者不明或拒絕對話 | 已接觸,access path 未通 | 已接觸且 access path 可行、時程已排 | ☐ |
| **D4 樣本 / sandbox 可得性** | 拿不到任何真實樣本 | 有零星樣本,持續供應未確認 | ≥3–5 代表性樣本且可持續供應,sandbox 時程已定 | ☐ |
| **D5 UAT 使用者** | 無一線使用者 | 有名單,無時間承諾 | 3–5 位點名且取得時數承諾 | ☐ |
| **D6 HITL 接受度** | 要求一開始 autonomous / 拒絕 approval | 僅接受 read-only | 接受 ≥ advisory（含 human-confirmed action） | ☐ |
| **D7 Success metric** | 無 metric | 只有名稱,缺 baseline/target | baseline + target + 量測方式齊備 | ☐ |
| | | | **小計（滿分 14）** | **___** |

---

## Section C — Score-to-Gate 對照

先確認 Section A 全清空,再用小計判讀:

| 條件 | 判定 |
|---|---|
| Section A 任一勾選 | **No-go** |
| 任一 D1/D2/D4/D5 = 0,或 D6 = 0 | **No-go**（缺 owner/資料/使用者,或拒絕 HITL） |
| 所有維度 ≥ 1,且小計 ≥ 11,且無維度 = 0 | **Go** |
| 其餘（有價值但有缺口） | **Iterate** |

> 註:D8 已在 Section A 處理；D9（可複用價值）不入此表,另記於 `fde-know-how-capture-candidates.md` 與 `fde-product-gap-hypothesis.md`,作為 Go 案子之間的**排程優先級**依據。

---

## Section D — 決策紀錄

- 評估人 / 決策者：______________________
- 評估日期：______________________
- Qualification 投入：______ 人日（time-box ≤ 2 週 / ≤ X 人日）
- 小計：______ / 14
- **判定**：☐ Go ☐ Iterate ☐ No-go
- 若 Iterate,缺口與回檢時點：______________________
- 若 No-go,連結 `fde-no-go-report.md`：______________________
