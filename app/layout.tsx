import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deterministic UI Demo",
  description:
    "A state-defined UI architecture where every component has an explicit behavioural contract.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}