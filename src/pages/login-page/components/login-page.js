import { useEffect, useMemo, useState } from 'react';

import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { encryptData } from '../../../helpers/functions/common-functions';
import CaptchaComponent from '../../../shared/captcha-component/captcha-component';
import {
  generateCaptchaImage,
  getCaptchaEnabledFlagValue,
  loginAction,
  validateCaptchaImage,
} from '../../../store/actions/login-action';
import { login, userLoggedInType } from '../../../store/reducers/common-reducers';
import { Button, TextField } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';
import { PasswordRegexValidation } from '../../../utilities/common-validations';

export function LoginPage({ handleForgotPassword }) {
  const [captchaAnswer, setcaptachaAnswer] = useState();
  const { generateCaptcha } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { loginFormname } = state;
  const loginFormNames = useMemo(
    () => ({
      Doctor: 'Doctor',
      College: 'College',
      SMC: 'SMC',
      NMC: 'NMC',
    }),
    []
  );
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nmrID: '',
      password: '',
    },
  });
  const captchaResult = (num) => {
    setcaptachaAnswer(num);
  };

  const onSubmit = (param) => {
    dispatch(
      validateCaptchaImage({
        transaction_id: generateCaptcha?.transaction_id,
        result: parseInt(captchaAnswer),
      })
    )
      .then((response) => {
        if (response?.data?.validity) {
          const requestObj = {
            username: param?.nmrID,
            password: encryptData(param?.password),
            user_type:
              loginFormname === 'Doctor'
                ? 1
                : loginFormname === 'College'
                ? 2
                : loginFormname === 'SMC'
                ? 3
                : 4,
            captcha_trans_id: generateCaptcha?.transaction_id,
          };
          dispatch(loginAction(requestObj))
            .then(() => {
              let req = { mobile: param.nmrID };
              if (req) {
                dispatch(login());
                dispatch(userLoggedInType(loginFormname));
                navigate(`/profile`);
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }
            })
            .catch((error) => {
              successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
            });
        } else {
          successToast(
            'ERROR: Invalid captcha, please try with new captcha',
            'auth-error',
            'error',
            'top-center'
          );
        }
      })
      .catch((error) => {
        successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
      });
  };

  useEffect(() => {
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
  }, []);

  return (
    <>
      <ToastContainer></ToastContainer>
      <Box p={4} bgcolor="white.main" boxShadow="4">
        <Typography variant="h2" color="primary.dark">
          {loginFormNames[loginFormname]} {t('Login')}
        </Typography>
        <Box>
          <Box mt={2}>
            <Typography variant="body3">
              {loginFormname === 'Doctor' ? 'NMR ID/User ID' : 'User ID'}
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              inputProps={{ maxLength: 100 }}
              fullWidth
              id="outlined-basic"
              variant="outlined"
              type="text"
              name="nmrID"
              required="true"
              placeholder={t(loginFormname === 'Doctor' ? 'Enter NMR ID/User ID' : 'Enter User ID')}
              margin="dense"
              defaultValue={getValues().nmrID}
              error={errors.nmrID?.message}
              {...register('nmrID', {
                required: 'Provide valid ID',
              })}
            />
          </Box>
          <Box mt={1}>
            <Typography variant="body3">
              {t('Password')}
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              type="Password"
              name="password"
              required="true"
              placeholder={t('Enter Password')}
              margin="dense"
              defaultValue={getValues().password}
              error={errors.password?.message}
              {...register('password', PasswordRegexValidation)}
            />
          </Box>
          <Box align="center" mt={3}>
            <CaptchaComponent captchaResult={captchaResult} />
          </Box>

          <Box align="center" mt={3}>
            <Button
              size="medium"
              variant="contained"
              sx={{
                backgroundColor: 'secondary.lightOrange',
                '&:hover': {
                  backgroundColor: 'secondary.lightOrange',
                },
              }}
              onClick={handleSubmit(onSubmit)}
            >
              {t('Login')}
            </Button>
          </Box>
          <Box mt={3} textAlign={'center'}>
            <Typography
              variant="body1"
              color="textPrimary.dark"
              component="div"
              onClick={handleForgotPassword}
              sx={{
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              {t('Forgot your password?')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default LoginPage;
