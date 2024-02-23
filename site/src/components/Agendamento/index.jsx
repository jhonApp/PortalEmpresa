import React, { useState } from 'react';
import TipoAgendamento from './TipoAgendamento';
import Agendados from './Agendados';
import {atualizarTabela} from '../../../service/agendamentoService';

function Agendamento() {
  const [agendamentoData, setAgendamentoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isValid, setValid] = useState(true);

  const atualizarAgendamento = async () => {
    try {
      await atualizarTabela(setAgendamentoData, setLoading, setValid);
    } catch (error) {
      console.error('Erro ao atualizar tabela de agendamentos:', error);
    }
  };

  return (
    <div>
      <TipoAgendamento atualizarAgendamento={atualizarAgendamento} />
      <Agendados
        agendamentoData={agendamentoData}
        setAgendamentoData={setAgendamentoData}
        loading={loading}
        setLoading={setLoading}
        isValid={isValid}
        setValid={setValid}
        atualizarAgendamento={atualizarAgendamento}
      />
    </div>
  );
}

export default Agendamento;