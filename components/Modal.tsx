"use client";

import React from "react";

export type ModalState = "closed" | "opening" | "open" | "closing";

type ModalProps = {
  state: ModalState;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ state, onClose, children }: ModalProps) {
  const visible = state !== "closed";
  const interactive = state === "open";

  // Escape key should only close when interactive
  React.useEffect(() => {
    if (!visible) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && interactive) onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, interactive, onClose]);

  if (!visible) return null;

  // Visual states (makes transitions “feel” different)
  const overlayOpacity =
    state === "opening" ? 0 : state === "open" ? 0.45 : 0; // closing -> fade out
  const panelOpacity = state === "opening" ? 0 : state === "open" ? 1 : 0;

  const panelTransform =
    state === "opening"
      ? "translateY(6px) scale(0.98)"
      : state === "open"
        ? "translateY(0px) scale(1)"
        : "translateY(6px) scale(0.98)"; // closing

  return (
    <div
      aria-hidden={!interactive}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
      }}
    >
      {/* Overlay */}
      <div
        onClick={() => {
          if (!interactive) return;
          onClose();
        }}
        style={{
          position: "absolute",
          inset: 0,
          background: "black",
          opacity: overlayOpacity,
          transition: "opacity 200ms ease",
          pointerEvents: interactive ? "auto" : "none", // deterministic rule
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          pointerEvents: "none", // panel container shouldn’t catch clicks
          padding: 24,
        }}
      >
        <div
          style={{
            width: "min(680px, 100%)",
            background: "white",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.12)",
            boxShadow: "0 18px 60px rgba(0,0,0,0.25)",
            padding: 20,

            opacity: panelOpacity,
            transform: panelTransform,
            transition: "opacity 200ms ease, transform 200ms ease",

            pointerEvents: interactive ? "auto" : "none", // deterministic rule
          }}
        >
          {children}

          <div style={{ marginTop: 16 }}>
            <button
              type="button"
              onClick={() => {
                if (!interactive) return;
                onClose();
              }}
              disabled={!interactive}
            >
              Close
            </button>
          </div>

          {/* Demo-only: show lifecycle clearly */}
          <div style={{ marginTop: 12, fontSize: 12, opacity: 0.6 }}>
            state: <code>{state}</code>
          </div>
        </div>
      </div>
    </div>
  );
}