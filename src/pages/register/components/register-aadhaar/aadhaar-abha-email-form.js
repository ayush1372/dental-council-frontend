import { useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { verboseLog } from '../../../../config/debug';
import { OtpForm } from '../../../../shared/otp-form/otp-component';
import { Button } from '../../../../ui/core';
import { TextField } from '../../../../ui/core/form/textfield/textfield';
import successToast from '../../../../ui/core/toaster';
export function ABHAEmailForm({ onNext }) {
  const { t } = useTranslation();
  const [showOTP, setShowOTP] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });
  const handleSkip = () => {
    onNext();
  };

  const onSubmitEmail = (data) => {
    try {
      let req = { email: data };
      if (req) {
        if (showOTP && getOtpValidation()) onNext();
        verifyOTP();
        verboseLog('usersListData', req);
      }
    } catch (err) {
      verboseLog('usersListData', err);
    }
  };
  const otpResend = () => {
    successToast('OTP Resent Successfully', 'otp-resent', 'success', 'top-center');
  };
  const { otpform, getOtpValidation } = OtpForm({
    resendAction: otpResend,
    resendTime: 90,
  });
  const verifyOTP = () => {
    setShowOTP(true);
  };
  return (
    <>
      <Box>
        <Typography variant="body1" fontWeight={'600'}>
          {t('The Email Address will be used for all communications related to ABHA.')}
        </Typography>
      </Box>
      <Typography variant="body1" fontSize={'16px'}>
        {t('E-Mail')}
      </Typography>
      <Box display={'flex'}>
        <Box display={'flex'} alignItems={'center'}>
          <TextField
            sx={{ width: '35ch' }}
            type="text"
            name="email"
            size="large"
            required
            placeholder={t('Email')}
            defaultValue={getValues().email}
            error={errors.email?.message}
            {...register('email', {
              required: {
                value: true,
                message: 'Provide a Valid Email ID',
              },
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
                message: 'Provide a Valid Email ID',
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" edge="end">
                    {!errors.email?.message && getValues().email.length !== 0 ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      ''
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box ml={2}>
          <Button onClick={handleSubmit(onSubmitEmail)} variant="outlined" color="warning">
            {t('Verify')}{' '}
          </Button>
        </Box>
      </Box>
      {showOTP && (
        <Box mt="30px">
          <Typography variant="h6">Confirm OTP</Typography>
          <Typography>{`We just sent an OTP on your Email address`}</Typography>
          {otpform}
        </Box>
      )}
      <Box mt={8} display={'flex'} justifyContent={'space-between'}>
        <Button
          onClick={() => {
            handleSkip();
          }}
          variant="outlined"
          color="secondary"
        >
          {t('Skip for Now')}
        </Button>
        <Button
          onClick={() => {
            showOTP && handleSubmit(onSubmitEmail(getValues()?.email));
          }}
          color="secondary"
          variant="contained"
        >
          {t('Next : Step 4')}
        </Button>
      </Box>
    </>
  );
}

export default ABHAEmailForm;
