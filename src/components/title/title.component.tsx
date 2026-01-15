import React from "react";
import styled from "styled-components";

type TitleComponentProps = {
  title?: string;
  subTitle?: string;
  desc?: string;
};


const TitleGroup = styled.div`
    display: flex;
    align-items: top;
    gap: 8px;
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-family:'GmarketSans';
    font-size: 1.6rem; 
    font-weight: 500;
`;

const Span = styled.span`
    color: #555;
    font-family:'Pretendard';
    font-size: 1.1333rem;
    font-weight: 400;
`;

const Text = styled.p`
    color: #555;
    font-size: 1.1333rem;
    margin-top: -12px;
    line-height: 1
`;


export const TitleComponent: React.FC<TitleComponentProps > = ({
 title,
 subTitle,
 desc
}) => {

  return (
    <div>
        <TitleGroup><Title>{title}</Title> <Span>{subTitle}</Span></TitleGroup>
        <Text>{desc}</Text>
    </div>
  );
};
export default TitleComponent;
