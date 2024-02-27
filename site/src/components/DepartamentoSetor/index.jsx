import React, { useState } from 'react';
import MenuDepartamentoSetor from './Header';
// import Agendados from './Agendados';
import {atualizarTabela} from '../../../service/agendamentoService';

function DepartamentoSetor() {
  const [agendamentoData, setAgendamentoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isValid, setValid] = useState(true);

  const atualizarDepartamentoSetor = async () => {
    try {
      await atualizarTabela(setAgendamentoData, setLoading, setValid);
    } catch (error) {
      console.error('Erro ao atualizar tabela de agendamentos:', error);
    }
  };

  return (
    <div>
      <MenuDepartamentoSetor atualizarDepartamentoSetor={atualizarDepartamentoSetor} />
      {/* <Agendados
        agendamentoData={agendamentoData}
        setAgendamentoData={setAgendamentoData}
        loading={loading}
        setLoading={setLoading}
        isValid={isValid}
        setValid={setValid}
        atualizarAgendamento={atualizarAgendamento}
      /> */}
    </div>
  );
}

export default DepartamentoSetor;