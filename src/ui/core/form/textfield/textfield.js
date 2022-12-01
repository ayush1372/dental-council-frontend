import { forwardRef } from 'react';
import { useState } from 'react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  IconButton,
  InputAdornment,
  StyledEngineProvider,
  TextField as MuiTextField,
  Typography,
} from '@mui/material';
import CN from 'clsx';

import { SvgImageComponent } from '../../svg-icons';

import styles from './textfield.module.scss';

/**
 * Props structure
 *
 * variant: 'outlined' || 'filled' || 'standard'
 * fullWidth
 */

export const HelperText = ({ type, text }) => (
  <div
    className={CN(styles.helperTextMsg, {
      [styles.success]: type === 'success',
      [styles.messageBlue]: type === 'messageBlue',
    })}
  >
    <SvgImageComponent
      color={type}
      icon={
        type === 'success'
          ? 'checkCircleOutline'
          : type === 'error'
          ? 'error'
          : type === 'messageBlue'
          ? 'helpOutline'
          : undefined
      }
    />
    <Typography
      variant="body2"
      color={
        type === 'success'
          ? 'success'
          : type === 'error'
          ? 'error'
          : type === 'messageBlue'
          ? 'messageBlue'
          : undefined
      }
    >
      {text}
    </Typography>
  </div>
);

const InputField = (
  { success, helperMsg, error, addon, label, required, type, messageBlue, ...props },
  ref
) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const helperText =
    success || error || messageBlue ? (
      //TODO: Update validation message after form implementation
      <HelperText
        className={CN({
          [styles.success]: success === 'success',
          [styles.messageBlue]: messageBlue === 'messageBlue',
        })}
        type={error ? 'error' : success ? 'success' : messageBlue ? 'messageBlue' : undefined}
        text={helperMsg || error}
      />
    ) : null;
  return (
    <StyledEngineProvider injectFirst>
      {label && (
        <Box>
          <Typography
            variant="subtitle2"
            component={'span'}
            color="inputTextColor.main"
            fontWeight="500"
          >
            {label}
          </Typography>
          <Typography variant="body2" color="error">
            {required ? ' *' : ''}
          </Typography>
        </Box>
      )}

      <MuiTextField
        {...props}
        type={
          showPassword
            ? 'text'
            : type === 'Password'
            ? 'Password'
            : type === 'date'
            ? 'date'
            : 'text'
        }
        autoComplete={'off'}
        ref={ref}
        error={error ? true : false}
        helperText={helperText}
        InputProps={
          props.InputProps
            ? props.InputProps
            : {
                endAdornment: type === 'Password' && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
        }
      />
      {addon}
    </StyledEngineProvider>
  );
};

export const TextField = forwardRef(InputField);
