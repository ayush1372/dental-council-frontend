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
    navigate('/');
  };
  return (
    <Modal open={open} sx={{ mt: 15 }}>
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
              color="error.main"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              Error !
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
            {imrData ? (
              <Box pl={15} mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    mr: 3,
                    backgroundColor: theme.palette.secondary.main,
                  }}
                  onClick={handleYes}
                >
                  Yes
                </Button>
                <Button variant="contained" color="primary" size="small" onClick={handleNo}>
                  No
                </Button>
              </Box>
            ) : (
              <Button sx={{ mt: 3 }} variant="contained" color="warning" onClick={handleCloseModal}>
                Ok
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </Modal>
  );
}
