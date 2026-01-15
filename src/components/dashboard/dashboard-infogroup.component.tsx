import React, { ReactNode, useState, isValidElement, ReactElement } from "react";
import { Heading } from "react-aria-components";

interface InfoGroupComponentProps {
    height?: number | string;
    title?: ReactNode;
    extra?: ReactNode;
    children?: ReactNode;
    defaultOpen?: boolean;
}

export const InfoGroupComponent: React.FC<InfoGroupComponentProps> = ({ 
    height, 
    title, 
    extra, 
    children, 
    defaultOpen = true 
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    // 토글 함수
    const toggleContent = () => setIsOpen((prev) => !prev);

    const hasArrow = isValidElement(extra) && (() => {
    const element = extra as ReactElement<{ name?: string; id?: string }>;
    const componentName = typeof element.type === 'function' ? element.type.name : '';
    const propName = element.props?.name ?? '';
    const propId = element.props?.id ?? '';

    return (
        componentName.includes("Arrow") || 
        propName.toLowerCase().includes("arrow") || 
        propId.toLowerCase().includes("arrow")
    );
})();
    return (
        <div style={{ height: height }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: hasArrow ? 40 : 32,
                    borderBottom: (isOpen && hasArrow) ? '1px solid #d9d9d9' : 'none',
                    cursor: hasArrow ? 'pointer' : 'default'
                }}
                onClick={(e) => {
                    // 화살표가 없는 경우에는 클릭 방지
                    if (!hasArrow) return;
        
                    e.stopPropagation();
                    toggleContent();
                }}
            >
                <Heading
                    style={{
                        fontFamily: "GmarketSans",
                        fontSize: '1.2667rem',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    {title}
                </Heading>

                <div
                    className="extra-slot"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        // 화살표가 있고 열려있을 때만 회전
                        transform: (hasArrow && isOpen) ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                    }}
                >
                    {extra}
                </div>
            </div>

            {/* 컨텐츠 영역 */}
            {(hasArrow ? isOpen : true) && children && (
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingTop: 12, overflow: 'auto', gap: 12 }}>
                    {children}
                </div>
            )}
        </div>
    );
};