import { forwardRef, useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  MenuItem,
  Select as MuiSelect,
  StyledEngineProvider,
  TextField,
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
    placeholder,
    ...props
  },
  ref
) => {
  const [showError, setShowError] = useState(true);
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
          <Typography component="span" color="error">
            {required ? '*' : ''}
          </Typography>
        </Box>
      )}
      <MuiSelect
        IconComponent={KeyboardArrowDownIcon}
        fullWidth
        name={name}
        placeholder={placeholder}
        ref={ref}
        {...props}
        data-testid={dataTestSelectId}
        error={error && showError ? true : false}
        defaultValue={defaultValue ?? ''}
        displayEmpty
        renderInput={() => <TextField {...props} placeholder={placeholder} />}
        onBlur={(e) => {
          if (e?.target?.value?.length > 1) {
            setShowError(false);
          }
        }}
        onFocus={(e) => {
          if (e?.target?.innerText?.length > 1) {
            setShowError(false);
          }
        }}
      >
        <MenuItem key={0} value={''}>
          <Typography fontWeight={'400'} sx={{ opacity: '0.4' }}>
            {placeholder}
          </Typography>
        </MenuItem>
        {options?.length > 0 &&
          options?.map((item) => (
            <MenuItem
              key={item.label}
              data-testid={dataTestOptionId}
              value={item.value}
              title={item.label}
            >
              {item.label}
            </MenuItem>
          ))}
      </MuiSelect>
      {error && showError && (
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
