# Table Contract

A deterministic table component with explicit state resolution.

---

## Purpose

The Table component renders tabular data with fully defined behavioral states.
State is derived deterministically from input props.

No implicit UI conditions are allowed.

---

## Props

- `columns: { key: string; header: string; render?: (row: T) => React.ReactNode }[]`
- `rows?: T[]`
- `loading?: boolean`
- `error?: { message: string } | null`
- `emptyMessage?: string`
- `caption?: string`

---

## State Model

The table has exactly four mutually exclusive states:

- `loading`
- `error`
- `empty`
- `success`

---

## Deterministic State Resolver

State is derived using strict precedence:

```
if (loading) state = "loading"
else if (error) state = "error"
else if (!rows || rows.length === 0) state = "empty"
else state = "success"
```

## Resolver Function Requirement

The state resolution logic must exist as a pure exported function.

Example signature:

```
export type TableState = "loading" | "error" | "empty" | "success";

export function resolveTableState<T>(params: {
  rows?: T[];
  loading?: boolean;
  error?: { message: string } | null;
}): TableState
```

Requirements:
- Must be side-effect free
- Must not depend on UI rendering
- Must enforce precedence order strictly
- Must be testable independently from the Table component

The Table component must rely exclusively on this resolver.

### Precedence Order

`loading > error > empty > success`

This guarantees:

- No simultaneous states
- No ambiguous rendering
- No UI drift

---

## Derived Rules

- `rowCount = rows?.length ?? 0`
- `interactive = state === "success"`

---

## Rendering Rules

### loading
- Render fixed skeleton rows (deterministic count)
- No real data displayed
- Non-interactive

### error
- Render error message
- Do not render rows
- Non-interactive

### empty
- Render empty message
- Do not render rows
- Non-interactive

### success
- Render table headers
- Render all rows
- Interactive

---

## Forbidden Combinations (Prevent UI Drift)

- `loading === true` AND `error != null` → treated as `loading`
- `error != null` AND rows exist → treated as `error`
- `rows.length === 0` AND `loading === false` → treated as `empty`

Only one state may exist at any time.

---

## Invariants

- Rendering must be fully determined by derived state.
- Visual output must match contract state exactly.
- No implicit branching inside JSX outside resolver logic.

---

## Design Principle

UI correctness must be derivable from input props without inspecting rendered output.

State is explicit.
Behavior is predictable.
Rendering is verifiable.