import { useMemo } from 'react';

import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { verboseLog } from '../../../config/debug';
import CaptchaComponent from '../../../shared/captcha-component/captcha-component';
import { login, userLoggedInType } from '../../../store/reducers/common-reducers';
import { Button, TextField } from '../../../ui/core';
import { PasswordRegexValidation } from '../../../utilities/common-validations';

export function LoginPage({ handleForgotPassword }) {
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
  const onSubmit = (data) => {
    try {
      let req = { mobile: data.nmrID };
      if (req) {
        verboseLog('usersListData', req);
        dispatch(login());
        dispatch(userLoggedInType(loginFormname));
        navigate(`/profile`);
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    } catch (err) {
      verboseLog('usersListData', err);
    }
  };

  return (
    <Box p={4} bgcolor="white.main" boxShadow="4">
      <Typography variant="h2" color="primary.dark">
        {loginFormNames[loginFormname]} {t('Login')}
      </Typography>
      <Box>
        <Box mt={2}>
          <Typography variant="body3">
            {loginFormname === 'Doctor' ? 'NMR/USER ' : 'User '}
            {t('NAME')}
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
            placeholder={t('NMR/USER NAME')}
            margin="dense"
            defaultValue={getValues().nmrID}
            error={errors.nmrID?.message}
            {...register('nmrID', {
              required: 'Provide  valid ID',
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
            placeholder={t('Password')}
            margin="dense"
            defaultValue={getValues().password}
            error={errors.password?.message}
            {...register('password', PasswordRegexValidation)}
          />
        </Box>
        <Box align="center" mt={3}>
          <CaptchaComponent />
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
  );
}

export default LoginPage;
