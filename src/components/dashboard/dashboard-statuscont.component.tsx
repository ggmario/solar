import React from "react";
import styled from "styled-components";

interface StatusItem {
    title: string;
    count: number | string;
    unit?: string;
}

interface StatusContComponentProps {
    items: StatusItem[];
}

const StatusContGroup = styled.div`
    display: flex;
    align-items: center;
    height: 100%;

    div {
        flex: 1;  
    }

    strong {
        display: block;
        font-size: 1rem;
        font-weight: 500;
        color: #000;
        margin-bottom: 12px;
        line-height: 1
    }

    span {
        display: block;
        color: #D70251;
        font-family: 'GmarketSans';
        font-size: 1.6rem;
        font-weight: 700;
        line-height: 1;
    }

    small {
        color: #555;
        font-family: 'Pretendard';
        font-size: 1rem;
        font-weight: 400;
        line-height: 1;
        margin-left: 2px;
    }
`;

export const StatusContComponent: React.FC<StatusContComponentProps> = ({ items }) => {
    return (
        <StatusContGroup>
            {items.map((item, index) => (
                <div key={index}>
                    <strong>{item.title}</strong>
                    <span>
                        {item.count}
                        {item.unit && <small>{item.unit}</small>}
                    </span>
                </div>
            ))}
        </StatusContGroup>
    );
};