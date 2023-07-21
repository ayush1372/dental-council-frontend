import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Card, Container, Modal, Typography } from '@mui/material';

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
          sx={{
            backgroundColor: 'white.main',
            borderRadius: '10px',
            minHeight: '450px',
            maxHeight: '100vh',
          }}
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
              {props?.certFileType === 'pdf' || props?.certFileType === 'PDF' ? (
                <Card
                  component={'iframe'}
                  title={props?.alt}
                  src={`data:application/pdf;base64,${props?.certificate}`}
                  alt={props?.alt}
                  width="100%"
                  height="450px"
                  sx={{ padding: 0, borderRadius: 0 }}
                />
              ) : (
                <Box
                  component={'img'}
                  src={`data:image/*;base64,${props?.certificate}`}
                  alt={props?.alt}
                  width="100%"
                  height="450px"
                />
              )}
            </Box>
            {/* <Box display="flex" justifyContent="flex-end" mt={1}>
              <Button
                size="small"
                onClick={handleClose}
                variant="contained"
                color="grey"
                sx={{
                  mr: 1,
                }}
              >
                Close
              </Button>
            </Box> */}
          </Box>
        </Container>
      </Modal>
    </Box>
  );
}
