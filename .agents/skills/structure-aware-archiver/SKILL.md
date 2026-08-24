---
name: structure-aware-archiver
description: Classify files or supplied information against the computer's existing directory structure, archive each item into the best semantic folder, and create required metadata for archive time, summary, and tags. Use when the user asks to classify, file, sort, or archive information based primarily on folders already present on the local machine or in a chosen archive root.
---

# Structure-aware archiver

Use the archive root's real directory tree as the primary taxonomy. Content type,
keywords, and tags refine placement; they do not replace the existing structure
with a new abstract category system.

The bundled helper requires Python 3.9 or newer. Filesystem inspection tools are
optional; use the tools and repository-specific router available in the environment.

## Establish the archive root

- Honor an archive root named by the user.
- Otherwise use the current project only when the request clearly concerns it.
- If multiple materially different roots are plausible, inspect them read-only and
  ask the user to choose before writing.
- Follow the target repository's local instructions and navigation tools. In a KM
  repository, read its root navigation and the relevant folder README files.

## Classify against the filesystem

1. Inspect the archive root to a useful bounded depth. Ignore hidden VCS data,
   caches, dependency trees, generated output, trash, secrets, and temporary data.
2. Read the input and the smallest set of candidate folder descriptions needed to
   understand their ownership.
3. Prefer the most specific existing folder whose documented or observed purpose
   fits the input. Use the actual relative folder path as the primary category.
4. Use tags for cross-cutting concepts such as platform, tool, project, format, or
   status. Do not create parallel top-level taxonomies merely to encode tags.
5. Create a new folder only when no existing folder fits. Explain its intended
   scope and add or update local navigation when the archive root requires it.
6. When confidence is low or two placements have materially different meanings,
   show the candidates and ask before writing.

## Plan before mutation

For multiple files, moves, or newly created folders, show a concise mapping of
source to destination with the classification reason. Treat copy as the default.
Move or delete originals only when the user explicitly requests it. Never overwrite
an existing file or metadata sidecar silently.

Run the bundled helper once with `--dry-run` before each actual file operation:

```bash
python scripts/archive_file.py SOURCE DESTINATION_DIR \
  --archive-root ARCHIVE_ROOT \
  --summary "One useful sentence" \
  --tag topic --tag format \
  --dry-run
```

Remove `--dry-run` only after the destination and metadata are correct. The helper
copies by default; pass `--mode move` only with explicit authorization. It requires
an existing destination directory unless `--create-destination` is deliberately
used for an approved new folder.

## Metadata contract

Every archived file must have an adjacent `<filename>.metadata.yaml` sidecar,
including Markdown files. This preserves original bytes and applies consistently
to text, images, PDFs, databases, and other formats.

Read [references/metadata-schema.md](references/metadata-schema.md) when creating,
validating, migrating, or explaining metadata. At minimum:

- `archived_at`: timezone-aware ISO 8601 timestamp
- `summary`: specific one-sentence introduction
- `tags`: deduplicated, non-empty search terms

The helper also records source provenance, destination category, and a SHA-256
digest. Describe facts visible in the input; do not invent provenance or sensitive
metadata. Do not include credentials, tokens, or secret values in summaries/tags.

## Complete the archive

- Verify the archived file hash matches the recorded digest and that the sidecar
  parses as YAML-compatible data.
- Update the destination folder's navigation and repository-wide manifest when
  local instructions require it.
- Report the chosen primary category, destination, metadata path, copy/move mode,
  and any files skipped or left unresolved.
