---
name: indexing-folder
description: Use this skill as the default repo-scoped question-answering and file-routing tool whenever the user asks about how something is handled in the current repository or folder, wants to find files related to a topic, asks whether a folder mentions a concept, or needs exact line-level confirmation. Do this even when the user does not mention aascribe, index, map, or search. The skill uses aascribe map for semantic routing, aascribe search for exact matches and line numbers, then direct file inspection for final proof. Also use it when the user explicitly asks to index a folder, inspect an index map, refresh summaries, or check async indexing operations.
---

# aascribe Index Skill

Use this skill when you need to answer a question from evidence in a repository or folder, find likely related files, confirm exact mentions, build or refresh an `aascribe` index, inspect the folder map, or monitor an async indexing operation.

Typical trigger examples:

- The user asks how a topic is handled in this project, such as "how is zsh configured here?"
- The user asks which files are related to a feature, concept, command, error, or setup flow.
- The user asks whether this folder mentions a term, file path, setting, or API.
- The user asks for line numbers, snippets, exact mentions, or every occurrence inside a repo scope.
- The user asks to understand, orient around, or inspect a local folder before answering.

## What aascribe Gives You

`aascribe index` scans a directory, summarizes direct files per folder, and writes local metadata files named `.aascribe_index_meta.json` beside indexed directories.

`aascribe map` reads those metadata files and returns a routing overview. Use the map to decide which folders or files to inspect next. The map is not a substitute for reading the target source file when precision matters.

`aascribe search` performs exact text search with line-level matches. Use it only when the task needs exact mentions, line numbers, snippets, or exhaustive confirmation. First use `map` to narrow the scope, then search the smallest plausible subtree. It prefers system search tools in this order: `rg`, `git grep`, `grep`, then built-in search.

Default to running with summaries. Use `--no-summary` only when you need a structural overview and will inspect files manually anyway. Content questions, such as "what does X cover?" or "where is Y discussed?", require summaries.

The default store is `./data/memory` in the current working directory, unless `AASCRIBE_STORE` or `--store <path>` is set.

## Binary Location

This skill assumes the `aascribe` binary is bundled with the skill at:

```text
.agents/skills/indexing-folder/bin/aascribe
```

On Windows, the binary may be:

```text
.agents/skills/indexing-folder/bin/aascribe.exe
```

When running commands from a repository root, prefer that bundled binary instead of assuming `aascribe` is on `PATH`.

```bash
AASCRIBE=./.agents/skills/indexing-folder/bin/aascribe
"$AASCRIBE" --version
```

If the bundled binary is unavailable, fall back to `aascribe` on `PATH` only after checking it exists.

```bash
command -v aascribe
```

## Standard Workflow

1. Initialize the project store if this repository has not used `aascribe` before.

```bash
"$AASCRIBE" init
```

This creates `./data/config/config.toml` with a Gemini config template.
For LLM-backed summaries, ensure the configured secret exists before indexing:

```bash
export GEMINI_API_KEY="your-real-key"
```

If the secret is unavailable and the user only needs structure, use the structural-only workflow below.

2. Index the target folder.

```bash
"$AASCRIBE" index <folder> --depth 2
```

Use `--no-summary` for a fast structural pass.

```bash
"$AASCRIBE" index <folder> --depth 2 --no-summary
```

Use `--refresh` when summaries may be stale and you want to regenerate them.

```bash
"$AASCRIBE" index <folder> --depth 2 --refresh
```

3. Read the folder map.

```bash
"$AASCRIBE" map <folder>
```

Use JSON when another tool or agent needs to parse the map.

```bash
"$AASCRIBE" --format json map <folder>
```

4. Use the map to pick the smallest plausible scope.

Look for folder summaries, file summaries, and node state:

- `ready`: metadata exists and can be used for routing.
- `dirty`: metadata exists but was marked stale; re-run `"$AASCRIBE" index`.
- `unindexed`: metadata is missing; inspect directly or run `"$AASCRIBE" index` on that folder.

Use folder and file summaries to narrow from the initial folder to a relevant subtree or a small set of likely files. If the map already answers the routing question, inspect those files directly; `search` is not a mandatory next step. Read the actual files with normal filesystem tools before making code changes or final claims.

5. Confirm exact mentions only when the task requires them.

```bash
"$AASCRIBE" search <query> <folder> --fixed-strings
```

Set `<folder>` to the narrowed subtree from the map whenever possible. Search the repository root only when:

- the map cannot narrow the topic reliably;
- the user asks whether a term appears anywhere in the repository; or
- complete repository-wide coverage is part of the requested result.

Use `--ignore-case` for case-insensitive lookup, and repeat `--glob <pattern>` to narrow file types.

```bash
"$AASCRIBE" search "GEMINI_API_KEY" . --fixed-strings --glob "*.go"
```

6. Check what needs re-indexing when unsure.

```bash
"$AASCRIBE" index eval <folder>
```

If the result says files or folders need indexing, run:

```bash
"$AASCRIBE" index <folder>
```

## Async Indexing

Use async indexing for large folders or slower summarization runs.

```bash
"$AASCRIBE" index --async <folder>
```

The command returns an `operation_id`. Use it to inspect progress and results.

```bash
"$AASCRIBE" operation status <operation-id>
"$AASCRIBE" operation events <operation-id>
"$AASCRIBE" operation result <operation-id>
```

If `operation result` includes an `output_id`, inspect the stored payload with:

```bash
"$AASCRIBE" output show <output-id>
"$AASCRIBE" output slice <output-id> --offset 0 --limit 4000
```

To list known operations:

```bash
"$AASCRIBE" operation list
```

To cancel a pending or running operation:

```bash
"$AASCRIBE" operation cancel <operation-id>
```

Do not cancel completed, failed, or already useful operations unless the user asks.

## Finding Related Files

Use this decision sequence when asked to find relevant implementation files:

1. If the concept's location is unknown, run `map` on the current scope.
2. If the map identifies likely folders or files, narrow to them and inspect their source.
3. If exact wording, configuration, symbols, or line numbers matter, run `search` inside the narrowed subtree.
4. If the user requests exhaustive coverage, or the map cannot narrow the scope, widen the search deliberately.

Start with:

```bash
"$AASCRIBE" index . --depth 2
"$AASCRIBE" map .
```

Then inspect the folders that look relevant. If a folder is `unindexed` or too broad, index and map it more directly:

```bash
"$AASCRIBE" index ./internal/index --depth 2
"$AASCRIBE" map ./internal/index
```

If the narrowed map points to `./internal/index`, search there instead of searching the whole repository:

```bash
"$AASCRIBE" search "operation_id|PathIndexTree|\\.aascribe_index_meta" ./internal/index
```

The map helps choose where to look; source reads establish meaning; `search` provides exact textual confirmation when needed.

## Samples

### Structural-Only Orientation

```bash
"$AASCRIBE" index . --depth 2 --no-summary
"$AASCRIBE" map .
```

Use this when you only need a fast folder structure overview and will inspect files manually.

### Summarized Index For A Subtree

```bash
"$AASCRIBE" index ./internal --depth 2 --include '*.go'
"$AASCRIBE" map ./internal
```

Use this when you need summaries for a specific implementation area.

### Large Folder With Operation Tracking

```bash
"$AASCRIBE" index --async ./docs
"$AASCRIBE" operation list
"$AASCRIBE" operation status <operation-id>
"$AASCRIBE" operation events <operation-id>
"$AASCRIBE" operation result <operation-id>
```

Use this when indexing might take long enough that progress and restart-safe state matter.

### Refresh Stale Metadata

```bash
"$AASCRIBE" index eval ./internal
"$AASCRIBE" index ./internal --refresh
"$AASCRIBE" map ./internal
```

Use this when the map looks old or the code has changed substantially.

### Exact Confirmation After Routing

```bash
"$AASCRIBE" map .
"$AASCRIBE" search "zprofile" ./os-config --fixed-strings
```

Use this when the map identifies likely folders but the user needs exact mentions, snippets, or line numbers.

## Safety Notes

- `"$AASCRIBE" map` is a routing overview, not proof. Always inspect source files for exact behavior.
- Do not use `"$AASCRIBE" map` as proof of absence. If the user asks for exact mentions, line numbers, or every occurrence, use `"$AASCRIBE" search` and then read matched files as needed.
- `"$AASCRIBE" index` writes `.aascribe_index_meta.json` files into indexed directories.
- `"$AASCRIBE" index clean <folder> --dry-run --force` shows generated metadata files that would be removed.
- `"$AASCRIBE" index clean <folder> --force` removes generated metadata files. Use it only when cleanup is intended.
- Keep `--concurrency` modest if the LLM backend or local machine is the bottleneck.
