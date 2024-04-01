import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Paper, Typography, Radio, Checkbox } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { X } from 'phosphor-react';
import { inserirSecao } from '../../../service/secaoService';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { StyledCardSecao } from '../../Utils/StyledCard';

const SecaoDepartamentoSetor = ({ setorData, departamentoData }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSubgroups, setSelectedSubgroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  console.log(departamentoData);
  const handleGroupChange = (group) => {
    setSelectedGroup(group);
    setSelectedSubgroups([]);
  };

  const handleSubgroupChange = (subgroup) => {
    const isSelected = selectedSubgroups.some(sub => sub.codigo === subgroup.codigo);
    if (isSelected) {
      setSelectedSubgroups(selectedSubgroups.filter(sub => sub.codigo !== subgroup.codigo));
    } else {
      setSelectedSubgroups([...selectedSubgroups, subgroup]);
    }
  };

  const handleAssociacao = async () => {
    setLoading(true);
    try {
      const secoes = selectedSubgroups.map(subgroup => ({
        codigoDepartamento: selectedGroup.codigo,
        codigoSetor: subgroup.codigo,
      }));

      await Promise.all(secoes.map(secao => inserirSecao(secao)));
      showSuccessToast("Associação realizada com sucesso");
    } catch (error) {
      showErrorToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSubgroups.length > 0) {
      handleAssociacao();
    }
  }, [selectedSubgroups]);

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
                      !selectedGroup.codigoSetorSecao.some((codigo) => setor.codigoSetorSecao.includes(codigo))
                    ))
                    .map((setor, index) => (
                      <ListItemButton
                        key={index}
                        onClick={() => handleSubgroupChange(setor)}
                      >
                        <Checkbox
                          checked={selectedSubgroups.some(sub => sub.codigo === setor.codigo)}
                          name="subgroup-checkbox"
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
      </Grid>
    </Box>
  );
}

export default SecaoDepartamentoSetor;