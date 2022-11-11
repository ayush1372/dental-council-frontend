import { useState } from 'react';

import { Box, Container, TextField, Typography } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';

import { verboseLog } from '../../../config/debug';
import { RegistrationCouncilNames } from '../../../constants/utils';
import { Button, Select } from '../../../ui/core';
import Formverification from './form-verification';
const DoctorRegistration = () => {
  const [isNext, setIsNext] = useState('WELCOME_PAGE');
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
    // data && setIsNext('OTP_FORM');
    setIsNext('RECORDS_DATA');
  };
  verboseLog(isNext);

  return (
    <Container
      sx={{
        boxShadow: '0px 1px 3px #00000029',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '20px',
      }}
    >
      {isNext === 'WELCOME_PAGE' && (
        <Box>
          {/* //parentbox// */}
          <Box>
            <Typography variant="h1" color="primary">
              Welcome!
            </Typography>
          </Box>
          <Box>
            <Typography variant="body3" color="textSecondary.main">
              Select your registration council
              <Typography component="span" sx={{ color: 'error.main' }}>
                *
              </Typography>
            </Typography>
            <Box>
              <Select
                fullWidth={true}
                name={'RegistrationCouncil'}
                error={errors.RegistrationCouncil?.message}
                {...register('RegistrationCouncil', {
                  required: 'Registration council name is required',
                })}
                options={RegistrationCouncilNames}
              />
            </Box>
            <Box>
              <Typography variant="body3" color="textSecondary.main">
                Enter Registration Number
                <Typography component="span" sx={{ color: 'error.main' }}>
                  *
                </Typography>
              </Typography>
              <TextField
                fullWidth={true}
                required
                data-testid={'login-recovery-collegename-id'}
                name={'RegistrationNumber'}
                placeholder={t('Enter Registration Number')}
                defaultValue={getValues().RegistrationNumber}
                error={errors.RegistrationNumber?.message}
                {...register('RegistrationNumber', {
                  required: 'Registration Number is required',
                })}
              />
            </Box>
            <Box p="48px">
              <Button onClick={handleSubmit(onSubmit)} variant="contained" color="secondary">
                submit
              </Button>
              <Button variant="outlined">Reset</Button>
            </Box>
          </Box>
        </Box>
      )}
      {isNext === 'RECORDS_DATA' && <Formverification />}
    </Container>
  );
};

export default DoctorRegistration;
