import React, { useState, useEffect } from 'react';
import Formulario from './formulario';
import FormularioAgendamento from './formularioAgendamento';
import Stepper from '../../stepper';
import Progress from '../../../Utils/LoadingProgress';
import { inserirAgendamento, alterarAgendamento } from '../../../../service/agendamentoService';
import dayjs from 'dayjs';

function AgendamentoVisitante({ onClose, updateTable, data, action }) {
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState({});
  const steps = ['Dados Visitante', 'Dados Agendamento'];
  const [loading, setLoading] = useState(false);
  const [createFunction, setCreateFunction] = useState(null);

  useEffect(() => {
    if (data) {
      const dataCopy = { ...data };
  
      const fieldsToConvert = {
        dataInicial: 'YYYY-MM-DD',
        dataFim: 'YYYY-MM-DD',
        horaEntrada: 'HH:mm',
        horaSaida: 'HH:mm'
      };
  
      Object.entries(fieldsToConvert).forEach(([field, format]) => {
        if (dataCopy[field]) {
          if (field.includes('hora')) {
            const [hours, minutes] = dataCopy[field].split(':');
            dataCopy[field] = dayjs().set('hour', parseInt(hours)).set('minute', parseInt(minutes));
          } else {
            dataCopy[field] = dayjs(dataCopy[field], format);
          }
        }
      });
  
      setFormData(dataCopy);
    }
  }, [data]);

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  const handleFormChange = (data) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
  };

  const handleFieldValidationChange = (isInvalid) => {
    setInvalidFields(isInvalid);
  };

  useEffect(() => {
    if (action === 'edit') {
      setCreateFunction(() => alterarAgendamento);
    } else {
      setCreateFunction(() => inserirAgendamento);
    }
  }, [action]);

  return (
    <div>
      <Stepper
        steps={steps}
        updateTable={updateTable}
        createFunction={createFunction}
        formData={formData}
        handleClose={onClose}
        onLoadingChange={handleLoadingChange}
        invalidFields={invalidFields}
        screenValidation={"agendamento"}
        action={action}
        renderStepContent={(step) => {
          switch (step) {
            case 0:
              return (
                <>
                  <Formulario
                    formData={formData}
                    onDataChange={handleFormChange}
                    onFieldValidationChange={handleFieldValidationChange}
                  />
                  <Progress isVisible={loading} />
                </>
              );
            case 1:
              return (
                <>
                  <FormularioAgendamento
                    formData={formData}
                    onDataChange={handleFormChange}
                    onFieldValidationChange={handleFieldValidationChange}
                  />
                  <Progress isVisible={loading} />
                </>
              );
            default:
              return null;
          }
        }}
      />
    </div>
  );
}

export default AgendamentoVisitante;