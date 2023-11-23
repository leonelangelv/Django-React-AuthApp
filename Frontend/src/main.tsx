import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './apps/App.tsx';
import { BrowserRouter } from 'react-router-dom';
require('dotenv').config();
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
