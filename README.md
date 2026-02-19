# Deterministic UI Demo

A reference implementation of **state-defined UI**.

Every component in this repository has an explicit behavioural contract:
- allowed states
- allowed transitions
- deterministic rules enforced in code

**Goal:** make UI behaviour verifiable.

This project evolves commit-by-commit.

## What’s included

### Button (Commit 2)
- Contract: `contracts/button.contract.md`
- Implementation: `components/Button.tsx`

Deterministic rule enforced:

`interactive = !(disabled || loading)`

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
