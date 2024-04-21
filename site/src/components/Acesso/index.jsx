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
  const [formData, setFormData] = useState({
    bloco: '',
    unidade: '',
    empresa: '',
    nome: '',
    rg: '',
    dataInicial: null,
    dataFim: null,
    tipo: ''
  });

  // useEffect(() => {
  //   const timerID = setInterval(() => {
  //     setDataAtual(new Date());
  //   }, 86400000);
  
  //   return () => clearInterval(timerID);
  // }, []);
  
  useEffect(() => {
    
    const dataInicial = new Date();
    setFormData(prevState => ({
      ...prevState,
      dataInicial
    }));
    
    const dataFim = new Date(dataInicial.getTime() + 30 * 24 * 60 * 60 * 1000);
    setFormData(prevState => ({
      ...prevState,
      dataFim
    }));
  }, []);

  const atualizarAcesso = async () => {
    try {
      await atualizarTabela(setAcessoData, setLoading, setValid, formData);
    } catch (error) {
      console.error('Erro ao atualizar tabela de acessos:', error);
    }
  };

  return (
    <div>
      {formData.dataInicial && formData.dataFim && (
        <>
          <TipoAcesso acessoData={acessoData} atualizarAcesso={atualizarAcesso} dataAtual={formData.dataInicial} dataFutura={formData.dataFim}/>
          <Acessos
            acessoData={acessoData}
            setAcessoData={setAcessoData}
            loading={loading}
            setLoading={setLoading}
            isValid={isValid}
            setValid={setValid}
            atualizarAcesso={atualizarAcesso}
            setStatus={setStatus}
            formData={formData}
            setFormData={setFormData}
          />
        </>
      )}
    </div>
  );
  
}

export default Acesso;