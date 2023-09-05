import styled, { keyframes } from "styled-components";

export const StyledButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-right: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

export const StyledDisabledButton = styled(StyledButton)`
  pointer-events: none; 
  opacity: 0.5;
`

export interface CustomButtonProps {
  currentPage: number;
  onClick: () => void;
  text: string;
}

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// Стилізована кнопка з застосованою анімацією
export const BlinkingButton = styled(StyledButton)`
  background-color: green;
  animation: ${blink} 2s linear infinite; // Додаємо анімацію
`;
