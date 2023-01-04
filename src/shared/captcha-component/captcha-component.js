import { useEffect, useState } from 'react';

import RefreshIcon from '@mui/icons-material/Refresh';
import { Grid, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';

import { verboseLog } from '../../config/debug';
import { generateCaptchaImage } from '../../store/actions/login-action';
import CircularLoader from '../circular-loader/circular-loader';

const CaptchaComponent = ({ captchaResult }) => {
  const { generateCaptcha, captchaEnabledFlag } = useSelector((state) => state.login);
  const [anwser, setAnwser] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const theme = useTheme();

  const reloadCaptcha = () => {
    setAnwser('');
    if (captchaEnabledFlag?.data) {
      dispatch(generateCaptchaImage())
        .then((response) => {
          verboseLog('response', response);
        })
        .catch((error) => {
          verboseLog('error occured', error);
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
      setError('Invalid code!!');
      return;
    } else {
      setError(null);
    }
  };

  // eslint-disable-next-line no-console
  console.log('captchaEnabledFlag', captchaEnabledFlag?.isLoading);

  return (
    <Box>
      <Box border={1} borderColor={theme.palette.grey.dark} width={'40%'}>
        {captchaEnabledFlag?.isLoading ? (
          <Box alignItems={'center'}>
            <CircularLoader />
          </Box>
        ) : (
          <>
            <Grid container>
              <Grid xs={9}>
                <img
                  src={`data:image/png;base64,${generateCaptcha?.image}`}
                  alt="captcha"
                  width="100"
                  height="60"
                />
              </Grid>
              <Grid xs={3}>
                <RefreshIcon color="primary.dark" onClick={reloadCaptcha} />
              </Grid>
            </Grid>
            <Grid container>
              <Grid md={5} xs={12}>
                <Typography fontSize={'small'} color="gray.dark">
                  Type answer-
                </Typography>
              </Grid>
              <Grid md={7} xs={12}>
                <input
                  // className={`${!error ? 'text-captcha' : 'text-captcha-danger'}`}
                  name="anwser"
                  type="text"
                  minLength="1"
                  maxLength="6"
                  size={10}
                  height={4}
                  // disabled={disabled}
                  placeholder="Code"
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
  );
};

export default CaptchaComponent;
