import React, { useState, useEffect } from 'react';
import Menu from './Header';
import Pagination from './PaginaComunicado';
import { getMural } from '../../../service/muralService';

function Mural() {
  const [muralData, setMuralData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isValid, setValid] = useState(true);

  const atualizaMural = async () => {
    try {
      await getMural(setMuralData, setLoading, setValid);
    } catch (error) {
      console.error('Erro ao atualizar tabela de comunicados: ', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await atualizaMural();
    };
    fetchData();
  }, []);

  return (
    <div>
      <Menu atualizaMural={atualizaMural} />
      <Pagination
        muralData={muralData}
        loading={loading}
        setLoading={setLoading}
        atualizaMural={atualizaMural}
      />
    </div>
  );
}

export default Mural;