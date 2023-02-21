import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { searchDoctorDetails } from '../../../store/actions/doctor-search-actions';
import { Button, TextField } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';

const RegistrationNumber = ({ setDoSearch }) => {
  const dispatch = useDispatch();
  // const [Value, setValue] = useState([]);
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    // setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      RegistrationNumber: '',
    },
  });
  const onsubmit = () => {
    const searchValues = {
      registrationNumber: getValues().RegistrationNumber,
      page: 0,
      size: 5,
    };

    setDoSearch(true);

    dispatch(searchDoctorDetails(searchValues))
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
    <Grid container spacing={2} mt={2}>
      <Grid item xs={12}>
        <Typography
          bgcolor="grey1.light"
          p={1}
          component="div"
          color="tabHighlightedBackgroundColor.main"
          variant="h3"
        >
          Browse by Registration Number*
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField
          sx={{
            color: 'inputTextColor.main',
          }}
          variant="outlined"
          name={'RegistrationNumber'}
          placeholder="Enter Registration Name"
          label={'Registration Number'}
          fullWidth
          defaultValue={getValues().RegistrationNumber}
          {...register('RegistrationNumber', {
            required: 'Doctor Name is Required',
            maxLength: {
              value: 100,
              message: 'Length should be less than 100.',
            },
          })}
          error={errors.RegistrationNumber?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" onClick={handleSubmit(onsubmit)}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default RegistrationNumber;
