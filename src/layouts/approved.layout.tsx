import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SidebarLayout, HeaderLayout  } from '@layouts';


export interface HeaderInfo {
  title: string;
  breadcrumbs: string[];
}

export interface HeaderContextType {
  setHeaderInfo: React.Dispatch<React.SetStateAction<HeaderInfo>>;
}

export function ApprovedLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => setOpen((prev) => !prev);

  // 레이아웃 스타일 정의
  const layoutContainerStyle: React.CSSProperties = {
    display: 'flex',
    minHeight: '100vh',
    width: '100vw',
    minWidth: 1600,
    backgroundColor: '#ffffff',
  };

  const mainContentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: open ? 260 : 72,
    transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minWidth: 0,
  };

  const pageBodyStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: 32,
    paddingTop: 0,
    flex: 1,
    overflowY: 'auto',
  };

   const handleNavigate = (path: string) => {
    console.log('handleNavigate called with:', path); // 디버깅
    console.log('Current location:', location.pathname); // 현재 위치
    navigate(path);
  };

  return (
    <div>
      <div style={layoutContainerStyle}>
        {/* 왼쪽 사이드바 */}
        <SidebarLayout 
          open={open} 
          handleDrawerToggle={handleDrawerToggle} 
          onNavigate={handleNavigate}
        />

        {/* 오른쪽 메인 영역 */}
        <main style={mainContentStyle}>
          {/* 상단 헤더 영역 */}
          <HeaderLayout />

          {/* 하단 실제 컨텐츠 영역 */}
          <section style={pageBodyStyle}>
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
}

export default ApprovedLayout;