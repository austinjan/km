---
name: research
description: Use this skill whenever the user asks to summarize a specific internet resource, research a specific topic, review a specific topic, compare sources, or gather current information. This skill always combines live internet references with related km repository documents. For game topics, prioritize Japanese and Chinese web resources in addition to official sources. Ask for user approval before merging related topics into one document or simplifying overgrown content.
---

# Research

Use this skill for research tasks that need both live web context and the user's existing km knowledge base.

Typical triggers:

- Summarize a URL, article, blog post, docs page, video page, forum thread, or other internet resource
- Research a specific topic
- Review a specific topic for accuracy, completeness, usefulness, or next actions
- Compare claims across sources
- Refresh an older note with current outside references

## Core Workflow

1. Clarify the research target only if the request is ambiguous enough that a reasonable assumption would be risky.
2. Search the km repo for related documents before finalizing the answer.
3. Search the internet for current and corroborating references.
4. Read the primary source or user-provided URL directly whenever one is named.
5. Synthesize the answer from both source families:
   - Existing km documents
   - External internet references
6. Report source coverage clearly:
   - Which km files were used
   - Which internet sources were used
   - Which claims are inferred rather than directly stated
7. If related km topics appear mergeable, propose the integration and ask the user before editing files.
8. If the topic has become too verbose or fragmented, propose a simplification and ask the user before rewriting files.

## Searching The KM Repo

When working inside the km repository, treat it as the user's source of truth.

Use the `indexing-folder` skill if available:

```bash
aascribe map /Users/macmini-au/code/km
aascribe search "<topic terms>" /Users/macmini-au/code/km --fixed-strings
```

If `aascribe` is unavailable, say so briefly and use the best local fallback such as `rg` to find candidate documents.

After locating candidate files, read the actual files before citing or relying on them. Do not answer from search snippets alone.

## Internet Research Rules

Always include extra internet references unless the user explicitly says not to browse.

Prefer source quality in this order:

1. Official documentation, publisher/developer posts, standards, public filings, release notes, or first-party pages
2. Primary interviews, conference talks, changelogs, and maintainer comments
3. Reputable specialist publications and long-running community references
4. Forums, social posts, and wikis as supporting evidence, not sole authority

For time-sensitive claims, include dates and make clear what was current when checked.

When summarizing a specific internet resource:

- Open and read the named resource directly.
- Summarize its main claims, useful details, and caveats.
- Add at least one additional external reference when available to corroborate, update, or challenge the resource.
- Cross-check related km documents before giving the final answer.

## Game Topic Locale Rule

For game-related topics, focus external research on Japanese and Chinese resources.

Prioritize:

- Official Japanese or Traditional Chinese game sites, patch notes, publisher announcements, X/Twitter posts, and YouTube channels
- Japanese strategy/wiki communities when relevant, such as Game8, AppMedia, Altema, Kamigame, Gamerch, WikiWiki, or game-specific wikis
- Traditional Chinese resources such as Bahamut, Gamer, 4Gamers, gamebase, official Taiwan/Hong Kong pages, and community guides
- Simplified Chinese resources such as official mainland pages, Bilibili, TapTap, NGA, and game-specific wikis when they add useful coverage

Use English sources as supplemental context, especially for official global announcements or when Japanese/Chinese coverage is thin.

## Consolidation And Simplification

When related km topics overlap:

1. Name the candidate files or topics.
2. Explain why consolidation may help retrieval or reduce duplication.
3. Propose the target structure.
4. Ask the user for approval before moving, merging, deleting, or rewriting content.

When content is too long, repetitive, or fragmented:

1. Identify what can be simplified.
2. Explain what information would be preserved.
3. Explain what would be removed or compressed.
4. Ask the user for approval before editing.

Do not silently reorganize the km repo during a research answer.

## Answer Shape

Use a compact structure unless the user asks for a full report:

```markdown
**Short Answer**
[Direct answer or summary]

**What I Checked**
- KM: [paths]
- Web: [links with dates when relevant]

**Key Findings**
- [Finding]
- [Finding]

**Caveats**
- [Uncertainty, source conflict, or missing evidence]

**Possible KM Cleanup**
- [Only include when consolidation or simplification seems useful; ask for approval before editing]
```

For review tasks, lead with the conclusion and risks. For research tasks, lead with the most decision-relevant finding.
