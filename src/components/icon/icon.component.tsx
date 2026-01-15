import React, { useMemo } from "react";

// 모든 SVG 파일을 동적으로 가져오기
const icons = import.meta.glob("/src/assets/icons/icon_*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

type IconComponentProps = {
  name: string; // `icon_{name}.svg`의 {name}
  size?: number | string;
  color?: string; // 동적으로 변경할 색상
  alt?: string; 
  styles?: React.CSSProperties;
  cursor?: string;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void | undefined;
};

export const IconComponent: React.FC<IconComponentProps> = ({
  name,
  size = 24,
  color,
  styles,
  cursor,
  onClick,
}) => {
  const IconSvg = icons[`/src/assets/icons/icon_${name}.svg`] as string;

  // 1. Move the Hook BEFORE the early return
  const styledSvg = useMemo(() => {
    if (!IconSvg) return ""; // Handle missing icon inside memo or as default
    if (color) return IconSvg.replace(/fill="[^"]*"/g, `fill="${color}"`);
    return IconSvg;
  }, [IconSvg, color]);

  // 2. Perform the early return now
  if (!IconSvg) {
    console.error(`Icon "icon_${name}.svg" not found`);
    return null;
  }

  return (
    <div
      style={{ width: size, height: size, cursor: cursor ?? "default", display: "flex", alignItems: "center", ...styles }}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: styledSvg }}
    />
  );
};
export default IconComponent;
