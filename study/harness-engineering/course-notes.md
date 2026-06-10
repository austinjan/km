---
title: Learn Harness Engineering — Per-Lecture Notes (12 lectures)
tags: [harness-engineering, ai-agents, claude-code, agents-md, verification, e2e-testing, observability, llm]
created: 2026-06-10
summary: Condensed notes for all 12 lectures of the walkinglabs Harness Engineering course — each lecture as problem → principle → artifacts → takeaways. Covers why agents fail, the repo as system of record, splitting instructions, cross-session state, init phase, WIP=1, feature lists as primitives, premature completion, E2E testing, observability, and clean handoff.
related: [study/harness-engineering/five-subsystems-framework.md]
---

# Learn Harness Engineering — Per-Lecture Notes

Source: https://walkinglabs.github.io/learn-harness-engineering/en/
12 lectures. The course's recurring claim: **fix the harness, not the model.**

---

## L01 — Why Capable Agents Still Fail

- **Problem:** SOTA agents (50–60% benchmark pass) collapse on real tasks with
  vague specs, missing context, no verification. Model *capability* ≠ execution
  *reliability*.
- **Principle:** "When things fail, don't swap the model first — check the
  harness." Same model (Opus 4.5) → broken game in one run, fully playable with
  proper infrastructure.
- **Five failure layers:** (1) unclear specs, (2) implicit conventions, (3)
  incomplete environment, (4) no verification, (5) cross-session state loss.
- **Artifacts:** `AGENTS.md` (stack, conventions, verify commands); explicit
  "Definition of Done"; diagnostic logs attributing each failure to a layer.
- **Takeaway:** one good `AGENTS.md` can beat a costlier model. Build a diagnostic
  loop: execute → observe → attribute to layer → fix → repeat.

## L02 — What a Harness Actually Is

- **Problem:** People conflate "harness" with a prompt file.
- **Principle:** harness = everything outside the model weights; repo = single
  source of truth. Success = designing 5 interconnected subsystems, not better prompts.
- **Five subsystems:** Instructions / Tools / Environment / State / Feedback
  (see [five-subsystems-framework.md](five-subsystems-framework.md)).
- **Artifacts:** `AGENTS.md` (~100-line directory page), `PROGRESS.md`, verify commands.
- **Takeaway:** Feedback = lowest cost / highest return. Case: TS/React team
  20% → 80–100% success by adding harness, model unchanged. "Harness rots like code."

## L03 — Why the Repository Must Become the System of Record

- **Problem:** agents only see system prompts + repo files + tool outputs.
  Knowledge in Slack/Confluence/heads is invisible → guessing, wasted context.
- **Principle:** repo is the authoritative system of record. Not a documentation
  problem — a *placement* problem (put decision info where the agent will look).
- **Artifacts:** `AGENTS.md` (50–100 lines), per-module `ARCHITECTURE.md`,
  `PROGRESS.md`, `CONSTRAINTS.md` (MUST/MUST NOT); bind doc updates to code via CI.
- **Concepts:** **Fresh Session Test** (new session answers 5 basic Qs from repo
  alone); Knowledge Visibility Gap; ACID for state; Knowledge Decay.
- **Takeaway:** proximity > length — a 50-line doc in the right place beats 500
  buried pages. Stale docs are worse than none.

## L04 — Why One Giant Instruction File Fails

- **Problem:** instruction files bloat reactively ("add a rule" per failure). A
  600-line `AGENTS.md` wastes context, buries constraints mid-file, kills
  signal-to-noise.
- **Principle:** keep frequent info at hand, tuck away rare info, drop unused.
  Exploits "lost in the middle" + progressive disclosure.
- **Artifacts:** entry file `AGENTS.md` (50–200 lines, ≤15 hard constraints, links
  out) + topic docs `docs/*.md` (50–150 lines each, on demand). Each instruction
  records: source, applicability, expiry condition.
- **Takeaway:** entry files are **routers, not encyclopedias**. Critical
  constraints at file extremes, never the middle. Case: 45% → 72% success;
  security compliance 60% → 95%.

## L05 — Why Long-Running Tasks Lose Continuity

- **Problem:** agents lose continuity across sessions; re-explore, re-decide,
  duplicate work when context windows exhaust.
- **Principle:** bigger windows won't save you — use **structured state
  persistence**. Agents = engineers whose short-term memory resets each shift;
  document before "clocking out." Note **"context anxiety"** (Anthropic): rushed
  behavior near context limits.
- **Artifacts:** `PROGRESS.md` (latest commit, test status, done/in-progress,
  issues, next steps), `DECISIONS.md` (rationale + rejected alternatives), atomic
  git commits, `AGENTS.md` clock-in/clock-out routines.
- **Takeaway:** rebuild cost ~15 min → ~3 min with good state files. Case:
  completion 58% → 100%, rebuild time −78%. Preserve the *why* to prevent drift.

## L06 — Why Initialization Needs Its Own Phase

- **Problem:** mixing init (env/test setup) with feature work — agent favors
  visible code over infrastructure → unverified systems fail later.
- **Principle:** init and implementation have **different optimization targets**.
  First session builds infrastructure *exclusively*. Cited 31% higher multi-session
  completion.
- **Artifacts:** Startup Readiness Checklist (start commands, current state,
  structure, can start/test/see progress/pick up next); Task Breakdown file with
  acceptance criteria; clean git checkpoint marking init done; project template.
- **Takeaway:** start from templates, not empty. Init pays for itself within 3–4
  sessions. Validate via a 4-condition checklist, not lines of code.

## L07 — Why Agents Overreach and Under-Finish

- **Problem:** agents activate many tasks at once, diluting reasoning across
  unfinished work. Negative correlation between LOC generated and features finished.
- **Principle:** **WIP = 1** (Kanban / Little's Law). Only one task "active" at a
  time. Cited 37% higher completion.
- **Artifacts:** `CLAUDE.md`/`AGENTS.md` rule ("one active feature at a time");
  machine-readable scope surface (JSON/MD, states + dependency DAG); executable
  completion evidence per task (e.g. `curl -X POST /api/register | jq .status == 201`);
  **VCR** = verified / activated.
- **Takeaway:** "do less but finish" wins (REST API case: 87.5% vs 37.5%).
  Evidence must be executable, not narrative. Harness must enforce scope.

## L08 — Why Feature Lists Are Harness Primitives

- **Problem:** no shared definition of "done" → agents declare success on
  implicit standards (syntax valid) not behavior.
- **Principle:** the feature list is a **harness primitive** (a control data
  structure), not an optional plan. Scheduler, verifier, handoff reporter all
  depend on it as single source of truth. Each feature = {behavior, verify
  command, state}.
- **Artifacts:** structured JSON/MD (id, behavior, verify cmd, state, evidence);
  `CLAUDE.md` rules for location + transition rules; state machine
  `not_started/active/blocked/passing`, transitions irreversible and gated by
  successful verification.
- **Takeaway:** pass-state gating blocks self-declared completion. Granularity =
  one-session-completable. Structured tracking: +45% completion, zero duplicate
  work. Works like DB constraints — un-bypassable.

## L09 — Why Agents Declare Victory Too Early

- **Problem:** agents declare done on *local* code confidence, not *global*
  system correctness. Neural nets systematically overconfident (ICML 2017).
- **Principle:** **externalize termination judgment.** Replace "feels done" with
  execution-based verification in 3 layers: (1) syntax/static, (2) runtime
  behavior, (3) system-level. Passing unit tests ≠ done (mocks hide cross-component
  failures).
- **Artifacts:** `CLAUDE.md` Definition of Done (required verify levels);
  three-layer termination framework; actionable error messages (with fix
  instructions); **independent evaluator agent** (separate "nitpicky" checker).
- **Takeaway:** verify functionality *before* refactoring. Anthropic: separating
  worker/checker improves results despite ~30× cost. Completion basis = runtime
  signals (startup, critical path, DB consistency, resource cleanup), not appearance.

## L10 — Why End-to-End Testing Changes Results

- **Problem:** unit tests isolate components → 5 defect classes only appear when
  integrated: interface mismatch, state propagation, resource lifecycle,
  environment deps, error propagation.
- **Principle:** only E2E can prove absence of *system-level* defects. Knowing
  work faces E2E **changes how agents code** — they respect boundaries and error
  paths up front.
- **Artifacts:** layered boundaries (Types → Config → Repo → Service → Runtime →
  UI) enforced by custom lint; error-message template (what/why/how-to-fix);
  validation hierarchy where E2E is mandatory for cross-component changes.
- **Takeaway:** architectural constraints must be **executable, not documented.**
  "Review feedback promotion" — turn recurring review comments into automated
  checks. Case: E2E caught all 5 defects (15s); unit tests caught 0 (2s).

## L11 — Why Observability Belongs Inside the Harness

- **Problem:** agents act without runtime visibility → can't tell correct
  execution from plausible failure; evaluation subjective; blind retries waste
  tokens.
- **Principle:** architect observability into the harness at two layers —
  **runtime observability** (logs, traces, health checks: "what did the system
  do") and **process observability** (plans, rubrics, contracts: "why was this
  accepted").
- **Artifacts:** **Sprint Contract** (scope, verify standards, exclusions, pre-
  execution); **Evaluator Rubric** (scoring matrix → reproducible assessment);
  **Task Trace** (decision path, OpenTelemetry).
- **Takeaway:** missing observability costs 30–50% of session time on redundant
  diagnosis. Anthropic DAW experiment: 3× efficiency with full observability.
  Agents can't self-provide this — it's a core harness property, not an add-on.

## L12 — Why Every Session Must Leave a Clean State

- **Problem:** sessions accumulate debt; next session wastes 30+ min diagnosing
  state; entropy grows exponentially, degrading build/test/startup.
- **Principle:** clean state is a **necessary completion condition.** Five
  requirements: build passes, tests pass, progress recorded, no stale artifacts,
  startup paths work. "Clean up later" = never.
- **Artifacts:** **Session Exit Checklist** in `CLAUDE.md` (build/tests pass,
  feature list updated, no debug code/TODOs, standard startup path); **Quality
  Document** (A–C module grades: verification, comprehensibility, test stability,
  arch compliance).
- **Takeaway:** Lehman's Laws — change without maintenance increases complexity.
  12-week case: 97% vs 68% build pass; startup 9 min vs 60+ min. Dual-mode cleanup
  (session-end + weekly). Simplify periodically (remove constraints as models
  improve). Cleanup scripts must be **idempotent**.

---

## The recurring artifact set (across all lectures)

| File | Purpose | Lectures |
|------|---------|----------|
| `AGENTS.md` / `CLAUDE.md` | Instruction router | 1,2,3,4,5,7,9,12 |
| `docs/<topic>.md` | On-demand topic docs | 4 |
| `ARCHITECTURE.md` | Per-module structure | 3 |
| `CONSTRAINTS.md` | MUST/MUST NOT rules | 3 |
| `PROGRESS.md` | Cross-session state | 2,3,5 |
| `DECISIONS.md` | Decision rationale | 5 |
| Feature list (JSON/MD) | Scope + state machine primitive | 7,8 |
| Definition of Done | Completion criteria | 1,9 |
| Session Exit Checklist | Clean handoff | 12 |
| Sprint Contract / Rubric / Task Trace | Observability | 11 |

## Cross-cutting themes

1. **Verification gap** is the root failure mode (L01, L09) → close it with
   executable, externalized checks (L08, L10).
2. **State persistence** beats bigger context windows (L05, L06, L12).
3. **Constraints must be executable, not documented** (L07, L08, L10).
4. **Separate generation from evaluation** — independent checker agent (L09, L11).
5. **Treat the harness as code** — it rots, audit and prune (L02, L04, L12).
