import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { Box, Button, Modal, Typography } from '@mui/material';

export default function BasicModal() {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Modal open={open} onClose={handleClose} data-testid="modal">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '470px',
            height: '350px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: '8px',
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '13px',
              height: '13px',
              paddingLeft: '447px',
              paddingRight: '76px',
            }}
          >
            <CloseIcon
              display="flex"
              justifyContent="right"
              flexFlow="column"
              color="grey.context"
              onClick={handleClose}
            />
          </Box>
          <Box mb={1}>
            <ErrorOutline
              sx={{
                width: '73px',
                height: '73px',
              }}
              fontSize="large"
              color="warning"
            />
          </Box>
          <Typography
            variant="h2"
            sx={{
              color: 'secondary.main',
              fontSize: '24px',
              display: 'flex',
              flexFlow: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Hello there!
          </Typography>
          <Typography
            sx={{
              display: 'flex',
              flexFlow: 'column',
              alignItems: 'center',
              textAlign: 'center',
              marginTop: 2,
            }}
            data-testid="popup-message"
          >
            We have found that the user is below 18
            <br /> years of age. Continue to Link your Guardian.
          </Typography>
          <Box mt={3}>
            <Button
              sx={{
                width: '400px',
                height: '56px',
              }}
              variant="contained"
              color="warning"
              mt={10}
              uppercase={false}
              onClick={handleClose}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
