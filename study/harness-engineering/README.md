---
name: harness-engineering
description: Study notes from the "Learn Harness Engineering" course (walkinglabs) — making AI coding agents reliable by engineering the harness (everything outside the model weights), not by upgrading the model.
---

# Harness Engineering — Study Notes

Notes distilled from the **Learn Harness Engineering** course
(https://walkinglabs.github.io/learn-harness-engineering/en/), a 12-lecture
curriculum on making AI coding agents dependable. Core thesis: when agents fail,
the bottleneck is usually the **harness** (the engineering infrastructure
outside the model weights), not the model.

## Files

- [five-subsystems-framework.md](five-subsystems-framework.md) — The central mental
  model: the 5 harness subsystems (Instructions / Tools / Environment / State /
  Feedback), the canonical repo artifacts, and a critical assessment of the framework.
- [course-notes.md](course-notes.md) — Per-lecture notes for all 12 lectures
  (problem → principle → artifacts → takeaways), plus the recurring artifact set.

## One-line summary of the course

> "Establish a closed-loop working system for the model" rather than trying to
> make the model itself smarter. The repository becomes the system of record;
> what the agent cannot see effectively does not exist.

## Related

- [../AI/note.md](../AI/note.md) — AI/LLM concepts, prompt design, context engineering
- [../fde-team/](../fde-team/) — Forward Deployed Engineering playbooks (agent adoption)
