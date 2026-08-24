# Archive metadata schema

Create one UTF-8 YAML sidecar beside every archived file. For an archived file
named `example.pdf`, use `example.pdf.metadata.yaml`.

```yaml
schema_version: 1
archived_at: "2026-08-24T15:30:00+08:00"
summary: "Specific one-sentence description of the archived content."
tags:
  - "topic"
  - "format"
source:
  original_path: "/absolute/path/to/example.pdf"
  sha256: "64-lowercase-hex-characters"
destination:
  relative_path: "existing/category/example.pdf"
  primary_category: "existing/category"
operation: "copy"
```

## Field rules

- `schema_version`: integer `1` for this contract.
- `archived_at`: the time the archive operation completed, expressed as ISO 8601
  with an explicit UTC offset.
- `summary`: one factual, useful sentence. Avoid generic descriptions such as
  "archived file" and avoid exposing secret content.
- `tags`: a YAML sequence with at least one unique, non-blank term. Prefer stable
  vocabulary that improves retrieval; preserve domain-specific casing when useful.
- `source.original_path`: resolved source path at archive time. If disclosing an
  absolute path is unsafe in the target archive, replace it with an approved opaque
  source identifier and document that local policy.
- `source.sha256`: digest of the archived file bytes.
- `destination.relative_path`: path relative to the chosen archive root.
- `destination.primary_category`: the existing relative directory path used as the
  main classification; use `.` only when the archive root itself is intentional.
- `operation`: `copy` or `move`.

Sidecars are authoritative for archive metadata. Do not duplicate these fields in
document frontmatter unless the destination repository independently requires it.
