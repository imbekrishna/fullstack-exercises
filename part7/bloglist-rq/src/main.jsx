import ReactDOM from 'react-dom/client';
import App from './App';
import { AllProviders } from './helpers/AllProviders';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AllProviders>
    <App />
  </AllProviders>
);
