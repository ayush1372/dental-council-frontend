import { Box, Container, Modal, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Button } from '../../ui/core';

export default function ErrorModalPopup({ open, setOpen, text }) {
  const theme = useTheme();

  const handleCloseModal = () => {
    setOpen(false);
    window.location.reload();
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
              Error
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
            <Button sx={{ mt: 3 }} variant="contained" color="warning" onClick={handleCloseModal}>
              Ok
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
}
