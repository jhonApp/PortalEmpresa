import React, { useState, useEffect } from 'react';
import Menu from './Header';
import Pagination from './PaginaCartoes';
import { getCartao } from '../../../service/cartaoService';

function Cartao() {
  const [cartaoData, setCartaoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isValid, setValid] = useState(true);

  const atualizaCartao = async () => {
    try {
      await getCartao(setCartaoData, setLoading, setValid);
    } catch (error) {
      console.error('Erro ao atualizar tabela de cartão: ', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await atualizaCartao();
    };
    fetchData();
  }, []);

  return (
    <div>
      <Menu atualizarCartao={cartaoData} />
      <Pagination
        cartaoData={cartaoData}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}

export default Cartao;