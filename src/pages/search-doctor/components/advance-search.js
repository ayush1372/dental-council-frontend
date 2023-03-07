import { useEffect } from 'react';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yearsData } from '../../../constants/common-data';
import { createSelectFieldData } from '../../../helpers/functions/common-functions';
import { getRegistrationCouncilList } from '../../../store/actions/common-actions';
import { searchDoctorDetails } from '../../../store/actions/doctor-search-actions';
import { Button, Select, TextField } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';

const AdvanceSearch = ({ setDoSearch, setSearchData }) => {
  const { councilNames } = useSelector((state) => state.common);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRegistrationCouncilList());
  }, []);
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      DoctorName: '',
      RegistrationNumber: '',
      YearofRegistration: '',
      Statemedicalcouncil: '',
      RegistrationCouncilId: '',
    },
  });
  const onsubmit = () => {
    const searchValues = {
      fullName: getValues().DoctorName,
      registrationNumber: getValues().RegistrationNumber,
      registrationYear: getValues().YearofRegistration,
      stateMedicalCouncilId: getValues().RegistrationCouncilId,
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
          Browse by any details*
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          sx={{
            color: 'inputTextColor.main',
          }}
          variant="outlined"
          name={'DoctorName'}
          placeholder="Enter Doctor Name"
          label={'Doctor Name'}
          fullWidth
          defaultValue={getValues().DoctorName}
          {...register('DoctorName', {
            required: 'Doctor Name is Required',
            maxLength: {
              value: 100,
              message: 'Length should be less than 100.',
            },
          })}
          error={errors.DoctorName?.message}
        />
      </Grid>
      <Grid item xs={4}>
        <Grid>
          <Typography color="inputTextColor.main">
            Registration Number{' '}
            <ErrorOutlineIcon
              fontSize="width12"
              sx={{
                color: 'textPrimary.secondary',
              }}
            />
          </Typography>
        </Grid>
        <TextField
          variant="outlined"
          name={'RegistrationNumber'}
          placeholder="Enter Registration Number"
          fullWidth
          defaultValue={getValues().RegistrationNumber}
          {...register('RegistrationNumber', {
            required: 'Registration Number is Required',
            maxLength: {
              value: 100,
              message: 'Length should be less than 100.',
            },
          })}
          error={errors.RegistrationNumber?.message}
        />
      </Grid>
      <Grid item xs={4}>
        <Typography component="span" color="inputTextColor.main">
          Year of Registration
        </Typography>

        <Select
          fullWidth
          name={'YearofRegistration'}
          placeholder="Select year of Registration"
          {...register('YearofRegistration', {
            required: 'Year of Registration is required',
          })}
          error={errors.YearofRegistration?.message}
          options={yearsData}
        />
      </Grid>
      <Grid item xs={8}>
        <Typography component="span" color="inputTextColor.main">
          State Medical Council
        </Typography>
        <Select
          sx={{
            color: 'inputTextColor.main',
          }}
          fullWidth
          error={errors.Statemedicalcouncil?.message}
          name="Statemedicalcouncil"
          placeholder="Select State medical council"
          defaultValue={getValues().Statemedicalcouncil}
          {...register('Statemedicalcouncil', {
            required: 'state medical council is required',
          })}
          options={createSelectFieldData(councilNames)}
          onChange={(currentValue) => {
            setValue('RegistrationCouncilId', currentValue.target.value);
          }}
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

export default AdvanceSearch;
