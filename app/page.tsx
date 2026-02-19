"use client";
import React from "react";

import { Button } from "../components/Button";
import { Modal, type ModalState } from "../components/Modal";

export default function HomePage() {
  const [modalState, setModalState] = React.useState<ModalState>("closed");
  const TRANSITION_DURATION = 200;

  function openModal() {
    if (modalState !== "closed") return;
    setModalState("opening");
    window.setTimeout(() => setModalState("open"), TRANSITION_DURATION);
  }

  function requestClose() {
    if (modalState !== "open") return;
  
    setModalState("closing");
    window.setTimeout(() => setModalState("closed"), TRANSITION_DURATION);
  }

  return (
    <main
      style={{
        padding: 24,
        maxWidth: 720,
        margin: "0 auto",
        lineHeight: 1.5,
      }}
    >
      <h1 style={{ margin: 0 }}>Deterministic UI Demo</h1>

      <p style={{ marginTop: 12 }}>
      This repository evolves commit-by-commit with explicit behavioural contracts.
      </p>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ margin: "0 0 12px 0", fontSize: 16 }}>Button states</h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Button label="Primary" onClick={() => console.log("Primary clicked")} />

          <Button
            variant="secondary"
            label="Secondary"
            onClick={() => console.log("Secondary clicked")}
          />

          <Button
            label="Disabled"
            disabled
            onClick={() => console.log("Should not fire")}
          />

          <Button
            label="Loading"
            loading
            onClick={() => console.log("Should not fire")}
          />
        </div>

        <p style={{ marginTop: 12, opacity: 0.8 }}>
          Deterministic rule: <code>interactive = !(disabled || loading)</code>
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ margin: "0 0 12px 0", fontSize: 16 }}>Modal lifecycle</h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <Button
            label={modalState === "closed" ? "Open modal" : `Modal: ${modalState}`}
            onClick={() => {
              if (modalState !== "closed") return;
              openModal();
            }}
          />

          <span style={{ opacity: 0.8, fontSize: 14 }}>
            Allowed transitions: <code>closed → opening → open → closing → closed</code>
          </span>
        </div>

        <p style={{ marginTop: 12, opacity: 0.8 }}>
          Deterministic rules: <code>visible = state !== "closed"</code>, <code>interactive = state === "open"</code>
        </p>

        <Modal state={modalState} onClose={requestClose}>
          <h3 style={{ margin: 0 }}>Deterministic Modal</h3>
          <p style={{ marginTop: 8, opacity: 0.8 }}>
            This modal is controlled by explicit lifecycle state.
          </p>
          <p style={{ marginTop: 8, opacity: 0.8 }}>
            Current state: <code>{modalState}</code>
          </p>
        </Modal>
      </section>
    </main>
  );
}