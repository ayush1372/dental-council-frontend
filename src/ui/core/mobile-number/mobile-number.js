import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, IconButton, InputAdornment, StyledEngineProvider, Typography } from '@mui/material';

import { Button } from '../button/button';
import { TextField } from '../form/textfield/textfield';

import styles from './mobile-number.module.scss';

export function MobileNumber(props) {
  const {
    register,
    getValues,
    errors,
    showVerify,
    showCircleCheckIcon = true,
    verifyOnClick,
    disabled,
    label,
    showhint = true,
    required,
  } = props;
  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      e.target.value = isNaN(e.target.value)
        ? e.target.value.toString().slice(0, -1)
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
    }
  };
  return (
    <StyledEngineProvider injectFirst>
      <Box data-testid="mobile-number">
        <Box>
          <Typography variant="subtitle2" component={'span'}>
            {label}
          </Typography>
          <Typography variant="body2" color="error">
            {required ? ' *' : ''}
          </Typography>
        </Box>
        <Box
          width="100%"
          className={styles.mobileField}
          display="flex"
          gap={{ xs: 1, sm: 2 }}
          flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
        >
          <TextField
            fullWidth
            id="outlined-adornment-password"
            type={'number'}
            name={'mobileNo'}
            disabled={disabled}
            defaultValue={getValues().mobileNo}
            sx={{
              ...(showVerify === false && {
                width: '100%',
              }),
              '& .MuiInputBase-root.MuiOutlinedInput-root': {
                paddingLeft: 0,
              },
            }}
            onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
            {...register('mobileNo', {
              required: 'Mobile Number is required',
              pattern: {
                value: /^\d{10}$/i,
                message: 'Please enter a valid 10 digit mobile no',
              },
            })}
            onInput={(e) => handleInput(e)}
            error={errors.mobileNo?.message}
            InputProps={{
              paddingLeft: '0',
              paddingRight: '0',
              startAdornment: (
                <InputAdornment
                  sx={{ backgroundColor: 'grey.main' }}
                  position="start"
                  className={styles.countryCode}
                >
                  +91
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    sx={{
                      marginRight: 0,
                    }}
                  >
                    {showCircleCheckIcon &&
                      (getValues()?.mobileNo?.length === 10 ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <CheckCircleIcon />
                      ))}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {showVerify && (
            <Button variant="contained" color="primary" onClick={verifyOnClick}>
              GetOTP
            </Button>
          )}
          {showhint && (
            <Typography variant="caption" color="primary" component="div">
              <InfoOutlinedIcon
                sx={{ fontSize: '15px', verticalAlign: 'middle', marginRight: '5px' }}
              />
              Enter Mobile Number linked with your Aadhaar.
            </Typography>
          )}
        </Box>
      </Box>
    </StyledEngineProvider>
  );
}

export default MobileNumber;
