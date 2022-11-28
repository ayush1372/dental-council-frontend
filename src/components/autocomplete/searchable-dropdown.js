import { Autocomplete, Box, TextField } from '@mui/material';
const SearchableDropdown = ({
  id,
  name,
  items,
  label,
  onChange,
  placeholder,
  value,
  multiple = false,
}) => {
  return (
    <Autocomplete
      limitTags={1}
      fullWidth
      multiple={multiple}
      value={value}
      onChange={(event, newValue) => {
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
        <TextField {...params} name={name} label={label} placeholder={placeholder} />
      )}
    />
  );
};

export default SearchableDropdown;
