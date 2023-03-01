import { useEffect, useState } from 'react';

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, Dialog, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

import useWizard from '../../hooks/use-wizard';
import { Button } from '../../ui/core';
import ConfirmOTP from './components/confirm-otp';
import ForgotPassword from './components/forgot-password';
import LoginPage from './components/login-page';
import NewPasswordSetup from './components/new-password-setup';

const LoginWrapper = () => {
  const location = useLocation();
  const { activeStep, handleNext, resetStep } = useWizard(0, []);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState({ contact: '', type: '' });
  const handlePasswordSetup = () => {
    setShowPopup(true);
  };
  useEffect(() => {
    resetStep();
  }, [location.state.loginFormname]);

  return (
    <Box sx={{ mt: 5, mb: 5, maxWidth: '600px', margin: '40px auto' }}>
      {activeStep === 0 && <LoginPage handleForgotPassword={handleNext} />}
      {activeStep === 1 && <ForgotPassword handleConfirmPassword={handleNext} otpData={setData} />}
      {activeStep === 2 && <ConfirmOTP handleConfirmOTP={handleNext} otpData={data} />}
      {activeStep === 3 && <NewPasswordSetup handlePasswordSetup={handlePasswordSetup} />}
      <Dialog
        sx={{
          '.MuiPaper-root': {
            borderRadius: '10px',
          },
        }}
        open={showPopup}
        onClose={() => {
          setShowPopup(false);
        }}
      >
        <Box p={2} width="504px" height="400">
          <Box display={'flex'} flexDirection="column" width="100%">
            <Box display={'flex'} justifyContent="center">
              <TaskAltIcon color="success" fontSize="width80" />
            </Box>
            <Typography
              color="success.main"
              variant="h3"
              component="div"
              display={'flex'}
              justifyContent="center"
            >
              Success!
            </Typography>
          </Box>
          <Box mt={2} textAlign="center">
            <Typography color="grey.context" variant="h3">
              Your Password has been <br />
              successfully Changed.
            </Typography>
          </Box>
          <Box display={'flex'} mt={1} justifyContent="center">
            <Button
              onClick={() => {
                resetStep();
                setShowPopup(false);
              }}
              color="secondary"
              variant="contained"
              sx={{
                margin: '0 4px',
              }}
            >
              Login with New Password
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default LoginWrapper;
