import * as React from 'react';
import { StyledTextField, FormContainer, Column, FormRow  } from '../../../Utils/StyledForm';
import Accordion from '@mui/material/Accordion';
import { showErrorToast } from '../../../Utils/Notification';
import InputLabel from '@mui/material/InputLabel';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import InputMask from 'react-input-mask';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useForm from '../../Formulario/useForm';
import { validateForm } from '../../Formulario/validation';
import Fade from '@mui/material/Fade';

export default function AccordionTransition({ onDataChange, formData }) {
  const [expanded, setExpanded] = React.useState(false);

  const {
    values,
    errors,
    handleChange,
    handleValidation,
    renderErrorMessage,
  } = useForm(
    formData,
    validateForm,
    'funcionario'
  );

  const handleFormChange = (fieldName, value) => {
    handleChange(fieldName, value);
    onDataChange({ ...values, [fieldName]: value });
  };

  const fetchAddressData = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        handleFormChange('uf', data.uf);
        handleFormChange('bairro', data.bairro);
        handleFormChange('cidade', data.localidade);
        handleFormChange('logradouro', data.logradouro);
      } else {
        showErrorToast('CEP não encontrado');
        handleFormChange('uf', data.uf);
        handleFormChange('bairro', data.bairro);
        handleFormChange('cidade', data.localidade);
        handleFormChange('logradouro', data.logradouro);
      }
    } catch (error) {
      showErrorToast('Erro ao buscar endereço:', error);
    }
  };

  const handleCEPChange = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    handleFormChange('cep', cep);
    if (cep.length === 8) {
      fetchAddressData(cep);
    }
  };

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={{
          backgroundColor: 'transparent',
          borderBottom: '1px solid #BCC0CF',
          '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
          '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none', backgroundColor: 'transparent', },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography fontSize={20} fontWeight={600}>Endereço</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormContainer>
            <Column>
              {/*CEP*/}
              <FormRow>
                <InputMask
                  mask="99999-999"
                  maskChar=" "
                  value={values.cep || ''}
                  onChange={handleCEPChange}>
                  {() => (
                    <div>
                      <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                        CEP
                      </InputLabel>
                      <StyledTextField
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="text"
                        autoComplete="off"
                        error={errors.cep}
                      />
                      {renderErrorMessage('cep')}
                    </div>
                  )}
                </InputMask>
                {renderErrorMessage('cep')}
              </FormRow>
              {/*UF*/}
              <FormRow>
                <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                  UF
                </InputLabel>
                <StyledTextField
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="text"
                  autoComplete="off"
                  error={errors.uf}
                  value={values.uf || ''}
                  onChange={(e) => handleFormChange('uf', e.target.value)}
                  onBlur={(e) => handleFormChange('uf', e.target.value)}
                />
                {renderErrorMessage('uf')}
              </FormRow>
            </Column>
            <Column>
              {/*Bairro*/}
              <FormRow>
                <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                  Bairro
                </InputLabel>
                <StyledTextField
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="text"
                  autoComplete="off"
                  error={errors.bairro}
                  value={values.bairro || ''}
                  onChange={(e) => handleFormChange('bairro', e.target.value)}
                  onBlur={(e) => handleFormChange('bairro', e.target.value)}
                />
                {renderErrorMessage('bairro')}
              </FormRow>
              {/*Cidade*/}
              <FormRow>
                <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                  Cidade
                </InputLabel>
                <StyledTextField
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="text"
                  autoComplete="off"
                  error={errors.cidade}
                  value={values.cidade || ''}
                  onChange={(e) => handleFormChange('cidade', e.target.value)}
                />
              </FormRow>
            </Column>
          </FormContainer>
          {/*Logradouro*/}
          <FormRow>
            <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
              Logradouro
            </InputLabel>
            <StyledTextField
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              autoComplete="off"
              error={errors.logradouro}
              value={values.logradouro || ''}
              onChange={(e) => handleFormChange('logradouro', e.target.value)}
            />
          </FormRow>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
