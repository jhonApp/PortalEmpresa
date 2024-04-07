import React, { useState, useEffect } from 'react';
import Menu from './Header';
import Progress from '../../Utils/LoadingProgress';
import { listarEspaco } from '../../../service/espacoService';
import Pagination from './Pagina';

function ReservaEspaco() {
  const [loading, setLoading] = useState(true);
  const [espacos, setEspacos] = useState([]);

  const atualizaEspacos = async () => {
    try {
      setLoading(true);
      const listaEspacos = await listarEspaco();
      
      setEspacos(listaEspacos);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Erro ao obter lista de espaços', error);
    }
  };

  useEffect(() => {
    atualizaEspacos();
  }, []);

  return (
    <div>
      <Menu espacos={espacos} atualizaEspacos={atualizaEspacos}/>
      <Pagination
        espacos={espacos}
        loading={loading}
        setLoading={setLoading}
        atualizaEspacos={atualizaEspacos}
      />
      <Progress isVisible={loading} />
    </div>
  );
}

export default ReservaEspaco;