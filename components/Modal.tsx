"use client";

import React from "react";

export type ModalState = "closed" | "opening" | "open" | "closing";

interface ModalProps {
  state: ModalState;
  onClose?: () => void;
  children?: React.ReactNode;
}

export function Modal({ state, onClose, children }: ModalProps) {
  const visible = state !== "closed";
  const interactive = state === "open";

  if (!visible) return null;

  return (
    <div
      onClick={() => {
        if (!interactive) return;
        if (!onClose) return;
        onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: state === "opening" || state === "closing" ? 0.6 : 1,
        pointerEvents: interactive ? "auto" : "none",
        transition: "opacity 200ms ease",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: 24,
          minWidth: 300,
          borderRadius: 8,
        }}
      >
        {children}

        {interactive && onClose && (
          <button onClick={onClose} style={{ marginTop: 16 }}>
            Close
          </button>
        )}
      </div>
    </div>
  );
}