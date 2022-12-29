import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Container, Modal, Typography, useTheme } from '@mui/material';

import { Button, TextField } from '../../ui/core';

export default function RejectLicenseModal(props) {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    props.ClosePopup();
  };

  const theme = useTheme();

  return (
    <Box>
      <Modal open={open} onClose={handleClose} sx={{ mt: 5 }}>
        <Container
          maxWidth="sm"
          sx={{ backgroundColor: theme.palette.white.main, borderRadius: '10px', height: '454px' }}
        >
          <Box py={3}>
            <Box display="flex" justifyContent="flex-end">
              <CloseIcon color="grey.context" onClick={handleClose} />
            </Box>
            <Box mb={1} width="100%" textAlign="center">
              <ErrorIcon fontSize="width48" color="warning" />
            </Box>
            <Typography
              variant="h2"
              mt="18px"
              color={'primary.main'}
              fontSize={'24px'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
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

            <Box display="flex" justifyContent="flex-end" mt={5}>
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
