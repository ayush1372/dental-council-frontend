import { useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { sendRegistrarDetails } from '../../../store/actions/college-actions';
import { Button, TextField } from '../../../ui/core';
import { PasswordRegexValidation } from '../../../utilities/common-validations';

export function CollegeRegistrar() {
  const [successModalPopup, setSuccessModalPopup] = useState(false);
  const successMessage = useSelector((state) => state.college.registrarDetails.data.email_id);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      registrarName: '',
      registrarPhoneNumber: '',
      registrarEmail: '',
      registrarUserId: '',
      registrarPassword: '',
    },
  });

  const onSubmit = (fieldData) => {
    let registrarData = {
      id: null,
      name: fieldData.registrarName,
      phone_number: fieldData.registrarPhoneNumber,
      email_id: fieldData.registrarEmail,
      user_id: null,
      password: fieldData.registrarPassword,
    };
    dispatch(sendRegistrarDetails(registrarData));
    if (successMessage.length > 0) {
      setSuccessModalPopup(true);
    }
    reset();
  };

  return (
    <Grid container item spacing={2} p={2}>
      <Grid item xs={12} mt={5}>
        <Box>
          <Typography color="textPrimary.main" variant="h2">
            College Registrar
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          <b>{t('College Registrar Name')}</b>
        </Typography>
        <Typography component="span" color="error.main">
          *
        </Typography>
        <TextField
          fullWidth
          inputProps={{ maxLength: 100 }}
          id="outlined-basic"
          variant="outlined"
          type="text"
          name="registrarName"
          required="true"
          placeholder={t('College Registrar Name')}
          margin="dense"
          defaultValue={getValues().registrarName}
          error={errors.registrarName?.message}
          {...register('registrarName', {
            required: 'Enter valid college registrar name',
          })}
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          <b>{t('College Registrar Phone Number')}</b>
        </Typography>
        <Typography component="span" color="error.main">
          *
        </Typography>
        <TextField
          fullWidth
          inputProps={{ maxLength: 100 }}
          id="outlined-basic"
          variant="outlined"
          type="text"
          name="registrarPhoneNumber"
          required="true"
          placeholder={t('College Registrar Phone Number')}
          margin="dense"
          defaultValue={getValues().registrarPhoneNumber}
          error={errors.registrarPhoneNumber?.message}
          {...register('registrarPhoneNumber', {
            required: 'Enter valid phone number',
            pattern: {
              value: /^(\d{10})$/i,
              message: 'Enter valid phone number',
            },
          })}
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          <b>{t('College Registrar Email Address')}</b>
        </Typography>
        <Typography component="span" color="error.main">
          *
        </Typography>
        <TextField
          fullWidth
          inputProps={{ maxLength: 100 }}
          id="outlined-basic"
          variant="outlined"
          type="email"
          name="registrarEmail"
          required="true"
          placeholder={t('College Registrar Email Address')}
          margin="dense"
          defaultValue={getValues().registrarEmail}
          error={errors.registrarEmail?.message}
          {...register('registrarEmail', {
            required: 'Enter valid email address',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
              message: 'Enter valid email address',
            },
          })}
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          <b>{t('College Registrar User ID')}</b>
        </Typography>
        <Typography component="span" color="error.main">
          *
        </Typography>
        <TextField
          fullWidth
          inputProps={{ maxLength: 100 }}
          id="outlined-basic"
          variant="outlined"
          type="text"
          name="registrarUserId"
          required="true"
          placeholder={t('College Registrar User ID')}
          margin="dense"
          defaultValue={getValues().registrarUserId}
          error={errors.registrarUserId?.message}
          {...register('registrarUserId', {
            required: 'Enter valid user ID',
          })}
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          <b>{t('College Registrar Password')}</b>
        </Typography>
        <Typography component="span" color="error.main">
          *
        </Typography>
        <TextField
          fullWidth
          inputProps={{ maxLength: 100 }}
          variant="outlined"
          type="Password"
          name="registrarPassword"
          required="true"
          placeholder={t('College Registrar Password')}
          margin="dense"
          defaultValue={getValues().registrarPassword}
          error={errors.registrarPassword?.message}
          {...register('registrarPassword', PasswordRegexValidation, {
            required: 'Enter valid password',
          })}
        />
      </Grid>
      <Grid container item spacing={2} mt={{ lg: 1 }}>
        <Grid item xs={12} sm="auto">
          <Button fullWidth variant="contained" color="secondary" onClick={handleSubmit(onSubmit)}>
            {t('Submit')}
          </Button>
        </Grid>

        <Grid item xs={12} sm="auto">
          <Button fullWidth variant="contained" color="grey">
            {t('Cancel')}
          </Button>
          {successModalPopup && (
            <SuccessModalPopup
              open={successModalPopup}
              setOpen={() => setSuccessModalPopup(false)}
              text={
                'You have successfully registered your College Registrar. Defined credentials have been sent on the Email ID and Phone number you registered'
              }
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CollegeRegistrar;
