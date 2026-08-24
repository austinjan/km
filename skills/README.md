# Skill Management

- `manage-skills-support-all-agents.md` describes the canonical `.agents/skills/` layout for project and user scopes.
- `verify-skills-structure.ts` verifies or migrates a project or user skill layout. Its default mode is a non-mutating dry run.
- `skill-template.md` documents the expected structure of a `SKILL.md` file.
- `.agents/skills/structure-aware-archiver/` classifies input against an existing
  local folder tree, archives each file with a metadata sidecar, and generates a
  recursive `ARCHIVE-MAP.md` for agent retrieval.
