import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { IconComponent } from '../icon/icon.component';
import { IconName } from '../../assets/icons/icon-map';

interface HeaderRowProps {
  $isSpread: boolean;
}

interface InfoBoxGroupProps {
  gap?: number;
}

interface InfoBoxProps {
  bg?: string;
  icon: IconName;
  title: string;
  count: number | string;
  totalCount?: number | string;
  unit?: string;
  rightSide?: ReactNode;
  children?: ReactNode;
}

export const InfoBoxGroup = styled.div<InfoBoxGroupProps>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ gap }) => (gap !== undefined ? `${gap}px` : '4px')};
  flex: 1;
`;

const InfoBox = styled.div`
  min-width: 140px;
  min-height: 62px;
  padding: 12px 16px;
  border-radius: 8px;
  background: rgba(232, 228, 235, 0.45);
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex:1 1 0%;
`;

const HeaderRow = styled.div<HeaderRowProps>`
  display: flex;
  flex-direction: ${({ $isSpread }) => ($isSpread ? 'row' : 'column')};
  justify-content: ${({ $isSpread }) =>
    $isSpread ? 'space-between' : 'flex-start'};
  gap: 6px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
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
    margin-left: 2px;
    color: #555;
  }
`;

export const InfoBoxComponent: React.FC<InfoBoxProps> = ({
  bg,
  icon,
  title,
  count,
  totalCount,
  unit,
  children,
}) => {
  return (
    <InfoBoxGroup>
      <InfoBox style={{ background: bg }}>
        <HeaderRow $isSpread={false}>
          <Title>
            <IconComponent name={icon} size={20} />
            <span>{title}</span>
          </Title>
          <Count>
            {count}
            {totalCount && (
              <span>
                <b>/</b>
                {totalCount}
              </span>
            )}
            {unit && <small>{unit}</small>}
          </Count>
        </HeaderRow>
        {children}
      </InfoBox>
    </InfoBoxGroup>
  );
};
