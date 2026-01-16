import React, { ReactNode, useState, isValidElement, ReactElement, useId } from "react";
import { Heading } from "react-aria-components";

interface InfoGroupComponentProps {
    minHeight?: number | string;
    title?: ReactNode;
    extra?: ReactNode;
    children?: ReactNode;
    defaultOpen?: boolean;
    flex?: number;
}

export const InfoGroupComponent: React.FC<InfoGroupComponentProps> = ({ flex, minHeight, title, extra, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const contentId = useId();

    // 토글 함수
    const toggleContent = () => {
        setIsOpen((prev) => {
            const newState = !prev;
            // 상태 변경 후 리사이즈 이벤트 발생
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 50);
            return newState;
        });
    };

    const hasArrow =
        isValidElement(extra) &&
        (() => {
            const element = extra as ReactElement<{ name?: string; id?: string }>;
            const componentName = typeof element.type === "function" ? element.type.name : "";
            const propName = element.props?.name ?? "";
            const propId = element.props?.id ?? "";

            return componentName.includes("Arrow") || propName.toLowerCase().includes("arrow") || propId.toLowerCase().includes("arrow");
        })();
    
    return (
        <div 
            style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                flex: hasArrow ? (isOpen ? flex : 0) : flex,
                minHeight: hasArrow ? (isOpen ? minHeight : 'auto') : minHeight,
                transition: 'flex 0.2s ease, min-height 0.2s ease'
            }}
            className={isOpen && hasArrow ? 'content-visible' : ''}
        >
            <div
                role={hasArrow ? "button" : undefined}
                tabIndex={hasArrow ? 0 : -1}
                aria-expanded={hasArrow ? isOpen : undefined}
                aria-controls={contentId}
                aria-label={hasArrow ? `${title} 섹션 토글` : undefined}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: hasArrow ? 40 : 32,
                    borderBottom: isOpen && hasArrow ? "1px solid #d9d9d9" : "none",
                    cursor: hasArrow ? "pointer" : "default",
                }}
                onClick={(e) => {
                    if (!hasArrow) return;
                    e.stopPropagation();
                    toggleContent();
                }}
                onKeyDown={(e) => {
                    if (!hasArrow) return;
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleContent();
                    }
                }}
            >
                <Heading
                    style={{
                        fontFamily: "GmarketSans",
                        fontSize: "1.2667rem",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    {title}
                </Heading>

                <div
                    className="extra-slot"
                    aria-hidden="true"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        transform: hasArrow && isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                    }}
                >
                    {extra}
                </div>
            </div>

            {/* 컨텐츠 영역 */}
            <div 
                id={contentId} 
                role="region" 
                aria-labelledby={undefined} 
                style={{ 
                    display: (hasArrow ? isOpen : true) ? "flex" : "none",
                    flexDirection: "column", 
                    flex: 1, 
                    paddingTop: 12, 
                    overflow: "auto", 
                    gap: 12,
                    minHeight: 0
                }}
            >
                {children}
            </div>
        </div>
    );
};