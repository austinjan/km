---
title: Manage Skills Support All Agents
created: 2026/07/20
summary: Describe how to manage agent skills that can use all agents
---

市面上的 agent ( claude code, codex, opencode etc.,) 使用不同的專案子目錄或是 user 子目錄作為 skills 的存放目錄， 比如 claude code 使用 `~/.claude/skills` 作為 skills 的存放目錄。

## Structure
In the project, create `.agents` directory to store all agent related files including skills .

In the users home directory, also create a `.agents` directory to store user scope skills.

```
專案:
.agents/
└── skills/
    ├── skillone/SKILL.md
    ├── skilltwo/
    └── skillthree/
.claude/                    # 真目錄,自己的 config
└── skills → ../.agents/skills   # 由 setup script 建,不 commit

家目錄:
~/.agents/skills/           # user-scope 本體
~/.claude/skills → ~/.agents/skills
```

> To support claude code, create a symlink `~/.claude/skills` → `../.agents/skills` (relative symlink), be careful

## Scripts
Following script helps to verify skills

Agent folders : [".claude/skills"]

### Verify symlink is working
- check symlinks in the Agent folders are working (pointing to the correct location)

### 驗證只有 .agents/skills/ 有實體的 skill 其他都是 relative symlink
- verify agent folders which defined in this section
- If folders has real skill folder,
  1. Check duplicate: check duplicate skills, if skill is duplicated move skill to `.agents/archive-skill/`, if same skill but different version, keep last version and archive the older one.
  2. Move all un-duplicate skills to `.agents/skills/`
  3. Create symlink `~/.claude/skills` → `../.agents/skills` (relative symlink)

the sample script that verify skill structure `verify-skills-structure.ts`
