"use client";
import React from "react";

import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Table } from "../components/Table";
import {
  type ModalState,
  resolveNextModalState,
  MODAL_TRANSITION_DURATION,
} from "../components/modal-state";

export default function HomePage() {
  const [modalState, setModalState] = React.useState<ModalState>("closed");

  function openModal() {
    const next = resolveNextModalState(modalState, "opening");
    if (next === modalState) return;

    setModalState(next);

    window.setTimeout(() => {
      setModalState((current) => resolveNextModalState(current, "open"));
    }, MODAL_TRANSITION_DURATION);
  }

  function requestClose() {
    const next = resolveNextModalState(modalState, "closing");
    if (next === modalState) return;

    setModalState(next);

    window.setTimeout(() => {
      setModalState((current) => resolveNextModalState(current, "closed"));
    }, MODAL_TRANSITION_DURATION);
  }

  const tableColumns = [
    { key: "name", header: "Name" },
    { key: "role", header: "Role" },
  ];

  const tableRows = [
    { name: "Alice", role: "Engineer" },
    { name: "Bob", role: "Designer" },
  ];

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
        <h2 style={{ margin: "0 0 12px 0", fontSize: 16 }}>Table states</h2>

        <p style={{ opacity: 0.8, fontSize: 14 }}>
          Deterministic resolver precedence: <code>loading &gt; error &gt; empty &gt; success</code>
        </p>

        <h3 style={{ marginTop: 16, fontSize: 14 }}>Loading</h3>
        <Table columns={tableColumns} loading />

        <h3 style={{ marginTop: 16, fontSize: 14 }}>Success</h3>
        <Table columns={tableColumns} rows={tableRows} />

        <h3 style={{ marginTop: 16, fontSize: 14 }}>Empty</h3>
        <Table columns={tableColumns} rows={[]} emptyMessage="No users found." />

        <h3 style={{ marginTop: 16, fontSize: 14 }}>Error</h3>
        <Table
          columns={tableColumns}
          error={{ message: "Failed to load data." }}
        />
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