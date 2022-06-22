import styled from 'styled-components';
import { getThemeValue } from 'utils/getThemeValue';
import { FaTrashAlt } from 'react-icons/fa';

export const Button = styled.button`
  background: none;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${getThemeValue('colorError')};
  padding: 9px;
  font-family: inherit;
  font-weight: 600;
  font-size: 12px;
  display: flex;
  align-items: center;
  border-radius: 100px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  p {
    flex: 1;
  }

  &:hover {
    background-color: ${getThemeValue('colorError')};
    color: #fff;
  }
`;

export const IconWrapper = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  border-radius: 50%;
  background-color: ${getThemeValue('colorError')};
`;

export const TrashIcon = styled(FaTrashAlt)`
  color: #fff;
`;
