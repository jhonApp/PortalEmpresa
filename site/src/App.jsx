import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import LoginVisitante from './components/Login/loginVisitante';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/loginVisitante" element={<LoginVisitante />} />
        </Routes>
        <ToastContainer />
      </>
    </Router>
  );
}

export default App;