import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import LoginVisitante from './components/Login/loginVisitante';
import Dashboard from './components/Dashboard';
import Agendamento from './components/Agendamento';
import DepartamentoSetor from './components/DepartamentoSetor';
import Cargo from './components/Cargo';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loginVisitante" element={<LoginVisitante />} />
        <Route
          path="/system/*"
          element={
            <Layout>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="agendamento" element={<Agendamento />} />
                <Route path="departamentoSetores" element={<DepartamentoSetor />} />
                <Route path="cargos" element={<Cargo />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
