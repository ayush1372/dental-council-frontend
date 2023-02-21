import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yearsData } from '../../../constants/common-data';
import { searchDoctorDetails } from '../../../store/actions/doctor-search-actions';
import { Button, Select } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';

const YearOfRegistration = ({ setDoSearch }) => {
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
      YearofRegistration: '',
    },
  });
  const onsubmit = () => {
    const searchValues = {
      registrationYear: getValues().YearofRegistration,
      page: 0,
      size: 20,
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
          Browse by Year of Registration*
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Select
          sx={{
            color: 'inputTextColor.main',
            borderRadius: '3px',
            input: {
              letterSpacing: 0,
            },
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
          options={yearsData}
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
