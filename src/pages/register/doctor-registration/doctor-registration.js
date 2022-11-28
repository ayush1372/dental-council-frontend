import { useState } from 'react';

import { Box, Container, Typography } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';

import { verboseLog } from '../../../config/debug';
import { RegistrationCouncilNames } from '../../../constants/utils';
import SearchableDropdown from '../../../shared/autocomplete/searchable-dropdown';
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
    <div>
      {isNext === false ? (
        <Box sx={{ marginTop: '73px', marginBottom: '77px' }}>
          <Container
            sx={{
              boxShadow: '2',
              paddingTop: '30px',
              width: '679px',
            }}
          >
            <Box>
              <Box sx={{ paddingTop: '15px', paddingBottom: '32px' }}>
                <Typography variant="h2" color="primary">
                  Doctor Registration
                </Typography>
                <Typography variant="body3" color="primary.main">
                  To proceed with your registration confirm your Medical council and Registration
                  Number.
                </Typography>
              </Box>

              <Box sx={{ paddingBottom: '32px' }}>
                <Typography variant="body3" color="textSecondary.main">
                  Select your registration council
                  <Typography component="span" sx={{ color: 'error.main' }}>
                    *
                  </Typography>
                </Typography>
                <Box>
                  <SearchableDropdown name="RegistrationCouncil" items={RegistrationCouncilNames} />
                </Box>
              </Box>
              <Box sx={{ paddingBottom: '40px' }}>
                <Typography variant="body3" color="textSecondary.main">
                  Enter Registration Number
                  <Typography component="span" sx={{ color: 'error.main' }}>
                    *
                  </Typography>
                </Typography>
                <TextField
                  fullWidth={true}
                  name={'RegistrationNumber'}
                  placeholder={t('Enter Registration Number')}
                  defaultValue={getValues().RegistrationNumber}
                  error={errors.RegistrationNumber?.message}
                  {...register('RegistrationNumber', {
                    required: 'Registration Number is required',
                  })}
                />
              </Box>
              <Box sx={{ display: 'flex', paddingBottom: '43px' }}>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  variant="contained"
                  sx={{
                    marginRight: '25px',
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
    </div>
  );
};

export default DoctorRegistrationWelcomePage;
