import ReactDOM from 'react-dom/client';
import App from './App';
import { AllProviders } from './helpers/AllProviders';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AllProviders>
      <Router>
        <App />
      </Router>
    </AllProviders>
  </React.StrictMode>
);
