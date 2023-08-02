import { useState } from 'react';

import { Box, Grid, TextField, Tooltip, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { GenderList, TrackStatusFieldList } from '../../constants/common-data';
import { createEditFieldData } from '../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../shared/autocomplete/searchable-dropdown';
import TrackStatusTable from '../../shared/track-status/track-status-table';
import { trackStatus } from '../../store/actions/common-actions';
import { Button } from '../../ui/core';
// import successToast from '../../ui/core/toaster';
import ExportFiles from '../export-component/export-file';
export default function TrackStatus() {
  const [showTable, setShowTable] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [trackValues, setTrackValues] = useState({});
  const [trackStatusId, setTrackStatusId] = useState('');
  const [trackStatusGenderId, setTrackStatusGenderId] = useState('');
  const [genderDropdown, setGenderDropdown] = useState(false);
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { councilNames, trackStatusData } = useSelector((state) => state.common);
  const [viewExportIcon, setViewExportIcon] = useState(false);

  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      options: '',
      RegistrationCouncil: '',
      RegistrationCouncilId: '',
      RegistrationNumber: '',
      trackStatus: '',
      trackStatusFilter: '',
    },
  });

  const acendingOrderFilter = TrackStatusFieldList;
  acendingOrderFilter?.sort((a, b) => {
    let nameCompare1 = a?.name?.toLowerCase(),
      nameCompare2 = b?.name?.toLowerCase();
    if (nameCompare1 < nameCompare2) {
      return -1;
    }
    if (nameCompare1 > nameCompare2) {
      return 1;
    }
    return 0;
  });

  const onSubmit = () => {
    const trackData = {
      smcId: getValues().RegistrationCouncilId,
      // registrationNo: parseInt(getValues().RegistrationNumber),
      search: trackStatusId,
      value: genderDropdown === true ? trackStatusGenderId : getValues().trackStatusFilter,
      pageNo: 1,
      offset: 10,
    };
    dispatch(trackStatus(trackData)).then(() => {});
    // .catch((error) => {
    //   successToast(
    //     error?.data?.response?.data?.error,
    //     'RegistrationError',
    //     'error',
    //     'top-center'
    //   );
    // });

    setShowTable(true);
    setTrackValues(trackData);
    setViewExportIcon(true);
  };
  return (
    <Grid p={1}>
      <Grid item xs={12} sm="auto" sx={{ mr: { xs: 0, sm: 'auto' } }} p={1}>
        <Typography variant="h2" color="textPrimary.main">
          Track Status
        </Typography>
      </Grid>
      {showHeader && (
        <Box px={3}>
          {/* <Typography variant="h2" color="textPrimary.main" component="div" mt={8}>
            Track Status
          </Typography> */}
          <Grid container spacing={2} mt={1}>
            {loggedInUserType !== 'SMC' && (
              <Grid item xs={12} md={3}>
                <Box pb={{ xs: 2, md: 4 }}>
                  {/* <Typography color="inputTextColor.main">
                  Council Name
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography> */}

                  <Tooltip title={getValues().RegistrationCouncil} arrow placeholder="bottom-start">
                    <SearchableDropdown
                      sx={{ mt: 1 }}
                      name="RegistrationCouncil"
                      items={createEditFieldData(councilNames)}
                      placeholder={
                        loggedInUserType !== 'SMC'
                          ? 'Select council'
                          : 'Maharashtra medical council'
                      }
                      clearErrors={clearErrors}
                      error={loggedInUserType !== 'SMC' && errors.RegistrationCouncil?.message}
                      {...register('RegistrationCouncil')}
                      disabled={loggedInUserType === 'SMC'}
                      onChange={(currentValue) => {
                        setValue('RegistrationCouncilId', currentValue?.id);
                        setValue('RegistrationCouncil', currentValue?.name);
                      }}
                    />
                  </Tooltip>
                </Box>
              </Grid>
            )}

            <Grid item xs={12} md={3}>
              <Box pb={{ xs: 2, md: 4 }}>
                {/* <Typography color="inputTextColor.main">
                  label
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography> */}
                <SearchableDropdown
                  sx={{ mt: 1 }}
                  fullWidth
                  name="trackStatus"
                  items={createEditFieldData(acendingOrderFilter)}
                  placeholder="Please select"
                  clearErrors={clearErrors}
                  {...register('trackStatus')}
                  onChange={(currentValue) => {
                    setTrackStatusId(currentValue?.id);
                    if (currentValue?.id === 'gender') {
                      setGenderDropdown(true);
                    } else {
                      setGenderDropdown(false);
                    }
                    if (currentValue === null) {
                      setValue('trackStatusFilter', null);
                    }
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box pb={{ xs: 2, md: 4 }}>
                {/* <Typography color="inputTextColor.main">
                  label
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography> */}
                {genderDropdown === true ? (
                  <SearchableDropdown
                    sx={{ mt: 1 }}
                    fullWidth
                    name="trackStatusGender"
                    items={createEditFieldData(GenderList)}
                    placeholder="Please select"
                    clearErrors={clearErrors}
                    {...register('trackStatusGender')}
                    onChange={(currentValue) => {
                      setTrackStatusGenderId(currentValue?.id);
                    }}
                  />
                ) : (
                  <TextField
                    sx={{ mt: 1 }}
                    data-testid="filter_By_RegNo"
                    inputProps={{ maxLength: 100 }}
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    name={'trackStatusFilter'}
                    placeholder={'Enter keywords'}
                    defaultValue={getValues().trackStatusFilter}
                    {...register('trackStatusFilter', {})}
                    error={errors.trackStatusFilter?.message}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <Box pb={{ xs: 2, md: 4 }} sx={{ mt: 1 }}>
                <Button
                  sx={{
                    width: {
                      xs: '100%',
                      md: 'fit-content',
                    },
                  }}
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  color="secondary"
                  size="medium"
                >
                  Search
                </Button>
              </Box>
              <Grid item xs="auto" ml="auto" mb={2}>
                {viewExportIcon === true && (
                  <ExportFiles exportData={trackStatusData?.data?.data} flag={'trackStatusData'} />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}

      {showTable && trackStatusData?.data?.data?.health_professional_applications && (
        <TrackStatusTable
          trackValues={trackValues}
          // getTableData={getTableData}
          setShowHeader={setShowHeader}
          trackStatusData={trackStatusData?.data?.data}
        />
      )}
    </Grid>
  );
}
