import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { searchDoctorDetails } from '../../../store/actions/doctor-search-actions';
import { Button, TextField } from '../../../ui/core';
// import successToast from '../../../ui/core/toaster';

const RegistrationNumber = ({ setDoSearch, setSearchData, setScrollDown }) => {
  const dispatch = useDispatch();

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      RegistrationNumber: '',
    },
  });
  const onsubmit = () => {
    const searchValues = {
      registrationNumber: getValues().RegistrationNumber,
      profileStatusId: 2,
      page: 0,
      size: 9,
    };

    setDoSearch(true);
    setSearchData(searchValues);
    dispatch(searchDoctorDetails(searchValues)).then(() => {});
    // .catch((error) => {
    //   successToast(
    //     error?.data?.response?.data?.error,
    //     'RegistrationError',
    //     'error',
    //     'top-center'
    //   );
    // });

    setSearchData(searchValues);
    setScrollDown(true);
  };
  return (
    <Grid container spacing={2} mt={2}>
      {/* <Grid item xs={12}>
        <Typography
          bgcolor="grey1.light"
          p={1}
          component="div"
          color="tabHighlightedBackgroundColor.main"
          variant="h3"
        >
          Browse by registration number*
        </Typography>
      </Grid> */}
      <Grid item xs={8}>
        <TextField
          sx={{
            color: 'inputTextColor.main',
          }}
          variant="outlined"
          name={'RegistrationNumber'}
          placeholder="Enter registration number"
          label={'Registration Number'}
          fullWidth
          defaultValue={getValues().RegistrationNumber}
          {...register('RegistrationNumber', {
            // required: 'Registration Number is Required',
            // maxLength: {
            //   value: 100,
            //   message: 'Length should be less than 100.',
            // },
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
