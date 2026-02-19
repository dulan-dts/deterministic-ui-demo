# button.contract.md

Component: **Button**

Purpose: A deterministic action trigger where **behavior is explicit and verifiable**.

---

## 1) Non‑goals
- Navigation (use a Link / nav component)
- Multi-action layouts inside a button
- Business logic (decisioning happens outside)

---

## 2) Props (public API)

### Required
- `label: string`
- `onClick: () => void`

### Optional
- `variant?: "primary" | "secondary" | "destructive"` (default: `primary`)
- `size?: "sm" | "md" | "lg"` (default: `md`)
- `fullWidth?: boolean` (default: `false`)
- `disabled?: boolean` (default: `false`)
- `loading?: boolean` (default: `false`)
- `leadingIcon?: ReactNode`
- `trailingIcon?: ReactNode`

---

## 3) Derived rules (deterministic)
These rules must be enforced in code.

1. **Interactive** is derived:
   - `interactive = !(disabled || loading)`
2. If `loading === true` then:
   - The button **must not fire** `onClick`
   - The button **must present** a loading indicator
   - The button **must preserve width** (no layout jump)
3. If `disabled === true` then:
   - The button is not focusable via Tab (native `disabled` behavior)
4. Variant and size are **visual only** and must not change behavior.

---

## 4) State model

### 4.1 Application-owned states (truth)
| State | When true | Interaction |
|---|---|---|
| `enabled` | `!disabled && !loading` | Clickable + focusable |
| `disabled` | `disabled === true` | Not clickable; not focusable |
| `loading` | `loading === true` | Not clickable; not focusable |

> Only one of these three states can be true at a time. (`loading` and `disabled` are mutually exclusive in practice; if both are passed, `loading` wins for rendering but interaction must still be disabled.)

### 4.2 Interaction states (visual-only)
These never change the truth state.
- `hover`
- `active/pressed`
- `focus-visible`

---

## 5) Allowed transitions
Only application-owned transitions are meaningful.

| From | To | Trigger |
|---|---|---|
| `enabled` | `disabled` | parent sets `disabled=true` |
| `enabled` | `loading` | parent sets `loading=true` |
| `disabled` | `enabled` | parent sets `disabled=false` |
| `loading` | `enabled` | parent sets `loading=false` |

Forbidden:
- `loading` -> `disabled` as an internal side-effect (parent must decide)
- Any transition caused by hover/press/focus

---

## 6) Event contract

### Click
- Fires `onClick()` **only** when `interactive === true`.
- Must not infer success/failure. (Outcome belongs to parent.)

### Keyboard
- `Enter` / `Space` activates the button only when `interactive === true`.

---

## 7) Accessibility guarantees
- Uses a native `<button>` element.
- Meets minimum touch target (≥ 44px height recommended for `md` / `lg`).
- Has visible focus indicator (prefer `:focus-visible`).
- Loading indicator includes accessible text (e.g., `aria-label="Loading"` or visually hidden text).

---

## 8) Implementation mapping
- File: `components/Button.tsx`
- Contract file: `contracts/button.contract.md`

A PR is not complete unless:
1) The derived rules are enforced (`interactive = !(disabled || loading)`).
2) The demo page shows **enabled / disabled / loading** examples.