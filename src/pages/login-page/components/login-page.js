import { useEffect, useMemo, useState } from 'react';

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, Dialog, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import useWizard from '../../../hooks/use-wizard';
import {
  generateCaptchaImage,
  getCaptchaEnabledFlagValue,
} from '../../../store/actions/login-action';
import { Button } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';
// import LoginWrapper from '../index';
import ConfirmOTP from './confirm-otp';
import { DoctorLogin } from './doctor-login';
import ForgotPassword from './forgot-password';
// import { DoctorLogin } from './doctor-login';
import { Login } from './login-data';
// import LoginPage from './components/login-page';
import NewPasswordSetup from './new-password-setup';

export function LoginPage() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { loginFormname } = state;
  const { activeStep, handleNext, resetStep } = useWizard(0, []);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState({ contact: '', type: '', page: 'forgotPasswordPage' });
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
  useEffect(() => {
    resetStep(0);
  }, [loginFormname]);

  const { reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      nmrID: '',
      password: '',
    },
  });

  useEffect(() => {
    reset();
    dispatch(getCaptchaEnabledFlagValue())
      .then((response) => {
        if (response?.data) {
          dispatch(generateCaptchaImage()).catch((error) => {
            successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
          });
        }
      })
      .catch((error) => {
        successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginFormNames[loginFormname]]);

  const handlePasswordSetup = () => {
    setShowPopup(true);
  };
  return (
    <Box sx={{ mt: 5, mb: 5, maxWidth: '648px', margin: '40px auto' }}>
      {activeStep === 0 && loginFormNames[loginFormname] === 'Doctor' ? (
        <DoctorLogin loginName={loginFormNames[loginFormname]} handleForgotPassword={handleNext} />
      ) : (
        activeStep === 0 &&
        loginFormNames[loginFormname] !== 'Doctor' && (
          <Login loginName={loginFormNames[loginFormname]} handleForgotPassword={handleNext} />
        )
      )}
      {activeStep === 1 && (
        <ForgotPassword
          handleConfirmPassword={handleNext}
          otpData={setData}
          userData={data}
          activeStep={activeStep}
        />
      )}
      {activeStep === 2 && (
        <ConfirmOTP handleConfirmOTP={handleNext} otpData={data} resetStep={resetStep} />
      )}
      {activeStep === 3 && (
        <NewPasswordSetup
          handlePasswordSetup={handlePasswordSetup}
          otpData={data}
          setShowSuccessPopUp={setShowPopup}
          resetStep={resetStep}
        />
      )}

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
              Your password has been <br />
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
}

export default LoginPage;
