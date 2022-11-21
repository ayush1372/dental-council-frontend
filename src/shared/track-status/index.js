import {
  Box,
  // Button, Container,
  Grid,
  Typography,
} from '@mui/material';
// import { t } from 'i18next';
import { useForm } from 'react-hook-form';

import { RegistrationCouncilNames } from '../../constants/utils';
import { Button, Select, TextField } from '../../ui/core';

export default function TrackStatus() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      options: '',
      RegistrationCouncil: '',
      RegistrationNumber: '',
    },
  });

  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Box p={1}>
            <Typography color="black" variant="h3">
              Track Status
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={6} md={4}>
          <Select
            fullWidth
            error={errors.RegistrationCouncil?.message}
            name="RegistrationCouncil"
            label="Registration Council"
            defaultValue={getValues().RegistrationCouncil}
            required={true}
            {...register('RegistrationCouncil', {
              required: 'RegistrationCouncil* is required',
            })}
            options={RegistrationCouncilNames}
          />
        </Grid>

        <Grid item xs={6} md={4}>
          <TextField
            variant="outlined"
            name={'RegistrationNumber'}
            label={'Registration Number'}
            fullWidth
            required
            placeholder="Select State"
            defaultValue={getValues().RegistrationNumber}
            {...register('RegistrationNumber')}
          />
        </Grid>
        <Grid item xs={6} md={4} mt={4}>
          <Button
            variant="contained"
            sx={{
              marginRight: '25px',
              width: '96px',
              height: '48px',
              backgroundColor: 'secondary.main',
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
