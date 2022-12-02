import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { Button, TextField } from '../../../ui/core';

const Name = () => {
  // const [Value, setValue] = useState([]);
  const {
    formState: { errors },
    getValues,
    // handleSubmit,
    register,
    // setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      EnterDoctorName: '',
    },
  });
  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={12}>
        <Typography
          bgcolor="grey1.light"
          p={1}
          component="div"
          color="tabHighlightedBackgroundColor.main"
          variant="h3"
        >
          Browse by doctor&apos;s name*
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Grid>
          <Typography color="inputTextColor.main">
            Enter Doctor Name{' '}
            <ErrorOutlineIcon
              sx={{
                color: 'textPrimary.secondary',
                fontSize: '12px',
              }}
            />
          </Typography>
        </Grid>
        <TextField
          sx={{
            color: 'inputTextColor.main',
          }}
          variant="outlined"
          name={'EnterDoctorName'}
          placeholder="Enter Doctor Name"
          fullWidth
          defaultValue={getValues().EnterDoctorName}
          {...register('EnterDoctorName', {
            required: 'Doctor Name is Required',
            maxLength: {
              value: 100,
              message: 'Length should be less than 100.',
            },
          })}
          error={errors.EnterDoctorName?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary">
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default Name;
