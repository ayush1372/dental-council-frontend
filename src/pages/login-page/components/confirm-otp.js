import { useState } from 'react';

import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { encryptData } from '../../../helpers/functions/common-functions';
import { OtpForm } from '../../../shared/otp-form/otp-component';
import { verifyNotificationOtp } from '../../../store/actions/common-actions';
import { Button } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';

const ConfirmOTP = ({ handleConfirmOTP, otpData }) => {
  const { t } = useTranslation();
  const [isOtpValid, setIsOtpValid] = useState(true);
  const dispatch = useDispatch();
  const { sendNotificationOtpData } = useSelector((state) => state?.common);

  const otpResend = () => {
    successToast('OTP Resent Successfully', 'otp-resent', 'success', 'top-center');
  };

  const { otpform, getOtpValidation, otpValue } = OtpForm({
    resendAction: otpResend,
    resendTime: 90,
    otpInvalidError: !isOtpValid,
  });

  // eslint-disable-next-line no-console
  console.log('hello', otpData?.type);

  const onHandleVerify = () => {
    if (getOtpValidation()) {
      setIsOtpValid(false);
      handleConfirmOTP();
    }
    dispatch(
      verifyNotificationOtp({
        transaction_id: sendNotificationOtpData.data?.transaction_id,
        contact: otpData?.contact,
        type: otpData?.type,
        otp: encryptData(otpValue, process.env.REACT_APP_PASS_SITE_KEY),
      })
    );
  };

  return (
    <Box p={4} bgcolor="white.main" boxShadow="4">
      <Typography variant="h2" component="div">
        Confirm OTP
      </Typography>
      <Box>
        <Box
          sx={{
            width: {
              xs: '100%',
              md: 'fit-content',
            },
          }}
        >
          <Typography variant="body1">
            We just sent an OTP on your registered{' '}
            {otpData?.type === 'sms'
              ? `Mobile Number XXXXXX${otpData?.contact.slice(-4)}`
              : `email Id XXXXXX${otpData?.contact.slice(-12)}`}{' '}
            linked with your Aadhaar.
          </Typography>

          {otpform}
        </Box>
        <Box align="end" mt={3}>
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
