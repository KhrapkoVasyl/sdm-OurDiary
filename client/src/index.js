import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import GlobalStyles from 'styles/GlobalStyles';
import ThemeConfig from 'styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeConfig>
      <GlobalStyles />
      <App />
    </ThemeConfig>
  </React.StrictMode>
);
