import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import { XCircle } from 'phosphor-react';
import Table from '../Table';
import { getEvento } from '../../../service/eventoService';

const ModalReservas = ({ open, onClose, dataEvento }) => {
  const [eventoData, setEventoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setDataEvento] = useState(dataEvento);
  const [isValid, setValid] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dataEvento) { 
          await getEvento(setEventoData, setLoading, setValid, dataEvento);
        }
      } catch (error) {
        console.error('Erro ao atualizar tabela de agendamentos:', error);
      }
    };

    fetchData();
  }, [dataEvento]);

  const columns = [
    { id: 'responsavel', label: 'Responsável', minWidth: 100, align: 'center' },
    { id: 'local', label: 'Local', width: 200, align: 'center' },
    { id: 'dataEventoString', label: 'Data do Evento', minWidth: 100, align: 'center' },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50%', minHeight: '45%', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '20px', overflow: 'auto' }}>
        <IconButton onClick={onClose} style={{ position: 'absolute', top: 0, right: 0 }}>
          <XCircle size={28} color="#FF0B0B" />
        </IconButton>
        <Typography variant="h6" component="h7" style={{ fontWeight: 600, fontSize: 24 }}>
          Reservas do dia
        </Typography>
        <Box display="flex" marginTop={2}>
            <Table
            data={eventoData}
            window={"reserva"}
            columns={columns}
            loading={loading}
            isValid={isValid}
            />
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalReservas;
