/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import { useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Collapse, Container, IconButton, InputAdornment, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';

import { verboseLog } from '../../../config/debug';
// import OtpForm from '../../../shared/otp-form/otp-component';
import OtpForm from '../../../shared/otp-form/otp-component';
import { Button, TextField } from '../../../ui/core';
// import MobileNumber from '../../../ui/core/mobile-number/mobile-number';

function Formverification() {
  const [open, setOpen] = useState(true);
  // const [showOtp, setShowOtp] = useState({
  //   email: false,
  //   mobileNumber: false,
  // });
  // const [isOtpValid, setIsOtpValid] = useState({
  //   email: false,
  //   mobileNumber: false,
  // });
  const [showOtpEmail, setShowOtpEmail] = useState(false);
  const [showOtpMobile, setShowOtpMobile] = useState(false);

  const [isOtpValidEmail, setisOtpValidEmail] = useState(false);
  const [isOtpValidMobile, setisOtpValidMobile] = useState(false);
  const [emailVerifyToggle, setEmailVerifyToggle] = useState(true);
  const [mobileVerifyToggle, setMobileVerifyToggle] = useState(true);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      MobileNumber: '',
      email: '',
    },
  });
  const handleValidate = (type) => {
    console.log('type===>', type);
    if (type === 'email') {
      setisOtpValidEmail(true);
      setShowOtpEmail(false);
      setEmailVerifyToggle(false);
    } else {
      console.log('type===>', type);

      setisOtpValidMobile(true);
      setShowOtpMobile(false);
      setMobileVerifyToggle(false);
    }
  };

  const handleVerify = (type) => {
    // console.log('type ===>', type);
    if (type === 'email') {
      setShowOtpEmail(true);
    } else {
      setShowOtpMobile(true);
      // setShowOtp({ mobileNumber: true, ...showOtp });
    }
    // console.log('showOtp===>', showOtp);
  };
  const otpResend = () => {
    // successToast('OTP Resent Successfully', 'otp-resent', 'success', 'top-center');
    // verboseLog('OTP FORM - ', 'OTP Resent Succussfully');
  };
  const { otpform, otpValue, getOtpValidation, handleClear } = OtpForm({
    resendAction: otpResend,
    resendTime: 90,
    otpInvalidError: !isOtpValidEmail,
  });

  // const handleInput = (e) => {
  //   e.preventDefault();
  //   if (e.target.value.length > 0) {
  //     e.target.value = isNaN(e.target.value)
  //       ? e.target.value.toString().slice(0, -1)
  //       : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
  //   }
  // };

  return (
    <Container sx={{ width: '712px' }}>
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
                <CloseIcon color="inputBorderSuccessColor.main" fontSize="inherit" />
              </IconButton>
            }
            sx={{ m: 2, marginLeft: '0px', borderRadius: '5px' }}
          >
            Record fetched successfully.
          </Alert>
        </Collapse>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="body3" component="div">
            Name
          </Typography>
          <Typography variant="subtitle2" component="div" color="primary">
            Akshath Saxena
          </Typography>
        </Box>
        <Box>
          <Typography variant="body3" component="div">
            Registration Number
          </Typography>
          <Typography variant="subtitle2" component="div" color="primary">
            9876543210
          </Typography>
        </Box>
      </Box>
      <Box pt="34px" pb="51px">
        <Typography variant="body3" component="div">
          Council
        </Typography>
        <Typography variant="subtitle2" component="div" color="primary">
          West Bengal Medical Council
        </Typography>
      </Box>
      <Box>
        <Box>
          <Typography variant="body3">
            Enter your email
            <Typography component="span" sx={{ color: 'error.main' }}>
              *
            </Typography>
          </Typography>
        </Box>
        <Box>
          <TextField
            sx={{ width: '536px', paddingRight: '16px' }}
            required
            type="text"
            name={'email'}
            placeholder={t('Enter email')}
            defaultValue={getValues().email}
            error={errors.email?.message}
            {...register('email', {
              required: 'Email ID is required',
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
                    {isOtpValidEmail ? <CheckCircleIcon color="success" /> : ''}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {emailVerifyToggle && (
            <Button
              variant="contained"
              color="secondary"
              width="95px"
              onClick={handleSubmit(handleVerify.bind(this, 'email'))}
            >
              verify
            </Button>
          )}
        </Box>
      </Box>
      {showOtpEmail && (
        <Box>
          <Box>
            <Typography variant="body1">We just sent an OTP on your email address.</Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Box>{otpform}</Box>
            <Button
              sx={{ width: '114px', height: '53px', marginTop: '17px' }}
              component="span"
              variant="contained"
              color="secondary"
              onClick={handleSubmit(handleValidate.bind(this, 'email'))}
            >
              Validate
            </Button>
          </Box>
        </Box>
      )}
      <Box sx={{ mt: '10px', paddingBottom: '48px' }}>
        <Box>
          <Typography variant="body3">
            Enter your mobile number
            <Typography component="span" sx={{ color: 'error.main' }}>
              *
            </Typography>
          </Typography>
          <TextField
            sx={{ width: '536px', paddingRight: '16px' }}
            required
            type="text"
            name={'MobileNumber'}
            placeholder={t('Enter mobile number')}
            defaultValue={getValues().MobileNumber}
            error={errors.MobileNumber?.message}
            {...register('MobileNumber', {
              required: 'Mobile Number is required',
              pattern: {
                value: /^\d{10}$/i,
                message: 'Provide a Valid Phone Number',
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" edge="end">
                    {isOtpValidMobile ? <CheckCircleIcon color="success" /> : ''}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {mobileVerifyToggle && (
            <Button
              variant="contained"
              color="secondary"
              width="95px"
              onClick={handleSubmit(handleValidate.bind(this, 'MobileNumber'))}
            >
              verify
            </Button>
          )}
        </Box>
        {showOtpMobile && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="body1">We just sent an OTP on your Mobile Number.</Typography>
              {otpform}
            </Box>
            <Box>
              <Button
                component="span"
                variant="contained"
                color="secondary"
                onClick={handleSubmit(handleValidate.bind(this, 'MobileNumber'))}
              >
                Validate
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <Box sx={{ paddingBottom: '40px' }}>
        <Button
          variant="contained"
          color="secondary"
          disabled={!isOtpValidMobile && !isOtpValidEmail}
          sx={{ marginRight: '10px', width: '105px', height: '48px' }}
        >
          submit
        </Button>
        <Button
          variant="outlined"
          disabled={!isOtpValidMobile && !isOtpValidEmail}
          sx={{
            backgroundColor: 'grey.main',
            color: 'black.textBlack',
            width: '105px',
            height: '48px',
          }}
        >
          Cancel
        </Button>
      </Box>
    </Container>
  );
}

export default Formverification;
