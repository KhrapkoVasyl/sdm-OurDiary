import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import GlobalStyles from 'styles/GlobalStyles';
import ThemeConfig from 'styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'features';
import APITokenHandler from 'api/APITokenHandler';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeConfig>
          <APITokenHandler />
          <GlobalStyles />
          <App />
        </ThemeConfig>
      </BrowserRouter>
    </Provider>
  </>
);
