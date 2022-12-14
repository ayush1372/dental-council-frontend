import { useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { verboseLog } from '../../config/debug';
import { RegistrationCouncilNames } from '../../constants/common-data';
import { SearchableDropdown } from '../../shared/autocomplete/searchable-dropdown';
import TrackStatusTable from '../../shared/track-status/track-status-table';
import { Button, TextField } from '../../ui/core';
export default function TrackStatus() {
  const [showTable, setShowTable] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

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
    <Box p={3}>
      <Grid container mt={2}>
        {showHeader ? (
          <Grid container item>
            <Grid item xs={12}>
              <Typography variant="h2" color="textPrimary.main">
                Track Status
              </Typography>
            </Grid>
          </Grid>
        ) : (
          ''
        )}
        {showHeader ? (
          <Grid container item spacing={2}>
            <Grid item xs={6} md={4}>
              <Box sx={{ paddingBottom: '32px' }}>
                <Typography color="inputTextColor.main">
                  Medical Council Name
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <SearchableDropdown
                  name="RegistrationCouncil"
                  items={RegistrationCouncilNames}
                  placeholder="Select Medical Council Name"
                  clearErrors={clearErrors}
                  error={errors.RegistrationCouncil?.message}
                  {...register('RegistrationCouncil', {
                    required: 'Medical Council is required',
                  })}
                />
              </Box>
            </Grid>

            <Grid item xs={6} md={4}>
              <TextField
                name={'RegistrationNumber'}
                label={'Registration Number'}
                fullWidth
                required
                placeholder="Enter Registration Number"
                defaultValue={getValues().RegistrationNumber}
                {...register('RegistrationNumber', {
                  required: 'College Name is required',
                })}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <Button
                style={{ marginTop: '30px' }}
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                color="secondary"
              >
                Search
              </Button>
            </Grid>
          </Grid>
        ) : (
          ''
        )}
        <Grid container item spacing={2}>
          <Grid item xs={12} style={{ margin: '0px' }}>
            {showTable && <TrackStatusTable setShowHeader={setShowHeader} />}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
