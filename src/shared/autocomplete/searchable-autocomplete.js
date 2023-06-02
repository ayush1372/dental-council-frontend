import { forwardRef } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import CN from 'clsx';

import { SvgImageComponent } from '../../ui/core/svg-icons/index';

import styles from '../../ui/core/form/select/select.module.scss';

const SearchableAutoComplete = (
  {
    multiple = true,
    options,
    name,
    required = true,
    value = [],
    defaultValue = [],
    onChange,
    variant,
    placeholder,
    messageBlue,
    success,
    error,
  },
  ref
) => {
  return (
    <>
      <Autocomplete
        multiple={multiple}
        popupIcon={<KeyboardArrowDownIcon />}
        options={options}
        name={name}
        required={required}
        value={value}
        defaultValue={defaultValue}
        getOptionLabel={(item) => `${item.name}`}
        onChange={(_, data) => {
          onChange(data);
        }}
        isOptionEqualToValue={(option, value) => {
          return option.id === value.id;
        }}
        renderOption={(props, item) => (
          <Box component="li" {...props} key={item.id}>
            {item.name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={variant}
            placeholder={placeholder}
            ref={ref}
            error={error ? true : false}
          />
        )}
      />
      {error && (
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
    </>
  );
};

export const AutoComplete = forwardRef(SearchableAutoComplete);
