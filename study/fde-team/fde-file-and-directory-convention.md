# FDE File & Directory Convention / 文件命名與目錄結構規則

日期：2026-06-04
目的：定義 FDE engagement 所有交付文件的命名規則、目錄結構與 metadata 標準，讓人與 AI agent 都能用「可計算的路徑」快速定位、查詢與跨案子比對，而不是靠全文搜尋。本文補充 `forward-deployed-engineering.md` 與 `fde-engagement-playbook.md`。

## 1. 設計原則

1. **Path is derivable, not searchable.** 只要知道 (customer, workflow, phase, doc-type)，agent 就能直接組出檔案路徑，不需要 grep。這是 AI 快速查詢的最大槓桿。
2. **Metadata-first.** 真正用來過濾的條件（status、version、owner、tag、gate）放在 YAML frontmatter，不要烤進檔名或目錄。
3. **Status / version 是 metadata，不是檔名。** 同一份文件成熟過程中檔名不變，才能被穩定追蹤。淘汰 `-draft` / `-validated` / `-v1` 這種會換名的做法。
4. **Engagement-scoped 與 registry-scoped 分離。** 可重用資產（skill、pattern、connector、eval template）在 Phase 5 畢業離開 engagement，進入公司 registry，並由 engagement 以路徑 reference，不複製。
5. **單一事實來源由 frontmatter 生成。** 文件總表、manifest、全域 catalog 都從 frontmatter 自動生成，禁止手維護以避免 drift。
6. **檔名穩定、型別唯一。** doc-type-slug 在全公司唯一且穩定，讓跨 engagement 查詢（例如「所有 eval-report」）成立。

## 2. 頂層目錄結構

```
fde/
├── engagements/
│   └── <engagement-id>/
│       ├── engagement.yaml              # 機器可讀 manifest（狀態總表）
│       ├── 00-qualification/
│       ├── 10-discovery/
│       ├── 20-prototype/
│       ├── 30-pilot/
│       ├── 40-production/
│       ├── 50-generalize/
│       └── 60-retainer/
│           ├── reports/                 # recurring 月報 / 週報
│           └── incidents/               # 每個事故一檔
├── registry/                            # 畢業後的可重用資產（跨 engagement）
│   ├── skills/<skill-name>/SKILL.md
│   ├── eval-templates/<name>.md
│   ├── connectors/<name>.md
│   ├── patterns/<pattern-name>.md
│   └── playbook-templates/<name>.md
├── index/
│   └── catalog.json                     # 由所有 frontmatter 生成的全域索引
└── templates/                           # 空白交付物模板
    └── <doc-type-slug>.md
```

## 3. Engagement ID 規則

格式：`<customer-slug>-<workflow-slug>[-<seq>]`

- 全部 kebab-case、ASCII、小寫，不含空白、底線、斜線、引號。
- **不放日期**（日期進 frontmatter）。
- customer-slug 用穩定短代號；workflow-slug 描述場景。
- 同一 customer + workflow 重複立案時才加 `-<seq>`（`-02`, `-03`）。

範例：

| Engagement | engagement-id |
| --- | --- |
| CLP 香港 4G-RTU 現代化 | `clp-rtu-modernization` |
| AXTEK NIMBL vs IAM/NAC 評估 | `axtek-nac-eval` |
| One Commerce 菲律賓 substation / PMS | `onecommerce-substation-pms` |

## 4. Phase 目錄規則

| 目錄 | Phase | 對應 playbook |
| --- | --- | --- |
| `00-qualification` | 0 | Qualification |
| `10-discovery` | 1 | Workflow Discovery |
| `20-prototype` | 2 | Prototype / Tracer Bullet |
| `30-pilot` | 3 | Controlled Pilot |
| `40-production` | 4 | Production Deployment |
| `50-generalize` | 5 | Generalize |
| `60-retainer` | 6 | Post-Launch Retainer |

- 編號用兩位數、間隔 10，方便日後插入中間階段而不重排。
- 編號讓檔案在任何 file browser / agent 列目錄時都按執行順序排。
- 若 phase 合併或跳過，仍建立資料夾並放一份說明跳過原因的文件（呼應 playbook §2）。

## 5. 檔名 Pattern

```
<doc-type-slug>[__<qualifier>].md
```

- phase 與 engagement 由「路徑」決定，檔名只放穩定型別 + 必要 qualifier。
- `__<qualifier>` 只給 recurring / 多實例文件使用，用雙底線分隔。
- 不放 status、不放 version、不放 owner、不放日期（除非日期就是 instance key，例如月報）。

### 5.1 Recurring / 多實例文件的 qualifier

| 文件 | qualifier 規則 | 範例 |
| --- | --- | --- |
| weekly-pilot-report | ISO 週 `YYYY-Www` | `weekly-pilot-report__2026-W23.md` |
| monthly-operation-report | `YYYY-MM` | `monthly-operation-report__2026-06.md` |
| incident-postmortem | 事故 id | `incident-postmortem__INC-2026-001.md` |
| release-notes | 版本號 | `release-notes__v1.0.16.md` |

### 5.2 標準 doc-type-slug 對照

沿用 playbook 既有名稱，但移除 `fde-` 前綴（路徑已 namespace）與 status/version 後綴。`→ registry` 表示該文件成熟後畢業到 registry，engagement 內只留 reference。

| Phase 目錄 | doc-type-slug |
| --- | --- |
| 00 | `customer-readiness-scorecard`, `workflow-candidate-list`, `no-go-report`, `know-how-capture-plan`, `product-gap-hypothesis` |
| 10 | `workflow-discovery-brief`, `current-state-workflow-map`, `agent-opportunity-brief`, `success-metrics-and-baseline`, `scope-boundary`, `know-how-capture-map`, `product-gap-classification` |
| 20 | `agent-spec`, `prototype-demo-notes`, `eval-dataset`, `eval-report`, `trace-logging-report`, `production-gap-list`, `agent-skill-asset` → registry, `product-gap-report` |
| 30 | `pilot-plan`, `permission-and-approval-model`, `audit-and-rollback-plan`, `monitoring-dashboard-spec`, `weekly-pilot-report` (recurring), `incident-process`, `pilot-retrospective`, `product-platform-backlog-recommendation` |
| 40 | `production-readiness-checklist`, `security-access-review`, `versioned-agent-config`, `production-smoke-test-report`, `monitoring-alerting-cost-plan`, `production-runbook`, `operator-training-material`, `handoff-package`, `post-launch-support-plan`, `product-gap-closure-package` |
| 50 | `build-prove-generalize-retrospective`, `reusable-pattern-brief` → registry, `connector-backlog`, `product-roadmap-input`, `sales-cs-enablement-notes` |
| 60 | `monthly-operation-report` (recurring), `incident-postmortem` (recurring), `change-log`, `release-notes` (recurring), `improvement-backlog`, `product-gap-follow-up` |

> 注意：`agent-skill-asset` 的 draft / validated 不再是兩個檔名，而是同一份資產在 registry 中以 `status` 演進；engagement 內若需引用就用 registry 路徑（見 §8）。`product-gap-report` 的 v1/v2 用 frontmatter `version` 表示。

## 6. Frontmatter Schema

每份 `.md` 開頭必含 YAML frontmatter。required 欄位缺一不可（manifest / catalog 由此生成）。

```yaml
---
# --- required ---
doc_type: agent-spec                     # 必須是標準 doc-type-slug
title: CLP RTU 工單 triage agent 規格
engagement: clp-rtu-modernization
customer: clp
workflow: rtu-modernization
phase: 20-prototype
status: draft                            # draft | in-review | accepted | validated | superseded
version: 2
owner: austinchiang
date: 2026-06-04                          # 建立日
updated: 2026-06-10                       # 最後更新
# --- optional ---
contributors: [alanhsu, swaraj]
gate: prototype                          # 此文件餵向哪個 gate
tags: [scada, dnp3, ticket-triage]
related:
  - 10-discovery/workflow-discovery-brief.md
  - 20-prototype/eval-report.md
produced_assets:                         # 若產出 registry 資產，列穩定 ref
  - registry/skills/scada-ticket-triage@1.2
---
```

status 取值語意：

- `draft`：撰寫中。
- `in-review`：送 UAT / gate review。
- `accepted`：gate 通過、可付款依據。
- `validated`：AI asset 經真實使用驗證（取代舊 `-validated` 檔名）。
- `superseded`：被新版本取代，保留供追溯。

## 7. engagement.yaml（per-engagement manifest）

放在每個 engagement 根目錄。**agent 讀這一個檔就能掌握整個案子狀態**，不必走整棵樹。由各文件 frontmatter 自動生成。

```yaml
engagement: clp-rtu-modernization
customer: clp
workflow: rtu-modernization
current_phase: 20-prototype
gate_status:
  qualification: passed
  discovery: passed
  prototype: in-review
deployment_lead: austinchiang
blockers:
  - DNP3-SA readiness 未確認，gating production
docs:
  - { doc_type: agent-spec, path: 20-prototype/agent-spec.md, status: draft, owner: austinchiang, updated: 2026-06-10 }
  - { doc_type: eval-report, path: 20-prototype/eval-report.md, status: in-review, owner: swaraj, updated: 2026-06-11 }
updated: 2026-06-11
```

## 8. Registry（畢業資產）

Phase 5 萃取出的可重用資產移到 `fde/registry/`，獨立版本控管，engagement 以「穩定路徑 + 版本」reference，不複製內容。

- skill 用既有 `SKILL.md` 慣例：`registry/skills/<skill-name>/SKILL.md`，讓 skills / aascribe 系統直接索引。
- registry 資產 frontmatter 必含 `origin_engagement`（來源案子）與 `version`，形成雙向 backlink。
- 引用格式：`registry/skills/<name>@<version>`（例：`registry/skills/scada-ticket-triage@1.2`）。

這也是「存進 KM」的正確落點：可重用知識以**可執行 artifact**（skill / connector / eval template）形式存在 registry，而非埋在某個 engagement 資料夾的 markdown。

## 9. 全域 catalog（AI 索引）

`fde/index/catalog.json` 由掃描全部 frontmatter 生成，供跨 engagement 查詢一次讀完，不必走樹。

```json
[
  { "doc_type": "product-roadmap-input", "engagement": "clp-rtu-modernization",
    "path": "fde/engagements/clp-rtu-modernization/50-generalize/product-roadmap-input.md",
    "status": "accepted", "owner": "austinchiang", "tags": ["scada","dnp3"], "updated": "2026-06-20" }
]
```

## 10. AI 查詢 worked examples

| 查詢 | 解法 | 成本 |
| --- | --- | --- |
| 「CLP 案子的 agent spec」 | 直接組路徑 `fde/engagements/clp-rtu-modernization/20-prototype/agent-spec.md` | 1 次讀檔，零搜尋 |
| 「CLP 現在卡在哪個 gate」 | 只讀 `clp-rtu-modernization/engagement.yaml` 的 `gate_status` + `blockers` | 1 次讀檔 |
| 「所有 engagement 裡 status=accepted 的 product-roadmap-input」 | 查 `index/catalog.json`，filter `doc_type` + `status` | 1 次讀檔 + filter |
| 「找所有 SCADA 相關可重用 skill」 | 列 `registry/skills/` + filter frontmatter `tags` | 1 次列目錄 |

## 11. 命名硬規則

- 一律小寫、kebab-case、ASCII；禁止空白、底線（除 `__` qualifier 分隔）、斜線、引號、中文檔名。
- 日期一律 ISO 8601（`YYYY-MM-DD`、週用 `YYYY-Www`）。
- 一個檔案一個 `doc_type`；不要把多種交付物塞同一檔。
- 歷史版本交給 git；需要 point-in-time 快照時才用 `status: superseded` 留檔，不另開 `-old` / `-bak`。

## 12. 從現況遷移

1. 把現有平鋪 `fde-*.md` 依 phase 歸到 `engagements/<id>/<NN>-phase/`，移除 `fde-` 前綴。
2. 把檔名中的 `-draft` / `-validated` / `-v1` 拿掉，改寫進 frontmatter `status` / `version`。
3. 把 skill asset、reusable pattern、connector 移到 `registry/`，engagement 改成 reference。
4. 對每份文件補齊 required frontmatter。
5. 產生 `engagement.yaml` 與 `index/catalog.json`（建議寫一支小腳本掃 frontmatter 生成，順便取代 playbook §11 的手維護總表）。
