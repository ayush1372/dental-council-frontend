import { forwardRef } from 'react';

import { Checkbox as MuiCheckbox, FormControl, FormControlLabel, Typography } from '@mui/material';

const CheckboxField = ({ name, label, error, dataTestid, ...props }, ref) => {
  return (
    <FormControl sx={{ marginRight: '-10px' }}>
      <FormControlLabel
        control={<MuiCheckbox {...props} name={name} ref={ref} data-testid={dataTestid} />}
        label={label}
        sx={{ alignItems: 'flex-start' }}
      />
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </FormControl>
  );
};

export const Checkbox = forwardRef(CheckboxField);
