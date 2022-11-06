import { useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';

import useCountdown from '../../../../shared/otp-form/use-countdown';
import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';

import styles from '../../login.module.scss';

export function LoginRecoveryOtpForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { countdownDisplay, countdownActive } = useCountdown();

  const [otp, setOtp] = useState('');
  const [otpValid, setOtpValid] = useState(false);

  const handleSubmit = () => {
    if (otp.length >= 6) {
      navigate('/profile');
      setOtpValid(false);
      // onNext();
    } else {
      setOtpValid(true);
    }
  };

  const onChange = (value) => setOtp(value);

  return (
    <Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          <b>{t('We just sent an OTP on the Mobile Number linked with your Aadhaar')}</b>
        </Typography>
        <Typography sx={{ mb: 1, fontSize: 'medium' }}>
          <b>{t('Enter_OTP')}</b>
        </Typography>
      </Box>
      <Box>
        <OtpInput
          inputStyle={{
            width: '3rem',
            height: '3rem',
            margin: '0 1rem',
            fontSize: '2rem',
            borderRadius: 4,
            border: '1px solid rgba(0,0,0,0.3)',
          }}
          isInputNum={true}
          value={otp}
          numInputs={6}
          onChange={onChange}
        />
        {otpValid && (
          <Typography variant="body2" className={styles.invalid} sx={{ color: 'red' }}>
            {'Invalid OTP'}
          </Typography>
        )}
      </Box>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Box>
            <Typography fontWeight={500} align="center" color="textSecondary">
              {t('resend_in')}
              <Box component="span" sx={{ color: 'green', fontWeight: 'bold', ml: 1 }}>
                {countdownDisplay}
              </Box>
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              color="inherit"
              disabled={countdownActive}
              // onClick={handleResend}
              sx={{
                ml: '35%',
                textDecoration: 'underline',
                color: 'blue',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {t('Resend_OTP')}
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <ButtonGroupWizard
          sx={{ backgroundColor: 'neutral.900' }}
          color="success"
          handleNext={handleSubmit}
          // loading={isLoading}
          labelNext={t('Continue')}
        />
      </Box>
    </Box>
  );
}
export default LoginRecoveryOtpForm;
