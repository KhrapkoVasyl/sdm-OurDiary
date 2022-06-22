import { createGlobalStyle } from 'styled-components';
import { getThemeValue } from 'utils/getThemeValue';

const GlobalStyles = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: inherit
    }

    html {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    body {
      width: 100%;
      height: calc(100% - 50px);
      background-color: ${getThemeValue('colorBackgroundSecondary')};
    }

    #root {
      width: 100%;
      height: 100%;
    }

    body::-webkit-scrollbar {
      width: 4px;
    }

    body::-webkit-scrollbar-thumb {
      background: #fff;
      border-radius: 10px;
    }

    body::-webkit-scrollbar-track {
      background: #202020;
    }
`;

export default GlobalStyles;
