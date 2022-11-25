import { forwardRef } from 'react';

import { Autocomplete } from '@mui/material';
import { Box } from '@mui/system';

import { TextField } from '../../ui/core';

const AutoCompleteField = (
  {
    id,
    name,
    items,
    label,
    placeholder,
    onChange,
    value,
    required,
    error,
    multiple = false,
    clearErrors,

    ...props
  },
  ref
) => {
  return (
    <Autocomplete
      limitTags={1}
      fullWidth
      multiple={multiple}
      value={value}
      onChange={(event, newValue) => {
        clearErrors(name);
        onChange(newValue);
      }}
      id={id}
      getOptionLabel={(item) => `${item.name}`}
      options={items}
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id;
      }}
      noOptiontext={'Not Available'}
      renderOption={(props, item) => (
        <Box component="li" {...props} key={item.id}>
          {item.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...props}
          ref={ref}
          {...params}
          name={name}
          label={label}
          placeholder={placeholder}
          required={required}
          error={error}
        />
      )}
    />
  );
};

export const SearchableDropdown = forwardRef(AutoCompleteField);
