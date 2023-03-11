// import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { filterDropDownData } from '../../../../../src/constants/common-data';
// import { RegistrationCouncilNames } from '../../../../constants/common-data';
import { createEditFieldData } from '../../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../../shared/autocomplete/searchable-dropdown';
import ExportFiles from '../../../../shared/export-component/export-file';
import { getDoctorTrackApplicationData } from '../../../../store/actions/doctor-user-profile-actions';
import { Button, TextField } from '../../../../ui/core';

export function TableSearch({ trackApplication, activateLicence, searchParams, exportData, flag }) {
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { councilNames } = useSelector((state) => state.common);
  const profileId = useSelector((state) => state.loginReducer.loginData.data.profile_id);
  const dispatch = useDispatch();
  // const theme = useTheme();
  let trackData = {
    pageNo: 1,
    offset: 10,
  };
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
      FilterValue: '',
      Filter: '',
      FilterId: '',
    },
  });
  const onClickSearchButtonHandler = (data) => {
    if (
      trackApplication &&
      getValues().FilterId !== '' &&
      getValues().FilterId !== undefined &&
      getValues().FilterId !== null &&
      getValues().FilterValue !== '' &&
      getValues().FilterValue !== undefined &&
      getValues().FilterValue !== null
    ) {
      trackData.search = getValues().FilterId;
      trackData.value = getValues().FilterValue;
      dispatch(getDoctorTrackApplicationData(profileId, trackData));
    }
    searchParams(data);
    reset({
      filterByName: '',
      filterByRegNo: '',
      registrationCouncil: '',
      RegistrationCouncilId: '',
      search: '',
    });
  };

  // const onClickSearchButtonHandler = (data) => {
  //   trackData.search = data.search;
  //   searchParams(data);
  //   dispatch(getDoctorTrackApplicationData(trackData));
  //   reset({
  //     filterByName: '',
  //     filterByRegNo: '',
  //     registrationCouncil: '',
  //     RegistrationCouncilId: '',
  //     search: '',
  //   });
  // };

  return (
    <Box data-testid="table-search" mb={2}>
      <Grid container sx={{ alignItems: 'flex-end' }}>
        <Grid
          item
          md={trackApplication ? 5 : activateLicence ? 4 : 2}
          xs={12}
          mb={{ xs: 1, sm: 0 }}
        >
          {/* <TextField
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
          /> */}
        </Grid>

        <Grid item md={trackApplication ? 7 : activateLicence ? 8 : 10} xs={12}>
          <Grid container item xs={12} sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
            {trackApplication === true && (
              <>
                <Grid item md={3} xs={12} ml="auto">
                  <SearchableDropdown
                    fullWidth
                    name="Filter"
                    items={createEditFieldData(filterDropDownData)}
                    placeholder=""
                    clearErrors={clearErrors}
                    {...register('Filter')}
                    onChange={(currentValue) => {
                      setValue('FilterId', currentValue.id);
                    }}
                  />
                  {/* <Select
                    error={errors.Filter?.message}
                    name="Filter"
                    defaultValue={getValues().Filter}
                    placeholder="All Applications"
                    options={createSelectFieldData(filterDropDownData)}
                    
                  /> */}
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    sx={{
                      color: 'inputTextColor.main',
                      '.MuiOutlinedInput-root': {
                        borderRadius: '3px',
                      },
                      input: {
                        letterSpacing: 0,
                      },
                    }}
                    variant="outlined"
                    name={'FilterValue'}
                    placeholder=""
                    fullWidth
                    defaultValue={getValues().FilterValue}
                    {...register('FilterValue', {
                      // required: 'Doctor Name is Required',
                      // maxLength: {
                      //   value: 100,
                      //   message: 'Length should be less than 100.',
                      // },
                    })}
                    error={errors.FilterValue?.message}
                  />
                  {/* <Select
                    error={errors.Date?.message}
                    name="Date"
                    defaultValue={getValues().Date}
                    options={createSelectFieldData(applicationStatus)}
                  /> */}
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
            {(trackApplication !== true || trackApplication === true) && (
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
                  onClick={handleSubmit(onClickSearchButtonHandler)}
                >
                  Search
                </Button>
              </Grid>
            )}
            <Grid item md="auto" xs={12}>
              <ExportFiles exportData={exportData} flag={flag} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TableSearch;
