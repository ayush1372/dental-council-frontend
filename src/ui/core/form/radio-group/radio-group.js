import { forwardRef } from 'react';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
  Typography,
} from '@mui/material';

const RadioField = (
  {
    name,
    label,
    items,
    error,
    required,
    row,
    size = 'medium',
    inline,
    defaultValue,
    dataTestid,
    value,
    ...props
  },
  ref
) => {
  return (
    <FormControl component="fieldset">
      {label && (
        <Box>
          <Typography variant="subtitle2" component={'span'} color="primary">
            {label}
          </Typography>
          <Typography variant="body2" color="error">
            {required ? ' *' : ''}
          </Typography>
        </Box>
      )}
      <MuiRadioGroup
        row={row}
        name={name}
        defaultValue={defaultValue}
        sx={{ display: inline ? '' : 'block' }}
        value={value}
      >
        {items.map((o) => (
          <FormControlLabel
            {...props}
            ref={ref}
            value={o.value}
            key={o.label}
            control={<Radio data-testid={dataTestid} size={size} />}
            label={o.label}
          />
        ))}
      </MuiRadioGroup>
      {error && (
        <Typography variant="body2" color="error">
          <ErrorOutlineIcon
            color={'error'}
            icon={'helpOutline'}
            fontSize="small"
            sx={{ height: '16px' }}
          />
          {error}
        </Typography>
      )}
    </FormControl>
  );
};

export const RadioGroup = forwardRef(RadioField);
