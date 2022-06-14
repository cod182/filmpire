import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'

import './index.css';

import App from './components/App';
import store from './app/store';

const theme = createTheme({});
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
);
