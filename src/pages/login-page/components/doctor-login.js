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
  getUniversitiesList,
} from '../../../store/actions/common-actions';
import { loginAction, validateCaptchaImage } from '../../../store/actions/login-action';
import { login, userLoggedInType } from '../../../store/reducers/common-reducers';
import { Button, TextField } from '../../../ui/core';
import MobileNumber from '../../../ui/core/mobile-number/mobile-number';
import successToast from '../../../ui/core/toaster';

export const DoctorLogin = ({ loginName = 'Doctor' }) => {
  const [captchaAnswer, setcaptachaAnswer] = useState();
  const { generateCaptcha } = useSelector((state) => state.loginReducer);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedLoginOption, setSelectedLoginOption] = useState('nmrId');
  const [otpFormEnabled, setOtpFormEnable] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    getValues,
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

  const handleLogin = () => {
    if (selectedLoginOption === 'nmrId') {
      verboseLog('Login Data -> ', getValues()?.nmrID);
      verboseLog('Login Data -> ', otpValue);
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
            };
            dispatch(loginAction(requestObj))
              .then(() => {
                // let req = { mobile: param.nmrID };
                // if (req) {
                dispatch(login());
                dispatch(userLoggedInType(loginName));
                dispatch(getRegistrationCouncilList());
                dispatch(getUniversitiesList());
                navigate(`/profile`);
                // }
              })
              .catch((error) => {
                successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
              });
          } else {
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
    } else if (selectedLoginOption === 'mobileNumber') {
      verboseLog('Login Data -> ', getValues()?.mobileNo);
      verboseLog('Login Data -> ', otpValue);
    } else {
      successToast('Wrong Login Attempt', 'login-error', 'error', 'top-center');
    }
  };

  return (
    <Box p={4} bgcolor="white.main" boxShadow="4">
      <Typography variant="h2" color="primary.dark" mb={5}>
        {loginName} Login
      </Typography>
      <Typography variant="body1" color="textPrimary.main">
        Login via
      </Typography>

      <Grid container xs={12} columnSpacing={1} mt={1}>
        <Grid item xs={12} sm={3.5}>
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
            <Typography variant="body1" color="textPrimary.main" textAlign={'left'} ml={1}>
              User ID
            </Typography>
          </Button>
        </Grid>
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
      </Grid>
      <Box my={4}>
        {selectedLoginOption === 'nmrId' ? (
          <>
            <TextField
              required
              disabled={otpFormEnabled}
              placeholder={'Please enter your NMR ID'}
              inputProps={{ maxLength: 12 }}
              name={'nmrID'}
              {...register('nmrID', {
                required: 'Please enter an NMR ID',
                pattern: {
                  value: /^\d{12}$/i,
                  message: 'Please enter an valid NMR ID',
                },
              })}
              sx={{
                '& .Mui-disabled': {
                  pointerEvents: 'auto !important',
                },
                width: '100%',
              }}
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
                      onClick={() => setOtpFormEnable(!otpFormEnabled)}
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
                  We just sent an OTP on your Mobile Number 7654364789
                </Typography>
                {otpform}
              </Box>
            )}
          </>
        ) : selectedLoginOption === 'userName' ? (
          <>
            <TextField
              required
              fullWidth
              label={'User ID'}
              placeholder={'Please enter your User ID'}
              // inputProps={{ maxLength: 12 }}
              name={'userID'}
              {...register('userID', {
                required: 'Please enter an User ID',
                pattern: {
                  //value: /^\d{12}$/i,
                  message: 'Please enter an valid User ID',
                },
              })}
            />
            <TextField
              required
              fullWidth
              label={'Password'}
              placeholder={'Please enter your Password'}
              type={'Password'}
              inputProps={{ maxLength: 12 }}
              name={'password'}
              {...register('password', {
                required: 'Please enter an Password',
                pattern: {
                  value: /^\d{12}$/i,
                  message: 'Please enter an valid Password',
                },
              })}
            />
          </>
        ) : selectedLoginOption === 'mobileNumber' ? (
          <>
            <MobileNumber
              showhint={false}
              required
              register={register}
              getValues={getValues}
              errors={errors}
              label={'Enter your Mobile Number'}
              showVerify
              verifyOnClick={() => setOtpFormEnable(true)}
            />
            {otpFormEnabled && (
              <Box mt={2}>
                <Typography variant="body1">
                  We just sent an OTP on your Mobile Number 7654364789
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
          onClick={handleLogin}
          disabled={!otpFormEnabled && selectedLoginOption !== 'userName'}
        >
          Login
        </Button>
        <Button variant="contained" color="grey" fullWidth sx={{ ml: 1 }}>
          Cancel
        </Button>
      </Box>
      <Box textAlign={'center'}>
        <Typography variant="body1">
          {`Don't have account?`}{' '}
          <Link color={theme.palette.secondary.main} sx={{ cursor: 'pointer' }}>
            Register Here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
