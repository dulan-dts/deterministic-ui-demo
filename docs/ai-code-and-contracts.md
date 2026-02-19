

# AI Code and Contracts

AI can generate UI faster than any human team.

But speed without constraints produces drift.

This document explains how behavioral contracts turn AI from a drift amplifier into a deterministic assistant.

---

## 1. The Problem: AI Optimizes for Local Correctness

When given a prompt, AI typically optimizes for:

- Rendering something plausible
- Satisfying immediate constraints
- Matching visible patterns

It does **not** inherently understand:

- Allowed state transitions
- Business invariants
- Precedence guarantees
- Architectural constraints

Without explicit rules, AI-generated UI may:

- Skip intermediate states
- Collapse multiple states into booleans
- Reorder precedence logic
- Introduce hidden edge cases

The result is subtle behavioral drift.

---

## 2. Contracts as Structural Guardrails

A behavioral contract defines:

1. Allowed states
2. Allowed transitions
3. Derived invariants
4. Precedence rules

Example (table state):

```
loading > error > empty > success
```

If AI generates code that violates this precedence,
that code is incorrect — even if it renders correctly.

Contracts give AI a reference frame.

---

## 3. Deterministic Prompts

When prompting AI to implement a component, the contract should be included explicitly.

Example prompt structure:

```
Implement a table component.

Contract:
- States: loading | error | empty | success
- Precedence: loading > error > empty > success
- Derived helpers must exist.
- No implicit boolean branching.
```

AI is far more reliable when the invariant is explicit.

Without the contract, AI guesses.
With the contract, AI aligns.

---

## 4. Tests as Enforcement

Contracts should not live only in documentation.

They must be enforced through:

- State resolver functions
- Guarded transition helpers
- Automated tests

In this repository:

- `modal-state.test.ts` verifies transition rules
- `table-state.test.ts` verifies precedence and invariants

If AI-generated code violates the contract,
tests fail immediately.

This is deterministic safety.

---

## 5. AI as a Deterministic Collaborator

AI is not the problem.

Unconstrained generation is.

When behavioral contracts are defined:

- AI accelerates implementation
- Architecture remains stable
- Drift cannot accumulate silently
- Refactors remain safe

AI becomes an implementation assistant,
not an architectural decision-maker.

---

## 6. The Discipline

Deterministic UI requires:

- Explicit contracts
- Guarded transitions
- Precedence definition
- Test enforcement
- Prompt discipline

AI fits into this model naturally.

Without contracts, AI scales inconsistency.
With contracts, AI scales correctness.