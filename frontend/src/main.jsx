import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Note: Bootstrap CSS is provided by Vuexy's /assets/vendor/css/core.css via index.html
// FontAwesome is kept for legacy icon usage in page components
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
