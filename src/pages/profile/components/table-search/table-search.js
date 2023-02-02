import { useTheme } from '@emotion/react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, IconButton, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { verboseLog } from '../../../../config/debug';
import { SearchableDropdown } from '../../../../shared/autocomplete/searchable-dropdown';
import ExportFiles from '../../../../shared/export-component/export-file';
import { Button, Select, TextField } from '../../../../ui/core';

export function TableSearch({ trackApplication, activateLicence }) {
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
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
  const theme = useTheme();
  const onClickFilterButtonHandler = (data) => {
    verboseLog('data', data);
    reset({ filterByName: '', filterByRegNo: '' });
  };

  return (
    <Box data-testid="table-search">
      <Grid container sx={{ alignItems: 'flex-end' }} mb={5}>
        <Grid
          item
          md={trackApplication ? 5 : activateLicence ? 4 : 2}
          xs={12}
          mb={{ xs: 1, sm: 0 }}
        >
          <TextField
            sx={{ mt: 1 }}
            data-testid="freesearch"
            inputProps={{ maxLength: 100 }}
            fullWidth={true}
            id="outlined-basic"
            variant="outlined"
            type="text"
            name="search"
            required={false}
            placeholder={'Search by Application Type'}
            defaultValue={getValues().search}
            error={errors.search?.message}
            // label="Search by Application Type"
            {...register('search')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ backgroundColor: theme.palette.grey.main }}>
                  <IconButton
                    sx={{
                      p: 2,
                      backgroundColor: theme.palette.grey.main,
                      borderRadius: '0 5px 5px 0',
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item md={trackApplication ? 7 : activateLicence ? 8 : 10} xs={12}>
          <Grid container item xs={12} sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
            {trackApplication === true && (
              <>
                <Grid item md={3} xs={12} ml="auto">
                  <Select
                    error={errors.Filter?.message}
                    name="Filter"
                    // label="Filter"
                    defaultValue={getValues().Filter}
                    placeholder="All Applications"
                    options={[
                      {
                        label: 'Application',
                        value: 'Application',
                      },
                    ]}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <Select
                    error={errors.Date?.message}
                    name="Date"
                    // label="Sort by"
                    defaultValue={getValues().Date}
                    options={[
                      {
                        label: '01-01-0001',
                        value: '01-01-0001',
                      },
                    ]}
                  />
                </Grid>
              </>
            )}
            {trackApplication !== true && (
              <Grid item md={3} xs={12} ml="auto">
                <TextField
                  data-testid="filterByName"
                  inputProps={{ maxLength: 100 }}
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  name="filterByName"
                  required={false}
                  placeholder={'Filter by Name'}
                  defaultValue={getValues().filterByName}
                  error={errors.filterByName?.message}
                  {...register('filterByName')}
                  // label="Filter By Name"
                />
              </Grid>
            )}
            {trackApplication !== true && (
              <Grid item md={3} xs={12}>
                <TextField
                  data-testid="filterByRegNo"
                  inputProps={{ maxLength: 100 }}
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  name="filterByRegNo"
                  required={false}
                  placeholder={'Filter by Registration No.'}
                  defaultValue={getValues().filterByRegNo}
                  error={errors.filterByRegNo?.message}
                  {...register('filterByRegNo')}
                  // label="Filter by Reg No"
                />
              </Grid>
            )}
            {(loggedInUserType === 'College' || loggedInUserType === 'NMC') && (
              <Grid item md={3} xs={12}>
                {/* <Typography>Filter by council</Typography> */}
                <SearchableDropdown
                  name="RegistrationCouncil"
                  placeholder="Filter by Council"
                  items={[{ id: 1, name: 'first' }]}
                />
              </Grid>
            )}
            {trackApplication !== true && (
              <Grid item md="auto" xs={12}>
                <Button
                  data-testid="filterButton"
                  sx={{
                    padding: '13px 10px',
                    m: {
                      md: '0px',
                    },
                    width: {
                      xs: '100%',
                      md: 'fit-content',
                    },
                  }}
                  variant="contained"
                  onClick={handleSubmit(onClickFilterButtonHandler)}
                >
                  Filter
                </Button>
              </Grid>
            )}
            <Grid item md="auto" xs={12}>
              <ExportFiles />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TableSearch;
