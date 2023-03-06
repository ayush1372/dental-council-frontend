import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, IconButton, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

// import { RegistrationCouncilNames } from '../../../../constants/common-data';
import { createEditFieldData } from '../../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../../shared/autocomplete/searchable-dropdown';
import ExportFiles from '../../../../shared/export-component/export-file';
import { Button, Select, TextField } from '../../../../ui/core';

export function TableSearch({ trackApplication, activateLicence, searchParams }) {
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { councilNames } = useSelector((state) => state.common);
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      filterByName: '',
      filterByRegNo: '',
      registrationCouncil: '',
      RegistrationCouncilId: '',
      search: '',
    },
  });
  const onClickFilterButtonHandler = (data) => {
    searchParams(data);
    reset({
      filterByName: '',
      filterByRegNo: '',
      registrationCouncil: '',
      RegistrationCouncilId: '',
      search: '',
    });
  };

  const onClickSearchButtonHandler = (data) => {
    searchParams(data);
    reset({
      filterByName: '',
      filterByRegNo: '',
      registrationCouncil: '',
      RegistrationCouncilId: '',
      search: '',
    });
  };

  return (
    <Box data-testid="table-search" mb={2}>
      <Grid container sx={{ alignItems: 'flex-end' }}>
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
            placeholder={'Search'}
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
                    onClick={handleSubmit(onClickSearchButtonHandler)}
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
                />
              </Grid>
            )}
            {trackApplication !== true && (
              <Grid item md={3} xs={12}>
                <TextField
                  data-testid="filter_By_RegNo"
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
                />
              </Grid>
            )}
            {(loggedInUserType === 'College' || loggedInUserType === 'NMC') && (
              <Grid item md={3} xs={12}>
                <SearchableDropdown
                  fullWidth
                  name="registrationCouncil"
                  items={createEditFieldData(councilNames)}
                  placeholder="Filter by Council"
                  clearErrors={clearErrors}
                  {...register('registrationCouncil')}
                  onChange={(currentValue) => {
                    setValue('RegistrationCouncilId', currentValue.id);
                  }}
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
