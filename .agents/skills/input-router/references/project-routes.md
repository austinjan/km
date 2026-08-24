# KM project routes

Use this catalog to resolve common overlaps in the KM repository. Confirm that a named skill is
available before selecting it; live skill metadata is authoritative when this catalog drifts.

| Requested outcome | Primary skill | Boundary |
| --- | --- | --- |
| Save, file, categorize, polish, or reorganize knowledge for later retrieval | `km-organizer` | Do not infer storage merely because content was pasted; look for a storage or organization outcome. |
| Answer a repository-scoped question, locate related files, or confirm exact mentions | `indexing-folder` | Use the index to route, then inspect source files for proof. |
| Research, summarize, compare, or refresh a topic using live internet sources | `research` | This workflow also checks related KM documents; do not add `indexing-folder` as a separate primary route. |
| Review or improve an existing brainstorm or implementation plan | `useful-skill` | Review readiness and edit proportionately; do not begin implementation. |
| Create, modify, evaluate, or optimize an agent skill | `skill-creator` | Keep the new or changed skill in the canonical project layout when project scope is requested. |
| Install command-line utilities for Bash or Zsh | `bash-install-utils` | Use only for supported shell utilities and integrations. |
| Install utilities or integrations for Nushell | `nushell-install-utils` | Prefer this over the Bash/Zsh installer when Nushell is the target shell. |
| Push, pull, or diff Nushell configuration | `nushell-config-sync` | This routes configuration synchronization, not utility installation. |
| Create, update, or archive a feature plan | `managing-feature-plans` | Prefer `useful-skill` when the request is specifically to critique an existing plan before work. |
| Analyze an implemented feature and produce an implementation report | `analyzing-feature-implementations` | Use for implementation evidence, not plan review. |

## Overlap rules

- Saving research results is a two-stage chain only when the user asks for both: `research` first,
  then `km-organizer` for the approved result.
- A repository question that later becomes an edit uses `indexing-folder` for evidence, then the
  skill that owns the requested change.
- An explicit available skill choice wins unless it conflicts with a higher-priority instruction or
  cannot perform the requested outcome.
- If input contains sensitive, private, or credential-like material, do not reproduce it in routing
  commentary and do not persist it without clear authorization.
