import React, { ReactNode } from "react";
import { Button, ButtonProps } from "react-aria-components";

type RadiusVariant = "none" | "sm" | "md" | "lg" | "full"
type ButtonVariant = "primary" | "secondary" |"third" | "custom";

interface ButtonComponentProps extends ButtonProps {
    children?: ReactNode;
    variant?: ButtonVariant;
    bg?: string;
    textColor?: string;
    radius?: RadiusVariant;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
    width?: number | string;
    height?: number | string;
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({ children, variant = "primary", bg, textColor, radius = 8, icon, iconPosition = "right", width = 50, height = 42, ...props }) => {
    const variantStyles: Record<ButtonVariant, { bg: string; textColor: string; border?: string }> = {
        primary: {
            bg: "#333",
            textColor: "#fff",
        },
        secondary: {
            bg: "#fff",
            textColor: "#333",
            border: "1px solid #333",
        },
        third: {
            bg: '#ED751A',
            textColor: '#fff',
        },
        custom: {
            bg: bg || "#2563eb",
            textColor: textColor || "#ffffff",
        },
    };

    const currentStyle = variant === "custom" ? { bg: bg || "#2563eb", textColor: textColor || "#ffffff" } : variantStyles[variant];

    const getButtonStyle = (): React.CSSProperties => {
        //const { isPressed, isHovered, isFocusVisible } = renderProps;

        return {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            minWidth: width ? `${width}px` : "auto",
            height: height ? `${height}px` : "auto",
            padding: "0 12px",
            cursor: "pointer",
            border: variant === "secondary" ? variantStyles.secondary.border : "none",
            transition: "all 0.2s ease-out",
            fontSize: "1rem",
            fontWeight: 500,
            backgroundColor: currentStyle.bg,
            color: currentStyle.textColor,
            borderRadius: radius,
            //   filter: isHovered ? "brightness(1.1)" : "none",
            //   transform: isPressed ? "scale(0.96)" : "scale(1)",
            //   boxShadow: isFocusVisible ? "0 0 0 3px rgba(59, 130, 246, 0.5)" : "none",
            //   opacity: props.isDisabled ? 0.6 : 1,
        };
    };

    return (
        <Button {...props} style={getButtonStyle}>
            <>
                {icon && iconPosition === "left" && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
                {children && <span>{children}</span>}
                {icon && iconPosition === "right" && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
            </>
        </Button>
    );
};
