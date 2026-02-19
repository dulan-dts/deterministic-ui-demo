import { describe, it, expect } from "vitest";
import {
  canTransition,
  resolveNextModalState,
  isModalVisible,
  isModalInteractive,
  MODAL_TRANSITION_DURATION,
  type ModalState,
} from "../components/modal-state";

describe("modal-state", () => {
  it("allows only the defined lifecycle transitions", () => {
    const allowed: Array<[ModalState, ModalState]> = [
      ["closed", "opening"],
      ["opening", "open"],
      ["open", "closing"],
      ["closing", "closed"],
    ];

    for (const [from, to] of allowed) {
      expect(canTransition(from, to)).toBe(true);
    }
  });

  it("rejects invalid lifecycle transitions", () => {
    const invalid: Array<[ModalState, ModalState]> = [
      ["closed", "open"],
      ["closed", "closing"],
      ["opening", "closed"],
      ["opening", "closing"],
      ["open", "opening"],
      ["open", "closed"],
      ["closing", "open"],
      ["closing", "opening"],
      // also reject no-op transitions (optional rule)
      ["closed", "closed"],
      ["opening", "opening"],
      ["open", "open"],
      ["closing", "closing"],
    ];

    for (const [from, to] of invalid) {
      expect(canTransition(from, to)).toBe(false);
    }
  });

  it("resolveNextModalState returns requested state when transition is valid", () => {
    expect(resolveNextModalState("closed", "opening")).toBe("opening");
    expect(resolveNextModalState("opening", "open")).toBe("open");
    expect(resolveNextModalState("open", "closing")).toBe("closing");
    expect(resolveNextModalState("closing", "closed")).toBe("closed");
  });

  it("resolveNextModalState ignores invalid transitions (returns current)", () => {
    expect(resolveNextModalState("closed", "open")).toBe("closed");
    expect(resolveNextModalState("opening", "closing")).toBe("opening");
    expect(resolveNextModalState("open", "closed")).toBe("open");
    expect(resolveNextModalState("closing", "open")).toBe("closing");
  });

  it("derived helpers enforce visibility and interactivity rules", () => {
    expect(isModalVisible("closed")).toBe(false);
    expect(isModalVisible("opening")).toBe(true);
    expect(isModalVisible("open")).toBe(true);
    expect(isModalVisible("closing")).toBe(true);

    expect(isModalInteractive("closed")).toBe(false);
    expect(isModalInteractive("opening")).toBe(false);
    expect(isModalInteractive("open")).toBe(true);
    expect(isModalInteractive("closing")).toBe(false);
  });

  it("transition duration is a positive integer", () => {
    expect(Number.isInteger(MODAL_TRANSITION_DURATION)).toBe(true);
    expect(MODAL_TRANSITION_DURATION).toBeGreaterThan(0);
  });
});