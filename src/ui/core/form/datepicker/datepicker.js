import { forwardRef } from 'react';

import { StyledEngineProvider, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CN from 'clsx';

import { SvgImageComponent } from '../../svg-icons';

import styles from './datepicker.module.scss';

const InputField = ({ success, error, onChangeDate, messageBlue, ...props }) => {
  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={(AdapterDayjs, AdapterDateFns)}>
        <MuiDatePicker
          sx={{
            width: '100%',
            pr: 2,
          }}
          id={props?.id}
          data-testid={props?.dataTestId}
          minDate={props?.minDate || ''}
          onChange={(newDateValue) => {
            onChangeDate(newDateValue, props?.id);
          }}
          format="dd/MM/yyyy"
          slotProps={{
            textField: {
              helperText: error ? (
                <div
                  className={CN(styles.helperTextMsg, {
                    [styles.success]: success && 'success',
                    [styles.error]: 'error',
                    [styles.messageBlue]: messageBlue && 'messageBlue',
                  })}
                >
                  <Typography
                    style={{ display: 'flex', alignItems: 'center' }}
                    variant="body2"
                    color="error"
                  >
                    <SvgImageComponent
                      color={'error'}
                      icon={
                        success
                          ? 'checkCircleOutline'
                          : error
                          ? 'error'
                          : messageBlue
                          ? 'helpOutline'
                          : undefined
                      }
                    />
                    {error}
                  </Typography>
                </div>
              ) : (
                ''
              ),
            },
          }}
        />
      </LocalizationProvider>
    </StyledEngineProvider>
  );
};

export const DatePicker = forwardRef(InputField);
