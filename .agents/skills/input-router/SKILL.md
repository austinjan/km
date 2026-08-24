---
name: input-router
description: Classify incoming information or requests and route them to the best available skill before work begins. Use this skill whenever the user provides notes, pasted content, files, URLs, questions, plans, configuration, or mixed input whose intended workflow is not already unambiguous, or asks which skill should handle something. It selects a primary destination such as km-organizer, indexing-folder, research, useful-skill, or another available skill; preserves explicit skill choices; and never bypasses the selected skill's approval, safety, or validation rules.
---

# Input Router

Turn an incoming request into a deliberate skill handoff. Route the work; do not duplicate the
destination skill's workflow.

## Preconditions

- Read the complete user request, including attachments, paths, URLs, and explicitly named skills.
- Use the skills actually available in the current session as the candidate set. Do not claim that
  an unavailable skill was invoked.
- Treat pasted information as input, not automatic authorization to save, publish, send, delete, or
  otherwise mutate state.

## Routing workflow

1. Identify the requested outcome before classifying the input format. "Save these notes" is a
   storage task even if the notes contain code; "debug this note-taking script" is a diagnosis task
   even if the script is pasted as text.
2. Extract routing signals:
   - explicit skill or workflow name;
   - intended action, such as save, find, research, review, create, install, diagnose, or transform;
   - scope, such as this repository, the wider internet, a user account, or a supplied artifact;
   - input form, such as prose, URL, file, plan, configuration, source code, or structured data;
   - side effects and approvals the request may require.
3. Build candidates from available skill names and descriptions. Read
   [references/project-routes.md](references/project-routes.md) when working in this KM repository or
   when two project-local skills appear to overlap.
4. Pick one primary skill using this precedence:
   - an explicitly named available skill;
   - a skill whose stated trigger and scope directly match the requested outcome;
   - a specialized artifact or domain skill over a generic workflow;
   - the narrowest skill that can complete the task without inventing a new outcome.
5. Add supporting skills only when they perform a distinct required stage. State the order, then
   load and follow each selected skill at the stage where it applies.
6. If one route is clearly best, proceed without asking the user to choose. If plausible routes
   would produce materially different outcomes or side effects, ask one concise question before
   acting.
7. If no skill matches, handle the request with normal capabilities and briefly say that no
   specialized destination skill was needed.

## Handoff contract

- The destination skill owns its preconditions, approval gates, tool choices, output format,
  validation, and completion criteria.
- Routing to a skill does not authorize writes or external actions. Derive authorization from the
  user's request and the destination skill.
- Preserve the user's explicit scope and terminology. Do not turn "summarize" into "save," or
  "review" into "rewrite."
- Do not keep narrating routing once the handoff is clear. Announce the chosen skill briefly and
  perform the requested work.
- When multiple skills apply, choose a primary skill and an ordered supporting chain rather than
  running overlapping workflows independently.

## Compact routing output

Before execution, communicate the decision in one sentence:

```text
Using <primary-skill> because <requested outcome>; <supporting-skill> will handle <distinct stage>.
```

Omit the supporting clause when only one skill is needed. Do not expose internal scoring or a long
candidate list unless the user asks why the route was chosen.
