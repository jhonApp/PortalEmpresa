import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
  progress: undefined
};

export const showSuccessToast = (message) => {
  toast.success(message, defaultToastOptions);
};

export const showErrorToast = (message) => {
  toast.error(message, defaultToastOptions);
};

export const showInfoToast = (message) => {
  toast.info(message, defaultToastOptions);
};

export const showWarningToast = (message) => {
  toast.warning(message, defaultToastOptions);
};