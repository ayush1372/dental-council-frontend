import { Box, Container, Modal, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';

import { Button } from '../../ui/core';

export default function ErrorModalPopup({
  open,
  setOpen,
  text,
  imrData,
  setIsNext,
  handleAadhaarPage,
  accountExist,
  onReset,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleCloseModal = () => {
    setOpen(false);
    window.location.reload();
  };
  const handleYes = () => {
    handleAadhaarPage(true);
    setIsNext(true);
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
              Info !
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
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleNo}
                  sx={{ backgroundColor: 'grey.main', color: 'black.textBlack', border: 'none' }}
                >
                  No
                </Button>
              </Box>
            ) : accountExist ? (
              <Box display="flex" justifyContent="right">
                <Button
                  size="small"
                  sx={{
                    mt: 3,
                    width: '20%',
                  }}
                  variant="contained"
                  color="warning"
                  onClick={handleCloseModal}
                >
                  Ok
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
