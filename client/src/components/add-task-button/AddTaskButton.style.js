import styled from 'styled-components';
import { getThemeValue } from 'utils/getThemeValue';
import { BsFillPlusCircleFill } from 'react-icons/bs';

export const Button = styled.button`
  background: none;
  border: none;
  outline: none;
  background-color: ${getThemeValue('colorPrimary')};
  color: ${getThemeValue('colorTextLight')};
  padding: 6px;
  padding-right: 30px;
  font-family: inherit;
  display: flex;
  align-items: center;
  border-radius: 100px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${getThemeValue('colorPrimaryLight')};
  }
`;

export const AddIcon = styled(BsFillPlusCircleFill)`
  font-size: 30px;
  margin-right: 20px;
  border-radius: 50%;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.15);
`;
