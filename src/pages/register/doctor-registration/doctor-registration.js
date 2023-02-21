import { useEffect, useState } from 'react';

import { Box, Container, Typography } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { createEditFieldData } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import { getRegistrationCouncilList } from '../../../store/actions/common-actions';
import { fetchSmcRegistrationDetails } from '../../../store/actions/doctor-registration-actions';
import { Button, TextField } from '../../../ui/core';
import FetchDoctorDetails from './fetch-doctor-details';
const DoctorRegistrationWelcomePage = () => {
  const [isNext, setIsNext] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      options: '',
      RegistrationCouncil: '',
      RegistrationCouncilId: '',
      RegistrationNumber: '',
    },
  });
  const { councilNames } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRegistrationCouncilList());
  }, []);

  const onSubmit = () => {
    let registrationData = {
      smcId: getValues().RegistrationCouncilId,
      registrationNumber: parseInt(getValues().RegistrationNumber),
    };
    dispatch(fetchSmcRegistrationDetails(registrationData));

    setIsNext(true);
  };

  return (
    <Box>
      {isNext === false ? (
        <Box my={9}>
          <Container
            sx={{
              boxShadow: '1',
              pt: 4,
              width: {
                xs: '100%',
                md: '679px',
              },
            }}
          >
            <Box>
              <Box pt={2} pb={4}>
                <Typography variant="h2" color="primary">
                  Doctor Registration
                </Typography>
                <Typography variant="body3" color="primary.main">
                  You can select your registration council first from the dropdown and then enter
                  your Registration number. This will fetch your records from your registered
                  council.
                </Typography>
              </Box>

              <Box pb={4}>
                <Typography variant="body3" color="textSecondary.main">
                  Select your Registration Council
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <Box>
                  <SearchableDropdown
                    name="RegistrationCouncil"
                    items={createEditFieldData(councilNames)}
                    placeholder="Select Your Registration Council"
                    clearErrors={clearErrors}
                    error={errors.RegistrationCouncil?.message}
                    {...register('RegistrationCouncil', {
                      required: 'Registration Council is required',
                    })}
                    onChange={(currentValue) => {
                      setValue('RegistrationCouncilId', currentValue.id);
                    }}
                  />
                </Box>
              </Box>
              <Box pb={5}>
                <Typography variant="body3" color="textSecondary.main">
                  Enter Registration Number
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <TextField
                  fullWidth
                  name={'RegistrationNumber'}
                  placeholder={t('Enter Registration Number')}
                  defaultValue={getValues().RegistrationNumber}
                  error={errors.RegistrationNumber?.message}
                  {...register('RegistrationNumber', {
                    required: 'Registration Number is required',
                    pattern: {
                      value: /^\d{10}$/i,
                      message: 'Enter Valid Registration Number',
                    },
                  })}
                />
              </Box>
              <Box display="flex" pb={6}>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  variant="contained"
                  sx={{
                    mr: 3,
                    width: '105px',
                    height: '45px',
                    backgroundColor: 'secondary.main',
                  }}
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    width: '105px',
                    height: '45px',
                    backgroundColor: 'grey.main',
                    color: 'black',
                  }}
                >
                  Reset
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      ) : (
        <FetchDoctorDetails />
      )}
    </Box>
  );
};

export default DoctorRegistrationWelcomePage;
