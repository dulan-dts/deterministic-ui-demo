export type TableState = "loading" | "error" | "empty" | "success";

export interface ResolveTableStateParams<T> {
  rows?: T[];
  loading?: boolean;
  error?: { message: string } | null;
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