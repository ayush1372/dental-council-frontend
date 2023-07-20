import 'react-toastify/dist/ReactToastify.css';

import {
  CheckCircleOutlineOutlined,
  Close,
  ErrorOutlineOutlined,
  InfoOutlined,
} from '@mui/icons-material';
import { Box } from '@mui/material';
//import useMediaQuery from '@mui/material/useMediaQuery';
import { Slide, toast } from 'react-toastify';

import styles from './toaster.module.scss';

const successToast = (message, toastId, toastType, toastPosition = 'top-center') => {
  const CloseButton = ({ closeToast }) => (
    <Close sx={{ mt: 2 }} color={toastType} onClick={closeToast} fontSize="inherit" />
  );

  const title = () => {
    return (
      <Box display={'flex'} gap={1}>
        {toastType === 'info' ? (
          <InfoOutlined />
        ) : toastType === 'success' ? (
          <CheckCircleOutlineOutlined />
        ) : (
          <ErrorOutlineOutlined />
        )}

        {message}
      </Box>
    );
  };

  toast.dismiss();
  toast(title, {
    toastId: `${toastId}-toast`,
    position: toastPosition,
    transition: Slide,
    // type: toastType,
    autoClose: 12000,
    hideProgressBar: true,
    closeButton: CloseButton,
    closeOnClick: true,
    draggable: false,
    className: styles.toastMessage,
    style: {
      border: `1px solid ${
        toastType === 'info'
          ? '#8174cb'
          : toastType === 'success'
          ? '#49ba8a'
          : toastType === 'testing'
          ? 'yellow'
          : '#ff512b'
      }`,
      background: `${
        toastType === 'info'
          ? '#f2f1fa'
          : toastType === 'success'
          ? '#daf1e8'
          : toastType === 'testing'
          ? 'yellow'
          : '#ffe0d9'
      }`,
      color:
        toastType === 'info'
          ? '#56499b'
          : toastType === 'success'
          ? '#1f6648'
          : toastType === 'testing'
          ? '#e33d19'
          : '#e33d19',
      fontSize: '16px',
      fontWeight: 'bold',
    },
  });
};
export default successToast;
