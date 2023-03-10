// import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Box, Container, Modal, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

//mport { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/core';

export default function ErrorModalPopup({ open, setOpen, text }) {
  const theme = useTheme();
  //  const navigate = useNavigate();
  // eslint-disable-next-line no-console
  console.log('popup', open, setOpen, text);
  const handleCloseModal = () => {
    setOpen(false);
    // navigate('/register/aadhaar')
  };

  return (
    <Modal open={open} sx={{ mt: 15 }}>
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: theme.palette.white.main,
          borderRadius: '10px',
          height: '350px',
          p: '30px',
        }}
      >
        <Box mb={1} display="flex" justifyContent="center">
          {/* <ErrorOutlineOutlinedIcon
            sx={{
              color: 'error.main',
              width: '80px',
              height: '80px',
            }}
          /> */}
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography
            data-testid="popup-input-success-text"
            variant="h2"
            color="error.main"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
          >
            Error
          </Typography>
          <Typography
            display="flex"
            alignItems="center"
            textAlign="center"
            mt={2}
            // ml={10}
            data-testid="popup-input-text"
            component="div"
            flexDirection="column"
          >
            {text}
          </Typography>
          <Button
            sx={{ width: { xs: '100%', sm: '408px' }, mt: 5 }}
            variant="contained"
            color="warning"
            onClick={handleCloseModal}
          >
            Ok
          </Button>
        </Box>
      </Container>
    </Modal>
  );
}
