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
    <Box>
      {showHeader && (
        <Box px={3}>
          <Typography variant="h2" color="textPrimary.main" component="div">
            Track Status
          </Typography>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={4}>
              <Box pb={{ xs: 2, md: 4 }}>
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

            <Grid item xs={12} md={4}>
              <TextField
                name={'RegistrationNumber'}
                label={'Registration Number'}
                fullWidth
                required
                placeholder="Enter Registration Number"
                defaultValue={getValues().RegistrationNumber}
                error={errors.RegistrationNumber?.message}
                {...register('RegistrationNumber', {
                  required: 'Registration Number is required',
                })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                sx={{
                  marginTop: '30px',
                  width: {
                    xs: '100%',
                    md: 'fit-content',
                  },
                }}
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                color="secondary"
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {showTable && <TrackStatusTable setShowHeader={setShowHeader} />}
    </Box>
  );
}
