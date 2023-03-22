import { useEffect, useMemo } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  generateCaptchaImage,
  getCaptchaEnabledFlagValue,
} from '../../../store/actions/login-action';
import successToast from '../../../ui/core/toaster';
import { DoctorLogin } from './doctor-login';
import { Login } from './login-data';

export function LoginPage() {
  const dispatch = useDispatch();
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

  return loginFormNames[loginFormname] === 'Doctor' ? (
    <DoctorLogin loginName={loginFormNames[loginFormname]} />
  ) : (
    <Login loginName={loginFormNames[loginFormname]} />
  );
}

export default LoginPage;
