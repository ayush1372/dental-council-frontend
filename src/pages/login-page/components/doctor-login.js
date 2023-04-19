import { useState } from 'react';

import { Box, Grid, InputAdornment, Link, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MobileIcon from '../../../assets/images/mobile-icon.svg';
import ProfileIcon from '../../../assets/images/profile-icon.svg';
import { verboseLog } from '../../../config/debug';
import { encryptData, usersType } from '../../../helpers/functions/common-functions';
import CaptchaComponent from '../../../shared/captcha-component/captcha-component';
import OtpForm from '../../../shared/otp-form/otp-component';
import {
  getRegistrationCouncilList,
  sendNotificationOtp,
} from '../../../store/actions/common-actions';
// import { , verifyNotificationOtp } from '../../../store/actions/common-actions';
import {
  generateCaptchaImage,
  loginAction,
  validateCaptchaImage,
} from '../../../store/actions/login-action';
import { login, userLoggedInType } from '../../../store/reducers/common-reducers';
import { Button, TextField } from '../../../ui/core';
import MobileNumber from '../../../ui/core/mobile-number/mobile-number';
import successToast from '../../../ui/core/toaster';
import { PasswordRegexValidation } from '../../../utilities/common-validations';

export const DoctorLogin = ({ loginName = 'Doctor', handleNext, otpData }) => {
  const [captchaAnswer, setcaptachaAnswer] = useState();
  const { generateCaptcha } = useSelector((state) => state.loginReducer);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedLoginOption, setSelectedLoginOption] = useState('mobileNumber');
  const [transaction_id, setTransaction_id] = useState('');
  const [otpFormEnabled, setOtpFormEnable] = useState(false);
  const [maskedMobileNumber, setMaskedMobileNumber] = useState('');
  const [otpSend, setOtpSend] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nmrID: '',
      userID: '',
      password: '',
      mobileNo: '',
    },
  });

  const { otpform, otpValue, handleClear } = OtpForm({});
  const captchaResult = (num) => {
    setcaptachaAnswer(num);
  };
  const sendNotificationOTPHandler = (enableOTP, OTPType) => {
    setOtpFormEnable(enableOTP);
    let OTPTypeID;
    switch (OTPType) {
      case 'NMR':
        OTPTypeID = 'nmr_id';
        break;
      case 'Mobile':
        OTPTypeID = 'sms';
        break;
      default:
        OTPTypeID = 'sms';
        break;
    }
    let sendOTPData = {
      contact: selectedLoginOption === 'nmrId' ? getValues().nmrID : getValues().mobileNo,
      type: OTPTypeID,
    };

    dispatch(sendNotificationOtp(sendOTPData)).then((response) => {
      if (response) {
        setTransaction_id(response?.data?.transaction_id);
        setMaskedMobileNumber(response?.data?.sent_on.replace(/^.{6}/g, 'XXXXXX'));
        setOtpSend(true);
      }
    });
  };

  const handleLogin = () => {
    let loginTypeID;
    switch (selectedLoginOption) {
      case 'nmrId':
        loginTypeID = 3;
        break;
      case 'mobileNumber':
        loginTypeID = 2;
        break;
      case 'userName':
        loginTypeID = 1;
        break;
      default:
        loginTypeID = 0;
        break;
    }
    if (selectedLoginOption === 'nmrId' || selectedLoginOption === 'mobileNumber') {
      verboseLog('Login Data -> ', getValues()?.nmrID);
      verboseLog('Login Data -> ', otpValue);
      dispatch(
        validateCaptchaImage({
          transaction_id: generateCaptcha?.transaction_id,
          result: parseInt(captchaAnswer),
        })
      )
        .then((response) => {
          if (response?.data?.validity) {
            const usertypeId = usersType(loginName);

            const requestObj = {
              username:
                selectedLoginOption === 'nmrId' ? getValues()?.nmrID : getValues()?.mobileNo,
              password: encryptData(otpValue, process.env.REACT_APP_PASS_SITE_KEY),
              user_type: usertypeId,
              login_type: loginTypeID,
              captcha_trans_id: generateCaptcha?.transaction_id,
              otp_trans_id: transaction_id,
            };
            dispatch(loginAction(requestObj))
              .then(() => {
                dispatch(login());
                dispatch(userLoggedInType(loginName));
                dispatch(getRegistrationCouncilList());
                navigate(`/profile`);
              })
              .catch((error) => {
                dispatch(generateCaptchaImage()).catch((error) => {
                  successToast(
                    'ERROR: ' + error?.data?.message,
                    'auth-error',
                    'error',
                    'top-center'
                  );
                });
                successToast(
                  'ERROR: ' + error?.data?.response?.data?.message,
                  'auth-error',
                  'error',
                  'top-center'
                );
              });
          } else {
            dispatch(generateCaptchaImage()).catch((error) => {
              successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
            });
            successToast(
              'ERROR: Invalid captcha, please try with new captcha',
              'auth-error',
              'error',
              'top-center'
            );
          }
        })
        .catch((error) => {
          successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
        });
    } else if (selectedLoginOption === 'userName') {
      verboseLog('Login Data -> ', getValues()?.password);
      verboseLog('Login Data -> ', getValues()?.userID);
      dispatch(
        validateCaptchaImage({
          transaction_id: generateCaptcha?.transaction_id,
          result: parseInt(captchaAnswer),
        })
      )
        .then((response) => {
          if (response?.data?.validity) {
            const usertypeId = usersType(loginName);
            const requestObj = {
              username: getValues()?.userID,
              password: encryptData(getValues()?.password, process.env.REACT_APP_PASS_SITE_KEY),
              user_type: usertypeId,
              captcha_trans_id: generateCaptcha?.transaction_id,
              login_type: loginTypeID,
            };
            dispatch(loginAction(requestObj))
              .then(() => {
                dispatch(login());
                dispatch(userLoggedInType(loginName));
                dispatch(getRegistrationCouncilList());
                navigate(`/profile`);
              })
              .catch((error) => {
                dispatch(generateCaptchaImage()).catch((error) => {
                  successToast(
                    'ERROR: ' + error?.data?.message,
                    'auth-error',
                    'error',
                    'top-center'
                  );
                });
                successToast(
                  'ERROR: ' + error?.data?.response?.data?.message,
                  'auth-error',
                  'error',
                  'top-center'
                );
              });
          } else {
            dispatch(generateCaptchaImage()).catch((error) => {
              successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
            });
            successToast(
              'ERROR: Invalid captcha, please try with new captcha',
              'auth-error',
              'error',
              'top-center'
            );
          }
        })
        .catch((error) => {
          successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
        });
    } else {
      successToast('Wrong Login Attempt', 'login-error', 'error', 'top-center');
    }
  };
  const handleCancelClick = () => {
    navigate('/');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleUserForgetUserName = () => {
    otpData({ ...otpData, page: 'forgetUserName' });
    handleNext();
  };
  const handleUserForgotPassword = () => {
    otpData({ ...otpData, page: 'forgotPasswordPage' });
    handleNext();
  };
  return (
    <Box p={4} bgcolor="white.main" boxShadow="4">
      <Typography variant="h2" color="textPrimary.main" mb={5}>
        {loginName} Login
      </Typography>
      <Typography variant="body1" color="textPrimary.main">
        Login via
      </Typography>

      <Grid container xs={12} columnSpacing={1} mt={1}>
        <Grid item xs={12} sm={4.5}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<img src={MobileIcon} alt={'profile_icon'} />}
            onClick={() => {
              setSelectedLoginOption('mobileNumber');
              handleClear();
              setOtpFormEnable(false);
            }}
            sx={{
              border: `2px solid ${
                selectedLoginOption === 'mobileNumber'
                  ? theme.palette.secondary.main
                  : theme.palette.grey.main
              }`,
              '&:hover': {
                backgroundColor: 'transparent !important',
              },
            }}
          >
            <Typography variant="body1" color="textPrimary.main">
              Mobile Number
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={3.5}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<img src={ProfileIcon} alt={'profile_icon'} />}
            onClick={() => {
              setSelectedLoginOption('userName');
              handleClear();
              setOtpFormEnable(false);
            }}
            sx={{
              border: `2px solid ${
                selectedLoginOption === 'userName'
                  ? theme.palette.secondary.main
                  : theme.palette.grey.main
              }`,
              '&:hover': {
                backgroundColor: 'transparent !important',
              },
            }}
          >
            <Typography variant="body1" color="textPrimary.main" textAlign={'left'} ml={1}>
              Username
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<img src={ProfileIcon} alt={'profile_icon'} />}
            onClick={() => {
              setSelectedLoginOption('nmrId');
              handleClear();
              setOtpFormEnable(false);
            }}
            sx={{
              border: `2px solid ${
                selectedLoginOption === 'nmrId'
                  ? theme.palette.secondary.main
                  : theme.palette.grey.main
              }`,
              '&:hover': {
                backgroundColor: 'transparent !important',
              },
            }}
          >
            <Typography variant="body1" color="textPrimary.main" textAlign={'left'} ml={1}>
              NMR ID
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Box my={4}>
        {selectedLoginOption === 'nmrId' ? (
          <>
            <TextField
              required
              disabled={otpFormEnabled}
              label={'NMR ID'}
              placeholder={'Please enter NMR ID'}
              inputProps={{ maxLength: 12 }}
              name={'nmrID'}
              {...register('nmrID', {
                required: 'Please enter an NMR ID',
                pattern: {
                  value: /^\d{12}$/,
                  message: 'Please enter an valid NMR ID',
                },
              })}
              min={12}
              sx={{
                '& .Mui-disabled': {
                  pointerEvents: 'auto !important',
                },
                width: '100%',
              }}
              error={errors.nmrID?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start" sx={{ mr: 0 }}>
                    <Typography
                      variant="body1"
                      bgcolor={theme.palette.secondary.main}
                      sx={{
                        p: '16px 32px',
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        cursor: 'pointer',
                      }}
                      color={'white.main'}
                      onClick={() => sendNotificationOTPHandler(!otpFormEnabled, 'NMR')}
                    >
                      {otpFormEnabled ? 'Re-Enter' : 'Verify'}
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
            {otpFormEnabled && (
              <Box mt={2}>
                <Typography variant="body1">
                  Please enter the OTP sent on your Registered Mobile Number {maskedMobileNumber}{' '}
                  linked with your NMR ID.
                </Typography>
                {otpform}
              </Box>
            )}
          </>
        ) : selectedLoginOption === 'userName' ? (
          <>
            <TextField
              sx={{ mb: 2 }}
              required
              fullWidth
              label={'Username'}
              placeholder={'Please enter Username'}
              name={'userID'}
              error={errors.userID?.message}
              {...register('userID', {
                required: 'Please enter Username',
                pattern: {
                  message: 'Please enter a valid Username',
                },
                minLength: {
                  value: 8,
                  message: 'Should contains 8 character',
                },
              })}
            />
            <Typography
              display={'flex'}
              justifyContent="flex-end"
              color="#FFA500"
              onClick={handleUserForgetUserName}
              sx={{ cursor: 'pointer' }}
            >
              Forgot Username ?
            </Typography>
            <TextField
              sx={{ mb: 2 }}
              required
              fullWidth
              label={'Password'}
              placeholder={'Please enter Password'}
              type={'Password'}
              inputProps={{ maxLength: 12 }}
              name={'password'}
              {...register('password', {
                PasswordRegexValidation,
              })}
            />
            <Typography
              display={'flex'}
              justifyContent="flex-end"
              color="#FFA500"
              onClick={handleUserForgotPassword}
              sx={{ cursor: 'pointer' }}
            >
              Forgot Password ?
            </Typography>
          </>
        ) : selectedLoginOption === 'mobileNumber' ? (
          <>
            <MobileNumber
              showhint={false}
              required
              register={register}
              getValues={getValues}
              errors={errors}
              label={'Enter Mobile Number'}
              showVerify
              verifyOnClick={sendNotificationOTPHandler}
              otpSend={otpSend}
            />
            {otpFormEnabled && (
              <Box mt={2}>
                <Typography variant="body1">
                  Please enter the OTP sent on your Mobile Number{' '}
                  {getValues().mobileNo.replace(/^.{6}/g, 'XXXXXX')}.
                </Typography>
                {otpform}
              </Box>
            )}
          </>
        ) : (
          'Wrong Option'
        )}
      </Box>
      <CaptchaComponent captchaResult={captchaResult} />
      <Box my={4} width={'100%'} display={'flex'} justifyContent={'space-between'}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mr: 1 }}
          onClick={handleSubmit(handleLogin)}
          disabled={!otpFormEnabled && selectedLoginOption !== 'userName'}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="grey"
          fullWidth
          sx={{ ml: 1 }}
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
      </Box>
      <Box textAlign={'center'}>
        <Typography variant="body1">
          {`Don't have an account?`}{' '}
          <Link
            color={theme.palette.secondary.main}
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/register/doctor-registration')}
          >
            Register Here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
