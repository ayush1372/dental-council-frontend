import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { createSelectFieldData } from '../../../helpers/functions/common-functions';
import { searchDoctorDetails } from '../../../store/actions/doctor-search-actions';
import { Button, Select } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';

const StateMedicalCouncil = ({ setDoSearch, setSearchData, setScrollDown }) => {
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
      Statemedicalcouncil: '',
      RegistrationCouncilId: '',
    },
  });
  const onsubmit = () => {
    const searchValues = {
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
          Browse by State medical council*
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
          error={errors.Statemedicalcouncil?.message}
          name={'Statemedicalcouncil'}
          label=" State Medical Council"
          placeholder="Select State medical council"
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
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" onClick={handleSubmit(onsubmit)}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default StateMedicalCouncil;
