import { useState } from 'react';

import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Box, Container, Modal, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import { Button } from '../../../ui/core';

export default function SuccessModal({ text, userData, resetStep }) {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const retrieveUserName = useSelector((state) => state?.forgotUserName?.status?.data);

  return (
    <Modal open={open} onClose={handleClose} sx={{ mt: 15 }}>
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
          <TaskAltOutlinedIcon
            sx={{
              color: theme.palette.success.dark,
              width: '80px',
              height: '80px',
            }}
          />
        </Box>

        <Box display="flex" flexDirection="column">
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
            // ml={10}
            data-testid="popup-input-text"
            component="div"
            flexDirection="column"
          >
            {userData?.page === 'forgetUserName'
              ? ` Your UserName is" ${retrieveUserName} "Please use this User Name to Log In`
              : text}
          </Typography>
          <Button
            sx={{ width: { xs: '100%', sm: '408px' }, mt: 5 }}
            variant="contained"
            color="warning"
            onClick={
              userData?.page === 'forgetUserName'
                ? () => {
                    resetStep(0);
                  }
                : handleClose
            }
          >
            {userData?.page === 'forgetUserName' ? 'Okay' : 'Login with New Password'}
          </Button>
        </Box>
      </Container>
    </Modal>
  );
}
