import { useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { createEditFieldData } from '../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../shared/autocomplete/searchable-dropdown';
import TrackStatusTable from '../../shared/track-status/track-status-table';
import { trackStatus } from '../../store/actions/common-actions';
import { Button, TextField } from '../../ui/core';
import successToast from '../../ui/core/toaster';
export default function TrackStatus() {
  const [showTable, setShowTable] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { councilNames, trackStatusData } = useSelector((state) => state.common);

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
    },
  });

  const onSubmit = () => {
    getTableData(1);
    setShowTable(true);
  };
  const getTableData = (pageNo) => {
    const trackValues = {
      smc_id: getValues().RegistrationCouncilId,
      registration_no: getValues().RegistrationNumber,
      // work_flow_status_id: 'null',
      // application_type_id: 'null',
      pageNo: pageNo,
      offset: 10,
      sort_by: 'createdAt',
      sort_order: 'desc',
    };
    dispatch(trackStatus(trackValues))
      .then(() => {})
      .catch((error) => {
        successToast(
          error?.data?.response?.data?.error,
          'RegistrationError',
          'error',
          'top-center'
        );
      });
  };
  return (
    <Box>
      {showHeader && (
        <Box px={3}>
          <Typography variant="h2" color="textPrimary.main" component="div" mt={8}>
            Track Status
          </Typography>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={4}>
              <Box pb={{ xs: 2, md: 4 }}>
                <Typography color="inputTextColor.main">
                  Council Name
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <SearchableDropdown
                  sx={{ mt: 1 }}
                  name="RegistrationCouncil"
                  items={createEditFieldData(councilNames)}
                  placeholder={
                    loggedInUserType !== 'SMC'
                      ? 'Select Council Name'
                      : 'Maharashtra Medical Council'
                  }
                  clearErrors={clearErrors}
                  error={loggedInUserType !== 'SMC' && errors.RegistrationCouncil?.message}
                  {...register('RegistrationCouncil', {
                    required: loggedInUserType !== 'SMC' && 'Council Name is required',
                  })}
                  disabled={loggedInUserType === 'SMC'}
                  onChange={(currentValue) => {
                    setValue('RegistrationCouncilId', currentValue.id);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box pb={{ xs: 2, md: 4 }}>
                <Typography color="inputTextColor.main">
                  Registration Number
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <TextField
                  sx={{ mt: 1, mr: 2 }}
                  name={'RegistrationNumber'}
                  fullWidth
                  required
                  placeholder="Enter Registration Number"
                  defaultValue={getValues().RegistrationNumber}
                  error={errors.RegistrationNumber?.message}
                  {...register('RegistrationNumber', {
                    required: 'Registration Number is required',
                  })}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4} display="flex" alignItems="center">
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
            </Grid>
          </Grid>
        </Box>
      )}

      {showTable && trackStatusData?.data?.data?.health_professional_applications && (
        <TrackStatusTable
          getTableData={getTableData}
          setShowHeader={setShowHeader}
          trackStatusData={trackStatusData?.data?.data}
        />
      )}
    </Box>
  );
}
