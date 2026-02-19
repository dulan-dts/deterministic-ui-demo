import React from "react";

export type ButtonVariant = "primary" | "secondary" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export function Button({
  label,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  leadingIcon,
  trailingIcon,
}: ButtonProps) {
  // Deterministic rule: interactive is derived
  const interactive = !(disabled || loading);

  function handleClick() {
    if (!interactive) return;
    onClick();
  }

  const heightMap: Record<ButtonSize, number> = {
    sm: 32,
    md: 44,
    lg: 52,
  };

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: "#111",
      color: "#fff",
      border: "1px solid #111",
    },
    secondary: {
      backgroundColor: "#fff",
      color: "#111",
      border: "1px solid #111",
    },
    destructive: {
      backgroundColor: "#b00020",
      color: "#fff",
      border: "1px solid #b00020",
    },
  };

  const baseStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "0 16px",
    height: heightMap[size],
    minWidth: 120,
    cursor: interactive ? "pointer" : "not-allowed",
    opacity: interactive ? 1 : 0.6,
    width: fullWidth ? "100%" : "auto",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 120ms ease",
    borderRadius: 6,
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!interactive}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
      }}
      aria-busy={loading || undefined}
    >
      {loading ? (
        <span aria-label="Loading" style={{ display: "flex", alignItems: "center" }}>
          Loading…
        </span>
      ) : (
        <>
          {leadingIcon}
          <span>{label}</span>
          {trailingIcon}
        </>
      )}
    </button>
  );
}