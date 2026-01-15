import styled from "styled-components";

interface TextBoxGroupProps {
    gap?: number;
}

interface TextBoxProps {
    title: string;
    content: string;
}

//style
export const TextBoxGroup = styled.div<TextBoxGroupProps>`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ gap }) => (gap !== undefined ? `${gap}px` : "4px")};
`;

const TextBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 26px;
    padding: 8px;
    border-radius: 4px;
    background: #f4f3f6;
    width: calc(50% - 4px)
`;

const Title = styled.div`
    color: #555;
    font-size: 0.9333rem;
`;

const Content = styled.div`
    font-size: 0.9333rem;
    font-weight: 500;
    letter-spacing: -1px;
`;

export const TextBoxComponent: React.FC<TextBoxProps> = ({ title, content }) => {
    return (
        <TextBox>
            <Title>{title}</Title>
            <Content>{content}</Content>
        </TextBox>
    );
};
