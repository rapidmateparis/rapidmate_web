import { toast } from 'react-toastify';

/**
 * Displays a success toast.
 * @param {string} message - The success message to display.
 */
export const showSuccessToast = (message) => {
  toast.warning(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
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
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
  });
};
