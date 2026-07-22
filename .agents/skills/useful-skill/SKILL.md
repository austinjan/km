---
name: useful-skill
description: Review and improve brainstorm or plan documents through a structured clarity, completeness, specificity, YAGNI, and user-intent assessment. Use this skill whenever the user asks to review, refine, improve, simplify, critique, or stress-check a brainstorm or implementation plan before work begins, including requests that mention useful-skill, review-doc, document review, plan review, or brainstorm review. Read the named document or find the newest file in docs/brainstorms or docs/plans, auto-fix only minor issues, obtain approval before substantive changes, and update the original document inline.
---

# Review a brainstorm or plan document

Improve an existing planning document without turning the review into a rewrite or expanding the
project. The aim is to make the document ready for its next step: a brainstorm should be plan-ready,
and a plan should be implementation-ready.

## 1. Select the document

If the user provides a path, read that file completely.

If no path is provided:

1. Look for files under `docs/brainstorms/` and `docs/plans/` in the current project.
2. Select the most recently modified brainstorm or plan when one is clearly the current document.
3. Tell the user which document was selected.
4. If no document exists, or several candidates are equally plausible, ask the user which document
   to review before continuing.

Read the applicable repository instructions and any directly linked requirements needed to judge the
document. Do not begin implementation of the plan.

## 2. Assess before editing

Read the whole document and record findings without fixing them yet. Ask:

- What is unclear?
- What is unnecessary?
- What decision is being avoided?
- What assumptions are unstated?
- Where could scope accidentally expand?

Distinguish evidence from preference. Check the repository when a claim about existing code,
contracts, or constraints is inexpensive to verify. Do not invent requirements merely to make the
document appear more complete.

## 3. Evaluate quality

Score each criterion from 1 to 5 and give one concise reason:

| Criterion   | Check                                                                                 |
| ----------- | ------------------------------------------------------------------------------------- |
| Clarity     | Problem and outcome are clear; vague language such as probably, consider, or try is absent |
| Completeness | Required sections, constraints, dependencies, and genuine open questions are present |
| Specificity | The next step can proceed without the implementer guessing key behavior               |
| YAGNI       | The document chooses the simplest sufficient approach and avoids hypothetical features |

When the review follows a brainstorm or planning workflow, also score **User intent fidelity**:
the document reflects the decisions actually discussed, and meaningful assumptions were validated
rather than silently introduced.

Do not treat length as quality. A shorter document may be more complete when it makes the important
decisions explicit.

## 4. Identify the critical improvement

Choose at most one **must address** item: the issue whose resolution would most improve readiness or
prevent incorrect implementation. State why it matters and what decision or clarification is needed.

If no issue clearly deserves that priority, say that there is no must-address finding. Do not inflate
a minor preference into a blocker.

## 5. Present findings and edit proportionately

Present a compact review containing:

1. Overall readiness.
2. The scorecard.
3. The must-address item, if any.
4. Other findings grouped as unclear, unnecessary, unstated assumption, avoided decision, or scope
   risk.
5. Minor edits already made.
6. Substantive edits awaiting approval.

Then apply changes according to their impact:

### Minor changes

Fix these in the original document without asking first:

- Grammar, spelling, and formatting.
- Removing vague filler without changing meaning.
- Making an already-decided statement explicit.
- Correcting an obvious internal inconsistency when the intended meaning is unambiguous.

Report the edits after applying them.

### Substantive changes

Ask for approval before:

- Restructuring the document.
- Removing meaningful sections or requirements.
- Resolving an open decision.
- Changing scope, behavior, architecture, constraints, or acceptance criteria.
- Adding requirements not already discussed.

Explain the proposed change and its consequence in one concise question. Stop and wait for the
answer when the choice materially affects the document.

After approval, update the original document inline. Do not create a separate review file, findings
file, or metadata section.

## Simplify deliberately

Simplify when content serves hypothetical future needs, repeats another source without adding a
decision, exceeds what the next step needs, or introduces structure with no practical benefit.

Retain constraints, implementation-affecting edge cases, rationale for rejected alternatives, and
open questions that genuinely require resolution. Simplification is removal of unnecessary
complexity, not shortening for its own sake.

## Boundaries

- Do not rewrite the entire document.
- Do not implement the plan.
- Do not add new sections or requirements the user did not discuss.
- Do not over-engineer the review process or the plan.
- Preserve the document's terminology and voice unless clarity requires a local correction.
- Preserve unrelated user edits in a dirty worktree.
- Follow repository validation requirements after modifying the document; state which checks ran.

## Finish the review

After approved changes are applied, summarize the document's readiness and ask the user to choose:

1. **Refine again** — run another review pass.
2. **Review complete** — the document is ready for its next workflow.

After two refinement passes, recommend **Review complete** because additional passes are likely to
have diminishing returns, while still allowing the user to continue.

Return control to the calling workflow or user after their selection.
