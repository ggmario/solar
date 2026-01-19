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
  onNavigate?: (path: string) => void; // 추가: 네비게이션 콜백
}

interface MenuItem {
  text: string;
  icon?: React.ReactNode;
  path?: string; // 추가: 라우팅 경로
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
  onNavigate?: (path: string) => void; // 추가
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
  z-index: 2000;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);

  &[data-placement='right'] { margin-left: 8px; }
  
  &[data-entering] { opacity: 0; }
  &[data-entered] { opacity: 1; transition: opacity 0.15s; }
`;

// menu data - path 추가
const menuItems: MenuItem[] = [
  { text: "현황 대시보드", icon: "menu01", path: "/dashboard" },
  {
    text: "현황 장비 정보",
    icon: "menu02",
    children: [
      {
        text: "장비 등록",
        path: "/equipment",
        children: [
          { text: "발전구조설비", path: "/equipment/power-structure" },
          { text: "발전생산설비", path: "/equipment/power-production" },
          { text: "계통연계설비", path: "/equipment/grid-connection" },
          { text: "에너지저장설비", path: "/equipment/energy-storage" },
          { text: "환경계측설비", path: "/equipment/environmental" },
          { text: "보안·방재설비", path: "/equipment/security" },
          { text: "운영관리설비", path: "/equipment/operation" },
        ],
      },
    ],
  },
  {
    text: "발전소 기초 정보",
    icon: "menu03",
    children: [{ text: "발전소 등록", path: "/plant/register" }],
  },
  { text: "발전소 모니터링", icon: "menu04", path: "/monitoring" },
  { text: "외부기관", icon: "menu05", path: "/external" },
  {
    text: "전력 거래",
    icon: "menu06",
    children: [
      { text: "SMP/REC 단가", path: "/trade/smp-rec" },
      { text: "거래 현황 미 실적", path: "/trade/status" },
      { text: "REC 발급 관리 -3", path: "/trade/rec-management" },
      { text: "계약 관리", path: "/trade/contract" },
      { text: "발전량 예측", path: "/trade/forecast" },
    ],
  },
  { text: "정산거래", icon: "menu07", path: "/settlement" },
  { text: "분석보고", icon: "menu08", path: "/analysis" },
  {
    text: "운영관리",
    icon: "menu09",
    children: [
      { text: "유지보수", path: "/operation/maintenance" },
      { text: "KPI 지표설정", path: "/operation/kpi-setup" },
      { text: "발전운용 KPI관리", path: "/operation/kpi-management" },
    ],
  },
  { text: "공유/협력", icon: "menu10", path: "/collaboration" },
];

// 로고 컴포넌트
export const LogoComponent = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <h1>
    <img src={isCollapsed ? Logo : ''} alt="Wiable Energy Exchange" />
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
  onNavigate,
}: NestedListItemProps) {
  const hasChildren = item.children && item.children.length > 0;
  const pathString = currentPath.join("/");
  const isExpanded = expandedPath.join("/").startsWith(pathString) && hasChildren;

  // 접근성
  const handleFocus = () => {
    if (hasChildren && drawerOpen) {
      setExpandedPath(currentPath);
    }
  };

  const handleClick = () => {
    setActiveText(item.text);
    if (item.path && onNavigate) {
      onNavigate(item.path);
    }
        if (hasChildren) {
      if (isExpanded) {
        setExpandedPath(currentPath.slice(0, -1));
      } else {
        setExpandedPath(currentPath);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <TooltipTrigger delay={0} isDisabled={drawerOpen}>
        <ItemRow
          as={Button}
          onPress={handleClick}
          onFocus={handleFocus} // 탭으로 포커스 진입 시 실행
          $isActive={activeText === item.text}
          $depth={depth}
          $open={drawerOpen}
          aria-expanded={hasChildren ? isExpanded : undefined}
          style={{ 
            paddingLeft: drawerOpen ? `${depth * 12 + 12}px` : 'auto',
            outline: 'none' // 커스텀 포커스 스타일 권장
          }}
        >
          {/* ... 내부 아이콘 및 라벨 렌더링 (기존과 동일) */}
          {!drawerOpen ? (
             <div style={{ display: 'flex', minWidth: 24, justifyContent: 'center' }}>
                <IconComponent name={(item.icon as string) || "menu01"} />
             </div>
          ) : (
            <>
              <ItemLabel $isActive={activeText === item.text} $depth={depth}>
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
        <StyledTooltip placement="right">{item.text}</StyledTooltip>
      </TooltipTrigger>
      
      {/* 하위 메뉴: isExpanded가 true가 되는 순간 DOM에 생성되어 다음 Tab 대상이 됨 */}
      {hasChildren && isExpanded && drawerOpen && (
        <div role="group" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
// --- SidebarLayout ---
export function SidebarLayout({ open, handleDrawerToggle, onNavigate }: SidebarLayoutProps) {
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
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </ScrollContainer>
    </SidebarNav>
  );
}

export default SidebarLayout;