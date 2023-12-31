// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { searchDoctorDetails } from '../../../store/actions/doctor-search-actions';
import { Button, TextField } from '../../../ui/core';
// import successToast from '../../../ui/core/toaster';

const Name = ({ setDoSearch, setSearchData, setScrollDown }) => {
  const dispatch = useDispatch();
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      DoctorName: '',
    },
  });
  const onsubmit = () => {
    const searchValues = {
      fullName: getValues().DoctorName,
      profileStatusId: 2,
      page: 0,
      size: 9,
    };

    setDoSearch(true);
    window.scrollTo({
      top: 400,
      behavior: 'smooth',
    });

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
          Browse by doctors name*
        </Typography>
      </Grid> */}
      <Grid item xs={8}>
        <Grid>
          <Typography color="inputTextColor.main">
            Doctor Name
            {/* <ErrorOutlineIcon
              fontSize="width12"
              sx={{
                color: 'textPrimary.secondary',
              }}
            /> */}
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
          placeholder="Enter doctor name"
          fullWidth
          defaultValue={getValues().DoctorName}
          {...register('DoctorName', {
            pattern: {
              value: /^[A-Z\s@~`!@#$%^&*()_=+\\';:"/?>.<,-]*$/i,
              message: 'Please Enter Valid Name',
            },
            // required: 'Doctor Name is Required',
            // maxLength: {
            //   value: 100,
            //   message: 'Length should be less than 100.',
            // },
          })}
          error={errors.DoctorName?.message}
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
