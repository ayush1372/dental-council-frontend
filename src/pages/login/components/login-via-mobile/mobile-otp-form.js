import { Box, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { verboseLog } from '../../../../config/debug';
import OtpForm from '../../../../shared/otp-form/otp-component';
import { Button } from '../../../../ui/core/button/button';
import successToast from '../../../../ui/core/toaster';
import { getMaskedMobileNumber } from '../../../../utilities/common-validations';

import styles from './login-via-mobile.module.scss';

export function LoginMobileOtpForm({ onNext, goToProfile = false }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userMobileNumber = getMaskedMobileNumber(useSelector((state) => state.login.mobileNumber));
  const otpResend = () => {
    successToast('OTP Resent Successfully', 'otp-resent', 'success', 'top-center');
    verboseLog('OTP FORM - ', 'OTP Resent Succussfully');
  };

  const { otpform, otpValue, getOtpValidation } = OtpForm({
    resendAction: otpResend,
    resendTime: 90,
  });

  const handleSubmit = () => {
    verboseLog('OTP Value - ', `${otpValue ? otpValue : 'Field is Blank'}`);
    if (goToProfile && getOtpValidation()) {
      navigate('/profile');
    } else if (getOtpValidation()) {
      onNext();
    }
  };

  return (
    <Box p="32px 0px">
      <Typography variant="h2" mb={2}>
        {/* {t('otp_on_the_mobile_number_linked')} */}
        Confirm OTP
      </Typography>
      <Typography variant="body3">
        Please Enter 6 Digit Code We Have Sent To You On Your{' '}
        <strong>
          Registered Mobile Number {userMobileNumber ? userMobileNumber : '0000000000'}
        </strong>{' '}
        Linked With Your Aadhaar.
      </Typography>

      {otpform}

      <Box mt={4}>
        <Typography variant="body3">
          Forgot Your ABHA Number? <Link className={styles.forgotLinks}>Click Here</Link>
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography pt={2} variant="body3">
            Want to Track Your Enrollment Number?{' '}
            <Link className={styles.forgotLinks}>Click Here</Link>
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            // loading={isLoading}
          >
            {t('Continue')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginMobileOtpForm;
