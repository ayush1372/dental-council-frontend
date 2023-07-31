import { forwardRef } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Checkbox as MuiCheckbox, FormControl, FormControlLabel, Typography } from '@mui/material';

const CheckboxField = ({ name, label, error, dataTestid, ...props }, ref) => {
  return (
    <FormControl>
      <FormControlLabel
        control={<MuiCheckbox {...props} name={name} ref={ref} data-testid={dataTestid} />}
        label={label}
        sx={{
          alignItems: 'flex-start',
          ml: 0,
          '.MuiButtonBase-root': {
            ml: 0,
          },
        }}
      />
      {error && (
        <Typography
          component={'div'}
          display={'flex'}
          alignItems={'center'}
          variant="body2"
          color="error"
        >
          <InfoOutlinedIcon sx={{ fontSize: '14px !important', mr: 0.5 }} />
          {error}
        </Typography>
      )}
    </FormControl>
  );
};

export const Checkbox = forwardRef(CheckboxField);
