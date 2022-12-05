import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { Button, Select, TextField } from '../../../ui/core';

const SuspendedDoctor = ({ setDoSearch }) => {
  const {
    formState: { errors },
    getValues,
    // handleSubmit,
    register,
    // setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      SelectDoctorname: '',
      RegistrationNumber: '',
      yearofRegistration: '',
      Statemedicalcouncil: '',
    },
  });
  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={4}>
        <Select
          sx={{
            color: 'inputTextColor.main',
          }}
          fullWidth
          error={errors.SelectDoctorname?.message}
          name="SelectDoctorname"
          label="Select Doctor name"
          placeholder="Select Doctor name"
          defaultValue={getValues().SelectDoctorname}
          {...register('SelectDoctorname', {
            required: 'Select Doctor name Council is required',
          })}
          options={[
            {
              label: '-',
              value: '-',
            },
          ]}
        />
      </Grid>
      <Grid item xs={4}>
        <Grid>
          <Typography color="inputTextColor.main">
            Enter Registration Number{' '}
            <ErrorOutlineIcon
              sx={{
                color: 'textPrimary.secondary',
                fontSize: '12px',
              }}
            />
          </Typography>
        </Grid>
        <TextField
          variant="outlined"
          name={'RegistrationNumber'}
          placeholder="Enter Registration Name"
          fullWidth
          defaultValue={getValues().RegistrationNumber}
          {...register('RegistrationNumber', {
            required: 'Registration Number is Required',
            maxLength: {
              value: 100,
              message: 'Length should be less than 100.',
            },
          })}
          error={errors.RegistrationNumber?.message}
        />
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={4}>
          <Select
            sx={{
              color: 'inputTextColor.main',
            }}
            fullWidth
            error={errors.yearofRegistration?.message}
            name="yearofRegistration"
            label="Select year of Registration"
            placeholder="Select year of Registration"
            defaultValue={getValues().yearofRegistration}
            {...register('yearofRegistration', {
              required: 'year of Registration is required',
            })}
            options={[
              {
                label: '-',
                value: '-',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            sx={{
              color: 'inputTextColor.main',
            }}
            fullWidth
            error={errors.Statemedicalcouncil?.message}
            name="Statemedicalcouncil"
            label="Select State Medical Council"
            placeholder="Select State medical council"
            defaultValue={getValues().Statemedicalcouncil}
            {...register('Statemedicalcouncil', {
              required: 'state medical council is required',
            })}
            options={[
              {
                label: '-',
                value: '-',
              },
            ]}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" onClick={() => setDoSearch(true)}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SuspendedDoctor;
