import { useState } from 'react';

import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Box, Container, Modal, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { Button } from '../../ui/core';

export default function SuccessPopup() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const logInDoctorStatus = useSelector(
    (state) => state?.loginReducer?.loginData?.data?.blacklisted
  );
  const handleClose = () => {
    setOpen(false);
    navigate('/');
    navigate('/');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ mt: 15 }}>
      <Container
        maxWidth="xs"
        sx={{ backgroundColor: 'white.main', borderRadius: '10px', height: '430px', p: '30px' }}
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
            mt={4}
            variant="body1"
            data-testid="popup-input-text"
          >
            {logInDoctorStatus
              ? `Your profile has been successfully re-activated. You can be able to perform actions on your profile now.`
              : `Your username has been successfully created.
            <br /> A link to create your password has been sent to the registered mobile number.`}
          </Typography>
          <Button
            sx={{ width: '408px', mt: 8 }}
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
