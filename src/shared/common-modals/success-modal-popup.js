import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Box, Container, Modal, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { getCardCount } from '../../store/actions/dashboard-actions';
import { setBreadcrumbsActivetab } from '../../store/reducers/common-reducers';
import { Button } from '../../ui/core';

export default function SuccessModalPopup({
  open,
  setOpen,
  text,
  handleClose,
  SuspensionCall,
  isHpIdCreated,
  successRegistration,
  existHprId,
}) {
  const navigate = useNavigate();
  const handleCloseModal = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigateToSetPassword = () => {
    navigate('/reset-password');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleCloseModalALL = () => {
    setOpen(false);
    handleClose();
    dispatch(setBreadcrumbsActivetab('DASHBOARD'));
    if (SuspensionCall) {
      dispatch(getCardCount());
    }
  };
  const navigateLogin = () => {
    navigate('/login-page', { state: { loginFormname: 'Doctor' } });
  };
  return (
    <Modal open={open} onClose={handleClose} sx={{ mt: 15 }}>
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: theme.palette.white.main,
          borderRadius: '10px',
          p: 3,
        }}
      >
        <Box mb={1} display="flex" justifyContent="center">
          <TaskAltOutlinedIcon
            sx={{
              color: theme.palette.success.dark,
              width: '80px',
              height: '80px',
            }}
          />
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography
            data-testid="popup-input-success-text"
            variant="h2"
            color="success.dark"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
          >
            SUCCESS!
          </Typography>
          <Typography
            display="flex"
            alignItems="center"
            textAlign="center"
            mt={2}
            data-testid="popup-input-text"
            component="div"
            flexDirection="column"
          >
            {text}
          </Typography>
          <Button
            sx={{ mt: 5 }}
            variant="contained"
            color="warning"
            onClick={
              handleClose
                ? handleCloseModalALL
                : isHpIdCreated
                ? navigateToSetPassword
                : successRegistration
                ? navigateLogin
                : handleCloseModal
            }
          >
            {successRegistration
              ? 'Continue to login'
              : existHprId
              ? 'Continue to set your password'
              : 'Ok'}
          </Button>
        </Box>
      </Container>
    </Modal>
  );
}
