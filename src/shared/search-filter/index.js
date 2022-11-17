import { Grid, Input, InputAdornment, Typography } from '@mui/material';
import { FiSearch } from 'react-icons/fi';

function SearchFilter(props) {
  const handleQuerySearchClick = () => {};

  const handleQueryChange = (event) => {
    props.changeSearchQuery({ value: event.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleQuerySearchClick();
    }
  };

  return (
    <Grid
      item
      xs={4}
      className="search-box"
      style={{ border: '1px solid grey', padding: '10px', maxWidth: '100%', borderRadius: '4px' }}
    >
      <Typography component="div" className="search-field">
        <Input
          id="queries"
          name="queries"
          variant="outlined"
          placeholder="Search"
          className="search-input-field"
          disableUnderline={true}
          value={props.searchQuery.value}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          startAdornment={
            <InputAdornment position="start">
              <FiSearch className="search-icon" style={{ color: '#a8adb2' }} />
            </InputAdornment>
          }
          autoComplete="off"
        />
      </Typography>
    </Grid>
  );
}

export default SearchFilter;
