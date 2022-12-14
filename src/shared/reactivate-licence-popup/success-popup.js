import { useState } from 'react';

import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Box, Container, Modal, Typography } from '@mui/material';

import { Button } from '../../ui/core';

export default function SuccessPopup() {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose} sx={{ mt: 15 }}>
      <Container
        maxWidth="xs"
        sx={{ backgroundColor: 'white.main', borderRadius: '10px', height: '350px', p: '30px' }}
      >
        <Box mb={1} display="flex" justifyContent="center">
          <TaskAltOutlinedIcon
            sx={{
              color: 'success.dark',
              width: '80px',
              height: '80px',
            }}
          />
        </Box>

        <Box>
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
            ml={10}
            data-testid="popup-input-text"
          >
            Your reactivate licence <br />
            request has been sent to SMC
          </Typography>
          <Button
            sx={{ width: '408px', mt: 5 }}
            variant="contained"
            color="warning"
            onClick={handleClose}
          >
            Continue
          </Button>
        </Box>
      </Container>
    </Modal>
  );
}
