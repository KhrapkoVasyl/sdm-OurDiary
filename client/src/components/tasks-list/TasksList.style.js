import styled from 'styled-components';
import { getThemeValue } from 'utils/getThemeValue';

export const TableContainer = styled.div`
  height: calc(100% - 70px);
  overflow: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${getThemeValue('colorTextTertiary')};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const Table = styled.table`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-right: 20px;

  tbody tr td {
    padding-bottom: 20px;
  }

  tbody tr td:nth-last-child(-n + 2) {
    text-align: end;
  }
`;

export const TableHead = styled.thead`
  th {
    font-size: 13px;
    text-align: left;
    color: ${getThemeValue('colorTextSecondary')};
  }

  th:nth-last-child(-n + 2) {
    width: 4%;
  }
`;
