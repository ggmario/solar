import React, { useState } from "react";
import { Button, TooltipTrigger, Tooltip } from "react-aria-components";
import { IconComponent } from "@components";
import styled from "styled-components";

import Logo from '@assets/images/logo.svg'

const DRAWER_WIDTH = 260;
const CLOSED_WIDTH = 72;

interface SidebarLayoutProps {
  open: boolean;
  handleDrawerToggle: () => void;
}

interface MenuItem {
  text: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

interface NestedListItemProps {
  item: MenuItem;
  drawerOpen: boolean;
  activeText: string;
  setActiveText: (text: string) => void;
  expandedPath: string[];
  setExpandedPath: (path: string[]) => void;
  currentPath: string[];
  depth?: number;
}

// style
const SidebarNav = styled.nav<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${(props) => (props.$open ? `${DRAWER_WIDTH}px` : `${CLOSED_WIDTH}px`)};
  border-left: 1px solid #fff;
  background: #f8f8f8;
  box-shadow: 0 0 0 0 rgba(36, 107, 235, 0.30);
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
`;

const ScrollContainer = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 20px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e0e0e0;
    border-radius: 10px;
  }
`;

const NavHeader = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$open ? "space-between" : "center")};
  padding: 24px 8px 0;
  margin-bottom: 20px;
`;

const ToggleButton = styled(Button)<{ $open: boolean }>`
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${(props) => (props.$open ? "rotate(0deg)" : "rotate(180deg)")};
  transition: transform 0.3s ease;
`;

const ItemRow = styled.div<{ 
  $isActive: boolean; 
  $depth: number; 
  $open: boolean 
}>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${(props) => (props.$depth === 0 ? "8px" : "4px")} 12px;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) => (props.$isActive && props.$depth === 0 ? "#FFEEF4" : "transparent")};
  transition: all 0.2s;
  justify-content: ${(props) => (props.$open ? "space-between" : "center")};
  position: relative;
`;

const ItemLabel = styled.span<{ $isActive: boolean; $depth: number }>`
  font-size: ${(props) => (props.$depth === 0 ? "17px" : props.$depth === 1 ? "17px" : "")};
  font-weight: ${(props) => {
    if (props.$isActive) {
      return 600;
    }
    if (props.$depth === 0) return 600;
    return 400;
  }};
  color: ${(props) => {
    if (props.$isActive) {
      if (props.$depth === 0) return "#D70251"; 
      if (props.$depth === 1) return "#E9437E";
      return "#000";
    }
    if (props.$depth === 0) return "#1d1d1d";
    return "#3a3a3a";                         
  }};

  ${ItemRow}:focus-visible & {
    color: ${(props) => {
      if (props.$depth === 0) return "#D70251"; 
      if (props.$depth === 1) return "#E9437E";
      return "#000";
    }};
    font-weight: 600;
  }
  white-space: nowrap;
`;

const ArrowIconContainer = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${(props) => (props.$isExpanded ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
`;

const StyledTooltip = styled(Tooltip)`
  background: #333;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  z-index: 2000; /* 사이드바보다 위에 뜨도록 */
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);

  /* 화살표(말풍선 꼬리) 스타일 */
  &[data-placement='right'] { margin-left: 8px; }
  
  /* 애니메이션 */
  &[data-entering] { opacity: 0; }
  &[data-entered] { opacity: 1; transition: opacity 0.15s; }
`;
// menu data
const menuItems: MenuItem[] = [
  { text: "현황 대시보드", icon: "menu01" },
  {
    text: "현황 장비 정보",
    icon: "menu02",
    children: [
      {
        text: "장비 등록",
        children: [
          { text: "발전구조설비" },
          { text: "발전생산설비" },
          { text: "계통연계설비" },
          { text: "에너지저장설비" },
          { text: "환경계측설비" },
          { text: "보안·방재설비" },
          { text: "운영관리설비" },
        ],
      },
    ],
  },
  {
    text: "발전소 기초 정보",
    icon: "menu03",
    children: [{ text: "발전소 등록" }],
  },
  { text: "발전소 모니터링", icon: "menu04" },
  { text: "외부기관", icon: "menu05" },
  {
    text: "전력 거래",
    icon: "menu06",
    children: [
      { text: "SMP/REC 단가" },
      { text: "거래 현황 미 실적" },
      { text: "REC 발급 관리 -3" },
      { text: "계약 관리" },
      { text: "발전량 예측" },
    ],
  },
  { text: "정산거래", icon: "menu07" },
  { text: "분석보고", icon: "menu08" },
  {
    text: "운영관리",
    icon: "menu09",
    children: [
      { text: "유지보수" },
      { text: "KPI 지표설정" },
      { text: "발전운용 KPI관리" },
    ],
  },
  { text: "공유/협력", icon: "menu10" },
];

// 로고 컴포넌트
export const LogoComponent = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <h1>
    <img src={isCollapsed ? Logo : ''} />
  </h1> 
);

// NestedListItem
function NestedListItem({
  item,
  drawerOpen,
  activeText,
  setActiveText,
  expandedPath,
  setExpandedPath,
  currentPath,
  depth = 0,
}: NestedListItemProps) {
  const hasChildren = item.children && item.children.length > 0;
  const isDirectActive = activeText === item.text;
  const pathString = currentPath.join("/");
  const isExpanded = expandedPath.join("/").startsWith(pathString) && hasChildren;

  const hasActiveChild = (menuItem: MenuItem): boolean => {
    if (!menuItem.children) return false;
    return menuItem.children.some((child) => child.text === activeText || hasActiveChild(child));
  };
  const isParentOfActive = hasActiveChild(item);
  const isActive = isDirectActive || isParentOfActive;

  const handleClick = () => {
    if (hasChildren) {
      if (isExpanded) {
        const parentPath = currentPath.slice(0, -1);
        setExpandedPath(parentPath);
      } else {
        setExpandedPath(currentPath);
      }
    }
    setActiveText(item.text);
  };

 return (
    <div style={{ position: 'relative' }}>
      <TooltipTrigger delay={0} isDisabled={drawerOpen}>
        <ItemRow
          as={Button}
          onClick={handleClick}
          $isActive={isActive}
          $depth={depth}
          $open={drawerOpen}
        >
          {!drawerOpen && (
            <div style={{ display: 'flex', minWidth: 24, justifyContent: 'center', color: isActive ? '#D70251' : '#333' }}>
              <IconComponent name={(item.icon as string) || "menu01"} cursor="pointer" />
            </div>
          )}

          {drawerOpen && (
            <>
              <ItemLabel $isActive={isActive} $depth={depth}>
                {item.text}
              </ItemLabel>
              {hasChildren && (
                <ArrowIconContainer $isExpanded={!!isExpanded}>
                  <IconComponent name="arrow_down" />
                </ArrowIconContainer>
              )}
            </>
          )}
        </ItemRow>

        <StyledTooltip placement="right">
          {item.text}
        </StyledTooltip>
      </TooltipTrigger>
      
      {/* 하위 메뉴 리스트 */}
      {hasChildren && isExpanded && drawerOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 12 }}>
          {item.children!.map((child, index) => (
            <NestedListItem
              key={`${child.text}-${index}`}
              item={child}
              drawerOpen={drawerOpen}
              activeText={activeText}
              setActiveText={setActiveText}
              expandedPath={expandedPath}
              setExpandedPath={setExpandedPath}
              currentPath={[...currentPath, child.text]}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// --- SidebarLayout ---
export function SidebarLayout({ open, handleDrawerToggle }: SidebarLayoutProps) {
  const [activeText, setActiveText] = useState<string>("현황 대시보드");
  const [expandedPath, setExpandedPath] = useState<string[]>([]);

  return (
    <SidebarNav $open={open}>
      <ScrollContainer style={{ padding: open? '0 20px' : 0  }}>
        {/* 상단 헤더 */}
        <NavHeader $open={open}>
          {open && <LogoComponent isCollapsed={true} />}
          <ToggleButton onPress={handleDrawerToggle} $open={open}>
            <IconComponent name="menu" cursor="pointer" />
          </ToggleButton>
        </NavHeader>

        {/* 메뉴 리스트 */}
        <div role="navigation" aria-label="메인 메뉴" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {menuItems.map((item, index) => (
            <NestedListItem
              key={`${item.text}-${index}`}
              item={item}
              drawerOpen={open}
              activeText={activeText}
              setActiveText={setActiveText}
              expandedPath={expandedPath}
              setExpandedPath={setExpandedPath}
              currentPath={[item.text]}
            />
          ))}
        </div>
      </ScrollContainer>
    </SidebarNav>
  );
}

export default SidebarLayout;