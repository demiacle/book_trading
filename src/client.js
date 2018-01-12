import App from './App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';

// Creates a react client from a static page

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

hydrate(
  <BrowserRouter>
    <App {...preloadedState}/>
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
