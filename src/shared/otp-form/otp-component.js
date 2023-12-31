import { useState } from 'react';

import { makeStyles } from '@material-ui/core';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';

import { SessionTimer } from '../../constants/session-timer';
import { Button } from '../../ui/core';
import { SvgImageComponent } from '../../ui/core/svg-icons';

// import useCountdown from './use-countdown';
import styles from './otp-component.module.scss';

export const OtpForm = ({
  otpInvalidError = false,
  resendAction,
  resendTime = 90,
  otpData,
  sendOTP,
}) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState('');
  const [isOtpValid, setOtpValid] = useState(false);
  const [isOtpInvalid, setOtpInvalid] = useState(false);
  const [isResendEnabled, setResetEnabled] = useState(false);
  // const { countdownDisplay, countdownActive, handleCountdownRestart } = useCountdown(resendTime);

  const onChange = (value) => {
    setOtp(value);
    if (value.length >= 6) {
      setOtpValid(true);
      setOtpInvalid(false);
    } else {
      setOtpInvalid(true);
    }
  };

  // const handleResend = () => {
  //   setOtp('');
  //   setOtpValid(false);
  //   setOtpInvalid(false);
  //   resendAction();
  //   // handleCountdownRestart();
  // };

  const handleResend = () => {
    setOtpValid(false);
    setOtpInvalid(false);
    setResetEnabled(true);
  };

  const handleClear = () => {
    setOtp('');
  };

  const getOtpValidation = () => {
    if (!isOtpValid) setOtpInvalid(true);
    return isOtpValid && !isOtpInvalid;
  };

  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    otpInputStyle: {
      width: '48px !important',
      height: '48px',
      marginRight: '12px',
      fontSize: '18px',
      borderRadius: 5,
      border: '1px solid',
      borderColor: theme.palette.otpTextColor.main,
      color: theme.palette.textPrimary.main,
      [theme.breakpoints.down('sm')]: {
        width: '38px !important',
        height: '38px',
        marginRight: '8px',
      },
    },
    focusStyle: {
      outline: `2px solid ${theme.palette.primary.main}`,
    },
  }));
  const classes = useStyles(theme);

  const OtpBox = (
    <Box pt={2}>
      <Box>
        <Box>
          <OtpInput
            inputStyle={classes.otpInputStyle}
            shouldAutoFocus={true}
            focusStyle={classes.focusStyle}
            isInputNum={true}
            value={otp}
            numInputs={6}
            onChange={onChange}
          />
        </Box>
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
                {'Please enter a valid OTP'}
              </Typography>
            </Typography>
          )
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>
          <Typography variant="body1" align="center" color="textPrimary.main">
            {`Didn't receive OTP? `}
            {/* {t('resend_in')} */}
          </Typography>
          <Button
            color="secondary"
            disabled={!isResendEnabled}
            onClick={() => {
              setResetEnabled(!isResendEnabled);
              otpData?.reSendOTP && otpData?.reSendOTP(otpData?.type);
              otpData?.reSetPasswordOtp && otpData?.reSetPasswordOtp('reSetPassword');
              resendAction && resendAction();
              otpData?.page === 'doctorLogInPage' &&
                sendOTP(
                  true,
                  otpData?.type === 'nmr_id' ? 'NMR' : otpData?.type === 'sms' && 'Mobile'
                );
              otpData?.page === 'LogInPage' && sendOTP();
            }}
            sx={{
              fontSize: '16px',
              textDecoration: 'underline',
              cursor: 'pointer',
              paddingLeft: '10px',
              paddingTop: '0',
              paddingBottom: '0',
              '&:hover': {
                textDecoration: `underline ${theme.palette.secondary.main}`,
                background: 'none',
              },
            }}
          >
            {t('Resend_OTP')}
          </Button>
          <Typography variant="body1" color="textPrimary.main">
            {!isResendEnabled ? (
              <SessionTimer valSeconds={resendTime} expireFunction={handleResend} />
            ) : (
              '00:00'
            )}{' '}
            remaining
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return {
    otpform: OtpBox,
    otpValue: otp,
    validationOtp: isOtpValid,
    validationOtpInvalid: isOtpInvalid,
    handleClear,
    getOtpValidation,
    // handleCountdownRestart,
  };
};

export default OtpForm;
