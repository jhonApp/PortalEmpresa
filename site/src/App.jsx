// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import LoginVisitante from './components/Login/loginVisitante';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="Login/loginVisitante" element={<LoginVisitante />} />
        <Route path="Login/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
