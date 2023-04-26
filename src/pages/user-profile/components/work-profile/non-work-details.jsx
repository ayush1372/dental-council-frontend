import { Grid } from '@mui/material';

import { Button, Select, TextField } from '../../../../ui/core';

const reasonOptions = [
  {
    label: 'Retired',
    value: 'retired',
  },
  {
    label: 'Voluntary Opt-Out',
    value: 'optOut',
  },
  {
    label: 'Suspended',
    value: 'suspended',
  },
  {
    label: 'Any Other',
    value: 'anyOther',
  },
];

const NonWorkDetails = ({ getValues, register, errors, handleSubmit, watch }) => {
  const reasonWatch = watch('reason');
  return (
    <>
      <Grid item xs={12} md={4}>
        <Select
          fullWidth
          error={errors.reason?.message}
          name="reason"
          label="Please select the reason for presently not working"
          defaultValue={getValues().reason}
          required={true}
          {...register(
            'reason',
            getValues()?.reason?.length <= 0 && {
              required: 'This field is required',
            }
          )}
          options={reasonOptions}
        />
      </Grid>
      {reasonWatch === 'anyOther' && (
        <Grid item xs={12} md={4}>
          <TextField
            name="otherReason"
            label="Other reason"
            multiline
            rows={4}
            fullWidth
            error={errors.otherReason?.message}
            {...register('otherReason', {})}
            placeholder="Write a reason here . . ."
          />
        </Grid>
      )}

      <Grid item xs={12} md={8} lg={6}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="secondary"
          sx={{
            margin: {
              xs: '5px 0',
              md: '0',
            },
            width: {
              xs: '100%',
              md: 'fit-content',
              height: '52px',
            },
          }}
        >
          Submit
        </Button>
      </Grid>
    </>
  );
};

export default NonWorkDetails;
