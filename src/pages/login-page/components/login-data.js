import { useEffect, useState } from 'react';

import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MobileIcon from '../../../assets/images/mobile-icon.svg';
import ProfileIcon from '../../../assets/images/profile-icon.svg';
import { verboseLog } from '../../../config/debug';
import { encryptData, userGroupType, usersType } from '../../../helpers/functions/common-functions';
import CaptchaComponent from '../../../shared/captcha-component/captcha-component';
import OtpForm from '../../../shared/otp-form/otp-component';
import { collegeProfileData } from '../../../store/actions/college-actions';
import {
  getRegistrationCouncilList,
  sendNotificationOtp,
} from '../../../store/actions/common-actions';
import {
  generateCaptchaImage,
  loginAction,
  validateCaptchaImage,
} from '../../../store/actions/login-action';
import { getNBEProfileData } from '../../../store/actions/nbe-actions';
import { getNMCProfileData } from '../../../store/actions/nmc-actions';
import { getSMCProfileData } from '../../../store/actions/smc-actions';
import { login, userLoggedInType } from '../../../store/reducers/common-reducers';
import { Button, TextField } from '../../../ui/core';
import MobileNumber from '../../../ui/core/mobile-number/mobile-number';
import successToast from '../../../ui/core/toaster';
import { LoginPasswordRegexValidation } from '../../../utilities/common-validations';
export const Login = ({ loginName, handleForgotPassword, otpData, userTypeDetails }) => {
  const [captchaAnswer, setcaptachaAnswer] = useState();
  const { generateCaptcha } = useSelector((state) => state.loginReducer);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedLoginOption, setSelectedLoginOption] = useState('userName');
  const [transaction_id, setTransaction_id] = useState('');
  const [otpFormEnabled, setOtpFormEnable] = useState(false);
  const [otpSend, setOtpSend] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    getValues,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      userID: '',
      password: '',
      mobileNo: '',
    },
  });
  watch('mobileNo');
  const captchaResult = (num) => {
    setcaptachaAnswer(num);
  };

  const sendNotificationOTPHandler = () => {
    let OTPTypeID = 'sms';

    let sendOTPData = {
      contact: getValues().mobileNo,
      type: OTPTypeID,
    };
    otpData({ ...otpData, contact: getValues().mobileNo, type: OTPTypeID, page: 'LogInPage' });

    dispatch(sendNotificationOtp(sendOTPData))
      .then((response) => {
        if (response) {
          setTransaction_id(response?.data?.transaction_id);
          setOtpSend(true);
          setOtpFormEnable(true);
        }
      })
      .catch((error) => {
        successToast(error?.data?.response?.data?.message, 'auth-error', 'error', 'top-center');
      });
  };
  const { otpform, otpValue, handleClear } = OtpForm({
    sendOTP: sendNotificationOTPHandler,
    otpData: userTypeDetails,
  });

  useEffect(() => {
    setOtpSend(false);
    setOtpFormEnable(false);
  }, [loginName]);

  const getCommonData = (response) => {
    const userType = userGroupType(response?.data?.user_group_id);

    if (response?.data?.user_group_id === 4) {
      dispatch(collegeProfileData(response?.data?.college_id, response?.data?.profile_id));
    } else if (userType === 'State Medical Council') {
      dispatch(getSMCProfileData(response?.data?.profile_id));
    } else if (userType === 'National Medical Council') {
      dispatch(getNMCProfileData(response?.data?.profile_id));
    } else if (userType === 'NBE') {
      dispatch(getNBEProfileData(response?.data?.profile_id));
    }
  };

  const handleLogin = () => {
    let loginTypeID;
    switch (selectedLoginOption) {
      case 'nmrId':
        loginTypeID = 'nmr_id';
        break;
      case 'mobile':
        loginTypeID = 2;
        break;
      case 'userName':
        loginTypeID = 1;
        break;
      default:
        loginTypeID = 0;
        break;
    }

    if (selectedLoginOption === 'mobileNumber') {
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
              username: getValues()?.mobileNo,
              password: encryptData(otpValue, process.env.REACT_APP_PASS_SITE_KEY),
              user_type: usertypeId,
              login_type: loginTypeID,
              captcha_trans_id: generateCaptcha?.transaction_id,
              otp_trans_id: transaction_id,
            };
            dispatch(loginAction(requestObj))
              .then((resp) => {
                dispatch(login());
                dispatch(userLoggedInType(loginName));
                dispatch(getRegistrationCouncilList());
                navigate(`/profile`);
                getCommonData(resp);
              })
              .catch((error) => {
                setOtpFormEnable(false);
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
              .then((resp) => {
                dispatch(login());
                dispatch(userLoggedInType(loginName));
                dispatch(getRegistrationCouncilList());
                navigate(`/profile`);
                getCommonData(resp);
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
  useEffect(() => {
    setValue('userID', '');
    setValue('password', '');
  }, [loginName]);
  return (
    <Box p={4} bgcolor="white.main" boxShadow="4">
      <Typography variant="h2" color="primary.dark" mb={5}>
        {loginName} Login
      </Typography>
      <Typography variant="body1" color="textPrimary.main">
        Login via
      </Typography>

      <Grid container xs={12} columnSpacing={1} mt={1}>
        <Grid item xs={12} sm={6}>
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
            <Typography variant="body1" color="textPrimary.main" textAlign={'left'} ml={1}>
              Mobile Number
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
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
      </Grid>
      <Box my={4}>
        {selectedLoginOption === 'userName' ? (
          <>
            <TextField
              sx={{ mb: 2 }}
              required
              fullWidth
              label={'Username'}
              placeholder={'Please enter username'}
              name={'userID'}
              error={errors.userID?.message}
              {...register('userID', {
                required: 'Please enter username',
                pattern: {
                  value: /^[\s.]*([^\s.][\s.]*){0,100}$/,
                  message: 'Please enter a valid username',
                },
                minLength: {
                  value: 8,
                  message: 'Should contains 8 character',
                },
              })}
              inputProps={{
                maxLength: 100,
              }}
            />
            <TextField
              sx={{ mb: 2 }}
              required={true}
              fullWidth
              label={'Password'}
              variant="outlined"
              placeholder={'Please enter password'}
              type={'Password'}
              inputProps={{ maxLength: 100 }}
              name={'password'}
              error={errors.password?.message}
              defaultValue={getValues().password}
              {...register('password', LoginPasswordRegexValidation)}
            />
            <Typography display={'flex'} justifyContent="flex-end">
              <Button
                color="secondary"
                onClick={() => handleForgotPassword()}
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
              placeholder="Enter Mobile Number"
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
                  {' '}
                  Please enter an OTP sent on your Mobile Number{' '}
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
    </Box>
  );
};
