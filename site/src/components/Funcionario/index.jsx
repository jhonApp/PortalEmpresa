import React, { useState } from 'react';
import TipoFuncionario from '../Funcionario/TipoFuncionario';
import Funcionarios from '../Funcionario/Funcionarios';
import {atualizarTabela} from '../../../service/funcionarioService';

function Funcionario() {
  const [funcionarioData, setFuncionarioData] = useState([]);
  const [status, setStatus] = useState('ativo');
  const [loading, setLoading] = useState(true);
  const [isValid, setValid] = useState(true);

  const atualizarFuncionario = async () => {
    try {
      await atualizarTabela(setFuncionarioData, setLoading, setValid, status);
    } catch (error) {
      console.error('Erro ao atualizar tabela de funcionarios:', error);
    }
  };

  return (
    <div>
      <TipoFuncionario />
      <Funcionarios
        funcionarioData={funcionarioData}
        setFuncionarioData={setFuncionarioData}
        loading={loading}
        setLoading={setLoading}
        isValid={isValid}
        setValid={setValid}
        atualizarFuncionario={atualizarFuncionario}
        setStatus={setStatus}
      />
    </div>
  );
}

export default Funcionario;