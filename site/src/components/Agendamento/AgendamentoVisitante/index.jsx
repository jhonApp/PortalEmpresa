import React, { useState } from 'react';
import Formulario from './formulario';
import FormularioAgendamento from './formularioAgendamento';
import Stepper from '../stepper';
import Progress from '../../../Utils/LoadingProgress';
import { inserirAgendamento } from '../../../../service/agendamentoService';

function AgendamentoVisitante({ updateTable, onClose }) {
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState({});
  const steps = ['Dados Visitante', 'Dados Agendamento'];
  const [loading, setLoading] = useState(false);

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  const handleFormChange = (data) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
  };

  const handleFieldValidationChange = (isInvalid) => {
    console.log("entrei no validation")
    setInvalidFields(isInvalid);
  };

  return (
    <div>
      <Stepper
        steps={steps}
        updateTable={updateTable}
        createData={inserirAgendamento}
        formData={formData}
        handleClose={onClose}
        onLoadingChange={handleLoadingChange}
        invalidFields={invalidFields}
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