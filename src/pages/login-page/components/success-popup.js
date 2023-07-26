import { useMemo, useState } from 'react';

import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Box, Container, Modal, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { loginActiveState } from '../../../store/reducers/login-reducer';
import { Button } from '../../../ui/core';

export default function SuccessModal({ text, userData, resetStep }) {
  const { state } = useLocation();
  const { loginFormname } = state;
  const loginFormNames = useMemo(
    () => ({
      Doctor: 'Doctor',
      College: 'College',
      SMC: 'SMC',
      NMC: 'NMC',
      NBE: 'NBE',
    }),
    []
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(loginActiveState({ activeIndex: 0 }));
    navigate('/login-page', { state: { loginFormname: loginFormNames[loginFormname] } });
  };
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
            SUCCESS
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
              ? `Your username is "${retrieveUserName}". Please use this username to login.`
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
            {userData?.page === 'forgetUserName' ? 'Okay' : 'Login with new password'}
          </Button>
        </Box>
      </Container>
    </Modal>
  );
}
