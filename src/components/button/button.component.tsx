"use client";

import React, { ReactNode } from "react";
import { Button, ButtonProps } from "react-aria-components";
import "./button.component.scss";

type RadiusVariant = "none" | "sm" | "md" | "lg" | "full";
type ButtonVariant = "contained" | "outlined" | "third" | "none";

interface ButtonComponentProps extends ButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  radius?: RadiusVariant | number;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  minWidth?: number | string;
  height?: number | string;
  underline?: boolean;
  mt?: number | string;
  ls?: number | string;
  textColor?: string;
}

type VariantStateStyle = {
  bg?: string;
  border?: string;
  color?: string;
};

type VariantStyle = {
  base: Required<VariantStateStyle>;
  hover: VariantStateStyle;
  active: VariantStateStyle;
};

const VARIANT_CONFIG: Record<ButtonVariant, VariantStyle> = {
  contained: {
    base: { bg: "#444242", border: "1px solid #444242", color: "#ffffff" },
    hover: { bg: "#2D2B2B", border: "1px solid #2D2B2B" },
    active: { bg: "#2D2B2B", border: "1px solid #2D2B2B" },
  },
  outlined: {
    base: { bg: "#fff", border: "1px solid #8B8888", color: "#444242" },
    hover: { bg: "#F6F6F6", border: "1px solid #8B8888" },
    active: { bg: "#F6F6F6", border: "1px solid #8B8888" },
  },
  third: {
    base: { bg: "#ED751A", border: "1px solid #ED751A", color: "#ffffff" },
    hover: { bg: "#D66416", border: "1px solid #D66416" },
    active: { bg: "#BF5512", border: "1px solid #BF5512" },
  },
  excel: {
    base: { bg: "#11763E", border: "#11763E", color: "var(--gray-0)" },
    hover: { bg: "#0A6734" },
    active: { bg: "#0A6734" },
  },
  none: {
    base: {
      bg: "transparent",
      border: "1px solid transparent",
      color: "#444242",
    },
    hover: { color: "#1D1C1C" },
    active: { color: "#1D1C1C" },
  },
};

type InteractionState = {
  isPressed: boolean;
  isHovered: boolean;
  isFocused: boolean;
  isFocusVisible: boolean;
  isDisabled: boolean;
};

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  variant = "contained",
  radius = 8,
  icon,
  iconPosition = "right",
  minWidth = 58,
  height = 42,
  underline = false,
  mt,
  ls,
  textColor,
  ...props
}) => {
  const getButtonStyle = ({
    isPressed,
    isHovered,
    isFocused,
    isFocusVisible,
    isDisabled,
  }: InteractionState): React.CSSProperties => {
    const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.contained;
    const isNone = variant === "none";

    const baseStyle: React.CSSProperties = {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,

      minWidth: isNone
        ? "auto"
        : typeof minWidth === "number"
          ? `${minWidth}px`
          : minWidth,
      height: isNone
        ? "auto"
        : typeof height === "number"
          ? `${height}px`
          : height,
      padding: "0 12px",
      cursor: "pointer",
      transition: "all 0.2s ease-out",
      color: textColor || config.base.color,
      fontSize: "1rem",
      fontWeight: 500,
      backgroundColor: config.base.bg,
      border: config.base.border,
      borderRadius: typeof radius === "number" ? `${radius}px` : radius,
      textDecoration: underline ? "underline" : "none",
      textUnderlineOffset: 2,
      marginTop: mt,
      letterSpacing: ls,
    };

    if (isHovered) {
      if (config.hover.bg) baseStyle.backgroundColor = config.hover.bg;
      if (config.hover.border) baseStyle.border = config.hover.border;
      if (config.hover.color) baseStyle.color = config.hover.color;
    }

    if (isPressed || isFocused) {
      if (config.active.bg) baseStyle.backgroundColor = config.active.bg;
      if (config.active.border) baseStyle.border = config.active.border;
      if (config.active.color) baseStyle.color = config.active.color;
    }

    if (isDisabled) {
      return {
        ...baseStyle,
        backgroundColor: "var(--gray-20)",
        color: "var(--gray-40)",
        border: "1px solid var(--gray-40)",
        cursor: "default",
      };
    }

    if (isFocusVisible) {
      return { ...baseStyle, outline: "-webkit-focus-ring-color auto 0.5px" };
    }

    return baseStyle;
  };

  return (
    <Button {...props} style={getButtonStyle}>
      <>
        {icon && iconPosition === "left" && (
          <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
        )}
        {children && <span>{children}</span>}
        {icon && iconPosition === "right" && (
          <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
        )}
      </>
    </Button>
  );
};
