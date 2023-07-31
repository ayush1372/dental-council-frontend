import { forwardRef } from 'react';

import { Checkbox as MuiCheckbox, FormControl, FormControlLabel, Typography } from '@mui/material';
import CN from 'clsx';

import { SvgImageComponent } from '../../svg-icons';

import styles from './check-box.module.scss';

const CheckboxField = ({ name, label, error, dataTestid, ...props }, ref) => {
  return (
    <FormControl>
      <FormControlLabel
        control={<MuiCheckbox {...props} name={name} ref={ref} data-testid={dataTestid} />}
        label={label}
        sx={{ alignItems: 'flex-start' }}
      />
      {error && (
        <div
          className={CN(styles.helperTextMsg, {
            [styles.error]: 'error',
          })}
        >
          <Typography
            style={{ display: 'flex', alignItems: 'center' }}
            variant="body2"
            color="error"
          >
            <SvgImageComponent color={'error'} icon={'error'} />
            {error}
          </Typography>
        </div>
      )}
    </FormControl>
  );
};

export const Checkbox = forwardRef(CheckboxField);
