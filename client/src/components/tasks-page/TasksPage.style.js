import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
`;

export const PageHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 400;
  display: flex;
  align-items: center;

  svg {
    color: ${(props) => props.iconColor};
    margin-right: 20px;
  }
`;
