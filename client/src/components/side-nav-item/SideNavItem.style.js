import styled from 'styled-components';
import { getThemeValue } from 'utils/getThemeValue';

export const NavItem = styled.li`
  display: flex;
  align-items: center;
  column-gap: 20px;
  border-radius: 100px;
  padding: 14px;
  padding-right: 30px;
  padding-left: 13px;
  font-weight: ${getThemeValue('fontWeightBold')};
  font-size: 13px;
  color: ${getThemeValue('colorTextSecondary')};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &.active {
    background-color: ${getThemeValue('colorLightGray')};

    svg {
      color: ${getThemeValue('colorTextSecondary')};
    }
  }

  :hover:not(.active) {
    background-color: ${getThemeValue('colorLightGray')};
    svg {
      color: ${getThemeValue('colorTextSecondary')};
    }
  }

  svg {
    color: ${(props) => props.color};
    font-size: 18px;
    transition: color 0.2s ease;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
