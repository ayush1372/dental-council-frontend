import { useState } from 'react';

import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { OtpForm } from '../../../shared/otp-form/otp-component';
import { Button } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';

import styles from '../login-page.module.scss';

const ConfirmOTP = ({ handleConfirmOTP }) => {
  const { t } = useTranslation();
  const [isOtpValid, setIsOtpValid] = useState(true);

  const otpResend = () => {
    successToast('OTP Resent Successfully', 'otp-resent', 'success', 'top-center');
  };
  const onHandleVerify = () => {
    if (getOtpValidation()) {
      setIsOtpValid(false);
      handleConfirmOTP();
    }
  };

  const { otpform, getOtpValidation } = OtpForm({
    resendAction: otpResend,
    resendTime: 90,
    otpInvalidError: !isOtpValid,
  });
  return (
    <Box p={4} className={styles.loginContainerBox}>
      <Typography variant="h2" component="div">
        Confirm OTP
      </Typography>
      <Box>
        <Box>
          <Typography variant="body1">
            {`We just sent an OTP on your registered Mobile Number XXXXXX2182 linked with your Aadhaar.`}
          </Typography>
          {otpform}
        </Box>
        <Box align="end" sx={{ mt: 3 }}>
          <Button
            size="medium"
            variant="contained"
            sx={{
              backgroundColor: 'secondary.lightOrange',
              '&:hover': {
                backgroundColor: 'secondary.lightOrange',
              },
            }}
            onClick={onHandleVerify}
          >
            {t('Continue')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default ConfirmOTP;
