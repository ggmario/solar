import React from "react";
import styled from "styled-components";

interface TopInfoBoxComponentProps {
    bg?: string;
    color?: string;
    title?: string;
    children?: React.ReactNode;
    className?: string;
}

const TopInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 114px;
    padding: 8px 12px;
    border-radius: 8px;
    background: #ffeef4;
`;
const Title = styled.div`
    height: 24px;
    padding-top: 3px;
    color: #A91C50;
    font-family: 'GmarketSans';
    font-size: 1.2667rem;
    font-weight: 500;
`;
const Content = styled.div`
    
`;


export const TopInfoBoxComponent: React.FC<TopInfoBoxComponentProps> = ({ bg, color, title, children, className }) => {
    return (
        <TopInfoBox style={{ backgroundColor: bg }} className={className}>
            <Title style={{ color: color }}>{title}</Title>
            <Content>{children}</Content>
        </TopInfoBox>

    )
};
