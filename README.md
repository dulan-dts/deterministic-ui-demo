# Deterministic UI Demo

A reference implementation of **state-defined UI**.

Every component in this repository has an explicit behavioural contract:
- allowed states
- allowed transitions
- deterministic rules enforced in code

**Goal:** make UI behaviour verifiable.

This project evolves commit-by-commit.

---

## What’s included

### Button (Commit 2)
- Contract: `contracts/button.contract.md`
- Implementation: `components/Button.tsx`

Deterministic rule enforced:

`interactive = !(disabled || loading)`

---

### Modal (Commit 3)
- Contract: `contracts/modal.contract.md`
- Implementation: `components/Modal.tsx`

Lifecycle states:

`closed → opening → open → closing → closed`

Derived rules enforced:

- `visible = state !== "closed"`
- `interactive = state === "open"`

Transition control:

- Transitions validated via a pure exported resolver
- Invalid transitions are ignored
- Lifecycle sequencing enforced independently from UI rendering

---

### Table (Commit 4)
- Contract: `contracts/table.contract.md`
- Resolver: `components/table-state.ts`
- Implementation: `components/Table.tsx`

State model:

`loading | error | empty | success`

Resolver precedence:

`loading > error > empty > success`

Derived rules enforced:

- State is computed by a pure exported function
- Rendering is strictly driven by resolved state
- No overlapping UI states

---

## Why this matters

Most UI libraries define visuals.  
This repository defines **behaviour**.

When behaviour is explicit:
- Drift becomes detectable
- Transitions become auditable
- AI-generated code becomes safer
- Refactors become predictable

---

## Architecture Principle

Components are not defined by visual variants.
They are defined by allowed state and allowed transitions.

Visual output is a projection of state — never the source of truth.

---

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.