import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Collapse, IconButton, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { verboseLog } from '../../../../config/debug';
import OtpForm from '../../../../shared/otp-form/otp-component';
import MobileNumber from '../../../../ui/core/mobile-number/mobile-number';
import successToast from '../../../../ui/core/toaster';
import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';

import styles from '../../sub-pages/register-aadhaar/register-aadhaar.module.scss';

export function AbhaNumberCreation({ handleEmail }) {
  const { t } = useTranslation();
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [open, setOpen] = useState(true);

  const otpResend = () => {
    successToast('OTP Resent Successfully', 'otp-resent', 'success', 'top-center');
    verboseLog('OTP FORM - ', 'OTP Resent Succussfully');
  };

  const { otpform, otpValue, getOtpValidation } = OtpForm({
    resendAction: otpResend,
    resendTime: 90,
    otpInvalidError: !isOtpValid,
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      mobileNumber: '',
    },
  });

  const onSubmit = (data) => {
    verboseLog('OTP Value - ', `${otpValue ? otpValue : 'Field is Blank'}`);
    try {
      let req = { mobile: data.mobileNumber };
      if (getOtpValidation() && showOtp) {
        handleEmail();
        setIsOtpValid(false);
        return;
      } else if (req && !getOtpValidation()) {
        verboseLog('usersListData', req);
      }
    } catch (err) {
      verboseLog('usersListData', err);
    }
  };

  const showOtpForm = () => {
    setShowOtp(true);
  };
  return (
    <div className={styles.main} data-testid="register-aadhaar">
      <Box>
        <Box>
          <Box>
            <Collapse in={open}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon color="success" fontSize="inherit" />
                  </IconButton>
                }
                sx={{ m: 2, marginLeft: '0px', borderRadius: '5px' }}
              >
                Your Aadhaar Authentication has been successfully completed.
              </Alert>
            </Collapse>
          </Box>
          <Box
            sx={{
              mt: 1,
              variant: 'h2',
            }}
          >
            {t('abha_mobile_number_creation')}
          </Box>
          <Box
            sx={{
              backgroundColor: 'background.default',
              mt: 2,
              borderRadius: 2,
            }}
          >
            <MobileNumber
              register={register}
              getValues={getValues}
              errors={errors}
              showVerify={true}
              verifyOnClick={showOtpForm}
            />
          </Box>
          {showOtp && (
            <Box
              sx={{
                marginTop: '40px',
              }}
            >
              <Box>
                <Typography variant="h3">Confirm OTP</Typography>
              </Box>
              <Box>
                <Typography variant="body1">
                  We just sent an OTP on your Mobile Number XXXXXX0000.
                </Typography>
              </Box>
              {otpform}
            </Box>
          )}
        </Box>
        <ButtonGroupWizard
          handleNext={handleSubmit(onSubmit)}
          // loading={isLoading}
          labelNext={t('Continue : Step 3')}
        />
      </Box>
    </div>
  );
}

export default AbhaNumberCreation;
