import styled from 'styled-components';
import { getThemeValue } from 'utils/getThemeValue';

export const Title = styled.h2`
  font-weight: 400;
  font-size: 18px;
`;

export const Description = styled.p`
  font-size: 13px;
  color: ${getThemeValue('colorTextTertiary')};
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
`;

export const Date = styled.p`
  font-size: 13px;
`;

export const DeleteButton = styled.button`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  color: ${getThemeValue('colorError')};
  cursor: pointer;
  transition: background-color 0.2s ease;

  :hover {
    background-color: ${getThemeValue('colorLightGray')};
  }
`;

export const EditButton = styled.button`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  color: ${getThemeValue('colorSuccess')};
  cursor: pointer;
  transition: background-color 0.2s ease;

  :hover {
    background-color: ${getThemeValue('colorLightGray')};
  }
`;
