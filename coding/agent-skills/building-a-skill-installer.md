---
title: 如何製作內建 Skills 的 Agent Skill Installer
tags: [agent-skills, bundled-installer, skill-installer, npm-package, claude-code, codex, cli-design]
created: 2026-05-25
summary: 設計一個把 skills source 直接包進 npm 安裝包的 agent skill installer，而不是從 GitHub 或遠端 source 抓取 skills。
related: [coding/agent-skills/README.md, coding/agent-skills/skills-sh-and-mattpocock-skills.md]
---

# 如何製作內建 Skills 的 Agent Skill Installer

目標不是做一個像 `skills.sh` 那樣「到 GitHub 找 skill source 再安裝」的通用 installer。

這裡的目標是做一個 **bundled installer**：installer package 本身就包含一批寫好的 skills。使用者執行 npm package 時，CLI 直接從 package 內部的 `skills/` 目錄複製到 Codex 或 Claude Code 的 skill 目錄。

## 目標使用體驗

希望使用者可以這樣用：

```bash
npx @blackbeartechhive/agent-skills install --agent codex
npx @blackbeartechhive/agent-skills install --agent claude-code
npx @blackbeartechhive/agent-skills list
```

或更短：

```bash
npx @blackbeartechhive/agent-skills install
```

如果沒有指定 agent，v1 可以預設安裝到 Codex：

```text
.agents/skills/<skill-name>/SKILL.md
```

## Package 結構

installer 和 skills source 放在同一個 npm package 裡。

```text
agent-skills-package/
  package.json
  src/
    cli.ts
    discover-bundled-skills.ts
    install.ts
    agents.ts
  skills/
    write-a-skill/
      SKILL.md
    check-docs/
      SKILL.md
  README.md
```

build 後發布到 npm：

```text
dist/
  cli.js
skills/
  write-a-skill/
    SKILL.md
  check-docs/
    SKILL.md
```

重點：`skills/` 必須被包含在 npm package 的 `files` 裡。

```json
{
  "name": "@blackbeartechhive/agent-skills",
  "version": "0.1.0",
  "type": "module",
  "bin": {
    "bb-skills": "./dist/cli.js"
  },
  "files": [
    "dist",
    "skills",
    "README.md"
  ]
}
```

## Skill 的最小格式

每個 skill 是一個資料夾，裡面至少有 `SKILL.md`：

```text
skills/
  my-skill/
    SKILL.md
```

`SKILL.md` 必須有 frontmatter：

```md
---
name: my-skill
description: Does one specific workflow. Use when the user asks for that workflow or mentions related trigger words.
---

# My Skill

Instructions for the agent.
```

installer 至少要驗證：

- `SKILL.md` 存在。
- frontmatter 可解析。
- `name` 存在且適合作為資料夾名稱。
- `description` 存在，讓 agent 能判斷何時載入。

## 不需要做的事

因為 skills 已經包在 package 裡，v1 不需要：

- GitHub clone。
- private repo token。
- remote source parser。
- marketplace。
- arbitrary URL download。
- source trust / audit system。

這讓 v1 很單純：**列出 package 內建 skills，然後複製到指定 agent 目錄。**

## Agent 安裝路徑

建議把 agent path 做成設定表。

```ts
const agents = {
  codex: {
    projectSkillsDir: ".agents/skills",
    globalSkillsDir: "~/.codex/skills",
  },
  "claude-code": {
    projectSkillsDir: ".claude/skills",
    globalSkillsDir: "~/.claude/skills",
  },
};
```

Codex project-level install：

```text
.agents/skills/<skill-name>/SKILL.md
```

Claude Code project-level install：

```text
.claude/skills/<skill-name>/SKILL.md
```

v1 建議只做 project-level install。global install 等流程穩定後再加。

## CLI 介面設計

最小命令：

```bash
bb-skills list
bb-skills install
bb-skills install --agent codex
bb-skills install --agent claude-code
bb-skills install --skill write-a-skill
bb-skills install --dry-run
```

建議選項：

- `--agent <agent>`：指定 `codex` 或 `claude-code`。
- `--skill <name>`：只安裝指定 skill。
- `--all`：安裝所有內建 skills。
- `--dry-run`：顯示將寫入哪些路徑，但不改檔案。
- `--yes`：覆蓋既有 skill 時不詢問。

初版可以讓 `install` 預設安裝全部內建 skills，或只安裝一個核心 skill。若 skills 數量不多，預設全部安裝比較簡單。

後續可以加入處理「裝錯 agent 後想換地方」的指令：

```bash
bb-skills list-installed
bb-skills remove --agent claude-code
bb-skills move --from claude-code --to codex
bb-skills move --from claude-code --to codex --dry-run
bb-skills move write-a-skill --from claude-code --to codex
```

`move` 的語意不是直接把 `.claude/skills` 裡的檔案搬去 `.agents/skills`，而是：

1. 從 lockfile 找出之前安裝到 source agent 的 bundled skills。
2. 從 package 內建 `skills/` 重新 copy 同一批 skills 到 target agent。
3. 確認 target agent 安裝成功。
4. 再移除 source agent 的舊 copy。
5. 更新 lockfile。

這樣可以避免使用者手動改壞 `.claude/skills` 裡的 copy 後，又把壞掉的版本搬到 Codex。

## 安裝流程

推薦流程：

1. 找到 package 內部的 `skills/` 目錄。
2. 掃描 `skills/*/SKILL.md`。
3. 解析每個 `SKILL.md` 的 frontmatter。
4. 如果使用者執行 `list`，印出 skill 名稱和 description 後結束。
5. 根據 `--skill` 過濾要安裝的 skills。
6. 根據 `--agent` 決定目標目錄。
7. 顯示 installation summary。
8. 使用者確認後，把 skill folder copy 到目標 agent path。
9. 寫入簡單 lockfile，記錄 package name、version、skill names。

## 如何找到 package 內建 skills

Node.js ESM 可以用 `import.meta.url` 找目前 CLI 檔案位置，再往 package root 找 `skills/`。

概念：

```ts
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");
const bundledSkillsDir = join(packageRoot, "skills");
```

如果 build 後 `dist/cli.js` 在 `dist/` 下面，`join(__dirname, "..", "skills")` 就會指到 package root 的 `skills/`。

## Copy vs Symlink

Bundled installer 建議 v1 只用 copy。

原因：

- npm cache / npx temporary path 不適合作為長期 symlink target。
- 使用者安裝完後，package 暫存位置可能被清掉。
- copy 後 skill 留在使用者專案裡，比較可預期。

所以 v1 不要 symlink。等未來真的需要 update 機制時，再用 lockfile 記錄來源 package/version，重新 copy 覆蓋即可。

## Lockfile

installer 可以寫一個簡單的 lockfile：

```text
bb-skills-lock.json
```

範例：

```json
{
  "package": "@blackbeartechhive/agent-skills",
  "version": "0.1.0",
  "installedAt": "2026-05-25T00:00:00.000Z",
  "skills": [
    {
      "name": "write-a-skill",
      "agent": "codex",
      "target": ".agents/skills/write-a-skill"
    }
  ]
}
```

這個 lockfile 的用途不是追 GitHub source，而是記錄「目前 project 裝過這個 npm package 裡的哪些 skills」。

如果要支援 `move`、`remove`、`list-installed`，lockfile 需要能記錄同一個 skill 安裝到多個 agent 的狀態。

範例：

```json
{
  "package": "@blackbeartechhive/agent-skills",
  "version": "0.1.0",
  "updatedAt": "2026-05-25T00:00:00.000Z",
  "installs": [
    {
      "name": "write-a-skill",
      "agent": "codex",
      "target": ".agents/skills/write-a-skill",
      "installedAt": "2026-05-25T00:00:00.000Z"
    },
    {
      "name": "check-docs",
      "agent": "claude-code",
      "target": ".claude/skills/check-docs",
      "installedAt": "2026-05-25T00:00:00.000Z"
    }
  ]
}
```

`list-installed` 讀這個檔案即可。`move` 則更新 `agent` 和 `target`，或刪掉 source agent entry 後新增 target agent entry。

## 安全檢查

必要檢查：

- 禁止 skill name 包含 `..`、`/`、`\`。
- 安裝目標必須留在 `.agents/skills` 或 `.claude/skills` 內。
- 覆蓋既有 skill 前先提示，除非使用者傳 `--yes`。
- 不執行 skill 裡面的 script，只複製檔案。
- `--dry-run` 必須完全不寫入檔案。

因為 skills source 跟 installer 是同一個 package，安全邊界比 remote installer 簡單，但還是要避免 path traversal 和意外覆蓋。

## TypeScript 實作骨架

```ts
type Skill = {
  name: string;
  description: string;
  dir: string;
};

type Agent = "codex" | "claude-code";

type InstallOptions = {
  skills?: string[];
  agents: Agent[];
  dryRun?: boolean;
  yes?: boolean;
};
```

核心函式：

```ts
function getBundledSkillsDir(): string;
async function discoverBundledSkills(): Promise<Skill[]>;
async function installSkill(skill: Skill, agent: Agent, options: InstallOptions): Promise<void>;
async function removeSkill(skillName: string, agent: Agent, options: InstallOptions): Promise<void>;
async function moveSkill(skillName: string, from: Agent, to: Agent, options: InstallOptions): Promise<void>;
async function listInstalled(): Promise<InstalledSkill[]>;
async function writeLockfile(installed: InstalledSkill[]): Promise<void>;
```

## Core 與 Skills Pack 拆分

長期來看，不建議每做一個新的 skills package 就複製一整份 installer source code。比較好的設計是拆成：

```text
@blackbeartechhive/agent-skills-core
@blackbeartechhive/agent-skills
@blackbeartechhive/learning-agent-skills
@blackbeartechhive/client-a-agent-skills
```

`agent-skills-core` 放共用 installer engine：

```text
discoverBundledSkills()
installSkill()
installAll()
removeSkill()
moveSkill()
listInstalled()
validateSkills()
writeLockfile()
```

每個 skills package 只放自己的 `skills/` 和一個很薄的 CLI wrapper：

```text
@blackbeartechhive/learning-agent-skills/
  package.json
  src/
    cli.ts
  skills/
    learn-agent-skills/
      SKILL.md
    write-a-skill/
      SKILL.md
```

wrapper 只負責告訴 core：這個 package 叫什麼，內建 skills 在哪裡。

```ts
import { runBundledSkillsCli } from "@blackbeartechhive/agent-skills-core";

runBundledSkillsCli({
  packageName: "@blackbeartechhive/learning-agent-skills",
  bundledSkillsDir: new URL("../skills/", import.meta.url),
});
```

這樣未來要出新 package，只需要換：

- `package.json` package name。
- `skills/` 內容。
- README。

不需要複製 installer 邏輯。之後如果 `move`、lockfile 或 Codex/Claude 路徑要修 bug，只要改 `agent-skills-core`。

實務路線：

1. 第一個 package 可以先把 core 和 skills 放在一起，降低啟動成本。
2. 當出現第二個 skills package 時，再抽出 `agent-skills-core`。
3. 抽出 core 後，所有 skills packages 都只保留 thin wrapper。

## v1 實作範圍

建議第一版只做這些：

- npm package 內建 `skills/`。
- `bb-skills list`。
- `bb-skills install --agent codex`。
- `bb-skills install --agent claude-code`。
- `bb-skills install --skill <name>`。
- `bb-skills install --dry-run`。
- `bb-skills list-installed`。
- `bb-skills remove --agent <agent>`。
- `bb-skills move --from <agent> --to <agent>`。
- project-level copy install。
- simple lockfile。

先不要做：

- GitHub source install。
- remote package install。
- symlink mode。
- global install。
- auto-update。
- agent auto-detection。
- interactive UI。

## 測試清單

- package 內有一個 skill，可以 list。
- package 內有多個 skills，可以 list。
- `--skill` 只安裝指定 skill。
- `--agent codex` 寫入 `.agents/skills/<name>`。
- `--agent claude-code` 寫入 `.claude/skills/<name>`。
- invalid `SKILL.md` 會報錯。
- dangerous skill name 會被拒絕。
- `--dry-run` 不寫入檔案。
- 重複安裝會提示 overwrite。
- `move --dry-run` 不寫入檔案，但會列出 copy/remove/lockfile changes。
- `move --from claude-code --to codex` 會從 package bundled source 重新 copy，不直接搬 source agent 的現有檔案。
- `remove --agent claude-code` 只移除 lockfile 中由這個 package 安裝的 skills。
- `npm pack --dry-run` 會顯示 `skills/` 被包進 npm package。

## 與 skills.sh 的關係

`skills.sh` 是通用 installer：它可以從 GitHub repo、URL、本機 path 探測 skills，再安裝到多種 agent。

這裡要做的是 bundled installer：skills source 已經跟 npm package 綁在一起，安裝器只需要把 package 內建 skills copy 到目標 agent 目錄。

兩者差異：

| 面向 | skills.sh 類型 | bundled installer 類型 |
| --- | --- | --- |
| source | 外部 GitHub / URL / local path | package 內建 `skills/` |
| 安全模型 | 要信任外部 source | 信任已發布 npm package |
| v1 複雜度 | 較高 | 較低 |
| 適合用途 | 通用 ecosystem | 公司內部或自家 skills 發布 |

## 推薦路線

1. 先建立 `@blackbeartechhive/agent-skills` npm package。
2. 把公司要分享的 skills 放在 package 內的 `skills/`。
3. CLI 先做 `list`、`install`、`list-installed`、`remove`、`move`。
4. 先支援 Codex / Claude Code project install。
5. 用 `npm pack --dry-run` 驗證 `skills/` 有被包進去。
6. 發 public npm package 後，用 `npx @blackbeartechhive/agent-skills install --agent codex` 測試。
7. 等第二個 skills package 出現時，再抽出 `@blackbeartechhive/agent-skills-core`，避免每包複製 installer source。
