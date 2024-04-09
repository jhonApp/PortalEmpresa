import React, { useState, useEffect } from 'react';
import { getNaoVisualizados } from '../../../service/muralService';
import { Box, Paper, Typography} from '@mui/material';
import Popup from '../Mural/Popup';
import './Dashboard.css';
import DadosDash from './DadosDash';
import Table from '../Table'
import {obeterUltimosAgendamentos} from '../../../service/agendamentoService';

function Dashboard() {
  const [openPopups, setOpenPopups] = useState([]);
  const [muralData, setMuralData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isValid, setValid] = useState(true);
  const [agendamentoData, setAgendamentoData] = useState([]);

  const columns = [
    { id: 'nome', label: 'Nome', width: 100, align: 'center' },
    { id: 'rgCpf', label: 'RG', minWidth: 80, align: 'center'},
    { id: 'descricaoDataInicial', label: 'Data Inicial', minWidth: 140, align: 'center', },
    { id: 'descricaoDataFim', label: 'Data Final', minWidth: 140, align: 'center', },
    { id: 'status', label: 'Status', width: 150, align: 'center', }
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
        <DadosDash agendamento={agendamentoData} />
        <Box
          gap={1}
          marginX={1}
          margin={2}
          padding={2}
          width={"868px"}
          paddingX={2}
          paddingBottom={3}
          display="flex"
          backgroundColor="#FAFAFA"
          flexDirection="column"
          style={{ borderRadius: '10px' }}
          component={Paper}
        >
          <Box display="flex" fontSize={'24px'} gap={2} marginTop={2} flexDirection={"column"}>
            <Typography variant="h5" component="h1" style={{ fontSize: '24px' ,fontWeight: 'bold' }}>Últimos agendamentos</Typography>
            <Table data={agendamentoData} window={"agendamento"} columns={columns} loading={loading} isValid={isValid} hadleDelete={null} PopupManager={null} updateTable={null}/>
          </Box>
        </Box>
      </div>
      <div>
        <Box
          gap={1}
          marginX={1}
          margin={2}
          padding={2}
          width={"400px"}
          height={"700px"}
          paddingX={2}
          paddingBottom={3}
          display="flex"
          backgroundColor="#FAFAFA"
          flexDirection="column"
          style={{ borderRadius: '10px' }}
          component={Paper}
        >
          <Box display="flex" fontSize={'24px'} gap={2} marginTop={2} flexDirection={"column"}>
            <Typography variant="h5" component="h1" style={{ fontSize: '24px' ,fontWeight: 'bold' }}>Últimos Acessos</Typography>
          </Box>
        </Box>
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