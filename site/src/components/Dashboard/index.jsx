import React, { useState, useEffect } from 'react';
import { getNaoVisualizados } from '../../../service/muralService';
import { Box, Paper, Typography } from '@mui/material';
import Popup from '../Mural/Popup';
import './Dashboard.css';
import DadosDash from './DadosDash';
import Table from '../Table';
import { obeterUltimosAgendamentos } from '../../../service/agendamentoService';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { value: 10, label: 'Funcionários', color: '#6366F1' },
  { value: 10, label: 'Prestador de Serviço', color: '#F04235' },
  { value: 10, label: 'Visitante Especial', color: '#10B981' },
  { value: 10, label: 'Visitante Simples', color: '#F79009' },
];

const size = {
  width: 400,
  height: 200,
};

function Dashboard() {
  const [openPopups, setOpenPopups] = useState([]);
  const [muralData, setMuralData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isValid, setValid] = useState(true);
  const [agendamentoData, setAgendamentoData] = useState([]);

  const columns = [
    { id: 'nome', label: 'Nome', width: 100, align: 'center' },
    { id: 'rgCpf', label: 'RG', minWidth: 100, align: 'center' },
    { id: 'status', label: 'Status', width: 300, align: 'center' }
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
          style={{ borderRadius: '10px', position: 'relative', zIndex: '0', background: '#FAFAFA' }}
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
          style={{ borderRadius: '10px', position: 'relative', zIndex: '0', background: '#FAFAFA' }}
        >
          <Typography variant="h5" component="h1" style={{ fontSize: '24px', fontWeight: 'bold' }}>Últimos Acessos</Typography>
          <PieChart
            series={[
              {
                data,
                arcLabelMinAngle: 45,
                innerRadius: 93,
                outerRadius: 127,
                paddingAngle: 0,
                cornerRadius: 5,
                startAngle: -180,
                endAngle: 180,
                cx: 150,
                cy: 150,
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              },
            ]}
            slotProps={{
              legend: {
                direction: 'column',
                position: { vertical: 'bottom', horizontal: 'left' },
                // padding: 55,
                labelStyle: {
                  fontSize: 16,
                  fontWeight: 600,
                  fill: 'black',
                },
              },
            }}
            margin={{ top: 30, bottom: 0, left: 40, right:100 }}
            height={500}
          />
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
