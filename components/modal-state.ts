export type ModalState = "closed" | "opening" | "open" | "closing";

export const MODAL_TRANSITION_DURATION = 200;

/**
 * Pure transition validator.
 * Ensures only allowed lifecycle transitions occur.
 */
export function canTransition(
  from: ModalState,
  to: ModalState
): boolean {
  if (from === "closed" && to === "opening") return true;
  if (from === "opening" && to === "open") return true;
  if (from === "open" && to === "closing") return true;
  if (from === "closing" && to === "closed") return true;
  return false;
}

/**
 * Deterministic transition resolver.
 * Returns next state if valid, otherwise returns current state.
 * Pure function — no side effects.
 */
export function resolveNextModalState(
  current: ModalState,
  requested: ModalState
): ModalState {
  return canTransition(current, requested) ? requested : current;
}

/**
 * Derived helpers
 */
export function isModalVisible(state: ModalState): boolean {
  return state !== "closed";
}

export function isModalInteractive(state: ModalState): boolean {
  return state === "open";
}