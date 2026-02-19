"use client";
import { Button } from "../components/Button";

export default function HomePage() {
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
        This repository evolves commit-by-commit.
        <br />
        First component: <strong>Button</strong> (contract + implementation).
      </p>

      <p style={{ marginTop: 12, opacity: 0.8 }}>
        Goal: make UI behaviour explicit and verifiable through contracts.
      </p>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ margin: "0 0 12px 0", fontSize: 16 }}>Button states</h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Button label="Primary" onClick={() => console.log("Primary clicked")} />

          <Button
            variant="secondary"
            label="Secondary"
            onClick={() => alert("Secondary clicked")}
          />

          <Button
            label="Disabled"
            disabled
            onClick={() => alert("Should not fire")}
          />

          <Button
            label="Loading"
            loading
            onClick={() => alert("Should not fire")}
          />
        </div>

        <p style={{ marginTop: 12, opacity: 0.8 }}>
          Deterministic rule: <code>interactive = !(disabled || loading)</code>
        </p>
      </section>
    </main>
  );
}