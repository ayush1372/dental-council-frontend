import { useEffect, useState } from 'react';

import RefreshIcon from '@mui/icons-material/Refresh';
import { Grid, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { generateCaptchaImage } from '../../store/actions/login-action';
import { TextField } from '../../ui/core';
import successToast from '../../ui/core/toaster';
import CircularLoader from '../circular-loader/circular-loader';

const CaptchaComponent = ({ captchaResult }) => {
  const { generateCaptcha, captchaEnabledFlag } = useSelector((state) => state.loginReducer);
  const [anwser, setAnwser] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { register, getValues, setValue } = useForm({
    mode: 'onChange',
    defaultValues: { anwser: anwser },
  });
  const reloadCaptcha = () => {
    setAnwser('');
    if (captchaEnabledFlag?.data) {
      dispatch(generateCaptchaImage()).catch((error) => {
        successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
      });
    }
  };

  useEffect(() => {
    setAnwser('');
  }, [generateCaptcha?.transaction_id]);

  const onFocusChange = (e) => {
    e.preventDefault();
    const userResponse = anwser;
    if (!userResponse) {
      setError('Enter captcha answer');
      return;
    } else {
      setError(null);
    }
    userResponse.length > 2 ? setError('Enter captcha answer') : setError('');
  };

  const handleChange = (event) => {
    const captchaValue = event.target.value.replace(/[^0-9]/g, '');
    setValue('anwser', captchaValue);
    setAnwser(captchaValue);
    captchaResult(captchaValue);
    captchaValue.length > 2 ? setError('Please enter valid captcha answer') : setError('');
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <Box>
        <Box>
          {captchaEnabledFlag?.isLoading ? (
            <Box alignItems={'center'}>
              <CircularLoader />
            </Box>
          ) : (
            <Grid container>
              <Grid
                border={1}
                borderRadius="5px"
                borderColor={theme.palette.grey.dark}
                item
                xs={5}
                alignItems="center"
                display="flex"
                justifyContent="center"
              >
                <img
                  src={`data:image/png;base64,${generateCaptcha?.image}`}
                  alt="captcha"
                  width="100"
                />
              </Grid>
              <Grid item xs={2} alignItems="center" display="flex" justifyContent="center">
                <RefreshIcon color="primary.dark" onClick={reloadCaptcha} cursor="pointer" />
              </Grid>
              <Grid item xs={5} alignItems="center" display="flex" justifyContent="center">
                <TextField
                  name="anwser"
                  placeholder="Enter answer"
                  defaultValue={getValues().anwser}
                  required
                  {...register('anwser', {
                    onChange: (event) => {
                      handleChange(event);
                    },
                    onBlur: (event) => {
                      onFocusChange(event);
                    },
                  })}
                />
              </Grid>
            </Grid>
          )}
        </Box>
        <Typography color="error.main">
          {error && error.length > 0 && <span>{error}</span>}
        </Typography>
      </Box>
    </>
  );
};

export default CaptchaComponent;
