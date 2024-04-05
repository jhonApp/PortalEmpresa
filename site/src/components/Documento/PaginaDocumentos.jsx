import React, { useState, useEffect } from 'react';
import { Box, Paper, Card, CardContent, Typography, IconButton, useTheme } from '@mui/material';
import { MagnifyingGlass, DownloadSimple } from 'phosphor-react';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { Search, SearchIconWrapper, StyledInputBase } from '../../Utils/StyledSearch';
import { File, CreditCard } from 'phosphor-react';
import { deleteDocumento } from '../../../service/documentoService';
import TextWithEllipsis from '../../Utils/Helpers';
import Progress from '../../Utils/LoadingProgress';
import AlertDialog from '../../Utils/Modal/Delete';

function PaginaDocumentos({ documentoData, loading, setLoading, atualizaDocumento }) {
  const [digitado, setDigitado] = useState('');
  const [codigoDocumento, setCodigoDocumento] = useState(null);
  const [documentosFiltrados, setDocumentosFiltrados] = useState(documentoData);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '40%',
    backgroundColor: '#BCC0CF',
    padding: theme.spacing(1),
    height: '40px',
    width: '40px',
    marginRight: theme.spacing(1),
  };

  // Calcula dinamicamente o número de cartões por linha
  const documentosPorLinha = 4;
  const documentosPorLinhaAtual = Math.min(documentosPorLinha, Math.ceil(documentosFiltrados.length / documentosPorLinha));

  useEffect(() => {
    const filteredCards = documentoData.filter(documento => {
      return documento.nomeArquivo.toString().includes(digitado);
    });
    setDocumentosFiltrados(filteredCards);
  }, [documentoData, digitado]);

  const handleDownload = async (nomeArquivo, arquivoBase64) => {
    try {
      // Converte o arquivo de base64 para um blob
      const byteCharacters = atob(arquivoBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray]);
  
      // Cria um URL temporário para o blob
      const url = window.URL.createObjectURL(blob);
  
      // Cria um link para iniciar o download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nomeArquivo);
  
      // Adiciona o link ao documento e simula um clique
      document.body.appendChild(link);
      link.click();
  
      // Remove o link e libera o URL temporário
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      showSuccessToast("Download realizado com sucesso");

    } catch (error) {
      showErrorToast('Erro durante o download:', error);
    }
  };
   

  const handleSearch = (value) => {
    setDigitado(value);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      if (!codigoDocumento) return;
      await deleteDocumento(codigoDocumento);
      showSuccessToast("Documento excluído com sucesso!");
      atualizaDocumento();
      setLoading(false);
    } catch (error) {

      setLoading(false);
      showErrorToast(error.message);
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
      <Box display="flex" gap={2} flexDirection={'column'}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Typography variant="h6" component="h1" style={{ fontSize: '24px', fontWeight: 'bold' }}>Documentos Cadastrados</Typography>
          <Search>
              <SearchIconWrapper>
                <IconButton>
                  <MagnifyingGlass size={20} color="#666666" />
                </IconButton>
              </SearchIconWrapper>
              <StyledInputBase
                value={digitado}
                placeholder="Pesquisar Documento"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => handleSearch(e.target.value)}
              />
          </Search>
        </div>
        <div>
          {documentosFiltrados.length === 0 && (
            <Typography style={{ marginTop: 15, textAlign: 'center' }}>Nenhum resultado encontrado</Typography>
          )}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {Array.from({ length: documentosPorLinhaAtual * documentosPorLinha }, (_, index) => (
              <Box key={index} sx={{ width: `calc(${100 / documentosPorLinha}% - 10px)`, mt: 2 }}>
                {index < documentosFiltrados.length && (
                  <Card sx={{ display: 'flex', height: 'auto', borderRadius: 3 }}>
                    <CardContent sx={{ flex: '1 0 auto', p: '10px', display: 'flex', alignItems: 'center' }} >
                      <div style={iconContainerStyle}><File size={20} color="#0D1327" /></div>
                      <div style={{ marginLeft: theme.spacing(1), display:'flex', flexDirection:'column' }}>
                        <TextWithEllipsis text={documentosFiltrados[index].nomeArquivo} maxLength={20} valueWeigth={600}/>
                      </div>
                    </CardContent>
                    <Box sx={{ display: 'flex', color: '#BCC0CF', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pr: 1}}>
                        <IconButton onClick={() => handleDownload(documentosFiltrados[index].nomeArquivo, documentosFiltrados[index].arquivo)} >
                          <DownloadSimple size={24} color="#0D1327"/>
                        </IconButton>
                      </Box>
                    </Box>
                  </Card>
                )}
              </Box>
            ))}
          </Box>
        </div>
      </Box>
      <AlertDialog dialogOpen={open} handleClose={() => setOpen(false)} handleDelete={handleDelete}/>
      <Progress isVisible={loading} />
    </Box>
  );
}

export default PaginaDocumentos;