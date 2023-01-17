import { useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Alert, Container, Divider, IconButton, InputAdornment, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { verboseLog } from '../../../config/debug';
import { encryptData } from '../../../helpers/functions/common-functions';
import OtpForm from '../../../shared/otp-form/otp-component';
import { sendAaadharOtp, validateOtpAadhaar } from '../../../store/actions/user-aadhaar-actions';
import { Button, TextField } from '../../../ui/core';
import AadhaarInputField from '../../../ui/core/aadhaar-input-field/aadhaar-input-field';
import UniqueUserNameForDoctorRegistration from './unique-username';

function FetchDoctorDetails() {
  const [showUniqueNameForDoctorReg, setUniqueNameForDoctorReg] = useState(false);
  const [showOtpEmail, setShowOtpEmail] = useState(false);
  const [showOtpMobile, setShowOtpMobile] = useState(false);
  const [showOtpAadhar, setshowOtpAadhar] = useState(false);

  const [isOtpValidEmail, setisOtpValidEmail] = useState(false);
  const [isOtpValidMobile, setisOtpValidMobile] = useState(false);
  const [isOtpValidAadhar, setisOtpValidAadhar] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [aadhaarState, setAadhaarState] = useState('');
  const dispatch = useDispatch();

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
      AadhaarNumber: '',
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
    if (isOtpValidEmail === true) {
      setShowOtpMobile(true);
      setisOtpValidMobile(false);
    }
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

  const onSubmit = () => {
    setUniqueNameForDoctorReg(true);
  };

  const handleUserAadhaarNumber = (dataValue) => {
    let encryptedUserAadhaarNumber = encryptData(
      dataValue.field_1 + dataValue.field_2 + dataValue.field_3,
      process.env.REACT_APP_PUBLIC_KEY
    );
    handleVerifyAadhar(encryptedUserAadhaarNumber);
  };

  const handleVerifyAadhar = (value) => {
    setAadhaarState(value);
    dispatch(sendAaadharOtp(value));
    setshowOtpAadhar(true);
    setisOtpValidMobile(false);
    setisOtpValidEmail(false);
  };

  const finalTransactionId = useSelector(
    (state) => state?.AadhaarTransactionId?.aadharData?.data?.DOAuthOTP?.uidtkn
  );

  const handleValidateAadhar = () => {
    let userOtp = encryptData(otpValue, process.env.REACT_APP_PUBLIC_KEY);
    setshowOtpAadhar(false);
    setisOtpValidAadhar(true);
    handleClear();

    if (otpValue.length === 6) {
      dispatch(validateOtpAadhaar(aadhaarState, finalTransactionId, userOtp));
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
      {showUniqueNameForDoctorReg ? (
        <UniqueUserNameForDoctorRegistration />
      ) : (
        <Container
          sx={{
            width: {
              xs: '100%',
              md: '712px',
            },
            p: {
              xs: 0,
              sm: '0 16px',
            },
          }}
        >
          <Box sx={{ width: '100%', height: '53px', marginBottom: '30px', marginTop: '32px ' }}>
            <Alert
              sx={{
                m: 2,
                marginLeft: '0px',
                borderRadius: '5px',
                width: {
                  xs: '100%',
                  md: '680px',
                },
                boxShadow: '1',
                color: 'inputSuccessTextColor.main',
                backgroundColor: 'inputSuccessBackgroundColor.main',
              }}
            >
              Record fetched successfully. Please verify your details to proceed further.
            </Alert>
          </Box>

          <Box p="30px 32px 0px 32px" width={{ xs: '100%', md: '679px' }} sx={{ boxShadow: '2' }}>
            <Box mb={4}>
              <Typography variant="h2" color="primary">
                Verify Registration Details
              </Typography>
            </Box>
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
                <Typography
                  variant="body3"
                  component="div"
                  paddingRight={{ xs: 0, sm: '169px' }}
                  color="grey.label"
                >
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
            {/* aadhaar field */}
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection={{ xs: 'column', sm: 'row' }}
            >
              <Box>
                <AadhaarInputField
                  defaultValue={getValues().AadhaarNumber}
                  name="AadhaarNumber"
                  {...register('AadhaarNumber', {})}
                  register={register}
                  getValues={getValues}
                  required={true}
                  errors={errors}
                />
              </Box>
              <Box p="35px 32px 0px 32px">
                {isOtpValidAadhar ? <CheckCircleIcon color="success" /> : ''}
              </Box>

              {!showOtpAadhar && !isOtpValidAadhar && (
                <Box mt={3}>
                  <Button
                    variant="contained"
                    color="secondary"
                    width="95px"
                    onClick={handleUserAadhaarNumber}
                  >
                    Verify
                  </Button>
                </Box>
              )}
            </Box>
            {showOtpAadhar && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: {
                    xs: 'column',
                    sm: 'row',
                  },
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
                    onClick={handleValidateAadhar}
                  >
                    Validate
                  </Button>
                </Box>
              </Box>
            )}

            <Divider sx={{ mb: 4, mt: 4 }} variant="fullWidth" />

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
                  sx={{ width: { xs: '100%', md: '536px' }, marginRight: '16px' }}
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
                      message: 'Enter Valid Email ID',
                    },
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ pr: 1 }}>
                        <IconButton aria-label="toggle password visibility" edge="end">
                          {isOtpValidEmail ? <CheckCircleIcon color="success" /> : ''}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box>
                  {!showOtpEmail && !isOtpValidEmail && (
                    <Button
                      variant="contained"
                      color="secondary"
                      width="95px"
                      onClick={handleVerifyEmail}
                    >
                      Verify
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
            {showOtpEmail && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: {
                    xs: 'column',
                    sm: 'row',
                  },
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
                    sx={{ width: '114px', height: '53px', marginTop: { sm: '47px' } }}
                    component="span"
                    variant="contained"
                    color="secondary"
                    onClick={handleValidateEmail}
                  >
                    Validate
                  </Button>
                </Box>
              </Box>
            )}
            <Divider sx={{ mb: 4, mt: 4 }} variant="fullWidth" />

            <Box sx={{ marginTop: '20px', paddingBottom: '48px' }}>
              <Typography variant="body3">
                Mobile Number
                <Typography component="span" sx={{ color: 'error.main' }}>
                  *
                </Typography>
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                <TextField
                  sx={{ width: { xs: '100%', sm: '536px' }, marginRight: '16px' }}
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
                      message: 'Enter Valid Mobile Number',
                    },
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ pr: 1 }}>
                        <IconButton aria-label="toggle password visibility" edge="end">
                          {isOtpValidMobile ? <CheckCircleIcon color="success" /> : ''}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box>
                  {!showOtpMobile && !isOtpValidMobile && (
                    <Button
                      variant="contained"
                      color="secondary"
                      width="95px"
                      onClick={handleVerifyMobile}
                    >
                      Verify
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
            {showOtpMobile && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: {
                    xs: 'column',
                    sm: 'row',
                  },
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
                    onClick={handleValidateMobile}
                  >
                    Validate
                  </Button>
                </Box>
              </Box>
            )}

            <Box sx={{ paddingBottom: '40px', marginTop: { xs: '10px', sm: 0 } }}>
              <Button
                variant="contained"
                color="secondary"
                disabled={!enableSubmit}
                sx={{ marginRight: '10px', width: '105px', height: '48px' }}
                onClick={handleSubmit(onSubmit)}
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
