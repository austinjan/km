# FDE + AI Agent Core Concepts

This file is the editable source note behind `docs/concept.html`. Keep it concise: the HTML page should explain with diagrams first and short copy second.

## 1. FDE Compounding Loop

FDE turns customer workflow problems into compounding AI capability.

Loop:

1. Start from a real customer workflow.
2. Deploy an agent with tools, context, control loops, and human approval.
3. Measure customer outcomes.
4. Convert validated field learning into knowledge base entries and reusable AI assets.
5. Feed those assets back into the next agent and the product roadmap.

Core idea:

> Customer outcome -> Knowledge Base -> Agent capability -> Product capability -> Better customer outcome

## 2. Three Outcomes

Every engagement must produce or explicitly rule out three outcomes:

| Outcome | Meaning |
| --- | --- |
| Workflow outcome | The workflow is faster, more reliable, more observable, or has a measurable baseline. |
| AI asset outcome | Reusable know-how becomes a skill, runbook, eval dataset, workflow template, failure taxonomy, connector pattern, or troubleshooting tree. |
| Product learning outcome | Product, platform, onboarding, documentation, permission/data readiness, or sales expectation gaps are classified with evidence and owners. |

This keeps FDE away from demo-only delivery. A good engagement leaves operational value, reusable capability, and product evidence.

## 3. Alignment Gates

Before building an agent, align four gates:

| Gate | Check |
| --- | --- |
| People | Business owner, workflow owner, IT/security/data owner, and named UAT reviewers. |
| Material | Real examples, expected outputs, documents, logs, or sandbox data. |
| Access | Data access path, permission model, security review, and human-in-the-loop boundary. |
| Target | Baseline, target, measurement method, and acceptance threshold. |

If any gate is missing, the decision should be `iterate` or `no-go`, not "start coding and hope".

## 4. SOP to Agentic Workflow

FDE's core work is not direct automation. It is maturation:

```text
Manual SOP -> Skill or template -> Agentic workflow
```

Manual SOP captures field judgment, exceptions, handoffs, and ownership boundaries.

Skill or template packages reusable know-how, eval cases, fallback paths, and applicability limits.

Agentic workflow connects tools, data, permissions, evals, human approval, monitoring, and operating controls.

## 5. Agent Capability Stack

Agent reliability is systemic. It does not come from the model alone.

Stack:

1. Context Engineering + model
2. Tools + MCP + Function Calling
3. Eval + trace + failure taxonomy
4. Human approval + guardrails
5. Operating control

Use this concept when explaining why an AI agent can handle short, verifiable, reversible workflows earlier than long-horizon, high-risk, ambiguous workflows.
