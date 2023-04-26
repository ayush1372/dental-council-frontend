import 'react-toastify/dist/ReactToastify.css';

import { Slide, toast } from 'react-toastify';

const successToast = (message, operation, toastType, toastPosition = 'bottom-right') => {
  toast(message, {
    toastId: `${operation}-toast`,
    position: toastPosition,
    transition: Slide,
    type: toastType,
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: false,
    closeOnClick: false,
    draggable: false,
    style: {
      borderRadius: '5px',
      textAlign: 'center',
      color: '#0a203e',
      fontSize: '14px',
      letterSpacing: '1.2px',
      fontWeight: '500',
    },
  });
};
export default successToast;