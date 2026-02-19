import { describe, it, expect } from "vitest";

import {
  resolveTableState,
  isTableLoading,
  isTableError,
  isTableEmpty,
  isTableSuccess,
} from "../components/table-state";

import type { TableState } from "../components/table-state";

describe("table-state", () => {
  it("exports required helpers", () => {
    expect(typeof resolveTableState).toBe("function");
    expect(typeof isTableLoading).toBe("function");
    expect(typeof isTableError).toBe("function");
    expect(typeof isTableEmpty).toBe("function");
    expect(typeof isTableSuccess).toBe("function");
  });

  it("resolver precedence: loading > error > empty > success", () => {
    expect(
      resolveTableState({ loading: true, error: "x", rows: [{ id: 1 }] })
    ).toBe("loading");

    expect(
      resolveTableState({ loading: false, error: "x", rows: [{ id: 1 }] })
    ).toBe("error");

    expect(resolveTableState({ loading: false, error: null, rows: [] })).toBe(
      "empty"
    );

    expect(
      resolveTableState({ loading: false, error: null, rows: [{ id: 1 }] })
    ).toBe("success");
  });

  it("returns loading when loading is true (even if error/rows exist)", () => {
    const state = resolveTableState({ loading: true, error: "Failed", rows: [] });
    expect(state).toBe("loading");
  });

  it("returns error when not loading and error exists", () => {
    const state = resolveTableState({ loading: false, error: "Failed", rows: [{ id: 1 }] });
    expect(state).toBe("error");
  });

  it("returns empty when not loading/error and rows are empty", () => {
    const state = resolveTableState({ loading: false, error: null, rows: [] });
    expect(state).toBe("empty");
  });

  it("returns success when not loading/error and rows exist", () => {
    const state = resolveTableState({ loading: false, error: null, rows: [{ id: 1 }] });
    expect(state).toBe("success");
  });

  it("derived helpers correctly identify state", () => {
    const states: TableState[] = ["loading", "error", "empty", "success"];

    for (const s of states) {
      expect(isTableLoading(s)).toBe(s === "loading");
      expect(isTableError(s)).toBe(s === "error");
      expect(isTableEmpty(s)).toBe(s === "empty");
      expect(isTableSuccess(s)).toBe(s === "success");
    }
  });
});