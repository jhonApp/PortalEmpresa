import React, { useState, useEffect } from 'react';
import Menu from './Header';
import Pagination from './PaginaDocumentos';
import { getDocumento } from '../../../service/documentoService';

function Documento() {
  const [documentoData, setDocumentoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isValid, setValid] = useState(true);

  const atualizaDocumento = async () => {
    try {
      await getDocumento(setDocumentoData, setLoading, setValid);
    } catch (error) {
      console.error('Erro ao atualizar tabela de documento: ', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await atualizaDocumento();
    };
    fetchData();
  }, []);

  return (
    <div>
      <Menu atualizaDocumento={atualizaDocumento} documentoData={documentoData} />
      <Pagination
        documentoData={documentoData}
        loading={loading}
        setLoading={setLoading}
        atualizaDocumento={atualizaDocumento}
      />
    </div>
  );
}

export default Documento;