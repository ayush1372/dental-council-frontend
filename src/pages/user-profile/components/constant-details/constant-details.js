// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';

import { Box, Dialog, Grid, Link, Typography, useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import IconVerified from '../../../../assets/images/ico-verified.svg';
import { sendNotificationOtp } from '../../../../store/actions/common-actions';
import { verifyEmail } from '../../../../store/actions/doctor-user-profile-actions';
import successToast from '../../../../ui/core/toaster';
import ConfirmOTP from '../../../login-page/components/confirm-otp';
const ConstantDetails = ({ validDetails, setValidDetails }) => {
  const [mobileNumberChange, setMobileNumberChange] = useState(false);
  const [showOTPPOPUp, setShowOTPPOPUp] = useState(false);
  const [emailChange, setEmailChange] = useState(false);
  const nmrIdData = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.nmr_id
  );
  const registration_number = useSelector(
    (state) =>
      state?.doctorUserProfileReducer?.registrationDetails?.registration_detail_to
        ?.registration_number
  );
  // const personGender = useSelector(
  //   (state) => state?.doctorUserProfileReducer?.personalDetails?.personal_details?.gender
  // );
  const emailId = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.personal_details?.email
  );
  const emailIdVerify = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.email_verified
  );
  const mobileNumber = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.personal_details?.mobile
  );
  const [userData, setData] = useState({ contact: '', type: '', page: '' });
  const dispatch = useDispatch();
  const theme = useTheme();
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      mobileNo: mobileNumber,
      email: emailId,
    },
  });

  const handleClose = () => {
    setShowOTPPOPUp(false);
  };

  const handleInput = (e) => {
    e.preventDefault();
    if (e?.target?.value?.length > 0) {
      e.target.value = isNaN(e.target.value)
        ? e.target.value.toString().slice(0, -1)
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
      if (e?.target?.value?.length !== 10) {
        setValidDetails({ ...validDetails, mobileNo: true });
      } else {
        setValidDetails({ ...validDetails, mobileNo: false });
      }
    }
  };

  function checkEmail(e) {
    if (e?.target?.value?.length > 0) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;

      if (re.test(e.target.value.trim())) {
        setValidDetails({ ...validDetails, email: false });
      } else {
        setValidDetails({ ...validDetails, email: true });
      }
    }
  }

  const onSubmit = (type) => {
    const { email, mobileNo } = getValues();
    if (validDetails.mobileNo === false && validDetails.email === false && email && mobileNo) {
      let otpValue = {};
      otpValue = {
        contact: type === 'sms' ? getValues().mobileNo : type === 'email' && getValues().email,
        type: type === 'sms' ? 'sms' : type === 'email' && 'email',
        page: 'doctorConstantDetailsPage',
        handleClose: handleClose,
        reSendOTP: onSubmit,
        setMobileNumberChange: setMobileNumberChange,
        setEmailChange: setEmailChange,
      };
      setData(otpValue);
      if (type === 'email') {
        let sendOTPData = {
          email: type === 'email' ? type === 'email' && getValues().email : '',
        };
        try {
          dispatch(verifyEmail(sendOTPData, personalDetails?.hp_profile_id)).then((response) => {
            response?.data?.message === 'Success' && setShowOTPPOPUp(true);
          });
        } catch (allFailMsg) {
          successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
        }
      } else {
        let sendOTPData = {
          contact: type === 'sms' ? getValues().mobileNo : '',
          type: type === 'sms' ? 'sms' : '',
        };
        try {
          dispatch(sendNotificationOtp(sendOTPData)).then((response) => {
            response?.data?.message === 'Success' && setShowOTPPOPUp(true);
          });
        } catch (allFailMsg) {
          successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
        }
      }
    }
  };

  return (
    <Box bgcolor="white.main" py={3} mb={2} boxShadow="1">
      <Grid container>
        <Grid
          borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
          item
          xs={12}
          sm={6}
          lg={3}
          xl={2}
          px={2}
          mb={{ xs: 1, lg: 0 }}
        >
          <Typography variant="body3" color="grey.label">
            IMR/Registration Number
          </Typography>
          <Typography variant="subtitle2" color="textPrimary.main">
            {registration_number ? registration_number : ''}
          </Typography>
        </Grid>
        {nmrIdData && (
          <Grid
            borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
            item
            xs={12}
            sm={6}
            lg={3}
            xl={2}
            px={2}
            mb={{ xs: 1, lg: 0 }}
          >
            <Typography variant="body3" color="grey.label">
              NMR ID
            </Typography>
            <Typography variant="subtitle2" color="textPrimary.main">
              {nmrIdData ? nmrIdData : ''}
            </Typography>{' '}
          </Grid>
        )}

        {/* <Grid
          borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
          item
          xs={12}
          sm={6}
          md={3}
          lg="auto"
          px={2}
          mb={{ xs: 1, lg: 0 }}
        >
          <Typography variant="body3" color="grey.label">
            Work Detail Verification Status
          </Typography>
          <Typography variant="subtitle2" color="textPrimary.main">
            Submitted
          </Typography>
        </Grid> */}
        {/* <Grid
          borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
          item
          xs={12}
          sm={6}
          md={3}
          lg={1}
          pl={2}
          mb={{ xs: 1, lg: 0 }}
        >
          <Typography variant="body3" color="grey.label">
            Gender
          </Typography>
          <Typography variant="subtitle2" color="textPrimary.main">
            {personGender ? personGender : ''}
          </Typography>
        </Grid> */}
        {/* <Grid
          borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
          item
          xs={12}
          sm={6}
          md={3}
          lg="auto"
          px={2}
          mb={{ xs: 1, lg: 0 }}
        >
          <Typography variant="body3" color="grey.label">
            Aadhaar
          </Typography>
          <Typography variant="subtitle2" color="textPrimary.main">
            <img width="13px" height="13px" src={IconVerified} alt="verified icon" />
          </Typography>
        </Grid> */}
        <Grid
          borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
          item
          xs={12}
          sm={6}
          lg={4}
          pl={2}
          pr={2}
          mb={{ xs: 1, lg: 0 }}
        >
          <Typography variant="body3" color="grey.label">
            Mobile Number
          </Typography>
          <Box display="flex" alignItems="center">
            {!mobileNumber || mobileNumberChange ? (
              <Box display={'flex'} flexDirection="column">
                <Paper display={'flex'} alignItems="center" boxShadow="0 1px 3px rgb(#7f7f819e))">
                  <InputBase
                    sx={{ p: '2px 4px' }}
                    name="mobileNo"
                    required={true}
                    placeholder="Enter your mobile number"
                    defaultValue={getValues().mobileNo}
                    {...register('mobileNo', {
                      required: 'Mobile number is required',
                      pattern: {
                        value: /^\d{10}$/i,
                        message: 'Please enter a valid 10-digit mobile number',
                      },
                    })}
                    onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                    onInput={(e) => handleInput(e)}
                    error={errors.mobileNo?.message}
                  />
                  <Link
                    color="primary"
                    sx={{ p: '10px', cursor: 'pointer' }}
                    onClick={() => {
                      handleSubmit(onSubmit('sms'));
                    }}
                  >
                    Get Verified
                  </Link>
                </Paper>

                {validDetails?.mobileNo && (
                  <Typography color="error" mt={1}>
                    {' '}
                    Please enter a valid 10-digit mobile number
                  </Typography>
                )}
              </Box>
            ) : (
              <>
                <Typography variant="subtitle2" color="textPrimary.main" width="auto" mr={0.5}>
                  {mobileNumber && mobileNumber}
                </Typography>
                <img width="13px" height="13px" src={IconVerified} alt="verified icon" />
                <Typography
                  component="span"
                  variant="subtitle2"
                  sx={{ cursor: 'pointer' }}
                  color="primary.main"
                  ml={0.5}
                  onClick={() => {
                    setMobileNumberChange(true);
                  }}
                >
                  Change
                </Typography>
              </>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} mb={{ xs: 1, lg: 0 }} pl={2}>
          <Typography component="div" variant="body3" color="grey.label">
            Email
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>

          <Box display="flex" alignItems="center">
            {!emailId || emailChange ? (
              <Box display={'flex'} flexDirection="column">
                <Paper display={'flex'} alignItems="center" sx={{ p: '2px 4px' }}>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Enter your email address"
                    name="email"
                    required={true}
                    defaultValue={getValues().email}
                    {...register('email', {
                      required: 'Email id is required',
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
                        message: 'Enter Valid Email Address',
                      },
                    })}
                    error={errors.email?.message}
                    onInput={(e) => checkEmail(e)}
                  />

                  <Link
                    color="primary"
                    cursor="pointer"
                    sx={{ p: '10px', cursor: 'pointer' }}
                    onClick={() => {
                      handleSubmit(onSubmit('email'));
                    }}
                  >
                    Get Verified
                  </Link>
                </Paper>
                {validDetails?.email && (
                  <Typography color="error" mt={1}>
                    {''}
                    Please enter a valid Email ID
                  </Typography>
                )}
              </Box>
            ) : (
              <>
                <Typography variant="subtitle2" color="textPrimary.main" width="auto" mr={0.5}>
                  {emailId ? emailId : ''}
                </Typography>
                {emailIdVerify ? (
                  <img width="13px" height="13px" src={IconVerified} alt="verified icon" />
                ) : (
                  ''
                )}
                <Typography
                  sx={{ cursor: 'pointer' }}
                  component="span"
                  variant="subtitle2"
                  color="primary.main"
                  ml={0.5}
                  onClick={() => {
                    emailIdVerify ? setEmailChange(true) : onSubmit('email');
                  }}
                >
                  {emailIdVerify ? 'Change' : 'Get Verified'}
                </Typography>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      <Dialog open={showOTPPOPUp} maxWidth={'600px'}>
        <ConfirmOTP otpData={userData} />
      </Dialog>
    </Box>
  );
};
export default ConstantDetails;
