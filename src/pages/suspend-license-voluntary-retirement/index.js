import { useState } from 'react';

import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HelpIcon from '@mui/icons-material/Help';
import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { Button, Checkbox, RadioGroup, TextField } from '../../ui/core';

export function SuspendLicenseVoluntaryRetirement({ tabName, selectedValue, handleSubmitDetails }) {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      voluntarySuspendLicense: 'voluntary-suspension-check',
    },
  });
  const [selectedSuspension, setSelectedSuspension] = useState('voluntary-suspension-check');

  const onSubmit = () => {
    handleSubmitDetails();
  };

  const handlevoluntarySuspendLicenseChange = (event) => {
    setSelectedSuspension(event.target.value);
    setValue(event.target.name, event.target.value);
  };

  return (
    <Box data-testid="suspend-license-voluntary-retirement" width="100%">
      {!tabName && selectedValue !== 'forward' && (
        <Box align={'center'}>
          {selectedValue === 'raise' ? (
            <HelpIcon fontSize="width40" sx={{ color: 'secondary.warningYellow' }} />
          ) : selectedValue === 'reject' ? (
            <ErrorIcon color="error" sx={{ fontSize: '40px' }} />
          ) : selectedValue === 'verify' || selectedValue === 'approve' ? (
            <CheckCircleIcon color="success" sx={{ fontSize: '50px' }} />
          ) : (
            <BlockIcon color="error" fontSize="width40" />
          )}
        </Box>
      )}
      {selectedValue === 'forward' && (
        <Box display={'flex'} alignItems="flex-start">
          <Box>
            <ErrorIcon color="error" fontSize="width24" />
          </Box>
          <Box>
            <Typography variant="h3">ALERT!</Typography>
          </Box>
        </Box>
      )}
      {tabName && (
        <Typography variant="h2">
          {tabName === 'voluntary-retirement'
            ? 'Voluntary Retirement'
            : tabName === 'suspend-license'
            ? 'Suspend License'
            : tabName === 'voluntary-suspend-license'
            ? 'Voluntary Suspend License'
            : ''}
        </Typography>
      )}

      <Typography variant="h2" mt={2} mb={4} color="primary" textAlign={'center'}>
        {selectedValue === 'verify'
          ? 'VERIFY!'
          : selectedValue === 'raise'
          ? 'Raise a Query for all'
          : selectedValue === 'approve'
          ? 'Reason to Approve application'
          : selectedValue === 'reject'
          ? 'Reason to Reject application'
          : selectedValue === 'suspend'
          ? 'Want to Suspend?'
          : selectedValue === 'blacklist'
          ? 'Want to Blacklist?'
          : ''}
      </Typography>
      {selectedValue === 'raise' ||
      selectedValue === 'verify' ||
      selectedValue === 'forward' ||
      selectedValue === 'approve' ||
      selectedValue === 'reject' ? (
        ''
      ) : (
        <Box>
          {tabName === 'voluntary-suspend-license' && (
            <Grid item xs={12} md={12} mb={2}>
              <RadioGroup
                row
                onChange={handlevoluntarySuspendLicenseChange}
                name={'voluntarySuspendLicense'}
                size="small"
                defaultValue={getValues().voluntarySuspendLicense}
                items={[
                  {
                    value: 'voluntary-suspension-check',
                    label: 'Voluntary Suspension',
                  },
                  {
                    value: 'permanent-suspension-check',
                    label: 'Permanent Suspension',
                  },
                ]}
                label="Select suspension"
                required={true}
                error={errors.voluntarySuspendLicense?.message}
              />
            </Grid>
          )}

          <Typography variant="subtitle2">
            {'Add Timeline'}
            <Typography variant="body4" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid container mt={1} columnSpacing={4}>
            <Grid item xs={12} md={6} lg={6}>
              <Typography component={'p'} variant="body1">
                Select From Date
              </Typography>
              <TextField
                fullWidth
                data-testid="fromDate"
                id="fromDate"
                type="date"
                name="fromDate"
                sx={{
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
            {selectedSuspension === 'voluntary-suspension-check' && (
              <Grid item xs={12} md={6}>
                <Typography component={'p'} variant="body1">
                  Select To Date
                </Typography>
                <TextField
                  fullWidth
                  data-testid="toDate"
                  id="toDate"
                  type="date"
                  name="toDate"
                  sx={{
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
            )}
          </Grid>
        </Box>
      )}
      {tabName === 'voluntary-suspend-license' ||
      selectedValue === 'raise' ||
      selectedValue === 'approve' ||
      selectedValue === 'reject' ||
      selectedValue === 'suspend' ||
      selectedValue === 'blacklist' ? (
        <Box mt={4}>
          <Typography variant="subtitle2">
            {selectedValue === 'raise' || selectedValue === 'reject' || selectedValue === 'approve'
              ? 'Add Reason'
              : 'Remarks'}
            <Typography variant="body4" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid item xs={12}>
            <TextField
              fullWidth
              data-testid="remark"
              id="remark"
              type="text"
              multiline
              minRows={4}
              inputProps={{ maxLength: 150 }}
              name="remark"
              required={true}
              placeholder={
                tabName || selectedValue === 'suspend' || selectedValue === 'suspend'
                  ? 'Add a reason'
                  : selectedValue === 'raise'
                  ? 'Write something here . . .'
                  : selectedValue === 'reject' || selectedValue === 'approve'
                  ? 'Add your reason here . . .'
                  : ''
              }
              defaultValue={getValues().remark}
              error={errors.remark?.message}
              {...register('remark', {
                required: 'This field is required',
              })}
            />
          </Grid>
          <Box align="right" mt={1}>
            <Typography color={'inputFocusColor.main'}>150 word only</Typography>
          </Box>
        </Box>
      ) : (
        ''
      )}
      <Box align={selectedValue === 'verify' ? 'center' : ''}>
        <Typography
          mt={4}
          color="grey.context"
          textAlign={selectedValue === 'verify' ? 'center' : ''}
          variant="h3"
          width="320px"
        >
          {selectedValue === 'verify'
            ? 'Are you sure you want to approve the details of the doctor?'
            : selectedValue === 'forward'
            ? 'Are you sure you want to forward doctor details to College?'
            : ''}
        </Typography>
      </Box>

      {tabName || selectedValue === 'blacklist' || selectedValue === 'suspend' ? (
        <Box my={4} ml={1}>
          <Checkbox
            name="notification"
            {...register('notification', {
              required: 'This field is required',
            })}
            sx={{ padding: '0 8px 0 0' }}
            label={
              tabName
                ? 'You will no longer be able to receive notifications, or perform actions on your profile.'
                : selectedValue === 'blacklist' || selectedValue === 'suspend'
                ? 'Doctor will no longer be able to receive notifications, or perform actions on his/her profile.'
                : ''
            }
            error={errors.notification?.message}
          />
        </Box>
      ) : (
        ''
      )}
      {selectedValue === 'raise' && (
        <Box>
          <Typography>Raise a Query for the following*</Typography>
          <Box display={'flex'}>
            <Box my={4} color="grey1.dark">
              <Checkbox
                sx={{ padding: '0 8px 0 0' }}
                name="notification"
                {...register('notification', {
                  required: 'This field is required',
                })}
                label={'Country name'}
                error={errors.notification?.message}
              />
              <Checkbox
                sx={{ padding: '0 8px 0 0' }}
                name="notification"
                {...register('notification', {
                  required: 'This field is required',
                })}
                label={'Name of the college'}
                error={errors.notification?.message}
              />
            </Box>
          </Box>
        </Box>
      )}
      {tabName && (
        <Box align="left" my={5}>
          <Button variant="contained" color="secondary" onClick={handleSubmit(onSubmit)}>
            {'Submit'}
          </Button>
          <Button color="grey" variant="contained" sx={{ marginLeft: 2 }}>
            Cancel
          </Button>
        </Box>
      )}
      {selectedValue && (
        <Box align="right" my={5}>
          {selectedValue === 'raise' ||
          selectedValue === 'reject' ||
          selectedValue === 'suspend' ||
          selectedValue === 'approve' ||
          selectedValue === 'blacklist' ? (
            <Button variant="contained" color="grey">
              Cancel
            </Button>
          ) : (
            ''
          )}
          {selectedValue === 'blacklist' ? (
            <Button
              color="secondary"
              variant="contained"
              sx={{ marginLeft: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Temporary suspend
            </Button>
          ) : selectedValue === 'suspend' ? (
            <Button
              color="secondary"
              variant="contained"
              sx={{ marginLeft: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Peermanent suspend
            </Button>
          ) : selectedValue === 'reject' ||
            selectedValue === 'approve' ||
            selectedValue === 'raise' ? (
            // eslint-disable-next-line
            <Button
              color="secondary"
              variant="contained"
              sx={{ marginLeft: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          ) : (
            ''
          )}
          {selectedValue === 'verify' || selectedValue === 'forward' ? (
            <Box align={selectedValue === 'forward' ? 'right' : 'center'}>
              <Button
                color="grey"
                variant="contained"
                sx={{ marginLeft: 2 }}
                // onClick={handelCancelDetails}
              >
                No
              </Button>
              <Button
                color="secondary"
                variant="contained"
                sx={{ marginLeft: 2 }}
                onClick={handleSubmit(onSubmit)}
              >
                Yes
              </Button>
            </Box>
          ) : (
            ''
          )}
        </Box>
      )}
    </Box>
  );
}

export default SuspendLicenseVoluntaryRetirement;
