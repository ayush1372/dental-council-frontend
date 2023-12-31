import { useState } from 'react';

import { Box, Grid, InputAdornment, Link, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MobileIcon from '../../../assets/images/mobile-icon.svg';
import ProfileIcon from '../../../assets/images/profile-icon.svg';
import { verboseLog } from '../../../config/debug';
import { ErrorMessages } from '../../../constants/error-messages';
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
import { LoginPasswordRegexValidation } from '../../../utilities/common-validations';

export const DoctorLogin = ({ loginName = 'Doctor', handleNext, otpData, userTypeDetails }) => {
  const [captchaAnswer, setcaptachaAnswer] = useState();
  const { generateCaptcha } = useSelector((state) => state.loginReducer);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedLoginOption, setSelectedLoginOption] = useState('userName');
  const [transaction_id, setTransaction_id] = useState('');
  const [otpFormEnabled, setOtpFormEnable] = useState(false);
  const [maskedMobileNumber, setMaskedMobileNumber] = useState('');
  const [otpSend, setOtpSend] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    getValues,
    watch,
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
  watch('mobileNo');

  const captchaResult = (num) => {
    setcaptachaAnswer(num);
  };
  const sendNotificationOTPHandler = (enableOTP, OTPType) => {
    OTPType !== undefined && setOtpFormEnable(enableOTP);
    let OTPTypeID;
    const userTypeId = usersType(loginName);
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
      user_type: userTypeId,
    };
    otpData({
      ...otpData,
      contact: selectedLoginOption === 'nmrId' ? getValues().nmrID : getValues().mobileNo,
      type: OTPTypeID,
      page: 'doctorLogInPage',
    });
    dispatch(sendNotificationOtp(sendOTPData))
      .then((response) => {
        response?.data?.message === 'Success'
          ? handleResponse(response)
          : successToast(response?.data?.message, 'auth-error', 'error', 'top-center');

        if (response) {
          setTransaction_id(response?.data?.transaction_id);
          setMaskedMobileNumber(response?.data?.sent_on.replace(/^.{6}/g, '******'));
          setOtpSend(true);
        }
      })
      .catch(() => {
        setOtpFormEnable(false);
        // successToast(error?.data?.response?.data?.message, 'auth-error', 'error', 'top-center');
      });
  };
  const { otpform, otpValue, handleClear } = OtpForm({
    sendOTP: sendNotificationOTPHandler,
    otpData: userTypeDetails,
  });

  const handleResponse = (response) => {
    setOtpFormEnable(true);
    setTransaction_id(response?.data?.transaction_id);
    setMaskedMobileNumber(response?.data?.sent_on.replace(/^.{6}/g, '******'));
    setOtpSend(true);
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
      ).then((response) => {
        if (response?.data?.validity) {
          const usertypeId = usersType(loginName);

          const requestObj = {
            username: selectedLoginOption === 'nmrId' ? getValues()?.nmrID : getValues()?.mobileNo,
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
            .catch(() => {
              dispatch(generateCaptchaImage());

              // .catch((error) => {
              //   successToast(
              //     'ERROR: ' + error?.data?.message,
              //     'auth-error',
              //     'error',
              //     'top-center'
              //   );
              // });
              // successToast(
              //   'ERROR: ' + error?.data?.response?.data?.message,
              //   'auth-error',
              //   'error',
              //   'top-center'
              // );
            });
        } else {
          dispatch(generateCaptchaImage());

          // .catch(() => {
          // successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
          // });
          successToast(ErrorMessages.invalidCaptchaMessage, 'auth-error', 'error', 'top-center');
        }
      });
      // .catch(() => {
      //   alert(3)
      // successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
      // });
    } else if (selectedLoginOption === 'userName') {
      verboseLog('Login Data -> ', getValues()?.password);
      verboseLog('Login Data -> ', getValues()?.userID);
      dispatch(
        validateCaptchaImage({
          transaction_id: generateCaptcha?.transaction_id,
          result: parseInt(captchaAnswer),
        })
      ).then((response) => {
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
            .catch(() => {
              dispatch(generateCaptchaImage());

              // .catch((error) => {
              //   successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
              // });
              // successToast(
              //   'ERROR: ' + error?.data?.response?.data?.message,
              //   'auth-error',
              //   'error',
              //   'top-center'
              // );
            });
        } else {
          dispatch(generateCaptchaImage());
          // .catch((error) => {
          //   successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
          // });
          successToast(ErrorMessages.invalidCaptchaMessage, 'auth-error', 'error', 'top-center');
        }
      });
      // .catch((error) => {
      //   successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
      // });
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
    <Box p={3} sx={{ bgcolor: 'white.main', boxShadow: '1', borderRadius: '8px' }}>
      <Typography variant="h2" color="textPrimary.main" mb={2}>
        {loginName} Login
      </Typography>
      {/* <Typography variant="body1" color="textPrimary.main">
        Login via
      </Typography> */}

      <Grid container xs={12} columnSpacing={1} mt={1}>
        <Grid item xs={12} sm={4}>
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
            <Typography variant="body1" textAlign={'center'} color="textPrimary.main">
              Mobile Number
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
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
            <Typography variant="body1" color="textPrimary.main" textAlign={'center'} ml={1}>
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
            <Typography variant="body1" color="textPrimary.main" textAlign={'center'} ml={1}>
              DCI ID
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Box mt={2} mb={1}>
        {selectedLoginOption === 'nmrId' ? (
          <>
            <TextField
              required
              disabled={otpFormEnabled}
              label={'DCI ID'}
              placeholder={'Enter DCI ID'}
              inputProps={{ maxLength: 12 }}
              name={'nmrID'}
              {...register('nmrID', {
                required: 'Please enter a valid DCI ID',
                pattern: {
                  value: /^\d{12}$/,
                  message: 'Please enter a valid DCI ID',
                },
              })}
              min={12}
              sx={{
                '& .Mui-disabled': {
                  pointerEvents: 'auto !important',
                },
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  paddingRight: '0px',
                },
              }}
              error={errors.nmrID?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ mr: 0, height: 'unset', maxHeight: 'unset' }}
                  >
                    <Typography
                      variant="body1"
                      bgcolor={theme.palette.secondary.main}
                      sx={{
                        p: '11px 24px',
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        cursor: 'pointer',
                      }}
                      color={'white.main'}
                      onClick={() => {
                        if (!otpFormEnabled) {
                          getValues()?.nmrID?.length === 12 &&
                            sendNotificationOTPHandler(!otpFormEnabled, 'NMR');
                        } else {
                          setOtpFormEnable(false);
                        }
                      }}
                    >
                      {otpFormEnabled ? 'Re-Enter' : 'Verify'}
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
            {otpFormEnabled && (
              <Box mt={1}>
                <Typography variant="body1">
                  OTP sent to registered mobile number ending with {maskedMobileNumber}
                </Typography>
                {otpform}
              </Box>
            )}
          </>
        ) : selectedLoginOption === 'userName' ? (
          <>
            <TextField
              sx={{ mb: 1 }}
              required
              fullWidth
              label={'Username'}
              placeholder={'Enter username'}
              name={'userID'}
              error={errors.userID?.message}
              {...register('userID', {
                required: 'Please enter a username',
                pattern: {
                  value: /^[\s.]*([^\s.][\s.]*){0,100}$/,
                  message: 'Please enter a valid username',
                },
                minLength: {
                  value: 2,
                  message: 'Please enter a valid username',
                },
              })}
              inputProps={{
                maxLength: 100,
              }}
            />
            <Typography display={'flex'} justifyContent="flex-end">
              <Button
                size="small"
                color="secondary"
                onClick={handleUserForgetUserName}
                sx={{ cursor: 'pointer', display: 'contents' }}
              >
                Forgot Username?
              </Button>
            </Typography>
            <TextField
              fullWidth
              label={'Password'}
              id="outlined-basic"
              variant="outlined"
              type="Password"
              name="password"
              required="true"
              placeholder={'Enter password'}
              error={errors.password?.message}
              inputProps={{
                maxLength: 100,
              }}
              defaultValue={getValues().password}
              {...register('password', LoginPasswordRegexValidation)}
            />
            <Typography display={'flex'} justifyContent="flex-end">
              <Button
                size="small"
                color="secondary"
                onClick={handleUserForgotPassword}
                sx={{ cursor: 'pointer', display: 'contents' }}
              >
                Forgot Password?
              </Button>
            </Typography>
          </>
        ) : selectedLoginOption === 'mobileNumber' ? (
          <>
            <MobileNumber
              showhint={false}
              placeholder="Enter mobile number"
              required
              register={register}
              getValues={getValues}
              errors={errors}
              label={'Mobile Number'}
              showVerify
              verifyOnClick={sendNotificationOTPHandler}
              otpSend={otpSend}
            />
            {otpFormEnabled && (
              <Box mt={2}>
                <Typography variant="body1">
                  Please enter the OTP sent on your mobile number{' '}
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
      <CaptchaComponent selectedLoginOption={selectedLoginOption} captchaResult={captchaResult} />
      <Box mt={3} mb={2} width={'100%'} display={'flex'} justifyContent={'space-between'}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mr: 1 }}
          onClick={handleSubmit(handleLogin)}
          disabled={
            selectedLoginOption === 'nmrId' || selectedLoginOption === 'mobileNumber'
              ? !otpFormEnabled || !captchaAnswer || otpValue.length < 6
              : errors.userID?.message ||
                errors.password?.message ||
                !captchaAnswer ||
                getValues()?.password?.length < 1 ||
                getValues()?.userID?.length < 1
          }
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
            Register here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
