import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import GlobalStyles from 'styles/GlobalStyles';
import ThemeConfig from 'styles/theme';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeConfig>
        <GlobalStyles />
        <App />
      </ThemeConfig>
    </BrowserRouter>
  </React.StrictMode>
);
