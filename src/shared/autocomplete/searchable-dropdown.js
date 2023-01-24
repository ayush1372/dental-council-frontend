import { forwardRef } from 'react';

import { Autocomplete, Box } from '@mui/material';

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
    disabled = false,

    ...props
  },
  ref
) => {
  // eslint-disable-next-line no-console
  console.log(
    'inside searchable-dropdown=id,name,items,label,value',
    id,
    name,
    items,
    label,
    value
  );
  return (
    <Autocomplete
      limitTags={1}
      fullWidth
      multiple={multiple}
      value={value}
      onChange={(event, newValue) => {
        // eslint-disable-next-line no-console
        console.log('newValue  and event is ', newValue, event);
        clearErrors(name);
        onChange(newValue.id);
      }}
      disabled={disabled}
      id={id}
      getOptionLabel={(item) => `${item.name}`}
      options={items}
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id;
      }}
      noOptiontext={'Not Available'}
      renderOption={(props, item) => (
        <Box component="li" {...props} key={item.id} value={item.id}>
          {item.name}
        </Box>
      )}
      renderInput={(params) => (
        // console.log('params is', params);
        <TextField
          {...props}
          ref={ref}
          {...params}
          name={name}
          value={id}
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
