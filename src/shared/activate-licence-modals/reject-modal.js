import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Button, Container, Modal, Typography } from '@mui/material';

import { TextField } from '../../ui/core';

export default function RejectLicenseModal(props) {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    props.ClosePopup();
  };

  return (
    <Box>
      <Modal open={open} onClose={handleClose} sx={{ mt: 15 }}>
        <Container
          maxWidth="sm"
          sx={{ backgroundColor: 'white.main', borderRadius: '10px', height: '544px' }}
        >
          <Box py={3}>
            <Box display="flex" justifyContent="flex-end">
              <CloseIcon color="grey.context" onClick={handleClose} />
            </Box>
            <Box mb={1} width="100%" textAlign="center">
              <ErrorIcon
                sx={{
                  fontSize: '48px',
                }}
                color="warning"
              />
            </Box>
            <Typography
              variant="h2"
              mt="18px"
              sx={{
                color: 'primary.main',
                fontSize: '24px',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Reason to Reject application
            </Typography>
            <Box>
              <Box>
                <Typography variant="body3" color="inputTextColor.main" component="span">
                  Add Reason
                </Typography>
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Box>
              <TextField multiline rows={4} fullWidth placeholder="Add your reason here . . ." />
            </Box>
            <Box display="flex" textAlign="right">
              <Typography color="inputFocusColor.main">150 words only</Typography>
            </Box>

            <Box display="flex" justifyContent="flex-end" mt={16}>
              <Button
                onClose={handleClose}
                variant="contained"
                color="grey"
                sx={{
                  mr: 1,
                }}
              >
                Cancel
              </Button>
              <Button onClose={handleClose} variant="contained" color="secondary">
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>
    </Box>
  );
}
