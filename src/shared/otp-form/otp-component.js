import { useState } from 'react';

import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import { ToastContainer } from 'react-toastify';

import { Button } from '../../ui/core';
import { SvgImageComponent } from '../../ui/core/svg-icons';
import useCountdown from './use-countdown';

import styles from './otp-component.module.scss';

const otpInputStyle = {
  width: '56px',
  height: '56px',
  marginRight: '12px',
  fontSize: '18px',
  borderRadius: 5,
  border: '1px solid #D8DCDE',
  borderColor: 'inputBorderColor.main',
  color: '#D8DCDE',
  boxShadow: '0 1px 3px #00000029',
  backgroundColor: '#FAFAFA',
};

export const OtpForm = ({ otpInvalidError = false, resendAction = undefined, resendTime = 90 }) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState('');
  const [isOtpValid, setOtpValid] = useState(false);
  const [isOtpInvalid, setOtpInvalid] = useState(false);
  const { countdownDisplay, countdownActive, handleCountdownRestart } = useCountdown(resendTime);

  const onChange = (value) => {
    setOtp(value);
    if (value.length >= 6) {
      setOtpValid(true);
      setOtpInvalid(false);
    } else {
      setOtpInvalid(true);
    }
  };

  const handleResend = () => {
    setOtp('');
    setOtpValid(false);
    setOtpInvalid(false);
    resendAction();
    handleCountdownRestart();
  };

  const getOtpValidation = () => {
    if (!isOtpValid) setOtpInvalid(true);
    return isOtpValid && !isOtpInvalid;
  };

  const OtpBox = (
    <Box pt={2}>
      <ToastContainer></ToastContainer>
      <Box>
        <OtpInput
          // inputStyle={styles.otpInput}
          inputStyle={otpInputStyle}
          shouldAutoFocus={true}
          focusStyle={{ outline: '2px solid #264488' }}
          isInputNum={true}
          value={otp}
          numInputs={6}
          onChange={onChange}
        />
        {otpInvalidError ? (
          <Typography className={styles.invalid}>
            <SvgImageComponent icon="error" height="14px" width="16px" />
            <Typography variant="body2" pl={0.5}>
              {'Invalid OTP'}
            </Typography>
          </Typography>
        ) : (
          isOtpInvalid && (
            <Typography className={styles.invalid}>
              <SvgImageComponent icon="error" height="14px" width="16px" />
              <Typography variant="body2" p="1px 0 0 4px">
                {'Please Enter a Valid OTP'}
              </Typography>
            </Typography>
          )
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>
          <Typography variant="body1" align="center" color="textPrimary.main">
            {`Didn't recieve code? `}
            {/* {t('resend_in')} */}
          </Typography>
          <Button
            color="secondary"
            disabled={countdownActive}
            onClick={handleResend}
            sx={{
              fontSize: '16px',
              textDecoration: 'underline',
              cursor: 'pointer',
              paddingLeft: '10px',
              '&:hover': {
                textDecoration: 'underline #D66025',
                background: 'none',
              },
            }}
          >
            {t('Resend_OTP')}
          </Button>
          <Typography variant="body1">{`${countdownDisplay} remaining`}</Typography>
        </Box>
      </Box>
    </Box>
  );

  return {
    otpform: OtpBox,
    otpValue: otp,
    validationOtp: isOtpValid,
    validationOtpInvalid: isOtpInvalid,
    getOtpValidation,
  };
};

export default OtpForm;
