import { useState } from 'react';

import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
// import { verboseLog } from '../../../../config/debug';
import { useNavigate } from 'react-router-dom';

import { verboseLog } from '../../../../config/debug';
import { OtpForm } from '../../../../shared/otp-form/otp-component';
import { Button, RadioGroup, TextField } from '../../../../ui/core';
import successToast from '../../../../ui/core/toaster';
import { PasswordRegexValidation } from '../../../../utilities/common-validations';

export function LoginAuthMethodForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showValidateField, setValidateField] = useState('');
  const [showValidateOtpField, setValidateOtpField] = useState('');
  const [isOtpValid, setIsOtpValid] = useState(true);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      abhaNumber: '12-2121-2122-1212',
      Password: '',
      otpAuthMethodAvailable: 'USE_PASSWORD',
    },
  });

  const otpResend = () => {
    successToast('OTP Resent Successfully', 'otp-resent', 'success', 'top-center');
    verboseLog('OTP FORM - ', 'OTP Resent Succussfully');
  };

  const { otpform, otpValue, getOtpValidation } = OtpForm({
    resendAction: otpResend,
    resendTime: 90,
    otpInvalidError: !isOtpValid,
  });

  const onHandleVerify = () => {
    verboseLog('OTP Value - ', `${otpValue ? otpValue : 'Field is Blank'}`);

    if (getOtpValidation() && getValues().otpAuthMethodAvailable !== 'USE_PASSWORD') {
      setIsOtpValid(false);
      navigate('/profile');
    } else if (getValues().otpAuthMethodAvailable === 'USE_PASSWORD') {
      navigate('/profile');
    }

    // if (getValues().Password !== '')
    // else if (getValues().otpAuthMethodAvailable !== '') onNext();
  };

  const onHandleOtp = (e) => {
    setValidateOtpField(e.target.value);

    verboseLog('showValidateOtpField', showValidateOtpField);
  };

  const onHandlePassword = (e) => {
    setValidateField(e.target.value);
    verboseLog('showValidateField', showValidateField);
  };

  return (
    <Box>
      <Box maxWidth={'407px'}>
        <TextField
          fullWidth={true}
          disabled
          data-testid="passwordtxt"
          variant="outlined"
          label={t('ABHA Number')}
          name="abhaNumber"
          defaultValue={getValues().abhaNumber}
          margin="dense"
          {...register('abhaNumber')}
        />
      </Box>
      <Box>
        <Typography variant="body1" sx={{ mt: 4 }} component="div">
          Validate Using
        </Typography>
        <Box
          borderRadius="3px"
          border="1px solid"
          borderColor="inputBorderColor.main"
          p="14px 15px"
          mb="32px"
        >
          <RadioGroup
            name={'otpAuthMethodAvailable'}
            dataTestid="login-otp=option-change"
            {...register('otpAuthMethodAvailable', {
              onChange: (e) => onHandleOtp(e),
            })}
            size="small"
            defaultValue={getValues().otpAuthMethodAvailable}
            items={[
              {
                value: 'USE_PASSWORD',
                label: 'Password',
              },
              { value: 'AADHAAR_OTP', label: 'OTP on Mobile number linked with Aadhaar' },
              {
                value: 'MOBILE_OTP',
                label: 'OTP on Mobile number linked with ABHA Number',
              },
            ]}
          />
        </Box>
      </Box>
      {getValues().otpAuthMethodAvailable === 'USE_PASSWORD' && (
        <Box maxWidth={'407px'}>
          <TextField
            margin="dense"
            variant="outlined"
            type="Password"
            label={t('Password')}
            fullWidth={true}
            data-testid={'login-abha-number-pwd-form'}
            name={'Password'}
            required={true}
            placeholder={t('Password')}
            defaultValue={getValues().Password}
            error={errors.Password?.message}
            {...register('Password', {
              required: PasswordRegexValidation.required,
              pattern: PasswordRegexValidation.pattern,
              onChange: (e) => onHandlePassword(e),
            })}
          />
        </Box>
      )}

      {getValues().otpAuthMethodAvailable !== 'USE_PASSWORD' && (
        <Box>
          <Typography variant="h3">Confirm OTP</Typography>
          <Typography variant="body1">
            {`Please enter 6 digit code we have sent on your registered Mobile Number XXXXXX2182
            linked with your ${
              getValues().otpAuthMethodAvailable === 'AADHAAR_OTP' ? 'Aadhaar' : 'ABHA Number'
            }.`}
          </Typography>
          {otpform}
        </Box>
      )}

      <Box mt={2} sx={{ display: 'flex', justifyContent: 'right' }}>
        <Button
          variant="contained"
          data-testid={'login-auth-btn-testid'}
          color="secondary"
          onClick={handleSubmit(onHandleVerify)}
        >
          {'Continue'}
        </Button>
      </Box>
    </Box>
  );
}

export default LoginAuthMethodForm;
