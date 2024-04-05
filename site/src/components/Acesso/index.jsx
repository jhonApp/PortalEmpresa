import React, { useEffect, useState } from 'react';
import TipoAcesso from './TipoAcesso';
import Acessos from './Acessos';
import {atualizarTabela} from '../../../service/acessoService';

function Acesso() {
  const [acessoData, setAcessoData] = useState([]);
  const [status, setStatus] = useState('ativo');
  const [loading, setLoading] = useState(true);
  const [isValid, setValid] = useState(true);
  const [dataAtual, setDataAtual] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setDataAtual(new Date());
    }, 86400000); // Atualizando a cada 24 horas (24 * 60 * 60 * 1000 milissegundos)

    return () => clearInterval(timerID);
  }, []);

  const dataFutura = new Date(dataAtual.getTime() + 30 * 24 * 60 * 60 * 1000);

  const atualizarAcesso = async () => {
    try {
      await atualizarTabela(setAcessoData, setLoading, setValid, dataAtual, dataFutura);
    } catch (error) {
      console.error('Erro ao atualizar tabela de acessos:', error);
    }
  };

  return (
    <div>
      <TipoAcesso atualizarAcesso={atualizarAcesso} dataAtual={dataAtual} dataFutura={dataFutura}/>
      <Acessos
        acessoData={acessoData}
        setAcessoData={setAcessoData}
        loading={loading}
        setLoading={setLoading}
        isValid={isValid}
        setValid={setValid}
        atualizarAcesso={atualizarAcesso}
        setStatus={setStatus}
      />
    </div>
  );
}

export default Acesso;