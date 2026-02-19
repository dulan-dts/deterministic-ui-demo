export default function HomePage() {
    return (
      <main style={{ padding: 24, maxWidth: 720, margin: "0 auto", lineHeight: 1.5 }}>
        <h1 style={{ margin: 0 }}>Deterministic UI Demo</h1>
  
        <p style={{ marginTop: 12 }}>
          This repository evolves commit-by-commit.
          <br />
          First component: <strong>Button</strong> (next commit).
        </p>
  
        <p style={{ marginTop: 12, opacity: 0.8 }}>
          Goal: make UI behaviour explicit and verifiable through contracts.
        </p>
      </main>
    );
  }