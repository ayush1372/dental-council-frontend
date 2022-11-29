import { useState } from 'react';

import { Box, Container, Typography } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';

import { verboseLog } from '../../../config/debug';
import { RegistrationCouncilNames } from '../../../constants/common-data';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import { Button } from '../../../ui/core';
import { TextField } from '../../../ui/core/form/textfield/textfield';
import FetchDoctorDetails from './fetch-doctor-details';
const DoctorRegistrationWelcomePage = () => {
  const [isNext, setIsNext] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      options: '',
      RegistrationCouncil: '',
      RegistrationNumber: '',
    },
  });
  const onSubmit = () => {
    setIsNext(true);
  };
  verboseLog(isNext);

  return (
    <Box>
      {isNext === false ? (
        <Box my={9}>
          <Container
            sx={{
              boxShadow: '1',
              pt: 4,
              width: '679px',
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
                  Select Your Registration Council
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <Box>
                  <SearchableDropdown
                    name="RegistrationCouncil"
                    items={RegistrationCouncilNames}
                    placeholder="Select your registration Council"
                    onChange={(newValue) => {
                      verboseLog(newValue);
                    }}
                    defaultValue={getValues().RegistrationCouncil}
                    error={errors.RegistrationCouncil?.message}
                    {...register('RegistrationCouncil', {
                      required: 'Registration Council is required',
                    })}
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
