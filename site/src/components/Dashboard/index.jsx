import React, { useState, useEffect } from 'react';
import { getNaoVisualizados } from '../../../service/muralService';
import Popup from '../Mural/Popup';
import './Dashboard.css';

function Dashboard() {
  const [openPopups, setOpenPopups] = useState([]);
  const [muralData, setMuralData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isValid, setValid] = useState(true);

  const atualizaMural = async () => {
    try {
      const data = await getNaoVisualizados(setMuralData, setLoading, setValid);
      console.log(data)
      setOpenPopups(new Array(data.length).fill(true));
    } catch (error) {
      console.error('Erro ao exibir os comunicados: ', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await atualizaMural(setMuralData, setLoading, setValid);
    };
    fetchData();
  }, []);

  const handleClosePopup = (index) => {
    const updatedPopups = [...openPopups];
    updatedPopups[index] = false;
    setOpenPopups(updatedPopups);
  };

  return (
    <div className="dashboard-container">
      <div className="page-content">
        <h1>Dashboard</h1>
      </div>
      {muralData.map((item, index) => {
          return (
              <div key={index}>
                  <Popup 
                      open={openPopups[index]}
                      handleClose={() => handleClosePopup(index)}
                      atualizaMural={atualizaMural}
                      codigoComunicado={item.idComunicado}
                      title={item.tituloPopup} 
                      sub={item.titulo} 
                      description={item.mensagem}
                      type={item.tipoExibicao} 
                      enquetes={item.opcaoEnquete}
                      className="popup"
                  />
              </div>
          );
      })}
    </div>
  );
}

export default Dashboard;