import { useEffect, useState } from 'react';

import RefreshIcon from '@mui/icons-material/Refresh';
import { Grid, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
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

  const handleChange = (e) => {
    setAnwser(e.target.value);
    captchaResult(e.target.value);
  };

  const onFocusChange = (e) => {
    e.preventDefault();
    const userResponse = anwser;
    if (!userResponse) {
      setError('Enter captcha answer');
      return;
    } else {
      setError(null);
    }
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <Box>
        <Box
          border={1}
          borderColor={theme.palette.grey.dark}
          width={{ xs: '100%', sm: '50%' }}
          pb="20px"
          borderRadius="5px"
        >
          {captchaEnabledFlag?.isLoading ? (
            <Box alignItems={'center'}>
              <CircularLoader />
            </Box>
          ) : (
            <>
              <Grid container alignItems={'center'} justifyContent="center">
                <Grid item xs="auto">
                  <img
                    src={`data:image/png;base64,${generateCaptcha?.image}`}
                    alt="captcha"
                    width="100"
                    //height="60"
                  />
                </Grid>
                <Grid item xs="auto">
                  <RefreshIcon color="primary.dark" onClick={reloadCaptcha} />
                </Grid>
              </Grid>
              <Grid container alignItems="center" justifyContent="center" gap={1} flexWrap="wrap">
                <Grid item xs="auto">
                  <Typography variant="body3" color="gray.dark">
                    Type answer -
                  </Typography>
                </Grid>
                <Grid item xs={6} flexGrow="1">
                  <TextField
                    // className={`${!error ? 'text-captcha' : 'text-captcha-danger'}`}
                    name="anwser"
                    placeholder="Enter Answer"
                    value={anwser}
                    onBlur={onFocusChange}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </>
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
