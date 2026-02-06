import React, { ReactNode } from "react";
import styled from "styled-components";
import { IconComponent } from "../icon";

interface HeaderRowProps {
  $isSpread: boolean;
}

interface InfoBoxGroupProps {
  gap?: number;
}

interface InfoBoxProps {
  bg?: string;
  icon: string;
  title: string;
  count: number | string;
  totalCount?: number | string;
  unit?: string;
  rightSide?: ReactNode;
  children?: ReactNode;
}

//style
export const InfoBoxGroup = styled.div<InfoBoxGroupProps>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ gap }) => (gap !== undefined ? `${gap}px` : "4px")};
  flex: 1;
`;

const InfoBox = styled.div`
  min-width: 140px;
  min-height: 62px;
  max-height: 66px;
  padding: 12px 16px;
  border-radius: 8px;
  background: rgba(232, 228, 235, 0.45);
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 6px;
`;

const HeaderRow = styled.div<HeaderRowProps>`
  display: flex;
  flex-direction: ${({ $isSpread }) => ($isSpread ? "row" : "column")};
  justify-content: ${({ $isSpread }) =>
    $isSpread ? "space-between" : "flex-start"};
  gap: 6px;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  color: #000;
`;

const Count = styled.div`
  font-size: 1.3333rem;
  font-weight: 700;
  line-height: 1rem;
  margin-left: 4px;

  span {
    color: #acacac;

    b {
      font-weight: 400;
      margin: 0 2px;
    }
  }

  small {
    font-size: 1rem;
    font-weight: normal;
    margin-left: 2px;
    color: #555;
  }
`;

const Content = styled.div``;

export const InfoBoxComponent: React.FC<InfoBoxProps> = ({
  bg,
  icon,
  title,
  count,
  totalCount,
  unit,
  rightSide,
  children,
}) => {
  const formatNumber = (v: number | string) => {
    if (typeof v === "number") return Number.isInteger(v) ? v : v.toFixed(1);
    const n = Number(v);
    if (Number.isNaN(n)) return v;
    return Number.isInteger(n) ? v : n.toFixed(1);
  };
  return (
    <InfoBoxGroup>
      <InfoBox style={{ background: bg }}>
        <HeaderRow $isSpread={!!rightSide}>
          <Title>
            <IconComponent name={icon} size={20} />
            <span>{title}</span>
          </Title>
          <Count>
            {formatNumber(count)}
            {totalCount && (
              <span>
                <b>/</b>
                {formatNumber(totalCount)}
              </span>
            )}
            {unit && <small>{unit}</small>}
          </Count>
        </HeaderRow>
        {children && <Content>{children}</Content>}
      </InfoBox>
    </InfoBoxGroup>
  );
};
