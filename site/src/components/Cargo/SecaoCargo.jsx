import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Paper, Typography, Radio, ListItemButton, ListItemText } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import { X } from 'phosphor-react';
import { inserirSecaoCargo, deleteSecaoCargo } from '../../../service/secaoService';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { StyledCardSecao } from '../../Utils/StyledCard';

const SecaoCargo = ({ setorData, departamentoData, cargoData, atualizaCargo, atualizaSetor, atualizaDepartamento }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSubgroup, setSelectedSubgroup] = useState(null);
  const [selectedCargos, setSelectedCargos] = useState([]);
  const [cargosAssociados, setCargosAssociados] = useState([]);
  const [loading, setLoading] = useState(false);

  const isSelected = (cargo) => selectedCargos.some((selectedCargo) => selectedCargo.codigo === cargo.codigo);

  const handleGroupChange = (group) => {
    setSelectedGroup(group);
    setSelectedSubgroup(null);
    setSelectedCargos([]);
  };

  const handleSubgroupChange = (group) => {
    setSelectedSubgroup(group);
    setSelectedCargos([]);
  };

  const handleCargoChange = async (event, cargo) => {
    if (!event.target.checked) {
      try {
        await deleteSecaoCargo(cargo.codigo, selectedGroup.codigo, selectedSubgroup.codigo);
        showSuccessToast("Associação desfeita com sucesso.");
      } catch (error) {
        showErrorToast("O registro associado está em uso.");
      }
    } else {
      await handleAssociacao(cargo);
    }
    atualizaSetor();
    atualizaCargo();
  };

  useEffect(() => {
    if (selectedSubgroup) {
      // Obtém os códigos dos cargos associados ao subgrupo selecionado
      const associatedCargosCodes = selectedSubgroup.codigoSetorSecao;
  
      // Filtra apenas os cargos não associados com base nos códigos
      const unassociatedCargos = cargoData.filter((cargo) => (
        associatedCargosCodes.some(codigo => cargo.codigoSetorSecao.includes(codigo))
      ));
      
      setSelectedCargos([...unassociatedCargos]);
      
    }
  }, [selectedSubgroup, cargoData]);  
  
  const handleAssociacao = async (cargo) => {
    setLoading(true);
    try {
      const secao = {
        codigoDepartamento: selectedGroup.codigo,
        codigoSetor: selectedSubgroup.codigo,
        codigoCargo: cargo.codigo
      };
      
      await inserirSecaoCargo(secao);
      showSuccessToast(`Associação realizada com sucesso.`);

    } catch (error) {
      showErrorToast(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <Box
      gap={1}
      marginX={1}
      margin={2}
      padding={2}
      paddingX={2}
      paddingBottom={3}
      display="flex"
      backgroundColor="#FAFAFA"
      flexDirection="column"
      style={{ borderRadius: '10px' }}
      component={Paper}
    >
      <Grid container spacing={2} justifyContent="start" alignItems="top">
        <Grid item>
          <Typography variant="h6" component="h1" style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '20px', marginBottom: '10px' }}>Departamento</Typography>
          <StyledCardSecao>
            <List>
              {departamentoData.map((departamento, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => handleGroupChange(departamento)}
                >
                  <Radio
                    checked={selectedGroup && selectedGroup.codigo === departamento.codigo}
                    name="group-radio"
                    inputProps={{ 'aria-label': departamento.nome }}
                  />
                  <ListItemText sx={{ fontSize: '16px', fontWeight: 600 }} primary={departamento.nome} />
                </ListItemButton>
              ))}
            </List>
          </StyledCardSecao>
        </Grid>
        {selectedGroup && (
          <>
            <div style={{ marginTop: '15%', marginLeft: '14px' }}>
              <X size={32} />
            </div>
            <Grid item>
              <Typography variant="h6" component="h1" style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '20px', marginBottom: '10px' }}>Setores</Typography>
              <StyledCardSecao sx={{ borderRadius: '20px', width: '300px', height: '369px', overflowY: 'auto' }}>
                <List>
                  {setorData
                    .filter((setor) => (
                      selectedGroup.codigoSetorSecao.some((codigo) => setor.codigoSetorSecao.includes(codigo))
                    ))
                    .map((setor, index) => (
                      <ListItemButton
                        key={index}
                        onClick={() => handleSubgroupChange(setor)}
                      >
                        <Radio
                          checked={selectedSubgroup && selectedSubgroup.codigo === setor.codigo}
                          name="group-radio"
                          inputProps={{ 'aria-label': setor.nome }}
                        />
                        <ListItemText sx={{fontSize:'16px', fontWeight: 600 }} primary={setor.nome} />
                      </ListItemButton>
                    ))}
                </List>
              </StyledCardSecao>
            </Grid>
          </>
        )}
        {selectedSubgroup && (
          <>
            <div style={{ marginTop: '15%', marginLeft: '14px' }}>
              <X size={32} />
            </div>
            <Grid item>
              <Typography variant="h6" component="h1" style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '20px', marginBottom: '10px' }}>Cargos</Typography>
              <StyledCardSecao sx={{ borderRadius: '20px', width: '300px', height: '369px', overflowY: 'auto' }}>
                <List>
                  {cargoData
                    .sort((a, b) => isSelected(b) - isSelected(a)) // Ordena os cargos com base na seleção
                    .map((cargo, index) => (
                      <ListItemButton 
                        key={index} 
                        onClick={(event) => handleCargoChange(event, cargo)}
                      >
                        <Checkbox
                          checked={isSelected(cargo)} // Verifica se o cargo está selecionado
                          name="cargogroup-checkbox"
                          inputProps={{ 'aria-label': cargo.nome }}
                        />
                        <ListItemText>
                          <Typography variant="h6" component="h1" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                            {cargo.nome}
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                    ))
                  }
                </List>
              </StyledCardSecao>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}

export default SecaoCargo;