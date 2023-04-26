import { useState } from 'react';

import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Box, Container, Modal, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { Button } from '../../ui/core';

export default function SuccessPopup({ fetchDoctorUserPersonalDetails }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const logInDoctorStatus = useSelector(
    (state) => state?.loginReducer?.loginData?.data?.blacklisted
  );
  const handleClose = () => {
    setOpen(false);
    fetchDoctorUserPersonalDetails && fetchDoctorUserPersonalDetails();
    navigate('/profile');
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
              ? `You reactivation request has been successfully sent to the SMC for approval. We will notify you once your request has been processed.`
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
