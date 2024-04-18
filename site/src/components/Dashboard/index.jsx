import React, { useState, useEffect } from 'react';
import { getNaoVisualizados } from '../../../service/muralService';
import { Box, Paper, Typography } from '@mui/material';
import Popup from '../Mural/Popup';
import './Dashboard.css';
import DadosDash from './DadosDash';
import Table from '../Table';
import { obeterUltimosAgendamentos } from '../../../service/agendamentoService';

function Dashboard() {
  const [openPopups, setOpenPopups] = useState([]);
  const [muralData, setMuralData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isValid, setValid] = useState(true);
  const [agendamentoData, setAgendamentoData] = useState([]);

  const columns = [
    { id: 'nome', label: 'Nome', width: 100, align: 'center' },
    { id: 'rgCpf', label: 'RG', minWidth: 80, align: 'center' },
    { id: 'status', label: 'Status', width: 150, align: 'center' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      await obeterUltimosAgendamentos(setAgendamentoData, setLoading, setValid);
    };

    fetchData();
  }, []);

  const atualizaMural = async () => {
    try {
      const data = await getNaoVisualizados(setMuralData, setLoading, setValid);
      setOpenPopups(new Array(data.length).fill(true));
      console.log(data);
    } catch (error) {
      console.error('Erro ao exibir os comunicados: ', error);
    }
  };

  useEffect(() => {
    atualizaMural();
  }, []);

  const handleClosePopup = (index) => {
    const updatedPopups = [...openPopups];
    updatedPopups[index] = false;
    setOpenPopups(updatedPopups);
  };

  return (
    <div className="dashboard-container">
      <div className="page-content">
        <DadosDash agendamento={agendamentoData} />
        <Box
          gap={1}
          margin={2}
          padding={2}
          width={"868px"}
          component={Paper}
          style={{ borderRadius: '10px', position: 'relative', zIndex: '0' }}
        >
          <Typography variant="h5" component="h1" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px' }}>Últimos agendamentos</Typography>
          <Table data={agendamentoData} window={"agendamento"} columns={columns} loading={loading} isValid={isValid} hadleDelete={null} PopupManager={null} updateTable={null} />
        </Box>
      </div>
      <div>
        <Box
          gap={1}
          margin={2}
          padding={2}
          width={"400px"}
          height={"700px"}
          component={Paper}
          style={{ borderRadius: '10px', position: 'relative', zIndex: '0' }}
        >
          <Typography variant="h5" component="h1" style={{ fontSize: '24px', fontWeight: 'bold' }}>Últimos Acessos</Typography>
        </Box>
      </div>
      {muralData.map((item, index) => (
        <div key={index} style={{ position: 'relative', zIndex: '2' }}>
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
      ))}
    </div>
  );
  
}

export default Dashboard;
