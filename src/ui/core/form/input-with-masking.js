import { useState } from 'react';

import { IconButton, InputAdornment, TextField } from '@material-ui/core';
// import Visibility from '@material-ui/icons/visibility';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export const InputwithMasking = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const { name, label, value, error = null, placeholder, required, onChange } = props;
  return (
    <TextField
      style={{ backgroundColor: '#fff' }}
      variant="outlined"
      label={label}
      name={name}
      type={showPassword ? 'text' : 'password'}
      required={required}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      autoComplete="none"
      {...(error && { error: true, helperText: error })}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
