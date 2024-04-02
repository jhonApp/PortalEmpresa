import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import GlobalStyles from './globalStyles';

const RootComponent = () => {
  return (
    <React.StrictMode>
      <GlobalStyles />
      <App />
    </React.StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<RootComponent />);