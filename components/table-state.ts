export type TableState = "loading" | "error" | "empty" | "success";

export interface ResolveTableStateParams<T> {
  rows?: T[];
  loading?: boolean;
  error?: { message: string } | string | null;
}

export function resolveTableState<T>({
  rows,
  loading,
  error,
}: ResolveTableStateParams<T>): TableState {
  if (loading) return "loading";
  if (error) return "error";
  const rowCount = rows?.length ?? 0;
  if (rowCount === 0) return "empty";
  return "success";
}

export function isTableLoading(state: TableState): boolean {
  return state === "loading";
}

export function isTableError(state: TableState): boolean {
  return state === "error";
}

export function isTableEmpty(state: TableState): boolean {
  return state === "empty";
}

export function isTableSuccess(state: TableState): boolean {
  return state === "success";
}