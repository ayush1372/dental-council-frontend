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
import {
  getCollegeAdminProfileData,
  getCollegeDeanProfileData,
  getCollegeRegistrarProfileData,
} from '../../../store/actions/college-actions';
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
import { PasswordRegexValidation } from '../../../utilities/common-validations';

export const Login = ({ loginName, handleForgotPassword }) => {
  const [captchaAnswer, setcaptachaAnswer] = useState();
  const { generateCaptcha } = useSelector((state) => state.loginReducer);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedLoginOption, setSelectedLoginOption] = useState('mobileNumber');
  const [transaction_id, setTransaction_id] = useState('');
  const [otpFormEnabled, setOtpFormEnable] = useState(false);
  const [otpSend, setOtpSend] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    getValues,
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

  const { otpform, otpValue, handleClear } = OtpForm({});
  const captchaResult = (num) => {
    setcaptachaAnswer(num);
  };

  const sendNotificationOTPHandler = () => {
    setOtpFormEnable(true);
    let OTPTypeID = 'sms';

    let sendOTPData = {
      contact: getValues().mobileNo,
      type: OTPTypeID,
    };

    dispatch(sendNotificationOtp(sendOTPData)).then((response) => {
      if (response) {
        setTransaction_id(response?.data?.transaction_id);
        setOtpSend(true);
      }
    });
  };

  const getCommonData = (response) => {
    const userType = userGroupType(response?.data?.user_group_id);

    if (userType === 'College Dean') {
      dispatch(
        getCollegeDeanProfileData(response?.data?.parent_profile_id, response?.data?.profile_id)
      );
    } else if (userType === 'College Registrar') {
      dispatch(
        getCollegeRegistrarProfileData(
          response?.data?.parent_profile_id,
          response?.data?.profile_id
        )
      );
    } else if (userType === 'College Admin') {
      dispatch(getCollegeAdminProfileData(response?.data?.profile_id));
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
            <Typography variant="body1" color="textPrimary.main">
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
              placeholder={'Please Enter Username'}
              name={'userID'}
              error={errors.userID?.message}
              {...register('userID', {
                required: 'Please Enter Username',
                pattern: {
                  message: 'Please Enter a Valid Username',
                },
                minLength: {
                  value: 8,
                  message: 'Should contains 8 character',
                },
              })}
            />
            <TextField
              sx={{ mb: 2 }}
              required
              fullWidth
              label={'Password'}
              placeholder={'Please Enter Password'}
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
              onClick={() => handleForgotPassword()}
              sx={{
                cursor: 'pointer',
              }}
            >
              Forgot Password?
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
    </Box>
  );
};
