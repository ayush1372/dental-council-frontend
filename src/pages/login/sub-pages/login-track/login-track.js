import { useState } from 'react';

import { Box, Container, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ConsentForm from '../../../../shared/consent-form/consent-form';
import LoginRecoveryMobileOtpForm from '../../components/login-recovery/login-recovery-mobile-otp-form';
import LoginTrackComplete from '../../components/login-track/login-track';

export function LoginTrack() {
  const [isNext, setIsNext] = useState('CONSENT_FORM');

  const { t } = useTranslation();

  const onSubmit = (data) => {
    data && setIsNext('OTP_FORM');
  };

  const onHandleOtpForm = (data) => {
    data && setIsNext('COMPLETE_FORM');
  };

  return (
    <Container
      maxWidth="md"
      data-testid="registerpage"
      sx={{ boxShadow: '0px 3px 6px #00000014;' }}
    >
      <Box
        sx={{
          p: 2,
          mt: 1,
          borderRadius: 2,
        }}
      >
        <Typography align="center" variant="h2" data-testid={'login-track-title-testid'}>
          {t('Enrolment Number Retrieval')}
        </Typography>
        <Divider sx={{ my: 3 }} />
        {isNext === 'CONSENT_FORM' && (
          <ConsentForm
            title={'Enter Your Mobile Number'}
            textFieldName={'MobileNumber'}
            placeholder={'Enter Your Mobile Number'}
            textFieldValidation={{
              required: 'Mobile Number is not valid',
              pattern: {
                value: /^(\d{10})$/i,
                message: 'Mobile Number is not valid',
              },
            }}
            body={'declaration mobile text'}
            checkboxName={'consentCheckbox'}
            checkboxValidation={{
              required: 'Consent is required',
            }}
            checkboxLabel={'I agree'}
            onClick={onSubmit}
          />
        )}

        {isNext === 'OTP_FORM' && (
          <LoginRecoveryMobileOtpForm type={'TRACK'} onNext={onHandleOtpForm} />
        )}

        {isNext === 'COMPLETE_FORM' && <LoginTrackComplete />}
      </Box>
    </Container>
    //
  );
}

export default LoginTrack;
