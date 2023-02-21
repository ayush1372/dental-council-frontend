import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { createSelectFieldData } from '../../../helpers/functions/common-functions';
import { searchDoctorDetails } from '../../../store/actions/doctor-search-actions';
import { Button, Select, TextField } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';

const SuspendedDoctor = ({ setDoSearch }) => {
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
      SelectDoctorname: '',
      RegistrationNumber: '',
      yearofRegistration: '',
      Statemedicalcouncil: '',
      RegistrationCouncilId: '',
    },
  });
  const onsubmit = () => {
    const searchValues = {
      fullName: getValues().DoctorName,
      registrationNumber: getValues().RegistrationNumber,
      registrationYear: getValues().yearofRegistration,
      stateMedicalCouncilId: getValues().RegistrationCouncilId,
      profileStatusId: 5,
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
      <Grid item xs={4}>
        <Select
          sx={{
            color: 'inputTextColor.main',
          }}
          fullWidth
          error={errors.SelectDoctorname?.message}
          name="SelectDoctorname"
          label="Select Doctor name"
          placeholder="Select Doctor name"
          defaultValue={getValues().SelectDoctorname}
          {...register('SelectDoctorname', {
            required: 'Select Doctor name Council is required',
          })}
          options={[
            {
              label: '-',
              value: '-',
            },
          ]}
        />
      </Grid>
      <Grid item xs={4}>
        <Grid>
          <Typography color="inputTextColor.main">
            Enter Registration Number{' '}
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
          placeholder="Enter Registration Name"
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
      <Grid container item spacing={2}>
        <Grid item xs={4}>
          <Select
            sx={{
              color: 'inputTextColor.main',
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
            options={[
              {
                label: '-',
                value: '-',
              },
            ]}
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
            label="Select State Medical Council"
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
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" onClick={handleSubmit(onsubmit)}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SuspendedDoctor;
