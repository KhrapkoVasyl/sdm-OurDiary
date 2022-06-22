import styled from 'styled-components';
import { getThemeValue } from 'utils/getThemeValue';

export const Layout = styled.div`
  display: flex;
  column-gap: 50px;
  height: 100%;
`;

export const Aside = styled.aside`
  flex: 0.2;
`;

export const Main = styled.main`
  flex: 0.8;
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  overflow: hidden;
`;
