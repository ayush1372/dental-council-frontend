import { Box, Container, Link, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { verboseLog } from '../../config/debug';
import CaptchaComponent from '../../shared/captcha-component/captcha-component';
import { login, userLoggedInType } from '../../store/reducers/common-reducers';
import { Button, TextField } from '../../ui/core';
import { PasswordRegexValidation } from '../../utilities/common-validations';

import styles from './login-page.module.scss';

export function LoginPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { loginFormname } = state;
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
  // const handleSubmit = () => {
  //   navigate(`/NMR/NMR-generate`);
  // };
  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Box p={4} className={styles.loginContainerBox}>
        <Typography variant="h2" className={styles.headingText}>
          {loginFormname === 'Doctor'
            ? 'Doctor '
            : loginFormname === 'College'
            ? 'College '
            : loginFormname === 'SMC'
            ? 'SMC '
            : 'NMC '}
          {t('Login')}
        </Typography>
        <Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body4">
              <b>
                {' '}
                {loginFormname === 'Doctor' ? 'NMR/USER ' : 'User '}
                {t('ID')}
              </b>
            </Typography>
            <TextField
              inputProps={{ maxLength: 100 }}
              fullWidth
              id="outlined-basic"
              variant="outlined"
              type="text"
              name="nmrID"
              required="true"
              placeholder={t('ID')}
              margin="dense"
              defaultValue={getValues().nmrID}
              error={errors.nmrID?.message}
              {...register('nmrID', {
                required: 'Provide  valid ID',
                // pattern: {
                //   value: /^(\d{12})$/i,
                //   message: 'Provide  valid  NMR ID',
                // },
              })}
            />
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body4">
              <b>{t('Password')}</b>
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
          <Box align="center" sx={{ mt: 3 }}>
            <CaptchaComponent />
          </Box>

          <Box align="center" sx={{ mt: 3 }}>
            <Button
              size="medium"
              variant="contained"
              sx={{
                backgroundColor: 'orangeBackgroundColor.main',
                '&:hover': {
                  backgroundColor: 'orangeBackgroundColor.main',
                },
              }}
              onClick={handleSubmit(onSubmit)}
              // loading={isLoading}
            >
              {t('Login')}
            </Button>
          </Box>
          <Box sx={{ mt: 3 }} textAlign={'center'}>
            <Link href="#" target="_blank" ml="5px" fontSize="16px">
              {t('Forgot your password?')}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
