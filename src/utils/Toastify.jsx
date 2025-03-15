import { toast } from 'react-toastify';
import Styles from "../assets/css/home.module.css";

/**
 * Displays a success toast.
 * @param {string} message - The success message to display.
 */
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    theme: 'colored',
  });
};

/**
 * Displays an error toast.
 * @param {string} message - The error message to display.
 */
export const showErrorToast = (message) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    theme: 'colored',
  });
};
