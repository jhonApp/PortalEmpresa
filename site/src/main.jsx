import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const RootComponent = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

ReactDOM.render(<RootComponent />, document.getElementById('root'));