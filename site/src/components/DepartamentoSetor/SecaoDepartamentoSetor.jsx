import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Paper, Typography, Radio, Checkbox } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { X } from 'phosphor-react';
import { inserirSecao, deleteSecao } from '../../../service/secaoService';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { StyledCardSecao } from '../../Utils/StyledCard';

const SecaoDepartamentoSetor = ({ atualizaSetor, atualizaDepartamento, setorData, departamentoData }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSubgroups, setSelectedSubgroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [setorDataLocal, setSetorDataLocal] = useState([]);
  const [departamentoLocal, setDepartamentoLocal] = useState([]);
  const [subgroupSelection, setSubgroupSelection] = useState({});

  useEffect(() => {
    setSetorDataLocal(setorData);
  }, [setorData]);

  useEffect(() => {
    setDepartamentoLocal(departamentoData);
  }, [departamentoData]);

  const isSelected = (setor) => selectedGroup.codigoSetorSecao.some(codigo => setor.codigoSetorSecao.includes(codigo));

  const handleGroupChange = (group) => {
    setSelectedGroup(group);
    setSelectedSubgroups([]);
    setSubgroupSelection({});
  };

  const handleSubgroupChange = async (event, subgroup) => {
    if (!event.target.checked) {
      try {
        await deleteSecao(subgroup.codigo);
      } catch (error) {
        showErrorToast("O registro associado está em uso.");
      }
    } else {
      await handleAssociacao(subgroup);
    }
    atualizaDepartamento();
    atualizaSetor();
  };
    

  const handleAssociacao = async (subgroup) => {
    setLoading(true);
    try {
      const secao = {
        codigoDepartamento: selectedGroup.codigo,
        codigoSetor: subgroup.codigo,
      };
  
      const idSecaoInserida = await inserirSecao(secao);
      
      showSuccessToast(`Associação realizada com sucesso.`);
  
      return idSecaoInserida;
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
              {departamentoLocal.map((departamento, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => handleGroupChange(departamento)}
                >
                  <Radio
                    checked={selectedGroup && selectedGroup.codigo === departamento.codigo}
                    name="group-radio"
                    inputProps={{ 'aria-label': departamento.nome }}
                  />
                  {/* <ListItemText sx={{ fontSize: '16px', fontWeight: 600 }} primary={departamento.nome} /> */}
                  <ListItemText>
                    <Typography variant="h6" component="h1" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                      {departamento.nome}
                    </Typography>
                  </ListItemText>
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
                  {setorDataLocal
                    .sort((a, b) => {
                      const isSelectedA = isSelected(a);
                      const isSelectedB = isSelected(b);
                      return isSelectedB - isSelectedA;
                    })
                    .map((setor, index) => {
                      return (
                        <ListItemButton
                          key={index}
                          onClick={(event) => handleSubgroupChange(event, setor)}
                        >
                          <Checkbox
                            checked={isSelected(setor)}
                            name="subgroup-checkbox"
                            inputProps={{ 'aria-label': setor.nome }}
                          />
                          <ListItemText>
                            <Typography variant="h6" component="h1" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                              {setor.nome}
                            </Typography>
                          </ListItemText>
                        </ListItemButton>
                      );
                    })}
                </List>
              </StyledCardSecao>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}

export default SecaoDepartamentoSetor;