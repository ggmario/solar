// header.layout.tsx
import { Button, Group, Key } from "react-aria-components";
import { IconComponent, MenuComponent } from "@components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ProfileImg from "@assets/images/img_profile.png";

const Header = styled.header`
  height: 60px;
  padding: 10px 32px;
  display: flex;
  justify-content: right;
`;

const ActionGroup = styled(Group)`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconButton = styled(Button)`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }
`;

export function HeaderLayout() {
  const nav = useNavigate();

  const handleMenuAction = (key: Key): void => {
    switch (key) {
      case "settings":
        nav("/settings");
        break;

      case "mypage":
        nav("/mypage");
        break;

      case "logout":
        // 로그아웃 처리
        localStorage.removeItem("ACCESS_TOKEN");
        nav("/login", { replace: true });
        break;
    }
  };

  return (
    <Header>
      <ActionGroup>
        <IconButton aria-label="Notifications">
          <IconComponent name="alarm" />
        </IconButton>

        <MenuComponent.Trigger>
          <IconButton aria-label="User menu" style={{ gap: 8 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <img src={ProfileImg} alt="Profile" />
              <dl style={{ textAlign: "left" }}>
                <dt style={{ fontWeight: 600 }}>wiable_admin</dt>
                <dd>발전소 모드</dd>
              </dl>
            </div>
            <IconComponent name="arrow_down" size={16} />
          </IconButton>

          <MenuComponent onAction={handleMenuAction}>
            <MenuComponent.Section title="관리자">
              <MenuComponent.Item id="settings">설정</MenuComponent.Item>
              <MenuComponent.Item id="mypage">My Page</MenuComponent.Item>
            </MenuComponent.Section>
            <MenuComponent.Item id="logout">로그아웃</MenuComponent.Item>
          </MenuComponent>
        </MenuComponent.Trigger>
      </ActionGroup>
    </Header>
  );
}

export default HeaderLayout;
