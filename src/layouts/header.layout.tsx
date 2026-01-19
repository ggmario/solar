// header.layout.tsx
import { Button, Group, Key } from "react-aria-components";
import { IconComponent, MenuComponent } from "@components";
import styled from "styled-components";

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
    const handleMenuAction = (key: Key): void => {
        console.log("Selected:", key);

        switch (key) {
            case "profile":
                // 프로필 페이지로 이동
                break;
            case "settings":
                // 설정 페이지로 이동
                break;
            case "logout":
                // 로그아웃 처리
                break;
        }
    };

    return (
        <Header>
            <ActionGroup>
                {/* 알람 버튼 */}
                <IconButton aria-label="Notifications">
                    <IconComponent name="alarm" />
                </IconButton>

                {/* 프로필 메뉴 */}
                <MenuComponent.Trigger>
                    <IconButton aria-label="User menu" style={{ gap: 8 }}>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                            <img src={ProfileImg} alt="Profile" />
                            <dl style={{ textAlign: "left" }}>
                                <dt style={{ fontWeight: 600 }}>wiable_admin</dt>
                                <dd>발전소 모드</dd>
                            </dl>
                        </div>
                        <IconComponent name="arrow_down" size={16} cursor="pointer" />
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
