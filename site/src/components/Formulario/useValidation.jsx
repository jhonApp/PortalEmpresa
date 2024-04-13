import { validateForm } from './validation';
import { showErrorToast } from '../../Utils/Notification';

const validateAndSetInvalidFields = (formData, screenValidation, setInvalidFields) => {
    
    const errors = validateForm(formData, screenValidation);
    setInvalidFields(errors);

    const errorMessage = errors.map(error => `<b>${error.description}:</b> ${error.message}<br>`).join('');
    if(errorMessage){
        showErrorToast(<div dangerouslySetInnerHTML={{ __html: errorMessage }} />);
    }

    return errorMessage;
};

export default validateAndSetInvalidFields;
