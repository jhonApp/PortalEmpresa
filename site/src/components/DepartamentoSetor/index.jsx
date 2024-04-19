import React, { useState, useEffect } from 'react';
import MenuDepartamentoSetor from './Header';
import SecaoDepartamentoSetor from './SecaoDepartamentoSetor';
import {listarDepartamento} from '../../../service/departamentoSetorService';
import {getSetor} from '../../../service/departamentoSetorService';

function DepartamentoSetor() {
  const [setorData, setSetorData] = useState([]);
  const [departamentoData, setDepartamentoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isValid, setValid] = useState(true);

  const atualizaDepartamento = async () => {
    try {
      await listarDepartamento(setDepartamentoData, setLoading, setValid);
    } catch (error) {
      console.error('Erro ao atualizar tabela de agendamentos:', error);
    }
  };

  const atualizaSetor = async () => {
    try {
      
      await getSetor(setSetorData, setLoading, setValid);
    } catch (error) {
      console.error('Erro ao atualizar tabela de agendamentos:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await atualizaDepartamento();
      await atualizaSetor();
    };
    fetchData();
  }, []);

  return (
    <div>
      <MenuDepartamentoSetor atualizarDepartamento={atualizaDepartamento} atualizarSetor={atualizaSetor} />
      <SecaoDepartamentoSetor
        atualizaSetor={atualizaSetor}
        atualizaDepartamento={atualizaDepartamento}
        setorData={setorData}
        departamentoData={departamentoData}
        loading={loading}
        setLoading={setLoading}
        isValid={isValid}
        setValid={setValid}
      />
    </div>
  );
}

export default DepartamentoSetor;