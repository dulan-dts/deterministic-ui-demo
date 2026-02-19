# Deterministic UI Principles

Deterministic UI is a state-defined approach where component behavior is explicit, testable, and repeatable.

A component is not “correct” because it looks right.
A component is correct because it behaves according to a defined contract.


## What “deterministic” means

A deterministic component has:

- A finite set of allowed states
- Explicit inputs (props/events) that move it between states
- Defined outputs (UI + interactions) for each state
- No hidden behavior (no guessing, no implicit transitions)


## Why UI drift happens

UI drift happens when design and code share visuals but not behavior.

Common causes:

- Behavior is left to interpretation (“it should feel right”)
- State handling is inconsistent across teams and screens
- Components accumulate exceptions over time
- Loading / error / empty states are treated as afterthoughts
- AI-assisted coding amplifies ambiguity by generating plausible but inconsistent behavior


## Why behavior must be explicit

Backend systems can be verified with tests because success criteria are objective.

Frontend systems often cannot be verified because:
- “Looks right” is not a specification
- Interaction rules are not defined as constraints

Explicit behavioral contracts turn UI into something verifiable:
- Allowed states are enumerated
- Allowed transitions are defined
- Forbidden transitions are documented


## Why visual correctness is not verifiable

Visual correctness is subjective and context-dependent.

Two implementations can look similar and still behave differently:
- focus management
- keyboard handling
- disabled vs loading precedence
- dismissal rules
- error recovery rules

Deterministic UI makes behavior first-class.
Visuals are a projection of state, not the source of truth.