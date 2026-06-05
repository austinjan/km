---
name: km-organizer
description: Categorize, polish, and save information into the km knowledge base repository. Use this skill whenever the user wants to save notes, configs, knowledge, or any information to the repo. Also use it when the user asks to reorganize, restructure, or clean up existing content in the km repo. Trigger on phrases like "save this", "file this", "organize", "add this to km", "restructure", "clean up", or when the user pastes content that looks like notes, configuration, or knowledge that should be stored. Even if the user doesn't explicitly mention "km" or "knowledge base", if they're clearly trying to store or organize information for later retrieval, use this skill.
---

# km-organizer

A skill for managing the km knowledge base — both adding new content and reorganizing existing content. The goal is to maximize future LLM retrieval quality: when you or another LLM reads this repo later, it should quickly find and understand the right information.

## How This Repo Works

The km repo is a file-based knowledge base. Each directory has a `README.md` that provides navigation and context. The repo root has a `MANIFEST.md` (create it if it doesn't exist) that serves as a global content map for LLM retrieval.

Before doing anything, scan the current repo structure so you understand what directories exist and what they contain. Read the root `README.md` and `MANIFEST.md` (if it exists) to orient yourself.

## Mode Detection

This skill has two modes. You don't need the user to tell you which one — figure it out from context:

- **Intake**: The user gives you new content to save (pasted text, a file path, or describes something to record)
- **Reorganize**: The user asks you to review, restructure, or clean up existing content

## Intake Mode

When the user provides new content to store:

### 1. Understand the Content

Read the input carefully. Figure out:
- What type of content is it? (note, config, guide, code snippet, project doc, reference, etc.)
- What language is it in? (preserve the original language — do not translate)
- What are the key topics? What would someone search for to find this later?

### 2. Find the Right Home

Scan the existing directory structure. Look at what's already there — read README.md files to understand what each directory is for. Pick the best location based on content type and topic.

If nothing fits well, create a new directory. Give it a clear, descriptive name that an LLM scanning folder names would immediately understand. Add a README.md explaining what belongs there.

The current top-level structure typically includes:
- `coding/` — development tools, editor configs, CLI preferences
- `os-config/` — shell and OS configuration
- `projects/` — active project documentation
- `personal-info/` — personal information
- `programming-language/` — language-specific docs
- `study/` — learning resources

But don't force content into these if it doesn't fit. Create new directories when the content represents a genuinely different category.

### 3. Polish the Content

The goal is to make the content maximally useful for future retrieval. This means:

- **Keep what's valuable.** Facts, instructions, decisions, context, code — anything someone would need later.
- **Remove fluff.** Filler words, redundant explanations, unnecessary pleasantries, formatting noise.
- **Preserve the original language.** If the input is in Chinese, the output stays in Chinese. If it's mixed, keep it mixed.
- **Use your judgment on rewriting.** Sometimes a light cleanup is enough. Sometimes the content is disorganized and needs restructuring to be useful. Do whatever produces the clearest, most retrievable result. Don't rewrite for the sake of rewriting.

Add YAML frontmatter to every file:

```yaml
---
title: Descriptive title for the content
tags: [relevant, topic, tags]
created: YYYY-MM-DD
summary: A one-line description that helps an LLM decide if this file is relevant to a query
related: [path/to/related-file.md]
---
```

The `summary` field is especially important — it's the first thing an LLM reads when scanning files. Make it specific and informative. "Docker stuff" is useless. "How to configure Docker bridge networking for containers that need to communicate across multiple host machines" tells the LLM exactly what's in here.

The `tags` help with topic-based lookup in the MANIFEST. Pick tags that someone might search for.

The `related` field links to other files in the repo that cover related topics. This helps an LLM follow threads across the knowledge base. Only include links you're confident about — check that the files exist.

### 4. Save and Update Navigation

- Write the file to the chosen location with a descriptive filename (kebab-case, `.md` extension for text content)
- Update the directory's `README.md` to include the new file
- Update `MANIFEST.md` at the repo root (see MANIFEST section below)

## Reorganize Mode

When the user asks to review or restructure content:

### 1. Audit

Scan the target scope — either the full repo or a specific directory the user points to. Read files and understand what's there. Look for:

- **Duplicates** — files covering the same topic that should be merged
- **Misplaced content** — files in directories where they don't belong
- **Overgrown directories** — directories with too many unrelated files that should be split
- **Orphaned files** — content that isn't referenced from any README.md
- **Missing frontmatter** — files without the YAML frontmatter that helps retrieval
- **Stale content** — outdated information that might mislead

### 2. Propose Changes

Present a clear summary of what you found and what you'd like to change. Show:
- What moves where and why
- What gets merged and why
- New directories being created and what they're for
- Files getting updated frontmatter

Ask for user confirmation before executing. Don't make silent changes — the user should know what's happening to their knowledge base.

### 3. Execute

After the user approves:
- Move, merge, and split files as planned
- Update all affected `README.md` files
- Update `related` links in frontmatter if paths changed
- Regenerate `MANIFEST.md`
- Stage changes in git but don't commit — let the user review the diff

## MANIFEST.md

The MANIFEST lives at the repo root. It's a global content map designed for LLM consumption. Create it if it doesn't exist. Update it every time you add, move, or reorganize content.

Structure:

```markdown
# KM Repository Manifest

## Content Map
- coding/ — Development tools, editor configs, CLI preferences
  - coding/Codex/ — Codex settings and preferences
  - coding/tools/ — CLI tool documentation
- os-config/ — Shell and OS configuration
  - os-config/nushell/ — Nushell config and setup
- projects/ — Active project documentation
  - projects/art-designed-ai-system/ — Ceramic design AI workflow
...

## Recent Additions
- YYYY-MM-DD: path/to/file.md — Summary of what was added

## Tags Index
- docker: coding/tools/docker-networking.md, ...
- nushell: os-config/nushell/config.md, ...
- python: programming-language/python/...
```

The Content Map gives an LLM a fast structural overview. The Tags Index lets it jump to content by topic. The Recent Additions section helps track what's new.

When updating the MANIFEST, regenerate it from the actual repo state rather than trying to patch it incrementally — this avoids drift.

## Examples

**Example 1 — Saving a note:**
User: "save this: Docker containers on the same bridge network can communicate by container name. Use `docker network create mynet` then `docker run --network mynet ...`"

Action: Create `coding/tools/docker-bridge-networking.md` with frontmatter, polished content, update README.md and MANIFEST.md.

**Example 2 — Filing a config:**
User: "organize this tmux config" (pastes tmux.conf content)

Action: Save to `os-config/tmux/tmux.conf` (or similar), add README.md for the tmux directory if new, update MANIFEST.md.

**Example 3 — Reorganize request:**
User: "the coding/ folder is getting messy, can you clean it up?"

Action: Audit coding/, propose restructuring plan, wait for approval, execute.

**Example 4 — Mixed language input:**
User: "幫我存這個：在 Mac 上用 `networksetup -setwebproxy` 可以設定 HTTP proxy"

Action: Save in the user's original language (Chinese), pick appropriate location (os-config/darwin/ or similar), add frontmatter with Chinese title and English tags for cross-language retrieval.
