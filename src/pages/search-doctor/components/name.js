import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { searchDoctorDetails } from '../../../store/actions/doctor-search-actions';
import { Button, TextField } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';

const Name = ({ setDoSearch }) => {
  // const [Value, setValue] = useState([]);
  const dispatch = useDispatch();
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    // setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      DoctorName: '',
    },
  });
  const onsubmit = () => {
    const searchValues = {
      fullName: getValues().DoctorName,
      page: 0,
      size: 10,
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
          Browse by doctor&apos;s name*
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Grid>
          <Typography color="inputTextColor.main">
            Enter Doctor Name{' '}
            <ErrorOutlineIcon
              fontSize="width12"
              sx={{
                color: 'textPrimary.secondary',
              }}
            />
          </Typography>
        </Grid>
        <TextField
          sx={{
            color: 'inputTextColor.main',
            '.MuiOutlinedInput-root': {
              borderRadius: '3px',
            },
            input: {
              letterSpacing: 0,
            },
          }}
          variant="outlined"
          name={'DoctorName'}
          placeholder="Enter Doctor Name"
          fullWidth
          defaultValue={getValues().EnterDoctorName}
          {...register('DoctorName', {
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
        <Button variant="contained" color="secondary" onClick={handleSubmit(onsubmit)}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default Name;
