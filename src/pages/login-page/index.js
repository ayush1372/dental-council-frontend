/* eslint-disable no-console */
import { Box, Container, Link, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { verboseLog } from '../../config/debug';
import CaptchaComponent from '../../shared/captcha-component/captcha-component';
import { Button, TextField } from '../../ui/core';
import { PasswordRegexValidation } from '../../utilities/common-validations';

import styles from './login-page.module.scss';
console.log('styles', styles);
export function LoginPage() {
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
        navigate(`/NMR-generate`);
      }
    } catch (err) {
      verboseLog('usersListData', err);
    }
  };
  // const handleSubmit = () => {
  //   navigate(`/NMR/NMR-generate`);
  // };
  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 10 }}>
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
          <Box sx={{ mt: 2 }}>
            <Typography variant="body4">
              <b>
                {' '}
                {loginFormname === 'Doctor' ? 'NMR ' : 'User '}
                {t('ID')}
              </b>
            </Typography>
            <TextField
              fullWidth={true}
              id="outlined-basic"
              variant="outlined"
              type="text"
              name="nmrID"
              required="true"
              placeholder={t('NMR ID')}
              margin="dense"
              defaultValue={getValues().nmrID}
              error={errors.nmrID?.message}
              {...register('nmrID', {
                required: 'Provide  valid  NMR ID',
                pattern: {
                  value: /^(\d{12})$/i,
                  message: 'Provide  valid  NMR ID',
                },
              })}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body4">
              <b>{t('Password')}</b>
            </Typography>
            <TextField
              fullWidth={true}
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
          <Box sx={{ mt: 3 }}>
            <CaptchaComponent />
          </Box>

          <Box align="center" sx={{ mt: 3 }}>
            <Button
              size="medium"
              variant="contained"
              color="secondary"
              className={styles.LoginButton}
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
