

"use client";

import React from "react";
import { resolveTableState, type TableState } from "./table-state";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  rows?: T[];
  loading?: boolean;
  error?: { message: string } | null;
  emptyMessage?: string;
  caption?: string;
}

export function Table<T>({
  columns,
  rows,
  loading = false,
  error = null,
  emptyMessage = "No data available.",
  caption,
}: TableProps<T>) {
  const state: TableState = resolveTableState({ rows, loading, error });

  const baseWrapperStyle: React.CSSProperties = {
    marginTop: 16,
    border: "1px solid #e5e5e5",
    borderRadius: 8,
    overflow: "hidden",
  };

  const headerCellStyle: React.CSSProperties = {
    textAlign: "left",
    padding: "8px 12px",
    fontWeight: 600,
    borderBottom: "1px solid #e5e5e5",
    background: "#fafafa",
    fontSize: 14,
  };

  const cellStyle: React.CSSProperties = {
    padding: "8px 12px",
    borderBottom: "1px solid #f0f0f0",
    fontSize: 14,
  };

  function renderSkeletonRows(count: number) {
    return Array.from({ length: count }).map((_, index) => (
      <tr key={`skeleton-${index}`}>
        {columns.map((col) => (
          <td key={col.key} style={cellStyle}>
            <div
              style={{
                height: 12,
                width: "80%",
                background: "#eee",
                borderRadius: 4,
              }}
            />
          </td>
        ))}
      </tr>
    ));
  }

  return (
    <div style={baseWrapperStyle}>
      {caption && (
        <div style={{ padding: "8px 12px", fontSize: 13, opacity: 0.7 }}>
          {caption}
        </div>
      )}

      {state === "loading" && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={headerCellStyle}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderSkeletonRows(3)}</tbody>
        </table>
      )}

      {state === "error" && (
        <div style={{ padding: 16, color: "#b00020", fontSize: 14 }}>
          Error: {error?.message}
        </div>
      )}

      {state === "empty" && (
        <div style={{ padding: 16, fontSize: 14, opacity: 0.7 }}>
          {emptyMessage}
        </div>
      )}

      {state === "success" && rows && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={headerCellStyle}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td key={col.key} style={cellStyle}>
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}