import styled from 'styled-components';

// Создаем стилизованный компонент для списка
export const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Создаем стилизованный компонент для элемента списка
export const StyledListItem = styled.li`
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #f4f4f4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;