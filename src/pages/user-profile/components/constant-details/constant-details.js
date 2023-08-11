import { useEffect, useState } from 'react';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { Box, Dialog, Grid, Link, Tooltip, Typography, useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import IconVerified from '../../../../assets/images/ico-verified.svg';
import { sendNotificationOtp } from '../../../../store/actions/common-actions';
import {
  getPersonalDetailsData,
  verifyEmail,
} from '../../../../store/actions/doctor-user-profile-actions';
import { getEnteredEmailValue } from '../../../../store/reducers/common-reducers';
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
  const { loginData } = useSelector((state) => state?.loginReducer);
  const [userData, setData] = useState({ contact: '', type: '', page: '' });
  const dispatch = useDispatch();
  const theme = useTheme();
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const [verifyEmailID, setVerifyEmailID] = useState(false);
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
        /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))/gm;
      if (re.test(e.target.value.trim())) {
        setValidDetails({ ...validDetails, email: false });
      } else {
        setValidDetails({ ...validDetails, email: true });
      }
    }
  }

  const onSubmit = (type) => {
    const { email, mobileNo } = getValues();
    dispatch(getEnteredEmailValue(getValues()));
    if (type === 'sms' && mobileNo && validDetails.mobileNo === false) {
      let otpValue = {};
      otpValue = {
        contact: getValues().mobileNo,
        type: 'sms',
        page: 'doctorConstantDetailsPage',
        handleClose: handleClose,
        reSendOTP: onSubmit,
        setMobileNumberChange: setMobileNumberChange,
      };
      setData(otpValue);
      let sendOTPData = {
        contact: type === 'sms' ? getValues().mobileNo : '',
        type: type === 'sms' ? 'sms' : '',
        user_type: loginData?.data?.user_type,
        is_registration: true,
      };
      dispatch(sendNotificationOtp(sendOTPData)).then((response) => {
        response?.data?.message === 'Success'
          ? setShowOTPPOPUp(true)
          : successToast(response?.data?.message, 'auth-error', 'error', 'top-center');
      });
    }

    if (type === 'email' && email && validDetails.email === false) {
      let otpValue = {};
      otpValue = {
        contact: getValues().email,
        type: 'email',
        page: 'doctorConstantDetailsPage',
        handleClose: handleClose,
        reSendOTP: onSubmit,
        setEmailChange: setEmailChange,
      };
      setData(otpValue);
      let sendOTPData = {
        email: type === 'email' ? type === 'email' && getValues().email : '',
      };
      dispatch(verifyEmail(sendOTPData, personalDetails?.hp_profile_id)).then((response) => {
        if (response?.data?.message === 'Success') {
          setShowOTPPOPUp(true);
          setVerifyEmailID(true);
        } else {
          successToast(response?.data?.message, 'auth-error', 'error', 'top-center');
        }
      });
    }
  };

  useEffect(() => {
    let clearTimer = false;
    if (!verifyEmailID) return;
    const timer = setInterval(() => {
      // try {
      if (clearTimer) {
        clearInterval(timer);
        setShowOTPPOPUp(false);
        setVerifyEmailID(false);
        setEmailChange(false);
        // for future changes.
        return;
      }
      dispatch(getPersonalDetailsData(personalDetails?.hp_profile_id)).then((response) => {
        if (response?.data?.email_verified) {
          clearTimer = true;
        }
      });
      // } catch (allFailMsg) {
      //   successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
      // }
    }, 6000);
    return () => {
      clearInterval(timer);
      setShowOTPPOPUp(false);
    };
  }, [verifyEmailID]);

  return (
    <Box bgcolor="white.main" py={2} mb={2} boxShadow="1">
      <Grid container>
        <Grid
          borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
          item
          xs={12}
          sm={6}
          lg={3}
          xl={3}
          px={2}
          mb={{ xs: 1, lg: 0 }}
        >
          <Typography variant="body3" color="grey.label">
            IMR/Registration Numbers
          </Typography>
          <Typography variant="subtitle2" color="textPrimary.main">
            {registration_number ? registration_number : ''}
          </Typography>
        </Grid>

        <Grid
          borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
          item
          xs={12}
          sm={6}
          lg={2}
          xl={2}
          px={2}
          mb={{ xs: 1, lg: 0 }}
        >
          <Box display={'flex'} alignItems={'center'}>
            <Typography variant="body3" color="grey.label" width={'auto'}>
              NMR ID
            </Typography>
            {!nmrIdData ? (
              <Tooltip
                title={'NMR ID will be displayed here once your application is approved by NMC'}
              >
                <InfoOutlinedIcon color="primary" sx={{ width: '14px', marginLeft: '8px' }} />
              </Tooltip>
            ) : (
              ''
            )}
          </Box>
          <Typography variant="subtitle2" color="textPrimary.main">
            {nmrIdData ? nmrIdData : '-'}
          </Typography>{' '}
        </Grid>

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
          lg={3}
          xl={3}
          px={2}
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
                      required: 'Please enter the mobile number',
                      pattern: {
                        value: /^\d{10}$/i,
                        message: 'Please enter a valid 10 digit mobile number',
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
                    Verify
                  </Link>
                </Paper>

                {validDetails?.mobileNo && (
                  <Typography color="error" mt={1} variant="body2">
                    {' '}
                    Please enter a valid 10 digit mobile number
                  </Typography>
                )}
              </Box>
            ) : (
              <>
                <Typography variant="subtitle2" color="textPrimary.main" width="auto" mr={0.5}>
                  {mobileNumber && mobileNumber}
                </Typography>
                <Box display={'flex'}>
                  <img width="16px" height="16px" src={IconVerified} alt="verified icon" />
                  {/* <Typography variant="body2" color="primary.main" ml={0.5}>
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setMobileNumberChange(true);
                      }}
                    >
                      Change
                    </span>
                  </Typography> */}
                  <EditOutlinedIcon
                    color={'primary'}
                    fontSize={'inherit'}
                    sx={{ ml: 0.5, cursor: 'pointer' }}
                    onClick={() => {
                      setMobileNumberChange(true);
                    }}
                  />
                </Box>
              </>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} lg={2} xl={4} px={2} mb={{ xs: 1, lg: 0 }}>
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
                    required={true}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Email"
                    name="email"
                    defaultValue={getValues().email}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
                        message: 'Please enter a valid email',
                      },
                    })}
                    error={errors.email?.message}
                    onInput={(e) => checkEmail(e)}
                  />

                  <Link
                    color="primary"
                    sx={{ p: '10px', cursor: 'pointer' }}
                    onClick={() => {
                      handleSubmit(onSubmit('email'));
                    }}
                  >
                    Verify
                  </Link>
                </Paper>
                {validDetails?.email && (
                  <Typography color="error" mt={1} variant="body2">
                    {''}
                    Please enter a valid email
                  </Typography>
                )}
              </Box>
            ) : (
              <>
                <Typography variant="subtitle2" color="textPrimary.main" width="auto" mr={0.5}>
                  {emailId ? emailId : ''}
                </Typography>
                <Box display={'flex'}>
                  {emailIdVerify ? (
                    <img width="16px" height="16px" src={IconVerified} alt="verified icon" />
                  ) : (
                    ' '
                  )}
                  <Box display={'flex'}>
                    <Tooltip title="Edit email">
                      <EditOutlinedIcon
                        color={'primary'}
                        fontSize={'inherit'}
                        sx={{ mr: 0.5, cursor: 'pointer' }}
                        onClick={() => {
                          setEmailChange(true);
                        }}
                      />
                    </Tooltip>
                    {!emailIdVerify ? (
                      <Tooltip title="Verify email">
                        <MarkEmailReadIcon
                          color={'primary'}
                          fontSize={'inherit'}
                          sx={{ mr: 0.5, cursor: 'pointer' }}
                          onClick={() => {
                            handleSubmit(onSubmit('email'));
                          }}
                        />
                      </Tooltip>
                    ) : (
                      ''
                    )}
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      <Dialog
        maxWidth="sm"
        scroll="body"
        open={showOTPPOPUp}
        PaperProps={{ sx: { borderRadius: '10px' } }}
      >
        <ConfirmOTP otpData={userData} />
      </Dialog>
    </Box>
  );
};
export default ConstantDetails;
