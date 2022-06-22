import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  fontFamily: '',
  fontWeightRegular: 400,
  fontWeightBold: 600,
  colorPrimary: '#00aab0',
  colorPrimaryLight: '#00c8cf',
  colorSecondary: '#ff0050',
  colorBackgroundPrimary: '#ffffff',
  colorBackgroundSecondary: '#f7f7f7',
  colorTextDark: '#000000',
  colorTextLight: '#ffffff',
  colorTextSecondary: '#585d62',
  colorTextTertiary: '#bcc2c8',
};

const ThemeConfig = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeConfig;
