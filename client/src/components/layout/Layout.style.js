import styled from 'styled-components';
import { getThemeValue } from 'utils/getThemeValue';

export const Layout = styled.div`
  display: flex;
  column-gap: 50px;
  height: 100%;
`;

export const Aside = styled.aside`
  flex: 0.2;
  padding-top: 50px;
`;

export const Main = styled.main`
  flex: 0.8;
  background-color: ${getThemeValue('colorBackgroundPrimary')};
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  overflow: hidden;
  padding: 50px;
  padding-top: 50px;
`;
