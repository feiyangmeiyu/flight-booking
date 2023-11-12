import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

/**
 * Component library: PrimeReact
 */
import { PrimeReactProvider } from 'primereact/api';
import '/node_modules/primeflex/primeflex.css';
//theme
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>,
);
