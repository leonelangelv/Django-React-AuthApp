import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './apps/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import { UserProvider } from '@contexts/UserContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
