import { useState } from 'react';

import { Box, Container, Typography } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';

import { verboseLog } from '../../../config/debug';
import { RegistrationCouncilNames } from '../../../constants/utils';
import { Button, Select } from '../../../ui/core';
import { TextField } from '../../../ui/core/form/textfield/textfield';
import Formverification from './form-verification';
const DoctorRegistrationWelcomePage = () => {
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
        paddingTop: '30px',
        width: '679px',
      }}
    >
      {isNext === 'WELCOME_PAGE' && (
        <Box>
          {/* //parentbox// */}
          <Box sx={{ paddingTop: '34px', paddingBottom: '35px' }}>
            <Typography variant="h1" color="primary">
              Welcome!
            </Typography>
          </Box>

          <Box sx={{ paddingBottom: '35px' }}>
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
                defaultValue={getValues().RegistrationCouncil}
                options={RegistrationCouncilNames}
                {...register('RegistrationCouncil', {
                  required: 'Registration council name is required',
                })}
              />
            </Box>
          </Box>
          <Box sx={{ paddingBottom: '35px' }}>
            <Typography variant="body3" color="textSecondary.main">
              Enter Registration Number
              <Typography component="span" sx={{ color: 'error.main' }}>
                *
              </Typography>
            </Typography>
            <TextField
              fullWidth={true}
              // required
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
              submit
            </Button>
            <Button
              variant="outlined"
              sx={{ width: '105px', height: '45px', backgroundColor: 'grey.main', color: 'black' }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      )}
      {isNext === 'RECORDS_DATA' && <Formverification />}
    </Container>
  );
};

export default DoctorRegistrationWelcomePage;
