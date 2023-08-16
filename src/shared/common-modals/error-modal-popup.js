import { Box, Container, Modal, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { loginActiveState } from '../../store/reducers/login-reducer';
import { Button } from '../../ui/core';

export default function ErrorModalPopup({
  open,
  setOpen,
  text,
  imrData,
  setIsNext,
  loginFormName,
  handleAadhaarPage,
  accountExist,
  onReset,
  handleClose,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    if (accountExist) {
      dispatch(loginActiveState({ activeIndex: 0 }));
      navigate('/login-page', { state: { loginFormname: loginFormName } });
    }
    setOpen(false);
    window.location.reload();
  };
  const handleYes = () => {
    handleAadhaarPage(true);
    if (setIsNext !== undefined) setIsNext(true);
    setOpen(false);
  };
  const handleNo = () => {
    onReset ? navigate('/register/doctor-registration') : navigate('/');
    setOpen(false);
    onReset && onReset();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <Modal open={open} sx={{ mt: 30 }}>
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: theme.palette.white.main,
          borderRadius: '10px',
          p: 3,
        }}
      >
        <Box>
          <Box display="flex" flexDirection="column">
            <Typography
              data-testid="popup-input-success-text"
              variant="h2"
              color="primary.main"
              display="flex"
              alignItems="felx-start"
            >
              Info
            </Typography>
            <Typography
              display="flex"
              textAlign="left"
              mt={2}
              data-testid="popup-input-text"
              component="div"
              flexDirection="column"
            >
              {text}
            </Typography>
            {imrData ? (
              <Box pl={15} mt={3} display="flex" justifyContent="right">
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  sx={{
                    mr: 3,
                  }}
                  onClick={handleYes}
                >
                  Yes
                </Button>
                <Button variant="contained" size="small" color="primary" onClick={handleNo}>
                  No
                </Button>
              </Box>
            ) : accountExist ? (
              <Box display="flex" justifyContent="center">
                <Button
                  size="small"
                  sx={{
                    mt: 3,
                  }}
                  variant="contained"
                  color="warning"
                  onClick={handleCloseModal}
                >
                  Login
                </Button>
              </Box>
            ) : handleClose ? (
              <Box pl={15} mt={3} display="flex" justifyContent="right">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleClose}
                  sx={{ backgroundColor: 'grey.main', color: 'black.textBlack', border: 'none' }}
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              ''
            )}
          </Box>
        </Box>
      </Container>
    </Modal>
  );
}
