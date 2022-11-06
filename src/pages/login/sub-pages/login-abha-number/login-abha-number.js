import { Box, Container, Divider, Link, Tab, Tabs, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import LoginAuthMethodForm from '../../components/login-abha-number/login-auth-method-form';

import styles from '../../login.module.scss';

export function LoginAbhaNumber() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleTab = (value) => {
    if (value === 'mobile') {
      navigate('/login/mobile');
    }
  };

  return (
    <Container
      maxWidth="md"
      data-testid="registerpage"
      // sx={{ boxShadow: '0px 3px 6px #00000014;', mt: 4 }}
      mt={4}
    >
      <Box pt={4}>
        <Typography variant="h2">{t('Login To Your Account')}</Typography>
      </Box>
      <Box mb={2}>
        <Tabs aria-label="basic tabs example">
          <Tab
            label={
              <Typography variant="subtitle1" color="textPrimary.main">
                ABHA Number
              </Typography>
            }
            className={styles.optionTabs_selected}
            onClick={() => handleTab('abhaNumber')}
            sx={{
              mr: '2px',
              boxShadow: 1,
              width: '256px',
              minWidth: '256px',
              height: '80px',
              minHeight: '80px',
            }}
          />
          <Tab
            label={
              <Typography variant="subtitle1" color="textPrimary.main">
                Mobile
              </Typography>
            }
            className={styles.optionTabs}
            onClick={() => handleTab('mobile')}
            sx={{
              boxShadow: 1,
              width: '256px',
              minWidth: '256px',
              height: '80px',
              minHeight: '80px',
            }}
          />
        </Tabs>
      </Box>
      <Box p={4} boxShadow="1" borderRadius="2px" border="1px solid inputBorderColor.main">
        <LoginAuthMethodForm />
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box display="flex" textAlign={'center'}>
        <Typography>
          <Link variant="body1" color={'secondary'} href="recovery">
            Forgot Your ABHA Number?
          </Link>{' '}
          |{' '}
          <Link variant="body1" color={'secondary'} href="track">
            Tack Your Enrolment Number?
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default LoginAbhaNumber;
