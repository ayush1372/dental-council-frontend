import { useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Alert, Container, Divider, IconButton, InputAdornment, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import OtpForm from '../../../shared/otp-form/otp-component';
import SuccessPopup from '../../../shared/reactivate-licence-popup/success-popup';
import {
  checkHpidExists,
  generateMobileOtp,
  getHprIdSuggestions,
  sendResetPasswordLink,
  verifyMobileOtp,
} from '../../../store/actions/doctor-registration-actions';
import { sendAaadharOtp, validateOtpAadhaar } from '../../../store/actions/user-aadhaar-actions';
import { Button, TextField } from '../../../ui/core';
import AadhaarInputField from '../../../ui/core/aadhaar-input-field/aadhaar-input-field';
import CreateHprId from './unique-username';
function FetchDoctorDetails() {
  const [showCreateHprIdPage, setShowCreateHprIdPage] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showOtpMobile, setShowOtpMobile] = useState(false);
  const [showOtpAadhar, setshowOtpAadhar] = useState(false);

  const [isOtpValidEmail, setisOtpValidEmail] = useState(false);
  const [isOtpValidMobile, setisOtpValidMobile] = useState(false);
  const [isOtpValidAadhar, setisOtpValidAadhar] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const dispatch = useDispatch();
  const userEmail = useSelector(
    (state) => state?.doctorRegistration?.getSmcRegistrationDetails?.data?.email_id
  );

  const otptype = useSelector((state) => state?.AadhaarTransactionId?.typeOfOtpDetailsData);

  const registrationNumber = useSelector(
    (state) => state?.doctorRegistration?.getSmcRegistrationDetails?.data?.registration_number
  );
  const aadhaarTxnId = useSelector((state) => state?.AadhaarTransactionId?.aadharData?.data?.txnId);
  const mobileTxnId = useSelector(
    (state) => state?.doctorRegistration?.getMobileOtpDetails?.data?.txnId
  );

  const councilName = useSelector(
    (state) => state?.doctorRegistration?.getSmcRegistrationDetails?.data?.council_name
  );
  const hpName = useSelector(
    (state) => state?.doctorRegistration?.getSmcRegistrationDetails?.data?.hp_name
  );

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      MobileNumber: '',
      AadhaarNumber: '',
      field_1: '',
      field_2: '',
      field_3: '',
    },
  });
  const handleUserAadhaarNumber = () => {
    let aadharDataFields = getValues().field_1 + getValues().field_2 + getValues().field_3;
    handleVerifyAadhar(aadharDataFields);
  };
  const handleVerifyAadhar = (value) => {
    dispatch(sendAaadharOtp(value)).then(() => {
      setshowOtpAadhar(true);
      setisOtpValidMobile(false);
      setisOtpValidEmail(false);
    });
  };
  const handleValidateAadhar = () => {
    setisOtpValidAadhar(true);
    setshowOtpAadhar(false);
    handleClear();
    if (otpValue.length === 6) {
      dispatch(
        validateOtpAadhaar({
          txnId: aadhaarTxnId,
          otp: otpValue,
        })
      );
    }
  };

  const handleVerifyMobile = () => {
    let data = {
      mobile: getValues().MobileNumber,
      txnId: aadhaarTxnId,
    };
    dispatch(generateMobileOtp(data)).then(() => {
      setShowOtpMobile(true);
      setisOtpValidMobile(false);
    });
  };

  const handleValidateMobile = () => {
    let data = {
      txnId: mobileTxnId,
      otp: otpValue,
    };
    if (otpValue.length === 6) {
      dispatch(verifyMobileOtp(data));
      setisOtpValidMobile(true);
      setShowOtpMobile(false);
      handleClear();
      if (isOtpValidEmail === true) {
        setEnableSubmit(true);
      }
    }
  };

  const otpResend = () => {
    if (otptype === 'aadhaar') {
      let aadharDataFields = getValues().field_1 + getValues().field_2 + getValues().field_3;

      dispatch(sendAaadharOtp(aadharDataFields));
    } else {
      let data = {
        mobile: getValues().MobileNumber,
        txnId: aadhaarTxnId,
      };
      dispatch(generateMobileOtp(data));
    }
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
  const onSubmit = () => {
    dispatch(
      checkHpidExists({
        txnId: aadhaarTxnId,
      })
    ).then((response) => {
      if (response?.data?.hprId === undefined || response?.data?.hprId === null) {
        setShowCreateHprIdPage(true);
        dispatch(
          getHprIdSuggestions({
            txnId: aadhaarTxnId,
          })
        );
      } else {
        let data = {
          email: userEmail,
          mobile: getValues().MobileNumber,
          username: response?.data?.hprId,
        };
        dispatch(sendResetPasswordLink(data)).then(() => {
          setShowSuccess(true);
        });
      }
    });
  };

  return (
    <>
      <ToastContainer></ToastContainer>

      {showCreateHprIdPage ? (
        <CreateHprId />
      ) : (
        <>
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
                    {hpName ? hpName : ''}
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
                    {registrationNumber ? registrationNumber : ''}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ paddingTop: '34px', paddingBottom: '20px' }}>
                <Typography variant="body3" component="div" color="grey.label">
                  Council
                </Typography>
                <Typography variant="subtitle2" component="div" color="primary">
                  {councilName ? councilName : ''}
                </Typography>
              </Box>
              <Divider sx={{ marginBottom: '25px' }} variant="fullWidth" />
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
          {showSuccess && <SuccessPopup />}
        </>
      )}
    </>
  );
}

export default FetchDoctorDetails;
