import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Paper, Typography, Radio, ListItemButton, ListItemText } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import { X } from 'phosphor-react';
import { inserirSecaoCargo } from '../../../service/secaoService';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { StyledCardSecao } from '../../Utils/StyledCard';

const SecaoCargo = ({ setorData, departamentoData, cargoData }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSubgroup, setSelectedSubgroup] = useState(null);
  const [selectedCargos, setSelectedCargos] = useState([]);
  const [cargosAssociados, setCargosAssociados] = useState([]);
  const [checked, setChecked] = useState({});
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleGroupChange = (group) => {
    setSelectedGroup(group);
    console.log(selectedSubgroup)
  };

  const handleSubgroupChange = (group) => {
    setSelectedSubgroup(group);
  setSelectedCargos([]);
    console.log(selectedCargos)
  };

  const handleCargoChange = (cargoGroup) => {
    const isSelected = selectedCargos.some(sub => sub.codigo === cargoGroup.codigo);
    if (isSelected) {
      console.log(isSelected)
      setSelectedCargos(selectedCargos.filter(sub => sub.codigo !== cargoGroup.codigo));
    } else {
      setSelectedCargos([...selectedCargos, cargoGroup]);
    }
  };

  useEffect(() => {
    if (selectedCargos.length > 0) {
      handleAssociacao();
    }
  }, [selectedCargos]);

  const handleAssociacao = async () => {
    setLoading(true);
    try {

      const cargosNaoAssociados = selectedCargos.filter(cargo => (
        !cargosAssociados.includes(cargo.codigo)
      ));
  
      const secoes = cargosNaoAssociados.map(cargo => ({
        codigoDepartamento: selectedGroup.codigo,
        codigoSetor: selectedSubgroup.codigo,
        codigoCargo: cargo.codigo
      }));
  
      await Promise.all(secoes.map(secao => inserirSecaoCargo(secao)));
  
      // Atualizando lista de cargos associados
      setCargosAssociados(prev => [
        ...prev,
        ...cargosNaoAssociados.map(cargo => cargo.codigo)
      ]);
  
      showSuccessToast("Associação realizada com sucesso");
    } catch (error) {
      showErrorToast(error.message);
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
                    .filter(cargo => !selectedSubgroup.codigoSetorSecao.some((codigo) => cargo.codigoSetorSecao.includes(codigo))
                    )
                    .map((cargo, index) => (
                      <ListItemButton 
                        key={index} 
                        onClick={() => handleCargoChange(cargo)}
                      >
                        <Checkbox
                          checked={selectedCargos.some(sub => sub.codigo === cargo.codigo)}
                          name="cargogroup-checkbox"
                          inputProps={{ 'aria-label': cargo.nome }}
                        />
                        <ListItemText primary={cargo.nome} />
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