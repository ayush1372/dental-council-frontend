import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { SearchableDropdown } from '../../../../components/autocomplete/searchable-dropdown';
import { verboseLog } from '../../../../config/debug';
import { Button, TextField } from '../../../../ui/core';

export function TableSearch() {
  const loggedInUserType = useSelector((state) => state.login.loggedInUserType);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      filterByName: '',
      filterByRegNo: '',
    },
  });

  const onClickFilterButtonHandler = (data) => {
    verboseLog('data', data);
    reset({ filterByName: '', filterByRegNo: '' });
  };

  return (
    <Box data-testid="table-search">
      <Grid container sx={{ p: 0 }}>
        <Grid item md={4} xs={4} mb={1}>
          <Grid item md={8} xs={8}>
            <TextField
              inputProps={{ maxLength: 100, sx: { height: 12 } }}
              fullWidth={true}
              id="outlined-basic"
              variant="outlined"
              type="text"
              name="search"
              required="false"
              placeholder={'You can search anything here'}
              // margin="dense"
              defaultValue={getValues().search}
              error={errors.search?.message}
              {...register('search')}
            />
          </Grid>
        </Grid>
        <Grid item md={8} xs={8} mb={1}>
          <Box sx={{ display: 'flex' }} justifyContent="flex-end">
            <TextField
              inputProps={{ maxLength: 100, sx: { height: 12 } }}
              fullWidth={true}
              id="outlined-basic"
              variant="outlined"
              type="text"
              name="filterByName"
              required="false"
              placeholder={'Filyer by Name'}
              // margin="dense"
              defaultValue={getValues().filterByName}
              error={errors.filterByName?.message}
              {...register('filterByName')}
            />
            <TextField
              sx={{ ml: 1 }}
              inputProps={{ maxLength: 100, sx: { height: 12 } }}
              fullWidth={true}
              id="outlined-basic"
              variant="outlined"
              type="text"
              name="filterByRegNo"
              required="false"
              placeholder={'Filyer by Registration No.'}
              // margin="dense"
              defaultValue={getValues().filterByRegNo}
              error={errors.filterByRegNo?.message}
              {...register('filterByRegNo')}
            />
            {(loggedInUserType === 'College' || loggedInUserType === 'NMC') && (
              <Box sx={{ ml: 1 }}>
                <SearchableDropdown name="RegistrationCouncil" items={[{ id: 1, name: 'first' }]} />
              </Box>
            )}
            <Button
              size="small"
              variant="contained"
              sx={{ ml: 1, height: '48px' }}
              onClick={handleSubmit(onClickFilterButtonHandler)}
            >
              Filter
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{ ml: 1, height: '48px' }}
              endIcon={<KeyboardArrowDownIcon />}
              // onClick={onClickBackButtonHandler}
            ></Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TableSearch;
