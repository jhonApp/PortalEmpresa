import * as React from 'react';
import { StyledTextField, FormContainer, Column, FormRow  } from '../../../Utils/StyledForm';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useForm from '../../Formulario/useForm';
import { validateForm } from '../../Formulario/validation';
import Fade from '@mui/material/Fade';

export default function AccordionTransition({ onDataChange, onFieldValidationChange, formData }) {
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
    const isValid = handleValidation(fieldName);
    onDataChange({ ...values, [fieldName]: value });
    onFieldValidationChange (isValid);
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
          <Typography fontWeight={600}>Endereço</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormContainer>
            <Column>
              {/*CEP*/}
              <FormRow>
                <StyledTextField
                  label="CEP"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
                  autoComplete="off"
                  error={errors.cep}
                  value={values.cep || ''}
                  onChange={(e) => handleFormChange('cep', e.target.value)}
                  onBlur={(e) => handleFormChange('cep', e.target.value)}

                />
                {renderErrorMessage('cep')}
              </FormRow>
              {/*UF*/}
              <FormRow>
                <StyledTextField
                  label="UF"
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
                <StyledTextField
                  label="Bairro"
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
                <StyledTextField
                  label="Cidade"
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
                <StyledTextField
                  label="Logradouro"
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
