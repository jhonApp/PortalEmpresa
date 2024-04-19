import React, { useState } from 'react';
import Formulario from './formulario';
import FormularioAgendamento from './formularioAgendamento';
import Stepper from '../../stepper';
import Progress from '../../../Utils/LoadingProgress';
import { inserirAgendamentoEmMassa } from '../../../../service/agendamentoService';


function AgendamentoMassa({ updateTable, onClose }) {
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState([]);
  const [screenValidation, setScreenValidation] = useState('');
  const steps = ['Convidado', 'Data do Agendamento'];
  const [loading, setLoading] = useState(false);

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  const handleFormChange = (data) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
  };

  const handleFieldValidationChange = (isInvalid) => {
    setInvalidFields(isInvalid);
  };

  return (
    <div>
      <Stepper
        steps={steps}
        updateTable={updateTable}
        createFunction={inserirAgendamentoEmMassa}
        formData={formData}
        handleClose={onClose}
        onLoadingChange={handleLoadingChange}
        invalidFields={setInvalidFields}
        screenValidation={screenValidation}
        visibleAlert={true}
        renderStepContent={(step) => {
          switch (step) {
            case 0:
              return (
                <>
                  <Formulario
                    formData={formData}
                    onDataChange={handleFormChange}
                    invalidFields={invalidFields}
                    screenValidation={setScreenValidation}
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
                    invalidFields={invalidFields}
                    screenValidation={setScreenValidation}
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