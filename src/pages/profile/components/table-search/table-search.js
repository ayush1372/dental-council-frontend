// import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import {
  ActivateLicenceFieldList,
  CollegeApprovalFieldList,
  DashBoardCardsFieldList,
  filterDropDownData,
} from '../../../../../src/constants/common-data';
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
      collegeApproval: '',
      collegeApprovalId: '',
      collegeApprovalFilter: '',
      ActivateLicence: '',
      ActivateLicenceId: '',
      ActivateLicenceFilter: '',
      dashBoardCard: '',
      dashBoardCardId: '',
      dashBoardCardFilter: '',
    },
  });
  const onClickSearchButtonHandler = (data) => {
    if (exportData?.data?.dashboard_tolist) {
      trackData.value = getValues().dashBoardCardFilter;
      trackData.search = getValues().dashBoardCardId;

      dispatch(getDoctorTrackApplicationData(profileId, trackData));
    }

    if (exportData?.data?.health_professional_details) {
      trackData.search = getValues().ActivateLicenceId;
      trackData.value = getValues().ActivateLicenceFilter;
      dispatch(getDoctorTrackApplicationData(profileId, trackData));
    }
    if (trackApplication) {
      if (
        getValues().FilterValue.toLowerCase() === 'HP Registration'.toLowerCase() ||
        getValues().FilterValue.toLowerCase() === 'PENDING'.toLowerCase()
      ) {
        trackData.value = 1;
      }
      if (
        getValues().FilterValue.toLowerCase() === 'HP Modification'.toLowerCase() ||
        getValues().FilterValue.toLowerCase() === 'APPROVED'.toLowerCase()
      ) {
        trackData.value = 2;
      }
      if (
        getValues().FilterValue.toLowerCase() === 'Temporary Suspension'.toLowerCase() ||
        getValues().FilterValue.toLowerCase() === 'QUERY RAISED'.toLowerCase()
      ) {
        trackData.value = 3;
      }
      if (
        getValues().FilterValue.toLowerCase() === 'Permanent Suspension'.toLowerCase() ||
        getValues().FilterValue.toLowerCase() === 'REJECTED'.toLowerCase()
      ) {
        trackData.value = 4;
      }
      if (
        getValues().FilterValue.toLowerCase() === 'Activate License'.toLowerCase() ||
        getValues().FilterValue.toLowerCase() === 'SUSPENDED'.toLowerCase()
      ) {
        trackData.value = 5;
      }
      if (
        getValues().FilterValue.toLowerCase() === 'College Registration'.toLowerCase() ||
        getValues().FilterValue.toLowerCase() === 'BLACKLISTED'.toLowerCase()
      ) {
        trackData.value = 6;
      }
      if (getValues().FilterValue.toLowerCase() === 'Foreign HP Registration'.toLowerCase()) {
        trackData.value = 7;
      }
      if (getValues().FilterValue.toLowerCase() === 'Qualification Workflow'.toLowerCase()) {
        trackData.value = 8;
      }
      trackData.search = getValues().FilterId;
      dispatch(getDoctorTrackApplicationData(profileId, trackData));
    }
    if (exportData?.data?.college_details) {
      trackData.search = getValues().collegeApprovalId;
      trackData.value = getValues().collegeApprovalFilter;
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

  return (
    <Box data-testid="table-search" mb={2}>
      <Grid container sx={{ alignItems: 'flex-end' }}>
        <Grid
          item
          md={trackApplication ? 5 : activateLicence ? 4 : 2}
          xs={12}
          mb={{ xs: 1, sm: 0 }}
        ></Grid>

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
                    placeholder="Enter Keywords"
                    fullWidth
                    defaultValue={getValues().FilterValue}
                    {...register('FilterValue', {})}
                    error={errors.FilterValue?.message}
                  />
                </Grid>
              </>
            )}
            {trackApplication !== true && (
              <Grid item md={3} xs={12} ml="auto">
                {exportData?.data?.health_professional_details ? (
                  <SearchableDropdown
                    fullWidth
                    name="ActivateLicence"
                    items={createEditFieldData(ActivateLicenceFieldList)}
                    placeholder=""
                    clearErrors={clearErrors}
                    {...register('ActivateLicence')}
                    onChange={(currentValue) => {
                      setValue('ActivateLicenceId', currentValue.id);
                    }}
                  />
                ) : exportData?.data?.dashboard_tolist ? (
                  <SearchableDropdown
                    fullWidth
                    name="dashBoardCard"
                    items={createEditFieldData(DashBoardCardsFieldList)}
                    placeholder=""
                    clearErrors={clearErrors}
                    {...register('dashBoardCard')}
                    onChange={(currentValue) => {
                      setValue('dashBoardCardId', currentValue.id);
                    }}
                  />
                ) : (
                  <SearchableDropdown
                    fullWidth
                    name="collegeApproval"
                    items={createEditFieldData(CollegeApprovalFieldList)}
                    placeholder=""
                    clearErrors={clearErrors}
                    {...register('collegeApproval')}
                    onChange={(currentValue) => {
                      setValue('collegeApprovalId', currentValue.id);
                    }}
                  />
                )}
              </Grid>
            )}
            {trackApplication !== true && (
              <Grid item md={3} xs={12}>
                {exportData?.data?.health_professional_details ? (
                  <TextField
                    data-testid="filter_By_RegNo"
                    inputProps={{ maxLength: 100 }}
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    name="ActivateLicenceFilter"
                    required={false}
                    placeholder={'enter keywords'}
                    defaultValue={getValues().ActivateLicenceFilter}
                    error={errors.ActivateLicenceFilter?.message}
                    {...register('ActivateLicenceFilter')}
                  />
                ) : exportData?.data?.dashboard_tolist ? (
                  <TextField
                    data-testid="filter_By_RegNo"
                    inputProps={{ maxLength: 100 }}
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    name={'dashBoardCardFilter'}
                    placeholder={'enter keywords'}
                    defaultValue={getValues().dashBoardCardFilter}
                    {...register('dashBoardCardFilter', {})}
                    error={errors.dashBoardCardFilter?.message}
                  />
                ) : (
                  <TextField
                    data-testid="filter_By_RegNo"
                    inputProps={{ maxLength: 100 }}
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    name="collegeApprovalFilter"
                    required={false}
                    placeholder={'enter keywords'}
                    defaultValue={getValues().collegeApprovalFilter}
                    error={errors.collegeApprovalFilter?.message}
                    {...register('collegeApprovalFilter')}
                  />
                )}
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
