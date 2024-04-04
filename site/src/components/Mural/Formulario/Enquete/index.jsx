import React, { useState, useEffect } from 'react';
import Formulario from './formulario';
import FormularioEnquete from './formularioEnquete';
import Stepper from '../../../stepper';
import Progress from '../../../../Utils/LoadingProgress';
import { inserirComunicado } from '../../../../../service/muralService';
import useForm from '../../../Formulario/useForm';
import { validateForm } from '../../../Formulario/validation';
import dayjs from 'dayjs';

function Enquete({ onclose, screenValidation, action, updateTable }) {
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState({});
  const steps = ['Condomíno', 'Enquete'];
  const [loading, setLoading] = useState(false);
  const [visible, setVisibleAlert] = useState(false);
  const [createFunction, setCreateFunction] = useState(null);
  const {
    values,
    errors,
    handleChange,
    handleValidation,
    renderErrorMessage,
  } = useForm(
    formData,
    validateForm,
    'enquete'
  );

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      tipoComunicacao: 3
    }));

  }, []); 

  const handleFormChange = (data) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
  };

  useEffect(() => {
    setCreateFunction(() => inserirComunicado);
  }, [action]);
  return (
    <div>
      <Stepper
        steps={steps}
        updateTable={updateTable}
        createFunction={createFunction}
        formData={formData}
        handleClose={onclose}
        onLoadingChange={setLoading}
        screenValidation={"enquete"}
        visibleAlert={false}
        renderStepContent={(step) => {
          switch (step) {
            case 0:
              return (
                <>
                  <Formulario
                    formData={formData}
                    onDataChange={handleFormChange}
                    onFieldValidationChange={setInvalidFields}
                  />
                  <Progress isVisible={loading} />
                </>
              );
            case 1:
              return (
                <>
                  <FormularioEnquete
                    formData={formData}
                    onDataChange={handleFormChange}
                    onFieldValidationChange={setInvalidFields}
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

export default Enquete;