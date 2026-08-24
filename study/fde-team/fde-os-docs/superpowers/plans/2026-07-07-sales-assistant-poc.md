# Sales Assistant POC Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a teaching-oriented, dual-mode Sales Assistant POC harness (fake-data class exercise + opt-in read-only real mode) under `training/class/poc-workshop/sales-assistant/`, plus a 3-language teaching doc, replacing the removed `email-assistant/` sample.

**Architecture:** A plain-markdown knowledge base navigated via `STRUCTS.md`, four skills (`answer`, `input-doc`, `review-km`, `ingest`), harness instruction/state files, and the 5th "feedback" element (`gold-set.md` + `eval-report.md`). No code, no build step — this is a content/scaffold deliverable. Verification is done with `ls`/`grep` checks, not unit tests.

**Tech Stack:** Markdown, JSON (`feature_list.json`), Claude Code skill format (`SKILL.md` with `name`/`description` frontmatter, following the existing `skills/fde-engagement/SKILL.md` pattern).

## Global Constraints

- Base directory for the POC: `training/class/poc-workshop/sales-assistant/` (exact).
- Teaching docs live in `training/class/poc-workshop/` as `build-a-sales-assistant.md`, `.en.md`, `.zh.md`.
- `build-a-sales-assistant.md` content == `.zh.md` content (Chinese is canonical main; mirrors existing `build-a-useful-poc.md` == `build-a-useful-poc.zh.md`).
- Persona for all skills and rules: **front-line sales rep** (前端業務).
- Deferral rule, verbatim intent: when the KB lacks a confident answer, the assistant must NOT fabricate — it produces a polite sales-tone deferral (e.g. "這部分我跟公司確認後盡快回覆您") and flags the gap for `review-km`.
- Class default = fake product data only, no external services. real-mode = **read-only** Gmail/GitHub, never send/modify, real data under git-ignored paths.
- `SKILL.md` frontmatter format: `---\nname: <kebab>\ndescription: <one line>\n---` (match `skills/fde-engagement/SKILL.md`).
- KB subfolders (exact set): `functions/ specs/ competitors/ orders/ qa/ roadmap/ tips/`.
- Do not connect to real services while building. Fake data only in committed files.

---

### Task 1: Remove email-assistant sample and scaffold directories

**Files:**
- Delete: `email-assistant/` (README.md, AGENTS.md, triage-rules.md, run-prompt.md, .gitignore)
- Create (empty dirs via `.gitkeep` where needed): the full `sales-assistant/` tree

**Interfaces:**
- Produces: the directory skeleton every later task writes into.

- [ ] **Step 1: Remove the old sample**

```bash
git rm -r email-assistant
```

- [ ] **Step 2: Create the directory tree**

```bash
cd training/class/poc-workshop
mkdir -p sales-assistant/knowledge-base/{functions,specs,competitors,orders,qa,roadmap,tips}
mkdir -p sales-assistant/samples sales-assistant/outputs sales-assistant/docs
mkdir -p sales-assistant/skills/{answer,input-doc,review-km,ingest}
```

- [ ] **Step 3: Verify tree exists**

Run: `find training/class/poc-workshop/sales-assistant -type d | sort`
Expected: 15 directories listed (root + knowledge-base + 7 kb subdirs + samples + outputs + docs + skills + 4 skill dirs).

- [ ] **Step 4: Verify old sample gone**

Run: `ls email-assistant 2>&1`
Expected: "No such file or directory".

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "Remove email-assistant sample; scaffold sales-assistant tree"
```

---

### Task 2: Instruction files (instructions 要素)

**Files:**
- Create: `sales-assistant/AGENTS.md`
- Create: `sales-assistant/CLAUDE.md`
- Create: `sales-assistant/docs/scope.md`
- Create: `sales-assistant/docs/workflow-rules.md`

**Interfaces:**
- Consumes: directory tree from Task 1.
- Produces: the instruction layer every skill references (`先讀 STRUCTS`, deferral rule, safety rules).

- [ ] **Step 1: Write `AGENTS.md`**

Required sections & content:
- `# Agent Instructions — Sales Assistant` heading.
- `## Project`: 教學導向 sales assistant POC，協助前端業務回答規格/功能、競品差異、模擬情境。KB = 本機 markdown harness。Owner 是非工程業務。
- `## Important Files`: bullet list pointing to `PROGRESS.md`, `STRUCTS.md`, `feature_list.json`, `knowledge-base/`, `samples/gold-set.md` (never edit), `outputs/eval-report.md`, `docs/workflow-rules.md`, `docs/scope.md`, `docs/ingest-log.md`, `docs/real-mode.md`, and the four skills.
- `## How to answer` rule (verbatim key line): "回答任何問題前，先讀 `STRUCTS.md` 了解 KB 大架構，再進相關子目錄讀細節；不要一開始就翻遍所有檔案。"
- `## Deferral rule` (verbatim): "若 KB 沒有足夠、可信的資料回答，不要捏造。用禮貌的業務口吻說明需要帶回公司確認（例：『這部分我跟公司確認後盡快回覆您』），並把缺口記到 `outputs/eval-report.md` / 交給 review-km。"
- `## Competitor rule`: 競品說法必須引用 `knowledge-base/competitors/` 來源；未驗證資訊要標記為未驗證，不得斷言。
- `## Safety rules`: 課堂只用假資料、不連外部服務；real-mode 只讀 Gmail/GitHub、絕不寄送或修改；`samples/gold-set.md` 永不編輯；真實資料只落在 git-ignore 路徑。
- `## Definition of done`: 回答有引用 KB 來源或明確 deferral；無捏造；eval 對照 gold-set 達門檻。

- [ ] **Step 2: Write `CLAUDE.md`**

Content: short pointer file. `# Claude Code — Sales Assistant` heading; one line "所有工作規則見 `AGENTS.md`。"; a `## Key run prompts` section listing the four skill invocations (seed KB via input-doc, answer questions, measure via eval, review-km, ingest) as copy-paste starter prompts (2-4 lines each).

- [ ] **Step 3: Write `docs/scope.md`**

Content: `# Scope & Safety`. In-scope (回答規格/功能/競品/情境模擬 from KB; 歸檔資料; 審核 KB; 從假 mail/github ingest). Out-of-scope (即時寄送/CRM 寫回; vector DB/embeddings; 自動爬蟲). Safety boundary bullets (same as AGENTS safety). real-mode = opt-in, read-only.

- [ ] **Step 4: Write `docs/workflow-rules.md`**

Content: `# Workflow Rules`. Sections: 回答流程 (STRUCTS → 子目錄 → 引用來源 → 無把握則 deferral); deferral 口吻範例 (2-3 polite lines); 競品處理 (引用 competitors/ 來源，未驗證標記); 情境模擬做法 (用 qa/ + tips/ 組出對話); 歸檔規則 (主題→對應 KB 子目錄); 不捏造 (缺資訊標 missing_info).

- [ ] **Step 5: Verify key rules present**

Run: `grep -l "STRUCTS" training/class/poc-workshop/sales-assistant/AGENTS.md && grep -c "確認後" training/class/poc-workshop/sales-assistant/AGENTS.md`
Expected: AGENTS.md path printed, and deferral phrase count >= 1.

Run: `for f in AGENTS.md CLAUDE.md docs/scope.md docs/workflow-rules.md; do test -s training/class/poc-workshop/sales-assistant/$f && echo "OK $f"; done`
Expected: four `OK` lines.

- [ ] **Step 6: Commit**

```bash
git add training/class/poc-workshop/sales-assistant && git commit -m "Add sales-assistant instruction layer (AGENTS, CLAUDE, scope, workflow-rules)"
```

---

### Task 3: STRUCTS.md + knowledge-base seed content (environment 要素)

**Files:**
- Create: `sales-assistant/STRUCTS.md`
- Create: one fake `.md` in each of the 7 KB subfolders:
  - `knowledge-base/functions/product-overview.md`
  - `knowledge-base/specs/spec-sheet.md`
  - `knowledge-base/competitors/competitor-compare.md`
  - `knowledge-base/orders/order-history.md`
  - `knowledge-base/qa/common-qa.md`
  - `knowledge-base/roadmap/roadmap.md`
  - `knowledge-base/tips/deal-tips.md`

**Interfaces:**
- Consumes: tree from Task 1.
- Produces: the KB that `answer`/`gold-set` reference. Use ONE consistent fake product so gold-set answers are checkable. **Fake product:** "Acme FlowHub" — a fictional workflow-automation SaaS. Use it in every KB file.

- [ ] **Step 1: Write the 7 KB seed files (fake "Acme FlowHub")**

Each file short (~10-25 lines), realistic-looking but clearly fake:
- `functions/product-overview.md`: 3-4 core functions (visual workflow builder, connectors, scheduling, audit log) each with 1-line description.
- `specs/spec-sheet.md`: a small spec table (max workflows, connectors count, SLA uptime %, data residency, API rate limit).
- `competitors/competitor-compare.md`: table comparing FlowHub vs two fake competitors ("Zapflow", "Nodely") on 3-4 dimensions; each row cites nothing external (internal fake data).
- `orders/order-history.md`: 3 fake order rows (customer, plan, seats, close date, notes).
- `qa/common-qa.md`: 4-5 fake Q&A pairs (pricing model, on-prem option, migration effort, security certs).
- `roadmap/roadmap.md`: 3 quarters of fake roadmap items + a note "若無資料，agent 可上網研究產業動向生成合理建議 (real-mode)".
- `tips/deal-tips.md`: 3-4 senior-sales deal tips (when to involve SE, common objection + rebuttal, discount authority note).

- [ ] **Step 2: Write `STRUCTS.md`**

Content: `# Knowledge Base Structure`. Intro line: STRUCTS 的目的是讓 agent 快速定位相關檔案，回答前先讀這裡。Then a table with columns `目錄 | 主題 | 檔案`:

```markdown
| 目錄 | 主題 | 主要檔案 |
| --- | --- | --- |
| knowledge-base/functions/ | 產品功能描述 | product-overview.md |
| knowledge-base/specs/ | 規格 | spec-sheet.md |
| knowledge-base/competitors/ | 競品比較 | competitor-compare.md |
| knowledge-base/orders/ | 成交/訂單歷史 | order-history.md |
| knowledge-base/qa/ | 常見問答 | common-qa.md |
| knowledge-base/roadmap/ | 產品藍圖 | roadmap.md |
| knowledge-base/tips/ | 成交注意事項 | deal-tips.md |
```
End with a note: input-doc / ingest 新增檔案後，必須更新這張表。

- [ ] **Step 3: Verify KB populated and STRUCTS references every subdir**

Run: `find training/class/poc-workshop/sales-assistant/knowledge-base -name '*.md' | wc -l`
Expected: 7.

Run: `for d in functions specs competitors orders qa roadmap tips; do grep -q "$d/" training/class/poc-workshop/sales-assistant/STRUCTS.md && echo "OK $d" || echo "MISSING $d"; done`
Expected: seven `OK` lines, no `MISSING`.

- [ ] **Step 4: Commit**

```bash
git add training/class/poc-workshop/sales-assistant && git commit -m "Add STRUCTS map and fake Acme FlowHub knowledge base seed content"
```

---

### Task 4: samples — gold-set + sample-mail (feedback 要素, input side)

**Files:**
- Create: `sales-assistant/samples/gold-set.md`
- Create: `sales-assistant/samples/sample-mail.md`

**Interfaces:**
- Consumes: the fake "Acme FlowHub" KB from Task 3 (gold-set answers must be derivable from it, OR intentionally NOT derivable to test the deferral rule).
- Produces: the standard Q&A the `answer` skill is measured against, and fake mail for the `ingest` demo.

- [ ] **Step 1: Write `samples/gold-set.md`**

Header note: "These are the expected answers. Human-defined. The assistant must NEVER edit this file." Then a table of 5 questions covering the assistant's 3 jobs:

```markdown
| id | question | expected_answer_summary | source_in_kb | expected_behavior |
| --- | --- | --- | --- | --- |
| 1 | FlowHub 支援幾個 connector? | 引用 spec-sheet 的 connector 數 | specs/spec-sheet.md | answer_from_kb |
| 2 | FlowHub 跟 Zapflow 差在哪? | 引用 competitor-compare 的差異 | competitors/competitor-compare.md | answer_from_kb |
| 3 | 客戶問能不能地端部署? | 引用 common-qa 的 on-prem 答案 | qa/common-qa.md | answer_from_kb |
| 4 | 模擬客戶擔心遷移成本的情境 | 用 qa 遷移 + tips 反對處理組出對話 | qa/ + tips/ | scenario_sim |
| 5 | FlowHub 2027 有支援 X 產業法規嗎? | KB 無資料 | (none) | polite_deferral |
```
Row 5 MUST be a question the KB cannot answer, so eval can verify the deferral rule fires.

- [ ] **Step 2: Write `samples/sample-mail.md`**

Content: 2-3 fake product-related emails (clearly fake), e.g. a customer asking about a new connector, a support thread revealing a spec detail, an internal note about a closed deal. Each shows how `ingest` would pull a fact into the KB (which subfolder it belongs to). Mark all as FAKE.

- [ ] **Step 3: Verify gold-set has a deferral case and 5 rows**

Run: `grep -c "answer_from_kb\|scenario_sim\|polite_deferral" training/class/poc-workshop/sales-assistant/samples/gold-set.md`
Expected: >= 5.

Run: `grep -q "polite_deferral" training/class/poc-workshop/sales-assistant/samples/gold-set.md && echo "OK deferral case present"`
Expected: `OK deferral case present`.

- [ ] **Step 4: Commit**

```bash
git add training/class/poc-workshop/sales-assistant/samples && git commit -m "Add gold-set (with deferral case) and fake sample mail"
```

---

### Task 5: Four skills (SKILL.md files)

**Files:**
- Create: `sales-assistant/skills/answer/SKILL.md`
- Create: `sales-assistant/skills/input-doc/SKILL.md`
- Create: `sales-assistant/skills/review-km/SKILL.md`
- Create: `sales-assistant/skills/ingest/SKILL.md`

**Interfaces:**
- Consumes: AGENTS.md rules, STRUCTS.md, knowledge-base/, samples/.
- Produces: the callable skills. All follow the `skills/fde-engagement/SKILL.md` frontmatter pattern (`name`, `description`).

- [ ] **Step 1: Write `skills/answer/SKILL.md`**

Frontmatter: `name: sales-answer`, `description: Use when a front-line sales rep needs to answer a customer question about product spec/functions, explain competitor differences, or simulate a customer scenario using the product knowledge base.`
Body: persona (前端業務助手). Steps: 1) 先讀 `STRUCTS.md`; 2) 進相關子目錄讀細節; 3) 回答時引用 KB 來源檔; 4) 競品問題引用 competitors/ 並標記未驗證; 5) 情境模擬用 qa/ + tips/ 組對話; 6) **無把握 → 禮貌 deferral（verbatim 例句）+ 記缺口**; 7) 把每次問答寫進 `outputs/answers-log.md`. Include a short "Do NOT" list (不捏造、不改 gold-set、不寄任何東西).

- [ ] **Step 2: Write `skills/input-doc/SKILL.md`**

Frontmatter: `name: input-doc`, `description: Use when a sales rep wants to add product material (specs, functions, competitor notes, order history, Q&A, tips) into the knowledge base; classifies the content and files it into the correct knowledge-base subfolder.`
Body: Steps: 1) 讀入使用者提供的內容/檔案/URL; 2) 判斷主題屬於哪個 KB 子目錄 (functions/specs/competitors/orders/qa/roadmap/tips); 3) 寫進對應子目錄 (檔名語意化); 4) **更新 `STRUCTS.md`**; 5) 記到 `docs/ingest-log.md`. Rule: 主題不明確時問使用者，不亂放。

- [ ] **Step 3: Write `skills/review-km/SKILL.md`**

Frontmatter: `name: review-km`, `description: Use to audit the sales knowledge base — check whether the structure is sound and coverage is enough to answer most front-line sales questions; propose fixes only after user consent, or request more data, and update competitor info from the web in real-mode.`
Body: Steps: 1) 讀 STRUCTS + eval-report 找缺口; 2) 檢查七個子目錄涵蓋度; 3) 產出缺口清單 (哪些常見問題答不了); 4) **取得使用者同意後**才修正結構/內容; 5) 缺料則請使用者補; 6) real-mode 可上網更新競品資訊 (標記來源與日期). Rule: 不擅自大改，先徵求同意。

- [ ] **Step 4: Write `skills/ingest/SKILL.md`**

Frontmatter: `name: ingest`, `description: Use to update the product knowledge base from email or GitHub — teaching mode reads fake exported samples; real-mode reads real Gmail/GitHub strictly read-only.`
Body: Steps: 1) 教學版讀 `samples/sample-mail.md` (或指定假匯出檔); 2) 抽出產品相關事實; 3) 判斷歸檔子目錄 (呼叫 input-doc 邏輯); 4) 更新 STRUCTS + `docs/ingest-log.md`; 5) real-mode: 只讀 Gmail/GitHub、絕不寄送/修改、資料落 git-ignore 路徑. Safety block prominent.

- [ ] **Step 5: Verify all four skills have valid frontmatter**

Run: `for s in answer input-doc review-km ingest; do head -1 training/class/poc-workshop/sales-assistant/skills/$s/SKILL.md | grep -q '^---$' && grep -q '^name:' training/class/poc-workshop/sales-assistant/skills/$s/SKILL.md && echo "OK $s" || echo "BAD $s"; done`
Expected: four `OK` lines.

- [ ] **Step 6: Verify deferral rule and STRUCTS-update reflected in skills**

Run: `grep -q "STRUCTS" training/class/poc-workshop/sales-assistant/skills/input-doc/SKILL.md && grep -qi "確認後\|deferral\|帶回公司\|不捏造\|不亂" training/class/poc-workshop/sales-assistant/skills/answer/SKILL.md && echo OK`
Expected: `OK`.

- [ ] **Step 7: Commit**

```bash
git add training/class/poc-workshop/sales-assistant/skills && git commit -m "Add four sales-assistant skills: answer, input-doc, review-km, ingest"
```

---

### Task 6: State + feedback output files + remaining harness (state 要素 + feedback output side)

**Files:**
- Create: `sales-assistant/PROGRESS.md`
- Create: `sales-assistant/feature_list.json`
- Create: `sales-assistant/docs/ingest-log.md`
- Create: `sales-assistant/docs/review-checklist.md`
- Create: `sales-assistant/docs/real-mode.md`
- Create: `sales-assistant/outputs/answers-log.md` (empty placeholder w/ header)
- Create: `sales-assistant/outputs/eval-report.md` (empty placeholder w/ header)
- Create: `sales-assistant/.gitignore`
- Create: `sales-assistant/README.md`

**Interfaces:**
- Consumes: everything above.
- Produces: the state layer, the feedback output targets, real-mode instructions, and the entry README.

- [ ] **Step 1: Write `PROGRESS.md`**

Content: `# Progress`. Sections: current goal, what exists now (harness scaffolded, fake KB, 4 skills, gold-set), eval score this round (— not yet run), open risks (competitor info unverified; roadmap fake), recommended next step (run answer → eval). Keep short.

- [ ] **Step 2: Write `feature_list.json`**

JSON array mirroring `build-a-useful-poc.md` style, with `id`, `title`, `status`, `done_when` for: `answer-spec-questions`, `explain-competitor-diff`, `simulate-scenario`, `defer-when-unknown`. `done_when` for defer-when-unknown: "gold-set row 5 (unknown) produces a polite deferral, not a fabricated answer."

- [ ] **Step 3: Write `docs/ingest-log.md`**

Content: `# Ingest Log`. One example dated entry template (source, items pulled, KB files updated, STRUCTS updated y/n, reviewer).

- [ ] **Step 4: Write `docs/review-checklist.md`**

Content: human review checklist adapted from build-a-useful-poc: uses fake data / read-only; answers cite KB source; deferral fires on unknowns; gold-set not edited; STRUCTS updated after new files; eval score meets bar; competitor claims marked unverified.

- [ ] **Step 5: Write `docs/real-mode.md`**

Content: `# Real Mode (opt-in, read-only)`. Explain: how to point `ingest` at real Gmail/GitHub read-only; that real data + real answers must go under git-ignored paths (`outputs/`, `knowledge-base/real/`); never send/modify; sensitive info handling; a checklist before real use.

- [ ] **Step 6: Write output placeholders**

`outputs/answers-log.md`: `# Answers Log` + one-line note "每次 answer 產出附在這裡（教學產物）。". `outputs/eval-report.md`: `# Eval Report` + note "對照 samples/gold-set.md 的結果會寫在這裡。".

- [ ] **Step 7: Write `.gitignore`**

Ignore real-mode artifacts:
```
knowledge-base/real/
outputs/real/
*.real.md
```
(Keep the fake teaching `outputs/*.md` tracked.)

- [ ] **Step 8: Write `README.md`**

Content: what it is (sales assistant KB harness POC), the 3 jobs, how to run (open folder in Claude Code, use the 4 skills), the file map, dual-mode note (fake default / opt-in real-mode), safety, and a teaching-note pointer to `../build-a-sales-assistant.md`.

- [ ] **Step 9: Verify JSON valid and all files present**

Run: `python3 -c "import json;json.load(open('training/class/poc-workshop/sales-assistant/feature_list.json'))" && echo "JSON OK"`
Expected: `JSON OK`.

Run: `for f in PROGRESS.md feature_list.json README.md .gitignore docs/ingest-log.md docs/review-checklist.md docs/real-mode.md outputs/answers-log.md outputs/eval-report.md; do test -s training/class/poc-workshop/sales-assistant/$f && echo "OK $f" || echo "MISSING $f"; done`
Expected: nine `OK` lines.

- [ ] **Step 10: Verify full 五要素 coverage on disk**

Run: `ls training/class/poc-workshop/sales-assistant/{AGENTS.md,STRUCTS.md,PROGRESS.md,samples/gold-set.md,outputs/eval-report.md} && echo "5-elements files present"`
Expected: all five paths listed + `5-elements files present`.

- [ ] **Step 11: Commit**

```bash
git add training/class/poc-workshop/sales-assistant && git commit -m "Add state, feedback outputs, real-mode, README and gitignore for sales-assistant"
```

---

### Task 7: Teaching doc — Chinese (`build-a-sales-assistant.zh.md` + main `.md`)

**Files:**
- Create: `training/class/poc-workshop/build-a-sales-assistant.zh.md`
- Create: `training/class/poc-workshop/build-a-sales-assistant.md` (identical copy)

**Interfaces:**
- Consumes: the built `sales-assistant/` folder (doc references real files in it).
- Produces: the follow-able class walkthrough.

- [ ] **Step 1: Write `build-a-sales-assistant.zh.md`**

Follow the pedagogy & section style of `build-a-useful-poc.md`. Required sections (adapted to sales):
1. `# Sales Assistant：用 Harness 打造前端業務知識助手` + 一段目的 (3 jobs).
2. 課程目標 (學員留下: 可跑的 KB harness、gold-set、eval report、review 清單、continue/revise/stop 判斷).
3. 什麼叫「有用的 sales assistant」(Demo vs Useful 表格，同 build-a-useful-poc 精神).
4. **Harness 五要素對照表** — copy the section-3 table from the spec verbatim (instructions/tools/environment/state/feedback → 對應檔案). This is the required 五要素 review, must appear.
5. **Knowledge Base 設計細節 (why & how)** — this is a REQUIRED, substantial section (~一頁). Must cover:
   - **Why 這樣設計**: 為什麼用純 markdown + 目錄分主題而非一個大檔或 vector DB (可讀、可審核、可 git diff、agent 靠 STRUCTS 導航即可，教學成本低)。
   - **Why 這七個子目錄**: 逐一說明 functions/specs/competitors/orders/qa/roadmap/tips 各自回答前端業務的哪一類問題，以及為什麼缺一不可 (例: 沒有 tips 就只會背規格、不會成交)。
   - **How STRUCTS.md 運作**: STRUCTS 是「地圖」，agent 回答前先讀它定位，避免翻遍全庫；新增檔案必須回寫 STRUCTS，否則 agent 找不到。
   - **How 一則好的 KB 檔案長怎樣**: 短、單一主題、標明資料來源與日期、競品資訊標未驗證、假資料要標 FAKE。給一個 good vs bad KB 檔案對照小範例。
   - **How 隨規模成長**: 子目錄檔案變多時如何再分 (依產品線/客戶行業)，何時該找 review-km 重整。
6. 資料夾結構 (code block of the `sales-assistant/` tree) + 安全邊界 (假資料預設 / real-mode opt-in read-only).
7. 課堂主流程 7 步 (Init harness → Seed KB(input-doc) → Make it work(answer) → Measure(eval vs gold-set) → Review KM(review-km) → Ingest → Bridge to real-mode + Handoff). Each step: 一段說明 + 一個 starter prompt code block + 範例輸出片段.
8. **每個 skill 一小節，每節必含三塊**: (a) **用途** — 這個 skill 解決前端業務的什麼問題; (b) **How to design it (設計要點)** — 這個 skill 的輸入/輸出、關鍵決策 (例: answer 為何先讀 STRUCTS、input-doc 如何決定歸檔目錄、review-km 為何要先徵求同意、ingest 為何只讀)、以及設計時要寫進 SKILL.md 的規則; (c) **How to verify it (驗收方式)** — 用什麼具體案例驗證這個 skill 有效 (例: answer 用 gold-set row 5 驗 deferral 有沒有捏造; input-doc 丟一則競品筆記驗有沒有進 competitors/ 且 STRUCTS 有更新; review-km 驗能否列出缺口且未經同意不亂改; ingest 驗只讀假 mail 且 STRUCTS/ingest-log 有更新)，附一個 starter prompt.
9. Definition of "useful enough"、Common failure modes 表 (捏造、漏 deferral、gold-set 造假、STRUCTS 沒更新、競品未驗證當事實)、Exit ticket、講師檢查清單.

Length target: comparable to build-a-useful-poc.md (~400+ lines). Every referenced path must match files created in Tasks 1-6.

- [ ] **Step 2: Copy to main `.md`**

```bash
cp training/class/poc-workshop/build-a-sales-assistant.zh.md training/class/poc-workshop/build-a-sales-assistant.md
```

- [ ] **Step 3: Verify 五要素 table and all 7 steps present**

Run: `grep -c "instructions\|tools\|environment\|state\|feedback" training/class/poc-workshop/build-a-sales-assistant.zh.md`
Expected: >= 5.

Run: `grep -Eq "gold-set" training/class/poc-workshop/build-a-sales-assistant.zh.md && grep -Eq "review-km" training/class/poc-workshop/build-a-sales-assistant.zh.md && grep -Eq "real-mode|real mode" training/class/poc-workshop/build-a-sales-assistant.zh.md && echo OK`
Expected: `OK`.

Run (KB design section + per-skill design/verify blocks present): `grep -Eq "Knowledge Base 設計|KB 設計|why.*how|設計細節" training/class/poc-workshop/build-a-sales-assistant.zh.md && grep -Eq "How to design\|設計要點" training/class/poc-workshop/build-a-sales-assistant.zh.md && grep -Eq "How to verify\|驗收\|驗證" training/class/poc-workshop/build-a-sales-assistant.zh.md && echo OK`
Expected: `OK`.

- [ ] **Step 4: Verify referenced paths exist**

Run: `grep -oE "sales-assistant/[a-zA-Z0-9/_.-]+" training/class/poc-workshop/build-a-sales-assistant.zh.md | sort -u | while read p; do test -e training/class/poc-workshop/$p && echo "OK $p" || echo "BROKEN $p"; done`
Expected: no `BROKEN` lines (ignore lines pointing at illustrative sub-paths that are dirs — those should still exist).

- [ ] **Step 5: Commit**

```bash
git add training/class/poc-workshop/build-a-sales-assistant.zh.md training/class/poc-workshop/build-a-sales-assistant.md && git commit -m "Add Chinese teaching doc for sales-assistant POC"
```

---

### Task 8: Teaching doc — English (`build-a-sales-assistant.en.md`)

**Files:**
- Create: `training/class/poc-workshop/build-a-sales-assistant.en.md`

**Interfaces:**
- Consumes: the Chinese doc from Task 7 (faithful translation, same structure & file references).
- Produces: the English teaching variant, matching the `.en.md` convention of sibling docs.

- [ ] **Step 1: Write `build-a-sales-assistant.en.md`**

Faithful English translation of `build-a-sales-assistant.zh.md`: same 9 sections including the **Knowledge Base design (why & how)** section and the **per-skill design + verify** blocks, same 五要素 table (translated headers, same file paths), same 7-step flow, same starter prompts (prompts may stay English), same failure-mode table. Keep all `sales-assistant/...` paths identical.

- [ ] **Step 2: Verify structure parity**

Run: `grep -c '^## ' training/class/poc-workshop/build-a-sales-assistant.en.md; grep -c '^## ' training/class/poc-workshop/build-a-sales-assistant.zh.md`
Expected: the two counts are equal (same number of `##` sections).

Run: `grep -Eq "feedback" training/class/poc-workshop/build-a-sales-assistant.en.md && grep -Eq "gold-set|gold set" training/class/poc-workshop/build-a-sales-assistant.en.md && echo OK`
Expected: `OK`.

- [ ] **Step 3: Commit**

```bash
git add training/class/poc-workshop/build-a-sales-assistant.en.md && git commit -m "Add English teaching doc for sales-assistant POC"
```

---

### Task 9: Final integration check + index/link updates

**Files:**
- Modify (if they reference the removed email-assistant or list workshop docs): `training/class/index.html`, `training/class/README.md`, `training/class/poc-workshop/` sibling docs — only where a link now points at removed/renamed content or where the new doc should be listed.

**Interfaces:**
- Consumes: all prior tasks.
- Produces: a consistent, link-clean class site/readme.

- [ ] **Step 1: Find dangling references to email-assistant**

Run: `grep -rn "email-assistant" training/ docs/ 2>/dev/null`
Expected: review each hit. Teaching-doc mentions of the *email assistant class example* (build-a-useful-poc/real-poc) are fine to keep; only fix hard links/paths that point at the deleted `email-assistant/` folder.

- [ ] **Step 2: Add the new doc to any workshop index**

If `training/class/index.html` or `training/class/README.md` lists poc-workshop docs, add `build-a-sales-assistant` entry following the existing pattern. If they don't enumerate docs, no change.

- [ ] **Step 3: Full-tree verification**

Run: `find training/class/poc-workshop/sales-assistant -type f | wc -l`
Expected: >= 25 files (7 KB + 4 skills + ~8 harness + samples + outputs + docs).

Run: `grep -rn "TODO\|TBD\|FIXME\|placeholder" training/class/poc-workshop/sales-assistant training/class/poc-workshop/build-a-sales-assistant.*md`
Expected: no leftover authoring placeholders (intentional "placeholder header" note strings are acceptable; real TODO/TBD are not).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "Wire up sales-assistant doc into class index and clean dangling email-assistant links"
```

---

## Self-Review

**1. Spec coverage:**
- Purpose (3 jobs) → Task 3 KB + Task 5 answer skill + Task 7 doc. ✓
- Dual-mode single folder (Option A) → Task 6 real-mode.md + .gitignore. ✓
- 5th element feedback (gold-set + eval) → Task 4 gold-set + Task 6 eval-report + Task 5 review-km. ✓
- 3 language docs → Tasks 7 (zh + main) & 8 (en). ✓
- Location under poc-workshop → all tasks. ✓
- Remove email-assistant → Task 1 + Task 9 link cleanup. ✓
- 五要素 mapping review → Task 2/3/4/6 files + Task 7 explicit table + Task 6 step 10 disk check. ✓
- Four skills with persona + deferral + STRUCTS-first → Task 5. ✓
- KB 7 subfolders → Task 3. ✓
- Safety boundary → Task 2 scope + Task 6 real-mode + skill safety blocks. ✓

**2. Placeholder scan:** Content specs give concrete required sections and verbatim key strings (deferral rule, STRUCTS-first rule, gold-set row 5). Output-file "placeholder header" files are intentional and their content is specified. No TODO/TBD in deliverables (Task 9 step 3 guards this).

**3. Type/name consistency:** Skill `name:` values fixed (`sales-answer`, `input-doc`, `review-km`, `ingest`); fake product "Acme FlowHub" fixed across KB and gold-set; KB subfolder set identical everywhere; file paths consistent between plan tasks and verification greps.
