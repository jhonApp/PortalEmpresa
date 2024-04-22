import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import SkeletonComponent from './components/SkeletonComponent';
import Login from './components/Login';

const LoginVisitante = React.lazy(() => import('./components/Login/loginVisitante'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const Agendamento = React.lazy(() => import('./components/Agendamento'));
const DepartamentoSetor = React.lazy(() => import('./components/DepartamentoSetor'));
const Acesso = React.lazy(() => import('./components/Acesso'));
const ReservaEspaco = React.lazy(() => import('./components/ReservaEspaco'));
const Cargo = React.lazy(() => import('./components/Cargo'));
const Cartao = React.lazy(() => import('./components/Cartao'));
const Documento = React.lazy(() => import('./components/Documento'));
const Funcionario = React.lazy(() => import('./components/Funcionario'));
const Mural = React.lazy(() => import('./components/Mural'));
const FormFuncionario = React.lazy(() => import('./components/Funcionario/Formulario'));

function App() {
  return (
    <Router>
      <Suspense fallback={<SkeletonComponent />}>
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
      </Suspense>
      <ToastContainer />
    </Router>
  );
}

export default App;