import { Box, Container, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { verboseLog } from '../../config/debug';
import { Button, Checkbox, TextField } from '../../ui/core';

export function SuspendLicenseVoluntaryRetirement({ tabName }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    verboseLog('data', data);
  };

  return (
    <Box data-testid="suspend-license-voluntary-retirement">
      <Container>
        <Typography variant="h2" my={4}>
          {tabName === 'suspend-license' ? 'Suspend License' : 'Voluntary Retirement'}
        </Typography>
        <Typography variant="subtitle2">
          {'Add Timeline'}
          <Typography variant="body4" color="error.main">
            *
          </Typography>
        </Typography>
        <Grid container mt={1}>
          <Grid item xs={12} md={6} lg={6}>
            <Typography component={'p'} variant="body1">
              Select From Date
            </Typography>
            <TextField
              data-testid="fromDate"
              id="fromDate"
              type="date"
              name="fromDate"
              sx={{
                width: '60%',
                height: '48px',
                input: {
                  color: 'grey1.dark',
                  textTransform: 'uppercase',
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              required={true}
              defaultValue={getValues().fromDate}
              error={errors.fromDate?.message}
              {...register('fromDate', {
                required: 'This field is required',
              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography component={'p'} variant="body1">
              Select To Date
            </Typography>
            <TextField
              data-testid="toDate"
              id="toDate"
              type="date"
              name="toDate"
              sx={{
                width: '60%',
                input: {
                  color: 'grey1.dark',
                  textTransform: 'uppercase',
                },
              }}
              InputLabelProps={{
                shrink: true,
                sx: { height: '40px' },
              }}
              required={true}
              defaultValue={getValues().toDate}
              error={errors.toDate?.message}
              {...register('toDate', {
                required: 'This field is required',
              })}
            />
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="subtitle2">
            {'Remarks'}
            <Typography variant="body4" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid item xs={12}>
            <TextField
              data-testid="remark"
              id="remark"
              type="text"
              multiline
              minRows={4}
              name="remark"
              sx={{ width: '80%' }}
              required={true}
              placeholder="Add a reason"
              defaultValue={getValues().remark}
              error={errors.remark?.message}
              {...register('remark', {
                required: 'This field is required',
              })}
            />
          </Grid>
        </Box>

        <Box my={4}>
          <Checkbox
            name="notification"
            {...register('notification', {
              required: 'This field is required',
            })}
            label={
              'You will no longer be able to receive notifications, or perform actions on your profile.'
            }
            error={errors.notification?.message}
          />
        </Box>
        <Box align="left" my={5}>
          <Button variant="contained" color="secondary" onClick={handleSubmit(onSubmit)}>
            {'Submit'}
          </Button>
          <Button color="grey" variant="contained" sx={{ marginLeft: 2 }}>
            Cancel
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default SuspendLicenseVoluntaryRetirement;
