---
title: Agent Skills Notes
tags: [agent-skills, coding-agent, claude-code, codex, skills-sh]
created: 2026-05-25
summary: Index for notes about creating, installing, and maintaining reusable agent skills across Claude Code, Codex, and skills.sh-compatible agents.
related: [coding/codex/README.md, coding/claude-code/README.md]
---

# Agent Skills Notes

Reusable agent skills are small instruction packages that teach coding agents a repeatable workflow. This folder tracks how to create them, install them, and keep them portable across Claude Code, Codex, and skills.sh-compatible agents.

## Files

- [building-a-skill-installer.md](building-a-skill-installer.md) - 中文筆記：如何設計一個把 skills source 直接包進 npm package 的 bundled agent skill installer。
- [compound-engineering-plugin.md](compound-engineering-plugin.md) - 中文簡介：Every 的 Compound Engineering plugin，包含跨 agent coding 工具的 skills、agents、安裝流程與 knowledge compounding 工作法。
- [matt-van-horn-claude-code-workflow.md](matt-van-horn-claude-code-workflow.md) - 中文整理：從 Matt Van Horn 的 Claude Code 工作流文章提取 plan-first、語音輸入、並行 sessions、context compounding 等可複製模式。
- [skills-sh-and-mattpocock-skills.md](skills-sh-and-mattpocock-skills.md) - Notes from inspecting `npx skills@latest add mattpocock/skills`, including repo structure, installer behavior, and Claude/Codex support.
