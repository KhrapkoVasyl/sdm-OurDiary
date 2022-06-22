import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  column-gap: 50px;
  height: 100%;
`;

export const LeftSide = styled.div`
  flex: 0.25;
  background-color: antiquewhite;
`;

export const Main = styled.main`
  flex: 0.75;
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  overflow: hidden;
`;
