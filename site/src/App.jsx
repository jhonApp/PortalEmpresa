import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import LoginVisitante from './components/Login/loginVisitante';
import Dashboard from './components/Dashboard';
import Agendamento from './components/Agendamento';
import DepartamentoSetor from './components/DepartamentoSetor';
import Acesso from './components/Acesso';
import ReservaEspaco from './components/ReservaEspaco';
import Cargo from './components/Cargo';
import Cartao from './components/Cartao';
import Documento from './components/Documento';
import Funcionario from './components/Funcionario';
import Mural from './components/Mural';
import FormFuncionario from './components/Funcionario/Formulario';
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
                <Route path="cartoes" element={<Cartao />} />
                <Route path="funcionarios" element={<Funcionario />} />
                <Route path="funcionarios/novo-funcionario" element={<FormFuncionario />} />
                <Route path="acessos" element={<Acesso />} />
                <Route path="reservaEspacos" element={<ReservaEspaco />} />
                <Route path="documentos" element={<Documento />} />
                <Route path="mural" element={<Mural />} />
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
