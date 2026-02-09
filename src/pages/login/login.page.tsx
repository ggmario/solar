import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ButtonComponent,
  Checkbox,
  IconComponent,
  LoginBoxComponent,
  SearchFieldConfig,
  SearchFields,
} from "../../components/index";
import { Form } from "react-aria-components";
import { styled } from "styled-components";

import logo from "@assets/images/logo.svg";
import bgLogin from "@assets/images/bg_login.png";

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
  width: 960px;
`;
const LoginGroup = styled.div`
  display: flex;
`;
const LinkGroup = styled.div`
  display: flex;
  margin-left: auto;

  button {
    + button {
      &::before {
        display: inline-block;
        content: "";
        width: 1px;
        height: 10px;
        background: var(--gray-40);
        margin: 0 8px;
      }
    }
  }
`;

type LoginFormValues = {
  id: string;
  password: string;
  autoLogin: boolean;
};

export default function LoginPage() {
  const nav = useNavigate();
  const [values, setValues] = useState<LoginFormValues>({
    id: "",
    password: "",
    autoLogin: false,
  });

  const handleChange = <K extends keyof LoginFormValues>(
    key: K,
    value: LoginFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const loginConfig: (SearchFieldConfig | SearchFieldConfig[])[] = [
    {
      key: "id",
      label: "아이디",
      type: "text",
      required: true,
      placeholder: "아이디를 입력해 주세요",
      gridSize: 12,
    },
    {
      key: "password",
      label: "비밀번호",
      type: "password",
      required: true,
      placeholder: "비밀번호를 입력해 주세요",
      gridSize: 12,
    },
  ];

  return (
    <>
      <LoginWrap>
        <LoginGroup>
          <LoginBoxComponent
            title="Wiable Powerfabric"
            descriptions={[
              "SNS 계정으로 가입&로그인 하실 경우, 일부 서비스 이용에\n제한이 있을 수 있습니다.",
            ]}
            bg={`
              url(${bgLogin}) no-repeat left bottom / auto,
              linear-gradient(104deg, var(--point-pink-5) 10%, var(--point-orange-5) 90%)
            `}
          >
            <img
              src={logo}
              alt=""
              style={{ position: "absolute", left: 40, bottom: 40, width: 170 }}
            />
          </LoginBoxComponent>

          <LoginBoxComponent>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                // 아무거나 입력하면 통과 (둘 다 비어있으면 막기)
                const id = values.id.trim();
                const pw = values.password.trim();
                if (!id || !pw) return;
                localStorage.setItem("ACCESS_TOKEN", "dummy");
                nav("/dashboard", { replace: true });
              }}
            >
              <SearchFields
                config={loginConfig}
                values={values}
                onChange={(key, value) => {
                  if (key === "id") handleChange("id", String(value));
                  if (key === "password")
                    handleChange("password", String(value));
                }}
                columnSpacing={0}
              />

              <div className="side-group">
                <Checkbox className="auto-login-checkbox"
                  isSelected={values.autoLogin}
                  onChange={(checked: boolean) =>
                    handleChange("autoLogin", checked)
                  }
                >
                  자동 로그인
                </Checkbox>

                <LinkGroup>
                  <ButtonComponent
                    variant="none"
                    style={{padding:"10px"}}
                    onClick={() => nav("/login/find-id")}
                  >
                    아이디찾기
                  </ButtonComponent>
                  <ButtonComponent
                    variant="none"
                    style={{padding:0}}
                    onClick={() => nav("/login/find-pw")}
                  >
                    비밀번호 찾기
                  </ButtonComponent>
                </LinkGroup>
              </div>

              <ButtonComponent type="submit" variant="contained" mt={20}>
                로그인
              </ButtonComponent>

              <div className="button-group" style={{ marginTop: -4 }}>
                <ButtonComponent
                  variant="outlined"
                  icon={<IconComponent name="naver" size={16} />}
                  iconPosition="left"
                  ls={-1.1}
                  className="flex-1"
                  onClick={() => {}}
                >
                  네이버 로그인
                </ButtonComponent>
                <ButtonComponent
                  variant="outlined"
                  icon={<IconComponent name="google" size={16} />}
                  iconPosition="left"
                  ls={-1.1}
                  className="flex-1"
                  onClick={() => {}}
                >
                  구글 로그인
                </ButtonComponent>
                <ButtonComponent
                  variant="outlined"
                  icon={<IconComponent name="kakao" size={16} />}
                  iconPosition="left"
                  ls={-1.1}
                  className="flex-1"
                  onClick={() => {}}
                >
                  카카오 로그인
                </ButtonComponent>
              </div>
            </Form>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "var(--spacing-4)",
              }}
            >
              <p style={{ color: "var(--gray-50)" }}>아직 계정이 없으신가요?</p>
              <ButtonComponent
                variant="none"
                textColor="var(--point-pink-70)"
                underline
                onClick={() => nav("/login/signup-agree")}
              >
                회원가입
              </ButtonComponent>
            </div>
          </LoginBoxComponent>
        </LoginGroup>

        <div className="side-group">
          <p style={{ color: "var(--gray-50)" }}>
            Copyright © 2025 Wiable Corp. All Rights Reserved.
          </p>

          <LinkGroup>
            <ButtonComponent variant="none" underline onClick={() => {}} className="p-0">
              이용약관
            </ButtonComponent>
            <ButtonComponent variant="none" underline onClick={() => {}} className="p-0">
              개인정보처리방침
            </ButtonComponent>
          </LinkGroup>
        </div>
      </LoginWrap>
    </>
  );
}
