# Sales Assistant POC — Design Spec

Date: 2026-07-07
Status: Approved (design), pending spec review

## 1. Purpose

A teaching-oriented Sales Assistant POC that helps a **front-line sales rep**:

1. Answer customer questions about product **spec and functions**.
2. Explain **differences vs competitors**.
3. **Simulate customer scenarios** for practice/prep.

It is backed by a **product knowledge base (KB) built as a harness folder**. The
project is a follow-able class exercise that also maps cleanly to the "harness
五要素" taught in `build-a-useful-poc.md`, and adds the feedback element
(gold set + eval) that the raw harness list was missing.

## 2. Key decisions (locked)

- **Dual-mode in a single folder (Option A).** One folder serves both the class
  (fake data, committed, publish-safe) and real use (read-only Gmail/GitHub,
  outputs git-ignored). No separate repo-root tool folder.
- **Add the 5th element — feedback.** `samples/gold-set.md` + `outputs/eval-report.md`
  + the `review-km` skill measure whether answers are correct.
- **Three language versions** of the teaching doc: `.md`, `.en.md`, `.zh.md`.
- **Location:** everything under `training/class/poc-workshop/sales-assistant/`;
  teaching docs alongside in `training/class/poc-workshop/`.
- **Remove** the existing `email-assistant/` sample.

## 3. Harness 五要素 mapping (the required review)

| 要素 | 對應 | 說明 |
| --- | --- | --- |
| **instructions** | `AGENTS.md`, `CLAUDE.md`, each `skills/*/SKILL.md`, `docs/workflow-rules.md` | 工作規則；含「先讀大架構(STRUCTS)再讀細節」與「找不到好答案 → 禮貌業務口吻帶回公司」 |
| **tools** | 本機讀寫檔（教學）；real-mode 加 read-only Gmail/GitHub | 只讀不寫外部服務 |
| **environment** | `knowledge-base/` + `STRUCTS.md` + `samples/` + `docs/scope.md` | STRUCTS 讓 agent 快速定位相關檔案 |
| **state** | `PROGRESS.md`, `docs/ingest-log.md` | 過往更新、進度、ingest 稽核 |
| **feedback** | `samples/gold-set.md` + `outputs/eval-report.md` + `skills/review-km` | 量測回答準確率 + 持續審核 KB 架構與涵蓋度 |

Conclusion: 原列 harness (PROGRESS / AGENTS / CLAUDE / STRUCTS / skills) =
instructions + environment + state。補上 gold-set + eval 後才完整符合五要素。

## 4. Knowledge base structure (described by `STRUCTS.md`)

```text
knowledge-base/
  functions/     產品功能描述
  specs/         規格
  competitors/   競品比較
  orders/        成交/訂單歷史 (from mail or user input)
  qa/            常見問答 (from mail or user input)
  roadmap/       產品藍圖 (缺則上網研究產業動向生成合理建議)
  tips/          資深業務 / 公司成交注意事項與建議
```

## 5. Skills (front-line-sales persona)

| skill | 用途 | 關鍵設計 |
| --- | --- | --- |
| `answer` | 檢索 KB 回答業務的問題/需求（規格、競品差異、情境模擬） | 先讀 STRUCTS → 相關子目錄細節；找不到好答案時，用禮貌業務口吻說「需帶回公司確認」，不捏造 |
| `input-doc` | 業務輸入產品資料/Q&A，自動歸檔到正確 KB 子目錄 | 判斷主題→歸檔→更新 STRUCTS |
| `review-km` | 審核 KB 架構與涵蓋度，取得同意後修正 / 要求補料 / 上網更新競品 | 產出缺口清單，先徵求同意才改 |
| `ingest` | 從 email / github 更新產品資料 | 教學版讀假匯出檔；real-mode read-only |

## 6. File inventory (what gets created)

```text
training/class/poc-workshop/sales-assistant/
  README.md                 what it is, how to run, safety, teaching note
  AGENTS.md                 persona, read-STRUCTS-first, deferral rule, safety
  CLAUDE.md                 pointer to AGENTS.md + key run prompts
  STRUCTS.md                KB directory map for fast locating
  PROGRESS.md               history & progress
  feature_list.json         assistant functions + done_when (measured vs gold set)
  .gitignore                ignore real-mode outputs / ingested real data
  knowledge-base/
    functions/  specs/  competitors/  orders/  qa/  roadmap/  tips/   (fake seed content)
  samples/
    sample-mail.md          fake product-related emails for ingest demo
    gold-set.md             standard Q&A pairs (expected answers) — never edit
  outputs/
    answers-log.md          answered questions (teaching artifact)
    eval-report.md          answer accuracy vs gold set
  docs/
    scope.md                scope & safety boundary
    workflow-rules.md       answering rules, deferral tone, competitor handling
    review-checklist.md     human review checklist
    ingest-log.md           audit of each ingest run
    real-mode.md            how to point ingest at real read-only Gmail/GitHub
  skills/
    answer/SKILL.md
    input-doc/SKILL.md
    review-km/SKILL.md
    ingest/SKILL.md

training/class/poc-workshop/
  build-a-sales-assistant.md      (main, no language suffix)
  build-a-sales-assistant.en.md
  build-a-sales-assistant.zh.md
```

To remove: `email-assistant/` (README.md, AGENTS.md, triage-rules.md, run-prompt.md, .gitignore).

## 7. Teaching doc outline (`build-a-sales-assistant.*`)

Mirrors the pedagogy of `build-a-useful-poc.md`, adapted to sales:

1. 目的與「有用的 sales assistant」的定義。
2. 五要素複習 + 本專案對照表(section 3 above).
2b. **Knowledge Base 設計細節 (why & how)**：為何純 markdown+分主題目錄、為何這七個子目錄、STRUCTS 如何運作、一則好 KB 檔案長怎樣 (good vs bad)、如何隨規模成長。
3. 骨架結構與安全邊界 (fake data; real-mode is opt-in, read-only).
4. Main flow, step-by-step & follow-able:
   1. Init harness (含 STRUCTS + gold set).
   2. Seed KB (input-doc) — 歸檔假產品資料。
   3. Make it work (answer) — 回答一組客戶問題，產出 answers-log。
   4. Measure (eval) — 對照 gold-set 算回答準確率。
   5. Review KM (review-km) — 找架構/涵蓋缺口，修正。
   6. Ingest — 從假 mail/github 更新 KB。
   7. Bridge to real-mode + handoff (PROGRESS).
5. 每個 skill 一小節，含三塊：用途 + **How to design it (設計要點)** + **How to verify it (驗收方式)** + starter prompt + 範例輸出。
6. Definition of "useful enough", common failure modes, exit ticket, 講師檢查清單.

## 8. Safety boundary

- Class default = fake product data only; no external services.
- real-mode = **read-only** Gmail/GitHub ingest; never send/modify; ingested real
  data and real answers land under git-ignored paths.
- `answer` never fabricates: if KB lacks a confident answer, it produces a polite
  sales-tone deferral ("let me confirm this with the team and get back to you")
  and flags the gap for `review-km`.
- Competitor claims must cite a KB source; unverified competitor info is flagged,
  not asserted.

## 9. Out of scope (YAGNI)

- No live send / CRM write-back.
- No vector DB / embeddings — plain markdown KB navigated via STRUCTS.
- No automated web scraping pipeline; roadmap/competitor web research is an
  agent step done with user in the loop, not a background job.
