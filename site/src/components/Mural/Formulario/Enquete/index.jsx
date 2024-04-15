import React, { useState, useEffect } from 'react';
import Formulario from './formulario';
import FormularioEnquete from './formularioEnquete';
import Stepper from '../../../stepper';
import Progress from '../../../../Utils/LoadingProgress';
import { inserirComunicado } from '../../../../../service/muralService';
import useForm from '../../../Formulario/useForm';
import { validateForm } from '../../../Formulario/validation';
import dayjs from 'dayjs';

function Enquete({ onclose, onDataChange, screenValidation, action, updateTable }) {
  const [formData, setFormData] = useState({ files: [], tipoComunicacao: 3 });
  const steps = ['Condomíno', 'Enquete'];
  const [invalidFields, setInvalidFields] = useState([]);
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

  // useEffect(() => {
  //   onDataChange({ ...formData, 'tipoComunicacao': 3 });
  // }, []); 

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
        invalidFields={setInvalidFields}
        screenValidation={"enquete"}
        visibleAlert={false}
        renderStepContent={(step) => {
          switch (step) {
            case 0:
              return (
                <>
                  <Formulario
                    onDataChange={handleFormChange}
                    invalidFields={invalidFields}
                    formData={formData}
                  />
                  <Progress isVisible={loading} />
                </>
              );
            case 1:
              return (
                <>
                  <FormularioEnquete
                    onDataChange={handleFormChange}
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    formData={formData}
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