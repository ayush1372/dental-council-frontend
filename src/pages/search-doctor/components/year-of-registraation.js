import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yeardata } from '../../../constants/common-data';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import { searchDoctorDetails } from '../../../store/actions/doctor-search-actions';
import { Button } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';

const YearOfRegistration = ({ setDoSearch, setSearchData, setScrollDown }) => {
  const dispatch = useDispatch();

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    clearErrors,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      YearofRegistration: '',
    },
  });
  const onsubmit = () => {
    const searchValues = {
      registrationYear: getValues().YearofRegistration,
      page: 0,
      size: 9,
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

    setSearchData(searchValues);
    setScrollDown(true);
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
          Browse by Year of Registration*
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <SearchableDropdown
          sx={{
            color: 'inputTextColor.main',
            borderRadius: '3px',
            input: {
              letterSpacing: 0,
            },
          }}
          fullWidth
          name="YearofRegistration"
          items={yeardata}
          placeholder="Select Year of Registration"
          label=" Year of Registration"
          clearErrors={clearErrors}
          error={errors.YearofRegistration?.message}
          {...register('YearofRegistration')}
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

export default YearOfRegistration;
