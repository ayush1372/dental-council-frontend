import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Container, Modal, Typography } from '@mui/material';

export default function AttachmentViewPopup(props) {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    props.closePopup();
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
            <Box
              display="flex"
              sx={{
                color: 'primary.main',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h2"
                mb="20px"
                sx={{
                  color: 'primary.main',
                  display: 'flex',
                  flexFlow: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {props?.alt} Preview
              </Typography>
              <img src={`data:image/png;base64,${props?.certificate}`} alt={props?.alt} />
            </Box>
            <Box display="flex" justifyContent="flex-end" mt={16}>
              <Button
                onClick={handleClose}
                variant="contained"
                color="grey"
                sx={{
                  mr: 1,
                }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>
    </Box>
  );
}
