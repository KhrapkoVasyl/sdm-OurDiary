import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  fontFamily: '',
  fontWeightRegular: 400,
  fontWeightBold: 600,
  colorPrimary: '#00aab0',
  colorPrimaryLight: '#00c8cf',
  colorError: '#ff0050',
  colorWarning: '#f8a966',
  colorSuccess: '#00c4a1',
  colorBackgroundPrimary: '#ffffff',
  colorBackgroundSecondary: '#f7f7f7',
  colorLightGray: '#eaeaec',
  colorTextDark: '#000000',
  colorTextLight: '#ffffff',
  colorTextSecondary: '#585d62',
  colorTextTertiary: '#bcc2c8',
};

const ThemeConfig = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeConfig;
