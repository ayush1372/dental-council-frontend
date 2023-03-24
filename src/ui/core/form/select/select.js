import { forwardRef } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  MenuItem,
  Select as MuiSelect,
  StyledEngineProvider,
  Typography,
} from '@mui/material';
import CN from 'clsx';

import { SvgImageComponent } from '../../svg-icons';

import styles from './select.module.scss';

const SelectField = (
  {
    name,
    label,
    error,
    required,
    defaultValue,
    options,
    dataTestSelectId,
    dataTestOptionId,
    messageBlue,
    success,
    ...props
  },
  ref
) => {
  return (
    <StyledEngineProvider injectFirst>
      {label && (
        <Box>
          <Typography
            variant="subtitle2"
            fontWeight="500"
            component={'span'}
            color="inputTextColor.main"
          >
            {label}
          </Typography>
          <Typography variant="body2" color="error">
            {required ? ' *' : ''}
          </Typography>
        </Box>
      )}
      <MuiSelect
        IconComponent={KeyboardArrowDownIcon}
        fullWidth
        name={name}
        ref={ref}
        {...props}
        data-testid={dataTestSelectId}
        error={error ? true : false}
        defaultValue={defaultValue}
      >
        {options?.length > 0 &&
          options?.map((item) => (
            <MenuItem key={item.label} data-testid={dataTestOptionId} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
      </MuiSelect>
      {error && (
        // <Typography variant="body2" color="error">
        //   {error}
        // </Typography>

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
      )}
    </StyledEngineProvider>
  );
};

export const Select = forwardRef(SelectField);
