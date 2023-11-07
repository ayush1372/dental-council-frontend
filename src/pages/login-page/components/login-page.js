import { useEffect, useMemo, useState } from 'react';

import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import useWizard from '../../../hooks/use-wizard';
// import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import {
  generateCaptchaImage,
  getCaptchaEnabledFlagValue,
} from '../../../store/actions/login-action';
import { loginActiveState } from '../../../store/reducers/login-reducer';
// import successToast from '../../../ui/core/toaster';
// import LoginWrapper from '../index';
import ConfirmOTP from './confirm-otp';
import { DoctorLogin } from './doctor-login';
import ForgotPassword from './forgot-password';
// import { DoctorLogin } from './doctor-login';
import { Login } from './login-data';
// import LoginPage from './components/login-page';
import NewPasswordSetup from './new-password-setup';
import SuccessModal from './success-popup';

export function LoginPage() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { loginFormname } = state;

  const activeIndex = useSelector((state) => state.loginReducer.activeState?.activeIndex);
  const { activeStep, resetStep } = useWizard(0, []);
  const [showPopup, setShowPopup] = useState(false);
  const [showUserNamePopUp, setShowUserNamePopUp] = useState(false);
  const [data, setData] = useState({ contact: '', type: '', page: 'forgotPasswordPage' });

  const loginFormNames = useMemo(
    () => ({
      Doctor: 'Doctor',
      College: 'College',
      SMC: 'SDC',
      NMC: 'DCI',
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
    dispatch(getCaptchaEnabledFlagValue()).then((response) => {
      if (response?.data) {
        dispatch(generateCaptchaImage());

        // .catch((error) => {
        //   successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
        // });
      }
    });
    // .catch((error) => {
    //   successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginFormNames[loginFormname]]);

  const handlePasswordSetup = () => {
    data?.page === 'forgetUserName' ? setShowUserNamePopUp(true) : setShowPopup(true);
  };

  const handleNext = () => {
    dispatch(loginActiveState({ activeIndex: activeIndex + 1 }));
  };
  return (
    <Box sx={{ maxWidth: '648px', mx: 'auto' }}>
      {(activeIndex === 0 || activeIndex === undefined) &&
      loginFormNames[loginFormname] === 'Doctor' ? (
        <DoctorLogin
          loginName={loginFormNames[loginFormname]}
          handleNext={handleNext}
          otpData={setData}
          userTypeDetails={data}
        />
      ) : (
        (activeIndex === 0 || activeIndex === undefined) &&
        loginFormNames[loginFormname] !== 'Doctor' && (
          <Login
            loginName={loginFormNames[loginFormname]}
            handleForgotPassword={handleNext}
            otpData={setData}
            userTypeDetails={data}
          />
        )
      )}
      {activeIndex === 1 && (
        <ForgotPassword
          handleConfirmPassword={handleNext}
          otpData={setData}
          userData={data}
          activeStep={activeStep}
          resetStep={resetStep}
          loginName={loginFormNames[loginFormname]}
        />
      )}
      {activeIndex === 2 && (
        <ConfirmOTP
          handleConfirmOTP={handleNext}
          otpData={data}
          resetStep={resetStep}
          handlePasswordSetup={handlePasswordSetup}
          loginName={loginFormNames[loginFormname]}
        />
      )}
      {activeIndex === 3 && data?.page === 'forgetUserName' && showUserNamePopUp ? (
        <SuccessModal
          open={showUserNamePopUp}
          setOpen={() => setShowUserNamePopUp(false)}
          successRegistration={true}
          userData={data}
          resetStep={resetStep}
        />
      ) : (
        activeIndex === 3 && (
          <NewPasswordSetup
            handlePasswordSetup={handlePasswordSetup}
            otpData={data}
            setShowSuccessPopUp={setShowPopup}
            resetStep={resetStep}
            loginName={loginFormNames[loginFormname]}
          />
        )
      )}

      {showPopup && data?.page !== 'forgetUserName' && (
        <SuccessModal
          open={showPopup}
          setOpen={() => setShowPopup(false)}
          text={' Your password has been successfully changed.'}
          successRegistration={true}
          resetStep={resetStep}
        />
      )}
    </Box>
  );
}

export default LoginPage;
