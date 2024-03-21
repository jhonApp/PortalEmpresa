import React, { useState } from 'react';
import Formulario from './formulario';
import FormularioAgendamento from './formularioAgendamento';
import Stepper from '../../stepper';
import Progress from '../../../Utils/LoadingProgress';
import { inserirAgendamentoPrestador } from '../../../../service/agendamentoService';

function AgendamentoMassa({ updateTable, onClose }) {
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState({});
  const steps = ['Dados Visitante', 'Dados Agendamento'];
  const [loading, setLoading] = useState(false);

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  const handleFormChange = (data) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
    console.log(formData)
  };

  const handleFieldValidationChange = (isInvalid) => {
    setInvalidFields(isInvalid);
  };

  return (
    <div>
      <Stepper
        steps={steps}
        updateTable={updateTable}
        createData={inserirAgendamentoPrestador}
        formData={formData}
        handleClose={onClose}
        onLoadingChange={handleLoadingChange}
        invalidFields={invalidFields}
        screenValidation={"agendamentoEmMassa"}
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

export default AgendamentoMassa;