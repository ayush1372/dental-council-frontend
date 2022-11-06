import { Box, Button, Typography } from '@mui/material';

import OtpForm from '../../../../../shared/otp-form/otp-component';
import successToast from '../../../../../ui/core/toaster';

import styles from './otp-component-link-guardian.module.scss';

export function OtpComponentLinkGuardian(props) {
  const { userMobileNumber, verifyOnClick, setOtp } = props;
  const otpResend = () => {
    successToast('OTP Resent Successfully', 'otp-resent', 'success', 'top-center');
  };
  const { otpform, otpValue } = OtpForm({
    resendAction: otpResend,
    resendTime: 90,
  });
  setOtp(otpValue);
  return (
    <div className={styles.main} data-testid="otp-component-link-guardian">
      <Box py={4}>
        <Typography variant="h2" mb={2}>
          Confirm OTP
        </Typography>
        <Typography variant="body3">
          Please Enter 6 Digit Code We Have Sent To You On Your{' '}
          <strong>
            Registered Mobile Number {userMobileNumber ? userMobileNumber : '0000000000'}
          </strong>{' '}
          Linked With Your Aadhaar.
        </Typography>
        <Box display="flex" alignItems="baseline">
          {otpform}
          {otpValue.length === 6 && (
            <Button variant="outlined" color="secondary" sx={{ ml: 2 }} onClick={verifyOnClick}>
              Verify OTP
            </Button>
          )}
        </Box>
      </Box>
    </div>
  );
}
