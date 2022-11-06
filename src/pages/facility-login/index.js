import { Box, Container, Divider, Link, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { verboseLog } from '../../config/debug';
import CaptchaComponent from '../../shared/captcha-component/captcha-component';
import { TextField } from '../../ui/core';
import ButtonGroupWizard from '../../ui/core/wizard/button-group-wizard';
import { PasswordRegexValidation } from '../../utilities/common-validations';

// import styles from './facility.login.module.scss';

export function FacilityLogin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      facilityID: '',
      password: '',
    },
  });
  const onSubmit = (data) => {
    try {
      let req = { mobile: data.facilityID };
      if (req) {
        verboseLog('usersListData', req);
        navigate(`/facility-generate`);
      }
    } catch (err) {
      verboseLog('usersListData', err);
    }
  };
  // const handleSubmit = () => {
  //   navigate(`/facility/facility-generate`);
  // };
  return (
    <Container
      maxWidth="md"
      sx={{ mt: 2, border: 1, borderColor: 'grey.500', borderRadius: '10px' }}
    >
      <Box p={2}>
        <Typography align="center" variant="h2" sx={{ mt: 4 }}>
          {t('Facility Login')}
        </Typography>
        <Divider sx={{ mb: 4, mt: 4 }} variant="fullWidth" />
        <Box sx={{ p: '0px 1.5vw', fontsize: '1rem', lineHeight: '1.4375em' }}>
          <Box>
            <Typography variant="body1">
              <b>{t('Facility ID')}</b>
            </Typography>
            <TextField
              fullWidth={true}
              id="outlined-basic"
              variant="outlined"
              type="text"
              name="facilityID"
              required="true"
              placeholder={t('Facility ID')}
              margin="dense"
              defaultValue={getValues().facilityID}
              error={errors.facilityID?.message}
              {...register('facilityID', {
                required: 'Provide  valid  Facility ID',
                pattern: {
                  value: /^(\d{12})$/i,
                  message: 'Provide  valid  Facility ID',
                },
              })}
            />
          </Box>
          <Box>
            <Typography variant="body1">
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
          <Box>
            <CaptchaComponent />
          </Box>
          <Box mt={1.5}>
            <Typography component="span">
              {t('Not received a password or forgot your password?')}
            </Typography>
            <Link href="https://facility.ndhm.gov.in" target="_blank" ml="5px" fontSize="16px">
              {t('Click here')}
            </Link>
          </Box>
          <ButtonGroupWizard
            handleNext={handleSubmit(onSubmit)}
            // loading={isLoading}
            labelNext={t('Next')}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default FacilityLogin;
