# modal.contract.md

Component: **Modal**

Purpose: A controlled overlay where **visibility and interactivity are derived from explicit lifecycle state**.

---

## 1) Non‑goals
- Managing business outcomes (success/failure belongs to parent)
- Owning lifecycle state internally (no hidden `useState`)
- Navigation or routing concerns

---

## 2) Props (public API)

### Required
- `state: "closed" | "opening" | "open" | "closing"`

### Optional
- `onClose?: () => void`
- `children?: ReactNode`

---

## 3) Derived rules (deterministic)
These rules must be enforced in code.

1. **Visible** is derived:
   - `visible = state !== "closed"`
2. **Interactive** is derived:
   - `interactive = state === "open"`
3. When `interactive === false`:
   - The modal must not be dismissible
   - Backdrop clicks must not close
   - Close actions must not be rendered/available
4. The component must not mutate lifecycle state.
   - All state transitions are controlled by the parent.

---

## 4) State model

| State | Visible | Interactive | Meaning |
|---|---:|---:|---|
| `closed` | no | no | Not rendered |
| `opening` | yes | no | Enter transition in progress |
| `open` | yes | yes | Fully visible and interactive |
| `closing` | yes | no | Exit transition in progress |

---

## 5) Allowed transitions

| From | To | Trigger |
|---|---|---|
| `closed` | `opening` | parent opens modal |
| `opening` | `open` | enter transition completes |
| `open` | `closing` | user requests close (if `onClose` provided) OR parent closes |
| `closing` | `closed` | exit transition completes |

Forbidden:
- `closed` → `open` (must pass through `opening`)
- `open` → `closed` (must pass through `closing`)
- Any transition caused by hover/press/focus

---

## 6) Dismissal contract

- Dismissal is only possible in `open` state.
- If `onClose` is not provided, the modal is not dismissible.

Dismissal triggers (when allowed):
- Backdrop click
- Explicit Close control

(Keyboard dismissal such as `Escape` may be added later; if added, it must follow the same rule: allowed only when `state === "open"`.)

---

## 7) Accessibility guarantees
- Uses `role="dialog"` and `aria-modal="true"` on the panel.
- Backdrop must not intercept clicks inside the panel (stop propagation).
- Focus management is intentionally minimal in this demo.

---

## 8) Implementation mapping
- File: `components/Modal.tsx`
- Contract file: `contracts/modal.contract.md`

A PR is not complete unless:
1) The derived rules are enforced (`visible`, `interactive`).
2) Backdrop dismissal obeys the contract.