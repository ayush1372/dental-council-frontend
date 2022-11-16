import { useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Alert, Container, Divider, IconButton, InputAdornment, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';

import { verboseLog } from '../../../config/debug';
import OtpForm from '../../../shared/otp-form/otp-component';
import { Button, TextField } from '../../../ui/core';
import EditPersonalDetails from '../../user-profile/components/edit-personal-details/edit-personal-details';

function FetchDoctorDetails() {
  const [showEditScreen, setShowEditScreen] = useState(false);
  const [showOtpEmail, setShowOtpEmail] = useState(false);
  const [showOtpMobile, setShowOtpMobile] = useState(false);

  const [isOtpValidEmail, setisOtpValidEmail] = useState(false);
  const [isOtpValidMobile, setisOtpValidMobile] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);

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
  const handleVerifyEmail = () => {
    setShowOtpEmail(true);
  };
  const handleValidateEmail = () => {
    if (otpValue.length === 6) {
      setisOtpValidEmail(true);
      setShowOtpEmail(false);
      handleClear();
      if (isOtpValidMobile === true) {
        setEnableSubmit(true);
      }
    }
  };

  const handleVerifyMobile = () => {
    setShowOtpMobile(true);
    isOtpValidMobile(false);
  };
  const handleValidateMobile = () => {
    if (otpValue.length === 6) {
      setisOtpValidMobile(true);
      setShowOtpMobile(false);
      handleClear();

      if (isOtpValidEmail === true) {
        setEnableSubmit(true);
      }
    }
  };

  const otpResend = () => {
    verboseLog('OTP FORM - ', 'OTP Resent Succussfully');
  };
  const { otpform, otpValue, handleClear } = OtpForm({
    resendAction: otpResend,
    resendTime: 90,
  });
  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      e.target.value = isNaN(e.target.value)
        ? e.target.value.toString().slice(0, -1)
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
    }
  };

  return (
    <>
      {' '}
      {showEditScreen ? (
        <EditPersonalDetails />
      ) : (
        <Container sx={{ width: '712px' }}>
          <Box sx={{ width: '712px', height: '53px', marginBottom: '30px', marginTop: '32px ' }}>
            <Alert
              sx={{
                m: 2,
                marginLeft: '0px',
                borderRadius: '5px',
                width: '680px',
                boxShadow: '1',
                color: 'inputSuccessTextColor.main',
                backgroundColor: 'inputSuccessBackgroundColor.main',
              }}
            >
              Record fetched successfully.
            </Alert>
          </Box>
          <Box
            sx={{
              padding: '30px 32px 0px 32px',
              width: '679px',
              boxShadow: '2',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body3" component="div" color="grey.label">
                  Name
                </Typography>
                <Typography variant="subtitle2" component="div" color="primary">
                  Akshath Saxena
                </Typography>
              </Box>
              <Box>
                <Typography variant="body3" component="div" paddingRight="169px" color="grey.label">
                  Registration Number
                </Typography>
                <Typography variant="subtitle2" component="div" color="primary">
                  9876543210
                </Typography>
              </Box>
            </Box>
            <Box sx={{ paddingTop: '34px', paddingBottom: '20px' }}>
              <Typography variant="body3" component="div" color="grey.label">
                Council
              </Typography>
              <Typography variant="subtitle2" component="div" color="primary">
                West Bengal Medical Council
              </Typography>
            </Box>
            <Divider sx={{ marginBottom: '25px' }} variant="fullWidth" />

            <Box>
              <Box>
                <Typography variant="body3">
                  Enter your Email ID
                  <Typography component="span" sx={{ color: 'error.main' }}>
                    *
                  </Typography>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  sx={{ width: '536px', marginRight: '16px' }}
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
                {!showOtpEmail && !isOtpValidEmail && (
                  <Button
                    variant="contained"
                    color="secondary"
                    width="95px"
                    onClick={handleSubmit(handleVerifyEmail)}
                  >
                    Verify
                  </Button>
                )}
              </Box>
            </Box>
            {showOtpEmail && (
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                <Box>
                  <Typography variant="body1">
                    We just sent an OTP on your email address.
                  </Typography>
                  {otpform}
                </Box>
                <Box>
                  <Button
                    sx={{ width: '114px', height: '53px', marginTop: '47px' }}
                    component="span"
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit(handleValidateEmail)}
                  >
                    Validate
                  </Button>
                </Box>
              </Box>
            )}
            <Divider sx={{ mb: 4, mt: 4 }} variant="fullWidth" />

            <Box sx={{ marginTop: '20px', paddingBottom: '48px' }}>
              <Box>
                <Typography variant="body3">
                  Mobile Number
                  <Typography component="span" sx={{ color: 'error.main' }}>
                    *
                  </Typography>
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <TextField
                    sx={{ width: '536px', marginRight: '16px' }}
                    required
                    type="text"
                    onInput={(e) => handleInput(e)}
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
                  {!showOtpMobile && !isOtpValidMobile && (
                    <Button
                      variant="contained"
                      color="secondary"
                      width="95px"
                      onClick={handleSubmit(handleVerifyMobile)}
                    >
                      Verify
                    </Button>
                  )}
                </Box>
              </Box>
              {showOtpMobile && (
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  <Box>
                    <Typography variant="body1">
                      We just sent an OTP on your Mobile Number.
                    </Typography>
                    {otpform}
                  </Box>
                  <Box>
                    <Button
                      sx={{ width: '114px', height: '53px', marginTop: '47px' }}
                      component="span"
                      variant="contained"
                      color="secondary"
                      onClick={handleSubmit(handleValidateMobile)}
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
                disabled={!enableSubmit}
                sx={{ marginRight: '10px', width: '105px', height: '48px' }}
                onClick={() => setShowEditScreen(true)}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                disabled={!enableSubmit}
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
          </Box>
        </Container>
      )}
    </>
  );
}

export default FetchDoctorDetails;
