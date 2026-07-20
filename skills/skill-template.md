## SKILL.md
- skill 的主要入口和router，應該包含 frontmatter , further information navigation, description, instructions etc.,
- Keep SKILL.md small and clear, move detailed documentation to `instructions/` or `references/`.
- `SKILL.md` is a router also, defined branch, decisions and routing logic in the SKILL.md.

### frontmatter
name: name 只能小寫字母、數字、hyphen,上限 64 字,不能以 hyphen 開頭或結尾,而且必須跟父資料夾名完全相符
description 要同時寫「做什麼 + 何時用」。 不是隨便一句。description 上限 1024 字,必須同時說明它做什麼(capability)和什麼時候該用(when to use)
compatibility: List all compatibility requirements, e.g. Python version, required tools, etc.
allowed-tools: List all allowed tools and their versions, e.g. Bash(git:*) Bash(jq:*) Read
```
---
name: create-skill
description: Build a skill, interview user to clarify requirements, boundary, branch. Use when user want to create a new skill or modify an existing one.
compatibility: Requires Python 3.14+, git, jq, internet access
allowed-tools: Bash(git:*) Bash(jq:*) Read
---
```

### Intruduce (first section)
The first section introduces the skill and its purpose.
Example:
```
## Create Skill
Create a new skill or modify an existing one.
```

### Prerequisites, constraints
情境性且可檢查的前提與邊界,而且每條都寫成 agent 能據以行動、你也能拿去測的形式

See example:
```
## Preconditions
- 必須在 git worktree 內執行 → 先跑 `git rev-parse --is-inside-work-tree`;
  非 worktree 則中止並說明原因。
- 需要 ./config.yaml → 不存在則從 assets/config.example.yaml 產生後再繼續。

## Guardrails / Constraints
- 只在 feature branch 動作;偵測到 main / master 一律中止。
- 不修改 .env 或任何 secrets 檔。
- 完成標準:測試全綠且 `git status` 乾淨。
```
### Instructions
包含 skill 的執行步驟，判斷，分支等等，建議保留導引在 `SKILL.md` 內，依據功能指向不同細節文件
```
## Pick a branch
- If user want to create a new skill -> `instructions/new-skill-instructions.md` to create a new skill.
- If user want to modify an existing skill -> `instructions/modify-skill-instructions.md` to modify an existing skill.
```




## assets, references, instructions and scripts sub-folders
