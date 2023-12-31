// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yearsData } from '../../../constants/common-data';
import { createSelectFieldData } from '../../../helpers/functions/common-functions';
import { searchDoctorDetails } from '../../../store/actions/doctor-search-actions';
import { Button, Select, TextField } from '../../../ui/core';
// import successToast from '../../../ui/core/toaster';

const BlacklistedDoctor = ({ setDoSearch, setSearchData, setScrollDown }) => {
  const { councilNames } = useSelector((state) => state.common);
  const dispatch = useDispatch();
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
      profileStatusId: 6,
      page: 0,
      size: 9,
    };

    setDoSearch(true);
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
      <Grid item xs={4}>
        {/* <Select
          sx={{
            color: 'inputTextColor.main',
          }}
          fullWidth
          error={errors.SelectDoctorname?.message}
          name="SelectDoctorname"
          label=" Doctor Name"
          placeholder="Select Doctor name"
          defaultValue={getValues().SelectDoctorname}
          {...register('SelectDoctorname', {
            // required: 'Select Doctor name  is required',
          })}
          options={[
            {
              label: '-',
              value: '-',
            },
          ]}
        /> */}
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
      <Grid item xs={4}>
        <Grid>
          <Typography color="inputTextColor.main">
            Registration Number{' '}
            {/* <ErrorOutlineIcon
              fontSize="width12"
              sx={{
                color: 'textPrimary.secondary',
              }}
            /> */}
          </Typography>
        </Grid>
        <TextField
          variant="outlined"
          name={'RegistrationNumber'}
          placeholder="Enter registration number"
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
      <Grid container item spacing={2}>
        <Grid item xs={4}>
          <Select
            sx={{
              color: 'inputTextColor.main',
            }}
            fullWidth
            error={errors.YearofRegistration?.message}
            name="YearofRegistration"
            label=" Year of Registration"
            placeholder="Select year of Registration"
            defaultValue={getValues().YearofRegistration}
            {...register('YearofRegistration', {
              // required: 'Year of Registration is required',
            })}
            options={yearsData}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            sx={{
              color: 'inputTextColor.main',
            }}
            fullWidth
            error={errors.Statemedicalcouncil?.message}
            name="Statemedicalcouncil"
            label=" State Dental Council"
            placeholder="Select State Dental Council"
            defaultValue={getValues().Statemedicalcouncil}
            {...register('Statemedicalcouncil', {
              // required: 'state medical council is required',
            })}
            options={createSelectFieldData(councilNames)}
            onChange={(currentValue) => {
              setValue('RegistrationCouncilId', currentValue.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" onClick={handleSubmit(onsubmit)}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default BlacklistedDoctor;
