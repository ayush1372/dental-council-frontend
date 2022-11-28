import { forwardRef } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete, Box, TextField } from '@mui/material';

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
    error,
  },
  ref
) => {
  return (
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
          helperText={error ? error : ''}
        />
      )}
    />
  );
};

export const AutoComplete = forwardRef(SearchableAutoComplete);
