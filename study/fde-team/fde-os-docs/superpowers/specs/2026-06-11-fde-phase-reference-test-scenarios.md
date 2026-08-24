---
title: FDE Engagement Skill — Phase Gate Test Scenarios
date: 2026-06-11
status: draft
purpose: Manual test inputs for checking that the fde-engagement skill loads the right phase reference, asks the right intake questions, identifies missing evidence, and reaches the correct gate decision.
---

# FDE Engagement Skill — Test Scenarios

## How to use

Paste a scenario's **Prompt** into a fresh session (skill available). Then grade
the response against the **Expect** block. A scenario passes only if the skill:

1. Loads the correct phase reference (right `references/<phase>.md`).
2. Asks the listed **intake questions** (or clearly equivalent ones) instead of
   assuming missing facts.
3. Identifies the **missing evidence / blocker** named in the scenario.
4. Reaches the **gate decision** in Expect (or correctly refuses to decide and
   asks for the missing evidence).
5. Names the right **deliverables** with convention-correct filenames
   (bare doc-type slugs, dated qualifiers where required).

Grade each on a simple Pass / Partial / Fail and note what it missed.

---

## Phase 0 — Qualification

### Q1. Healthy Go
**Prompt:** "New FDE opportunity. A logistics customer wants an agent to triage
inbound carrier-delay emails. The ops director (will be accountable) and the lead
dispatcher (runs it daily) are both committed. IT has agreed a sandbox with sample
emails in two weeks. Three dispatchers will do UAT, ~3 hrs each. They accept the
agent suggesting a reply for a human to approve. Baseline: average triage time is
9 min/email from the ticket system; target 3 min. Qualify it."
**Expect:** loads `qualification.md`; runs Section A kill switch (clear), scores
D1–D7 all ≥1 with subtotal ≥11 → **Go**; produces `customer-readiness-scorecard.md`
and `workflow-candidate-list.md`; flags the 2-week sandbox access as a tracked risk.

### Q2. Hard-blocker No-go
**Prompt:** "Customer wants an AI agent over their patient records, but legal
prohibits any external LLM call and there's no internal/local model available.
Everything else looks fine. Should we take it?"
**Expect:** Section A hard-blocker triggers → **No-go** regardless of other
dimensions; produces `customer-readiness-scorecard.md` + `no-go-report.md`; does
NOT produce `workflow-candidate-list.md`; records re-evaluation condition.

### Q3. Iterate (named users, no time commitment)
**Prompt:** "Promising workflow, real owner, good sandbox plan, clear metric with
baseline. The customer has named three reviewers and their roles, but has not yet
secured any time commitment from them. Qualify."
**Expect:** D5 = named list but no time commitment → scores 1 (not 0) → **Iterate**,
not Go; asks for hour commitments; records missing evidence, owner, recheck date;
does not advance to discovery.
**Contrast (rubric boundary):** if *no* users were named at all (D5 = 0), the
scorecard rule "any dimension = 0 → No-go" fires and the correct decision is
**No-go**, not Iterate. Named-but-uncommitted is Iterate; nobody-named is No-go.

---

## Phase 1 — Workflow Discovery

### D1. Scope-too-broad → Iterate
**Prompt:** "We're qualified (Go). The customer wants us to 'automate the whole
support inbox.' Let's start discovery."
**Expect:** loads `workflow-discovery.md`; asks the workflow-selection intake
questions; pushes to narrow to one high-volume/high-pain path; **Iterate** (recut
scope) rather than proceeding; explains scope creep is the most common Phase 1
failure.

### D2. No baseline data, plan drafted → Go with plan
**Prompt:** "Discovery for an invoice-exception workflow. Owner confirmed scope,
data and tools are reachable in sandbox, approval points are clear. There's no
existing metric — nobody measures handling time today — but the FDE has drafted a
two-week timestamp-sampling plan to capture the baseline during prototype, with an
owner and dates."
**Expect:** does NOT treat missing baseline as No-go; **Go** with the baseline plan
as carried work; produces `success-metrics-and-baseline.md` with the plan, plus the
other discovery deliverables.
**Contrast:** if *no* baseline plan exists yet (just "nobody measures it today"),
the skill should hold at **Iterate** until a concrete capture plan with owner and
recheck date is defined — a missing baseline *plan* is a gap, not a Go.

---

## Phase 2 — Prototype / Tracer Bullet

### P1. Go pilot
**Prompt:** "Prototype done: one real happy path on sandbox data, every tool call
logged, 35 eval cases at 78% task completion, zero critical security errors, 4
reviewers say it's useful. Draft skill asset and gap report v1 exist. What's the
gate?"
**Expect:** loads `prototype-tracer-bullet.md`; checks bars (≥30 evals, ≥70%
completion, zero critical security errors, traced, reviewers) — all met →
**Go pilot**; confirms prototype is labeled not-production.

### P2. Security error blocks despite high score
**Prompt:** "Prototype hits 85% task completion and reviewers love it — but in one
run the agent wrote to a production record without approval. Go to pilot?"
**Expect:** **does not** Go on the high score; a critical security error blocks the
gate; **Iterate** (or hold) with the unsafe control named and fixed before
reporting completion; references the safety rule.

### P3. Stop
**Prompt:** "After the prototype, the customer won't grant any further data access
or provide UAT users, and the workflow turns out to need judgment the agent can't
replicate. Gate?"
**Expect:** **Stop**; finalizes eval/trace/failure-taxonomy as evidence; summarizes
three outcomes incl. why not agent-suitable; treats Stop as a valid documented
result, not a deletion.

---

## Phase 3 — Controlled Pilot

### PL1. Go production
**Prompt:** "Pilot ran 3 weeks, 12 real users, 140 cases. The permission model,
audit trail, approval queue, and rollback were all confirmed in place before users
started. No critical incidents, acceptance 64%, cycle time down 22%, a non-author
operator ran the skill from docs, customer made a go decision. Gate?"
**Expect:** loads `controlled-pilot.md`; controls confirmed and bars met →
**Go production**; pilot retrospective traces numbers to weekly reports.
**Contrast:** if the prompt does *not* state that permission/audit/rollback were in
place, the skill should refuse to assume them and hold at **Iterate** (or ask),
because controls are a hard gate it must not guess.

### PL2. Product-gap Stop vs Iterate
**Prompt:** "Pilot shows clear value, but production can't be safe until the
product ships a missing audit-export feature that only R&D can build. Meanwhile
adoption is fine. Gate?"
**Expect:** distinguishes core product gap → **Stop** (route to product owner with
evidence) rather than forcing a fragile workaround as Iterate; produces
`product-platform-backlog-recommendation.md` with owner.

---

## Phase 4 — Production Rollout

### PR1. Delay (untested rollback)
**Prompt:** "Ready to launch: security signed, monitoring live, operators trained,
owners named. But rollback has never actually been exercised. Launch?"
**Expect:** loads `production-rollout.md`; **Delay**, not Launch — names the
untested rollback as the blocker with an owner and recheck; requires exercising
rollback in the stabilization window.

### PR2. Stop (no owner)
**Prompt:** "Customer wants to launch but won't name anyone to own production
day-to-day; they expect us to run it indefinitely. Launch?"
**Expect:** **Stop** (structural: no production owner); does not accept "the team
will own it"; requires named production/technical/business owners.

---

## Phase 5 — Generalize

### G1. Complete with honest no-reuse
**Prompt:** "Engagement shipped. Workflow outcome recorded, all gaps routed to
named owners, retrospective done. But the agent was genuinely one-off — nothing
reusable for another customer. Are we done generalizing?"
**Expect:** loads `generalize.md`; **Complete** is valid with the asset explicitly
ruled out and the reason recorded; does not invent a fake reusable pattern;
`build-prove-generalize-retrospective.md` produced.

### G2. Gap without a real owner
**Prompt:** "Generalize: we have a strong reusable connector pattern and three
product gaps. For the gaps we wrote 'platform will handle.' Complete?"
**Expect:** **not Complete** — "platform will handle" is not an owner; asks for
named owners + status per gap; graduates the mature pattern to `skills/` with
`origin_engagement` + `version`, referenced as `skills/<name>@<version>`.

---

## Phase 6 — Post-Launch Retainer

### R1. Continue (healthy, bounded)
**Prompt:** "Monthly retainer check: SLA met, one critical incident with a
postmortem, changes logged and versioned, backlog prioritized, gap follow-up owned.
Status?"
**Expect:** loads `post-launch-retainer.md`; **Continue**; produces
`monthly-operation-report__YYYY-MM.md` and `incident-postmortem__INC-...md` with
correct dated qualifiers.

### R2. Scope-creep catch
**Prompt:** "During the retainer the customer asks us to 'just also build the agent
for their procurement workflow while we're here.' Fold it into the retainer?"
**Expect:** flags this as **out of retainer scope** (a new workflow); routes it back
to Phase 0/1 as a new engagement instead of absorbing it; keeps the retainer
boundary intact.

---

## Cross-cutting checks (apply to every scenario)

- Did it produce / reference the **three outcomes** (workflow, AI asset, product
  learning), or note missing evidence + owner where one is absent?
- Did it use **convention-correct filenames** (bare doc-type slugs; dated
  qualifiers for weekly/monthly/incident/release docs)?
- Did it **refuse to guess** missing owners, baselines, approval points, or metrics,
  and ask instead?
- For a No-go/Stop, did it treat the result as a **valid documented outcome** with
  preserved evidence, not a failure to hide?
