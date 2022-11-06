import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { verboseLog } from '../../../../config/debug';
import OtpForm from '../../../../shared/otp-form/otp-component';
import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';

export function AadhaarOtpForm({ onNext, nextStep }) {
  const { t } = useTranslation();

  const otpResend = () => {
    verboseLog('otp resend successfully');
  };

  const { otpform, otpValue, getOtpValidation } = OtpForm({
    resendAction: otpResend,
    resendTime: 90,
  });

  const handleSubmit = () => {
    if (getOtpValidation()) {
      verboseLog('otpvalue-', otpValue);
      onNext();
    }
  };

  return (
    <Box>
      <Box>
        <Typography data-testid="header" sx={{ mb: 1 }} variant="h2">
          {t('Confirm OTP')}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography data-testid="OTP_text" variant="body1">
          {t('OTP_on_mobile_number')}
        </Typography>
      </Box>
      {otpform}
      <ButtonGroupWizard
        sx={{ backgroundColor: 'secondary.main' }}
        color="success"
        handleNext={handleSubmit}
        // loading={isLoading}
        labelNext={t('Next').concat(` : Step ${nextStep}`)}
      />
    </Box>
  );
}
export default AadhaarOtpForm;
