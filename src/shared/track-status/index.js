import { useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { verboseLog } from '../../config/debug';
import { RegistrationCouncilNames } from '../../constants/common-data';
import { SearchableDropdown } from '../../shared/autocomplete/searchable-dropdown';
import TrackStatusTable from '../../shared/track-status/track-status-table';
import { Button, TextField } from '../../ui/core';
export default function TrackStatus() {
  const [showTable, setShowTable] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);

  const {
    handleSubmit,
    register,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      options: '',
      RegistrationCouncil: '',
      RegistrationNumber: '',
    },
  });

  const onSubmit = () => {
    verboseLog('');
    setShowTable(true);
  };

  return (
    <Box>
      {showHeader && (
        <Box px={3}>
          <Typography variant="h2" color="textPrimary.main" component="div" mt={5}>
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
                  items={RegistrationCouncilNames}
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
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {showTable && <TrackStatusTable setShowHeader={setShowHeader} />}
    </Box>
  );
}
